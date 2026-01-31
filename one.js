// Wait for DOM to be fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {
    // Logo click - go to home
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.style.cursor = "pointer";
        logo.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

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

    // View options in dropdown
    const viewOptions = content?.querySelectorAll("p");
    if (viewOptions) {
        viewOptions.forEach(option => {
            option.style.cursor = "pointer";
            option.addEventListener("click", () => {
                const view = option.textContent.toLowerCase();
                const grid = document.getElementById("games-grid");
                if (grid) {
                    if (view.includes("list")) {
                        grid.style.gridTemplateColumns = "1fr";
                    } else if (view.includes("compact")) {
                        grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
                        grid.style.gap = "15px";
                    } else {
                        grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(280px, 1fr))";
                        grid.style.gap = "24px";
                    }
                }
                content.style.display = "none";
            });
        });
    }

    // Square icon - notifications/saved
    const navIcons = document.querySelectorAll(".nav-icon");
    navIcons.forEach(icon => {
        if (!icon.id && icon.textContent.trim() === "□") {
            icon.addEventListener("click", () => {
                alert("Notifications / Saved Items");
            });
        }
    });

    // G icon - profile/account
    const gIcon = document.getElementById("icon3");
    if (gIcon) {
        gIcon.style.cursor = "pointer";
        gIcon.addEventListener("click", () => {
            window.location.href = "login.html";
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


    // Search functionality
    const s1 = document.getElementById("header-search-input");
    const s2 = document.getElementById("main-search-input");
    [s1, s2].forEach(s => s && s.addEventListener("input", e => {
        document.querySelectorAll(".game-card").forEach(card => 
            card.style.display = card.getAttribute("data-game").toLowerCase().includes(e.target.value.toLowerCase()) || !e.target.value ? "block" : "none"
        );
        if(s1 && s2) s2.value = s1.value = e.target.value;
    }));

    // Keyboard shortcut ⌘ K to focus search
    document.addEventListener("keydown", e => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            (s2 || s1)?.focus();
        }
    });

    // Make game cards clickable
    document.querySelectorAll(".game-card").forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            if (!e.target.closest(".play-btn")) {
                const playBtn = card.querySelector(".play-btn");
                if (playBtn) playBtn.click();
            }
        });
    });
});
