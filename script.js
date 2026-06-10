/* ============================================================
   Digivalley — interactions
   parallax · scroll-reveal · nav · visionary profiles
   ============================================================ */
(function () {
  "use strict";

  /* ---------- NAV: scrolled state + mobile toggle ---------- */
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- PARALLAX ---------- */
  const layers = Array.from(document.querySelectorAll("[data-parallax]"));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  function parallax() {
    const vh = window.innerHeight;
    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  }
  if (!prefersReduced && layers.length) {
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(parallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    parallax();
  }

  /* ---------- VISIONARIES (20+ placeholder profiles) ---------- */
  const people = [
    ["Dr. Anjali Menon", "Chief Vision Architect"],
    ["Rahul Varghese", "Sustainable IT Infrastructure"],
    ["Meera Krishnan", "Ecology & Biodiversity"],
    ["Thomas Mathew", "Plantation Partnerships"],
    ["Fatima Rasheed", "Community Development"],
    ["Arjun Pillai", "Green Energy & Microgrids"],
    ["Dr. Leela Nair", "UNESCO Heritage Liaison"],
    ["Sanjay Gupta", "Enterprise Relations"],
    ["Priya Raveendran", "Architecture & Design"],
    ["Imran Khan", "Network & Connectivity"],
    ["Kavya Suresh", "Agri-Tech Research"],
    ["David Joseph", "Tourism Strategy"],
    ["Neha Bhat", "Policy & Governance"],
    ["Vikram Reddy", "Data & Eco-Computing"],
    ["Aishwarya Iyer", "Hospitality & Homestays"],
    ["Mohammed Ali", "Local Skills & Training"],
    ["Sneha Pillai", "Climate & Microclimate"],
    ["Rajesh Kumar", "Civil & Modular Build"],
    ["Divya Antony", "Brand & Storytelling"],
    ["Gautam Shenoy", "Finance & Investment"],
    ["Lakshmi Warrier", "Indigenous Affairs"],
    ["Joseph Chacko", "Logistics & Transit"],
    ["Ananya Das", "Wellness & Deep-Work"],
    ["Hari Govind", "Open Innovation Lab"],
  ];

  // watercolour gradient pairs for avatars
  const washes = [
    ["#a8c6a1", "#6f9b76"],
    ["#aac6d6", "#6f9bb0"],
    ["#8fc7be", "#5fa39a"],
    ["#e0a98c", "#c98763"],
    ["#c4b6dc", "#9a87c0"],
    ["#ead8a6", "#cdb56f"],
  ];

  function initials(name) {
    return name
      .replace(/^(Dr\.|Mr\.|Ms\.)\s+/i, "")
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  const container = document.getElementById("people");
  if (container) {
    const frag = document.createDocumentFragment();
    people.forEach((p, i) => {
      const [name, role] = p;
      const [c1, c2] = washes[i % washes.length];
      const card = document.createElement("div");
      card.className = "person reveal";
      card.style.setProperty("--i", String((i % 6)));
      card.innerHTML =
        '<div class="person__av" style="background:radial-gradient(circle at 35% 30%, ' +
        c1 +
        ", " +
        c2 +
        ')">' +
        initials(name) +
        "</div>" +
        '<div class="person__name">' +
        name +
        "</div>" +
        '<div class="person__role">' +
        role +
        "</div>";
      frag.appendChild(card);
    });
    container.appendChild(frag);

    // observe the freshly-added cards for reveal
    if ("IntersectionObserver" in window) {
      const io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io2.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      container.querySelectorAll(".reveal").forEach((el) => io2.observe(el));
    } else {
      container.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    }
  }

  /* ---------- JOIN form (concept demo) ---------- */
  const form = document.querySelector(".join__form");
  if (form) {
    form.addEventListener("submit", () => {
      const btn = form.querySelector(".btn");
      if (btn) {
        btn.textContent = "Thank you — we'll be in touch 🌿";
        btn.style.pointerEvents = "none";
      }
    });
  }
})();
