import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { AuthService } from '../domain/auth.service.js';
import { asyncHandler } from '../../../shared/utils/async-handler.js';

const controller = new AuthController(new AuthService());

export const authRouter = Router();
authRouter.get('/me', asyncHandler(controller.getMe.bind(controller)));
