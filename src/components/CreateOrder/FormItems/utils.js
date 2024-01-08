export const transformFieldToInput = (propName, value, selectOptions) => {
  if (propName == 'supplier_regions') {
    const result = []
    Object.entries(value).forEach(([country, regions]) => {
      if (regions.length) {
        regions.forEach(region => {
          const regionName = selectOptions.find(opt => opt.value.split('.').length == 2 && +opt.value.split('.')[1] == region).label.split('.')[1]
          const countryName = selectOptions.find(opt => +opt.value.split('.')[0] == country).label.split('.')[0]
          result.push({label: countryName+'.'+regionName, value: country+'.'+region})
        })
      }
      else {
        const countryName = selectOptions.find(opt => +opt.value == country)?.label
          result[countryName] = country
          result.push({label: countryName, value: country})
      }
    })

    return result
  }

  if (typeof value == 'number') return selectOptions.find(opt => opt.value == value)

  if (Array.isArray(value) && typeof value[0] == 'number') {
    return value.map(value => selectOptions.find(opt => opt.value == value))
  }
  
}