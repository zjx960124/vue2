export function toggleThemeColorClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') === -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}

export function toggleThemeClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const clazz = classString.split(' ').filter(it => it.indexOf('theme_') !== -1)
  clazz.push(className)
  classString = clazz.join(' ')
  element.className = classString
}
