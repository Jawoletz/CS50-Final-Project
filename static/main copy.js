
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
    cost: 50,
    nextCost: 50
},
printer = {
    total: 0,
    production: 10,
    rate: 1.23,
    cost: 1000,
    nextCost: 1000
},
ink = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    cost: 500,
    nextCost: 500
},
market = {
    total: 0,
    production: 500,
    rate: 1.23,
    cost: 150000,
    nextCost: 150000
},
guard = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    cost: 50000,
    nextCost: 50000
},
launderAmount = {
    name: "launderAmount",
    increment: 1
},
sink = {
    total: 0,
    production: 1,
    rate: 1.23,
    cost: 100,
    nextCost: 0
},
soap = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    cost: 50,
    nextCost: 50
},
machine = {
    total: 0,
    production: 10,
    rate: 1.23,
    cost: 1000,
    nextCost: 1000
},
detergent = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    cost: 500,
    nextCost: 500
},
laundromat = {
    total: 0,
    production: 200,
    rate: 1.23,
    cost: 100000,
    nextCost: 100000
},
accountant = {
    total: 0,
    multiplier: 1.1,
    rate: 1.23,
    cost: 50000,
    nextCost: 50000
},
politicalBribe = {
    total: 0,
    rate: 1.23,
    cost: 500,
    nextCost: 500
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
    document.getElementById("tapeCost").innerHTML = tape.nextCost;
    document.getElementById("printerCost").innerHTML = printer.nextCost;
    document.getElementById("inkCost").innerHTML = ink.nextCost;
    document.getElementById("marketCost").innerHTML = market.nextCost;
    document.getElementById("guardCost").innerHTML = guard.nextCost;
    //document.getElementById("sinkCost").innerHTML = sink.nextCost;
    document.getElementById("soapCost").innerHTML = soap.nextCost;
    document.getElementById("machineCost").innerHTML = machine.nextCost;
    document.getElementById("detergentCost").innerHTML = detergent.nextCost;
    document.getElementById("laundromatCost").innerHTML = laundromat.nextCost;
    document.getElementById("accountantCost").innerHTML = accountant.nextCost;
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

    // LocalStorage EventListeners
    document.getElementById("createSave").addEventListener("click", save);
    document.getElementById("loadSave").addEventListener("click", load);
    document.getElementById("deleteSave").addEventListener("click", deleteSave);

    startGeneralUpdate();

    started = 0;
    document.getElementById("dirtyIncomePerSec").innerHTML = "0";
    document.getElementById("cleanIncomePerSec").innerHTML = "0";
}

// Updates dirty money display
function updateDirty() {
    document.getElementById("dirtyCash").innerHTML = prettify(dirtyCash.total) + " / " + dirtyLimit.total;
    document.getElementById("dirtyIncomePerSec").innerHTML = prettify((multiplier.auto * ((printer.total * printer.production * (1 + (ink.total * ink.multiplier))) + (market.total * market.production * (1 + (guard.total * guard.multiplier))))));
}
// Updates clean money display
function updateClean() {
    document.getElementById("cleanCash").innerHTML = prettify(cleanCash.total);
    document.getElementById("cleanIncomePerSec").innerHTML = prettify((multiplier.auto * (1 - tax.rate) * ((machine.total * machine.production * (1+ (detergent.total * detergent.multiplier))) + (laundromat.total * laundromat.production * (1+ (accountant.total * accountant.multiplier))))));
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
    tape.cost = Math.floor(tape.cost * Math.pow(tape.rate, tape.total));
    if (cleanCash.total >= tape.cost) {
        tape.total = tape.total + 1;
        cleanCash.total = cleanCash.total - tape.cost;
        document.getElementById("tapes").innerHTML = tape.total;
        updateClean();
        updateDirty();
    }
    tape.nextCost = Math.floor(tape.cost * Math.pow(tape.rate, tape.total));
    document.getElementById("tapeCost").innerHTML = tape.nextCost;
}

function buyPrinter() {
    printer.cost = Math.floor(printer.cost * Math.pow(printer.rate,printer.total));
    if (cleanCash.total >= printer.cost){
        printer.total = printer.total + 1;
        cleanCash.total = cleanCash.total - printer.cost;
        document.getElementById("printers").innerHTML = printer.total;
        updateClean();
        updateDirty();
    }
    printer.nextCost = Math.floor(printer.cost * Math.pow(printer.rate,printer.total));
    document.getElementById("printerCost").innerHTML = printer.nextCost;
}

function buyInk() {
    ink.cost = Math.floor(ink.cost * Math.pow(ink.rate, ink.total));
    if (cleanCash.total >= ink.cost) {
        ink.total = ink.total + 1;
        cleanCash.total = cleanCash.total - ink.cost;
        document.getElementById("inks").innerHTML = ink.total;
        updateClean();
        updateDirty();
    }
    ink.nextCost = Math.floor(ink.cost * Math.pow(ink.rate, ink.total));
    document.getElementById("inkCost").innerHTML = ink.nextCost;
}

function buyMarket() {
    market.cost = Math.floor(market.cost * Math.pow(market.rate,market.total));
    if (cleanCash.total >= market.cost){
        market.total = market.total + 1;
        cleanCash.total = cleanCash.total - market.cost;
        document.getElementById("markets").innerHTML = market.total;
        updateClean();
        updateDirty();
    }
    market.nextCost = Math.floor(market.cost * Math.pow(market.rate,market.total));
    document.getElementById("marketCost").innerHTML = market.nextCost;
}

function buyGuard() {
    guard.cost = Math.floor(guard.cost * Math.pow(guard.rate, guard.total));
    if (cleanCash.total >= guard.cost) {
        guard.total = guard.total + 1;
        cleanCash.total = cleanCash.total - guard.cost;
        document.getElementById("guards").innerHTML = guard.total;
        updateClean();
        updateDirty();
    }
    guard.nextCost = Math.floor(guard.cost * Math.pow(guard.rate, guard.total));
    document.getElementById("guardCost").innerHTML = gaurd.nextCost;
}

/*
function buySink() {
    // var sinkCost = 
    var sinkCost = Math.floor(sink.cost * Math.pow(sink.rate,sink.total));
    if (cleanCash.total >= sinkCost){
        sink.total = sink.total + 1;
        cleanCash.total = cleanCash.total - sinkCost;
        document.getElementById("sinks").innerHTML = sink.total;
        updateClean();
    }
    var nextCost = Math.floor(sink.cost * Math.pow(sink.rate,sink.total));
    document.getElementById("sinkCost").innerHTML = nextCost;
}
*/

function buySoap() {
    soap.cost = Math.floor(soap.cost * Math.pow(soap.rate, soap.total));
    if (cleanCash.total >= soap.cost) {
        soap.total = soap.total + 1;
        cleanCash.total = cleanCash.total - soap.cost;
        document.getElementById("soaps").innerHTML = soap.total;
        updateClean();
        updateDirty();
    }
    soap.nextCost = Math.floor(soap.cost * Math.pow(soap.rate, soap.total));
    document.getElementById("soapCost").innerHTML = soap.nextCost;
}

function buyMachine() {
    machine.cost = Math.floor(machine.cost * Math.pow(machine.rate,machine.total));
    if (cleanCash.total >= machine.cost){
        machine.total = machine.total + 1;
        cleanCash.total = cleanCash.total - machine.cost;
        document.getElementById("machines").innerHTML = machine.total;
        updateClean();
        updateDirty();
    }
    machine.nextCost = Math.floor(machine.cost * Math.pow(machine.rate,machine.total));
    document.getElementById("machineCost").innerHTML = machine.nextCost;
}

function buyDetergent() {
    detergent.cost = Math.floor(detergent.cost * Math.pow(detergent.rate, detergent.total));
    if (cleanCash.total >= detergent.cost) {
        detergent.total = detergent.total + 1;
        cleanCash.total = cleanCash.total - detergent.cost;
        document.getElementById("detergents").innerHTML = detergent.total;
        updateClean();
        updateDirty();
    }
    detergent.nextCost = Math.floor(detergent.cost * Math.pow(detergent.rate, detergent.total));
    document.getElementById("detergentCost").innerHTML = detergent.nextCost;
}

function buyLaundromat() {
    laundromat.cost = Math.floor(laundromat.cost * Math.pow(laundromat.rate,laundromat.total));
    if (cleanCash.total >= laundromat.cost){
        laundromat.total = laundromat.total + 1;
        cleanCash.total = cleanCash.total - laundromat.cost;
        document.getElementById("laundromats").innerHTML = laundromat.total;
        updateClean();
        updateDirty();
    }
    laundromat.nextCost = Math.floor(laundromat.cost * Math.pow(laundromat.rate,laundromat.total));
    document.getElementById("laundromatCost").innerHTML = laundromat.nextCost;
}

function buyAccountant() {
    accountant.cost = Math.floor(accountant.cost * Math.pow(accountant.rate, accountant.total));
    if (cleanCash.total >= accountant.cost) {
        accountant.total = accountant.total + 1;
        cleanCash.total = cleanCash.total - accountant.cost;
        document.getElementById("accountants").innerHTML = accountant.total;
        updateClean();
        updateDirty();
    }
    accountant.nextCost = Math.floor(accountant.cost * Math.pow(accountant.rate, accountant.total));
    document.getElementById("accountantCost").innerHTML = accountant.nextCost;
}

// Temporarily reduces tax rate to 0% for an increasing price
function bribePolitician() {
    politicalBribe.cost = Math.floor(politicalBribe.cost * Math.pow(politicalBribe.rate, politicalBribe.total));
    if (cleanCash.total > politicalBribe.cost) {
        politicalBribe.total = politicalBribe.total + 1;
        cleanCash.total = cleanCash.total - politicalBribe.cost;
        document.getElementById("politicalBribe").disabled = true;
        politicalBribe.nextCost = Math.floor(politicalBribe.cost * Math.pow(politicalBribe.rate, politicalBribe.total));
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
                document.getElementById("politicalBribe").disabled = false;
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
    initializeDisplay();
}

/*
function bribePolice() {
    var bribePoliceCost = Math.floor(policeBribe.cost * Math.pow(policeBribe.rate, policeBribe.total));
    if (cleanCash.total > policeBribe.cost) {
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

/* CLICKS PER SECOND
var started, resetTimeoutHandle, resetTimeout = 1000,
    container = document.getElementById('container'),
    counter = document.getElementById('counter'),
    zone = document.getElementById('zone'),
    clicks = 0;

zone.onseclect = zone.onselectstart = function () {
    return false;
};

function clicksPerSecond(started, clicks) {
    return Math.round(clicks / ((new Date()) - started) * 1000);
}

function count() {
    clearTimeout(resetTimeoutHandle);
    clicks++;
    counter.innerText = clicksPerSecond(started, clicks);
    resetTimeoutHandle = setTimeout(reset, resetTimeout);
    return false;
}

function start() {
    started = new Date();
    clicks = 0;
    counter.style.opacity = 1;
    this.onmousedown = count;
    this.onmousedown();
    return false;
}

function reset() {
    zone.onmousedown = start;
    counter.style.opacity = 0.3;
}

reset();
*/






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

// Save the game data locally
function save() {
    var save = {
        cleanCash: cleanCash,
        dirtyCash: dirtyCash,
        tax: tax,
        dirtyLimit: dirtyLimit,
        risk: risk,
        stealAmount: stealAmount,
        tape: tape,
        printer: printer,
        ink: ink,
        market: market,
        guard: guard,
        launderAmount: launderAmount,
        sink: sink,
        soap: soap,
        machine: machine,
        detergent: detergent,
        laundromat: laundromat,
        accountant: accountant,
        politicalBribe: politicalBribe,
        multiplier: multiplier
        
        //cookies: cookies,
        //cursors: shops,
        //prestige: prestige
    }
    localStorage.setItem("save",JSON.stringify(save));          // stringify converts object to string and stores locally
}

// Load the game from local storage
function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));    // parse converts string to JSON and loads from local storage
    //if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
    if (typeof savegame.cleanCash !== "undefined") cleanCash = savegame.cleanCash;
    if (typeof savegame.dirtyCash !== "undefined") dirtyCash = savegame.dirtyCash;
    if (typeof savegame.tax !== "undefined") tax = savegame.tax;
    if (typeof savegame.dirtyLimit !== "undefined") dirtyLimit = savegame.dirtyLimit;
    if (typeof savegame.risk !== "undefined") risk = savegame.risk;
    if (typeof savegame.stealAmount !== "undefined") stealAmount = savegame.stealAmount;
    if (typeof savegame.tape !== "undefined") tape = savegame.tape;
    if (typeof savegame.printer !== "undefined") printer = savegame.printer;
    if (typeof savegame.ink !== "undefined") ink = savegame.ink;
    if (typeof savegame.market !== "undefined") market = savegame.market;
    if (typeof savegame.guard !== "undefined") guard = savegame.guard;
    if (typeof savegame.launderAmount !== "undefined") launderAmount = savegame.launderAmount;
    if (typeof savegame.sink !== "undefined") sink = savegame.sink;
    if (typeof savegame.soap !== "undefined") soap = savegame.soap;
    if (typeof savegame.machine !== "undefined") machine = savegame.machine;
    if (typeof savegame.detergent !== "undefined") detergent = savegame.detergent;
    if (typeof savegame.laundromat !== "undefined") laundromat = savegame.laundromat;
    if (typeof savegame.accountant !== "undefined") accountant = savegame.accountant;
    if (typeof savegame.politicalBribe !== "undefined") politicalBribe = savegame.politicalBribe;
    if (typeof savegame.multiplier !== "undefined") multiplier = savegame.multiplier;

    initializeDisplay();
}

function deleteSave() {
    localStorage.removeItem("save");
}

// Rounds off rogue decimals
// example: document.getElementById('cookies').innerHTML = clean(cookies);
function prettify(input) {
    var output = Math.round(input * 1000000)/1000000;
    return output;
}