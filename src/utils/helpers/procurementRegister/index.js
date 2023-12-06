export const createMaterials = (str) => str.split(",");

export const createDate = (str) => str.split("T")[0];

export const createFilters = (obj) => {
  const newArray = [];
  for (const key in obj) {
    newArray.push(key);
  }
  return newArray;
};

export const createQuery = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key]) newObj[key] = obj[key];
  }
  return newObj;
};

export const createQueryString = (query) => {
  const obj = createQuery(query);
  const queryString = Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
  return queryString;
};

export const clearQuery = (obj) => {
  const newObj = {};
  for (const key in obj) {
    newObj[key] = "";
  }
  return newObj;
};