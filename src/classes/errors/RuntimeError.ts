export class RuntimeError extends Error {
    private readonly _error: Error;

    constructor(message: string, error: Error) {
        super(`[RUNTIME ERROR] ${message}`);
        this._error = error;
    }

    get error() {
        return this._error;
    }
}