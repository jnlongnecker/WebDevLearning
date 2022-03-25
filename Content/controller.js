/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: Basic concepts of JS and functionality for index.html
*/

// In JS, we define functions
// JavaScript is loosely typed, so no data types are defined

// There are 2 ways to define a variable, using let and using var
// Using let makes the variable locally scoped, while var is function scoped
// let is a best practice, and causes variables to behave in a more understandable manner

let goodVariable = 5;
{
    // Because var is function scoped, it is accessible even outside of this local scope
    var badVariable = NaN;
}

// We can define a constant by using const
const theUnchangingOne = 1;

/*
    There are a variety of data types:
    - Number
    - BigInt
    - String
    - Boolean
    - Null
    - Undefined
    - Array
    - Object
*/

// Strings in particular have a variety of useful methods:
/*
    String.indexOf()
    String.includes()
    String.substring()
    String.split()
    String.toLowerCase() / String.toUpperCase()
*/

// In JS, instead of lists we have arrays
let array = [];
array.push("Value 1");
array.push("Value 2");
console.log(array[0]);

let filledArray = ["Item A", "Item B"];
filledArray.push("Item C");
console.log(filledArray.shift());   // Result: "Item A"
console.log(filledArray[0]);        // Result: "Item B"
console.log(filledArray.pop());     // Result: "Item C"
console.log(filledArray.length);    // Result: 1

// In JS, we also can define objects using object syntax
let myObject = {
    objName: "A Name",
    number: 123,
    value: "Sample Value"
}

/* In JS, values are either Truthy or Falsey
   The Falsey values are:
   - "", '', ``
   - NaN
   - Null
   - Undefined
   - False
   - 0, 0n, -0
   - document.all
   If a value is not Falsey, it is Truthy
*/
// console.log is used to print to the console
if (badVariable) {
    console.log("This code is never reached!");
}
else if (goodVariable) {
    console.log("This code will be reached!");
}

// Let's talk about type coercion
let stringNumber = "10";
let numberNumber = 10;

// If we use ==, JavaScript is going to change the types of both to be the same, then see if they're equal
if (stringNumber == numberNumber) {
    console.log("They're Equal!");
}

// If we use ===, JavaScript WON'T do that, and if they're different data types, this evaluates to false
if (stringNumber === numberNumber) {
    console.log("They're SUPER equal!");
}
else {
    console.log("Well, they're not that equal");
}

// A switch statement is a good way of doing many if-else statements with less syntax
switch (myObject.number) {
    case 1:
        console.log("The number is One!");
        break;
    case 2, 4, 6, 8:
        console.log("The number is Even and Less than 10!");
        break;
    default:
        console.log("The number is boring!");
        break;
}

// We have while loops in JS as well
while (goodVariable) {
    console.log("While loop reached!");

    // break can be used to cancel out of any loops
    break;
}

// And do while loops, if you really want them
do {
    console.log("Always executes once!");
}
while (1 > 2)

// for loops are also the same as in most programming languages
for (let index = 0; index < 5; index++) {

    // We can combine JS code in strings using the following syntax with ` backticks (Called Template Literals)
    console.log(`At position ${index}`);
}

// Enhanced for loops are a little tricky in JS
// Using the in keyword, we iterate over the keys
for (let key in myObject) {
    console.log(`${key}: ${myObject[key]}`);
}

// Using the of keyword, we iterate over the values. Objects cannot be used in this way
for (let value of array) {
    console.log(`${value}`);
}

/* 
    Let's talk about hoisting

    When you create a variable, first the variable is declared, then it's assigned.
    Hoisting is taking the declaration of a variable and moving it to the top of its scope. This also occurs
    with functions that we write. This allows a function or variable to be used before it seems to have been created
    in the code.
*/

/*
    Now, all of this code just gets run as soon as the JavaScript file is loaded by the browser. This is usually not
    what we want, so how do we actually get code to run when *Stuff*™ happens?
*/


var sliding;

// We can specify event listeners to call code when events are triggered
window.onload = function () {
    let images = document.querySelectorAll("img");
    let toggles = document.querySelectorAll("input[type=checkbox]");
    let sliders = document.querySelectorAll("input[type=range]");

    for (let image of images) {
        image.addEventListener("click", imageClicked);
    }
    for (let toggle of toggles) {
        toggle.addEventListener("click", toggleFlipped);
    }
    for (let slider of sliders) {
        slider.addEventListener("mousedown", event => { sliding = true; sliderAdjusted(); })
        slider.addEventListener("mouseup", event => { sliding = false })
        slider.addEventListener("mousemove", sliderAdjusted);
    }

    // This will show the colored square on page load
    manualSliderUpdate();
}

// Best practices when manipulating element styles is to only manipulate their classes
function imageClicked(event) {
    let target = event.currentTarget;

    // We can stop all event propagation with the stopPropagation() method
    event.stopPropagation();
    if (target.classList.contains("expanded")) {
        target.classList.remove("expanded");
    }
    else {
        target.classList.add("expanded");
    }
}

// Handles a toggle on a color
function toggleFlipped(event) {
    let toggle = event.target;
    let inputChannel;
    switch (toggle.getAttribute("id")) {
        case "add-green":
            inputChannel = document.querySelector("#green-channel");
            break;
        case "add-blue":
            inputChannel = document.querySelector("#blue-channel");
            break;
        case "add-red":
            inputChannel = document.querySelector("#red-channel");
            break;
    }

    // A much easier way to turn a class "on" or "off" is to use the toggle function
    inputChannel.classList.toggle("hide");

    // Be sure to not only fulfill the functionality, but also update the aria attributes for accessiblity
    inputChannel.setAttribute("aria-hidden", toggle.getAttribute("checked"));
    toggle.setAttribute("aria-checked", toggle.getAttribute("checked"));

    manualSliderUpdate();
}

// Handles when a slider value is changed
function sliderAdjusted(event) {
    if (!sliding) return;

    let redInput = document.querySelector("#red-channel");
    let blueInput = document.querySelector("#blue-channel");
    let greenInput = document.querySelector("#green-channel");

    // The below syntax is an inline if statement
    let redAmount = redInput.classList.contains("hide") ? 0 : redInput.value;
    let blueAmount = blueInput.classList.contains("hide") ? 0 : blueInput.value;
    let greenAmount = greenInput.classList.contains("hide") ? 0 : greenInput.value;

    let newStyle = `rgb(${redAmount},${greenAmount},${blueAmount})`;

    // With this specific example, manipulating classes isn't possible. Instead, change the style attribute for inline styling
    document.querySelector("#output-color").style.backgroundColor = newStyle;

    document.querySelector("#hex-code").innerText = rgbToHex(redAmount, greenAmount, blueAmount);
}

// Helper to get the hex code
function rgbToHex(red, green, blue) {
    return `#${numToHex(red)}${numToHex(green)}${numToHex(blue)}`;
}

// Hex code for 1 number
function numToHex(number) {
    let hex = Number(number).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// Call to update the box color manually
function manualSliderUpdate() {
    sliding = true;
    sliderAdjusted();
    sliding = false;
}

/* 
    Let's talk about arrow functions
    There are some functional differences between normal functions and arrow functions, besides the syntax being slightly shorter   
*/
/*
    -> this
    The 'this' keyword refers to the object that contains the normal function, or the normal function itself. Functions in 
    JavaScript, like Arrays, inherit from Object. When used with an arrow function, it refers to the 'this' value of whatever 
    called the arrow function. This is useful for callback functions, because the callback function being called is not going 
    to define its own context and will always refer back to what originally called it. This can be a problem for an arrow
    function in an object though because it won't have access to the objects properties.
    
    Simply put, if you want to use a callback function, you should probably use an arrow function. If you want to use a method, 
    use a normal function.
*/

const arrow = {
    myValue: 37,
    func: () => {
        console.log(this.myValue);
        return this.myValue;
    }
};

const normal = {
    myValue: 37,
    func: function () {
        console.log(this.myValue);
        return this.myValue;
    }
};

/*
    -> Constructors
    You cannot use an arrow function as a constructor. In other words, you cannot use the new keyword with an arrow function

    function Valid(string) {
        this.value = string;
    }

    const Invalid = string => {
        this.value = string;
    }

    const goodConstructor = new Valid('All Good!'); // Valid syntax
    const badConstructor = new Invalid('No Good!'); // Inalid sytnax (throws an error)
*/
/*
    -> Arguments
    You cannot access the arguments value in an arrow function. It merely refers to the calling functions arguments, if any
*/

function hasArgs() {
    console.log(arguments);
}

const noArgs = () => {
    console.log(arguments); // Throws an error if called from the window context
}

/*
    -> Inline return
    If an arrow function contains only one line, it will return the value calculated. Regular functions merely return undefined
    if they do not explicity return a value.
*/

const times2 = num => num * 2;

/*
    -> Hoisting
    Regular functions are hoisted, unless written as an expression. Arrow functions can only be written as an expression, and
    as a result are never hoisted
*/

function hoisted() {
    console.log("I'm Hoisted!");
}

const notHoisted = function () {
    console.log("I'm not hoisted!");
}

const alsoNotHoisted = () => {
    console.log("No hoisting here!");
}