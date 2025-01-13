// Function to handle secure signup
function secureSignup() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    // Validate password length
    if (password.length < 6) {
        document.getElementById("signupMessage").innerText = "Password must be at least 6 characters long.";
        return;
    }

    // Encrypt the password (Base64 encoding)
    const encryptedPassword = btoa(password); // Using Base64 for simplicity

    // Save the email and encrypted password in localStorage
    localStorage.setItem(email, encryptedPassword);

    // Create and download user credentials as a text file
    downloadCredentials(email, encryptedPassword);

    // Confirm signup
    document.getElementById("signupMessage").innerText = "Account created successfully!";
}

// Function to download encrypted credentials as a text file
function downloadCredentials(email, encryptedPassword) {
    const userData = `Email: ${email}\nEncrypted Password: ${encryptedPassword}\n`;
    const blob = new Blob([userData], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "user_credentials.txt";
    downloadLink.click();
}

// Function to handle secure login
function secureLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Retrieve the encrypted password for the entered email from localStorage
    const encryptedPassword = localStorage.getItem(email);

    if (encryptedPassword) {
        // Decrypt the password (Base64 decoding)
        const decryptedPassword = atob(encryptedPassword);

        // Check if the entered password matches the decrypted password
        if (password === decryptedPassword) {
            // Login successful, redirect to products page
            window.location.href = "products.html"; // Redirect to products page
        } else {
            document.getElementById("loginMessage").innerText = "Incorrect password.";
        }
    } else {
        document.getElementById("loginMessage").innerText = "Email not found.";
    }
}
