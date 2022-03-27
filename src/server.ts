import listEndpoints from 'express-list-endpoints';
import config from 'config';
import consola from 'consola';
import toBoolean from 'to-boolean';

import { container } from 'tsyringe';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { App } from './app';
import { Express } from 'express';


export const run = async (): Promise<void> => {
    const anonymasu = await new AnonimasuBot().init();
    const port = process.env.PORT || config.get('port');
    const app = container.resolve(App);

    app.server.listen(port, () => {
        consola.success(
            `Node Express server listening on http://localhost:${port}`
        );
    });

    if (toBoolean(process.env.LIST_ENDPOINTS || 'FALSE')) {
        consola.log(listEndpoints(app.app as Express));
    }
};
