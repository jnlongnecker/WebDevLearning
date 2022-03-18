// You're only allowed to use imports on modules
import { log } from "./util.js";

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
        let arrowFunction = () => 18 * 2;
        return log(arrowFunction);
    }
}

let object = new MyClass("Sample");
object.myMethod();
console.log(JSON.stringify(object));


/*
    Note that using a module will cause JS to try and import the file. If you're opening the local HTML document with a web browser,
    this attempt will be blocked, and for good reason. JS is, by design, not allowed to import any of your local files. If you
    want to view the functionality of a module, the page needs to be hosted on some site. A localhost service such as XAMPP will take care of this
    or, if you know how to do it, setting up an Express server with NodeJS.
*/