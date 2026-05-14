// "use strict";
// //1 MAP vs FOREACH
// console.log("Map vs ForEach");
// const arr = [1, 2, 3, 4, 5];

// const newArr = arr.map((el) => el * 2).filter((el) => el !== 2);
// console.log(newArr);
// console.log(arr);

// const newArr2 = arr.forEach((el, i) => {
//   arr[i] = el * 2;
// });
// console.log(newArr2);
// console.log(arr);

// // 2. NULL vs UNDEFINED
// console.log("NULL vs UNDEFINED");
// // null, on the other hand, is an explicitly assigned value that represents “no value” or an empty state, and it is set by the developer.

// // undefined means a variable has been declared but has not been assigned a value yet. It is automatically set by JavaScript.

// console.log(typeof null); // object
// console.log(typeof undefined); // undefined

// // Follow up
// console.log(null == undefined); // true due to type cohersion
// console.log(null === undefined); // false due to strict cohersion

// // 3. Explain Event Delegation
// // console.log("Explain Event Delegation");
// // document.querySelector("#products").addEventListener("click", (e) => {
// //   if (e.target.tagName === "LI") {
// //     window.location.href += "#" + e.target.id;
// //   }
// // });

// // 4. Flatten the array
// console.log("Flatten the array");
// let nestedArr = [
//   [1, 2],
//   [3, 4],
//   [5, 6, [7, 8]],
//   [10, 11, 12],
// ];

// const flattenArr = (nestedArr, limit) => {
//   let result = [];
//   for (const item of nestedArr) {
//     if (Array.isArray(item) && limit > 0) {
//       result.push(...flattenArr(item, limit - 1));
//     } else result.push(item);
//   }
//   return result;
// };

// console.log(flattenArr(nestedArr, 1));

// const temp1 = [1, 2, 3, 4];
// const temp2 = [5, 6, 7, 8];

// // 5. Project showcase
// // TODO:

// // 6. Var, Let and Const
// console.log("Var, Let and Const");
// // var is function scoped
// // Let and const is block scoped
// // .1
// {
//   const a = 5;
//   // console.log(a);
// }

// // console.log(a);

// // .2
// // const z = 5;
// // console.log("z", z);
// // z = 10;
// // console.log("z", z);

// // 7. setTimeout Output
// console.log("Settimeout output");
// function a() {
//   for (var a = 0; a < 3; a++) {
//     function inner(a) {
//       setTimeout(() => {
//         console.log(a);
//       }, a * 1000);
//     }
//     inner(a);
//   }
// }

// // a();

// // 8. Call, Apply and Bind
// console.log("Call, Apply and Bind");

// var person = {
//   name: "Himanshu Yadav",
//   hello(thing) {
//     console.log(this.name + " says hello " + thing);
//   },
// };

// var person2 = {
//   name: "unacademy",
// };

// person.hello("world");

// const hellonew = person.hello.bind(person2);

// hellonew("world");

// // 9. Infinite Currying
// // TODO:

// function add(a) {
//   return function (b) {
//     if (b) return add(a + b);
//     return a;
//   };
// }

// console.log(add(5)(2)(4)(5)());

// //10. Composition Polyfill
// console.log("Composition Polyfill");
// function addFive(a) {
//   return a + 5;
// }
// function multiplyByTwo(a) {
//   return a * 2;
// }
// function subtractOne(a) {
//   return a - 1;
// }

// const compose = (...functions) => {
//   return (value) => {
//     const result = functions.reduceRight((acc, fn) => {
//       return fn(acc);
//     }, value);

//     return result;
//   };
// };

// const evaluate = compose(addFive, multiplyByTwo, subtractOne);
// console.log(evaluate(6));

// // 11. Implement Promise.All
// console.log("Implement Promise All");
// function showText(text, time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(text);
//     }, time);
//   });
// }

// function promiseAll(promises) {
//   return new Promise((resolve, reject) => {
//     if (promises.length === 0) return resolve([]);
//     let result = [];
//     let completed = 0;
//     promises.forEach((promise, index) => {
//       promise
//         .then((res) => {
//           result[index] = res;
//           completed++;
//           if (completed == promises.length) {
//             resolve(result);
//           }
//         })
//         .catch((err) => reject(err));
//     });
//   });
// }

// promiseAll([showText("Hello", 1000), showText("world", 2000)]).then((res) => {
//   console.log(res);
// });

// 12. React Lifecycle Methods

// In class and function component both!!

// 13 Ways to center a DIV
// console.log("How many ways to center a div");
// How many ways to center a div

// Q14 flex vs grid

// Q15 CSS BOX MODEL
// Every HTML element is treated as a box in CSS.From inside → outside:

// Content
// Padding
// Border
// Margin

// Q16. Debounce Function

// Q17 Hoisting

// var a = 10;
// let b = 10;
// const c = 20;

// function abc() {
//   console.log(a, b, c);
//   var a = 10;
//   let b = 10;
//   const c = 20;
// }

// abc();

// Q18 Implicit and explicit binding
// var obj = {
//   name: "Himanshu",
//   display: function () {
//     console.log(this.name);
//   },
// };

// var obj1 = {
//   name: "Harshita",
// };

// obj.display(); // Implicit binding

// obj.display.call(obj1); //Explicit binding

// Q19 Implement caching/memoizing function

// const clumsySquare = (num1, num2) => {
//   for (let i = 1; i < 100000; i++) {}
//   return num1 * num2;
// };

// console.time("First Call");
// console.log(clumsySquare(9467, 7649));
// console.timeEnd("First Call");

// console.time("Second Call");
// console.log(clumsySquare(9467, 7649));
// console.timeEnd("Second Call");

// Q20 output
// Promise.resolve(() => console.log("pro")).then((res) => res());

// Q21 implement logic
// const calc = {
//   total: 0,

//   add(x) {
//     this.total += x;
//     return this;
//   },

//   subtract(x) {
//     this.total -= x;
//     return this;
//   },

//   multiply(x) {
//     this.total *= x;
//     return this;
//   },
// };

// const result = calc.add(10).multiply(5).subtract(20).add(10);
// console.log(result.total);

// // Q22 File Explorer

// //

// let b = "Himanshu";
// console.log(b[0]);

// b[0] = "h";
// console.log(b);

// add2(1, 2);
// function add(a, b) {
//   return a + b;
// }

// const add2 = (a, b) => a + b;

// add2(1, 2);

// function foo(a,...rest,b) {
//   console.log(a, rest, b);
// }

// foo(1, 2, 3, 4, 5, 6);

// var x = 20;

// function foo() {
//   console.log(x);
//   var x = 10;
// }

// foo();

// console.log(name);
// var name = "Himanshu";

// console.log(window.name);

// async function foo() {
//   return "Hello world";
// }

// const result = foo();
// result.then((res) => {
//   console.log(res);
// });

// const apiCall = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const data = await response.json();
//   return data;
// };

// const result2 = apiCall();
// result2.then((res) => {
//   console.log(res);
// });

// let car = function (model) {
//   this.model = model;
// };

// car.prototype.getModel = function () {
//   return this.model;
// };

// let car1 = new car("Toyota");
// console.log(car1.getModel());

// const x = [1, 2, 3, 4, 5];
// x[-1] = 10;

// console.log(x);
// console.log(x.indexOf(10000));

// const arr = [1, 2, 15, 30, 5, 45, 7];
// const arr2 = arr.sort((a, b) => a - b);
// console.log(arr2);

// let i = Number.MIN_VALUE;
// console.log(i);

// console.log(i * i); //0
// console.log(i + 1); //1
// console.log(i - 1); //-1
// console.log(i / i); //1
// console.log(i++);
// console.log(++i);
// console.log(i--);
// console.log(--i);
// console.log(i);

// let x = [1, 2, 3, 4, 5] + [6, 7, 8, 9, 10];
// console.log(x);

// console.log(NaN === NaN);

// console.log(2 + "2");
// console.log(2 - "2");

// var x = 1;
// a();
// b();
// console.log(x);
// // we are calling the functions before defining them. This will work properly, as seen
// function a() {
//   var x = 10; // local scope because of separate execution context
//   console.log(x);
// }
// function b() {
//   var x = 100;
//   console.log(x);
// }

// console.log(a); // ReferenceError: Cannot access 'a' before initialization
// console.log(b); // prints undefined as expected
// let a = 10;
// console.log(a); // 10
// var b = 15;
// console.log(window.a); // undefined
// // console.log(window.b); // 15

// var a = 100;
// let a = 10;
// console.log(a); // 10
// console.log(window.a); // 100
// console.log(window.b); // undefined

// const a = 10;
// a = 5;

// {
//   var a = 10;
//   let b = 20;
//   const c = 30;
// }
// console.log(a); // 10
// console.log(b); // Uncaught ReferenceError: b is not defined

// function foo() {
//   var x = 10;
// }
// foo();
// console.log(x);

// function x() {
//   var a = 7;
//   function y() {
//     console.log(a);
//   }
//   return y;
// }
// var z = x();
// console.log(z);
// z();

// function z() {
//   var b = 900;
//   function x() {
//     var a = 7;
//     function y() {
//       console.log(a, b);
//     }
//     y();
//   }
//   x();
// }
// z();

// function Counter() {
//   //constructor function. Good coding would be to capitalize first letter of constructor
//   // function.
//   var count = 0;
//   this.incrementCounter = function () {
//     //anonymous function
//     count++;
//     console.log(count);
//   };
//   this.decrementCounter = function () {
//     count--;
//     console.log(count);
//   };
// }

// const counter1 = new Counter();
// counter1.incrementCounter();
// counter1.decrementCounter();

// Another Example of callback
// function printStr(str, cb) {
//   setTimeout(() => {
//     console.log(str);
//     cb();
//   }, 5000);
// }
// function printAll() {
//   printStr("A", () => {
//     printStr("B", () => {
//       printStr("C", () => {});
//     });
//   });
// }
// printAll(); // A B C // in order

// const arr = [5, 1, 3, 2, 6];

// const binaryArr = arr.map((x) => x.toString(2));

// console.log(binaryArr);

// console.log(this);

// function foo() {
//   console.log(this);
// }
// foo();

// const arr = [1, 2, 3, 4, 5];
// console.log(arr.__proto__ === Array.prototype);

// const obj = {
//   name: "Himanshu",
//   age: 30,
// };
// console.log(obj.__proto__ === Object.prototype);

// console.log(arr.__proto__.__proto__ === obj.__proto__);
// console.log(object);

// function person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// person.prototype.greet = function () {
//   console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
// };

// const p1 = new person("Himanshu", 30);
// const p2 = new person("Rahul", 25);
// p1.greet();
// p2.greet();

// const original = {
//   a: 1,
//   nested: {
//     b: 2,
//     nested2: {
//       c: 3,
//     },
//   },
// };

// function deepClone(obj) {
//   let newObj = {};
//   for (const [key, value] of Object.entries(obj)) {
//     if (typeof value === "object" && value !== null) {
//       newObj[key] = deepClone(value);
//     } else {
//       newObj[key] = value;
//     }
//   }
//   return newObj;
// }

// console.log(original);
// const deepClone1 = deepClone(original);
// console.log(deepClone1);
// deepClone1.nested.b = 20;
// console.log(deepClone1);
// console.log(original);

// Shallow copy
// const shallow1 = { ...original };
// const shallow2 = Object.assign({}, original);

// Deep copy
// const deep1 = JSON.parse(JSON.stringify(original));
// const deep2 = structuredClone(original);
// shallow1.a = 10;

// console.log(original);
// console.log(shallow1);

// deep1.nested.b = 20;

// console.log(deep1);

// new Keyword in JavaScript
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const p1 = new Person("Himanshu", 30);
// console.log(p1);

// create a new object
// 1. create a new object
// 2. set the prototype of the new object to the prototype of the constructor function
// 3. call the constructor function with the new object as the this context
// 4. return the new object

// function sortColors(arr) {
//   let left = 0;
//   let mid = 0;
//   let right = arr.length - 1;

//   while (mid <= right) {
//     if (arr[mid] === 0) {
//       [arr[mid], arr[left]] = [arr[left], arr[mid]];
//       left++;
//       mid++;
//     } else if (arr[mid] === 2) {
//       [arr[mid], arr[right]] = [arr[right], arr[mid]];
//       right--;
//     } else {
//       mid++;
//     }
//   }

//   return arr;
// }
// console.log(sortColors([2, 0, 2, 1, 1, 0]));

// function throttle(fn, delay) {
//   let lastCall = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - lastCall >= delay) {
//       lastCall = now;
//       fn.apply(this, args);
//     }
//   };
// }
// const throttledFn = throttle(console.log, 1000);
// throttledFn("Hello");
// throttledFn("World");
// throttledFn("Hello");

// const obj = {
//   name: "test",
//   regular: function () {
//     console.log(this.name); // A
//   },
//   arrow: () => {
//     console.log(this.name); // B
//   },
//   nested: function () {
//     const inner = () => console.log(this.name); // C
//     inner();
//   },
// };

// obj.regular(); // A: "test"
// obj.arrow(); // B: undefined (arrow uses outer this = window)
// obj.nested(); // C: "test" (arrow inherits this from nested fn)
