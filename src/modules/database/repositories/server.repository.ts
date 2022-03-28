import { serverModel } from '@database/models/server.model';
import { Server } from '@database/interfaces/server.interface';
import { Repository } from '@database/repositories/base.repository';
import { injectable } from 'tsyringe';


@injectable()
export class ServerRepository extends Repository<Server> {
    constructor() {
        super(serverModel);
    }
}
