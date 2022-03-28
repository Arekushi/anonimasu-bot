import mongoose from 'mongoose';
import { DatabaseConnectionFailedException } from '@database/exceptions/database-connection-failed.exception';


export const connect = async (): Promise<void> => {
    const url = process.env.MONGODB_URL;

    try {
        await mongoose.connect(url);
    } catch (err) {
        throw new DatabaseConnectionFailedException('MongoDB', err);
    }
};
