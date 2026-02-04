function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

window.addEventListener("load", () => {
  document.getElementById("page-transition").classList.add("hide");
});

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#")) {
      e.preventDefault();
      const transition = document.getElementById("page-transition");
      transition.classList.remove("hide");
      setTimeout(() => {
        window.location.href = href;
      }, 700);
    }
  });
});
/* ===== MAGNETIC BUTTON EFFECT ===== */
const magneticButtons = document.querySelectorAll(".magnetic-btn");

magneticButtons.forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

/* ===== SPLIT TEXT (SCROLL TRIGGERED) ===== */
document.querySelectorAll(".split-scroll").forEach(text => {
  const letters = text.textContent.split("");
  text.textContent = "";

  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.animationDelay = `${index * 0.04}s`;
    text.appendChild(span);
  });
});

gsap.registerPlugin(ScrollTrigger);

/* SPLIT TEXT */
document.querySelectorAll(".gsap-text").forEach(text => {
  const letters = text.textContent.split("");
  text.textContent = "";

  letters.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    text.appendChild(span);
  });
gsap.fromTo(
  text.querySelectorAll("span"),
  { y: 80, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "expo.out",
    stagger: 0.05,
    scrollTrigger: {
      trigger: text,
      start: "top 85%",
    }
  }
);
});
const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-links li");

let menuOpen = false;

/* TIMELINE */
const menuTL = gsap.timeline({ paused: true });

menuTL
  .to(menuOverlay, {
    y: "0%",
    duration: 1,
    ease: "expo.inOut"
  })
  .from(menuLinks, {
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power4.out"
  }, "-=0.5");

/* TOGGLE */
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuTL.play();
  } else {
    menuTL.reverse();
  }
  menuOpen = !menuOpen;
});
const toggle = document.querySelector(".theme-toggle");
let isLight = false;

toggle.addEventListener("click", () => {
  isLight = !isLight;

  gsap.to("body", {
    duration: 0.6,
    ease: "power2.inOut",
    onStart: () => {
      document.body.classList.toggle("light");
    }
  });

  gsap.fromTo(
    ".theme-toggle span",
    { rotate: 0 },
    { rotate: 360, duration: 0.6, ease: "power2.out" }
  );
});
document.querySelectorAll(".footer-links a").forEach(link => {
  const strength = 0.25;

  link.addEventListener("mousemove", e => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(link, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)"
    });
  });
});
const cursor = document.querySelector(".cursor");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

/* Mouse move */
window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.opacity = 1;
});

/* Smooth follow */
gsap.ticker.add(() => {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;

  gsap.set(cursor, {
    x: cursorX,
    y: cursorY
  });
});

/* Hover grow */
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.classList.add("active"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
