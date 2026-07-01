import { pgTable, serial, text, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioProjectsTable = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  skills: jsonb("skills").notNull().$type<string[]>(),
  category: text("category").notNull(),
  score: integer("score").notNull().default(0),
  recruiterReadiness: text("recruiter_readiness").notNull().default("Needs Work"),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  complexity: text("complexity").notNull().default("Intermediate"),
  impact: text("impact").notNull().default("Medium"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPortfolioProjectSchema = createInsertSchema(portfolioProjectsTable).omit({ id: true, createdAt: true, score: true, recruiterReadiness: true, impact: true });
export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;
export type PortfolioProject = typeof portfolioProjectsTable.$inferSelect;

export const resumeAnalysesTable = pgTable("resume_analyses", {
  id: serial("id").primaryKey(),
  targetRole: text("target_role").notNull(),
  targetIndustry: text("target_industry"),
  resumeText: text("resume_text").notNull(),
  atsScore: integer("ats_score").notNull(),
  overallScore: integer("overall_score").notNull(),
  formatScore: integer("format_score").notNull(),
  contentScore: integer("content_score").notNull(),
  keywordScore: integer("keyword_score").notNull(),
  strengths: jsonb("strengths").notNull().$type<string[]>(),
  weaknesses: jsonb("weaknesses").notNull().$type<string[]>(),
  missingKeywords: jsonb("missing_keywords").notNull().$type<string[]>(),
  suggestedKeywords: jsonb("suggested_keywords").notNull().$type<string[]>(),
  improvements: jsonb("improvements").notNull().$type<Array<{ section: string; priority: string; suggestion: string }>>(),
  skillsDetected: jsonb("skills_detected").notNull().$type<string[]>(),
  analyzedAt: timestamp("analyzed_at").defaultNow().notNull(),
});

export type ResumeAnalysis = typeof resumeAnalysesTable.$inferSelect;

export const coachMessagesTable = pgTable("coach_messages", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  suggestions: jsonb("suggestions").$type<string[]>(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type CoachMessage = typeof coachMessagesTable.$inferSelect;

export const roadmapsTable = pgTable("roadmaps", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  targetRole: text("target_role").notNull(),
  currentRole: text("current_role").notNull(),
  timeframe: text("timeframe").notNull(),
  completionPercentage: integer("completion_percentage").notNull().default(0),
  phases: jsonb("phases").notNull().$type<Array<{ phase: number; title: string; duration: string; skills: string[]; milestone: string; completed: boolean }>>(),
  resources: jsonb("resources").notNull().$type<Array<{ title: string; type: string; platform: string; duration: string; difficulty: string; url?: string }>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Roadmap = typeof roadmapsTable.$inferSelect;
