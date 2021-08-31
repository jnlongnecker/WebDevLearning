// In JS, we define methods as functions
// JavaScript is loosely typed, so no data types are defined
function intro() {

    // There are 2 ways to define a variable, using let and using var
    // Using let makes the variable scoped, while var is not scoped
    // let is a best practice, and causes variables to behave as they do in Apex
    let goodVariable = 1;
    var badVariable = NaN;

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

    // for loops are also the same as in Apex, but we define no data type
    for (let index = 0; index < 5; index++) {

        // We can combine JS code in strings using the following syntax with ` backticks
        console.log(`At position ${index}`);
    }

    // Enhanced for loops, however, are quite different
    // Using the in keyword, we iterate over the keys
    for (let key in myObject) {
        console.log(`${key}: ${myObject[key]}`);
    }

    // Using the of keyword, we iterate over the values. Objects cannot be used in this way
    for (let value of array) {
        console.log(value);
    }

}

// We can specify event listeners to call code when events are triggered
window.onload = () => {
    let images = document.querySelectorAll("img");
    for (let image of images) {
        image.addEventListener("click", imageClicked);
    }
    let apiBtn = document.querySelector("#btn");
    apiBtn.addEventListener("click", makeRequest);
    window.addEventListener("keydown", submitInput);
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

function submitInput(event) {
    if (event.code !== "Enter") return;
    makeRequest();
}

function makeRequest() {
    let input = document.querySelector("input[type=text]");
    let searchQuery = input.value.toLowerCase();
    if (!input.value) return;

    input.value = "";

    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            response = JSON.parse(response);
            populate(response);
        }
    };

    // Open the request: Method, URL, isAsynchronous
    ajaxRequest.open("GET", "https://pokeapi.co/api/v2/pokemon/" + searchQuery, true);
    ajaxRequest.send();
}

function populate(requestData) {
    let pkmName = requestData["name"];
    let typeData = requestData["types"];
    let allTypes = [];
    let spriteURL = requestData["sprites"]["front_default"];
    let spriteContainer = document.querySelector("#result-image");
    let typeContainer = document.querySelector("#result-data");
    let typeHTML = "";

    pkmName = capitalize(pkmName);

    for (let d of typeData) {
        allTypes.push(d["type"]["name"]);
    }

    spriteContainer.innerHTML = "<img class=\"sprite\" src=\"" + spriteURL + "\" alt=\"" + pkmName + " Front Sprite\" />";
    document.querySelector("#result-text").innerHTML = pkmName;

    for (let type of allTypes) {
        typeHTML += "<span class=\"type\">" + capitalize(type) + "</span>";
    }
    typeContainer.innerHTML = typeHTML;
}

function capitalize(inputString) {
    let char1 = inputString[0].toUpperCase();
    return char1 + inputString.substring(1).toLowerCase();
}