export const transformDataToServer = (data) => {
  console.log(Object.values(data));
  data.purchase_type = []
  data.material_structure = []
  data.customer_tg = data.customer_tg ? data.customer_phone : null
  data.customer_whatsapp = data.customer_whatsapp ? data.customer_phone : null
  
  Object.keys(data).forEach((key) => {
    const value = data[key]
    
    if (value == undefined) {
      data[key] = null
 
      if (key == "type_of_application" || key == "material_structure" || key == "material_type" || key == "raw_materials" || key == "technological_doc" || key == "pattern_doc" || key == "doc_urls" || key == "delivery_conditions" || key == "acceptance_conditions" || key == "payment_conditions" || key == "labeling_requirements" || key == "packaging_requirements" || key == "equipment_requirements" || key == "additional_services" || key == "purchase_type" || key == "personnel_requirement") {
        data[key] = []
      }
      return
    }

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

export const convertInputDateToIso = (date) => new Date(Date.parse(date + '.23:59:59')).toISOString()