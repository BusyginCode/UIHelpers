import { isServer } from 'consts'

class WindowResize {

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

const windowResize = new WindowResize()

if (!isServer) {

  window.addEventListener('resize', (e) => {
  
    windowResize.listeners.forEach((listener) => {
      listener(e)
    })

  }, false)
  
}

export default windowResize