import { ExecErrorCallback, ExecSuccessCallback } from "./react.force.common";
import { HttpMethod } from "./typings";
export declare const setApiVersion: (version: string) => void;
export declare const getApiVersion: () => string;
export declare const sendRequest: <T>(endPoint: string, path: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback, method?: HttpMethod, payload?: Record<string, unknown> | null, headerParams?: Record<string, unknown> | null, fileParams?: unknown, returnBinary?: boolean, doesNotRequireAuthentication?: boolean, fileDownloadParams?: unknown) => void;
export declare const versions: <T>(successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const resources: <T>(successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const describeGlobal: <T>(successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const metadata: <T>(objtype: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const describe: <T>(objtype: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const describeLayout: <T>(objtype: string, recordTypeId: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const create: <T>(objtype: string, fields: Record<string, unknown>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
type RetrieveOverload = {
    <T>(objtype: string, id: string, fieldlist: string[], successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback): void;
    <T>(objtype: string, id: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback): void;
};
export declare const retrieve: RetrieveOverload;
export declare const upsert: <T>(objtype: string, externalIdField: string, externalId: string, fields: Record<string, unknown>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const update: <T>(objtype: string, id: string, fields: Record<string, unknown>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const del: <T>(objtype: string, id: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const query: <T>(soql: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const queryMore: <T>(url: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const search: <T>(sosl: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const getAttachment: <T>(id: string, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const collectionCreate: <T>(allOrNone: boolean, records: Array<Record<string, unknown>>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const collectionUpdate: <T>(allOrNone: boolean, records: Array<Record<string, unknown>>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const collectionUpsert: <T>(allOrNone: boolean, objectType: string, externalIdField: string, records: Array<Record<string, unknown>>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const collectionRetrieve: <T>(objectType: string, ids: Array<string>, fields: Array<string>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const collectionDelete: <T>(allOrNone: boolean, ids: Array<string>, successCB: ExecSuccessCallback<T>, errorCB: ExecErrorCallback) => void;
export declare const downloadFileAtLocation: (fileDownloadParams: {
    contentDocumentId: string;
    contentVersion: string;
    fileName: string;
    path: string;
}, successCB: () => {
    encodedBody: string;
    contentType: string;
}, errorCB: ExecErrorCallback) => void;
export {};
