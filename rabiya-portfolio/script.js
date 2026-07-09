// ============================================================
// Footer year
// ============================================================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// ============================================================
// Terminal typing animation (hero signature element)
// ============================================================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const terminalLines = [
  { text: "$ node agent.js --run job_hunter", cls: "" },
  { text: "> parsing resume.pdf ...", cls: "" },
  { text: "> extracted skills: [Python, LangChain, Agentic AI, NLP, FastAPI]", cls: "" },
  { text: "> querying live listings via RapidAPI ...", cls: "" },
  { text: "> 42 matching roles found", cls: "ok" },
  { text: "> scoring matches ...", cls: "" },
  { text: "> best_match: 94% — Senior AI Engineer, Remote", cls: "ok" },
  { text: "> generating tailored cover letter ...", cls: "" },
  { text: "> status: application_ready ✔", cls: "ok" },
];

const terminalBody = document.getElementById("terminalBody");

function renderStatic() {
  if (!terminalBody) return;
  terminalBody.innerHTML = terminalLines
    .map((l) => `<div class="${l.cls}">${escapeHtml(l.text)}</div>`)
    .join("");
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

async function typeTerminal() {
  if (!terminalBody) return;
  terminalBody.innerHTML = "";

  for (const line of terminalLines) {
    const row = document.createElement("div");
    if (line.cls) row.className = line.cls;
    terminalBody.appendChild(row);

    for (let i = 0; i < line.text.length; i++) {
      row.textContent = line.text.slice(0, i + 1);
      await sleep(10 + Math.random() * 14);
    }
    await sleep(220);
  }

  const caret = document.createElement("span");
  caret.className = "caret";
  terminalBody.appendChild(caret);

  // loop after a pause
  await sleep(2600);
  if (!prefersReducedMotion) typeTerminal();
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

if (terminalBody) {
  if (prefersReducedMotion) {
    renderStatic();
  } else {
    // start once the terminal scrolls into view
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeTerminal();
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(terminalBody);
  }
}

// ============================================================
// Scroll reveal for sections
// ============================================================
const revealTargets = document.querySelectorAll(
  ".section-head, .about-copy, .skill-row, .feature-card, .project-card, .tl-item"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("in-view"));
}
