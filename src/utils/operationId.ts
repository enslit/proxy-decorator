import { AsyncLocalStorage } from "async_hooks";
export const operationIdStorage = new AsyncLocalStorage();
