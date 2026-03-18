const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error" || display.value === "NaN") {
        display.value = "";
    }
    display.value += value;
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
    display.value = "";
}

function calculateResult() {
    try {
        if (display.value.trim() === "") return;
        // Basic sanitization before eval
        const result = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
        display.value = Number.isFinite(result) ? result : "Error";
    } catch {
        display.value = "Error";
    }
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (/[0-9]/.test(key)) appendValue(key);
    if (key === "+") appendValue("+");
    if (key === "-") appendValue("-");
    if (key === "*") appendValue("*");
    if (key === "/") appendValue("/");
    if (key === ".") appendValue(".");
    if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculateResult();
    }
    if (key === "Backspace") deleteLast();
    if (key === "Escape") clearDisplay();
});