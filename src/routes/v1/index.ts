/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { Router } from "express";

const router = Router();

// Routes
import authRoutes from '@/routes/v1/auth';
import eventRoutes from '@/routes/v1/event';
import registrationRoutes from '@/routes/v1/registration';

// Root route
router.get('/', (_, res) => {
    res.status(200).json({
        message: "API is live",
        status: 'Ok',
        version: '1.0.0',
        docs: '',
        timestamp: new Date().toISOString(),
    });
});

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/registrations', registrationRoutes);

export default router;