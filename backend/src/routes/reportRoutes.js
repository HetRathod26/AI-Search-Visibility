import express from "express";
import { getReport } from "../controllers/reportController.js";

const router = express.Router();

router.post("/report", getReport);

export default router;
