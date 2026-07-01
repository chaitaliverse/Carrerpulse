import { Router } from "express";
import type { IRouter } from "express";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  res.json({
    careerScore: 78,
    jobsApplied: 24,
    skillsTracked: 18,
    salaryBenchmark: 1800000,
    marketDemand: "High",
    weeklyGrowth: 4.2,
    topRole: "Senior Data Analyst",
    learningProgress: 62,
  });
});

router.get("/dashboard/activity", async (_req, res): Promise<void> => {
  res.json([
    { id: 1, type: "resume", title: "Resume Analysis Complete", description: "Your resume scored 84 ATS for Senior Data Analyst at Google", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), icon: "FileText" },
    { id: 2, type: "skill", title: "New Trending Skill", description: "dbt (data build tool) demand surged 42% this week", timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), icon: "TrendingUp" },
    { id: 3, type: "job", title: "Job Match Found", description: "92% match: Staff Analytics Engineer at Databricks — $185k", timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), icon: "Briefcase" },
    { id: 4, type: "coach", title: "AI Coach Session", description: "Completed interview prep for product analytics roles", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), icon: "Bot" },
    { id: 5, type: "roadmap", title: "Roadmap Milestone", description: "Phase 2 complete: Advanced SQL & Window Functions", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), icon: "Map" },
    { id: 6, type: "salary", title: "Salary Benchmark Updated", description: "Your target role avg salary increased 8.3% YoY in San Francisco", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), icon: "DollarSign" },
    { id: 7, type: "portfolio", title: "Portfolio Score Improved", description: "Added Sales Dashboard project — portfolio score now 81/100", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), icon: "BarChart2" },
  ]);
});

router.get("/dashboard/career-score", async (_req, res): Promise<void> => {
  res.json({
    overall: 78,
    skills: 82,
    experience: 71,
    portfolio: 75,
    marketFit: 88,
    learning: 65,
    recommendations: [
      "Add cloud certification (AWS/GCP) to boost market fit by ~12 points",
      "Complete 2 more ML projects to strengthen portfolio score",
      "Update resume with quantified achievements to raise ATS score",
      "Contribute to open source data projects for visibility",
    ],
  });
});

export default router;
