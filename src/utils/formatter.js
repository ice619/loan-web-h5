export default class Formatter {
  /**
   * 获取下拉列表
   * @param prop
   * @returns {*}
   */
  static getSelectionOptions (prop) {
    const options = this.selections[prop]
    if (options) {
      return options
    }
    return []
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
   *
   * @param prop
   * @param values 以,分割的字符串
   * @returns {*}
   */
  static multipleFormatSelection (prop, values) {
    if (!values) {
      return ''
    }
    let label = ''
    values.split(',').forEach(s => {
      label += ` | ${Formatter.simpleFormatSelection(prop, parseInt(s))}`
    })
    return label.substring(3)
  }

  /**
   * 获取下拉选项的展示值
   * @param prop
   * @param val
   * @returns {*}
   */
  static simpleFormatSelection (prop, val) {
    const options = this.selections[prop]
    if (options) {
      for (const j in options) {
        const option = options[j]
        if (option.value === val) {
          return option.label
        }
      }
    }
    return val
  }
}
Formatter.selections = {}
