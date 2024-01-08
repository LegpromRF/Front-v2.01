export const transformDataToServer = (data) => {
  data.customer_tg = data.customer_tg ? data.customer_phone : null
  data.customer_whatsapp = data.customer_whatsapp ? data.customer_phone : null
  data.doc_urls = null //TODO

  if (data.deadline && data.deadline.split('T').length != 2) data.deadline = convertInputDateToIso(data.deadline)
  if (data.start_date && data.start_date.split('T').length != 2) data.start_date = convertInputDateToIso(data.start_date)

  const supplierRegionsForServer = {}
  if (Array.isArray(data.supplier_regions)) data.supplier_regions.forEach(region => {
    let splittedRegion = region.value.split('.')
    if (splittedRegion.length > 2) splittedRegion = [splittedRegion[0], splittedRegion.slice(1).join('')]
    
    if (splittedRegion.length == 1 && !supplierRegionsForServer[splittedRegion[0]]) {
      supplierRegionsForServer[splittedRegion[0]] = []
    } else if (splittedRegion.length == 2) {
      if (supplierRegionsForServer[splittedRegion[0]]) supplierRegionsForServer[splittedRegion[0]].push(splittedRegion[1])
      else supplierRegionsForServer[splittedRegion[0]] = [splittedRegion[1]]
    }
  })

  data.supplier_regions = supplierRegionsForServer 
  
  Object.keys(data).forEach((key) => {
    const value = data[key]
    
    if (value == undefined) {
      data[key] = null
      return
    }
    
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
  let month = (new Date(dateStr).getMonth() + 1)
  month = month < 10 ? '0'+month : month
  let day = new Date(dateStr).getDate()
  day = day < 10 ? '0'+day : day
  return `${year}-${month}-${day}`
}