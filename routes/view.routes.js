import express from "express";
import * as viewController from "../controllers/view.controller.js";
import * as authController from "../controllers/auth.controller.js";


const router = express.Router();

// Middleware to check if the user is logged in
router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tours/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);
export default router;