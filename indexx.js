function isAnyoneUndefined(arg) {
  if (typeof arg === 'object') {
    return Object.values(arg).some((prop) => !prop);
  }
  return !arg;
}

const t = { matche: 1 };

console.log(isAnyoneUndefined(t));