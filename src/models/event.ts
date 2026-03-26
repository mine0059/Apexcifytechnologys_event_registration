/**
 * @copyright 2026 oghenemine emmanuel
 * @license Apache-2.0
 */

import { Schema, model, Types } from 'mongoose';

export interface IEvent {
    title: string;
    description?: string;
    location: string;
    date: Date;
    time?: string;
    capacity: number;
    banner: {
        publicId: string;
        url: string;
        width: number,
        height: number,
    };
    isVirtual: boolean;
    createdBy: Types.ObjectId;
    status: 'draft' | 'published'
}

const bannerSchema = new Schema(
    {
        publicId: {
            type: String,
            required: [true, 'Banner public id is required']
        },
        url: {
            type: String,
            required: [true, 'Banner url is required']
        },
        width: {
            type: Number,
            required: [true, 'Banner width is required']
        },
        height: {
            type: Number,
            required: [true, 'Banner height is required']
        },
    }
)

const eventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [180, 'Title must be less then 180 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
        },
        capacity: {
            type: Number,
            required: true,
        },
        banner: {
            type: bannerSchema,
            required: [true, 'Banner is required'],
        },
        isVirtual: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Creator is required'],
        },
        status: {
            type: String,
            enum: {
                values: ['draft', 'published'],
                message: '{VALUE} is not supported',
            },
            default: 'published'
        }
    },
    {
        timestamps: {
            createdAt: 'publishedAt',
        }
    }
);

export default model<IEvent>('Event', eventSchema);