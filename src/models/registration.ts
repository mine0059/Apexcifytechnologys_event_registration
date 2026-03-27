/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { Schema, model, Types } from "mongoose";

export interface IRegistration {
    event: Types.ObjectId;
    user: Types.ObjectId;
    registrationDate: Date;
}

const registrationschema = new Schema<IRegistration>
(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        registrationDate: {
            type: Date,
            default: Date.now
        }
    }
);

export default model<IRegistration>('Registration', registrationschema);