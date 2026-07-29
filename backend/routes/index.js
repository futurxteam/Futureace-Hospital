import express from "express";
import enquiryRoutes from "./enquiryRoutes.js";

const router = express.Router();

router.use("/enquiries", enquiryRoutes);

export default router;