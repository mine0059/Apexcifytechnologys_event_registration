/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { Router } from "express";
import multer from "multer";

import authenticated from "@/middlewares/authenticated";
import authorize from "@/middlewares/authorize";
import uploadEventBanner from "@/middlewares/uploadEventBanner";
import { validateParams, validateQuery, validateBody } from "@/middlewares/validate";

import createEvent from "@/controllers/v1/event/create_event";
import updateEvent from "@/controllers/v1/event/update_event";
import getAllEvents from "@/controllers/v1/event/get_all_events";
import getEventById from "@/controllers/v1/event/get_event_by_id";
import deleteEvent from "@/controllers/v1/event/delete_event";

import { createEventSchema, updateEventSchema, eventIdParamSchema, getAllEventsQuerySchema } from "@/validations/event";

const upload = multer();

const router = Router();

router.post('/', authenticated, authorize(['admin']), upload.single('banner_image'), uploadEventBanner('post'), validateBody(createEventSchema), createEvent);
router.get('/', authenticated, authorize(['admin', 'user']), validateQuery(getAllEventsQuerySchema), getAllEvents);
router.put('/:eventId', authenticated, authorize(['admin']), validateParams(eventIdParamSchema), upload.single('banner_image'), uploadEventBanner('put'), validateBody(updateEventSchema), updateEvent);
router.get('/:eventId', authenticated, authorize(['admin', 'user']), validateParams(eventIdParamSchema), getEventById);
router.delete('/:eventId', authenticated, authorize(['admin']), validateParams(eventIdParamSchema), deleteEvent);

export default router;