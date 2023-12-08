export const createMaterials = (str) => str.split(",");

export const createDate = (str) => {
  const day = str.split("T")[0].split("-")[2];
  const month = str.split("T")[0].split("-")[1];
  const year = str.split("T")[0].split("-")[0];
  return `${day}.${month}.${year}`;
};

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

export const countPages = (number) => {
  return Math.ceil(number / 40);
};

export const getCardsByPage = (array, number) => {
  if (array.length > 40) {
    const startIndex = (number - 1) * 40;
    const endIndex = number * 40;
    return array.slice(startIndex, endIndex);
  } else {
    return array;
  }
};

export const createImagesSlider = (str) => {
  return str
    .split(",")
    .map((elem, i) => ({ id: i, src: elem, alt: "Фото ткани" }));
};
