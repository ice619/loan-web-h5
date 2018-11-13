let selections = []

const setSelections = function (selectionsIn) {
  selections = selectionsIn
}

const getSelectionOptions = function (prop) {
  let options = null
  for (const propName in selections) {
    if (propName === prop) {
      options = selections[propName]
      break
    }
  }
  return options
}

const simpleFormatSelection = function (prop, val) {
  let label = null
  for (const propName in selections) {
    if (propName === prop) {
      const options = selections[propName]
      for (const j in options) {
        const option = options[j]
        if (option.value === val) {
          label = option.label
          break
        }
      }
      break
    }
  }
  return label
}

const formatSelection = function (row, col, val, index) {
  return simpleFormatSelection(col.property, val)
}

const loadSelections = function () {
  this.$http.post('http://192.168.87.53:7991/web/backend/scDicBiglist/selections').then(res => {
    setSelections(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

exports.install = function (Vue, options) {
  Vue.prototype.setSelections = setSelections
  Vue.prototype.getSelectionOptions = getSelectionOptions
  Vue.prototype.simpleFormatSelection = simpleFormatSelection
  Vue.prototype.formatSelection = formatSelection
  Vue.prototype.loadSelections = loadSelections
}
