export const loggingMethodGetter = <T extends Record<string | symbol, any>>(methods: T): T => {
    return new Proxy(methods, {
        get(target, property, receiver) {
            console.log(`getting ${String(property)}`);
            return Reflect.get(target, property, receiver);
        }
    })
}