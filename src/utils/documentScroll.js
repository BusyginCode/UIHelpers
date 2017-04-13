import { isServer } from '../consts';

class DocumentScroll {

  listeners = [];

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    const key = this.listeners.indexOf(listener);
    if (key >= 0) {
      this.listeners.splice(key, 1);
    }
  }

}

const documentScroll = new DocumentScroll();

if (!isServer) {
  document.addEventListener('scroll', (e) => {
    documentScroll.listeners.forEach((listener) => {
      listener(e);
    });
  }, false);
}

export default documentScroll;
