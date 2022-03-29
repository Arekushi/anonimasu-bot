import { extendSchema } from '@database/utils/schema.utils';
import { entitySchema } from '@database/schemas/entity.schema';


export const serverSchema = extendSchema(entitySchema, {
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    locale: {
        type: String,
        required: true,
        default: 'pt'
    },
    test: {
        type: String,
        required: true
    }
});
