//module.exports
const C = require("./test-module1");

const kalk = new C();
console.log(kalk.add(2, 10));

//exports
const { add, multiply } = require("./test-module2");
console.log(multiply(1, 9));
console.log(add(100, 200));

//caching
require("./test-module3")();
require("./test-module3")();
require("./test-module3")();
