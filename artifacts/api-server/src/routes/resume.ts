import { Router } from "express";
import type { IRouter } from "express";
import { db, resumeAnalysesTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

function analyzeResume(resumeText: string, targetRole: string) {
  const textLower = resumeText.toLowerCase();

  const roleKeywords: Record<string, string[]> = {
    "Data Analyst": ["sql", "python", "excel", "power bi", "tableau", "visualization", "analytics", "reporting", "dashboard", "kpi", "metrics"],
    "Data Scientist": ["python", "machine learning", "statistics", "sql", "tensorflow", "pytorch", "scikit-learn", "feature engineering", "model", "algorithm"],
    "Data Engineer": ["python", "sql", "spark", "airflow", "etl", "pipeline", "kafka", "dbt", "aws", "databricks", "snowflake"],
    "ML Engineer": ["python", "tensorflow", "pytorch", "mlops", "deployment", "kubernetes", "docker", "ci/cd", "model serving", "mlflow"],
    "BI Developer": ["power bi", "tableau", "sql", "dax", "visualization", "dashboard", "reporting", "ssrs", "looker"],
  };

  const keywords = roleKeywords[targetRole] ?? roleKeywords["Data Analyst"];
  const foundKeywords = keywords.filter(k => textLower.includes(k));
  const missingKeywords = keywords.filter(k => !textLower.includes(k));

  const hasQuantified = /\d+%|\$\d+|\d+ (million|billion|thousand|users|customers|projects)/i.test(resumeText);
  const hasActionVerbs = /(built|designed|implemented|developed|led|managed|improved|optimized|increased|reduced|delivered)/i.test(resumeText);
  const hasExperience = /(experience|work history|employment|professional)/i.test(textLower);
  const hasEducation = /(education|degree|university|college|bachelor|master|phd)/i.test(textLower);
  const hasProjects = /(project|portfolio|github|built|created)/i.test(textLower);

  const keywordScore = Math.round((foundKeywords.length / keywords.length) * 100);
  const contentScore = Math.round(
    ((hasQuantified ? 25 : 0) + (hasActionVerbs ? 25 : 0) + (hasExperience ? 25 : 0) + (hasProjects ? 25 : 0))
  );
  const formatScore = Math.round(
    ((hasEducation ? 30 : 0) + (hasExperience ? 30 : 0) + (resumeText.length > 200 ? 20 : 0) + (resumeText.length < 3000 ? 20 : 0))
  );
  const atsScore = Math.round((keywordScore * 0.5) + (contentScore * 0.3) + (formatScore * 0.2));
  const overallScore = Math.round((keywordScore * 0.4) + (contentScore * 0.35) + (formatScore * 0.25));

  const detectedSkills = ["SQL", "Python", "Data Analysis", "Visualization", "Excel", "Reporting"]
    .filter(s => textLower.includes(s.toLowerCase()));

  return {
    atsScore: Math.max(40, Math.min(98, atsScore)),
    overallScore: Math.max(40, Math.min(98, overallScore)),
    formatScore: Math.max(45, Math.min(95, formatScore)),
    contentScore: Math.max(45, Math.min(95, contentScore)),
    keywordScore: Math.max(35, Math.min(98, keywordScore)),
    strengths: [
      ...(hasQuantified ? ["Strong use of quantified achievements"] : []),
      ...(hasActionVerbs ? ["Clear action-oriented language"] : []),
      ...(hasProjects ? ["Portfolio/projects section present"] : []),
      ...(foundKeywords.length > 3 ? [`${foundKeywords.length} key ${targetRole} skills detected`] : []),
    ].slice(0, 4),
    weaknesses: [
      ...(!hasQuantified ? ["No quantified achievements found (e.g., 'increased X by 30%')"] : []),
      ...(missingKeywords.length > 2 ? [`Missing ${missingKeywords.length} critical ${targetRole} keywords`] : []),
      ...(!hasProjects ? ["No portfolio or projects section detected"] : []),
    ].slice(0, 4),
    missingKeywords: missingKeywords.slice(0, 6),
    suggestedKeywords: [...foundKeywords.slice(0, 3), ...["data-driven", "cross-functional", "stakeholder management", "agile"].slice(0, 4 - Math.min(3, foundKeywords.length))],
    improvements: [
      { section: "Work Experience", priority: "High", suggestion: "Add 2-3 quantified metrics per role (revenue impact, user counts, % improvements)" },
      { section: "Skills Section", priority: "High", suggestion: `Add missing keywords: ${missingKeywords.slice(0, 3).join(", ")}` },
      { section: "Summary", priority: "Medium", suggestion: `Tailor your professional summary specifically for ${targetRole} roles with ATS-friendly keywords` },
      { section: "Projects", priority: "Medium", suggestion: "Include GitHub links and brief descriptions of 2-3 relevant data projects" },
    ],
    skillsDetected: detectedSkills.length > 0 ? detectedSkills : ["Data Analysis", "Reporting", "Excel"],
  };
}

router.post("/resume/analyze", async (req, res): Promise<void> => {
  const { resumeText, targetRole = "Data Analyst", targetIndustry } = req.body;

  if (!resumeText || typeof resumeText !== "string") {
    res.status(400).json({ error: "resumeText is required" });
    return;
  }

  const analysis = analyzeResume(resumeText, targetRole);

  const [saved] = await db.insert(resumeAnalysesTable).values({
    targetRole,
    targetIndustry: targetIndustry ?? null,
    resumeText,
    ...analysis,
  }).returning();

  res.json({ ...saved, analyzedAt: saved.analyzedAt.toISOString() });
});

router.get("/resume/saved", async (_req, res): Promise<void> => {
  const rows = await db.select({
    id: resumeAnalysesTable.id,
    targetRole: resumeAnalysesTable.targetRole,
    atsScore: resumeAnalysesTable.atsScore,
    analyzedAt: resumeAnalysesTable.analyzedAt,
  }).from(resumeAnalysesTable).orderBy(desc(resumeAnalysesTable.analyzedAt)).limit(20);

  res.json(rows.map(r => ({ ...r, analyzedAt: r.analyzedAt.toISOString() })));
});

export default router;
