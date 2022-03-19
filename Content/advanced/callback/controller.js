/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: All logic for the Callback demo HTML page
*/

// Event listener setup
window.onload = () => {
    createSpinner(10);
    document.querySelector("#go").addEventListener("click", startSpinner);
    document.querySelector(".background").addEventListener("click", togglePopup);
    document.querySelector("#ok").addEventListener("click", togglePopup);
};

/*
    --- START SPINNER SETUP ---
*/
// Creates a spinner with the specified number of circles
function createSpinner(numCircles) {
    const degrees = 180 / numCircles;
    const time = 1 / numCircles;

    let spinner = document.querySelector(".spinner");
    for (let x = 0; x < numCircles; x++) {
        let nextDiv = document.createElement("div");
        nextDiv.classList.add("container");

        /*  Here's a good example of a use for the style attribute: JavaScript. If you need very precise stylings, ensure that
            it's only for a few properties; then use JavaScript to calculate them   */
        nextDiv.style = `transform: rotateZ(${x * degrees}deg);animation-delay: ${time * x}s;`;
        nextDiv.innerHTML = "<span></span>";
        nextDiv.addEventListener("animationend", addBounce);
        spinner.appendChild(nextDiv);
    }
};

// You can use JavaScript to tell information about a playing animation! Very handy
function addBounce(event) {
    if (event.animationName == "bounce") return;

    let span = event.target.children[0];
    span.classList.toggle("bounce");
}
/*
    --- END SPINNER SETUP ---
*/

// Used to start the spinner animation and timer
function startSpinner() {
    let inputSeconds = document.querySelector("input[type=number]").value;

    // The try/catch block, used to handle any exceptions (called Errors in JavaScript)
    try {
        // Put the code you think will cause an exception in the try block
        validateInput(inputSeconds);
    }
    catch (e) {
        // If an exception fires, this logic in the catch will execute
        togglePopup(e);
        return;
    }
    finally {
        // A finally block will always run. Use it if there is some code that should be run in both cases
    }

    disableButton(inputSeconds);
    startTimer(inputSeconds);

    let allCircles = document.querySelectorAll(".container");
    for (let circle of allCircles) {
        circle.classList.remove("zoom-out");
        circle.classList.add("zoom-in");
        setTimeout(() => {
            circle.classList.remove("zoom-in");
            circle.classList.add("zoom-out");
        }, inputSeconds * 1000 + 1500);
    }
}

function disableButton(duration) {
    let button = document.querySelector("#go");
    button.disabled = true;
    setTimeout(() => {
        button.disabled = false;
    }, duration * 1000 + 3000);
}

function startTimer(duration) {

    let timer = document.querySelector("#timer");
    timer.innerText = duration;

    setTimeout(() => {
        let interval = setInterval(() => {
            timer.innerText = --duration;
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
        }, duration * 1000);

    }, 1500);
}

function togglePopup(error) {

    let bg = document.querySelector(".background");
    let popup = document.querySelector(".popup");
    let errorDisplay = document.querySelector("#error-message");
    let currentText = errorDisplay.innerText;
    errorDisplay.innerText = error.message ? error.message : currentText;

    bg.classList.toggle("fade-in");

    if (popup.classList.contains("flip-in")) {
        popup.classList.remove("flip-in");
        popup.classList.add("flip-out");
    }
    else {
        popup.classList.remove("flip-out");
        popup.classList.add("flip-in");
    }
}

function validateInput(input) {
    console.log(input);
    // You can throw an exception (again, called an Error because JS) in a multitude of ways
    if (!input) throw new Error("C'mon partner, at least put something in there?");
    if (input == 0) throw new Error("You gotta have at least 1 second in there.");
    if (input >= 100) throw new Error("That's way too long partner. Keep it under 100.");
    if (input < 0) throw new Error("Negative time? Ain't no such thing. Keep it positive.");

    // You can simply use the throw keyword with a string, number or boolean
    // Or you can use the throw keyword while declaring an Error object like I have done here
}

/*
    Pop quiz on JavaScript: Explain why the above validation works.
*/