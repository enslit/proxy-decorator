export class MdrBackendError extends Error {
    private readonly _error: Error;

    constructor(message: string, error: Error) {
        super(`[MDR BACKEND ERROR] ${message}`);
        this._error = error;
    }

    get error() {
        return this._error;
    }
}