import { Router } from "express";
import type { IRouter } from "express";

const router: IRouter = Router();

const ALL_SKILLS = [
  { skill: "Python", category: "Programming", demandScore: 98, jobCount: 87420, growthRate: 12.4, avgSalaryImpact: 18000, trend: "rising" },
  { skill: "SQL", category: "Programming", demandScore: 96, jobCount: 94350, growthRate: 8.1, avgSalaryImpact: 12000, trend: "stable" },
  { skill: "Machine Learning", category: "AI/ML", demandScore: 94, jobCount: 52180, growthRate: 28.7, avgSalaryImpact: 32000, trend: "rising" },
  { skill: "Power BI", category: "BI Tools", demandScore: 88, jobCount: 43200, growthRate: 15.3, avgSalaryImpact: 10000, trend: "rising" },
  { skill: "Tableau", category: "BI Tools", demandScore: 85, jobCount: 38900, growthRate: 9.2, avgSalaryImpact: 9500, trend: "stable" },
  { skill: "Apache Spark", category: "Big Data", demandScore: 84, jobCount: 28700, growthRate: 22.1, avgSalaryImpact: 25000, trend: "rising" },
  { skill: "AWS", category: "Cloud", demandScore: 91, jobCount: 61300, growthRate: 18.9, avgSalaryImpact: 22000, trend: "rising" },
  { skill: "Azure", category: "Cloud", demandScore: 87, jobCount: 48700, growthRate: 21.4, avgSalaryImpact: 20000, trend: "rising" },
  { skill: "Google Cloud", category: "Cloud", demandScore: 82, jobCount: 35600, growthRate: 24.8, avgSalaryImpact: 21000, trend: "rising" },
  { skill: "Excel", category: "BI Tools", demandScore: 80, jobCount: 78000, growthRate: 2.1, avgSalaryImpact: 5000, trend: "stable" },
  { skill: "dbt", category: "Data Engineering", demandScore: 79, jobCount: 18400, growthRate: 68.2, avgSalaryImpact: 28000, trend: "rising" },
  { skill: "Airflow", category: "Data Engineering", demandScore: 78, jobCount: 21500, growthRate: 35.6, avgSalaryImpact: 24000, trend: "rising" },
  { skill: "TensorFlow", category: "AI/ML", demandScore: 82, jobCount: 24300, growthRate: 18.4, avgSalaryImpact: 30000, trend: "stable" },
  { skill: "PyTorch", category: "AI/ML", demandScore: 86, jobCount: 22100, growthRate: 42.3, avgSalaryImpact: 35000, trend: "rising" },
  { skill: "Scikit-learn", category: "AI/ML", demandScore: 81, jobCount: 19800, growthRate: 14.7, avgSalaryImpact: 22000, trend: "stable" },
  { skill: "Kafka", category: "Data Engineering", demandScore: 77, jobCount: 16200, growthRate: 31.2, avgSalaryImpact: 26000, trend: "rising" },
  { skill: "Snowflake", category: "Cloud", demandScore: 83, jobCount: 24800, growthRate: 52.1, avgSalaryImpact: 23000, trend: "rising" },
  { skill: "R", category: "Programming", demandScore: 72, jobCount: 18500, growthRate: 3.4, avgSalaryImpact: 14000, trend: "declining" },
  { skill: "Statistics", category: "Analytics", demandScore: 88, jobCount: 45200, growthRate: 11.2, avgSalaryImpact: 16000, trend: "stable" },
  { skill: "Databricks", category: "Cloud", demandScore: 80, jobCount: 19600, growthRate: 61.4, avgSalaryImpact: 27000, trend: "rising" },
  { skill: "LLM / GenAI", category: "AI/ML", demandScore: 93, jobCount: 31400, growthRate: 284.0, avgSalaryImpact: 42000, trend: "rising" },
  { skill: "Data Modeling", category: "Analytics", demandScore: 85, jobCount: 32100, growthRate: 9.8, avgSalaryImpact: 15000, trend: "stable" },
  { skill: "ETL/ELT Pipelines", category: "Data Engineering", demandScore: 82, jobCount: 29800, growthRate: 14.3, avgSalaryImpact: 20000, trend: "stable" },
  { skill: "Looker", category: "BI Tools", demandScore: 76, jobCount: 17300, growthRate: 28.9, avgSalaryImpact: 11000, trend: "rising" },
];

router.get("/skills/demand", async (req, res): Promise<void> => {
  const { category } = req.query as { category?: string };
  let skills = ALL_SKILLS;
  if (category && category !== "All") {
    skills = skills.filter(s => s.category === category);
  }
  res.json(skills);
});

router.get("/skills/trending", async (_req, res): Promise<void> => {
  res.json([
    { skill: "LLM / GenAI", momentum: 98.2, weeklyGrowth: 284.0, hotness: "Explosive" },
    { skill: "dbt", momentum: 87.4, weeklyGrowth: 68.2, hotness: "Very Hot" },
    { skill: "Databricks", momentum: 84.1, weeklyGrowth: 61.4, hotness: "Very Hot" },
    { skill: "Snowflake", momentum: 79.6, weeklyGrowth: 52.1, hotness: "Hot" },
    { skill: "PyTorch", momentum: 76.3, weeklyGrowth: 42.3, hotness: "Hot" },
    { skill: "Kafka", momentum: 71.8, weeklyGrowth: 31.2, hotness: "Growing" },
    { skill: "Airflow", momentum: 68.4, weeklyGrowth: 35.6, hotness: "Growing" },
    { skill: "Google Cloud", momentum: 65.2, weeklyGrowth: 24.8, hotness: "Growing" },
  ]);
});

router.post("/skills/gap-analysis", async (req, res): Promise<void> => {
  const { currentSkills = [], targetRole = "Data Scientist", experienceLevel = "Mid" } = req.body;

  const roleSkillMap: Record<string, string[]> = {
    "Data Scientist": ["Python", "Machine Learning", "Statistics", "SQL", "PyTorch", "Scikit-learn", "AWS"],
    "Data Engineer": ["Python", "SQL", "Apache Spark", "Airflow", "dbt", "Kafka", "AWS", "Databricks"],
    "Data Analyst": ["SQL", "Python", "Power BI", "Tableau", "Excel", "Statistics", "Data Modeling"],
    "ML Engineer": ["Python", "Machine Learning", "PyTorch", "TensorFlow", "AWS", "Docker", "MLflow"],
    "BI Developer": ["Power BI", "Tableau", "SQL", "DAX", "Excel", "Data Modeling", "ETL/ELT Pipelines"],
    "Analytics Engineer": ["dbt", "SQL", "Python", "Snowflake", "Databricks", "Data Modeling", "Airflow"],
  };

  const required = roleSkillMap[targetRole] ?? roleSkillMap["Data Scientist"];
  const currentSet = new Set((currentSkills as string[]).map((s: string) => s.toLowerCase()));
  const missingSkills = required
    .filter(s => !currentSet.has(s.toLowerCase()))
    .map(s => ({
      skill: s,
      importance: required.indexOf(s) < 2 ? "Critical" : required.indexOf(s) < 4 ? "High" : "Medium",
      timeToLearn: ["Python", "SQL"].includes(s) ? "2-3 months" : ["Machine Learning", "PyTorch", "TensorFlow"].includes(s) ? "4-6 months" : "1-2 months",
    }));

  const strongSkills = required.filter(s => currentSet.has(s.toLowerCase()));
  const matchScore = Math.round((strongSkills.length / required.length) * 100);

  res.json({
    targetRole,
    matchScore,
    missingSkills,
    strongSkills,
    estimatedTimeline: missingSkills.length === 0 ? "Ready now" : missingSkills.length <= 2 ? "1-3 months" : missingSkills.length <= 4 ? "3-6 months" : "6-12 months",
    recommendations: [
      `Focus on ${missingSkills[0]?.skill ?? "advanced projects"} first — highest demand for ${targetRole}`,
      `Build 2-3 portfolio projects showcasing ${targetRole} skills`,
      `Consider ${targetRole.includes("Data") ? "a cloud certification" : "open source contributions"}`,
    ],
  });
});

export default router;
