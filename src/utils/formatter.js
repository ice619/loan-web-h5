export default class Formatter {
  /**
   * 获取下拉列表
   * @param prop
   * @returns {*}
   */
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

  /**
   * 在table列表展示中调用
   * 获取下拉选项的展示值
   * @param row
   * @param col
   * @param val
   * @param index
   * @returns {*}
   */
  static formatSelection = (row, col, val, index) => {
    return Formatter.simpleFormatSelection(col.property, val)
  }

  /**
   * 获取下拉选项的展示值
   * @param prop
   * @param val
   * @returns {*}
   */
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
