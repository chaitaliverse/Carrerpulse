import { Router } from "express";
import type { IRouter } from "express";
import { db, portfolioProjectsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

function scoreProject(project: { skills: string[]; description: string; complexity: string; githubUrl?: string | null; liveUrl?: string | null }) {
  let score = 40;
  if (project.skills.length >= 3) score += 15;
  if (project.skills.length >= 5) score += 10;
  if (project.description.length > 100) score += 10;
  if (project.githubUrl) score += 15;
  if (project.liveUrl) score += 10;
  if (project.complexity === "Advanced") score += 15;
  else if (project.complexity === "Intermediate") score += 8;
  return Math.min(98, score);
}

function getRecruiterReadiness(score: number): string {
  if (score >= 85) return "Portfolio Ready";
  if (score >= 70) return "Good";
  if (score >= 55) return "Needs Polish";
  return "Needs Work";
}

router.get("/portfolio/projects", async (_req, res): Promise<void> => {
  const projects = await db.select().from(portfolioProjectsTable).orderBy(desc(portfolioProjectsTable.createdAt));
  res.json(projects.map(p => ({ ...p, createdAt: p.createdAt.toISOString() })));
});

router.get("/portfolio/projects/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid project ID" });
    return;
  }

  const [project] = await db.select().from(portfolioProjectsTable).where(eq(portfolioProjectsTable.id, id));

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json({ ...project, createdAt: project.createdAt.toISOString() });
});

router.post("/portfolio/projects/add", async (req, res): Promise<void> => {
  const { title, description, skills = [], category, githubUrl, liveUrl, complexity = "Intermediate" } = req.body;

  if (!title || !description || !category) {
    res.status(400).json({ error: "title, description, and category are required" });
    return;
  }

  const score = scoreProject({ skills, description, complexity, githubUrl, liveUrl });
  const recruiterReadiness = getRecruiterReadiness(score);
  const impact = score >= 80 ? "High" : score >= 65 ? "Medium" : "Low";

  const [project] = await db.insert(portfolioProjectsTable).values({
    title,
    description,
    skills,
    category,
    score,
    recruiterReadiness,
    githubUrl: githubUrl ?? null,
    liveUrl: liveUrl ?? null,
    complexity,
    impact,
  }).returning();

  res.status(201).json({ ...project, createdAt: project.createdAt.toISOString() });
});

router.get("/portfolio/score", async (_req, res): Promise<void> => {
  const projects = await db.select().from(portfolioProjectsTable);

  if (projects.length === 0) {
    res.json({
      overall: 0,
      diversity: 0,
      complexity: 0,
      presentation: 0,
      recruiterReadiness: 0,
      totalProjects: 0,
      strengths: [],
      improvements: ["Add your first portfolio project to get started", "Aim for 3-5 diverse projects covering different skills"],
      topProject: "None yet",
    });
    return;
  }

  const avgScore = Math.round(projects.reduce((sum, p) => sum + p.score, 0) / projects.length);
  const categories = new Set(projects.map(p => p.category));
  const diversity = Math.min(100, categories.size * 20);
  const withGithub = projects.filter(p => p.githubUrl).length;
  const presentation = Math.round((withGithub / projects.length) * 100);
  const complexities = projects.filter(p => p.complexity === "Advanced").length;
  const complexity = Math.min(100, Math.round((complexities / projects.length) * 100) + 30);
  const topProject = projects.reduce((best, p) => p.score > best.score ? p : best, projects[0]);

  const strengths = [
    ...(projects.length >= 3 ? ["Strong project volume"] : []),
    ...(diversity >= 60 ? ["Good skill diversity across projects"] : []),
    ...(withGithub >= 2 ? ["Projects are well-documented on GitHub"] : []),
    ...(avgScore >= 70 ? ["Above-average project quality scores"] : []),
  ].slice(0, 3);

  const improvements = [
    ...(projects.length < 3 ? ["Add more projects to demonstrate breadth"] : []),
    ...(withGithub < projects.length ? ["Add GitHub links to all projects"] : []),
    ...(complexity < 60 ? ["Include at least one advanced-complexity project"] : []),
    ...(!projects.some(p => p.liveUrl) ? ["Add a live demo link to your best project"] : []),
  ].slice(0, 3);

  res.json({
    overall: avgScore,
    diversity,
    complexity,
    presentation,
    recruiterReadiness: Math.round((avgScore * 0.5) + (diversity * 0.25) + (presentation * 0.25)),
    totalProjects: projects.length,
    strengths,
    improvements,
    topProject: topProject.title,
  });
});

export default router;
