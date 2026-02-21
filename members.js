const members = document.querySelectorAll(".member-card");
const countDisplay = document.getElementById("memberCount");

function generateID() {
    return "Voice-" + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// Assign IDs & avatars
members.forEach(member => {
    const id = generateID();
    member.querySelector(".member-id").textContent = id;
    member.querySelector(".avatar").textContent = id.slice(-2);
});

// Member count
countDisplay.textContent = members.length;

// Filters
document.getElementById("roleFilter").addEventListener("change", filterMembers);
document.getElementById("regionFilter").addEventListener("change", filterMembers);

function filterMembers() {
    const role = document.getElementById("roleFilter").value;
    const region = document.getElementById("regionFilter").value;

    members.forEach(member => {
        const roleMatch = role === "all" || member.dataset.role === role;
        const regionMatch = region === "all" || member.dataset.region === region;

        member.style.display = roleMatch && regionMatch ? "block" : "none";
    });
}
