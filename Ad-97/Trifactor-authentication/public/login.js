// Firebase Initialization (Make sure firebase-config.js is included)
firebase.auth().languageCode = 'en';
let verificationId;

// Register User
function registerUser() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const phone = document.getElementById('reg-phone').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            sendOTP(phone);
            alert("Registered successfully! OTP sent to your phone.");
        })
        .catch(error => alert(error.message));
}

// Login User
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            alert("Login successful! Sending OTP...");
            sendOTP(user.phoneNumber); // Send OTP to registered phone
        })
        .catch(error => alert(error.message));
}

// Google Login
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            sendOTP(user.phoneNumber);
            alert("Google login successful! OTP sent.");
        })
        .catch(error => alert(error.message));
}

// Send OTP
function sendOTP(phoneNumber) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    
    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then(confirmationResult => {
            verificationId = confirmationResult.verificationId;
            alert("OTP sent to " + phoneNumber);
        })
        .catch(error => alert(error.message));
}

// Verify OTP
function verifyOTP() {
    const otp = document.getElementById('otp').value;
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    
    firebase.auth().signInWithCredential(credential)
        .then(() => {
            alert("OTP verified! Welcome to the main page.");
            window.location.href = "welcome.html"; // Redirect to welcome page
        })
        .catch(error => alert("Invalid OTP!"));
}
