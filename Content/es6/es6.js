/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: Simple module to showcase new ES6 features
*/

/*
    Javascript is maintained by ECMA (European Computer Manufacturers Association) and
    new versions of Javascript are referred to as ECMAscript, or ES. The most recent
    version of Javascript is ES6
*/

/*
    Strict mode was introduced in ES5 to clean up some of the sloppiness of JavaScript. You have to
    "opt-in" to using it, so let's talk about what it does:
    - There's some JavaScript errors that occur silently. This can be an issue, so strict mode makes 
        those errors occur loudly so that you can fix them.
    - There are some JavaScript semantics that can cause the engines that run it unable to optimize 
        due to mistakes in the language. Strict mode fixes those mistakes, often times allowing 
        identical code to run faster.
    You can use strict mode for an entire script by putting it at the top, or you can only use it
    for one function by putting it at the top of the function inside the {}.
*/

// Since this is a module, technically it's already in strict mode. But, this is the syntax for
// entering strict mode.
"use strict"

// You're only allowed to use imports on modules
import { log } from "./util.js";

// Classes were introduced in ES6, and set "this" to themselves
class MyClass {
    // classes can be created in JavaScript, similar to OOP languages

    // Classes are allowed to have properties and methods
    property;

    // A constructor is a special function used to create an instance of a class
    constructor(value) {
        // Notice to access our property, we have to use "this"; which is a keyword to refer to the object we're in
        this.property = value;
    }

    // When a function belongs to a class, it is called a method
    myMethod() {
        console.log('---- myMethod Output ----');
        // Arrow functions are also an ES6 feature, as are Template Literals
        let arrowFunction = () => `The answer is ${18 * 2}`;
        return log(arrowFunction);
    }
}

// We've been using let, but it actually was introduced in ES6!
let object = new MyClass(`Sample`);
object.myMethod();
console.log(JSON.stringify(object));

// Let's talk more about scope:
/*
    There are 5 kinds of scope:
    - Global scope: variables defined outside of functions, blocks or modules
    - Local scope: refers to scopes that are not global
    - Function scope: variables defined within a function
    - Block scope: let and const defined wihtin {}
    - Lexical scope: variables can be used in functions inside their scope

    Variables declared with var can only have global or function scope.
    Variables declared with let or const can have block, function or global scope.
*/


/*
    Note that using a module will cause JS to try and import the file. If you're opening the local HTML document with a web browser,
    this attempt will be blocked, and for good reason. JS is, by design, not allowed to import any of your local files. If you
    want to view the functionality of a module, the page needs to be hosted on some site. A localhost service such as XAMPP will take care of this
    or, if you know how to do it, setting up an Express server with NodeJS.
*/

/* 
    There are some functional differences between normal functions and arrow functions, besides the syntax being slightly shorter   
*/
/*
    -> this
    The 'this' keyword refers to the object that contains a function and is defined when a function is created. Functions in 
    JavaScript, like Arrays, inherit from Object. Arrow functions, however, do not define 'this' when they are created. Such 
    functionality is useful for callback functions, because the callback function being called is not going 
    to define its own 'this' that would overwrite the one created by a previous function. This can be a problem for an arrow
    function in an object though because it won't have access to the objects properties, since the 'this' there would either refer to
    nothing (in the case of a module), the window, or the function that contains the object.
    
    Simply put, if you want to use a callback function, you should probably use an arrow function. If you want to use a method, 
    use a normal function.
*/

// Does not set "this" to anything
const obj = {
    myValue: 37,

    // The "example" function sets "this" to obj
    example() {
        log(this.myValue);

        function callback() { return this; }
        // The function tries to set "this" to example, but it's not an object so it becomes undefined
        log(callback);

        let arrow = () => this.myValue;
        // The arrow function just steals the "this" as it was defined by the "example" function
        log(arrow);
    },

    // The "arrowExample" function does not set "this" to anything, so it remains undefined (since we're in a module)
    arrowExample: () => {
        log(this);

        function callback() { return this; }
        // The function tries to set "this" to arrowExample, but it can't so it remains undefined
        log(callback);

        let arrow = () => this;
        // The arrow function steals the "this", but that's undefined so it remains undefined
        log(arrow);
    }


};

console.log('---- Normal Function Output ----');
obj.example();

console.log('---- Arrow Function Output ----');
obj.arrowExample();

/*
    -> Constructors
    You cannot use an arrow function as a constructor. In other words, you cannot use the new keyword with an arrow function
*/

function Valid(string) {
    this.value = string;
}

const Invalid = string => {
    this.value = string;
}

function executingThisWillCauseAnError() {
    const goodConstructor = new Valid('All Good!'); // Valid syntax
    const badConstructor = new Invalid('No Good!'); // Invalid syntax (throws an error)
}

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