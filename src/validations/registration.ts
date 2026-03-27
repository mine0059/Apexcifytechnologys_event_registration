/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { z } from 'zod';

export const eventIdParamSchemaRegistration = z.object({
    eventId: z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid event ID' }),
});

export const registrationIdParamSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid registration ID' }),
});
