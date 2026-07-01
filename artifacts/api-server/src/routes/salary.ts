import { Router } from "express";
import type { IRouter } from "express";

const router: IRouter = Router();

const SALARY_DATA = [
  { role: "Data Analyst", location: "Bangalore", experience: "Junior", minSalary: 600000, maxSalary: 1000000, avgSalary: 800000, currency: "INR", industry: "Tech" },
  { role: "Data Analyst", location: "Bangalore", experience: "Mid", minSalary: 1000000, maxSalary: 1800000, avgSalary: 1400000, currency: "INR", industry: "Tech" },
  { role: "Data Analyst", location: "Bangalore", experience: "Senior", minSalary: 1800000, maxSalary: 3000000, avgSalary: 2400000, currency: "INR", industry: "Tech" },
  { role: "Data Scientist", location: "Bangalore", experience: "Junior", minSalary: 900000, maxSalary: 1500000, avgSalary: 1200000, currency: "INR", industry: "Tech" },
  { role: "Data Scientist", location: "Bangalore", experience: "Mid", minSalary: 1500000, maxSalary: 2800000, avgSalary: 2200000, currency: "INR", industry: "Tech" },
  { role: "Data Scientist", location: "Bangalore", experience: "Senior", minSalary: 2800000, maxSalary: 5000000, avgSalary: 3800000, currency: "INR", industry: "Tech" },
  { role: "Data Engineer", location: "Bangalore", experience: "Junior", minSalary: 800000, maxSalary: 1400000, avgSalary: 1100000, currency: "INR", industry: "Tech" },
  { role: "Data Engineer", location: "Bangalore", experience: "Mid", minSalary: 1400000, maxSalary: 2600000, avgSalary: 2000000, currency: "INR", industry: "Tech" },
  { role: "Data Engineer", location: "Bangalore", experience: "Senior", minSalary: 2600000, maxSalary: 5000000, avgSalary: 3600000, currency: "INR", industry: "Tech" },
  { role: "ML Engineer", location: "Bangalore", experience: "Mid", minSalary: 1800000, maxSalary: 3500000, avgSalary: 2700000, currency: "INR", industry: "Tech" },
  { role: "ML Engineer", location: "Bangalore", experience: "Senior", minSalary: 3500000, maxSalary: 7000000, avgSalary: 5200000, currency: "INR", industry: "Tech" },
  { role: "Analytics Engineer", location: "Bangalore", experience: "Mid", minSalary: 1200000, maxSalary: 2200000, avgSalary: 1700000, currency: "INR", industry: "Tech" },
  { role: "Data Analyst", location: "Mumbai", experience: "Mid", minSalary: 900000, maxSalary: 1600000, avgSalary: 1250000, currency: "INR", industry: "Finance" },
  { role: "Data Scientist", location: "Mumbai", experience: "Mid", minSalary: 1400000, maxSalary: 2600000, avgSalary: 2000000, currency: "INR", industry: "Finance" },
  { role: "Data Engineer", location: "Mumbai", experience: "Mid", minSalary: 1200000, maxSalary: 2400000, avgSalary: 1800000, currency: "INR", industry: "Finance" },
  { role: "Data Analyst", location: "Hyderabad", experience: "Mid", minSalary: 800000, maxSalary: 1500000, avgSalary: 1100000, currency: "INR", industry: "Tech" },
  { role: "Data Scientist", location: "Hyderabad", experience: "Mid", minSalary: 1200000, maxSalary: 2400000, avgSalary: 1800000, currency: "INR", industry: "Tech" },
  { role: "Data Engineer", location: "Remote", experience: "Mid", minSalary: 1400000, maxSalary: 2800000, avgSalary: 2100000, currency: "INR", industry: "Tech" },
  { role: "Data Scientist", location: "Remote", experience: "Mid", minSalary: 1600000, maxSalary: 3200000, avgSalary: 2500000, currency: "INR", industry: "Tech" },
  { role: "BI Developer", location: "Pune", experience: "Mid", minSalary: 700000, maxSalary: 1300000, avgSalary: 1000000, currency: "INR", industry: "Healthcare" },
];

router.get("/salary/by-role", async (req, res): Promise<void> => {
  const { role, location, experience } = req.query as { role?: string; location?: string; experience?: string };
  let data = SALARY_DATA;
  if (role) data = data.filter(d => d.role.toLowerCase().includes(role.toLowerCase()));
  if (location) data = data.filter(d => d.location.toLowerCase().includes(location.toLowerCase()));
  if (experience) data = data.filter(d => d.experience === experience);
  res.json(data.length > 0 ? data : SALARY_DATA.slice(0, 6));
});

router.get("/salary/trends", async (_req, res): Promise<void> => {
  // One row per year — pivoted so chart X-axis shows each year exactly once
  res.json([
    { year: 2020, "Data Analyst":  650000, "Data Scientist":  980000, "Data Engineer": 1100000 },
    { year: 2021, "Data Analyst":  820000, "Data Scientist": 1250000, "Data Engineer": 1400000 },
    { year: 2022, "Data Analyst": 1050000, "Data Scientist": 1700000, "Data Engineer": 1950000 },
    { year: 2023, "Data Analyst": 1300000, "Data Scientist": 2100000, "Data Engineer": 2400000 },
    { year: 2024, "Data Analyst": 1550000, "Data Scientist": 2600000, "Data Engineer": 2900000 },
    { year: 2025, "Data Analyst": 1850000, "Data Scientist": 3100000, "Data Engineer": 3500000 },
  ]);
});

router.get("/salary/comparison", async (_req, res): Promise<void> => {
  res.json({
    roles: [
      { role: "ML Engineer", avgSalary: 3500000, demand: "Very High" },
      { role: "Data Engineer", avgSalary: 2600000, demand: "Very High" },
      { role: "Data Scientist", avgSalary: 2400000, demand: "High" },
      { role: "Analytics Engineer", avgSalary: 1700000, demand: "High" },
      { role: "Data Analyst", avgSalary: 1400000, demand: "High" },
      { role: "BI Developer", avgSalary: 1000000, demand: "Moderate" },
    ],
    locations: [
      { location: "Bangalore", avgSalary: 2200000, costOfLivingIndex: 1.0 },
      { location: "Mumbai", avgSalary: 2000000, costOfLivingIndex: 1.18 },
      { location: "Delhi NCR", avgSalary: 1800000, costOfLivingIndex: 1.08 },
      { location: "Hyderabad", avgSalary: 1600000, costOfLivingIndex: 0.88 },
      { location: "Pune", avgSalary: 1500000, costOfLivingIndex: 0.90 },
      { location: "Chennai", avgSalary: 1400000, costOfLivingIndex: 0.85 },
      { location: "Remote", avgSalary: 1900000, costOfLivingIndex: 1.0 },
    ],
    industries: [
      { industry: "Technology", avgSalary: 2100000, growth: 18.4 },
      { industry: "Finance / BFSI", avgSalary: 1900000, growth: 14.2 },
      { industry: "Healthcare", avgSalary: 1500000, growth: 22.8 },
      { industry: "E-commerce", avgSalary: 1800000, growth: 16.3 },
      { industry: "Consulting", avgSalary: 1600000, growth: 12.1 },
      { industry: "Media & OTT", avgSalary: 1400000, growth: 9.7 },
    ],
  });
});

export default router;
