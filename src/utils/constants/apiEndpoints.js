const test = 'justifyapi'
const prod = 'api.legpromrf'

export const apiHOST = `https://${prod}.ru/`
export const apiEndpoints = {
    verification: apiHOST + 'auth/send_verification',
    register: apiHOST + 'auth/register',
    login: apiHOST + 'auth/login',
    logout: apiHOST + 'auth/logout',
    yandexReg: apiHOST + 'auth/yandex/register',
    yandexLogin: apiHOST + 'auth/yandex/login',
    vkReg: apiHOST + 'auth/vk/register',
    vkLogin: apiHOST + 'auth/vk/login',
    product: apiHOST + 'bid/product',
    purchase: apiHOST + 'bid/purchase',
    technology: apiHOST + 'bid/technology',
    conditions: apiHOST + 'bid/conditions',
    contacts: apiHOST + 'bid/contacts',
    create: apiHOST + 'bid/create',
    photos: apiHOST + 'file_manager/photos',
    bid: apiHOST + 'bid/'
}

const aiHOST = 'http://185.204.3.62:8726/'
export const aiEndpoints = {
    rank: `${aiHOST}rank/companies`
}