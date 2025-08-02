
document.getElementById("submitBtn").addEventListener("click", function () {
    // Collect the form data
    var formData = ["email", "password"]
    .reduce((formData, item) => {
        formData.append(item, document.getElementById(item).value);
        return formData;
    },  new FormData());
    formData.append("submit", true);
    
    requestAJAX(formData, "POST", "../server/user/signIn.php", (response) => {
     window.location.href = "data_input.php";
    });
});
