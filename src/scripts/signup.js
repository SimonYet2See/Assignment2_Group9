    // Name: Jihee Seo
// Assignment 2

// File Name: login.js
// Date: 2025-08-05
// Description: login javascript to signup

function validateForm() {
    const pw1 = document.getElementById("password").value;
    const pw2 = document.getElementById("confirm-password").value;
    if (pw1 !== pw2) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

document.getElementById("submitBtn").addEventListener("click", function () {
    if (!validateForm()) {
        return;
    }
    // Collect the form data
    var formData = ["firstname", "lastname", "email", "password", "confirm-password", "city", "country", "gender"]
    .reduce((formData, item) => {
        formData.append(item, document.getElementById(item).value);
        return formData;
    },  new FormData());
    formData.append("submit", true);
    
    requestAJAX(formData, "POST", "../server/user/create.php", (response) => {
        alert(response.message);
        window.location.href = "login.php";
    });
});
