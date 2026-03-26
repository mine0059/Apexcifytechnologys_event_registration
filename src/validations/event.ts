/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { z } from 'zod';

/**
 * Parse and validate date from multiple formats
 * Accepts: ISO 8601 (2026-09-05T23:00:00.000Z), DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY
 */
const parseDateString = (dateStr: string): Date | null => {
    // Try ISO 8601 format first
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
        return isoDate;
    }

    // Try DD/MM/YYYY format (e.g., 25/10/2027)
    const ddmmyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const ddmmyyyyMatch = dateStr.match(ddmmyyyyRegex);
    if (ddmmyyyyMatch) {
        const [, day, month, year] = ddmmyyyyMatch;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        if (!isNaN(date.getTime())) {
            return date;
        }
    }

    // Try DD-MM-YYYY format (e.g., 25-10-2027)
    const ddmmyyyyDashRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
    const ddmmyyyyDashMatch = dateStr.match(ddmmyyyyDashRegex);
    if (ddmmyyyyDashMatch) {
        const [, day, month, year] = ddmmyyyyDashMatch;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        if (!isNaN(date.getTime())) {
            return date;
        }
    }

    // Try MM/DD/YYYY format (e.g., 10/25/2027)
    const mmddyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const mmddyyyyMatch = dateStr.match(mmddyyyyRegex);
    if (mmddyyyyMatch) {
        const [, month, day, year] = mmddyyyyMatch;
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        if (!isNaN(date.getTime())) {
            return date;
        }
    }

    return null;
};

const dateSchema = z.string().refine((val) => parseDateString(val) !== null, {
    message: 'Invalid date format. Use: ISO 8601 (2026-09-05), DD/MM/YYYY (25/10/2027), or DD-MM-YYYY',
}).transform((val) => parseDateString(val)!.toISOString());

export const createEventSchema = z.object({
    title: z.string().trim().max(180, { message: 'Title must be less than 180 characters' }),
    description: z.string().trim(),
    location: z.string().trim(),
    date: dateSchema,
    time: z.string().optional(),
    capacity: z.coerce.number().int().positive({ message: 'Capacity must be a positive integer' }),
    banner: z.object({
        publicId: z.string(),
        url: z.string(),
        width: z.coerce.number().int().positive(),
        height: z.coerce.number().int().positive(),
    }).optional(),
    isVirtual: z.union([z.boolean(), z.string()]).transform((val) => {
        if (typeof val === 'boolean') return val;
        return val === 'true' || val === '1';
    }).default(false),
    status: z.enum(['draft', 'published'], { message: 'Status must be either draft or published' }).default('published'),
});

export const updateEventSchema = z.object({
    title: z.string().trim().max(180, { message: 'Title must be less than 180 characters' }).optional(),
    description: z.string().trim().optional(),
    location: z.string().trim().optional(),
    date: dateSchema.optional(),
    time: z.string().optional(),
    capacity: z.coerce.number().int().positive({ message: 'Capacity must be a positive integer' }).optional(),
    banner: z.object({
        publicId: z.string(),
        url: z.string(),
        width: z.coerce.number().int().positive(),
        height: z.coerce.number().int().positive(),
    }).optional(),
    isVirtual: z.union([z.boolean(), z.string()]).transform((val) => {
        if (typeof val === 'boolean') return val;
        return val === 'true' || val === '1';
    }).optional(),
    status: z.enum(['draft', 'published'], { message: 'Status must be either draft or published' }).optional(),
});

export const eventIdParamSchema = z.object({
    eventId: z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid event ID' }),
});

export const getAllEventsQuerySchema = z.object({
    limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => val === undefined || (val >= 1 && val <= 50), { message: 'Limit must be between 1 and 50' }),
    offset: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => val === undefined || val >= 0, { message: 'Offset must be a non-negative integer' }),
});