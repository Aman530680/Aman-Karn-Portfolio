// ====================================================================
// 13. Advanced JavaScript Logic
// ====================================================================

// Typing animation data
const roles = [
  "Computer Science and Engineering Student",
  "Machine Learning Enthusiast",
  "Front-End Developer",
  "Full Stack Enthusiast",
  "Problem Solver",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenRoles = 2000;

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

// --- Core Functions ---

// 1. Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = "fas fa-sun";
const moonIcon = "fas fa-moon";

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

// 2. Mouse Trail Glow
const mouseGlow = document.getElementById("mouse-glow");
function updateMouseGlow(e) {
  if (mouseGlow) {
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY + window.scrollY}px`;
  }
}

// 3. Scroll Indicator
const scrollIndicator = document.getElementById("scroll-indicator");
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

// --- Initialization on DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", function () {
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  // Event Listeners
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  document.addEventListener("mousemove", updateMouseGlow);
  window.addEventListener("scroll", updateScrollIndicator);

  // Start the typing animation after a small delay
  setTimeout(typeWriter, 1000);

  // Hide preloader once content is loaded
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    // Ensure the preloader has the 'hidden' class to fade out
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

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-links a:not(.resume-btn)");
  const sections = document.querySelectorAll("section");
  const navbar = document.querySelector(".navbar");

  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      if (this.classList.contains("resume-btn")) return;

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighting on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const scrollPosition = window.scrollY + navbarHeight + 1;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (
        scrollPosition >= sectionTop + sectionHeight * 0.2 &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    if (
      sections.length > 1 &&
      window.scrollY < sections[1].offsetTop - navbarHeight - 50
    ) {
      current = "hero";
    }

    document.querySelectorAll(".nav-links a").forEach((link) => {
      if (link.classList.contains("resume-btn")) return;

      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // particles.js config
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: "#FFD700",
        },
        shape: {
          type: "star",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#FFD700",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }
});
