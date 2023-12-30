'use strict';

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const same = new Student('Same', 2001, 'Computer Science');

// setting the a new method to the array object
Array.prototype.unique = function () {
  return [...new Set(this)];
};

// Coding challenge

const Car = function (carMake, carSpeed) {
  this.carMake = carMake;
  this.carSpeed = carSpeed;
  this.locale = navigator.language;
  this.speedDesignOptions = {
    style: 'unit',
    unit: 'kilometer-per-hour',
  };
};

Car.prototype.logCarSpeed = function () {
  const speed = new Intl.NumberFormat(
    this.locale,
    this.speedDesignOptions
  ).format(this.carSpeed);

  console.log(`${this.carMake} going at ${speed}`);
};

Car.prototype.accelerate = function () {
  this.carSpeed += 10;
  this.logCarSpeed();
};

Car.prototype.brake = function () {
  this.carSpeed -= 5;
  this.logCarSpeed();
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

// EV car challenge

const ElectricVehicle = function (carMake, carSpeed, carCharge) {
  Car.call(this, carMake, carSpeed);
  this.carCharge = carCharge;
};

ElectricVehicle.prototype = Object.create(Car.prototype);

ElectricVehicle.prototype.chargeBattery = function (chargeTo) {
  this.carCharge = chargeTo;
};

ElectricVehicle.prototype.accelerate = function () {
  this.carSpeed += 20;
  this.carCharge -= 1;
  this.logCarSpeed();
};

ElectricVehicle.prototype.logCarSpeed = function () {
  console.log(
    `${this.carMake} going at the speed of ${this.carSpeed} km/h, with a charge of ${this.carCharge}%`
  );
};

// ES6 classes

class Car2 {
  constructor(carMake, carSpeed) {
    this.carMake = carMake;
    this.carSpeed = carSpeed;
    this.locale = navigator.language;
    this.speedDesignOptions = {
      style: 'unit',
      unit: 'kilometer-per-hour',
    };
  }

  get speedUS() {
    return this.carSpeed / 1.6;
  }

  set speedUS(speed) {
    this.carSpeed = speed * 1.6;
  }

  accelerate() {
    this.carSpeed += 10;
    this.logCarSpeed();
  }

  brake() {
    this.carSpeed -= 5;
    this.logCarSpeed();
    return this;
  }

  logCarSpeed() {
    const speed = new Intl.NumberFormat(
      this.locale,
      this.speedDesignOptions
    ).format(this.carSpeed);

    console.log(`${this.carMake} going at ${speed}`);
  }
}

class ElectricVehicle2 extends Car2 {
  #carCharge;
  constructor(carName, carSpeed, carCharge) {
    super(carName, carSpeed);
    this.#carCharge = carCharge;
  }

  chargeBattery(chargeTo) {
    this.#carCharge = chargeTo;
    return this;
  }

  accelerate() {
    this.carSpeed += 20;
    this.#carCharge--;
    this.logCarSpeed();
    return this;
  }

  logCarSpeed() {
    console.log(
      `${this.carMake} going at the speed of ${
        this.carSpeed
      } km/h, with a charge of ${this.#carCharge}%`
    );
  }
}

// Data encapsulation and data privacy
// prevent code from outside a class to manipulate properties inside of the class

const tesla = new ElectricVehicle2('Tesla', 100, 45);

tesla.accelerate().brake();
console.log(tesla.carMake, tesla.carSpeed);
