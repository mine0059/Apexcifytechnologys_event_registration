/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';

import { logger } from "@/lib/winston";
import User from "@/models/user";
import Event from "@/models/event";
import type { Request, Response } from "express";

/**
 * purify the event description
 */
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const updateEvent = async (req: Request, res: Response): Promise<void> => {
    const { title, description, location, date, time, capacity, banner, isVirtual, status } = req.body;

    try {
        const userId = req.userId;
        const eventId = req.params.eventId;

        const user = await User.findById(userId)
                    .select('role')
                    .lean()
                    .exec();
        
        const event = await Event.findById(eventId)
                    .select('-__v')
                    .exec();

        if (!event) {
            res.status(404).json({
                code: 'NotFound',
                message: 'Event not found',
            });
            return;
        }

        if (event.createdBy != userId && user?.role !== 'admin') {
            res.status(403).json({
                code: 'AuthorizationError',
                message: 'Access denied, insufficient permissions',
            });

            logger.warn('A user tired to update a Event without permission', {
                userId,
                event,
            });
            return;
        }

        if (title) event.title = title;
        if (description) event.description = purify.sanitize(description);
        if (location) event.location = location;
        if (date) event.date = date; // date is already ISO string from validation transform
        if (time) event.time = time;
        if (capacity) event.capacity = capacity;
        if (banner) event.banner = banner;
        if (isVirtual !== undefined) event.isVirtual = isVirtual;
        if (status) event.status = status;

        await event.save();

        logger.info(`Event updated successfully: ${ event }`);

        res.status(200).json({
            event,
        });
    } catch (error) {
        logger.error('Error while updating Event', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default updateEvent;
