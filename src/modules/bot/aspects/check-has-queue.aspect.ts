import { Operator } from '@bot/types/operator.type';
import { MusicPlayer } from '@bot/classes/music-player.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckHasQueueAspect implements Aspect {

    async execute(ctx: AspectContext): Promise<any> {
        const target: MusicPlayer = ctx.target;
        const operator: Operator = ctx.functionParams[0];

        if (!target.hasQueue(operator.guildId)) {
            await target.createQueue(operator);
        }

        return [...ctx.functionParams];
    }
}
