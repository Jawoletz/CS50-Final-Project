
var shops = 0;

// Initialize Data
var cleanCash = {
    name: "cleanCash",
    total: 0,
    increment: 1
},
dirtyCash = {
    name: "dirtyCash",
    total: 0,
    increment: 10
},
tax = {
    name: "tax",
    total: 0.2
},
dirtyLimit = {
    name: "limit",
    total: 1000
},
risk = {
    name: "risk",
    total: 0
},
stealAmount = {
    name: "stealAmount",
    increment: 1
},
printer = {
    total: 0,
    production: 10,
    rate: 1.23,
    require:{
        cleanCash:1000
    }
},
market = {
    total: 0,
    production: 500,
    rate: 1.23,
    require:{
        cleanCash:250000
    }
},
launderAmount = {
    name: "launderAmount",
    increment: 1
},
sink = {
    total: 0,
    production: 1,
    rate: 1.23,
    require:{
        cleanCash:100
    }
},
machine = {
    total: 0,
    production: 10,
    rate: 1.23,
    require:{
        cleanCash:1000
    }
},
laundromat = {
    total: 0,
    production: 200,
    rate: 1.23,
    require:{
        cleanCash:100000
    }
} 
// Initialize numbers and text
function initialize() {
    updateDirty();
    updateClean();
    // Quantities
    document.getElementById("printers").innerHTML = printer.total;
    document.getElementById("markets").innerHTML = market.total;
    document.getElementById("machines").innerHTML = machine.total;
    document.getElementById("laundromats").innerHTML = laundromat.total;

    // Costs
    document.getElementById("printerCost").innerHTML = printer.require.cleanCash;
    document.getElementById("marketCost").innerHTML = market.require.cleanCash;
    document.getElementById("sinkCost").innerHTML = sink.require.cleanCash;
    document.getElementById("machineCost").innerHTML = machine.require.cleanCash;
    document.getElementById("laundromatCost").innerHTML = laundromat.require.cleanCash;
}

// Updates dirty money display
function updateDirty() {
    document.getElementById("dirtyCash").innerHTML = prettify(dirtyCash.total) + " / " + dirtyLimit.total;
    document.getElementById("dirtyIncomePerSec").innerHTML = ((printer.total * printer.production) + (market.total * market.production))
}
// Updates clean money display
function updateClean() {
    document.getElementById("cleanCash").innerHTML = prettify(cleanCash.total);
    document.getElementById("cleanIncomePerSec").innerHTML = (machine.total * machine.production) + (laundromat.total * laundromat.production);
}
// Update risk progress bar
function updateProgressBar(progressBar, value) {
    const progressFill = progressBar.querySelector(".progress-fill");
    progressFill.style.width = `${value}%`;
}

// Converts dirtyCash to cleanCash minus taxes
function launder(amount) {
    if (dirtyCash.total >= amount) {
        dirtyCash.total = dirtyCash.total - amount;
        cleanCash.total = cleanCash.total + amount * (1 - tax.total);
        updateDirty();
        updateClean();
    }
}

// Adds to dirtyCash
function incomeDirty(amount) {
    dirtyCash.total = dirtyCash.total + amount;
    updateDirty();
}

function increaseDirtyIncome(amount) {
    dirtyCash.increment = dirtyCash.increment + amount; 
    document.getElementById("dirtyIncomePerSec").innerHTML = "$" + dirtyCash.increment;
}

function requestClean(amount) {
    cleanCash.total = cleanCash.total + amount;
    updateClean();
}

function requestDirty(amount) {
    dirtyCash.total = dirtyCash.total + amount;
    updateDirty();
}

function buyPrinter() {
    var printerCost = Math.floor(printer.require.cleanCash * Math.pow(printer.rate,printer.total));
    if (cleanCash.total >= printerCost){
        printer.total = printer.total + 1;
        cleanCash.total = cleanCash.total - printerCost;
        document.getElementById("printers").innerHTML = printer.total;
        updateClean();
    }
    var nextCost = Math.floor(printer.require.cleanCash * Math.pow(printer.rate,printer.total));
    document.getElementById("printerCost").innerHTML = nextCost;
}

function buyMarket() {
    var marketCost = Math.floor(market.require.cleanCash * Math.pow(market.rate,market.total));
    if (cleanCash.total >= marketCost){
        market.total = market.total + 1;
        cleanCash.total = cleanCash.total - marketCost;
        document.getElementById("markets").innerHTML = market.total;
        updateClean();
    }
    var nextCost = Math.floor(market.require.cleanCash * Math.pow(market.rate,market.total));
    document.getElementById("marketCost").innerHTML = nextCost;
}

/*
function buySink() {
    // var sinkCost = 
    var sinkCost = Math.floor(sink.require.cleanCash * Math.pow(sink.rate,sink.total));
    if (cleanCash.total >= sinkCost){
        sink.total = sink.total + 1;
        cleanCash.total = cleanCash.total - sinkCost;
        document.getElementById("sinks").innerHTML = sink.total;
        updateClean();
    }
    var nextCost = Math.floor(sink.require.cleanCash * Math.pow(sink.rate,sink.total));
    document.getElementById("sinkCost").innerHTML = nextCost;
}
*/

function buyMachine() {
    var machineCost = Math.floor(machine.require.cleanCash * Math.pow(machine.rate,machine.total));
    if (cleanCash.total >= machineCost){
        machine.total = machine.total + 1;
        cleanCash.total = cleanCash.total - machineCost;
        document.getElementById("machines").innerHTML = machine.total;
        updateClean();
    }
    var nextCost = Math.floor(machine.require.cleanCash * Math.pow(machine.rate,machine.total));
    document.getElementById("machineCost").innerHTML = nextCost;
}

function buyLaundromat() {
    var laundromatCost = Math.floor(laundromat.require.cleanCash * Math.pow(laundromat.rate,laundromat.total));
    if (cleanCash.total >= laundromatCost){
        laundromat.total = laundromat.total + 1;
        cleanCash.total = cleanCash.total - laundromatCost;
        document.getElementById("laundromats").innerHTML = laundromat.total;
        updateClean()
    }
    var nextCost = Math.floor(laundromat.require.cleanCash * Math.pow(laundromat.rate,laundromat.total));
    document.getElementById("laundromatCost").innerHTML = nextCost;
}

/*// adds one cursor to autoclick at an increasing cost
function buyShop() {
    var shopCost = Math.floor(10 * Math.pow(1.1,shops));    // works out the cost of this cursor (10 * 1.1^n) rounding down to avoid fractions
    if (cleanCash.total >= shopCost){                                 // check that the player can affors cursor
        shops = shops + 1;                                  // increases number of cursors
        cleanCash.total = cleanCash.total - shopCost;                         // removes cookies spent
        document.getElementById("shops").innerHTML = shops; // updates the number of cursors for the user
        document.getElementById("cleanCash").innerHTML = "Clean $: " + prettify(cleanCash.total); // updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,shops));      // works out the cost of next cursor (10 * 1.1^n) rounding down to avoid fractions
    document.getElementById("cursorCost").innerHTML = nextCost; // updates cursor cost for the user
}; */

// executes everything inside the curly braces once every 1000ms (1 second)
window.setInterval(function(){       
    // Handles income per second of dirty and clean cash                           
    incomeDirty((printer.total * printer.production) + (market.total * market.production));
    launder((machine.total * machine.production) + (laundromat.total * laundromat.production));
    //increaseDirtyIncome(2);

    // Change dirty cash to red when above limit
    if (dirtyCash.total > dirtyLimit.total) {
        document.getElementById("dirtyCash").style.color = "red";
        risk.total = (dirtyCash.total - dirtyLimit.total) / 10;
        document.getElementById("risk").innerHTML = "Risk: " + risk.total;
        updateProgressBar(document.getElementById("riskProgressBar"), risk.total);

        // Checks for raid
        x = Math.floor(Math.random() * 101);
        console.log(x);
        if (x < risk.total) {
            console.log("Raid!");
            dirtyCash.total = 0;
            risk.total = 0;
            document.getElementById("raid").style.visibility = "visible";
        }
    } else {
        document.getElementById("dirtyCash").style.color = "";
        risk.total = 0;
        document.getElementById("risk").innerHTML = "Risk: " + risk.total;
        updateProgressBar(document.getElementById("riskProgressBar"), risk.total);
        document.getElementById("raid").style.visibility = "hidden";
    }
}, 1000);

/*
window.setInterval(function(){
    increaseDirtyIncome(10);
}, 10000);
*/

// Save the game data locally
function save() {
    var save = {
        cookies: cookies,
        cursors: shops,
        prestige: prestige
    }
    localStorage.setItem("save",JSON.stringify(save));          // stringify converts object to string and stores locally
}

// Load the game from local storage
function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));    // parse converts string to JSON and loads from local storage
    if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
    if (typeof savegame.cursors !== "undefined") shops = savegame.cursors;
    if (typeof savegame.prestige !== "undefined") prestige = savegame.prestige;
}

function deleteSave() {
    localStorage.removeItem("Save");
}

// Rounds off rogue decimals
// example: document.getElementById('cookies').innerHTML = clean(cookies);
function prettify(input) {
    var output = Math.round(input * 1000000)/1000000;
    return output;
}