/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: Utility module for the API callouts and prettifying the pokemon names
*/

// The async keyword here causes this function to return a promise
async function getPokemon(pokemonName) {
    pokemonName = nameForApi(pokemonName);

    // Use the Fetch API to make a request to an API service and return the result
    const req = new Request('https://pokeapi.co/api/v2/pokemon/' + pokemonName);

    // By using the await keyword here, we can shorthand the promise syntax to not have to run .then() to resolve the promise
    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(response);
    }

    return response.json();
    /*
        Even though the Fetch API abstracts this information from us, let's talk about status codes:

        100-199: Informational
        200-299: Success
        300-399: Redirection
        400-499: Client Side Error
        500-599: Server Side Error

        When we say response.ok, what we mean is that the response was in the 200 series of status codes
    */
    /*
        We can use the Request.method property to set the HTTP method we want our request to use. By default, this is "GET".
        But lets take a look at the different HTTP methods we have available:

        GET: Retrieves a resource at the endpoint.
        PUT: Completely overwrites a resource at the endpoint. This can create or update a resource.
        DELETE: Removes a resource at the endpoint.
        POST: Creates a resource at the endpoint.
        PATCH: Partially overwrites a resource at the endpoint (update).

        There are more, but these are the most common. The first 3 (GET, PUT and DELETE) are idempotent: they will not cause any further
        changes if duplicate requests are made. The last 2 (POST and PATCH) are NOT idempotent, which means they WILL cause changes if
        duplicate requests are made. PATCH is a unique method, as it can sometimes be idempotent. Be especially careful with non-idempotent methods.

        When looking into HTTP requests, you will notice that the endpoints are referred to as URI's. URI stands for Uniform Resource Identifier, of which
        URL's (Uniform Resource Locator) are actually a subset. For our purposes, a URI is the name of the endpoint that points to an API resource, while a 
        URL specifies a protocol to link to a web page.
    */
}

// AJAX is the older way of making an API callout
function usingAjax(pokemonName) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Handle response
        }
    };
    request.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemonName, true);
    request.send();

    // You can tell that it is a lot less elegant and clunky to use
}



/*
    UTILITY FUNCTIONS BELOW
*/

function nameForDisplay(word) {
    word = megaConversion(word);
    word = capitalize(word);
    return word;
}

function nameForApi(word) {
    word = word.toLowerCase();
    word = megaConversion(word);
    word = word.replace(" ", "-");
    return word;
}

// Returns a string with the first letter of each word capitalized
function capitalize(word) {
    let allWords = word.split('-');
    let ret = "";
    for (let word of allWords) {
        ret += capitalizeWord(word) + " ";
    }
    return ret.substring(0, ret.length - 1);
}

// Converts a single word to a capitalized word
function capitalizeWord(word) {
    let wordBody = word.substring(1);
    return word[0].toUpperCase() + wordBody;
}

// Converts a word from normal mega syntax to pokeApi mega syntax and vice-versa
let megaConversion = word => {
    if (word.indexOf("mega") == -1) return word;

    // Don't skip Meganium
    if (word.indexOf("megan") != -1 || word == "mega") return word;

    if (word.indexOf("-") != -1) return megaFromKebab(word);

    return megaToKebab(word);
}

// Converts pokeApi kebab mega name to a normal readable mega name
let megaFromKebab = word => "mega-" + word.replace("-mega", "");

// Converts a normal readable mega name to a kebab pokeApi name
let megaToKebab = word => {
    word = word.replace("mega ", "");
    if (word.indexOf(" ") == -1) return word + "-mega";
    word = word.replace(" ", "-mega-");
    return word.replaceAll(" ", "-");
}

export { getPokemon, nameForDisplay };