import mongoose from 'mongoose';


export const entitySchema = new mongoose.Schema({
    enabled: { type: Boolean, required: true },
    created_on: { type: Date, required: true },
    updated_on: { type: Date, required: true }
});
