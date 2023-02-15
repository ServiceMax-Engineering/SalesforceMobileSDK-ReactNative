"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileAtLocation = exports.collectionDelete = exports.collectionRetrieve = exports.collectionUpsert = exports.collectionUpdate = exports.collectionCreate = exports.getAttachment = exports.search = exports.queryMore = exports.query = exports.del = exports.update = exports.upsert = exports.retrieve = exports.create = exports.describeLayout = exports.describe = exports.metadata = exports.describeGlobal = exports.resources = exports.versions = exports.sendRequest = exports.getApiVersion = exports.setApiVersion = void 0;
const react_native_1 = require("react-native");
const react_force_common_1 = require("./react.force.common");
const react_force_log_1 = require("./react.force.log");
const { SalesforceNetReactBridge, SFNetReactBridge } = react_native_1.NativeModules;
var apiVersion = 'v55.0';
const statusCodes = {
    TEMPORARY_REDIRECT: 307,
    MOVED_PERMANENTLY: 301,
};
const errorCodes = {
    INVALID_SESSION: 'INVALID_SESSION_ID',
};
const setApiVersion = (version) => {
    apiVersion = version;
};
exports.setApiVersion = setApiVersion;
const getApiVersion = () => apiVersion;
exports.getApiVersion = getApiVersion;
const sendRequest = (endPoint, path, successCB, errorCB, method, payload, headerParams, fileParams, returnBinary, doesNotRequireAuthentication, fileDownloadParams) => {
    method = method || "GET";
    payload = payload || {};
    headerParams = headerParams || {};
    fileParams = fileParams || {};
    returnBinary = !!returnBinary;
    doesNotRequireAuthentication = !!doesNotRequireAuthentication;
    const args = {
        endPoint,
        path,
        method,
        queryParams: payload,
        headerParams,
        fileParams,
        returnBinary,
        doesNotRequireAuthentication,
        fileDownloadParams,
    };
    react_native_1.DeviceEventEmitter.emit("sendRequest");
    const handleError = (error) => {
        var _a, _b, _c, _d;
        if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) === statusCodes.MOVED_PERMANENTLY ||
            ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.statusCode) === statusCodes.TEMPORARY_REDIRECT ||
            (Array.isArray((_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.body) &&
                ((_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.body.some((i) => (i === null || i === void 0 ? void 0 : i.errorCode) === errorCodes.INVALID_SESSION)))) {
            react_native_1.DeviceEventEmitter.emit("sf_invalid_session");
        }
        if (errorCB) {
            errorCB(error);
        }
    };
    (0, react_force_common_1.exec)("SFNetReactBridge", "SalesforceNetReactBridge", SFNetReactBridge, SalesforceNetReactBridge, successCB, handleError, "sendRequest", args);
};
exports.sendRequest = sendRequest;
const versions = (successCB, errorCB) => (0, exports.sendRequest)("/services/data", "/", successCB, errorCB);
exports.versions = versions;
const resources = (successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/`, successCB, errorCB);
exports.resources = resources;
const describeGlobal = (successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/`, successCB, errorCB);
exports.describeGlobal = describeGlobal;
const metadata = (objtype, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/`, successCB, errorCB);
exports.metadata = metadata;
const describe = (objtype, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/describe/`, successCB, errorCB);
exports.describe = describe;
const describeLayout = (objtype, recordTypeId, successCB, errorCB) => {
    recordTypeId = recordTypeId ? recordTypeId : "";
    return (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/describe/layouts/${recordTypeId}`, successCB, errorCB);
};
exports.describeLayout = describeLayout;
const create = (objtype, fields, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/`, successCB, errorCB, "POST", fields);
exports.create = create;
const retrieve = (objtype, id, x, y, z) => {
    let fieldlist;
    let successCB;
    let errorCB;
    if (typeof x === "function") {
        fieldlist = null;
        successCB = x;
        errorCB = y;
    }
    else {
        fieldlist = x;
        successCB = y;
        errorCB = z;
    }
    const fields = fieldlist ? { fields: fieldlist } : null;
    return (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/${id}`, successCB, errorCB, "GET", fields);
};
exports.retrieve = retrieve;
const upsert = (objtype, externalIdField, externalId, fields, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/${externalIdField}/${externalId ? externalId : ""}`, successCB, errorCB, externalId ? "PATCH" : "POST", fields);
exports.upsert = upsert;
const update = (objtype, id, fields, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/${id}`, successCB, errorCB, "PATCH", fields);
exports.update = update;
const del = (objtype, id, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/${objtype}/${id}`, successCB, errorCB, "DELETE");
exports.del = del;
const query = (soql, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/query`, successCB, errorCB, "GET", { q: soql });
exports.query = query;
const queryMore = (url, successCB, errorCB) => {
    const pathFromUrl = url.match(/https:\/\/[^/]*(.*)/);
    if (pathFromUrl && pathFromUrl.length === 2) {
        return (0, exports.sendRequest)("", pathFromUrl[1], successCB, errorCB);
    }
    else {
        react_force_log_1.sdkConsole.error(`queryMore failed: url must be a valid`);
    }
};
exports.queryMore = queryMore;
const search = (sosl, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/search`, successCB, errorCB, "GET", { q: sosl });
exports.search = search;
const getAttachment = (id, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/sobjects/Attachment/${id}/Body`, successCB, errorCB, "GET", null, null, null, true);
exports.getAttachment = getAttachment;
const collectionCreate = (allOrNone, records, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/composite/sobjects`, successCB, errorCB, "POST", { allOrNone: allOrNone, records: records });
exports.collectionCreate = collectionCreate;
const collectionUpdate = (allOrNone, records, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/composite/sobjects`, successCB, errorCB, "PATCH", { allOrNone: allOrNone, records: records });
exports.collectionUpdate = collectionUpdate;
const collectionUpsert = (allOrNone, objectType, externalIdField, records, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/composite/sobjects/${objectType}/${externalIdField}`, successCB, errorCB, "PATCH", { allOrNone: allOrNone, records: records });
exports.collectionUpsert = collectionUpsert;
const collectionRetrieve = (objectType, ids, fields, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/composite/sobjects/${objectType}`, successCB, errorCB, "POST", { ids: ids, fields: fields });
exports.collectionRetrieve = collectionRetrieve;
const collectionDelete = (allOrNone, ids, successCB, errorCB) => (0, exports.sendRequest)("/services/data", `/${apiVersion}/composite/sobjects?allOrNone=${allOrNone}&ids=${ids.join(',')}`, successCB, errorCB, "DELETE");
exports.collectionDelete = collectionDelete;
const downloadFileAtLocation = (fileDownloadParams, successCB, errorCB) => {
    const method = "GET";
    const payload = {};
    const headerParams = {};
    const fileParams = {};
    const returnBinary = true;
    const doesNotRequireAuthentication = false;
    const args = { endPoint: null, path: null, method, queryParams: payload, headerParams, fileParams, returnBinary, doesNotRequireAuthentication, fileDownloadParams };
    (0, react_force_common_1.exec)("SFNetReactBridge", "SalesforceNetReactBridge", SFNetReactBridge, SalesforceNetReactBridge, successCB, errorCB, "sendRequest", args);
};
exports.downloadFileAtLocation = downloadFileAtLocation;
//# sourceMappingURL=react.force.net.js.map