export const transformDataToServer = (data) => {
  console.log (data);
  console.log(Object.values(data));
  data.customer_tg = data.customer_tg ? data.customer_phone : null
  data.customer_whatsapp = data.customer_whatsapp ? data.customer_phone : null

  if (data.deadline && data.deadline.split('T').length != 2) data.deadline = convertInputDateToIso(data.deadline)
  if (data.start_date && data.start_date.split('T').length != 2) data.start_date = convertInputDateToIso(data.start_date)

  const supplierRegionsForServer = {}

  if (data.supplier_regions) data.supplier_regions.forEach(region => {
    let splittedRegion = region.value.split('.')
    if (splittedRegion.length > 2) splittedRegion = [splittedRegion[0], splittedRegion.slice(1).join('')]
    
    if (splittedRegion.length == 1 && !supplierRegionsForServer[splittedRegion[0]]) {
      supplierRegionsForServer[splittedRegion[0]] = []
    } else if (splittedRegion.length == 2) {
      if (supplierRegionsForServer[splittedRegion[0]]) supplierRegionsForServer[splittedRegion[0]].push(splittedRegion[1])
      else supplierRegionsForServer[splittedRegion[0]] = [splittedRegion[1]]
    }
  })

  data.supplier_regions = {} //TODO 
  data.supplier_region = supplierRegionsForServer //TODO исправить на data.supplier_regions
  if (!data.doc_urls) data.doc_urls = [] //TODO data.doc_urls = null
  
  Object.keys(data).forEach((key) => {
    const value = data[key]
    
    if (value == undefined) {
      data[key] = null
      
      
      if (key == "purchase_type" || key == "delivery_conditions" || key == "acceptance_conditions" || key == "payment_conditions" || key == "labeling_requirements" || key == "packaging_requirements" || key == "equipment_requirements" || key == "personnel_requirement" || key == "doc_urls" || key == "type_of_application" || key == "additional_services" || key == "material_type" || key == "raw_materials" || key == "technological_doc" || key == "pattern_doc") {
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
      return
    }
  })
  
}

export const convertInputDateToIso = (dateStr) => new Date(Date.parse(dateStr + '.23:59:59')).toISOString()
export const convertIsoDateToInput = (dateStr) => {
  const year = new Date(dateStr).getFullYear()
  const month = new Date(dateStr).getMonth()
  const day = new Date(dateStr).getDate()
  return `${year}-${month}-${day}`
}