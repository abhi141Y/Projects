// otp.js

function verifyOTP() {
    let enteredOTP = document.getElementById("otp").value;
    let storedOTP = sessionStorage.getItem("otp");

    if (enteredOTP === storedOTP) {
        window.location.href = "welcome.html"; // Redirect to Welcome Page
    } else {
        document.getElementById("error-message").innerText = "Invalid OTP. Try again.";
    }
}
