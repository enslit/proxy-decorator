import {operationIdStorage} from "../utils";

let counterOperation = 1;

export const executeWithLogContext = <T extends Record<string | symbol, any>>(methods: T): T => {
    return new Proxy(methods, {
        get: function (target, property, receiver) {
            const executor = Reflect.get(target, property, receiver);
            const isFunction = executor instanceof Function;

            if (!isFunction) {
                console.log(`property ${String(property)} is not a function`);
                return executor;
            }

            const logContextStorage = new Map();
            logContextStorage.set('operationId', counterOperation++);

            return async (...args: unknown[]) => {
                return await operationIdStorage.run(logContextStorage, async () => {
                    return await executor.apply(target, args);
                });
            };
        },
    })
}