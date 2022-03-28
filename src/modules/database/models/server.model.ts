import mongoose from 'mongoose';

import { Server } from '@database/interfaces/server.interface';
import { serverSchema } from '@database/schemas/server.schema';


export const serverModel = mongoose.model<Server>('server', serverSchema);
