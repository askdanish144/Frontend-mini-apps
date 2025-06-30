const qrinput = document.getElementById("qr-input"); 
const qrbutton = document.getElementById("qr-button");
const qrimg = document.getElementById("qr-img");   
const removeBtn = document.getElementById("remove-qr-button");
const errorMsg = document.getElementById("input-error-msg");
const container = document.querySelector('.container');

// Helper: Set button loading state
function setButtonLoading(isLoading) {
    if (isLoading) {
        qrbutton.disabled = true;
        qrbutton.innerHTML = '<span class="spinner"></span>Generating...';
    } else {
        qrbutton.innerHTML = 'Click Here To Generate QR Code';
    }
}

// Helper: Card focus shadow
function updateContainerFocus() {
    if (document.activeElement === qrinput || document.activeElement === qrbutton) {
        container.classList.add('focused');
    } else {
        container.classList.remove('focused');
    }
}

qrinput.addEventListener("input", () => {
    if (qrinput.classList.contains("input-error") && qrinput.value.trim().length > 0) {
        qrinput.classList.remove("input-error");
        errorMsg.textContent = "";
        errorMsg.style.display = "none";
        errorMsg.classList.remove("error-msg-visible");
    }
});

qrinput.addEventListener("focus", updateContainerFocus);
qrinput.addEventListener("blur", updateContainerFocus);
qrbutton.addEventListener("focus", updateContainerFocus);
qrbutton.addEventListener("blur", updateContainerFocus);

qrbutton.addEventListener("click", () => {
    if(qrinput.value.trim() === ""){
        qrinput.classList.add("input-error");
        errorMsg.textContent = "This field shouldn't be empty";
        errorMsg.style.display = "block";
        errorMsg.classList.add("error-msg-visible");
        qrinput.focus();
        return;
    } else {
        setButtonLoading(true);
        // Using 'goqr.me' API...
        qrimg.onload = () => {
            setButtonLoading(false);
            qrimg.onload = null; // Remove handler after load
        };
        qrimg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrinput.value}`
        qrimg.alt = `QR Code for ${qrinput.value}`
        removeBtn.style.display = "block";
        errorMsg.textContent = "";
        errorMsg.style.display = "none";
        errorMsg.classList.remove("error-msg-visible");
    }
})

qrinput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        qrbutton.click();
        return;
    }
    // Only clear error if user is typing a non-Enter key
    if (qrinput.classList.contains("input-error") && qrinput.value.length > 0) {
        qrinput.classList.remove("input-error");
        errorMsg.textContent = "";
        errorMsg.style.display = "none";
        errorMsg.classList.remove("error-msg-visible");
    }
});

removeBtn.addEventListener("click", () => {
    qrimg.src = "";
    qrimg.alt = "";
    removeBtn.style.display = "none";
    qrinput.value = "";
});