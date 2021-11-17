// You're only allowed to use imports on modules
import { log } from "./util.js";

export default class MyClass {
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
    want to view the functionality of a module, the page needs to be hosted on some site. I recommend a localhost service such as
    XAMPP in the meantime if you're interested in toying with modules, but we will be using a different service to preview our
    LWC that we create that takes care of this issue when we move to OSS LWC.
*/