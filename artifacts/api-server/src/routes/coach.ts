import { Router } from "express";
import type { IRouter } from "express";
import { db, coachMessagesTable } from "@workspace/db";
import type { CoachMessage } from "@workspace/db";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

function generateCoachResponse(message: string, context?: string): { content: string; suggestions: string[] } {
  const msgLower = message.toLowerCase();

  if (msgLower.includes("salary") || msgLower.includes("negotiate") || msgLower.includes("pay")) {
    return {
      content: "Salary negotiation is one of the highest-ROI skills you can develop. For data roles, always anchor high — research shows the first number in a negotiation heavily influences the outcome. Start by benchmarking your role on Levels.fyi, LinkedIn Salary, and Glassdoor. For mid-level data analysts in San Francisco, $120-145k base is competitive. When you get an offer, counter with 15-20% above what you'd accept. Emphasize your unique value: specific projects, certifications, or niche skills. Do you want me to help you script a specific negotiation conversation?",
      suggestions: ["Help me script a salary counter-offer", "What's the market rate for my role?", "How do I handle lowball offers?"],
    };
  }

  if (msgLower.includes("interview") || msgLower.includes("prep") || msgLower.includes("question")) {
    return {
      content: "Great timing to prep! Data interviews typically have 4 parts: (1) SQL technical round — focus on window functions, CTEs, and query optimization; (2) Case study — practice breaking down ambiguous metrics problems; (3) Statistics/ML conceptual — know p-values, A/B testing, and common algorithms; (4) Behavioral — use STAR format with data-specific examples. For SQL, practice on LeetCode Medium difficulty. For case studies, practice the AREA framework: Ask clarifying questions, Restate the problem, Explore approaches, Answer with metrics. Which round do you want to focus on?",
      suggestions: ["Give me 5 SQL interview questions", "Help me practice a case study", "Behavioral questions for data roles"],
    };
  }

  if (msgLower.includes("switch") || msgLower.includes("transition") || msgLower.includes("career change")) {
    return {
      content: "Career transitions into data are very achievable with the right strategy. The fastest path depends on your background: if you're analytical (finance, science, engineering), focus on SQL + Python and apply for analyst roles first — you can transition in 3-6 months. If you're coming from a non-analytical background, plan for 9-12 months: build foundational skills, complete 3-5 portfolio projects, then network aggressively into your first role. The most underrated move? Find your niche — healthcare data, fintech analytics, or e-commerce — companies pay premium for domain expertise + data skills. What's your current background?",
      suggestions: ["What portfolio projects should I build?", "How to network into data roles?", "Which data role fits my background?"],
    };
  }

  if (msgLower.includes("skill") || msgLower.includes("learn") || msgLower.includes("course")) {
    return {
      content: "For 2024-2025, the highest-leverage skills to invest in are: (1) **SQL + dbt** — foundational for every data role, and dbt is now expected at most modern data teams; (2) **Python + Pandas/Polars** — for analysis and automation; (3) **Cloud (Snowflake or Databricks)** — the modern data stack; (4) **LLM/GenAI basics** — prompt engineering and RAG patterns are increasingly asked in interviews. The best free resources: Mode Analytics SQL tutorial, Kaggle Python course, dbt Learn platform, and Andrej Karpathy's Neural Networks Zero to Hero. What's your current skill level?",
      suggestions: ["Build me a learning roadmap", "What certifications are worth it?", "Best SQL practice resources"],
    };
  }

  if (msgLower.includes("portfolio") || msgLower.includes("project") || msgLower.includes("github")) {
    return {
      content: "Your portfolio is often the deciding factor for data roles, especially without a traditional CS degree. The ideal portfolio has 3-5 projects covering different aspects: (1) An **end-to-end data pipeline** (ingestion → transformation → visualization using dbt, Airflow, or similar); (2) A **machine learning project** with clear business framing and model evaluation; (3) A **business intelligence dashboard** in Power BI or Tableau with real-world data; (4) An **EDA deep-dive** on an interesting dataset with compelling narrative. Host everything on GitHub with clear READMEs. Add a live demo link where possible — Streamlit is great for this. Want me to review your current portfolio projects?",
      suggestions: ["What data should I use for projects?", "How to make my GitHub profile stand out?", "Review my portfolio score"],
    };
  }

  return {
    content: `Great question about "${message.slice(0, 50)}...". As your AI career coach, I'm here to help you navigate the data job market strategically. I can help you with interview preparation, skill gap analysis, salary negotiation tactics, career transition planning, and portfolio optimization. The data field is moving fast — especially with the explosion of GenAI — and positioning yourself correctly matters enormously. What specific aspect of your career would you like to focus on today?`,
    suggestions: ["Help me prep for interviews", "Review my salary expectations", "Plan my learning roadmap", "Optimize my portfolio"],
  };
}

router.get("/coach/messages", async (_req, res): Promise<void> => {
  const rows = await db.select().from(coachMessagesTable).orderBy(asc(coachMessagesTable.timestamp)).limit(100);

  if (rows.length === 0) {
    const welcome = await db.insert(coachMessagesTable).values({
      role: "assistant",
      content: "Welcome! I'm your AI Career Intelligence Coach. I specialize in data careers — from landing your first analyst role to negotiating Principal Engineer compensation. I have deep knowledge of the current job market, hiring trends, skill demand, and what top companies actually look for. Ask me anything about interview prep, career transitions, salary negotiation, skill development, or portfolio strategy. What's your biggest career challenge right now?",
      suggestions: ["Help me prep for a data interview", "What skills should I learn next?", "How do I negotiate my salary?", "Review my career transition plan"],
    }).returning();
    res.json(welcome.map((r: CoachMessage) => ({ ...r, timestamp: r.timestamp.toISOString(), suggestions: r.suggestions ?? [] })));
    return;
  }

  res.json(rows.map((r: CoachMessage) => ({ ...r, timestamp: r.timestamp.toISOString(), suggestions: r.suggestions ?? [] })));
});

router.post("/coach/chat", async (req, res): Promise<void> => {
  const { message, context } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "message is required" });
    return;
  }

  await db.insert(coachMessagesTable).values({ role: "user", content: message, suggestions: [] });

  const response = generateCoachResponse(message, context);

  const [saved] = await db.insert(coachMessagesTable).values({
    role: "assistant",
    content: response.content,
    suggestions: response.suggestions,
  }).returning();

  res.json({ ...saved, timestamp: saved.timestamp.toISOString(), suggestions: saved.suggestions ?? [] });
});

export default router;
