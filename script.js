document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const body = document.body;

    // Check Local Storage for Dark Mode
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark");
        darkModeToggle.innerHTML = "☀️ Light Mode";
        document.body.style.backgroundColor = "#1a202c"; // Dark mode background
    } else {
        document.body.style.backgroundColor = "#f3f4f6"; // Light mode background
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", function () {
        if (body.classList.contains("dark")) {
            body.classList.remove("dark");
            localStorage.setItem("dark-mode", "disabled");
            darkModeToggle.innerHTML = "🌙 Dark Mode";
            document.body.style.backgroundColor = "#f3f4f6"; // Light mode background
        } else {
            body.classList.add("dark");
            localStorage.setItem("dark-mode", "enabled");
            darkModeToggle.innerHTML = "☀️ Light Mode";
            document.body.style.backgroundColor = "#1a202c"; // Dark mode background
        }
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
          navMenu.classList.toggle("hidden");
        });
      
        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
          if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.add("hidden");
          }
        });
      }

    // Smooth scrolling for internal links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            const targetHref = this.getAttribute("href");
            if (targetHref.startsWith("#")) {
                event.preventDefault();
                const targetId = targetHref.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Dynamic year update in footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Typing effect
    const texts = ["Python Developer", "AI Engineer", "Machine Learning Enthusiast", "Data Science Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById("typing-text");

    function typeEffect() {
        if (charIndex < texts[textIndex].length) {
            typingElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 1500);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
        }
    }

    typeEffect();

    // Highlight Active Page Link
    const navLinks = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop(); // Get current page filename

    navLinks.forEach(link => {
        if (link.getAttribute("href").includes(currentPage) || (currentPage === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("text-orange-500", "font-bold");
        } else {
            link.classList.remove("text-orange-500", "font-bold");
        }
    });

});