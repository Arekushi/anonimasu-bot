import consola from 'consola';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogSlashCommandsAspect implements Aspect {

    execute(ctx: AspectContext): void {
        consola.success(
            `Successfully reloaded application (/) commands.`
        );
    }
}
