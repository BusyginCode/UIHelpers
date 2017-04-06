import { isServer } from 'consts'

class DocumentKeyDown {

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

const documentKeyDown = new DocumentKeyDown()

if (!isServer) {

  document.addEventListener('keydown', (e) => {
  
    documentKeyDown.listeners.forEach((listener) => {
      listener(e)
    })

  }, false)
  
}

export default documentKeyDown