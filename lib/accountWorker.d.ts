// accountWorker.js declaration file

// readAccontFile
export function readAccountFile(userID: string): false | {
    id: string,
    name: string,
    email: string,
    pass: string,
    key: string,
    enabled: boolean,
    mailVerified: {
        status: boolean,
        verifyKey: null | string,
    }
};

// readUserInfo
export function readUserInfo(userID: string): false | {
    id: string,
    name: string
};

// readAccountDB
export function readAccountDB(): [
    {
        id: string,
        name: string,
        pass: string,
        key: string
    }
];

// updateAccountDB
export function updateAccountDB(userID: string, userName: string, userEmail: string, userPass: string): boolean;

// updateAccountProfile
export function updateAccountProfile(userID: string, userName: string, userEmail: string, userPass: string): boolean;

// createAccount
export function createAccount(userName: string, userPass: string, userEmail: string, userUID: string | null): false | {
    id: string,
    token: string
};

// emailVerify
export function emailVerify(token: string): boolean;

// loginAccount
export function loginAccount(userName: string, userPass: string, isSocial: boolean): false | {
    id: string,
    token: string
};

// verifyAccount
export function verifyAccount(userToken: string): false | {
    id: string,
    name: string,
    email: string,
    pass: string,
    key: string,
    enabled: boolean,
    mailVerified: {
        status: boolean,
        verifyKey: null | string,
    }
};