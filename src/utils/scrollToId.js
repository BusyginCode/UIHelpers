function getOffsetSum(elem, topMargin = 0) {
  let top = topMargin;
  if (elem) {
    top += elem.offsetTop;
    return getOffsetSum(elem.offsetParent, top);
  }
  return top - window.pageYOffset;
}

export default function ScrollToId(id) {
  let key = 0;
  const nextScroll = getOffsetSum(document.getElementById(id));
  let keyCounter = 0;
  const move = setInterval(() => {
    key += (nextScroll > 0 ? 1 : -1);
    keyCounter += key;
    document.body.scrollTop += key;
    if ((keyCounter >= nextScroll / 2 && key > 0) || (keyCounter <= nextScroll / 2 && key < 0)) {
      clearInterval(move);
      const moveSlower = setInterval(() => {
        key -= (nextScroll > 0 ? 1 : -1);
        document.body.scrollTop += key;
        if (key === 0) {
          clearInterval(moveSlower);
        }
      }, 10);
    }
  }, 10);
}
