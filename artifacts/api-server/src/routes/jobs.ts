import { Router } from "express";
import type { IRouter } from "express";

const router: IRouter = Router();

const JOB_LISTINGS = [
  // ── INDIA ─────────────────────────────────────────────────────────────────
  { id: 1,  title: "Senior Data Analyst",          company: "Google",        country: "India", location: "Bengaluru, India",       remote: false, salaryMin: 1800000, salaryMax: 3200000, currency: "INR", skills: ["SQL", "Python", "Tableau", "Statistics", "BigQuery"], postedAt: new Date(Date.now() - 86400000 * 1).toISOString(), matchScore: 93, industry: "Tech",         experienceLevel: "Senior" },
  { id: 2,  title: "Business Intelligence Analyst", company: "Amazon",        country: "India", location: "Hyderabad, India",       remote: false, salaryMin: 1200000, salaryMax: 2400000, currency: "INR", skills: ["SQL", "Power BI", "Excel", "Data Modeling", "Redshift"], postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 88, industry: "E-commerce", experienceLevel: "Mid" },
  { id: 3,  title: "Data Scientist",               company: "Microsoft",     country: "India", location: "Hyderabad, India",       remote: true,  salaryMin: 2000000, salaryMax: 4500000, currency: "INR", skills: ["Python", "Machine Learning", "Statistics", "Azure ML", "SQL"], postedAt: new Date(Date.now() - 86400000 * 1).toISOString(), matchScore: 84, industry: "Tech",         experienceLevel: "Senior" },
  { id: 4,  title: "Data Analyst",                 company: "Flipkart",      country: "India", location: "Bengaluru, India",       remote: false, salaryMin: 800000,  salaryMax: 1800000, currency: "INR", skills: ["SQL", "Excel", "Power BI", "Python", "Hive"],        postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 91, industry: "E-commerce", experienceLevel: "Mid" },
  { id: 5,  title: "Analytics Consultant",         company: "Deloitte",      country: "India", location: "Mumbai, India",          remote: false, salaryMin: 900000,  salaryMax: 2200000, currency: "INR", skills: ["SQL", "Power BI", "Excel", "Analytics", "Tableau"],  postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 86, industry: "Consulting",  experienceLevel: "Mid" },
  { id: 6,  title: "Data Engineer",                company: "PhonePe",       country: "India", location: "Bengaluru, India",       remote: true,  salaryMin: 2200000, salaryMax: 4000000, currency: "INR", skills: ["Kafka", "Spark", "Python", "SQL", "Databricks"],    postedAt: new Date(Date.now() - 86400000 * 1).toISOString(), matchScore: 87, industry: "Fintech",     experienceLevel: "Senior" },
  { id: 7,  title: "ML Engineer",                  company: "Swiggy",        country: "India", location: "Bengaluru, India",       remote: true,  salaryMin: 2500000, salaryMax: 5000000, currency: "INR", skills: ["Python", "PyTorch", "MLflow", "AWS", "Recommendation Systems"], postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 76, industry: "Food Tech",   experienceLevel: "Senior" },
  { id: 8,  title: "Business Intelligence Lead",   company: "Zomato",        country: "India", location: "Gurugram, India",        remote: true,  salaryMin: 1800000, salaryMax: 3400000, currency: "INR", skills: ["SQL", "Power BI", "Python", "Airflow", "ETL/ELT Pipelines"], postedAt: new Date(Date.now() - 86400000 * 4).toISOString(), matchScore: 85, industry: "Food Tech",   experienceLevel: "Senior" },
  { id: 9,  title: "Analytics Engineer",           company: "Razorpay",      country: "India", location: "Bengaluru, India",       remote: true,  salaryMin: 1800000, salaryMax: 3000000, currency: "INR", skills: ["dbt", "SQL", "Python", "Snowflake", "Data Modeling"], postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 90, industry: "Fintech",     experienceLevel: "Mid" },
  { id: 10, title: "Data Analyst",                 company: "TCS",           country: "India", location: "Pune, India",            remote: false, salaryMin: 600000,  salaryMax: 1200000, currency: "INR", skills: ["SQL", "Excel", "Tableau", "Python", "Power BI"],     postedAt: new Date(Date.now() - 86400000 * 5).toISOString(), matchScore: 82, industry: "IT Services", experienceLevel: "Junior" },
  { id: 11, title: "Data Engineer",                company: "Infosys",       country: "India", location: "Bengaluru, India",       remote: false, salaryMin: 800000,  salaryMax: 1600000, currency: "INR", skills: ["Python", "SQL", "Spark", "AWS", "ETL/ELT Pipelines"], postedAt: new Date(Date.now() - 86400000 * 4).toISOString(), matchScore: 79, industry: "IT Services", experienceLevel: "Mid" },
  { id: 12, title: "Data Scientist",               company: "Wipro",         country: "India", location: "Hyderabad, India",       remote: false, salaryMin: 1000000, salaryMax: 2000000, currency: "INR", skills: ["Python", "Machine Learning", "SQL", "Scikit-learn", "Statistics"], postedAt: new Date(Date.now() - 86400000 * 6).toISOString(), matchScore: 74, industry: "IT Services", experienceLevel: "Mid" },
  { id: 13, title: "Analytics Consultant",         company: "Accenture",     country: "India", location: "Mumbai, India",          remote: false, salaryMin: 1000000, salaryMax: 2400000, currency: "INR", skills: ["SQL", "Power BI", "Python", "Tableau", "Data Modeling"], postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 83, industry: "Consulting",  experienceLevel: "Mid" },
  { id: 14, title: "BI Developer",                 company: "Cognizant",     country: "India", location: "Chennai, India",         remote: false, salaryMin: 700000,  salaryMax: 1400000, currency: "INR", skills: ["SQL", "Power BI", "SSRS", "DAX", "Excel"],           postedAt: new Date(Date.now() - 86400000 * 7).toISOString(), matchScore: 77, industry: "IT Services", experienceLevel: "Mid" },
  { id: 15, title: "BI Developer",                 company: "Capgemini",     country: "India", location: "Pune, India",            remote: false, salaryMin: 800000,  salaryMax: 1600000, currency: "INR", skills: ["SQL", "Tableau", "Power BI", "ETL/ELT Pipelines", "Python"], postedAt: new Date(Date.now() - 86400000 * 5).toISOString(), matchScore: 78, industry: "Consulting",  experienceLevel: "Mid" },
  { id: 16, title: "Data Engineer",                company: "IBM",           country: "India", location: "Bengaluru, India",       remote: true,  salaryMin: 1200000, salaryMax: 2200000, currency: "INR", skills: ["Python", "Spark", "SQL", "Db2", "Airflow"],          postedAt: new Date(Date.now() - 86400000 * 4).toISOString(), matchScore: 81, industry: "Tech",         experienceLevel: "Mid" },
  { id: 17, title: "Senior Data Scientist",        company: "Adobe",         country: "India", location: "Noida, India",           remote: true,  salaryMin: 2200000, salaryMax: 4200000, currency: "INR", skills: ["Python", "Machine Learning", "SQL", "A/B Testing", "Statistics"], postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 86, industry: "Tech",         experienceLevel: "Senior" },
  { id: 18, title: "Data Analyst",                 company: "PayPal",        country: "India", location: "Chennai, India",         remote: true,  salaryMin: 1000000, salaryMax: 2000000, currency: "INR", skills: ["SQL", "Python", "Tableau", "Excel", "Statistics"],   postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 84, industry: "Fintech",     experienceLevel: "Mid" },
  { id: 19, title: "Data Scientist",               company: "LinkedIn",      country: "India", location: "Bengaluru, India",       remote: true,  salaryMin: 2400000, salaryMax: 4800000, currency: "INR", skills: ["Python", "Machine Learning", "SQL", "Spark", "Statistics"], postedAt: new Date(Date.now() - 86400000 * 1).toISOString(), matchScore: 79, industry: "Tech",         experienceLevel: "Senior" },
  { id: 20, title: "Data Platform Engineer",       company: "Meesho",        country: "India", location: "Bengaluru, India",       remote: true,  salaryMin: 2400000, salaryMax: 4500000, currency: "INR", skills: ["Airflow", "Spark", "Python", "SQL", "GCP"],          postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 88, industry: "E-commerce", experienceLevel: "Senior" },
  // ── USA ───────────────────────────────────────────────────────────────────
  { id: 21, title: "Senior Data Analyst",          company: "Stripe",        country: "USA",   location: "San Francisco, CA, USA", remote: true,  salaryMin: 140000,  salaryMax: 220000,  currency: "USD", skills: ["SQL", "Python", "Tableau", "Statistics", "Looker"],  postedAt: new Date(Date.now() - 86400000 * 1).toISOString(), matchScore: 88, industry: "Fintech",     experienceLevel: "Senior" },
  { id: 22, title: "Analytics Engineer",           company: "Databricks",    country: "USA",   location: "San Francisco, CA, USA", remote: true,  salaryMin: 160000,  salaryMax: 280000,  currency: "USD", skills: ["dbt", "SQL", "Python", "Spark", "Delta Lake"],       postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 85, industry: "Tech",         experienceLevel: "Senior" },
  { id: 23, title: "Data Scientist — ML",          company: "OpenAI",        country: "USA",   location: "San Francisco, CA, USA", remote: false, salaryMin: 220000,  salaryMax: 450000,  currency: "USD", skills: ["Python", "PyTorch", "LLM", "Statistics", "Machine Learning"], postedAt: new Date(Date.now() - 86400000 * 1).toISOString(), matchScore: 65, industry: "AI",           experienceLevel: "Senior" },
  { id: 24, title: "Data Scientist — Pricing",     company: "Uber",          country: "USA",   location: "San Francisco, CA, USA", remote: false, salaryMin: 180000,  salaryMax: 300000,  currency: "USD", skills: ["Python", "Machine Learning", "SQL", "Spark", "Statistics"], postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 75, industry: "Tech",         experienceLevel: "Senior" },
  { id: 25, title: "Data Engineer",                company: "Airbnb",        country: "USA",   location: "San Francisco, CA, USA", remote: true,  salaryMin: 165000,  salaryMax: 260000,  currency: "USD", skills: ["Airflow", "Spark", "Python", "SQL", "AWS"],          postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 82, industry: "Tech",         experienceLevel: "Senior" },
  { id: 26, title: "Senior Data Scientist",        company: "Netflix",       country: "USA",   location: "Los Gatos, CA, USA",     remote: false, salaryMin: 200000,  salaryMax: 380000,  currency: "USD", skills: ["Python", "Machine Learning", "A/B Testing", "SQL", "Statistics"], postedAt: new Date(Date.now() - 86400000 * 4).toISOString(), matchScore: 68, industry: "Media",        experienceLevel: "Senior" },
  { id: 27, title: "Data Science Manager",         company: "Meta",          country: "USA",   location: "Menlo Park, CA, USA",    remote: false, salaryMin: 220000,  salaryMax: 380000,  currency: "USD", skills: ["Python", "Machine Learning", "SQL", "Spark", "Leadership"], postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 60, industry: "Tech",         experienceLevel: "Manager" },
  { id: 28, title: "ML Engineer",                  company: "Apple",         country: "USA",   location: "Cupertino, CA, USA",     remote: false, salaryMin: 195000,  salaryMax: 340000,  currency: "USD", skills: ["Python", "PyTorch", "Machine Learning", "MLflow", "SQL"], postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 72, industry: "Tech",         experienceLevel: "Senior" },
  { id: 29, title: "Analytics Engineer",           company: "Salesforce",    country: "USA",   location: "New York, NY, USA",      remote: true,  salaryMin: 150000,  salaryMax: 240000,  currency: "USD", skills: ["dbt", "SQL", "Python", "Snowflake", "Tableau"],      postedAt: new Date(Date.now() - 86400000 * 5).toISOString(), matchScore: 87, industry: "SaaS",         experienceLevel: "Mid" },
  { id: 30, title: "ML Research Engineer",         company: "NVIDIA",        country: "USA",   location: "Santa Clara, CA, USA",   remote: false, salaryMin: 210000,  salaryMax: 380000,  currency: "USD", skills: ["Python", "PyTorch", "CUDA", "Machine Learning", "LLM"], postedAt: new Date(Date.now() - 86400000 * 1).toISOString(), matchScore: 58, industry: "AI",           experienceLevel: "Senior" },
  { id: 31, title: "Data Engineer",                company: "Amazon",        country: "USA",   location: "Seattle, WA, USA",       remote: false, salaryMin: 145000,  salaryMax: 230000,  currency: "USD", skills: ["SQL", "Python", "Redshift", "Airflow", "AWS"],       postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 80, industry: "E-commerce", experienceLevel: "Mid" },
  { id: 32, title: "Staff Data Scientist",         company: "Google",        country: "USA",   location: "New York, NY, USA",      remote: false, salaryMin: 230000,  salaryMax: 420000,  currency: "USD", skills: ["Python", "SQL", "Machine Learning", "Statistics", "BigQuery"], postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 63, industry: "Tech",         experienceLevel: "Staff" },
  // ── UK ────────────────────────────────────────────────────────────────────
  { id: 33, title: "Data Analyst",                 company: "Deliveroo",     country: "UK",    location: "London, UK",             remote: true,  salaryMin: 65000,   salaryMax: 95000,   currency: "GBP", skills: ["SQL", "Python", "Tableau", "Data Modeling", "dbt"],  postedAt: new Date(Date.now() - 86400000 * 4).toISOString(), matchScore: 83, industry: "Food Tech",   experienceLevel: "Mid" },
  { id: 34, title: "Data Scientist",               company: "Revolut",       country: "UK",    location: "London, UK",             remote: true,  salaryMin: 80000,   salaryMax: 130000,  currency: "GBP", skills: ["Python", "Machine Learning", "SQL", "Statistics", "Spark"], postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 79, industry: "Fintech",     experienceLevel: "Senior" },
  // ── Singapore ─────────────────────────────────────────────────────────────
  { id: 35, title: "Data Engineer",                company: "Grab",          country: "Singapore", location: "Singapore",          remote: false, salaryMin: 120000,  salaryMax: 180000,  currency: "SGD", skills: ["Python", "Spark", "Kafka", "SQL", "GCP"],           postedAt: new Date(Date.now() - 86400000 * 3).toISOString(), matchScore: 76, industry: "Tech",         experienceLevel: "Mid" },
  { id: 36, title: "Analytics Engineer",           company: "Shopee",        country: "Singapore", location: "Singapore",          remote: false, salaryMin: 100000,  salaryMax: 160000,  currency: "SGD", skills: ["dbt", "SQL", "Python", "Spark", "Data Modeling"],   postedAt: new Date(Date.now() - 86400000 * 5).toISOString(), matchScore: 81, industry: "E-commerce", experienceLevel: "Mid" },
  // ── Germany ───────────────────────────────────────────────────────────────
  { id: 37, title: "Data Scientist",               company: "N26",           country: "Germany",   location: "Berlin, Germany",    remote: true,  salaryMin: 80000,   salaryMax: 130000,  currency: "EUR", skills: ["Python", "Machine Learning", "SQL", "Statistics", "dbt"], postedAt: new Date(Date.now() - 86400000 * 4).toISOString(), matchScore: 72, industry: "Fintech",     experienceLevel: "Senior" },
  // ── Canada ────────────────────────────────────────────────────────────────
  { id: 38, title: "Analytics Engineer",           company: "Shopify",       country: "Canada",    location: "Toronto, Canada",    remote: true,  salaryMin: 140000,  salaryMax: 220000,  currency: "USD", skills: ["dbt", "SQL", "Python", "Snowflake", "Looker"],       postedAt: new Date(Date.now() - 86400000 * 2).toISOString(), matchScore: 84, industry: "E-commerce", experienceLevel: "Mid" },
];

router.get("/jobs/listings", async (req, res): Promise<void> => {
  const { role, location, remote, region } = req.query as { role?: string; location?: string; remote?: string; region?: string };
  let listings = JOB_LISTINGS;
  if (role) listings = listings.filter(j => j.title.toLowerCase().includes(role.toLowerCase()));
  if (location) listings = listings.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
  if (remote === "true") listings = listings.filter(j => j.remote);
  if (region === "India") listings = listings.filter(j => j.country === "India");
  if (region === "Global") listings = listings.filter(j => j.country !== "India");
  res.json(listings);
});

router.get("/jobs/top-companies", async (_req, res): Promise<void> => {
  res.json([
    { name: "Google",      industry: "Tech",          openRoles: 486, avgSalary: "₹28L / $250K", rating: 4.5, remote: false, topSkills: ["Python", "BigQuery", "SQL", "Statistics"] },
    { name: "Microsoft",   industry: "Tech",          openRoles: 412, avgSalary: "₹35L / $200K", rating: 4.3, remote: true,  topSkills: ["Azure ML", "Python", "Power BI", "SQL"] },
    { name: "Amazon",      industry: "E-commerce",    openRoles: 698, avgSalary: "₹18L / $190K", rating: 3.9, remote: false, topSkills: ["SQL", "Python", "Redshift", "AWS"] },
    { name: "Flipkart",    industry: "E-commerce",    openRoles: 218, avgSalary: "₹14L",         rating: 4.2, remote: true,  topSkills: ["SQL", "Python", "Hive", "Spark"] },
    { name: "PhonePe",     industry: "Fintech",       openRoles: 134, avgSalary: "₹30L",         rating: 4.5, remote: false, topSkills: ["Kafka", "Spark", "Python", "SQL"] },
    { name: "Databricks",  industry: "Tech",          openRoles: 124, avgSalary: "$220K",         rating: 4.7, remote: true,  topSkills: ["Spark", "dbt", "SQL", "Python"] },
    { name: "Razorpay",    industry: "Fintech",       openRoles: 98,  avgSalary: "₹24L",         rating: 4.6, remote: true,  topSkills: ["dbt", "SQL", "Python", "Snowflake"] },
    { name: "Deloitte",    industry: "Consulting",    openRoles: 312, avgSalary: "₹16L",         rating: 4.0, remote: false, topSkills: ["SQL", "Power BI", "Excel", "Tableau"] },
    { name: "NVIDIA",      industry: "AI",            openRoles: 86,  avgSalary: "$295K",         rating: 4.6, remote: false, topSkills: ["Python", "PyTorch", "CUDA", "ML"] },
    { name: "OpenAI",      industry: "AI",            openRoles: 42,  avgSalary: "$330K",         rating: 4.8, remote: false, topSkills: ["Python", "PyTorch", "LLM", "ML"] },
  ]);
});

router.get("/jobs/market-overview", async (_req, res): Promise<void> => {
  res.json({
    totalOpenings: 284750,
    remotePercentage: 44.2,
    avgTimeToHire: 34,
    demandGrowth: 21.8,
    topLocations: [
      { location: "Bengaluru, India",        openings: 58400, growth: 19.2 },
      { location: "San Francisco, USA",       openings: 42800, growth: 14.6 },
      { location: "Hyderabad, India",         openings: 22100, growth: 16.4 },
      { location: "New York, USA",            openings: 32400, growth: 11.8 },
      { location: "London, UK",               openings: 18700, growth: 13.2 },
      { location: "Remote (Global)",          openings: 68400, growth: 31.4 },
    ],
    roleBreakdown: [
      { role: "Data Analyst",        openings: 94200,  percentage: 33.1 },
      { role: "Data Engineer",       openings: 78400,  percentage: 27.5 },
      { role: "Data Scientist",      openings: 52300,  percentage: 18.4 },
      { role: "ML Engineer",         openings: 31800,  percentage: 11.2 },
      { role: "Analytics Engineer",  openings: 28050,  percentage: 9.8 },
    ],
    industryDemand: [
      { industry: "Technology",   openings: 98500, growth: 21.4 },
      { industry: "Fintech",      openings: 52400, growth: 28.7 },
      { industry: "E-commerce",   openings: 42200, growth: 17.2 },
      { industry: "AI / GenAI",   openings: 28600, growth: 184.0 },
      { industry: "Healthcare",   openings: 24800, growth: 32.1 },
      { industry: "IT Services",  openings: 38900, growth: 8.4 },
    ],
  });
});

router.get("/jobs/predictions", async (_req, res): Promise<void> => {
  res.json([
    { skill: "LLM / GenAI",          currentDemand: 31400,  predictedDemand: 89000,  growthRate: 184.0, timeframe: "12 months", confidence: 0.92, insight: "GenAI engineering is the fastest-growing data skill globally. Startups and MNCs are building dedicated AI teams at unprecedented speed across India, USA, and Europe." },
    { skill: "dbt",                  currentDemand: 18400,  predictedDemand: 42000,  growthRate: 128.3, timeframe: "12 months", confidence: 0.88, insight: "The modern data stack is standardising on dbt for transformation — across Indian fintechs, US scale-ups, and European tech companies alike." },
    { skill: "Databricks",           currentDemand: 19600,  predictedDemand: 38000,  growthRate: 94.0,  timeframe: "12 months", confidence: 0.84, insight: "Databricks is winning the lakehouse battle worldwide. Expect job postings to rival Snowflake in volume by mid-2025." },
    { skill: "Python",               currentDemand: 87420,  predictedDemand: 112000, growthRate: 28.1,  timeframe: "12 months", confidence: 0.96, insight: "Python is non-negotiable for every data role globally. Demand is rising across all seniority levels and geographies." },
    { skill: "Analytics Engineering", currentDemand: 28050, predictedDemand: 48000,  growthRate: 71.1,  timeframe: "12 months", confidence: 0.86, insight: "The analytics engineer role is maturing from niche to standard — especially at Indian unicorns, US tech, and EMEA scale-ups." },
    { skill: "Snowflake",            currentDemand: 24800,  predictedDemand: 41000,  growthRate: 65.3,  timeframe: "12 months", confidence: 0.82, insight: "Snowflake adoption is accelerating in India's BFSI sector and US enterprise. Its Cortex AI layer is expanding opportunities further." },
  ]);
});

export default router;
