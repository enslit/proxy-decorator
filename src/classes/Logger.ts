import {operationIdStorage} from "../utils";

export class Logger {
    constructor(private readonly tags: string[]) {}

    public createChildLogger(childTags: string[]) {
        return new Logger([...this.tags, ...childTags]);
    }

    public log(message: string, payload?: unknown) {
        return this.write('log', message, payload);
    }

    public info(message: string, payload?: unknown) {
        return this.write('info', message, payload);
    }

    public error(message: string, payload?: unknown) {
        return this.write('error', message, payload);
    }

    public debug(message: string, payload?: unknown) {
        return this.write('debug', message, payload);
    }

    private write(type: 'info' | 'log' | 'error' | 'debug', message: string, payload?: unknown) {
        const data: Record<string, any> = {};
        const operationContext = this.getOperationContext();

        if (payload) {
            data.payload = payload;
        }

        if (operationContext) {
            data.logContext = operationContext;
        }

        const preparedMessage = this.createMessage(message);

        console[type](preparedMessage, data);
    }

    private getOperationContext() {
        const operationContextStorage = operationIdStorage.getStore();

        if (!operationContextStorage) {
            return {}
        }

        return Object.fromEntries(operationContextStorage.entries());
    }

    private createMessage(message: string) {
        const tagsString = this.tagsToString();
        return `${tagsString} ${message}`
    }

    private tagsToString() {
        return this.tags.map((tag) => `[${tag}]`).join('');
    }
}