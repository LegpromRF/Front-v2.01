const test = 'justifyapi'
const prod = 'api.legpromrf'


export const apiHOST = `https://${test}.ru/`
export const apiEndpoints = {
    verification: apiHOST + 'auth/send_verification',
    register: apiHOST + 'auth/register',
    login: apiHOST + 'auth/login',
    logout: apiHOST + 'auth/logout',
    yandexReg: apiHOST + 'auth/yandex/register',
    yandexLogin: apiHOST + 'auth/yandex/login',
    vkReg: apiHOST + 'auth/vk/register',
    vkLogin: apiHOST + 'auth/vk/login',
}