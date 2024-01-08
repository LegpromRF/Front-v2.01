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
    getBidCreate: (id) => apiHOST + `bid/${id}`,
    bidEditCreate: (id) => apiHOST + `bid/edit/${id}`,
    bidEditTechnology: (id) => apiHOST + `bid/edit/technology/${id}`,
    bidEditRequirements: (id) => apiHOST + `bid/edit/requirements/${id}`,
    bidEditOther: (id) => apiHOST + `bid/edit/other/${id}`,
    orderCards: (id) => apiHOST + `order_cards/${id}`,
    orderCardsTechnology: (id) => apiHOST + `order_cards/${id}/technology`,
    orderCardsRequirements: (id) => apiHOST + `order_cards/${id}/requirements`,
    orderCardsOther: (id) => apiHOST + `order_cards/${id}/other`,
    photos: apiHOST + 'file_manager/photos',
    documents: apiHOST + 'file_manager/documents',
    bid: apiHOST + 'bid/',
    companyInfo: apiHOST + 'company/'
}



const aiHOST = 'https://ai.legpromrf.ru/'
export const aiEndpoints = {
    rank: aiHOST + `rank/companies`
}