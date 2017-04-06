export default (keys, callback, e) => {
  if (keys.indexOf(e.keyCode) >= 0) {
    callback(e);
  }
};
