import mongoose from 'mongoose';

import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Entity } from '@database/interfaces/entity.interface';
import { OnCreateAspect } from '@database/aspects/on-create.aspect';
import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';
import { DatabaseOperationException } from '@database/exceptions/database-operation.exception';
import { LogOperationAspect } from '@database/aspects/log-operation.aspect';


export abstract class Repository<T extends Entity> {
    constructor(
        public model: mongoose.Model<T>
    ) {
        this.model = model;
    }

    @UseAspect(Advice.Before, OnCreateAspect)
    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    @UseAspect(Advice.After, LogOperationAspect, 'CREATE')
    async create(entity: T): Promise<void> {
        try {
            await this.model.create(entity);
        } catch (e) {
            throw new DatabaseOperationException('CREATE', e);
        }
    }
}
