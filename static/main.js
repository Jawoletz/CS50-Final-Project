
var shops = 0;

// Initial Costs
const initialTapeCost = 10;
const initialPrinterCost = 100;
const initialInkCost = 50;
const initialMarketCost = 1000;
const initialGuardCost = 500;
const initialSoapCost = 10;
const initialMachineCost = 100;
const initialDetergentCost = 50;
const initialLaundromatCost = 1000;
const initialAccountantCost = 600;
const initialPoliticalBribeCost = 500;

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
    multiplier: 1.2,
    rate: 1.2,
    cost: initialTapeCost
},
printer = {
    total: 0,
    production: 10,
    rate: 1.2,
    cost: initialPrinterCost
},
ink = {
    total: 0,
    multiplier: 1.5,
    rate: 1.2,
    cost: initialInkCost
},
market = {
    total: 0,
    production: 100,
    rate: 1.2,
    cost: initialMarketCost
},
guard = {
    total: 0,
    multiplier: 1.8,
    rate: 1.2,
    cost: initialGuardCost
},
launderAmount = {
    name: "launderAmount",
    increment: 1
},
soap = {
    total: 0,
    multiplier: 1.2,
    rate: 1.2,
    cost: initialSoapCost
},
machine = {
    total: 0,
    production: 10,
    rate: 1.2,
    cost: initialMachineCost
},
detergent = {
    total: 0,
    multiplier: 1.5,
    rate: 1.2,
    cost: initialDetergentCost
},
laundromat = {
    total: 0,
    production: 100,
    rate: 1.2,
    cost: initialLaundromatCost
},
accountant = {
    total: 0,
    multiplier: 1.8,
    rate: 1.2,
    cost: initialAccountantCost
},
politicalBribe = {
    total: 0,
    rate: 1.2,
    cost: initialPoliticalBribeCost,
},
relocateBonus = {
    total: 0,
    cost: 10000,
    manual: 1,
    auto: 1,
    dirtyLimit: 1
}

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
    document.getElementById("tapeCost").innerHTML = tape.cost;
    document.getElementById("printerCost").innerHTML = printer.cost;
    document.getElementById("inkCost").innerHTML = ink.cost;
    document.getElementById("marketCost").innerHTML = market.cost;
    document.getElementById("guardCost").innerHTML = guard.cost;
    //document.getElementById("sinkCost").innerHTML = sink.cost;
    document.getElementById("soapCost").innerHTML = soap.cost;
    document.getElementById("machineCost").innerHTML = machine.cost;
    document.getElementById("detergentCost").innerHTML = detergent.cost;
    document.getElementById("laundromatCost").innerHTML = laundromat.cost;
    document.getElementById("accountantCost").innerHTML = accountant.cost;
    document.getElementById("politicalBribeCost").innerHTML = "Cost: " + politicalBribe.cost;
    document.getElementById("relocateCost").innerHTML = "Cost: " + relocateBonus.cost;
    }

    function initializeEventListeners() {
    // Add event listeners
    document.getElementById("stealButton").addEventListener("click", function() {
        incomeDirty(stealAmount.increment * relocateBonus.manual * (1 + (tape.total * tape.multiplier)));
    });
    document.getElementById("buyTape").addEventListener("click", buyTape);
    document.getElementById("buyPrinter").addEventListener("click", buyPrinter);
    document.getElementById("buyInk").addEventListener("click", buyInk);
    document.getElementById("buyMarket").addEventListener("click", buyMarket);
    document.getElementById("buyGuard").addEventListener("click", buyGuard);
    //document.getElementById("sinkCost").addEventListener("click", );
    document.getElementById("launderButton").addEventListener("click", function() {
        launder(launderAmount.increment * relocateBonus.manual * (1 + (soap.total * soap.multiplier)));
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
    document.getElementById("dirtyIncomePerSec").innerHTML = prettify((relocateBonus.auto * ((printer.total * printer.production + (ink.total * ink.multiplier)) + (market.total * market.production + (guard.total * guard.multiplier)))));
}
// Updates clean money display
function updateClean() {
    document.getElementById("cleanCash").innerHTML = prettify(cleanCash.total);
    document.getElementById("cleanIncomePerSec").innerHTML = prettify(relocateBonus.auto * (1- tax.rate) * ((machine.total * machine.production + (detergent.total * detergent.multiplier)) + (laundromat.total * laundromat.production + (accountant.total * accountant.multiplier))));
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
    if (cleanCash.total >= tape.cost) {
        tape.total = tape.total + 1;
        cleanCash.total = cleanCash.total - tape.cost;
        document.getElementById("tapes").innerHTML = tape.total;
        updateClean();
        updateDirty();
        tape.cost = Math.floor(initialTapeCost * Math.pow(tape.rate, tape.total));
        document.getElementById("tapeCost").innerHTML = tape.cost;
    }
    
}

function buyPrinter() {
    if (cleanCash.total >= printer.cost){
        printer.total = printer.total + 1;
        cleanCash.total = cleanCash.total - printer.cost;
        document.getElementById("printers").innerHTML = printer.total;
        updateClean();
        updateDirty();
        printer.cost = Math.floor(initialPrinterCost * Math.pow(printer.rate, printer.total));
        document.getElementById("printerCost").innerHTML = printer.cost;
    }
}

function buyInk() {
    if (cleanCash.total >= ink.cost) {
        ink.total = ink.total + 1;
        cleanCash.total = cleanCash.total - ink.cost;
        document.getElementById("inks").innerHTML = ink.total;
        updateClean();
        updateDirty();
        ink.cost = Math.floor(initialInkCost * Math.pow(ink.rate, ink.total));
        document.getElementById("inkCost").innerHTML = ink.cost;
    }

}

function buyMarket() {
    if (cleanCash.total >= market.cost){
        market.total = market.total + 1;
        cleanCash.total = cleanCash.total - market.cost;
        document.getElementById("markets").innerHTML = market.total;
        updateClean();
        updateDirty();
        market.cost = Math.floor(initialMarketCost * Math.pow(market.rate,market.total));
        document.getElementById("marketCost").innerHTML = market.cost;
    }
    
}

function buyGuard() {
    if (cleanCash.total >= guard.cost) {
        guard.total = guard.total + 1;
        cleanCash.total = cleanCash.total - guard.cost;
        document.getElementById("guards").innerHTML = guard.total;
        updateClean();
        updateDirty();
        guard.cost = Math.floor(initialGuardCost * Math.pow(guard.rate, guard.total));
        document.getElementById("guardCost").innerHTML = guard.cost;
    }
}

function buySoap() {
    if (cleanCash.total >= soap.cost) {
        soap.total = soap.total + 1;
        cleanCash.total = cleanCash.total - soap.cost;
        document.getElementById("soaps").innerHTML = soap.total;
        updateClean();
        updateDirty();
        soap.cost = Math.floor(initialSoapCost * Math.pow(soap.rate, soap.total));
        document.getElementById("soapCost").innerHTML = soap.cost;
    }

}

function buyMachine() {
    if (cleanCash.total >= machine.cost){
        machine.total = machine.total + 1;
        cleanCash.total = cleanCash.total - machine.cost;
        document.getElementById("machines").innerHTML = machine.total;
        updateClean();
        updateDirty();
        machine.cost = Math.floor(initialMachineCost * Math.pow(machine.rate, machine.total));
        document.getElementById("machineCost").innerHTML = machine.cost;
    }

}

function buyDetergent() {
    if (cleanCash.total >= detergent.cost) {
        detergent.total = detergent.total + 1;
        cleanCash.total = cleanCash.total - detergent.cost;
        document.getElementById("detergents").innerHTML = detergent.total;
        updateClean();
        updateDirty();
        detergent.cost = Math.floor(initialDetergentCost * Math.pow(detergent.rate, detergent.total));
        document.getElementById("detergentCost").innerHTML = detergent.cost;
    }
}

function buyLaundromat() {
    if (cleanCash.total >= laundromat.cost){
        laundromat.total = laundromat.total + 1;
        cleanCash.total = cleanCash.total - laundromat.cost;
        document.getElementById("laundromats").innerHTML = laundromat.total;
        updateClean();
        updateDirty();
        laundromat.cost = Math.floor(initialLaundromatCost * Math.pow(laundromat.rate, laundromat.total));
        document.getElementById("laundromatCost").innerHTML = laundromat.cost;
    }
}

function buyAccountant() {
    if (cleanCash.total >= accountant.cost) {
        accountant.total = accountant.total + 1;
        cleanCash.total = cleanCash.total - accountant.cost;
        document.getElementById("accountants").innerHTML = accountant.total;
        updateClean();
        updateDirty();
        accountant.cost = Math.floor(initialAccountantCost * Math.pow(accountant.rate, accountant.total));
        document.getElementById("accountantCost").innerHTML = accountant.cost;
    }
}

// Temporarily reduces tax rate to 0% for an increasing price
function bribePolitician() {
    if (cleanCash.total > politicalBribe.cost) {
        politicalBribe.total = politicalBribe.total + 1;
        cleanCash.total = cleanCash.total - politicalBribe.cost;
        document.getElementById("politicalBribe").disabled = true;
        politicalBribe.cost = Math.floor(initialPoliticalBribeCost * Math.pow(politicalBribe.rate, politicalBribe.total));
        document.getElementById("politicalBribeCost").innerHTML = "Bribe: " + politicalBribe.cost;
        updateClean();
        updateDirty();
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
    }
}

function relocate() {
    if (cleanCash.total >= relocateBonus.cost) {
        // Adjust multipliers
        relocateBonus.total += 1;
        relocateBonus.cost *= 10;
        relocateBonus.manual *= 10;
        relocateBonus.auto *= 5;
        relocateBonus.dirtyLimit *= 10;
        dirtyLimit.total *= relocateBonus.dirtyLimit;

        resetProgress();

        // Update stats
        updateDirty();
        updateClean();
        updateTaxRate();
    }
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
    soap.total = 0;
    machine.total = 0;
    detergent.total = 0;
    laundromat.total = 0;
    accountant.total = 0;
    politicalBribe.total = 0;

    tape.cost = initialTapeCost;
    printer.cost = initialPrinterCost;
    ink.cost = initialInkCost; 
    market.cost = initialMarketCost;
    guard.cost = initialGuardCost;
    soap.cost = initialSoapCost;
    machine.cost = initialMachineCost;
    detergent.cost = initialDetergentCost;
    laundromat.cost = initialLaundromatCost;
    accountant.cost = initialAccountantCost;
    politicalBribe.cost = initialPoliticalBribeCost;

    tape
    printer
    ink
    market
    guard
    soap
    machine
    detergent
    laundromat
    accountant
    politicalBribe

    document.getElementById("riskLevel").innerHTML = "Risk: " + prettify(risk.total);
    updateProgressBar(document.getElementById("riskProgressBar"), risk.total);
    initializeDisplay();
}

// executes everything inside the curly braces once every 1000ms (1 second)
function startGeneralUpdate() {
    window.setInterval(generalUpdate, 1000)
}

function generalUpdate() {
    // Handles income per second of dirty and clean cash                           
    incomeDirty(relocateBonus.auto * ((printer.total * printer.production + (ink.total * ink.multiplier))) + (market.total * market.production + (guard.total * guard.multiplier)));
    launder(relocateBonus.auto * ((machine.total * machine.production + (detergent.total * detergent.multiplier))) + (laundromat.total * laundromat.production + (accountant.total * accountant.multiplier)));
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
            cleanCash.total = 0;
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
        soap: soap,
        machine: machine,
        detergent: detergent,
        laundromat: laundromat,
        accountant: accountant,
        politicalBribe: politicalBribe,
        relocateBonus: relocateBonus
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
    if (typeof savegame.relocateBonus !== "undefined") relocateBonus = savegame.relocateBonus;

    initializeDisplay();
    updateDirty();
    updateClean();
    updateTaxRate();
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