const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const releaseData = {
  oracle: {
    name: "Oracle Search Cloud Service",
    summary:
      "Large-scale OpenSearch infrastructure on OCI, focused on reliability, automation, tenant fairness, migrations, and observability.",
    scope: "600+ clusters",
    mode: "backend + platform",
    signature: "reliability at scale",
  },
  takomodo: {
    name: "TAKOMODO",
    summary:
      "An agentic AI product for social media moderation, automated replies, scheduling, and engagement tracking.",
    scope: "AI product",
    mode: "team lead",
    signature: "practical AI systems",
  },
  mable: {
    name: "Mable.AI",
    summary:
      "Backend systems for ecommerce event tracking, webhook automation, onboarding, and analytics delivery.",
    scope: "startup backend",
    mode: "backend ownership",
    signature: "shipping fast",
  },
  oracleIntern: {
    name: "Oracle Visual Builder Studio CLI",
    summary:
      "Developer tooling in Java with Picocli, automating repeat environment setup and exposing the workflow as plugins inside a JavaScript-based ecosystem.",
    scope: "developer productivity",
    mode: "tooling + integration",
    signature: "remove repetitive work",
  },
  nit: {
    name: "NIT Warangal",
    summary:
      "Computer Science and Engineering foundation across algorithms, systems, databases, and networks.",
    scope: "B.Tech CSE",
    mode: "foundation",
    signature: "CS fundamentals",
  },
};


const terminalCommands = [
  "java service --tenant-aware",
  "go run agent-runtime",
  "kubectl get clusters",
  "observe logs metrics state",
  "ship reliable backend systems",
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function setupReveal() {
  const revealEls = $$(".reveal");
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function setupScrollProgress() {
  const bar = $(".scroll-progress span");
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupCursorGlow() {
  const glow = $(".cursor-glow");
  if (!glow || prefersReducedMotion) return;

  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.35;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true }
  );

  const animate = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    glow.style.transform = `translate3d(${currentX - glow.offsetWidth / 2}px, ${currentY - glow.offsetHeight / 2}px, 0)`;
    requestAnimationFrame(animate);
  };

  animate();
}

function setupTerminalTicker() {
  const line = $("#terminalLine");
  if (!line || prefersReducedMotion) return;

  let commandIndex = 0;
  let charIndex = terminalCommands[0].length;
  let deleting = true;

  const tick = () => {
    const command = terminalCommands[commandIndex];
    if (deleting) {
      charIndex -= 1;
      if (charIndex <= 0) {
        deleting = false;
        commandIndex = (commandIndex + 1) % terminalCommands.length;
      }
    } else {
      charIndex += 1;
      if (charIndex >= terminalCommands[commandIndex].length) {
        deleting = true;
        window.setTimeout(tick, 1450);
        return;
      }
    }

    line.textContent = terminalCommands[commandIndex].slice(0, charIndex);
    window.setTimeout(tick, deleting ? 24 : 46);
  };

  window.setTimeout(tick, 1300);
}

function setupTimelineInspector() {
  const cards = $$(".commit-card");
  const name = $("#releaseName");
  const summary = $("#releaseSummary");
  const scope = $("#releaseScope");
  const mode = $("#releaseMode");
  const signature = $("#releaseSignature");

  const selectRelease = (key) => {
    const data = releaseData[key];
    if (!data) return;

    cards.forEach((card) => {
      card.classList.toggle("active", card.dataset.release === key);
    });
    name.textContent = data.name;
    
    // On desktop, the sidebar inspector always displays the detailed technical bullets if they exist
    const activeCard = cards.find((card) => card.dataset.release === key);
    if (activeCard) {
      const detailsEl = activeCard.querySelector(".work-details");
      summary.innerHTML = detailsEl ? detailsEl.innerHTML : `<p>${data.summary}</p>`;
    } else {
      summary.textContent = data.summary;
    }
    
    scope.textContent = data.scope;
    mode.textContent = data.mode;
    signature.textContent = data.signature;
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => selectRelease(card.dataset.release));
    card.addEventListener("focus", () => selectRelease(card.dataset.release));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRelease(card.dataset.release);
      }
    });
  });

  // Initialize with the active card's release info on page load
  const activeCard = $(".commit-card.active");
  if (activeCard) {
    selectRelease(activeCard.dataset.release);
  }
}


function setupSkillFilters() {
  const filters = $$(".filter-chip");
  const cards = $$("#skillMatrix article");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.filter;
      filters.forEach((item) => {
        const active = item === filter;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });

      cards.forEach((card) => {
        const tags = card.dataset.skill.split(" ");
        const visible = selected === "all" || tags.includes(selected);
        card.classList.toggle("is-hidden", !visible);
      });
    });
  });
}

function setupCopyEmail() {
  const button = $("#copyEmail");
  if (!button) return;
  const email = "govind.r8769@gmail.com";
  const original = button.textContent;

  const fallbackCopy = () => {
    const input = document.createElement("textarea");
    input.value = email;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  };

  button.addEventListener("click", async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      } else {
        fallbackCopy();
      }
      button.textContent = "Copied";
    } catch {
      fallbackCopy();
      button.textContent = "Copied";
    }

    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
}

function setupNavSpy() {
  const links = $$(".site-nav a");
  const sections = links
    .map((link) => {
      const section = $(link.getAttribute("href"));
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      sections.forEach(({ link, section }) => {
        link.classList.toggle("active", section === visible.target);
      });
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: [0.08, 0.2, 0.5] }
  );

  sections.forEach(({ section }) => observer.observe(section));
}

function setupTopologyCanvas() {
  const canvas = $("#topologyCanvas");
  if (!canvas || prefersReducedMotion) return;

  const context = canvas.getContext("2d");
  const nodes = Array.from({ length: 34 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00042,
    vy: (Math.random() - 0.5) * 0.00042,
    r: index % 7 === 0 ? 2.5 : 1.6,
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const colors = {
      lineColor: isDark ? "rgba(100, 244, 196, " : "rgba(15, 118, 110, ",
      nodeGlow: isDark ? "rgba(100, 244, 196, " : "rgba(15, 118, 110, ",
      nodeColor: isDark ? "#64f4c4" : "#0f766e",
      nodeCore: isDark ? "#f1fff8" : "#0f172a"
    };

    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0.02 || node.x > 0.98) node.vx *= -1;
      if (node.y < 0.04 || node.y > 0.96) node.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const ax = a.x * width;
        const ay = a.y * height;
        const bx = b.x * width;
        const by = b.y * height;
        const distance = Math.hypot(ax - bx, ay - by);

        if (distance < 155) {
          const alpha = (1 - distance / 155) * 0.22;
          context.strokeStyle = `${colors.lineColor}${alpha})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(ax, ay);
          context.lineTo(bx, by);
          context.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      const x = node.x * width;
      const y = node.y * height;
      const gradient = context.createRadialGradient(x, y, 0, x, y, 18);
      gradient.addColorStop(0, `${colors.nodeGlow}0.9)`);
      gradient.addColorStop(1, `${colors.nodeGlow}0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, 18, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = node.r > 2 ? colors.nodeCore : colors.nodeColor;
      context.beginPath();
      context.arc(x, y, node.r, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const getSavedTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Initialize
  setTheme(getSavedTheme());

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current === "light" ? "dark" : "light");
  });
}

setupThemeToggle();
setupReveal();
setupScrollProgress();
setupCursorGlow();
setupTerminalTicker();
setupTimelineInspector();
setupSkillFilters();
setupCopyEmail();
setupNavSpy();
setupTopologyCanvas();
