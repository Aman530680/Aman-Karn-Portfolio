// ====================================================================
// 1. Core Variables & Data
// ====================================================================
// Typing animation data
const roles = [
  "Full Stack Enthusiast",
  "Front-End Developer",
  "Computer Science and Engineering Student",
  "Machine Learning Enthusiast",
  "Problem Solver",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenRoles = 2000;

// DOM Element Caching
const themeToggle = document.getElementById("theme-toggle");
const mouseGlow = document.getElementById("mouse-glow");
const scrollIndicator = document.getElementById("scroll-indicator");
const navMenu = document.getElementById("nav-menu");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-links a:not(.resume-btn)");
const sections = document.querySelectorAll("section");
const navbar = document.querySelector(".navbar");

const sunIcon = "fas fa-sun";
const moonIcon = "fas fa-moon";

// ====================================================================
// 2. Typing Animation Logic
// ====================================================================
function typeWriter() {
  const currentRole = roles[roleIndex % roles.length];
  const roleElement = document.getElementById("role-text");

  if (!roleElement) return;

  if (isDeleting) {
    roleElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = delayBetweenRoles;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex++;
    speed = 500;
  }

  setTimeout(typeWriter, speed);
}

// ====================================================================
// 3. Theme Toggle & Mouse Glow
// ====================================================================
function applyTheme(isLight) {
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
  if (themeToggle) {
    themeToggle.querySelector("i").className = isLight ? moonIcon : sunIcon;
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains("light-mode");
  applyTheme(!isLight);
}

function updateMouseGlow(e) {
  if (mouseGlow) {
    // Corrected to use clientX/Y and scrollY for fixed positioning
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY + window.scrollY}px`;
  }
}

// ====================================================================
// 4. Mobile Menu Toggle
// ====================================================================
function toggleMenu() {
  navMenu.classList.toggle("open");
  const icon = hamburger.querySelector("i");
  const isExpanded = navMenu.classList.contains("open");
  icon.className = isExpanded ? "fas fa-times" : "fas fa-bars";
  hamburger.setAttribute("aria-expanded", isExpanded);
}

// ====================================================================
// 5. Scroll Functionality
// ====================================================================
function updateScrollIndicator() {
  if (scrollIndicator) {
    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / totalHeight) * 100;
    scrollIndicator.style.width = `${progress}%`;
  }
}

function highlightNavLink() {
  let current = "";
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const scrollPosition = window.scrollY + navbarHeight + 50; // Added offset for better detection

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // Ensure 'hero' is active when at the very top
  if (
    sections.length > 1 &&
    window.scrollY < sections[1].offsetTop - navbarHeight - 50
  ) {
    current = "hero";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
}

// ====================================================================
// 6. Click Ripple Effect (New Feature for Visual Appeal)
// ====================================================================
function createClickRipple(e) {
  // Check if the click occurred on a special element (like a link or button)
  // to prevent distracting ripples over interactive elements, focusing the effect on the background.
  if (e.target.closest("a") || e.target.closest("button")) {
    return;
  }

  const ripple = document.createElement("span");
  ripple.classList.add("click-ripple");

  // Calculate position relative to the document
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  document.body.appendChild(ripple);

  // Remove the element after the animation is complete
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}

// ====================================================================
// 7. Contact Form Validation and Submission (UPDATED LOGIC)
// ====================================================================

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessageDiv = document.getElementById("form-success-message");

// Simple Email Validation Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Shows an error message for a given input field.
 */
function setError(input, message) {
  const formGroup = input.parentElement;
  const errorDisplay = document.getElementById(`${input.id}-error`);

  formGroup.classList.add("error");
  errorDisplay.textContent = message;
}

/**
 * Clears the error message for a given input field.
 */
function clearError(input) {
  const formGroup = input.parentElement;
  const errorDisplay = document.getElementById(`${input.id}-error`);

  formGroup.classList.remove("error");
  errorDisplay.textContent = "";
}

/**
 * Performs client-side validation on all fields before submission.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
function validateForm() {
  let isValid = true;

  // Validate Name
  if (nameInput.value.trim() === "") {
    setError(nameInput, "Name cannot be empty.");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Validate Email
  const emailValue = emailInput.value.trim();
  if (emailValue === "") {
    setError(emailInput, "Email cannot be empty.");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    setError(emailInput, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Validate Message
  if (messageInput.value.trim() === "") {
    setError(messageInput, "Message cannot be empty.");
    isValid = false;
  } else {
    clearError(messageInput);
  }

  return isValid;
}


// --- WEB3FORMS SUBMISSION LOGIC ---
if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Run client-side validation
        if (!validateForm()) {
            successMessageDiv.classList.remove("show"); // Hide any previous success message
            return; // Stop submission if validation fails
        }

        // 2. Prepare Form Data
        const formData = new FormData(contactForm);
        // NOTE: Replace "d64ab352-b569-45f6-b097-2c96a1a8cfee" with your actual Web3Forms Access Key
        formData.append("access_key", "d64ab352-b569-45f6-b097-2c96a1a8cfee");

        const originalText = submitBtn.textContent;

        // 3. Update Button State (Show loading and disable)
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        successMessageDiv.classList.remove("show"); // Ensure success message is hidden during submission


        try {
            // 4. Send Request
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            // 5. Handle Response
            if (response.ok && data.success) {
                // Show success message without reloading
                successMessageDiv.textContent = `Success! Your message has been sent, ${nameInput.value.trim()}. I'll be in touch.`;
                successMessageDiv.classList.add("show");
                
                // Clear the form fields
                contactForm.reset();

                // Optional: Hide success message after a delay
                setTimeout(() => {
                    successMessageDiv.classList.remove("show");
                }, 5000);

            } else {
                // Handle API error
                console.error("Web3Forms Error:", data);
                // Display error message using the same non-reloading element
                successMessageDiv.textContent = "Error: Something went wrong. Please check the console for details.";
                successMessageDiv.classList.add("show");
            }

        } catch (error) {
            // Handle network/fetch error
            console.error("Network Error:", error);
            successMessageDiv.textContent = "Network Error: Could not connect to the server. Please try again.";
            successMessageDiv.classList.add("show");
        } finally {
            // 6. Restore Button State
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Optional: Live validation on input change
    nameInput.addEventListener("input", () => validateForm());
    emailInput.addEventListener("input", () => validateForm());
    messageInput.addEventListener("input", () => validateForm());
}
// --- END WEB3FORMS SUBMISSION LOGIC ---


// ====================================================================
// 8. Initialization on DOMContentLoaded (Original Logic)
// ====================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "light");

  // Event Listeners
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }
  document.addEventListener("mousemove", updateMouseGlow);
  window.addEventListener("scroll", () => {
    updateScrollIndicator();
    highlightNavLink();
  });

  // 🌟 ADDED: Global click listener for ripple effect 🌟
  document.addEventListener("click", createClickRipple);

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  // Start the typing animation after a small delay
  setTimeout(typeWriter, 500);

  // Hide preloader once content is loaded
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }
  });

  // Initialize AOS
  AOS.init({
    offset: 150,
    duration: 800,
    easing: "ease-in-out",
    once: true,
    delay: 50,
  });

  // particles.js config
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00bcd4" },
        shape: { type: "star" },
        opacity: { value: 0.8, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00bcd4",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      retina_detect: true,
    });
  }
});