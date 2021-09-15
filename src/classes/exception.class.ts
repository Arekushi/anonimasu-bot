export abstract class Exception extends Error {
    constructor() {
        super();
    }

    abstract action(...args: any[]): Promise<void>;
}
