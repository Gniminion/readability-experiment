// Declare the words array using const to ensure it is block-scoped
const words = [
    "leaflet", "exercise", "witness", "execute", "output", "deprivation", "sniff", "sell", "launch", "software",
    "reptile", "cupboard", "main", "needle", "us", "sheep", "maximum", "lose", "winner", "prejudice",
    "tolerate", "dull", "narrow", "museum", "admission", "scrap", "degree", "suit", "notion", "fool",
    "correspondence", "franchise", "distant", "civilian", "tongue", "dribble", "decisive", "incident", "blast", "lighter",
    "ratio", "artificial", "bishop", "lay", "peasant", "queue", "track", "consideration", "progress", "nationalist"
];

// Correct the object syntax for styles
const styles = [
    { font: "fontC", color: "colorD", name: "Cursive + Dark" },
    { font: "fontC", color: "colorL", name: "Cursive + Light" },
    { font: "fontS", color: "colorD", name: "SerifSans + Dark" },
    { font: "fontS", color: "colorL", name: "SerifSans + Light" },
    { font: "fontM", color: "colorD", name: "Monospace + Dark" },
    { font: "fontM", color: "colorL", name: "Monospace + Light" }
];

// Declare variables with let to ensure they are block-scoped
let treatments = [];
let i = 0;
let time = 0;
let results = [];

// Correct the function declaration syntax
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Correct the function declaration syntax
function start() {
    treatments = shuffle([...styles]); 
    setPassage();
}

// Correct the function declaration syntax and sanitize innerHTML
function setPassage() {
    let passage = document.getElementById("text");
    if (treatments[i]) {
        let { font, color } = treatments[i];
        passage.className = "passage " + font + " " + color;
        passage.textContent = shuffle(words.slice()).join(" "); // Use textContent to prevent XSS
        document.getElementById("progress").innerText = "Progress: " + (i + 1) + "/6";
    }
}

// Correct the function declaration syntax
function startRead() {
    time = Date.now();
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
}

// Correct the function declaration syntax
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

// Correct the function declaration syntax and logic
function nextTreat() {
    if (i < treatments.length - 1) { // Correct logic to include the last treatment
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

// Correct the function declaration syntax and add input validation
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

// Correct the function declaration syntax and add input validation
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

// Correct the function declaration syntax and add logging
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
    console.log("Results displayed successfully."); // Add logging for successful display
}

// Initialize the experiment
resetExperiment();