import {Api, IPluginApi} from "./types";
import {PostsModule, usersModule} from "./modules";
import {classToObject, operationIdStorage} from "./utils";

let counterOperation = 1;

function PluginApi(api: Api): IPluginApi {
    return new Proxy(
        {
            ...usersModule(api),
            ...classToObject(new PostsModule(api))
        },
        {
            get: (target, property, receiver) => {
                const executor = Reflect.get(target, property, receiver);
                const isFunction = executor instanceof Function;

                if (!isFunction) {
                    console.log(`property ${String(property)} is not a function`);
                    return executor;
                }

                const optionId = "operation_" + counterOperation;
                counterOperation++;

                return async (...args: unknown[]) => {
                    return await operationIdStorage.run(optionId, async () => {
                        return await executor.apply(target, args);
                    });
                };
            }
        }
    );
}

export default PluginApi;