
/* =====================================
   IPL TICKET BOOKING WEBSITE
   JavaScript - Activity 4
===================================== */


/* 1. CREATE TOAST NOTIFICATION */

function showToast(message, type = "success") {

    // Check if toast already exists
    let existingToast = document.querySelector(".toast");

    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    // Add notification message
    toast.textContent = message;

    // Add toast to webpage
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 400);

    }, 3000);
}


/* 2. SMOOTH SCROLLING */

document.addEventListener("DOMContentLoaded", function () {

    // Select all Book buttons in match schedule
    const bookButtons = document.querySelectorAll(
        '#matches a[href="#booking"]'
    );

    // Add click event to every Book button
    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            // Find booking section
            const bookingSection = document.querySelector("#booking");

            if (bookingSection) {

                // Smoothly scroll to booking form
                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Display notification
                showToast(
                    "Redirecting you to the ticket booking section!"
                );
            }

        });

    });

});
