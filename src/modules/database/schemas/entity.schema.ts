import mongoose from 'mongoose';


export const entitySchema = new mongoose.Schema({
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    created_on: {
        type: Date,
        required: true,
        default: () => new Date()
    },
    updated_on: {
        type: Date,
        required: true,
        default: () => new Date()
    }
});

entitySchema.post('updateOne', function(
    next: mongoose.CallbackWithoutResultAndOptionalError,
): void {
    this.updated_on = new Date();
    next();
});
