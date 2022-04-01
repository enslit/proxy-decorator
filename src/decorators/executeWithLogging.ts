export const executeWithLogging = <T extends Record<string | symbol, any>>(methods: T): T => {
    return new Proxy(methods, {
        get: function (target, property, receiver) {
            const executor = Reflect.get(target, property, receiver);
            const isFunction = executor instanceof Function;

            if (!isFunction) {
                return typeof executor === 'object'
                    ? executeWithLogging(executor)
                    : executor;
            }

            const isAsync = executor.constructor.name === 'AsyncFunction';

            const asyncDecorator = async (...args: unknown[]) => {
                try {
                    console.log(`[DECORATOR ASYNC] ${String(property)} start`, JSON.stringify(args));
                    const result = await executor.apply(target, args);
                    console.log(`[DECORATOR ASYNC] ${String(property)} success`, result);
                } catch (e) {
                    console.log(`[DECORATOR ASYNC] ${String(property)} failure`, e);
                    throw e
                }
            }

            const syncDecorator = (...args: unknown[]) => {
                try {
                    console.log(`[DECORATOR SYNC] ${String(property)} start`, JSON.stringify(args));
                    const result = executor.apply(target, args);
                    console.log(`[DECORATOR SYNC] ${String(property)} success`, result);
                } catch (e) {
                    console.log(`[DECORATOR SYNC] ${String(property)} failure`, e);
                    throw e
                }
            }

            return isAsync ? asyncDecorator : syncDecorator;
        },
    })
}