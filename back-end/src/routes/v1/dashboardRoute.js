// routes/v1/dashboardRoute.js
import express from 'express';
import { dashboardController } from '~/controllers/dashboardController';
import { authMiddleware } from '~/middlewares/authMiddleware';

const Router = express.Router();

// API route để lấy dữ liệu tổng quan cho dashboard
Router.get('/', authMiddleware.isAuthorized, dashboardController.getDashboardData);

export const dashboardRoute = Router;
