import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';

import { createServer, Server } from 'http';
import { singleton } from 'tsyringe';
import { connect } from './database';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';
import { LogConnectedAspect } from '@database/aspects/log-connected.aspect';


@singleton()
export class App {
    app: express.Application;
    server: Server;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);

        this.use();
        this.routes();
        // this.database();
    }

    private routes(): void {
        this.app.use('/api', router());
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    @UseAspect(Advice.After, LogConnectedAspect)
    private async database(): Promise<void> {
        await connect();
    }

    private use(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }
}
