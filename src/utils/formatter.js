export default class Formatter {
  static getSelectionOptions (prop) {
    let options = null
    for (const propName in this.selections) {
      if (propName === prop) {
        options = this.selections[propName]
        break
      }
    }
    return options
  }

  static formatSelection = (row, col, val, index) => {
    Formatter.simpleFormatSelection(col.property, val)
  }

  static simpleFormatSelection (prop, val) {
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
Formatter.selections = {}
