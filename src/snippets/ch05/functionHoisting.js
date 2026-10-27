greet(); // Execute successfully — the function declaration is fully hoisted.
sayHello(); // Throw ReferenceError — `sayHello` is in the TDZ.

function greet() {
  console.log('hi');
}

const sayHello = function () {
  console.log('hello');
};
