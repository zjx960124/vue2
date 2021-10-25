const fontSize = function (res) {
  const clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  if (!clientWidth) return
  const fontSize = 100 * (clientWidth / 3408)
  const result = (res / 100) * fontSize
  return result
}

export default fontSize;
