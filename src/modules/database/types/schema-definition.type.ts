import mongoose from 'mongoose';


export type SchemaDefinition = {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any>;
};
