function toggleDropdown() {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    const dropdown = document.getElementById("dropdownMenu");
    if (!event.target.matches('.profile-image')) {
        dropdown.style.display = "none";
    }
}

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('show');
  }