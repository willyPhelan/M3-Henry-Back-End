function usingCallback(array, callback) {
  return array.map(e => {
    if(callback(e)) e.allow = true;
    return e;
  })
}

function cacheFunction(callback) {
  const cache = {};
  return function(arg) {
    if(cache[arg]) return cache[arg];
    cache[arg] = callback(arg);
    return cache[arg];
  }
}

module.exports = {
  usingCallback,
  cacheFunction
}