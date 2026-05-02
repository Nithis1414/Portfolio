/* ============================================
   PORTFOLIO — APP LOGIC
   Interactivity, animations & customization
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initContent();
  initNavigation();
  initScrollReveal();
  initTypingEffect();
  initParticles();
  initCustomizationPanel();
  applyThemeFromConfig();
  initCustomCursor();
});

/* ─── Custom Cursor ────────────────────────── */
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animate() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  // Add hover effect for interactive elements
  const interactiveSelector = 'a, button, input, textarea, .highlight-card, .skill-card, .project-card, .cert-card, .timeline-item';
  
  function addHoverListeners() {
    document.querySelectorAll(interactiveSelector).forEach(el => {
      // Avoid adding multiple listeners if re-initialized
      if (el.dataset.cursorHoverAttached) return;
      el.dataset.cursorHoverAttached = 'true';
      
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }
  
  addHoverListeners();
  
  // Re-apply listeners if DOM elements change
  const observer = new MutationObserver((mutations) => {
    addHoverListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ─────────────────────────────────────────────
   1. POPULATE CONTENT FROM CONFIG
   ───────────────────────────────────────────── */
function initContent() {
  const c = CONFIG;

  // Hero
  document.getElementById("hero-name").textContent = `${c.personal.firstName} ${c.personal.lastName}`;
  document.getElementById("hero-title").textContent = c.personal.title;
  document.getElementById("nav-logo").textContent = `${c.personal.firstName}.`;
  if (c.personal.resumeLink && c.personal.resumeLink !== "#") {
    document.getElementById("resume-btn").href = c.personal.resumeLink;
  }

  // Hero Socials
  const heroSocials = document.querySelector(".hero-socials");
  if (heroSocials) {
    let html = "";
    if (c.social.email) html += `<a href="mailto:${c.social.email}" class="highlighted-icon" title="Email"><i class="fas fa-envelope"></i></a>`;
    if (c.social.linkedin) html += `<a href="${c.social.linkedin}" target="_blank" class="highlighted-icon" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
    if (c.social.github && c.social.github !== "#") html += `<a href="${c.social.github}" target="_blank" class="highlighted-icon" title="GitHub"><i class="fab fa-github"></i></a>`;
    heroSocials.innerHTML = html;
  }

  // About
  document.getElementById("about-heading").textContent = c.about.heading;
  document.getElementById("about-description").textContent = c.about.description;

  // Avatar
  if (c.personal.avatar) {
    document.getElementById("avatar-frame").innerHTML = `<img src="${c.personal.avatar}" alt="Avatar" />`;
  }

  // About highlights
  const highlightsEl = document.getElementById("about-highlights");
  highlightsEl.innerHTML = c.about.highlights
    .map(
      (h) => `
    <div class="highlight-card">
      <div class="label">${h.label}</div>
      <div class="value">${h.value}</div>
    </div>`
    )
    .join("");

  // Skills
  const skillsGrid = document.getElementById("skills-grid");
  const groupedSkills = c.skills.reduce((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  skillsGrid.innerHTML = Object.entries(groupedSkills)
    .map(([category, skills]) => `
      <div class="skill-category-group reveal">
        <h3 class="category-title">${category}</h3>
      </div>
      ${skills.map((s, i) => `
        <div class="skill-card reveal">
          <div class="skill-card-header">
            <div class="skill-icon"><i class="${s.icon}"></i></div>
          </div>
          <div class="skill-name">${s.name}</div>
        </div>
      `).join("")}
    `).join("");

  // Projects
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = c.projects
    .map(
      (p) => `
    <div class="project-card reveal">
      ${p.featured ? '<span class="featured-tag">Featured</span>' : ""}
      <div class="project-image">
        ${
          p.image
            ? `<img src="${p.image}" alt="${p.title}" />`
            : '<i class="fas fa-rocket placeholder-icon"></i>'
        }
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.description}</p>
      <div class="project-tech">
        ${p.techStack.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        ${
          p.liveLink && p.liveLink !== "#"
            ? `<a href="${p.liveLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
            : ""
        }
        ${
          p.repoLink && p.repoLink !== "#"
            ? `<a href="${p.repoLink}" target="_blank"><i class="fab fa-github"></i> Source Code</a>`
            : ""
        }
        ${
          (!p.liveLink || p.liveLink === "#") && (!p.repoLink || p.repoLink === "#")
            ? '<span style="color:var(--text-muted);font-size:0.82rem;">Links coming soon</span>'
            : ""
        }
      </div>
    </div>`
    )
    .join("");

  // Hackathons
  const hackathonsGrid = document.getElementById("hackathons-grid");
  if (hackathonsGrid && c.hackathons) {
    hackathonsGrid.innerHTML = c.hackathons
      .map(
        (h) => `
      <div class="project-card reveal">
        <h3 class="project-title">${h.title}</h3>
        <p class="project-desc"><strong>Project:</strong> ${h.project}</p>
        <p class="project-desc">${h.description}</p>
      </div>`
      )
      .join("");
  }

  // Certifications
  const certsGrid = document.getElementById("certs-grid");
  certsGrid.innerHTML = c.certifications
    .map(
      (cert) => `
    <div class="cert-card reveal">
      <div class="cert-icon"><i class="${cert.icon}"></i></div>
      <div class="cert-info">
        <div class="cert-title">${cert.title}</div>
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-date">${cert.date}</div>
      </div>
    </div>`
    )
    .join("");

  // Timeline
  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = c.timeline
    .map(
      (t) => `
    <div class="timeline-item reveal">
      <span class="timeline-type ${t.type}">${t.type}</span>
      <h3 class="timeline-title">${t.title}</h3>
      <div class="timeline-org">${t.organization}</div>
      <div class="timeline-period">${t.period}</div>
      <p class="timeline-desc">${t.description}</p>
    </div>`
    )
    .join("");

  // Contact links
  const contactLinks = document.getElementById("contact-links");
  const socials = [];
  if (c.social.phone)
    socials.push(`<a href="tel:${c.social.phone}" class="contact-link"><i class="fas fa-phone"></i>${c.social.phone}</a>`);
  if (c.social.email)
    socials.push(`<a href="mailto:${c.social.email}" class="contact-link"><i class="fas fa-envelope"></i>${c.social.email}</a>`);

  if (c.social.twitter)
    socials.push(`<a href="${c.social.twitter}" target="_blank" class="contact-link"><i class="fab fa-twitter"></i>Twitter</a>`);
  contactLinks.innerHTML = socials.join("");

  // Footer
  document.getElementById("footer-year").textContent = new Date().getFullYear();
  document.getElementById("footer-name").textContent = `${c.personal.firstName} ${c.personal.lastName}`;
}

/* ─────────────────────────────────────────────
   2. NAVIGATION
   ───────────────────────────────────────────── */
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("nav-hamburger");
  const navLinks = document.getElementById("nav-links");
  const links = navLinks.querySelectorAll("a");

  // Scroll effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    updateActiveLink();
  });

  // Hamburger
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close mobile menu on link click
  links.forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  function updateActiveLink() {
    const sections = document.querySelectorAll("section");
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  updateActiveLink();
}

/* ─────────────────────────────────────────────
   3. SCROLL REVEAL
   ───────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────────
   4. TYPING EFFECT
   ───────────────────────────────────────────── */
function initTypingEffect() {
  if (!CONFIG.theme.enableTypingEffect) {
    document.getElementById("typed-text").textContent = CONFIG.personal.taglines[0] || "";
    return;
  }

  const taglines = CONFIG.personal.taglines;
  const typedEl = document.getElementById("typed-text");
  let taglineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 80;

  function type() {
    const current = taglines[taglineIdx];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx--);
      speed = 40;
    } else {
      typedEl.textContent = current.substring(0, charIdx++);
      speed = 80;
    }

    if (!isDeleting && charIdx > current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx < 0) {
      isDeleting = false;
      taglineIdx = (taglineIdx + 1) % taglines.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ─────────────────────────────────────────────
   5. PARTICLES BACKGROUND
   ───────────────────────────────────────────── */
let particlesActive = true;
let particlesAnimationId = null;

function initParticles() {
  if (!CONFIG.theme.enableParticles) {
    particlesActive = false;
    return;
  }

  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    if (!particlesActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particlesAnimationId = requestAnimationFrame(animate);
  }

  animate();
}

function toggleParticles(enabled) {
  particlesActive = enabled;
  const canvas = document.getElementById("particles-canvas");
  if (enabled) {
    canvas.style.display = "block";
    initParticles();
  } else {
    canvas.style.display = "none";
    if (particlesAnimationId) cancelAnimationFrame(particlesAnimationId);
  }
}

/* ─────────────────────────────────────────────
   6. CUSTOMIZATION PANEL
   ───────────────────────────────────────────── */
function initCustomizationPanel() {
  const openBtn = document.getElementById("open-customize");
  const closeBtn = document.getElementById("close-customize");
  const overlay = document.getElementById("customize-overlay");
  const panel = document.getElementById("customize-panel");

  function openPanel() { panel.classList.add("open"); overlay.classList.add("open"); }
  function closePanel() { panel.classList.remove("open"); overlay.classList.remove("open"); }

  openBtn.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);

  // Mobile: add a floating customize button
  const fab = document.createElement("button");
  fab.className = "nav-customize-btn";
  fab.id = "fab-customize";
  fab.innerHTML = '<i class="fas fa-palette"></i>';
  fab.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:999;display:none;width:52px;height:52px;border-radius:50%;justify-content:center;padding:0;font-size:1.2rem;box-shadow:var(--glow-primary);";
  document.body.appendChild(fab);
  fab.addEventListener("click", openPanel);

  function checkFab() {
    fab.style.display = window.innerWidth <= 768 ? "flex" : "none";
  }
  checkFab();
  window.addEventListener("resize", checkFab);

  // Primary color swatches
  document.querySelectorAll("#primary-colors .color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll("#primary-colors .color-swatch").forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");
      setPrimaryColor(swatch.dataset.color);
      document.getElementById("custom-primary").value = swatch.dataset.color;
    });
  });

  document.getElementById("custom-primary").addEventListener("input", (e) => {
    document.querySelectorAll("#primary-colors .color-swatch").forEach((s) => s.classList.remove("active"));
    setPrimaryColor(e.target.value);
  });

  // Secondary color swatches
  document.querySelectorAll("#secondary-colors .color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll("#secondary-colors .color-swatch").forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");
      setSecondaryColor(swatch.dataset.color);
      document.getElementById("custom-secondary").value = swatch.dataset.color;
    });
  });

  document.getElementById("custom-secondary").addEventListener("input", (e) => {
    document.querySelectorAll("#secondary-colors .color-swatch").forEach((s) => s.classList.remove("active"));
    setSecondaryColor(e.target.value);
  });

  // Dark mode toggle
  document.getElementById("dark-mode-toggle").addEventListener("change", (e) => {
    toggleDarkMode(e.target.checked);
  });

  // Font options
  document.querySelectorAll(".font-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".font-option").forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      document.documentElement.style.setProperty("--font-family", opt.dataset.font);
      document.body.style.fontFamily = opt.dataset.font;
    });
  });

  // Particles toggle
  document.getElementById("particles-toggle").addEventListener("change", (e) => {
    toggleParticles(e.target.checked);
  });

  // Reset
  document.getElementById("reset-theme").addEventListener("click", () => {
    applyThemeFromConfig();
    // Reset UI
    document.querySelectorAll("#primary-colors .color-swatch").forEach((s, i) => s.classList.toggle("active", i === 0));
    document.querySelectorAll("#secondary-colors .color-swatch").forEach((s, i) => s.classList.toggle("active", i === 0));
    document.querySelectorAll(".font-option").forEach((o, i) => o.classList.toggle("active", i === 0));
    document.getElementById("dark-mode-toggle").checked = true;
    document.getElementById("particles-toggle").checked = true;
    document.getElementById("custom-primary").value = CONFIG.theme.primaryColor;
    document.getElementById("custom-secondary").value = CONFIG.theme.secondaryColor;
    toggleParticles(true);
  });
}

/* ─── Theme Helpers ────────────────────────── */
function setPrimaryColor(color) {
  const r = document.documentElement;
  r.style.setProperty("--primary", color);
  r.style.setProperty("--glow-primary", `0 0 40px ${color}40`);
}

function setSecondaryColor(color) {
  const r = document.documentElement;
  r.style.setProperty("--secondary", color);
  r.style.setProperty("--glow-secondary", `0 0 40px ${color}33`);
}

function toggleDarkMode(dark) {
  const r = document.documentElement;
  if (dark) {
    r.style.setProperty("--bg-dark", CONFIG.theme.bgDark || "#0a0a1a");
    r.style.setProperty("--bg-darker", "#060613");
    r.style.setProperty("--bg-card", "rgba(255,255,255,0.04)");
    r.style.setProperty("--bg-card-hover", "rgba(255,255,255,0.08)");
    r.style.setProperty("--glass-border", "rgba(255,255,255,0.08)");
    r.style.setProperty("--text-primary", "#EAEAEA");
    r.style.setProperty("--text-secondary", "#A0A0B0");
    r.style.setProperty("--text-muted", "#636380");
  } else {
    r.style.setProperty("--bg-dark", "#f5f5fa");
    r.style.setProperty("--bg-darker", "#eeeef5");
    r.style.setProperty("--bg-card", "rgba(255,255,255,0.7)");
    r.style.setProperty("--bg-card-hover", "rgba(255,255,255,0.9)");
    r.style.setProperty("--glass-border", "rgba(0,0,0,0.08)");
    r.style.setProperty("--text-primary", "#1a1a2e");
    r.style.setProperty("--text-secondary", "#4a4a6a");
    r.style.setProperty("--text-muted", "#8888a0");
  }
}

function applyThemeFromConfig() {
  const t = CONFIG.theme;
  setPrimaryColor(t.primaryColor);
  setSecondaryColor(t.secondaryColor);
  document.documentElement.style.setProperty("--bg-dark", t.bgDark);
  document.documentElement.style.setProperty("--font-family", t.fontFamily);
  document.body.style.fontFamily = t.fontFamily;
}

/* ─── Contact Form (basic) ─────────────────── */
document.addEventListener("submit", (e) => {
  if (e.target.id === "contact-form") {
    e.preventDefault();
    const btn = e.target.querySelector("button[type='submit']");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = "linear-gradient(135deg, #00D4AA, #00B894)";
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      e.target.reset();
    }, 2500);
  }
});
