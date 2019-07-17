export const clone = (obj) => JSON.parse(JSON.stringify(obj))

export const deleteAttr = (object, ...attrs) => attrs.forEach(attr => delete object[attr])
