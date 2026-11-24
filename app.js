
/* ==========================================
   IPL 2026 TICKET BOOKING WEBSITE
   JAVASCRIPT - ACTIVITY 4 + ACTIVITY 7
========================================== */


/* 1. REUSABLE TOAST FUNCTION */

function showToast(message, type = "success") {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 400);

    }, 3000);

}


/* 2. MAIN DOM CONTENT LOADED */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       ACTIVITY 7 - LIVE BOOKING SUMMARY
    ===================================== */


    // SELECT FORM ELEMENTS

    const matchSelect = document.getElementById("match");

    const standSelect = document.getElementById("stand");

    const quantityInput = document.getElementById("quantity");


    // SELECT SUMMARY ELEMENTS

    const summaryMatch = document.getElementById("summaryMatch");

    const summaryStand = document.getElementById("summaryStand");

    const summaryPrice = document.getElementById("summaryPrice");

    const summaryQuantity = document.getElementById("summaryQuantity");

    const summaryTotal = document.getElementById("summaryTotal");


    // TICKET PRICE DATABASE

    const ticketPrices = {

        "RCB vs MI": {
            "General": 1500,
            "Premium": 4000,
            "VIP": 8000
        },

        "CSK vs KKR": {
            "General": 1200,
            "Premium": 3500,
            "VIP": 7000
        },

        "MI vs PBKS": {
            "General": 1000,
            "Premium": 3000,
            "VIP": 6500
        },

        "KKR vs RR": {
            "General": 1500,
            "Premium": 4000,
            "VIP": 7500
        }

    };


    // UPDATE BOOKING SUMMARY FUNCTION

    function updateBookingSummary() {

        if (!matchSelect || !standSelect ||
            !quantityInput || !summaryMatch) {
            return;
        }

        const selectedMatch = matchSelect.value;

        const selectedStand = standSelect.value;

        const quantity = Number(quantityInput.value);


        // UPDATE MATCH

        summaryMatch.textContent =
            selectedMatch || "Not Selected";


        // UPDATE STAND

        summaryStand.textContent =
            selectedStand || "Not Selected";


        // VALIDATE QUANTITY

        if (
            quantityInput.value === "" ||
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 10
        ) {

            summaryQuantity.textContent = "Invalid Quantity";

            summaryPrice.textContent = "₹0";

            summaryTotal.textContent = "₹0";

            return;
        }


        summaryQuantity.textContent = quantity;


        // CHECK MATCH AND STAND SELECTION

        if (!selectedMatch || !selectedStand) {

            summaryPrice.textContent = "₹0";

            summaryTotal.textContent = "₹0";

            return;
        }


        // GET TICKET PRICE

        const price =
            ticketPrices[selectedMatch][selectedStand];


        // CALCULATE TOTAL

        const total = price * quantity;


        // UPDATE SUMMARY

        summaryPrice.textContent =
            "₹" + price.toLocaleString("en-IN");

        summaryTotal.textContent =
            "₹" + total.toLocaleString("en-IN");


        // NOTIFICATION

        showToast("Booking summary updated successfully!");

    }


    // EVENT LISTENERS

    if (matchSelect) {
        matchSelect.addEventListener(
            "change",
            updateBookingSummary
        );
    }

    if (standSelect) {
        standSelect.addEventListener(
            "change",
            updateBookingSummary
        );
    }

    if (quantityInput) {

        quantityInput.addEventListener(
            "input",
            updateBookingSummary
        );

        quantityInput.addEventListener(
            "change",
            updateBookingSummary
        );

    }


    // INITIAL SUMMARY

    updateBookingSummary();


    /* =====================================
       ACTIVITY 4 - SMOOTH SCROLLING
    ===================================== */

    const bookButtons = document.querySelectorAll(
        '.book-link'
    );

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const bookingSection =
                document.getElementById("booking");

            const selectedMatch =
                button.dataset.match;

            if (bookingSection) {

                matchSelect.value = selectedMatch;

                updateBookingSummary();

                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast(
                    selectedMatch + " selected! Choose your ticket category."
                );

            }

        });

    });


    /* =====================================
       TEAM FILTER
    ===================================== */

    const teamFilter = document.getElementById("teamFilter");

    const matchRows = document.querySelectorAll(
        "#matchTable tbody tr"
    );

    if (teamFilter) {

        teamFilter.addEventListener("change", function () {

            const selectedTeam = teamFilter.value;

            matchRows.forEach(function (row) {

                const teams = row.dataset.teams.split(" ");

                if (
                    selectedTeam === "All" ||
                    teams.includes(selectedTeam)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }


    /* =====================================
       FORM VALIDATION
    ===================================== */

    const bookingForm =
        document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!bookingForm.checkValidity()) {

                bookingForm.reportValidity();

                return;

            }

            const selectedMatch = matchSelect.value;

            const selectedStand = standSelect.value;

            const quantity = Number(quantityInput.value);

            if (
                !ticketPrices[selectedMatch] ||
                !ticketPrices[selectedMatch][selectedStand] ||
                !Number.isInteger(quantity) ||
                quantity < 1 ||
                quantity > 10
            ) {

                showToast("Please check your booking details.", "error");

                return;

            }

            showToast(
                "Form validated! Booking submission is ready for the next activity."
            );

        });

    }

});
