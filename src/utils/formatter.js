class Formatter {
  constructor () {
    this.selections = {}
    if (localStorage.selections) {
      this.selections = JSON.parse(localStorage.selections)
    }
    this.formatSelection = (row, col, val, index) => {
      this.simpleFormatSelection(col.property, val)
    }
  }

  getSelectionOptions (prop) {
    let options = null
    for (const propName in this.selections) {
      if (propName === prop) {
        options = this.selections[propName]
        break
      }
    }
    return options
  }

  simpleFormatSelection (prop, val) {
    let label = null
    for (const propName in this.selections) {
      if (propName === prop) {
        const options = this.selections[propName]
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
}

export default new Formatter()
