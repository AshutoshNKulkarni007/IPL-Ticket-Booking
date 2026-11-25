const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const teamFilter = document.getElementById("teamFilter");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
const matchContainer = document.getElementById("matchContainer");
const matchCards = document.querySelectorAll(".match-card");

// Hamburger menu toggle on mobile
menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Filter match cards by selected team
teamFilter.addEventListener("change", (event) => {
    const selectedTeam = event.target.value;

    matchCards.forEach((card) => {
        const teams = (card.dataset.teams || "").split(/\s+/);
        const shouldShow = selectedTeam === "All" || teams.includes(selectedTeam);
        card.style.display = shouldShow ? "" : "none";
    });
});

// Switch between Grid View and List View
gridBtn.addEventListener("click", () => {
    matchContainer.classList.remove("list-view");
    matchContainer.classList.add("grid-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    matchContainer.classList.remove("grid-view");
    matchContainer.classList.add("list-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

// Preselect match in booking form from card "Book" links
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");
const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryPrice = document.getElementById("summaryPrice");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");

const matchStandPrices = {
    "RCB vs MI": { General: 1500, Premium: 4000, VIP: 8000 },
    "CSK vs KKR": { General: 1200, Premium: 3500, VIP: 7000 },
    "MI vs PBKS": { General: 1000, Premium: 3000, VIP: 6500 },
    "KKR vs RR": { General: 1500, Premium: 4000, VIP: 7500 }
};

function formatINR(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}

function updateSummary() {
    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const qty = Math.max(1, parseInt(quantityInput.value, 10) || 1);
    const unitPrice = matchStandPrices[selectedMatch]?.[selectedStand] ?? 1500;
    const total = unitPrice * qty;

    summaryMatch.textContent = selectedMatch;
    summaryStand.textContent = selectedStand;
    summaryPrice.textContent = formatINR(unitPrice);
    summaryQuantity.textContent = String(qty);
    summaryTotal.textContent = formatINR(total);
}

document.querySelectorAll(".book-link").forEach((btn) => {
    btn.addEventListener("click", () => {
        const matchName = btn.dataset.match;
        if (matchName) {
            matchSelect.value = matchName;
            updateSummary();
        }
    });
});

matchSelect.addEventListener("change", updateSummary);
standSelect.addEventListener("change", updateSummary);
quantityInput.addEventListener("input", updateSummary);
updateSummary();

// Handle booking submission and append row to My Ticket Bookings
const bookingForm = document.getElementById("bookingForm");
const bookingTableBody = document.getElementById("bookingTableBody");
let bookingCounter = 1;

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;
    const qty = Math.max(1, parseInt(quantityInput.value, 10) || 1);
    const unitPrice = matchStandPrices[selectedMatch]?.[selectedStand] ?? 1500;
    const totalAmount = unitPrice * qty;
    const bookingId = `IPL26-${String(bookingCounter++).padStart(3, "0")}`;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${bookingId}</td>
        <td>${selectedMatch}</td>
        <td>${selectedStand}</td>
        <td>${qty}</td>
        <td>${formatINR(totalAmount)}</td>
    `;
    bookingTableBody.appendChild(row);

    bookingForm.reset();
    quantityInput.value = "1";
    updateSummary();
});