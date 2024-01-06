export const transformDataToServer = (data) => {
  console.log(Object.values(data));
  Object.keys(data).forEach((key) => {
    const value = data[key]
    if (key == "clothes_type") console.log('data[key] before', data[key]);
    
    if (typeof value === "string") return

    if (Array.isArray(value)) {
      data[key] = value.map((item) => {
        if (typeof item === "object" && "value" in item) {
          return item.value;
        }
        return item;
      });
      return
    }

    if (typeof value === "object" && value !== null && "value" in value) {
      data[key] =  value.value;
      if (key == "clothes_type") console.log('data[key] after\n', data[key]);
      return
    }
  })
  
}