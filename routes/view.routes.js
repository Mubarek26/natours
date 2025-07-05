import express from 'express';
import * as viewController from '../controllers/view.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tours/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', viewController.getLoginForm);
export default router;
router.get('/me', authController.protect, viewController.getAccount);
