/* ============================================================
   Digivalley — interactions
   parallax · scroll-reveal · nav · visionary profiles
   ============================================================ */
(function () {
  "use strict";

  /* ---------- HERO BACKGROUND SLIDER ---------- */
  const heroImages = [
    "images/Gemini_Generated_Image_m3vckcm3vckcm3vc.png",
    "images/e4bb87be-6221-4b55-80dc-305d5354cf03.jpeg",
    "images/de4fe0e7-a7cf-4eaf-bdb9-bb053280e89b.jpeg",
    "images/Gemini_Generated_Image_hrgf7uhrgf7uhrgf.png",
    "images/Gemini_Generated_Image_8wi7xt8wi7xt8wi7.png",
    "images/Gemini_Generated_Image_r74bfsr74bfsr74b.png",
    "images/Gemini_Generated_Image_gl8ni9gl8ni9gl8n.png",
  ];
  const slider = document.getElementById("heroSlider");
  const dotsWrap = document.getElementById("heroDots");

  if (slider) {
    const slides = [];
    const dots = [];
    heroImages.forEach((src, i) => {
      const s = document.createElement("div");
      s.className = "hero__slide" + (i === 0 ? " is-active" : "");
      s.style.backgroundImage = 'url("' + src + '")';
      slider.appendChild(s);
      slides.push(s);

      if (dotsWrap) {
        const d = document.createElement("button");
        d.type = "button";
        d.setAttribute("role", "tab");
        d.setAttribute("aria-label", "Show image " + (i + 1));
        if (i === 0) d.classList.add("is-active");
        d.addEventListener("click", () => go(i, true));
        dotsWrap.appendChild(d);
        dots.push(d);
      }
    });

    // preload
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let cur = 0;
    let timer = null;
    const DELAY = 5000;

    function go(n, manual) {
      slides[cur].classList.remove("is-active");
      if (dots[cur]) dots[cur].classList.remove("is-active");
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add("is-active");
      if (dots[cur]) dots[cur].classList.add("is-active");
      if (manual) restart();
    }
    function next() { go(cur + 1, false); }
    function start() { timer = window.setInterval(next, DELAY); }
    function restart() { if (timer) window.clearInterval(timer); start(); }

    if (slides.length > 1) start();

    // pause when tab hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { if (timer) window.clearInterval(timer); }
      else if (slides.length > 1) restart();
    });
  }

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
