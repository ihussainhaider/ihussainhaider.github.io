// Scroll to section function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Show project details in modal
function showDetails(projectId) {
    document.getElementById(projectId).style.display = 'block';
}

// Close modal
function closeModal(projectId) {
    document.getElementById(projectId).style.display = 'none';
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
