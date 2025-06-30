const inputField = document.getElementById("password");
const outputField = document.getElementById("result");
const strengthBar = document.getElementById("strength-bar-fill");
const togglePassword = document.getElementById("togglePassword");
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

const reqLength = document.getElementById("req-length");
const reqUpper = document.getElementById("req-upper");
const reqLower = document.getElementById("req-lower");
const reqNumber = document.getElementById("req-number");
const reqSpecial = document.getElementById("req-special");

function updateArrow(reqItem, met) {
    const arrow = reqItem.querySelector('.arrow');
    if (met) {
        reqItem.classList.add('met');
        arrow.textContent = '\u2190'; // Unicode left arrow
    } else {
        reqItem.classList.remove('met');
        arrow.textContent = '';
    }
}

function checkStrength(password) {
    let score = 0;
    // Criteria
    const lengthOK = password.length >= 8;
    const upperOK = /[A-Z]/.test(password);
    const lowerOK = /[a-z]/.test(password);
    const numberOK = /[0-9]/.test(password);
    const specialOK = /[^A-Za-z0-9]/.test(password);

    // Update requirements UI and arrows
    updateArrow(reqLength, lengthOK);
    updateArrow(reqUpper, upperOK);
    updateArrow(reqLower, lowerOK);
    updateArrow(reqNumber, numberOK);
    updateArrow(reqSpecial, specialOK);

    score += lengthOK ? 1 : 0;
    score += upperOK ? 1 : 0;
    score += lowerOK ? 1 : 0;
    score += numberOK ? 1 : 0;
    score += specialOK ? 1 : 0;

    return score;
}

function getStrengthLabel(score) {
    switch(score) {
        case 0:
        case 1:
            return {text: "Very Weak", color: "#ff4e50", width: "20%"};
        case 2:
            return {text: "Weak", color: "#f9d423", width: "40%"};
        case 3:
            return {text: "Medium", color: "#f9d423", width: "60%"};
        case 4:
            return {text: "Strong", color: "#2ecc40", width: "80%"};
        case 5:
            return {text: "Very Strong", color: "#6c63ff", width: "100%"};
        default:
            return {text: "", color: "#eee", width: "0%"};
    }
}

inputField.addEventListener("input", () => {
    const password = inputField.value;
    if(password !== ""){
        const score = checkStrength(password);
        const {text, color, width} = getStrengthLabel(score);
        outputField.textContent = text;
        outputField.style.color = color;
        strengthBar.style.width = width;
        strengthBar.style.background = color;
    } else {
        outputField.textContent = "";
        strengthBar.style.width = "0%";
        [reqLength, reqUpper, reqLower, reqNumber, reqSpecial].forEach(el => {
            el.classList.remove("met");
            const arrow = el.querySelector('.arrow');
            if (arrow) arrow.textContent = '';
        });
    }
});

togglePassword.addEventListener("click", () => {
    const type = inputField.getAttribute("type") === "password" ? "text" : "password";
    inputField.setAttribute("type", type);
    if(type === "password") {
        eyeOpen.style.display = '';
        eyeClosed.style.display = 'none';
    } else {
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = '';
    }
});

// Hide all arrows initially
[reqLength, reqUpper, reqLower, reqNumber, reqSpecial].forEach(el => {
    const arrow = el.querySelector('.arrow');
    if (arrow) arrow.textContent = '';
});