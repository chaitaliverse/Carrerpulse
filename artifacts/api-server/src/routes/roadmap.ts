import { Router } from "express";
import type { IRouter } from "express";
import { db, roadmapsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

function generateRoadmap(currentRole: string, targetRole: string, timeframe: string, currentSkills: string[] = []) {
  const roadmaps: Record<string, {
    phases: Array<{ phase: number; title: string; duration: string; skills: string[]; milestone: string; completed: boolean }>;
    resources: Array<{ title: string; type: string; platform: string; duration: string; difficulty: string; url?: string }>;
  }> = {
    "Data Scientist": {
      phases: [
        { phase: 1, title: "Foundations", duration: "4-6 weeks", skills: ["Python Basics", "NumPy", "Pandas", "Jupyter Notebooks"], milestone: "Complete 2 EDA projects on Kaggle", completed: false },
        { phase: 2, title: "Statistical Analysis", duration: "4-6 weeks", skills: ["Statistics", "Probability", "Hypothesis Testing", "A/B Testing"], milestone: "Run a full A/B test analysis project", completed: false },
        { phase: 3, title: "Machine Learning Core", duration: "6-8 weeks", skills: ["Scikit-learn", "Regression", "Classification", "Model Evaluation"], milestone: "Build and deploy a predictive model", completed: false },
        { phase: 4, title: "Advanced ML & Deep Learning", duration: "6-8 weeks", skills: ["PyTorch", "TensorFlow", "Neural Networks", "Feature Engineering"], milestone: "Complete an image or NLP project", completed: false },
        { phase: 5, title: "Production & Portfolio", duration: "4-6 weeks", skills: ["MLflow", "Docker", "Cloud deployment", "API design"], milestone: "Deploy 2 models as live APIs", completed: false },
      ],
      resources: [
        { title: "Python for Data Science Handbook", type: "Book", platform: "O'Reilly", duration: "Self-paced", difficulty: "Beginner" },
        { title: "Machine Learning Specialization", type: "Course", platform: "Coursera (Andrew Ng)", duration: "3 months", difficulty: "Intermediate" },
        { title: "Kaggle ML Competitions", type: "Practice", platform: "Kaggle", duration: "Ongoing", difficulty: "Intermediate" },
        { title: "Fast.ai Practical Deep Learning", type: "Course", platform: "fast.ai", duration: "7 weeks", difficulty: "Advanced" },
        { title: "Designing Machine Learning Systems", type: "Book", platform: "O'Reilly", duration: "Self-paced", difficulty: "Advanced" },
      ],
    },
    "Data Engineer": {
      phases: [
        { phase: 1, title: "Programming Fundamentals", duration: "3-4 weeks", skills: ["Python", "SQL Advanced", "Git", "Linux CLI"], milestone: "Write 10 complex SQL queries", completed: false },
        { phase: 2, title: "Data Warehousing", duration: "4-5 weeks", skills: ["Snowflake", "BigQuery", "Data Modeling", "dbt"], milestone: "Build a dbt project with 10+ models", completed: false },
        { phase: 3, title: "Big Data Processing", duration: "5-6 weeks", skills: ["Apache Spark", "PySpark", "Databricks", "Delta Lake"], milestone: "Process 1M+ row dataset with Spark", completed: false },
        { phase: 4, title: "Pipeline Orchestration", duration: "4-5 weeks", skills: ["Apache Airflow", "Kafka", "ETL/ELT Design", "Data Quality"], milestone: "Build an end-to-end production pipeline", completed: false },
        { phase: 5, title: "Cloud & DevOps", duration: "4-6 weeks", skills: ["AWS/GCP/Azure", "Terraform", "Docker", "CI/CD"], milestone: "Deploy pipeline to cloud with monitoring", completed: false },
      ],
      resources: [
        { title: "Fundamentals of Data Engineering", type: "Book", platform: "O'Reilly", duration: "Self-paced", difficulty: "Intermediate" },
        { title: "dbt Learn", type: "Course", platform: "dbt Labs", duration: "Free, 4 weeks", difficulty: "Beginner" },
        { title: "Apache Spark with Python", type: "Course", platform: "Udemy", duration: "15 hours", difficulty: "Intermediate" },
        { title: "Airflow Documentation & Tutorials", type: "Documentation", platform: "Apache", duration: "2 weeks", difficulty: "Intermediate" },
        { title: "AWS Certified Data Engineer", type: "Certification", platform: "AWS", duration: "3 months prep", difficulty: "Advanced" },
      ],
    },
    "Data Analyst": {
      phases: [
        { phase: 1, title: "SQL Mastery", duration: "3-4 weeks", skills: ["SQL Basics", "JOINs", "Aggregations", "Window Functions"], milestone: "Solve 50 SQL problems on LeetCode", completed: false },
        { phase: 2, title: "Data Visualization", duration: "4-5 weeks", skills: ["Excel Advanced", "Power BI", "Tableau", "Chart Design Principles"], milestone: "Build 3 interactive dashboards", completed: false },
        { phase: 3, title: "Python for Analysis", duration: "4-5 weeks", skills: ["Python", "Pandas", "Matplotlib", "Seaborn"], milestone: "Complete full EDA project with insights", completed: false },
        { phase: 4, title: "Business Intelligence", duration: "3-4 weeks", skills: ["KPIs & Metrics", "A/B Testing", "Statistical Analysis", "Storytelling with Data"], milestone: "Present insights to a mock stakeholder", completed: false },
        { phase: 5, title: "Portfolio & Job Search", duration: "3-4 weeks", skills: ["Resume optimization", "GitHub portfolio", "Networking", "Interview prep"], milestone: "Land 5 interviews", completed: false },
      ],
      resources: [
        { title: "Mode Analytics SQL Tutorial", type: "Course", platform: "Mode", duration: "Free, 2 weeks", difficulty: "Beginner" },
        { title: "Power BI Desktop Masterclass", type: "Course", platform: "Udemy", duration: "10 hours", difficulty: "Intermediate" },
        { title: "Storytelling with Data", type: "Book", platform: "Wiley", duration: "Self-paced", difficulty: "Beginner" },
        { title: "Python for Data Analysis", type: "Book", platform: "O'Reilly (Wes McKinney)", duration: "Self-paced", difficulty: "Intermediate" },
        { title: "Google Data Analytics Certificate", type: "Certification", platform: "Coursera", duration: "6 months", difficulty: "Beginner" },
      ],
    },
  };

  const template = roadmaps[targetRole] ?? roadmaps["Data Analyst"];
  const currentSet = new Set(currentSkills.map(s => s.toLowerCase()));

  const phases = template.phases.map(p => ({
    ...p,
    completed: p.skills.every(s => currentSet.has(s.toLowerCase())),
  }));

  const completedCount = phases.filter(p => p.completed).length;
  const completionPercentage = Math.round((completedCount / phases.length) * 100);

  return { phases, resources: template.resources, completionPercentage };
}

router.post("/roadmap/generate", async (req, res): Promise<void> => {
  const { currentRole = "Student", targetRole = "Data Analyst", currentSkills = [], timeframe = "6 months" } = req.body;

  const { phases, resources, completionPercentage } = generateRoadmap(currentRole, targetRole, timeframe, currentSkills);

  const [saved] = await db.insert(roadmapsTable).values({
    title: `${currentRole} → ${targetRole} Roadmap`,
    targetRole,
    currentRole,
    timeframe,
    completionPercentage,
    phases,
    resources,
  }).returning();

  res.json({
    ...saved,
    createdAt: saved.createdAt.toISOString(),
  });
});

router.get("/roadmap/saved", async (_req, res): Promise<void> => {
  const rows = await db.select().from(roadmapsTable).orderBy(desc(roadmapsTable.createdAt)).limit(10);
  res.json(rows.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

export default router;
