import { Exception } from "classes/exception.class";

export class NullReturnException extends Exception {
    constructor() {
        super();
    }

    async action(): Promise<void> {
        
    }
}
