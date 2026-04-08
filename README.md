# Aman Karn — Personal Portfolio Website

A fully responsive, visually rich personal portfolio website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed to showcase projects, skills, education, and contact information with modern animations and interactive UI effects.

---

## Live Preview

> Open `index.html` in any modern browser or deploy via [Vercel](https://vercel.com) / [Netlify](https://netlify.com).

---

## Project Structure

```
aman-karn-portfoilio/
├── index.html        # Main HTML structure
├── style.css         # All styles, animations, responsive design
├── script.js         # All JavaScript logic and interactivity
├── about.jpg         # Hero profile image
├── home.jpg          # About section image
├── aman.karn.pdf     # Downloadable resume
└── README.md         # This file
```

---

## Sections

| Section | Description |
|---|---|
| Hero | Name, typewriter role animation, profile image, CTA buttons |
| About | Bio, education background, about image |
| Projects | 7 project cards with View More/Less toggle |
| What I Do | 4 service cards (Frontend, Backend, UI/UX, Algorithms) |
| Education & Certificates | Academic history + 4 certification cards |
| Skills | Skill badges by category |
| Contact | Contact form (Web3Forms) + social links sidebar |

---

## Technologies & Tools

### Core
| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, responsive layout |
| Vanilla JavaScript (ES6+) | All interactivity and dynamic behavior |

### CSS Features Used
| Feature | Usage |
|---|---|
| CSS Custom Properties (Variables) | Theme colors, fonts, spacing |
| CSS Grid | Projects grid, education layout |
| Flexbox | Navbar, hero, about, contact sections |
| `clamp()` | Fluid responsive typography |
| `@keyframes` | All animations (float, pulse, shimmer, spin) |
| `backdrop-filter` | Frosted glass navbar and cards |
| `conic-gradient` | Spinning profile image ring |
| `radial-gradient` | Mouse glow, orb backgrounds |
| CSS `::before` / `::after` | Shimmer effects, section dividers, card glows |
| Media Queries | Breakpoints at 1024px, 768px, 480px |

### JavaScript Features Used
| Feature | Usage |
|---|---|
| `IntersectionObserver` | Scroll-triggered animations |
| `addEventListener` | All event handling |
| `async/await` + `fetch` | Contact form submission via Web3Forms API |
| `localStorage` | Dark/light theme persistence |
| `setTimeout` / `setInterval` | Typewriter effect, progress counters |
| `createElement` / `appendChild` | Custom cursor, scroll-to-top, ripple elements |
| CSS Custom Properties via JS | Mouse-position glow on project cards |
| `dataset` | View More/Less toggle state |

---

## External Libraries & CDNs

| Library | Version | Purpose | CDN |
|---|---|---|---|
| AOS (Animate On Scroll) | 2.3.1 | Scroll-triggered entrance animations | unpkg.com |
| Particles.js | 2.0.0 | Animated star particle background | jsdelivr.net |
| Font Awesome | 6.4.0 | Icons throughout the site | cdnjs.cloudflare.com |
| Google Fonts | — | DM Serif Display (headings) + DM Serif Text (body) | fonts.googleapis.com |
| Web3Forms API | — | Contact form email submission | api.web3forms.com |

---

## Animations & Visual Effects

| Effect | Implementation |
|---|---|
| Floating orbs | 3 fixed `div` elements with `blur` + `@keyframes` drift |
| Grid overlay | Fixed `div` with CSS `background-image` grid lines |
| Custom cursor | JS-created `div` elements tracking `mousemove` |
| Click ripple | JS-created `span` with `scale` keyframe animation |
| Scroll progress bar | Fixed top bar width updated on `scroll` event |
| Typewriter effect | JS character-by-character text loop with delete/type cycle |
| Hero name pulse | CSS `@keyframes namePulse` on `h1` |
| Logo shimmer | Animated `background-position` on gradient text |
| Profile image ring | `conic-gradient` pseudo-element with `rotate` keyframe |
| Project card shimmer | `::before` sweep + `::after` mouse-position radial glow |
| Service card border | Animated gradient `::before` on hover |
| Section glow divider | `::before` line with `box-shadow` glow |
| Certificate card shine | `::after` sweep on hover |
| Education bar grow | `::after` height transition on hover |
| About image 3D tilt | CSS `perspective` + `rotateY` on hover |
| Floating profile image | `@keyframes float` translateY loop |
| Mouse glow | Fixed `div` following cursor with `radial-gradient` |
| Preloader | Spinning border animation, fades out on `load` |
| Scroll-to-top button | Fixed button, appears after 500px scroll |
| AOS entrance animations | `fade-right`, `fade-left`, `fade-up`, `zoom-in` |

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| `> 1024px` | Full desktop layout, side-by-side hero, 3-col project grid |
| `≤ 1024px` | Hamburger nav, stacked hero, stacked about, stacked contact |
| `≤ 768px` | Smaller text, 2-col service grid, reduced padding |
| `≤ 480px` | Single column everything, full-width buttons, compact cards |

---

## Projects Showcased

| Project | Tech | Link |
|---|---|---|
| Hostel Hub | Full-Stack, Role-based Auth | [Live](https://frontend-hostel-hub-v4wq.vercel.app/) |
| GroceryAI | AI, Full-Stack, eCommerce | [Live](https://groceryai-rho.vercel.app/) |
| Campus Cafeteria Management System | Java, Spring Boot, MySQL | [GitHub](https://github.com/Aman530680/CampusCafeteriaSystem) |
| Hill Climb Game with ML | Python, Reinforcement Learning | [GitHub](https://github.com/Aman530680/hill_climb_gesture_control) |
| ECOwics Smart Waste Management | IoT, Web | [GitHub](https://github.com/Aman530680/ECOwise) |
| Kitchen Management System | Python, CLI | [GitHub](https://github.com/Aman530680/Kitchen-Management-System-C) |
| Personal Portfolio | HTML, CSS, JS | This site |

---

## Features

- Dark mode by default with light mode toggle (persisted via `localStorage`)
- Fully accessible — semantic HTML, `aria-label`, `aria-live`, `role` attributes
- SEO optimized — meta description, keywords, author tags
- Contact form with real-time validation and Web3Forms email delivery
- vCard download for saving contact directly to phone
- Resume PDF download
- Particles.js interactive star background
- View More / View Less project toggle

---

## Author

**Aman Karn**
B.E. Computer Science & Engineering — Sri Eshwar College of Engineering (2024–2028)

- Email: officala93@gmail.com
- LinkedIn: [aman-karn-569040345](https://www.linkedin.com/in/aman-karn-569040345/)
- GitHub: [Aman530680](https://github.com/Aman530680)
- LeetCode: [Aman530680](https://leetcode.com/u/Aman530680/)

---

## License

This project is open source and available for personal use and reference.
