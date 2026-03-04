(() => {
  const root = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const backToTop = document.querySelector(".back-to-top");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const yearSpan = document.getElementById("year");

  // Year in footer
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Theme setup
  const THEME_KEY = "ai-portfolio-theme";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
  };

  const savedTheme = window.localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore
    }
  });

  // Back to top visibility
  const onScroll = () => {
    const show = window.scrollY > 240;
    if (!backToTop) return;
    backToTop.classList.toggle("visible", show);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Back to top action
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile nav toggle
  navToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
  });

  // Close mobile nav when clicking a link
  if (navLinks) {
    navLinks.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("open");
      }
    });
  }
})();

