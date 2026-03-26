/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';

import { logger } from "@/lib/winston";
import Event from "@/models/event";
import type { Request, Response } from "express";

/**
 * purify the event description
 */
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const createEvent = async (req: Request, res: Response): Promise<void> => {
    const { title, description, location, date, time, capacity, banner, isVirtual, status } = req.body;

    const sanitizedDescription = purify.sanitize(description);

    try {
        const userId = req.userId;

        const newEvent = await Event.create({
            title,
            description: sanitizedDescription,
            location,
            date,
            time,
            capacity,
            banner,
            isVirtual,
            status,
            createdBy: userId,
        });

        logger.info(`Event created successfully: ${newEvent}`);

        res.status(201).json({
            event: newEvent,
        });
        
    } catch (error) {
        logger.error('Error while creating Event', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default createEvent;