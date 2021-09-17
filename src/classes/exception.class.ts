export abstract class Exception extends Error {
    constructor() {
        super();
    }

    abstract action(): Promise<void>;
}
