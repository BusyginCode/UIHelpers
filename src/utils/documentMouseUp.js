import { isServer } from 'consts'

class DocumentMouseUp {

  listeners = [];

  subscribe(listener) {
    this.listeners.push(listener)
  }

  unsubscribe(listener) {
    let key = this.listeners.indexOf(listener)
    if (key >= 0) {
      this.listeners.splice(key, 1)
    }
  }

}

const documentMouseUp = new DocumentMouseUp()

if (!isServer) {

  document.addEventListener('mouseup', (e) => {
  
    documentMouseUp.listeners.forEach((listener) => {
      listener(e)
    })

  }, false)
  
}

export default documentMouseUp