/* main.js - Typing animation, reveal on scroll, form handling */
(function () {
  "use strict";

  // Typing effect on home page
  function typeText(id, text, speed = 70) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = "";
    let i = 0;
    function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i++);
        setTimeout(step, speed);
      }
    }
    step();
  }

  // Reveal elements on scroll
  function initReveal() {
    const els = document.querySelectorAll(".glass, .card, .project-card, .skills-grid, .skill-card");
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.transform = "translateY(0px)";
          e.target.style.opacity = 1;
          e.target.style.transition = "all 600ms cubic-bezier(.2,.9,.25,1)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = "translateY(10px)";
      obs.observe(el);
    });
  }

  // Simple client-side form handler (no email backend)
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
        ts: new Date().toISOString()
      };
      // For now just log and show success toast. To actually send: hook up Formspree or Netlify.
      console.log("Contact form submission:", data);
      alert("Thanks! Message captured locally. To receive emails, configure a server or Formspree.");
      form.reset();
    });
  }

  // Progress bars for skills (reads --pct style)
  function initSkillBars() {
    const spans = document.querySelectorAll(".skill-bar span");
    spans.forEach(s => {
      const pctRaw = s.getAttribute("style") || "";
      // style attribute is like --pct:95%
      const match = pctRaw.match(/--pct\s*:\s*([0-9]{1,3}%)/);
      const pct = match ? match[1] : "70%";
      // set CSS variable so animation works
      s.style.setProperty("--pct", pct);
      // trigger grow animation by forcing reflow
      s.style.width = pct;
    });
  }

  // Initialize everything when DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    typeText("typing", "Hi, I\\'m Samuel Kyuni Shallom — Full-Stack Verified Junior Developer", 45);
    initReveal();
    initContactForm();
    initSkillBars();
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("agreementModal");
  const acceptBtn = document.getElementById("acceptBtn");
  const typingElement = document.getElementById("typing");

  if (modal) {
    modal.style.display = "flex";
    acceptBtn.addEventListener("click", () => {
      modal.style.display = "none";
      if (typingElement) {
        typingElement.textContent = "Welcome to CodeHub 🎉";
      }
    });
  }
});
