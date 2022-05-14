
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
    rate: 0.2
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
tape = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    require:{
        cleanCash:50
    }
},
printer = {
    total: 0,
    production: 10,
    rate: 1.23,
    require:{
        cleanCash:1000
    }
},
ink = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    require:{
        cleanCash:500
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
guard = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    require:{
        cleanCash:50000
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
soap = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    require:{
        cleanCash: 50
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
detergent = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    require:{
        cleanCash:500
    }
},
laundromat = {
    total: 0,
    production: 200,
    rate: 1.23,
    require:{
        cleanCash:100000
    }
},
accountant = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    require:{
        cleanCash:50000
    }
},
politicalBribe = {
    total: 0,
    rate: 1.23,
    require:{
        cleanCash:500
    }
},
multiplier = {
    total: 0,
    manual: 1,
    auto: 1,
    dirtyLimit: 1
}

/*
policeBribe = {
    total: 0,
    rate: 1.23,
    require:{
        cleanCash:500
    }
}*/

// Initialize numbers and text
function initializeDisplay() {
    updateDirty();
    updateClean();
    updateTaxRate();

    // Quantities
    document.getElementById("tapes").innerHTML = tape.total;
    document.getElementById("printers").innerHTML = printer.total;
    document.getElementById("inks").innerHTML = ink.total;
    document.getElementById("markets").innerHTML = market.total;
    document.getElementById("guards").innerHTML = guard.total;
    document.getElementById("soaps").innerHTML = soap.total;
    document.getElementById("machines").innerHTML = machine.total;
    document.getElementById("detergents").innerHTML = detergent.total;
    document.getElementById("laundromats").innerHTML = laundromat.total;
    document.getElementById("accountants").innerHTML = accountant.total;

    // Costs
    document.getElementById("tapeCost").innerHTML = tape.require.cleanCash;
    document.getElementById("printerCost").innerHTML = printer.require.cleanCash;
    document.getElementById("inkCost").innerHTML = ink.require.cleanCash;
    document.getElementById("marketCost").innerHTML = market.require.cleanCash;
    document.getElementById("guardCost").innerHTML = guard.require.cleanCash;
    //document.getElementById("sinkCost").innerHTML = sink.require.cleanCash;
    document.getElementById("soapCost").innerHTML = soap.require.cleanCash;
    document.getElementById("machineCost").innerHTML = machine.require.cleanCash;
    document.getElementById("detergentCost").innerHTML = detergent.require.cleanCash;
    document.getElementById("laundromatCost").innerHTML = laundromat.require.cleanCash;
    document.getElementById("accountantCost").innerHTML = accountant.require.cleanCash;
    }

    function initializeEventListeners() {
    // Add event listeners
    document.getElementById("stealButton").addEventListener("click", function() {
        incomeDirty(stealAmount.increment * multiplier.manual * (1 + (tape.total * tape.multiplier)));
    });
    document.getElementById("buyTape").addEventListener("click", buyTape);
    document.getElementById("buyPrinter").addEventListener("click", buyPrinter);
    document.getElementById("buyInk").addEventListener("click", buyInk);
    document.getElementById("buyMarket").addEventListener("click", buyMarket);
    document.getElementById("buyGuard").addEventListener("click", buyGuard);
    //document.getElementById("sinkCost").addEventListener("click", );
    document.getElementById("launderButton").addEventListener("click", function() {
        launder(launderAmount.increment * multiplier.manual * (1 + (soap.total * soap.multiplier)));
    });
    document.getElementById("buySoap").addEventListener("click", buySoap);
    document.getElementById("buyMachine").addEventListener("click", buyMachine);
    document.getElementById("buyDetergent").addEventListener("click", buyDetergent);
    document.getElementById("buyLaundromat").addEventListener("click", buyLaundromat);
    document.getElementById("buyAccountant").addEventListener("click", buyAccountant);

    document.getElementById("politicalBribe").addEventListener("click", bribePolitician);
    //document.getElementById("policeBribe").addEventListener("click", bribePolice);

    document.getElementById("relocate").addEventListener("click", relocate);

    startGeneralUpdate();
}

// Updates dirty money display
function updateDirty() {
    document.getElementById("dirtyCash").innerHTML = prettify(dirtyCash.total) + " / " + dirtyLimit.total;
    document.getElementById("dirtyIncomePerSec").innerHTML = prettify(multiplier.auto * ((printer.total * printer.production * (1 + (ink.total * ink.multiplier))) + (market.total * market.production * (1 + (guard.total * guard.multiplier)))));
}
// Updates clean money display
function updateClean() {
    document.getElementById("cleanCash").innerHTML = prettify(cleanCash.total);
    document.getElementById("cleanIncomePerSec").innerHTML = prettify(multiplier.auto * (1 - tax.rate) * ((machine.total * machine.production * (1+ (detergent.total * detergent.multiplier))) + (laundromat.total * laundromat.production * (1+ (accountant.total * accountant.multiplier)))));
}

// updates tax rate display
function updateTaxRate() {
    document.getElementById("taxRate").innerHTML = "Tax: " + prettify(tax.rate * 100) + "%";
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
        cleanCash.total = cleanCash.total + amount * (1 - tax.rate);
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

function buyTape() {
    var tapeCost = Math.floor(tape.require.cleanCash * Math.pow(tape.rate, tape.total));
    if (cleanCash.total >= tapeCost) {
        tape.total = tape.total + 1;
        cleanCash.total = cleanCash.total - tapeCost;
        document.getElementById("tapes").innerHTML = tape.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(tape.require.cleanCash * Math.pow(tape.rate, tape.total));
    document.getElementById("tapeCost").innerHTML = nextCost;
}

function buyPrinter() {
    var printerCost = Math.floor(printer.require.cleanCash * Math.pow(printer.rate,printer.total));
    if (cleanCash.total >= printerCost){
        printer.total = printer.total + 1;
        cleanCash.total = cleanCash.total - printerCost;
        document.getElementById("printers").innerHTML = printer.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(printer.require.cleanCash * Math.pow(printer.rate,printer.total));
    document.getElementById("printerCost").innerHTML = nextCost;
}

function buyInk() {
    var inkCost = Math.floor(ink.require.cleanCash * Math.pow(ink.rate, ink.total));
    if (cleanCash.total >= inkCost) {
        ink.total = ink.total + 1;
        cleanCash.total = cleanCash.total - inkCost;
        document.getElementById("inks").innerHTML = ink.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(ink.require.cleanCash * Math.pow(ink.rate, ink.total));
    document.getElementById("inkCost").innerHTML = nextCost;
}

function buyMarket() {
    var marketCost = Math.floor(market.require.cleanCash * Math.pow(market.rate,market.total));
    if (cleanCash.total >= marketCost){
        market.total = market.total + 1;
        cleanCash.total = cleanCash.total - marketCost;
        document.getElementById("markets").innerHTML = market.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(market.require.cleanCash * Math.pow(market.rate,market.total));
    document.getElementById("marketCost").innerHTML = nextCost;
}

function buyGuard() {
    var guardCost = Math.floor(guard.require.cleanCash * Math.pow(guard.rate, guard.total));
    if (cleanCash.total >= guardCost) {
        guard.total = guard.total + 1;
        cleanCash.total = cleanCash.total - guardCost;
        document.getElementById("guards").innerHTML = guard.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(guard.require.cleanCash * Math.pow(guard.rate, guard.total));
    document.getElementById("guardCost").innerHTML = nextCost;
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

function buySoap() {
    var soapCost = Math.floor(soap.require.cleanCash * Math.pow(soap.rate, soap.total));
    if (cleanCash.total >= soapCost) {
        soap.total = soap.total + 1;
        cleanCash.total = cleanCash.total - soapCost;
        document.getElementById("soaps").innerHTML = soap.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(soap.require.cleanCash * Math.pow(soap.rate, soap.total));
    document.getElementById("soapCost").innerHTML = nextCost;
}

function buyMachine() {
    var machineCost = Math.floor(machine.require.cleanCash * Math.pow(machine.rate,machine.total));
    if (cleanCash.total >= machineCost){
        machine.total = machine.total + 1;
        cleanCash.total = cleanCash.total - machineCost;
        document.getElementById("machines").innerHTML = machine.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(machine.require.cleanCash * Math.pow(machine.rate,machine.total));
    document.getElementById("machineCost").innerHTML = nextCost;
}

function buyDetergent() {
    var detergentCost = Math.floor(detergent.require.cleanCash * Math.pow(detergent.rate, detergent.total));
    if (cleanCash.total >= detergentCost) {
        detergent.total = detergent.total + 1;
        cleanCash.total = cleanCash.total - detergentCost;
        document.getElementById("detergents").innerHTML = detergent.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(detergent.require.cleanCash * Math.pow(detergent.rate, detergent.total));
    document.getElementById("detergentCost").innerHTML = nextCost;
}

function buyLaundromat() {
    var laundromatCost = Math.floor(laundromat.require.cleanCash * Math.pow(laundromat.rate,laundromat.total));
    if (cleanCash.total >= laundromatCost){
        laundromat.total = laundromat.total + 1;
        cleanCash.total = cleanCash.total - laundromatCost;
        document.getElementById("laundromats").innerHTML = laundromat.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(laundromat.require.cleanCash * Math.pow(laundromat.rate,laundromat.total));
    document.getElementById("laundromatCost").innerHTML = nextCost;
}

function buyAccountant() {
    var accountantCost = Math.floor(accountant.require.cleanCash * Math.pow(accountant.rate, accountant.total));
    if (cleanCash.total >= accountantCost) {
        accountant.total = accountant.total + 1;
        cleanCash.total = cleanCash.total - accountantCost;
        document.getElementById("accountants").innerHTML = accountant.total;
        updateClean();
        updateDirty();
    }
    var nextCost = Math.floor(accountant.require.cleanCash * Math.pow(accountant.rate, accountant.total));
    document.getElementById("accountantCost").innerHTML = nextCost;
}

// Temporarily reduces tax rate to 0% for an increasing price
function bribePolitician() {
    var bribePoliticianCost = Math.floor(politicalBribe.require.cleanCash * Math.pow(politicalBribe.rate, politicalBribe.total));
    if (cleanCash.total > politicalBribe.require.cleanCash) {
        politicalBribe.total = politicalBribe.total + 1;
        cleanCash.total = cleanCash.total - bribePoliticianCost;
        tax.rate = 0;
        updateTaxRate();
            bribeCount = 5;
        var bribeTimer = setInterval(function() {
            document.getElementById("bribeTimer").innerHTML = bribeCount;
            document.getElementById("bribeTimer").style.display = "initial";
            bribeCount -= 1;
            if (bribeCount <= -1) {
                tax.rate = 0.2;
                updateTaxRate();
                document.getElementById("bribeTimer").style.display = "none";
                clearInterval(bribeTimer);
            }
        }, 1000)
        /*
        setTimeout(function() {
           tax.rate = 0.2
           updateTaxRate(); 
        }, 5000)*/
    }
}

function relocate() {
    // Adjust multipliers
    multiplier.total += 1;
    multiplier.manual *= 10;
    multiplier.auto *= 5;
    multiplier.dirtyLimit *= 10;
    dirtyLimit.total *= multiplier.dirtyLimit;

    resetProgress();

    // Update stats
    updateDirty();
    updateClean();
    updateTaxRate();
}

function resetProgress() {
    cleanCash.total = 0;
    dirtyCash.total = 0;
    tax.rate = 0.2;
    risk.total = 0;
    tape.total = 0;
    printer.total = 0;
    ink.total = 0;
    market.total = 0;
    guard.total = 0;
    sink.total = 0;
    soap.total = 0;
    machine.total = 0;
    detergent.total = 0;
    laundromat.total = 0;
    accountant.total = 0;

    document.getElementById("riskLevel").innerHTML = "Risk: " + prettify(risk.total);
    updateProgressBar(document.getElementById("riskProgressBar"), risk.total);
}

/*
function bribePolice() {
    var bribePoliceCost = Math.floor(policeBribe.require.cleanCash * Math.pow(policeBribe.rate, policeBribe.total));
    if (cleanCash.total > policeBribe.require.cleanCash) {
        policeBribe.total = policeBribe.total + 1;
        cleanCash.total = cleanCash.total - bribePoliceCost;
        setTimeout(function() {
            
        }, 5000)
    }
}*/

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
function startGeneralUpdate() {
    window.setInterval(generalUpdate, 1000)
}
function generalUpdate() {
    // Handles income per second of dirty and clean cash                           
    incomeDirty(multiplier.auto * ((printer.total * printer.production * (1 + (ink.total * ink.multiplier))) + (market.total * market.production * (1 + (guard.total * guard.multiplier)))));
    launder(multiplier.auto * ((machine.total * machine.production * (1 + (detergent.total * detergent.multiplier))) + (laundromat.total * laundromat.production * (1 + (accountant.total * accountant.multiplier)))));
    //increaseDirtyIncome(2);

    // Change dirty cash to red when above limit
    if (dirtyCash.total > dirtyLimit.total) {
        document.getElementById("dirtyCash").style.color = "red";
        risk.total = (dirtyCash.total - dirtyLimit.total) / 10;
        document.getElementById("riskLevel").innerHTML = "Risk: " + prettify(risk.total);
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
        document.getElementById("riskLevel").innerHTML = "Risk: " + prettify(risk.total);
        updateProgressBar(document.getElementById("riskProgressBar"), risk.total);
        document.getElementById("raid").style.visibility = "hidden";
    }
}

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