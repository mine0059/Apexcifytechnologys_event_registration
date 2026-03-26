/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { logger } from "@/lib/winston";
import config from "@/config";

import Event from "@/models/event";
import User from "@/models/user";

import type { Request, Response } from "express";

interface QueryType {
    status?: 'draft' | 'published';
}

const getAllEvents = async (req: Request, res: Response) : Promise<void> => {
    try {
        const userId = req.userId;
        const limit = parseInt(req.query.limit as string) || config.defaultResLimit;
        const offset = parseInt(req.query.offset as string) || config.defaultResOffset;

        const user = await User.findById(userId).select('role').lean().exec();
        const query: QueryType = {};

        if (user?.role !== 'admin') {
            query.status = 'published';
        }

        const total = await Event.countDocuments(query);
        const events = await Event.find(query)
            .select('-banner.publicId -__v')
            .populate('createdBy', '-createdAt -updatedAt -__v')
            .limit(limit)
            .skip(offset)
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        
        res.status(200).json({
            limit,
            offset,
            total,
            events,
        });

    } catch (error) {
        logger.error('Error while fetching Events', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default getAllEvents;