let words = [
    "leaflet", "exercise", "witness", "execute", "output", "deprivation", "sniff", "sell", "launch", "software",
    "reptile", "cupboard", "main", "needle", "us", "sheep", "maximum", "lose", "winner", "prejudice",
    "tolerate", "dull", "narrow", "museum", "admission", "scrap", "degree", "suit", "notion", "fool",
    "correspondence", "franchise", "distant", "civilian", "tongue", "dribble", "decisive", "incident", "blast", "lighter",
    "ratio", "artificial", "bishop", "lay", "peasant", "queue", "track", "consideration", "progress", "nationalist"
];

let styles = [
    { font: "fontC", color: "colorD", name: "Cursive + Dark" },
    { font: "fontC", color: "colorL", name: "Cursive + Light" },
    { font: "fontS", color: "colorD", name: "SerifSans + Dark" },
    { font: "fontS", color: "colorL", name: "SerifSans + Light" },
    { font: "fontM", color: "colorD", name: "Monospace + Dark" },
    { font: "fontM", color: "colorL", name: "Monospace + Light" }
];

let treatments = [];
let i = 0;
let time = 0;
let results = [];

// Corrected function declaration and removed invalid characters
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function start() {
    treatments = shuffle([...styles]);
    setPassage();
}

function setPassage() {
    let passage = document.getElementById("text");
    if (treatments[i]) {
        let { font, color } = treatments[i];
        passage.className = "passage " + font + " " + color;
        // Sanitize words before setting innerHTML
        passage.innerHTML = shuffle(words.slice()).map(word => escapeHTML(word)).join(" ");
    }
    document.getElementById("progress").innerText = "Progress: " + (i + 1) + "/6";
}

function startRead() {
    time = Date.now();
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
}

function stopRead() {
    if (time === 0) return;
    let readTime = ((Date.now() - time) / 1000);
    if (treatments[i]) {
        results[i] = { treatment: treatments[i].name, time: readTime };
    }
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("nextBtn").disabled = false;
    console.log("time logged:", results[i]);
}

function nextTreat() {
    if (i < treatments.length - 1) {
        i++;
        setPassage();
        time = 0;
        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("nextBtn").disabled = true;
    } else {
        showResult();
    }
}

function resetTreat() {
    let reset = confirm("Are you sure you want to reset this treatment? Your previous time will be lost. \n ONLY DO THIS IF THERE IS A GOOD REASON e.g. had a distractor mid reading that made you stop reading for a while. DO NOT RESET FOR REASONS LIKE 'I felt like I read it too slow', it's okay I promise!!");
    if (reset) {
        results[i] = undefined;
        time = 0;
        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("nextBtn").disabled = true;
    }
}

function resetExperiment() {
    let reset = confirm("Are you sure you want to reset the entire experiment? \nALL PROGRESS WILL BE LOST and you'll have to read from beginning again.");
    if (reset) {
        i = 0;
        results = [];
        time = 0;
        treatments = shuffle([...styles]);
        document.getElementById("results").style.display = "none";
        document.getElementById("timeList").innerHTML = "";
        setPassage();
        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("nextBtn").disabled = true;
    }
}

function showResult() {
    let resDiv = document.getElementById("results");
    let list = document.getElementById("timeList");

    list.innerHTML = "";
    results.forEach(({ treatment, time }) => {
        let li = document.createElement("li");
        li.innerText = treatment + ": " + time + " seconds";
        list.appendChild(li);
    });

    resDiv.style.display = "block";
    // Log the results for debugging purposes
    console.log("Results displayed:", results);
}

// Helper function to escape HTML to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

resetExperiment();