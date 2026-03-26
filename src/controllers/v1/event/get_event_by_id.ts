/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { logger } from "@/lib/winston";

import Event from "@/models/event";
import User from "@/models/user";

import type { Request, Response } from "express";

const getEventById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const id = req.params.eventId;
        const userId = req.userId;

        const user = await User.findById(userId).select('role').lean().exec();

        const event = await Event.findById(id)
                    .select('-banner.publicId -__v')
                    .populate('createdBy', '-createdAt -updatedAt -__v')
                    .lean()
                    .exec();

        if (!event) {
            res.status(404).json({
                code: 'NotFound',
                message: 'Event not found',
            });
            return;
        }

        if (user?.role === 'user' && event.status === 'draft') { 
            res.status(403).json({
                code: 'AuthorizationError',
                message: 'Access denied, Insufficient permissions',
            });

            logger.warn('A user tried to access a draft event', {
                userId,
                event,
            });
            return;
        }

        res.status(200).json({
            event,
        });
        
    } catch (error) {
        logger.error('Error while fetching Event by ID', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default getEventById;