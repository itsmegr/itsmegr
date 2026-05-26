const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const releaseData = {
  oracle: {
    name: "Oracle Search Cloud Service",
    summary:
      "Multi-tenant OpenSearch SaaS platform on OCI, with production ownership across scale, reliability, migrations, rate limiting, and AI-assisted observability.",
    scope: "500+ clusters",
    mode: "production ownership",
    signature: "calm under load",
  },
  takomodo: {
    name: "TAKOMODO Agentic AI Platform",
    summary:
      "A founder-style product branch: Go-native agent framework, PostgreSQL backend, Redis scheduling, retries, Dockerized deploys, and CI/CD for social moderation workflows.",
    scope: "AI SaaS buildout",
    mode: "team lead + builder",
    signature: "fast shipping, durable core",
  },
  mable: {
    name: "Mable.AI Event Pipeline",
    summary:
      "Early-stage ecommerce analytics infrastructure: tracking scripts, onboarding automation, webhook integrations, Kubernetes deployments, and behavioral event delivery.",
    scope: "startup backend",
    mode: "end-to-end ownership",
    signature: "product sense under pressure",
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
    name: "NIT Warangal Foundation",
    summary:
      "Computer Science and Engineering fundamentals that shaped the first-principles approach: systems, algorithms, databases, networks, and debugging discipline.",
    scope: "B.Tech CSE",
    mode: "foundation",
    signature: "curiosity compiled",
  },
};

const architectureData = {
  tenants: {
    title: "Tenant isolation as a first-class system concern",
    body:
      "Large multi-tenant platforms fail in unfair ways unless they identify load, contain blast radius, and preserve quality of service across customers.",
    metrics: ["fairness", "blast-radius control", "service stability"],
    code: `if tenant.bursts():
    protect_cluster()
    preserve_fairness()
    emit_evidence()`,
  },
  guard: {
    title: "Cluster-aware rate limiting for noisy-neighbor mitigation",
    body:
      "The guardrail understands cluster pressure, tenant behavior, and burst patterns so the platform can remain fair without turning every incident into manual traffic policing.",
    metrics: ["Java", "traffic bursts", "resource fairness"],
    code: `RateDecision decide(Tenant tenant, ClusterState state) {
  return state.isHot()
      ? limiter.shape(tenant)
      : limiter.allow(tenant);
}`,
  },
  migrations: {
    title: "Near-zero-downtime migrations as a repeatable release path",
    body:
      "Customer movement across clusters becomes safer when Cross-Cluster Replication, validation, automation, and rollback thinking are part of the migration framework.",
    metrics: ["OpenSearch CCR", "automation", "tenant mobility"],
    code: `plan = migration.createPlan(source, target)
plan.enableReplication()
plan.validateLag()
plan.cutTrafficWhenReady()`,
  },
  clusters: {
    title: "OpenSearch fleet engineering at production scale",
    body:
      "500+ clusters and 100M+ daily requests require more than feature work: capacity awareness, fault tolerance, operational fixes, and sober on-call judgement.",
    metrics: ["500+ clusters", "100M+ req/day", "OCI"],
    code: `while service.isLive():
    watch_slos()
    patch_failure_modes()
    automate_the_next_pager()`,
  },
  observability: {
    title: "LLM-powered RCA that cites its evidence",
    body:
      "The agent gathers metrics, logs, and cluster state, then reasons through tool calls to identify offending tenants, indexes, and failure signatures with on-call-ready context.",
    metrics: ["3h -> 10m", "tool use", "evidence-backed RCA"],
    code: `agent.loop([
  collectMetrics(),
  inspectLogs(),
  queryClusterState(),
  explainRootCause()
])`,
  },
  takomodo: {
    title: "Agentic product architecture for social moderation",
    body:
      "TAKOMODO translates founder energy into a product system: native Go agents, scheduling, retries, engagement tracking, and production release automation.",
    metrics: ["Go", "PostgreSQL", "Redis scheduler"],
    code: `agent.respond({
  brandVoice,
  moderationPolicy,
  conversationContext,
  retryBudget
})`,
  },
};

const terminalCommands = [
  "git log --graph --career --scale",
  "kubectl get clusters --tenant-aware",
  "deploy --strategy near-zero-downtime",
  "agent rca --evidence metrics,logs,cluster-state",
  "git merge branch/takomodo-agent-runtime",
  "tail -f production-empathy.log",
];

const deployLines = [
  "> running production empathy checks...",
  "> guardrails: tenant fairness, rollback path, observability hooks",
  "> synthetic load: bursty tenants, migration lag, partial failures",
  "> ai-agent: collecting logs, metrics, cluster state snapshots",
  "> status: shipped, watched, improved",
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
    summary.textContent = data.summary;
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
}

function setupArchitecture() {
  const nodes = $$(".arch-node");
  const title = $("#archTitle");
  const body = $("#archBody");
  const metrics = $("#archMetrics");
  const code = $("#archCode");

  const render = (key) => {
    const data = architectureData[key];
    if (!data) return;

    nodes.forEach((node) => {
      node.classList.toggle("active", node.dataset.arch === key);
    });
    title.textContent = data.title;
    body.textContent = data.body;
    metrics.replaceChildren(
      ...data.metrics.map((metric) => {
        const chip = document.createElement("span");
        chip.textContent = metric;
        return chip;
      })
    );
    code.textContent = data.code;
  };

  nodes.forEach((node) => {
    node.addEventListener("click", () => render(node.dataset.arch));
  });
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

function setupPipelineProgress() {
  const pipeline = $(".deploy-pipeline");
  if (!pipeline) return;

  if (prefersReducedMotion) {
    pipeline.style.setProperty("--pipeline-progress", "100%");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      pipeline.style.setProperty("--pipeline-progress", entry.isIntersecting ? "100%" : "0%");
    },
    { threshold: 0.42 }
  );

  observer.observe(pipeline);
}

function setupDeployLog() {
  const log = $("#deployLog");
  if (!log || prefersReducedMotion) return;

  let index = 0;
  window.setInterval(() => {
    const line = document.createElement("p");
    line.textContent = deployLines[index % deployLines.length];
    log.appendChild(line);
    while (log.children.length > 5) log.removeChild(log.firstElementChild);
    index += 1;
  }, 2100);
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
          context.strokeStyle = `rgba(118, 245, 207, ${alpha})`;
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
      gradient.addColorStop(0, "rgba(100, 244, 196, 0.9)");
      gradient.addColorStop(1, "rgba(100, 244, 196, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, 18, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = node.r > 2 ? "#f1fff8" : "#64f4c4";
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

setupReveal();
setupScrollProgress();
setupCursorGlow();
setupTerminalTicker();
setupTimelineInspector();
setupArchitecture();
setupSkillFilters();
setupPipelineProgress();
setupDeployLog();
setupCopyEmail();
setupNavSpy();
setupTopologyCanvas();
