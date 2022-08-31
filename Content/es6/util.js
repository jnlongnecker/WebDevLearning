/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: Simple module for exports and to showcase decorators
*/

/*
    -> Decorators

    Decorators are special functions that wrap around properties, functions, or classes. Their purpose is to add some kind of
    functionality to one of those above mentioned data types. For example, the decorator above adds logging capabilities to data and
    functions. Now, we don't need to have any console logs in our functions, we can just use our logging decorator to handle that for us.
    
    They have a special syntax in most frameworks they're used in: @decorator propertyOrFunctionOrClass;

    In order to use this special syntax, a transpiler is needed (Babel is a common one). A transpiler takes code written in
    one language and translates it into code written in another language. This is because decorators are not fully supported
    features yet in JS. The results of a decorator are nearly identical to the log function written above: it merely will
    provide some extra functionality to whatever you're using. The log function adds console logging functionality to a function
    or a value.

    Keep decorators in your head, because we're going to look at them again when we get to Lightning Web Components; where we'll be able to use
    their functionality thanks to the LWC framework.
*/

function log(input) {
    if (typeof input === "function") {
        let stringInput = "" + input;
        let funcName = stringInput.substring(0, stringInput.indexOf('('));
        if (funcName == 'function' || funcName == '') funcName = 'anonymous or arrow function'
        console.log("Calling " + funcName);
        let result = input();
        console.log(`Result: ${result}`);
        return result;
    }
    console.log(`Received this data: ${input}`);
    return input;
}

export { log }


/*
    Closures are a little complicated, so don't worry if it doesn't make too much sense at first!

    First, we need to fully explain scope. When we create a variable, it is either global (meaning it can be accessed anywhere) or local (meaning
    it can only be accessed from a certain part of the program). This is actually referring to its scope. Lexical scope is all the places
    that a variable can be accessed from and is what allows variables to be used within scopes contained within a variables defined scope.

    When you make a function, it begins its own scope. That means that if we use some variable within a function, it can be accessed from
    anywhere within the function. This includes other scopes that are contained in our first scope. A closure is created when a function gets
    created, and it contains two things:
        - The function that just got created
        - All variables that function has access to, as defined by lexical scope
    Now, whenever that function gets executed, it has access to all variables given to it by its closure; even if it would seem like
    they shouldn't. Here's a few examples:
*/

// ---------- EXAMPLE 1 ----------
function operationPicker(a, b) {
    return {
        // Each of these functions has closure over our parameters, a and b
        add() {
            return a + b;
        },
        subtract() {
            return a - b;
        },
        multiply() {
            return a * b;
        },
        divide() {
            return a / b;
        }
    }
}

let newPicker = operationPicker(16, 4);

console.log('---- Picker Output ----');

// Results in 20
log(newPicker.add);

// Results in 64
log(newPicker.multiply);

// Closures allow you to do cool stuff like chain operations as well:
log(operationPicker(5, 20).multiply());

// ---------- EXAMPLE 2 ----------
// Our anonymous function has closure over count. It also has closure over startingValue, even though it's not being used.
let counter = function(startingValue) {
    let count = startingValue;
    return function() {
        count++;
        return count;
    }
}

console.log('---- Counter Output ----');

let countFrom10 = counter(10);
let countFrom20 = counter(20);

log(countFrom10);
log(countFrom10);

log(countFrom20);
log(countFrom20);

// Since we're returning a function, we can actually execute that function right away! The syntax looks kinda weird:
log(counter(100)());

// ---------- EXAMPLE 3 ----------
// Since arrow functions also have closures, we can use them in the same way!
let arrowCounter = (startingValue) => {
    let count = startingValue;
    return () => {
        count++;
        return count;
    }
}

console.log('---- Arrow Counter Output ----');

let arrowCount10 = arrowCounter(10);

log(arrowCount10);
log(arrowCount10);


// ---------- EXAMPLE 4 ----------
// If we just want to have the closure one time and don't want to make arbitrary numbers of them, we can use an IIFE
// IIFE : Immediately Invoked Function Expression

// Note: Arrow functions are necessary here, they are just easier syntax
let globalCounter = 0;
const reset = ((resetTo) => {
    return () => globalCounter = resetTo;
})(10);

// Now, we can just call reset to reset our global counter to whatever we put, and nobody can change what that is!

console.log('---- Reset Example Output ----');

log(globalCounter++);
log(++globalCounter);
reset();
log(globalCounter);