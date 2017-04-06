import { isServer } from 'consts'

class DocumentMouseMove {

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

const documentMouseMove = new DocumentMouseMove()

if (!isServer) {

  document.addEventListener('mousemove', (e) => {
  
    documentMouseMove.listeners.forEach((listener) => {
      listener(e)
    })

  }, false)
  
}

export default documentMouseMove