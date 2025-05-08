// script.js

function generateOTP() {
    let otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    sessionStorage.setItem("otp", otp.toString()); // Store OTP in sessionStorage

    alert("Your OTP is: " + otp); // Replace with email sending logic
}
