document.addEventListener("DOMContentLoaded", function () {

/* ==========================
   PARTICLES BACKGROUND (Responsive)
========================== */
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: window.innerWidth < 768 ? 35 : 70 },
      size: { value: 3 },
      color: { value: "#d4af37" },
      line_linked: { enable: true, color: "#d4af37", opacity: 0.4 },
      move: { speed: 2 }
    }
  });
}

/* ==========================
   SCROLL PROGRESS (Optimized)
========================== */
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (progressBar) progressBar.style.width = scrollPercent + "%";
});

/* ==========================
   HEADER SCROLL EFFECT
========================== */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ==========================
   ACTIVE NAV LINK (Improved Accuracy)
========================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ==========================
   SKILL BAR (IntersectionObserver)
========================== */
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll(".skill-bar");
      bars.forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const skillsSection = document.querySelector("#skills");
if (skillsSection) skillObserver.observe(skillsSection);

/* ==========================
   EMAILJS CONTACT FORM
========================== */
if (typeof emailjs !== "undefined") {

  emailjs.init("1lvTtN7BdtzYOQqo1");

  const form = document.getElementById("contact-form");
  const btn = document.getElementById("button");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      btn.innerText = "Sending...";
      btn.disabled = true;

      emailjs.sendForm(
        "service_g88l19i",
        "template_pdwsg69",
        this
      ).then(() => {

        status.innerText = "✅ Message sent successfully!";
        status.style.color = "#28a745";

        btn.innerText = "Send Message";
        btn.disabled = false;
        form.reset();

        setTimeout(() => status.innerText = "", 4000);

      }).catch(() => {

        status.innerText = "❌ Failed to send message.";
        status.style.color = "red";

        btn.innerText = "Send Message";
        btn.disabled = false;

      });
    });
  }
}

/* ==========================
   3D TILT EFFECT (GPU Optimized)
========================== */
const cards = document.querySelectorAll(".custom-card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 18;
    const rotateY = (x - rect.width / 2) / 18;

    card.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  });

});

/* ==========================
   TYPING ANIMATION (Smooth Loop)
========================== */
const typingText = document.querySelector(".typing-text");
const roles = [
  "Full Stack Developer",
  "Python Backend Engineer",
  "UI/UX Enthusiast",
  "Enterprise System Builder"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  if (!typingText) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = currentRole.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

/* ==========================
   SECTION FADE IN (Smooth Reveal)
========================== */
const fadeSections = document.querySelectorAll("section");

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

fadeSections.forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 1s ease";
  fadeObserver.observe(section);
});

});
