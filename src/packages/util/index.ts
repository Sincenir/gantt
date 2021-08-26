
const getMax = (items: Array<number>): number => {
  let max: null | number = null
  items.map(v => {
    if (!max) {
      max = v
    } else {
      if (max < v) {
        max = v
      }
    }
    return null
  })
  return max || -1
}

const getMin = (items: Array<number>): number => {
  let max: null | number = null
  items.map(v => {
    if (!max) {
      max = v
      return null
    }

    if (max > v) {
      max = v
    }
    return null
  })
  return max || -1
}


export {
  getMin,
  getMax
}