/*
    Created By: Jared Longnecker
    Last Updated: 03/24/2022
    Description: Miscellaneous JavaScript topics and JavaScript funk
*/

// This throws an exception since no elements are loaded in yet!
try {
    document.querySelector("#before").innerText = "Changed with JavaScript!";
}
catch { }

// Setting up event listeners
window.onload = () => {
    document.querySelector("#after").innerText = "Changed with JavaScript!";

    document.querySelector("#add-btn").addEventListener("click", addElement);
    document.querySelector("#remove-btn").addEventListener("click", removeElement);

    document.querySelector("form").addEventListener("submit", event => event.preventDefault());

    document.querySelector("#primitive-btn").addEventListener("click", addPrimitive);
    document.querySelector("#complex-btn").addEventListener("click", addComplex);

    addTruths();

    console.log(window);
}

// Creates a span and populates it with a Hi text node
function addElement() {
    let elementHolder = document.querySelector("#element-holder");
    let newSpan = document.createElement("span");
    let spanContent = document.createTextNode("Hi!");

    newSpan.appendChild(spanContent);
    elementHolder.appendChild(newSpan);
}

// Removes the last child in the element holder div
function removeElement() {
    let elementHolder = document.querySelector("#element-holder");

    elementHolder.removeChild(elementHolder.lastChild);
}

// Demo for primitive vs complex, primitive example
function addPrimitive() {
    let number = Number(document.querySelector("#primitive-input").value);
    displayPrimitiveIn2(number);
    number += 5;
    document.querySelector("#primitive-text").innerText = `${number} vs. `;
}

// Receives someNum by value and adds in after a delay
function displayPrimitiveIn2(someNum) {
    setTimeout(() => {
        document.querySelector("#primitive-text").innerText += " " + someNum;
    }, 2000);
}

// Demo for primitive vs complex, complex example
function addComplex() {
    let myObj = {
        number: Number(document.querySelector("#complex-input").value)
    };
    displayComplexIn2(myObj);
    myObj.number += 5;
    document.querySelector("#complex-text").innerText = `${myObj.number} vs. `;
}

// Receives anObj passed by reference, so changing it elsewhere changes it here as well
function displayComplexIn2(anObj) {
    setTimeout(() => {
        document.querySelector("#complex-text").innerText += " " + anObj.number;
    }, 2000);
}

// In order to prove these truths are calculated, I've added those elements via JavaScript
function addTruths() {
    let truthHolder = document.querySelector("#the-truths");

    addTruthToNode(truthHolder, `NaN == NaN = ${NaN == NaN}`);
    addTruthToNode(truthHolder, `typeof NaN = ${typeof NaN}`);
    addTruthToNode(truthHolder, `-5 / 0 = ${-5 / 0}`);
    addTruthToNode(truthHolder, `5 / 0 = ${5 / 0}`);
    addTruthToNode(truthHolder, `0.1 + 0.2 = ${0.1 + 0.2}`);

}

// Helper function to add a truth
function addTruthToNode(element, truth) {
    let newTruth = document.createElement("p");
    let truthContent = document.createTextNode(truth);

    newTruth.appendChild(truthContent);
    element.appendChild(newTruth);
}

// Run to demonstrate breakpoints
function collatz(num) {
    if (typeof num != "number" && typeof num != "bigint") throw `Must input a number, you input a ${typeof num}.`;
    if (num <= 0) throw `Must be a positive number.`;
    num = BigInt(num);

    let iterations = 0;
    while (num > 1n) {
        let isOdd = num % 2n == 1n;
        if (isOdd) {
            num = 3n * num + 1n
        }
        else {
            num = num / 2n;
        }
        iterations++;
    }
    console.log(`It took ${iterations} steps to get to 1`);
}

