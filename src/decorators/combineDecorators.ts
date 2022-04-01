export const combineDecorators = <T extends Record<string | symbol, any>>(decorators: Record<string, (methods: T) => T>, methods: T): T => {
    let result = methods;

    for (const decoratorKey in decorators) {
        const decorator = decorators[decoratorKey];
        result = decorator(result);
    }

    return result;
}