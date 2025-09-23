function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target == modal) modal.style.display = "none";
  });
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');  // show/hide menu
  hamburger.classList.toggle('active'); // animate hamburger
});