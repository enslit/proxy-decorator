import {Api, IPluginApi} from "./types";
import {PostsModule, usersModule} from "./modules";
import {classToObject} from "./utils";
import {combineDecorators} from "./decorators";
import {handlingError} from "./decorators/handlingError";
import {executeWithLogContext} from "./decorators/executeWithLogContext";

function PluginApi(api: Api): IPluginApi {
    return combineDecorators({
        handlingError,
        executeWithLogContext,
    }, {
        ...usersModule(api),
        ...classToObject(new PostsModule(api))
    });
}

export default PluginApi;