/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: Controls for the Fetch API display and event handling
*/

import { getPokemon, nameForDisplay } from './util.js';

// Event listener setup
window.onload = () => {
    document.querySelector("#search").addEventListener("click", updatePokemonData);
    document.querySelector(".text-box").addEventListener("keydown", updatePokemonData);

    let input = document.querySelector(".text-box");
    input.focus();
    input.setSelectionRange(0, input.value.length);
}

// Global variable to track the current pokemon payload
let pokemonData;

// This is where the magic happens
function updatePokemonData(event) {

    // This method is in response for keydown and click events, so filter out the non-enter key events
    if (event.code && event.code != 'Enter') return;

    inputsBusy();
    let pokemonName = document.querySelector("input[type=text]").value;

    // This function returns a promise with the data from the callout
    getPokemon(pokemonName)
        .then(response => {
            populatePage(response);
            inputsReady();
        })
        .catch(error => {
            showPopup();
            console.error(`Request resulted in an error: ${error}`);
            inputsReady();
        });
}

// Used for accessibility to let aria users know when they should modify the inputs again
function inputsBusy() {
    let inputs = document.querySelectorAll("section[role=search] *");
    for (let ele of inputs) {
        ele.setAttribute("aria-busy", "true");
        ele.disabled = true;
    }
}

function inputsReady() {
    let inputs = document.querySelectorAll("section[role=search] *");
    setTimeout(() => {
        for (let ele of inputs) {
            ele.setAttribute("aria-busy", "false");
            ele.disabled = false;
        }
        let input = document.querySelector(".text-box");
        input.focus();
        input.setSelectionRange(0, input.value.length);
    }, 500);
}

// Helper to populate the page with the data from the payload
function populatePage(payload) {
    pokemonData = payload;
    document.querySelector("#hp").innerText = getPkmHealth();
    document.querySelector("#attack").innerText = getPkmAttack();
    document.querySelector("#defense").innerText = getPkmDefense();
    document.querySelector("#sp-defense").innerText = getPkmSpDefense();
    document.querySelector("#sp-attack").innerText = getPkmSpAttack();
    document.querySelector("#speed").innerText = getPkmSpeed();
    document.querySelector("#name").innerText = getPkmName();
    document.querySelector("#types").innerHTML = getPkmTypes();
    document.querySelector("#abilities").innerHTML = getPkmAbilities();

    let img = document.querySelector("#pkm-image");
    img.alt = getAltText();
    img.src = getPkmSprite();

    document.querySelector(".results-section").classList.add("rise-in");
}

// Helper to display and hide the popup
function showPopup() {
    let pokemonName = document.querySelector("input[type=text]").value;
    let popup = document.querySelector(".popup");
    document.querySelector("#error-message").innerText = `Looks like the Pokemon "${pokemonName}" wasn't found!`;

    popup.classList.remove("flip-out");
    popup.classList.add("flip-in");
    setTimeout(() => {
        popup.classList.remove("flip-in");
        popup.classList.add("flip-out");
    }, 3000);
}












// Use custom get functions to retrieve the desired pieces of data
function getPkmName() {
    return nameForDisplay(pokemonData.name);
}

function getPkmSprite() {
    return pokemonData.sprites.front_default;
}

function getAltText() {
    return `Front Sprite for ${getPkmName()}`;
}

function getPkmTypes() {
    let types = pokemonData.types.map(t => nameForDisplay(t.type.name));

    let htmlString = "";
    for (let type of types) {
        htmlString += `<li class="${type}">${type}</li>`;
    }
    return htmlString;
}

function getPkmAbilities() {
    let abilities = pokemonData.abilities.map(t => {
        return (t.is_hidden) ? `Hidden Ability: ${nameForDisplay(t.ability.name)}` : nameForDisplay(t.ability.name);
    });

    let htmlString = "";
    for (let ability of abilities) {
        htmlString += `<li>${ability}</li>`;
    }
    return htmlString;
}

function getPkmHealth() {
    return "HP: " + pokemonData.stats[0].base_stat;
}

function getPkmAttack() {
    return "Attack: " + pokemonData.stats[1].base_stat;
}

function getPkmDefense() {
    return "Defense: " + pokemonData.stats[2].base_stat;
}

function getPkmSpAttack() {
    return "Sp. Attack: " + pokemonData.stats[3].base_stat;
}

function getPkmSpDefense() {
    return "Sp. Defense: " + pokemonData.stats[4].base_stat;
}

function getPkmSpeed() {
    return "Speed: " + pokemonData.stats[5].base_stat;
}
