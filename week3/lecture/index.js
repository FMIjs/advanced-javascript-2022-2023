"use strict"

var obj = { 
    prop1: 10,
    prop2: 20,
    f:function() {
        console.log("properties? : ", this.prop1, this.prop2)
        console.log("i was called in this context: ", this)
    }
}

// console.log(obj.f);
// obj.f.call();
obj.f.call(obj);
// obj.f.call('baba')

function f() {
    var [a,b,c] = [1,2,3]; // destructuring
    function g() {
        console.log(a, b, c)
    }
    g();
}

f();


// функцията се извиква в някакъв контекст!
// по подразбиране това е global или текущия контектс

// каква е разликата между изпълнението на :
// obj.f() и obj.call.f()
// ??

obj.__proto__ = { 
    omg: "here",
    val: 1000
}

obj.__proto__.__proto__ = {
    wow: "😱",  bow: "🐶" }

// в С++ наследяването се описва от родител към наследници
// в JavaScript наследявнето на практика се описва от наследници към предци!
// obj -> obj.__proto__ -> obj.__proto__.__proto__

// в JavaScript няма такова нещо като множествено наследяване!

function Food(_type, _weight, _amount) {
    // var type = _type;
    this.type = _type;
    this.weight = _weight;
    this.amount = _amount;

    return this;
}

Food.prototype.print = function() { 
    // console.log(this.type, this.weight, this.amount, )
    var self = this;
    console.log(
        Object.getOwnPropertyNames(self)
              .map(function (e) {
                return [ e, ":", self[e] ].join('') })
               .join(','));
}

Food.prototype.totalWeight = function() {
    console.log("total weight is:", this.weight * this.amount)
}

function Fish( _weight, _amount ) {
    // this.type = 'fish'
    // this.weight = _weight;
    // this.amount = _amount;
    return Food.call(this, 'fish', _weight, _amount)
}

Fish.prototype = Object.create(Food.prototype)
// Fish.prototype.__proto__ = Food.prototype;

Fish.prototype.print = function() {
    console.log("imma fish, eye don print!");
}

var mycatch = new Food('Mahi Mahi', 2400, 1);
mycatch.print(); 

var myfish = new Fish(1200, 3);
myfish.print()          // apply a method from own constructor's prototype
myfish.totalWeight();   // apply a method from 'parent' (inherited)'s prototype

console.log(Object.getOwnPropertyNames(myfish));

// същото като 
// mycatch.__proto__.print.call(mycatch)

// var weird__proto = Object.create(Food.prototype);
// var weird = Food.call(weird__proto, 'Mahi Mahi', 2400, 1)
// weird.print()

// mixins
// horizontal method resolution -- not 
//   Food                   Person
//     |                       |
//   Fish --- SwimMixin --- Swimmer

// We are just adding the specific set of methods to the given "class"
// ER Modelling


var swimMixin = {
    swimUp: function() {
        // this --> the instance of the "class" this mixin has extended
        console.log(this.amount + 'fish will swim up');
        debugger;
    },
    swimDown: function() {
        console.log(this.amount + 'fish will swim down');
    }
}

Object.assign(Fish.prototype, swimMixin);

var swimmingFish = new Fish(1200, 3)

swimmingFish.swimUp();

debugger;