import { SchemaDefinition } from '@database/types/schema-definition.type';
import mongoose from 'mongoose';


export const extendSchema = (
    schema: mongoose.Schema,
    definition: SchemaDefinition,
    options?: mongoose.SchemaOptions
): mongoose.Schema => {
    return new mongoose.Schema(
        Object.assign({}, schema.obj, definition),
        options
    );
};
