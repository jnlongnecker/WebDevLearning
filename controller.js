// In JS, we define functions
// JavaScript is loosely typed, so no data types are defined

function intro() {

    // There are 2 ways to define a variable, using let and using var
    // Using let makes the variable scoped, while var is not scoped
    // let is a best practice, and causes variables to behave as they do in Apex
    let goodVariable = 5;
    var badVariable = NaN;

    // We can define a constant by using const
    const theUnchangingOne = 1;

    /*
        There are a variety of data types still, but not as many as in Apex:
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

    // We have while loops in JS as well
    while (goodVariable) {
        console.log("While loop reached!");
        break;
    }

    // for loops are also the same as in most programming languages
    for (let index = 0; index < 5; index++) {

        // We can combine JS code in strings using the following syntax with ` backticks (Called Template Literals)
        console.log(`At position ${index}`);
    }

    // Enhanced for loops, however, are quite different
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

}

var sliding = false;

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
}

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
}

/* 
    Let's talk about arrow functions
    There are some functional differences between normal functions and arrow functions, besides the syntax being slightly shorter   
*/
/*
    -> this
    The 'this' keyword refers to the object that contains the normal function. When used with an arrow function, it refers to the
    'this' value of whatever called the arrow function. This is useful for callback functions, because the callback function being
    called is not going to define its own context and will always refer back to what originally called it.

    Simply put, if you need to access the 'this' keyword in a callback function, make sure you use an arrow function
*/
const obj2 = {
    otherFunc() {
        console.log(this);
    }
};

const obj3 = {
    callback: () => {
        console.log(this);
    }
}

const obj = {
    func(nums) {
        console.log(this);
        nums.forEach(obj3.callback);
        obj2.otherFunc();
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
