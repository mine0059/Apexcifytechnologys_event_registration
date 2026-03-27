/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */
import { Router } from "express";
import authenticated from "@/middlewares/authenticated";
import authorize from "@/middlewares/authorize";
import { validateParams } from "@/middlewares/validate";

import registerEvent from "@/controllers/v1/registration/register_event";
import getRegistrations from "@/controllers/v1/registration/get_registrations";
import deleteRegistrationById from "@/controllers/v1/registration/delete_registration_by_id";

import { eventIdParamSchemaRegistration, registrationIdParamSchema } from "@/validations/registration";

const router = Router();

router.get('/', authenticated, authorize(['admin', 'user']), getRegistrations);
router.post('/:eventId', authenticated, authorize(['admin', 'user']), validateParams(eventIdParamSchemaRegistration), registerEvent);
router.delete('/:id', authenticated, authorize(['admin', 'user']), validateParams(registrationIdParamSchema), deleteRegistrationById);

export default router;