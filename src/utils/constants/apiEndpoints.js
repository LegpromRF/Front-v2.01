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
    bidAll: apiHOST + 'bid/all',
    bidCreate: apiHOST + 'bid/create',
    bidTechnology: apiHOST + 'bid/add/technology',
    bidRequirements: apiHOST + 'bid/add/requirements',
    bidOther: apiHOST + 'bid/add/other',
    getOrderCard: (id) => apiHOST + `order_cards/${id}`,
    getOrderCardSource: (id) => apiHOST + `order_cards/${id}/source`,
    orderCards: apiHOST + `order_cards/`,
    getBidCreate: (id) => apiHOST + `bid/${id}`,
    getBidTechnology: (id) => apiHOST + `bid/${id}/technology`,
    getBidRequirements: (id) => apiHOST + `bid/${id}/requirements`,
    getBidOther: (id) => apiHOST + `bid/${id}/other`,
    bidEditCreate: apiHOST + `bid/edit/`,
    bidEditTechnology: apiHOST + `bid/edit/technology/`,
    bidEditRequirements: apiHOST + `bid/edit/requirements/`,
    bidEditOther: apiHOST + `bid/edit/other/`,
    photos: apiHOST + 'file_manager/photos',
    documents: apiHOST + 'file_manager/documents',
    bid: apiHOST + 'bid/',
    companyInfo: apiHOST + 'company/'
}



const aiHOST = 'https://ai.legpromrf.ru/'
export const aiEndpoints = {
    rank: aiHOST + `rank/companies`
}