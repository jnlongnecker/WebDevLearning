/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: Simple module to showcase new ES6 features
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

// Classes were introduced in ES6
class MyClass {
    // classes can be created in JavaScript, similar to OOP languages

    // Classes are allowed to have properties and methods
    property;

    // A constructor is a special function used to create an instance of a class
    constructor(value) {
        this.property = value;
    }

    // When a function belongs to a class, it is called a method
    myMethod() {
        // Arrow functions are also an ES6 feature, as are Template Literals
        let arrowFunction = () => `The answer is ${18 * 2}`;
        return log(arrowFunction);
    }
}

// We've been using let, but it actually was introduced in ES6!
let object = new MyClass(`Sample`);
object.myMethod();
console.log(JSON.stringify(object));


/*
    Note that using a module will cause JS to try and import the file. If you're opening the local HTML document with a web browser,
    this attempt will be blocked, and for good reason. JS is, by design, not allowed to import any of your local files. If you
    want to view the functionality of a module, the page needs to be hosted on some site. A localhost service such as XAMPP will take care of this
    or, if you know how to do it, setting up an Express server with NodeJS.
*/