import mongoose from 'mongoose';

import { DeleteResult } from 'mongodb';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Entity } from '@database/interfaces/entity.interface';
import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';
import { DatabaseOperationException } from '@database/exceptions/database-operation.exception';
import { NullReturnAsyncAspect } from '@core/aspects/null-return-async.aspect';
import { LogOperationAspect } from '@database/aspects/log-operation.aspect';
import { CheckDeleteResultAspect } from '@database/aspects/check-delete-result.aspect';
import { NullReturnException } from '@core/exceptions/null-return.exception';


export abstract class Repository<T extends Entity> {
    constructor(
        public model: mongoose.Model<T>
    ) {
        this.model = model;
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    @UseAspect(Advice.After, LogOperationAspect, 'CREATE')
    async create(entity: T): Promise<void> {
        try {
            await this.model.create(entity);
        } catch (e) {
            throw new DatabaseOperationException('CREATE', e);
        }
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    @UseAspect(Advice.After, LogOperationAspect, 'FIND')
    @UseAspect(Advice.AfterReturn, NullReturnAsyncAspect, new NullReturnException('findById'))
    async findById(id: string): Promise<T> {
        try {
            return await this.model.findById(id);
        } catch (e) {
            throw new DatabaseOperationException('FIND', e);
        }
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    @UseAspect(Advice.After, LogOperationAspect, 'UPDATE')
    async updateOneById(id: string, entity: T): Promise<void> {
        try {
            await this.model.updateOne(
                {
                    _id: id
                },
                {
                    $set: entity
                }
            );
        } catch (e) {
            throw new DatabaseOperationException('UPDATE', e);
        }
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    @UseAspect(Advice.After, LogOperationAspect, 'DELETE')
    @UseAspect(Advice.AfterReturn, CheckDeleteResultAspect)
    async deleteOneById(id: string): Promise<DeleteResult> {
        try {
            return await this.model.deleteOne(
                {
                    _id: id
                }
            );
        } catch (e) {
            throw new DatabaseOperationException('DELETE', e);
        }
    }
}
