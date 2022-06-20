// jwtWorker.js declaration file

// parserAuthorizationHeader
export function parserAuthorizationHeader(authorization: string): null | string;

// jwtEncode
export function jwtEncode(payload: object, expTime: string, keyPath: string): string;

// jwtDecode
export function jwtDecode(token: string, keyPath: string): null | object;