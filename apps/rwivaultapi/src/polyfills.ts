// BigInt JSON serialization polyfill
declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function () {
  return this.toString();
};
