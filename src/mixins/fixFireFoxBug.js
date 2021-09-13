export default {
  created() {
    document.body.ondrop = function(event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
