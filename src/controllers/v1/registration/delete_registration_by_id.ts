/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { logger } from "@/lib/winston";

import Registration from "@/models/registration";
import User from "@/models/user";

import type { Request, Response } from "express";

const deleteRegistrationById = async (req: Request, res: Response) : Promise<void> => {
    const { id } = req.params;
    const currentUserId = req.userId;

    try {
        const registration = await Registration.findById(id).select('user').lean().exec();

        if (!registration) {
            res.status(404).json({
                code: 'NotFound',
                message: 'Registration not found',
            });
            return;
        }

        const user = await User.findById(currentUserId).select('role').lean().exec();

        if (!user) {
            res.status(404).json({
                code: 'NotFound',
                message: 'User not found',
            });
            return;
        }

        await Registration.deleteOne({ _id: id });

        logger.info('Registration deleted successfully', {
            id
        });

        res.sendStatus(204);
    } catch (error) {
        logger.error('Error while deleting registration', error);
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
        });
    }
}

export default deleteRegistrationById;

