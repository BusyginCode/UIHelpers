import isServer from './isServer';

// export default function scrollToElement(element) {

//   $('html, body').animate({
//     scrollTop: $("#" + element).offset().top
//   }, 1000)

// }

// if (!isServer()) {
//   window.scrollToElement = scrollToElement
// }

function getOffsetSum(elem, top = 0) {
  if (elem) {
    top += elem.offsetTop;
    return getOffsetSum(elem.offsetParent, top);
  }
  return top - window.pageYOffset;
}

export default function scrollToElement(id) {
  let key = 0,
    nextScroll = getOffsetSum(document.getElementById(id)),
    keyCounter = 0;
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

if (!isServer()) {
  window.scrollToElement = scrollToElement;
}
