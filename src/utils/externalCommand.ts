import {sleep} from "./sleep";
import {operationIdStorage} from "./operationId";

export const externalCommand = async () => {
    await sleep(1000);
    const operationId = operationIdStorage.getStore();
    console.log(`externalCommand ${operationId}`);
};