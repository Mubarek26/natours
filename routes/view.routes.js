import express from "express";
import * as viewController from "../controllers/view.controller.js";

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/tours/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);
export default router;