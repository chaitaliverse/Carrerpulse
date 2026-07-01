import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import skillsRouter from "./skills";
import salaryRouter from "./salary";
import resumeRouter from "./resume";
import coachRouter from "./coach";
import roadmapRouter from "./roadmap";
import jobsRouter from "./jobs";
import portfolioRouter from "./portfolio";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(skillsRouter);
router.use(salaryRouter);
router.use(resumeRouter);
router.use(coachRouter);
router.use(roadmapRouter);
router.use(jobsRouter);
router.use(portfolioRouter);

export default router;
