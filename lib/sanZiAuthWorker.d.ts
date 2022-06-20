// sanZiAuthWorker.js declaration file

// checkSanZiAvailable
export function checkSanZiAvailable(): boolean;

// createSanZiAuthToken
export function createSanZiAuthToken(userIP: string): false | Promise<{
    authTkn: string,
    authURI: string
}>;

// getSanZiUserInfo
export function getSanZiUserInfo(authTkn: string): false | Promise<{
    message: 'success',
    data: {
        appInfo: {
            Type: 'App Info',
            AppName: string,
            AppUID: string,
            AppType: string
        },
        userData: {
            Type: '3ZH-Studio Account',
            UserName: string,
            UserUID: string,
            UserEmail: string,
            UserType: string
        }
    },
    'Powered By': '3ZH-Studio Network'
}>;