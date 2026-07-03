document.addEventListener("DOMContentLoaded", function () {

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ==========================================================
     PRELOADER (timed intro, with a hard fallback)
  ========================================================== */
  (function () {
    const pre = document.getElementById("preloader");
    const fill = document.getElementById("preFill");
    const count = document.getElementById("preCount");
    const dur = 1100, t0 = performance.now();
    function tick(now) {
      const p = Math.min(100, Math.round(((now - t0) / dur) * 100));
      if (fill) fill.style.width = p + "%";
      if (count) count.textContent = p + "%";
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => pre && pre.classList.add("done"), 200);
    }
    requestAnimationFrame(tick);
    setTimeout(() => pre && pre.classList.add("done"), 4000); // safety
  })();

  /* ==========================================================
     PARTICLES BACKGROUND
  ========================================================== */
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: window.innerWidth < 768 ? 35 : 70 },
        size: { value: 3 },
        color: { value: "#d4af37" },
        opacity: { value: 0.5 },
        line_linked: { enable: true, color: "#d4af37", opacity: 0.35, distance: 140 },
        move: { speed: 2 }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.6 } }, push: { particles_nb: 3 } }
      }
    });
  }

  /* ==========================================================
     CUSTOM CURSOR (dot snaps, ring eases)
  ========================================================== */
  (function () {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring || window.matchMedia("(pointer:coarse)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, .custom-card").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
    });
  })();

  /* ==========================================================
     HERO INTRO + SCROLL REVEALS (GSAP, degrade gracefully)
  ========================================================== */
  if (hasGSAP && !reduce) {
    gsap.from("[data-hero]", { y: 34, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.35 });

    gsap.utils.toArray("[data-reveal], [data-title]").forEach((el) => {
      gsap.from(el, {
        y: 46, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });
  }

  /* ==========================================================
     COUNTERS · SKILL BARS · TITLE UNDERLINE  (works w/o GSAP)
  ========================================================== */
  function runCount(el) {
    const to = +el.dataset.count || 0;
    const suf = el.dataset.suffix || "";
    const t0 = performance.now(), d = 1600;
    (function tk(now) {
      const p = Math.min(1, (now - t0) / d);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tk);
    })(performance.now());
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.matches("[data-title]")) el.classList.add("drawn");
      if (el.hasAttribute("data-count")) runCount(el);
      if (el.classList.contains("skill-bar")) el.style.width = el.dataset.width;
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-title], [data-count], .skill-bar").forEach((el) => io.observe(el));

  /* ==========================================================
     TYPING ANIMATION
  ========================================================== */
  (function () {
    const typingText = document.querySelector(".typing-text");
    if (!typingText) return;
    const roles = ["Full Stack Developer", "Python Backend Engineer", "UI/UX Enthusiast", "Enterprise System Builder"];
    let r = 0, c = 0, deleting = false;
    (function type() {
      const cur = roles[r];
      if (!deleting) {
        typingText.textContent = cur.substring(0, c++);
        if (c > cur.length) { deleting = true; return setTimeout(type, 1500); }
      } else {
        typingText.textContent = cur.substring(0, c--);
        if (c < 0) { deleting = false; r = (r + 1) % roles.length; }
      }
      setTimeout(type, deleting ? 45 : 85);
    })();
  })();

  /* ==========================================================
     3D TILT ON PROJECT CARDS
  ========================================================== */
  if (!reduce) {
    document.querySelectorAll(".custom-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = -((e.clientY - r.top - r.height / 2) / 18);
        const ry = (e.clientX - r.left - r.width / 2) / 18;
        card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1200px) rotateX(0) rotateY(0) scale(1)";
      });
    });
  }

  /* ==========================================================
     MAGNETIC BUTTONS
  ========================================================== */
  if (!reduce && !window.matchMedia("(pointer:coarse)").matches) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* ==========================================================
     NAV — scrolled state, active link, close on mobile tap
  ========================================================== */
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 60);
    let current = "";
    sections.forEach((s) => { if (window.scrollY >= s.offsetTop - 150) current = s.id; });
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
  });

  document.querySelectorAll("#navMenu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu && menu.classList.contains("show") && window.bootstrap) {
        (bootstrap.Collapse.getInstance(menu) || new bootstrap.Collapse(menu, { toggle: false })).hide();
      }
    });
  });

  /* ==========================================================
     SCROLL PROGRESS + BACK TO TOP
  ========================================================== */
  const progressBar = document.querySelector(".scroll-progress");
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    const st = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (dh > 0 ? (st / dh) * 100 : 0) + "%";
    if (toTop) toTop.classList.toggle("show", st > 500);
  });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ==========================================================
     EMAILJS CONTACT FORM
  ========================================================== */
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: "1lvTtN7BdtzYOQqo1" });
    const form = document.getElementById("contact-form");
    const btn = document.getElementById("button");
    const status = document.getElementById("form-status");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (btn) { btn.innerText = "Sending..."; btn.disabled = true; }
        emailjs.sendForm("service_g88l19i", "template_pdwsg69", this).then(() => {
          if (status) { status.innerText = "✅ Message sent successfully!"; status.style.color = "#28a745"; }
          if (btn) { btn.innerText = "Send Message"; btn.disabled = false; }
          form.reset();
          if (status) setTimeout(() => (status.innerText = ""), 4000);
        }).catch(() => {
          if (status) { status.innerText = "❌ Failed to send. Please try again."; status.style.color = "#ff6b6b"; }
          if (btn) { btn.innerText = "Send Message"; btn.disabled = false; }
        });
      });
    }
  }

});
