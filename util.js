function log(input) {
    if (typeof input === "function") {
        console.log("Calling function");
        let result = input();
        console.log(`Result: ${result}`);
        return result;
    }
    console.log(`Received this data: ${input}`);
    return input;
}

export { log }

/*
    -> Decorators

    Decorators are special functions that wrap around properties, functions, or classes. They have a special syntax:
    @decorator propertyOrFunctionOrClass;

    In order to use this special syntax, a transpiler is needed (Babel is a common one). A transpiler takes code written in
    one language and translates it into code written in another language. This is because decorators are not fully supported
    features yet in JS. The results of a decorator are nearly identical to the log function written above: it merely will
    provide some extra functionality to whatever you're using. The log function adds console logging functionality to a function
    or a value.

    Keep decorators in your head, because we're going to look at them again when we get to OSS LWC; where we'll be able to use
    their functionality thanks to the LWC framework.
*/