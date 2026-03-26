/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { v2 as cloudinary } from 'cloudinary';

import { logger } from "@/lib/winston";

import Event from "@/models/event";
import User from '@/models/user';

import type { Request, Response } from "express";

const deleteEvent = async (req: Request, res: Response) : Promise<void> => {
    try {
        const userId = req.userId;
        const eventId = req.params.eventId;

        const user = await User.findById(userId)
                .select('role')
                .lean()
                .exec();
        const event = await Event.findById(eventId)
                .select('createdBy banner.publicId')
                .lean()
                .exec();
        
        if (!event) {
            res.status(404).json({
                code: 'NotFound',
                message: 'Event not found'
            });
            return;
        }

        if (event.createdBy !== userId && user?.role !== 'admin') {
            res.status(403).json({
                code: 'AuthorizationError',
                message: 'Access denied, insufficient permissions'
            });

            logger.warn('A user tried to delete a Event without permission', {
                userId,
            });

            return;
        }

        await cloudinary.uploader.destroy(event.banner.publicId);
        logger.info('Event banner deleted from cloudinary', {
            publicId: event.banner.publicId,
        });

        await Event.deleteOne({ _id: eventId });

        logger.info('Event deleted successfully', {
            eventId
        });

        res.sendStatus(204);
    } catch (error) {
        logger.error('Error while deleting Event', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default deleteEvent;