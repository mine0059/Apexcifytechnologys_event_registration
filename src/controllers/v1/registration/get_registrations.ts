/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { logger } from "@/lib/winston";

import Registration from "@/models/registration";

import type { Request, Response } from "express";

const getRegistrations = async (req: Request, res: Response) : Promise<void> => {
    const userId = req.userId;

    try {
        const registrations = await Registration.find({ user: userId })
            .select('event registrationDate')
            .populate('event', 'title date location')
            .sort({ registrationDate: -1 })
            .lean()
            .exec();

        res.status(200).json({
            registrations
        });

    } catch (error) {
        logger.error('Error fetching registrations', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default getRegistrations;