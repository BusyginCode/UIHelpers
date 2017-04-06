let t;

export default function scrollTop() {
  const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -150);
    t = setTimeout(scrollTop, 20);
  } else {
    clearTimeout(t);
  }
}
