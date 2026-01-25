// Wait for DOM to be fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {
    // Icon dropdown functionality
    const navicon1 = document.getElementById("icon1");
    const content = document.getElementById("content1");
    
    if (navicon1 && content) {
        navicon1.addEventListener("click", () => {
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }

    // Theme toggle functionality
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                toggle.textContent = '☀️';
            } else {
                toggle.textContent = '🌙';
            }
        });
    }

    // Play buttons
    const button1 = document.getElementById('play1');
    if (button1) {
        button1.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    const button2 = document.getElementById('play2');
    if (button2) {
        button2.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    const button3 = document.getElementById('play3');
    if (button3) {
        button3.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    const button4 = document.getElementById('play4');
    if (button4) {
        button4.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Signup button (if it exists)
    const button5 = document.getElementById("signup");
    if (button5) {
        button5.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    // Filter buttons - Genre, Platform, Rating
    const genreBtn = document.getElementById("Genre");
    if (genreBtn) {
        genreBtn.addEventListener("click", () => {
            window.location.href = "Genre.html";
        });
    }

    const platformBtn = document.getElementById("Platform");
    if (platformBtn) {
        platformBtn.addEventListener("click", () => {
            window.location.href = "Platform.html";
        });
    }

    const ratingBtn = document.getElementById("Rating");
    if (ratingBtn) {
        ratingBtn.addEventListener("click", () => {
            window.location.href = "Rating.html";
        });
    }


    const s1 = document.getElementById("header-search-input");
    const s2 = document.getElementById("main-search-input");
    [s1, s2].forEach(s => s && s.addEventListener("input", e => {
        document.querySelectorAll(".game-card").forEach(card => 
            card.style.display = card.getAttribute("data-game").toLowerCase().includes(e.target.value.toLowerCase()) || !e.target.value ? "block" : "none"
        );
        if(s1 && s2) s2.value = s1.value = e.target.value;
    }));
});
