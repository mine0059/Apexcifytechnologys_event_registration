/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { logger } from "@/lib/winston";

import Registration from "@/models/registration";
import Event from "@/models/event";


import type { Request, Response } from "express";
import { Types } from "mongoose";

const registerEvent = async (req: Request, res: Response) : Promise<void> => {
    const eventId  = req.params.eventId as string;
    const userId = req.userId;

    if (!Types.ObjectId.isValid(eventId)) {
        res.status(400).json({
            code: 'BadRequest',
            message: 'Invalid event ID format',
        });
        return;
    }
    
    try {
        const event = await Event.findById(eventId).select('_id capacity').lean().exec();

        if (!event) {
            res.status(404).json({
                code: 'NotFound',
                message: 'Event not found',
            });
            return;
        }

        const registrationCount = await Registration.countDocuments({ event: eventId });

        if (registrationCount >= event.capacity) {
            res.status(400).json({
                code: 'EventFull',
                message: 'Registration failed, event is at full capacity',
            });
            return;
        }

        const existingRegistration = await Registration.findOne({ event: eventId, user: userId }).lean().exec();

        if (existingRegistration) {
            res.status(400).json({
                code: 'BadRequest',
                message: 'You have already registered for this event',
            });
            return;
        }

        const registration = await Registration.create({
            event: new Types.ObjectId(eventId),
            user: userId,
            registrationDate: new Date(),
        });

        logger.info('New registration for event created', registration);

        res.status(201).json({
            registration
        });
        
    } catch (error) {
        logger.error('Error during Registering for Event', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default registerEvent;