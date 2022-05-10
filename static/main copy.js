var cookies = 0;
var cursors = 0;

// adds one to count
function cookieClick(number) {
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies;
};

// adds one cursor to autoclick at an increasing cost
function buyCursor() {
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));    // works out the cost of this cursor (10 * 1.1^n) rounding down to avoid fractions
    if (cookies >= cursorCost){                                 // check that the player can affors cursor
        cursors = cursors + 1;                                  // increases number of cursors
        cookies = cookies - cursorCost;                         // removes cookies spent
        document.getElementById("cursors").innerHTML = cursors; // updates the number of cursors for the user
        document.getElementById("cookies").innerHTML = cookies; // updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));      // works out the cost of next cursor (10 * 1.1^n) rounding down to avoid fractions
    document.getElementById("cursorCost").innerHTML = nextCost; // updates cursor cost for the user
};

window.setInterval(function(){                                  // executes everything inside the curly braces once every 1000ms (1 second)
    cookieClick(cursors);
}, 1000);

// Save the game data locally
function save() {
    var save = {
        cookies: cookies,
        cursors: cursors,
        prestige: prestige
    }
    localStorage.setItem("save",JSON.stringify(save));          // stringify converts object to string and stores locally
}

// Load the game from local storage
function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));    // parse converts string to JSON and loads from local storage
    if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
    if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
    if (typeof savegame.prestige !== "undefined") prestige = savegame.prestige;
}

function deleteSave() {
    localStorage.removeItem("Save");
}

// Rounds off rogue decimals
// example: document.getElementById('cookies').innerHTML = clean(cookies);
function clean(input) {
    var output = Math.round(input * 1000000)/1000000;
    return output;
}