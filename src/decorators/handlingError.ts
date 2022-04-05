import {MdrBackendError, RuntimeError} from "../classes/errors";
import {PluginLoggerInstance} from "../index";

export const handlingError = <T extends Record<string | symbol, any>>(methods: T): T => {
    return new Proxy(methods, {
        get: function (target, property, receiver) {
            const executor = Reflect.get(target, property, receiver);
            const isFunction = executor instanceof Function;

            if (!isFunction) {
                return typeof executor === 'object'
                    ? handlingError(executor)
                    : executor;
            }

            return (...args: unknown[]) => {
                try {
                    return executor.apply(target, args);
                } catch (error) {
                    if (error instanceof RuntimeError) {
                        PluginLoggerInstance.error(error.message, error.error);
                        return { type: 'RuntimeError', message: error.message };
                    } else if (error instanceof MdrBackendError) {
                        PluginLoggerInstance.error(error.message, error.error);
                        return { type: 'MdrBackendError', message: error.message };
                    } else {
                        PluginLoggerInstance.error((error as Error).message, error);
                        return { type: 'GeneralError', message: (error as Error).message };
                    }
                }
            };
        },
    })
}