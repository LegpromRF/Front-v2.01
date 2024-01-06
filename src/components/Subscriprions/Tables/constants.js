export const orderStatusTitles = {
  pending: "Не оплачен",
  succeeded: "Оплачен",
};

export const orderStatusConverter = { //convert to server names
  "Не оплачен": "pending",
  "Оплачен": "succeeded"
};

export const ordersColumns = ["Дата", "ИНН/Телефон/Почта", "Услуга", "Способ оплаты", "Статус"];

export const subsColumns = [
  "Название подписки",
  "Функции, доступные по подписке",
  "Срок",
];

const convertDate = (dateStr) => `${dateStr.split("T")[0].split('-')[2]}.${dateStr.split("T")[0].split('-')[1]}.${dateStr.split("T")[0].split('-')[0]}`

export const ordersPerPage = 20

export const ordersToDataList = (orders) => {
  const isOrdersAdmin = Boolean(orders[0] && Object.prototype.hasOwnProperty.call(orders[0], 'inn'))
  
  const mappedOrders = orders.map((order) => ({
    created_at: convertDate(order.created_at),
    userdata: isOrdersAdmin ? {
      inn: order.inn ?? null,
      email: order.email ?? null,
      phone: order.phone ?? null,
    } : null,
    product: order.product,
    payment_method: order.payment_method,
    status: orderStatusTitles[order.status],
    id: order.order_id
  }));
  return mappedOrders
}

export const getOrderIdByInd = (allOrders, ind) => {
  const countOrders = allOrders.length
  const viewFieldsPerOrder = ordersColumns.length
  const orderId = countOrders[Math.ceil((ind + 1) / viewFieldsPerOrder)]
  return orderId
}

export const subsToDataList = (subs) => {
  const list = [];
  for (const subKey of Object.keys(subs)) {
    list.push({
      name: subKey,
      functions: Object.keys(subs[subKey]).map((funcKey) => ({
        name: funcKey,
        date: convertDate(subs[subKey][funcKey].expired_date),
      })),
    });
  } 
  return list;
};
