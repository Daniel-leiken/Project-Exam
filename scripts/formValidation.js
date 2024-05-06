function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Check if name, email, and message fields are not empty
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert("Please fill in all fields.");
        return false;
    }

    // Check if email is valid using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validation is passed, allow form submission
    return true;
}