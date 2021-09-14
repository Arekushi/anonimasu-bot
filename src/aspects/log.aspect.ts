import { Aspect } from 'ts-aspect';

export class LogAspect implements Aspect {
    execute(...args: any): void {
        console.log(args);
    }
}
