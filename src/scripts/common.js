function toggleContacts() {
    const contactList = document.getElementById("contact-list");
    contactList.classList.toggle("visible");
}

function requestAJAX(formData, method, url, successCallback, failCallback = (message) => alert(message), errorCallback = (message) => alert(message)) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText); // Parse the JSON response
            if (response.success) {
                successCallback(response);
            } else {
                failCallback(response.message);
            }
        } else {
            errorCallback("An error occurred. Please try again.");
        }
    };

    // Send the form data to the server
    xhr.send(formData);
}

function requestJsonAJAX(jsonData, method, url, successCallback, failCallback = (message) => alert(message), errorCallback = (message) => alert(message)) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        try {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText); // Parse the JSON response
                if (response.success) {
                    successCallback(response);
                } else {
                    failCallback(response.message);
                }
            } else {
                errorCallback("An error occurred. Please try again.");
            }
        } catch {
          errorCallback("An error occurred. Please try again.");
        }
    };
    xhr.send(JSON.stringify(jsonData));
}
