const roles = [
  "Full Stack Enthusiast",
  "Front-End Developer",
  "Computer Science and Engineering Student",
  "Machine Learning Enthusiast",
  "Problem Solver",
  "Web Architect",
  "Data Structures & Algorithms Champion",
  "DevOps Learner",
  "UX/UI Designer",
  "Tech Innovator",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 70;
const deletingSpeed = 40;
const delayBetweenRoles = 2500;
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
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessageDiv = document.getElementById("form-success-message");
const customCursor = document.createElement("div");
const customCursorDot = document.createElement("div");
const scrollUpBtn = document.getElementById("scroll-to-top-btn") || document.createElement('div');
scrollUpBtn.id = "scroll-to-top-btn";
scrollUpBtn.classList.add("scroll-to-top");
scrollUpBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
document.body.appendChild(scrollUpBtn);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cardAnimations = document.querySelectorAll(".card-animation");
const sectionHeaders = document.querySelectorAll(".section-header-animation");
const projectFilterBtns = document.querySelectorAll(".filter-btn");
const projectCardsV2 = document.querySelectorAll(".project-card-v2-animation");
const projectRows = document.querySelectorAll(".project-item-row-animation");
const skillBadges = document.querySelectorAll(".skill-badge-animation");
const timelineItems = document.querySelectorAll(".timeline-item-animation");
const certificateCards = document.querySelectorAll(".certificate-card-animation");
const allAnimatableElements = [
    ...cardAnimations,
    ...sectionHeaders,
    ...projectCardsV2,
    ...projectRows,
    ...skillBadges,
    ...timelineItems,
    ...certificateCards,
    document.querySelector('.about-image-animation') || null,
    document.querySelector('.contact-form-animation') || null,
    document.querySelector('.footer-animation') || null
].filter(el => el != null);
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
function initCustomCursor() {
  customCursor.classList.add("custom-cursor");
  customCursorDot.classList.add("custom-cursor-dot");
  document.body.appendChild(customCursor);
  document.body.appendChild(customCursorDot);
  document.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
    customCursorDot.style.left = `${e.clientX}px`;
    customCursorDot.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll("a, button, input, textarea, .skill-badge, .project-card, .service-card").forEach(el => {
    el.addEventListener("mouseenter", () => customCursor.classList.add("hovered"));
    el.addEventListener("mouseleave", () => customCursor.classList.remove("hovered"));
  });
}
function updateMouseGlow(e) {
  if (mouseGlow) {
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY + window.scrollY}px`;
  }
}
function toggleMenu() {
  navMenu.classList.toggle("open");
  const icon = hamburger.querySelector("i");
  const isExpanded = navMenu.classList.contains("open");
  icon.className = isExpanded ? "fas fa-times" : "fas fa-bars";
  hamburger.setAttribute("aria-expanded", isExpanded);
}
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
  const scrollPosition = window.scrollY + navbarHeight + 50;
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
function createClickRipple(e) {
  if (e.target.closest("a") || e.target.closest("button") || e.target.closest("input") || e.target.closest("textarea")) {
    return;
  }
  const ripple = document.createElement("span");
  ripple.classList.add("click-ripple");
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}
function setError(input, message) {
  const formGroup = input.parentElement;
  const errorDisplay = document.getElementById(`${input.id}-error`);
  formGroup.classList.add("error");
  errorDisplay.textContent = message;
}
function clearError(input) {
  const formGroup = input.parentElement;
  const errorDisplay = document.getElementById(`${input.id}-error`);
  formGroup.classList.remove("error");
  errorDisplay.textContent = "";
}
function validateForm() {
  let isValid = true;
  if (nameInput.value.trim() === "") {
    setError(nameInput, "Name cannot be empty.");
    isValid = false;
  } else {
    clearError(nameInput);
  }
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
  if (messageInput.value.trim() === "") {
    setError(messageInput, "Message cannot be empty.");
    isValid = false;
  } else {
    clearError(messageInput);
  }
  return isValid;
}
function initializeScrollToTop() {
  if (scrollUpBtn) {
    if (window.scrollY > 500) {
      scrollUpBtn.classList.add("show");
    } else {
      scrollUpBtn.classList.remove("show");
    }
  }
}
function checkAnimationElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  allAnimatableElements.forEach(el => {
    if (el) observer.observe(el);
  });
}
if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            successMessageDiv.classList.remove("show");
            return;
        }
        const formData = new FormData(contactForm);
        formData.append("access_key", "d64ab352-b569-45f6-b097-2c96a1a8cfee");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        successMessageDiv.classList.remove("show");
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (response.ok && data.success) {
                successMessageDiv.textContent = `Success! Your message has been sent, ${nameInput.value.trim()}. I'll be in touch.`;
                successMessageDiv.classList.add("show");
                contactForm.reset();
                setTimeout(() => {
                    successMessageDiv.classList.remove("show");
                }, 5000);
            } else {
                console.error("Web3Forms Error:", data);
                successMessageDiv.textContent = "Error: Something went wrong. Please check the console for details.";
                successMessageDiv.classList.add("show");
            }
        } catch (error) {
            console.error("Network Error:", error);
            successMessageDiv.textContent = "Network Error: Could not connect to the server. Please try again.";
            successMessageDiv.classList.add("show");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    nameInput.addEventListener("input", () => clearError(nameInput));
    emailInput.addEventListener("input", () => clearError(emailInput));
    messageInput.addEventListener("input", () => clearError(messageInput));
}
function updateProjectCardMouseGlow(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
}
function attachProjectCardListeners() {
    document.querySelectorAll('.project-card-v2').forEach(card => {
        card.addEventListener('mousemove', updateProjectCardMouseGlow);
    });
}
function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab-btn');
    const contents = document.querySelectorAll('.skill-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    if (tabs.length > 0) {
        tabs[0].click();
    }
}
function filterProjects(category) {
    const projectContainers = document.querySelectorAll('.project-item-row-container, .project-card-v2-container, .project-item-row-container-v3, .project-card-v2-container-v3');
    projectContainers.forEach(container => {
        container.style.display = 'none';
    });
    const targetContainer = document.getElementById(`projects-${category}`);
    if (targetContainer) {
        targetContainer.style.display = 'grid';
    }
    projectFilterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
}
function setupProjectFiltering() {
    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterProjects(btn.getAttribute('data-filter'));
        });
    });
    filterProjects('all');
}
if (scrollUpBtn) {
    scrollUpBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
function updateAllProgressPies() {
    document.querySelectorAll('.progress-pie').forEach(pie => {
        const value = pie.getAttribute('data-progress-value');
        if (value) {
            pie.style.background = `conic-gradient(
                var(--secondary-accent) 0%,
                var(--accent-color) ${value}%,
                var(--progress-track) ${value}%,
                var(--progress-track) 100%
            )`;
            const valueElement = pie.querySelector('.progress-pie-value');
            if (valueElement) {
                valueElement.textContent = `${value}%`;
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "light");
  initCustomCursor();
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
    initializeScrollToTop();
    checkAnimationElements();
  });
  document.addEventListener("click", createClickRipple);
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        toggleMenu();
      }
    });
  });
  setTimeout(typeWriter, 500);
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }
    updateAllProgressPies();
    checkAnimationElements();
  });
  if (typeof AOS !== "undefined") {
    AOS.init({
      offset: 150,
      duration: 800,
      easing: "ease-in-out",
      once: true,
      delay: 50,
    });
  }
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
  attachProjectCardListeners();
  initSkillTabs();
  setupProjectFiltering();
});