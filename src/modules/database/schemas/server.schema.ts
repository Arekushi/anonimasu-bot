import { extendSchema } from '@database/utils/schema.utils';
import { entitySchema } from '@database/schemas/entity.schema';


export const serverSchema = extendSchema(entitySchema, {
    id: { type: String, required: true },
    locale: { type: String, required: true }
});
