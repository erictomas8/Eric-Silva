document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     IDADE
     ========================= */
  function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  const dataNascimento = "2002-07-10";
  const idadeEl = document.getElementById("idade");
  if (idadeEl) idadeEl.textContent = calcularIdade(dataNascimento);

  /* =========================
     CARROSSEL
     ========================= */
  const track = document.querySelector(".carousel-track");
  const slides = track ? Array.from(track.children) : [];
  const nextButton = document.querySelector(".carousel .next");
  const prevButton = document.querySelector(".carousel .prev");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  if (track && slides.length && nextButton && prevButton && indicatorsContainer) {
    let index = 0;
    const intervalTime = 3000;
    let autoSlide;

    // Criar indicadores
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
        startAutoSlide();
      });
      indicatorsContainer.appendChild(dot);
    });

    function updateIndicators() {
      indicatorsContainer.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function updateCarousel() {
      if (!slides.length) return;
      const width = slides[0].offsetWidth;
      track.style.transform = `translateX(-${index * width}px)`;
      updateIndicators();
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlide = setInterval(() => {
        index = (index + 1) % slides.length;
        updateCarousel();
      }, intervalTime);
    }

    nextButton.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCarousel();
      startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
      startAutoSlide();
    });

    const carousel = document.querySelector(".carousel");
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    window.addEventListener("resize", updateCarousel);

    window.addEventListener("load", () => {
      updateCarousel();
      startAutoSlide();
    });
  }

  /* =========================
     HAMBURGER MENU
     ========================= */
  /* =========================
   HAMBURGER MENU (fullscreen no mobile)
   ========================= */
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav .menu");
const menuLinks = document.querySelectorAll("nav .menu a");
const headerEl = document.querySelector("header");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");
    document.body.classList.toggle("menu-open", isOpen);
    if (headerEl) headerEl.classList.toggle("menu-open", isOpen);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      document.body.classList.remove("menu-open");
      if (headerEl) headerEl.classList.remove("menu-open");
    });
  });
}


  /* =========================
     MENU ATIVO (Perfil / Destaques / etc.)
     ========================= */
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = Array.from(document.querySelectorAll("nav .menu a"));

  const setActive = (id) => {
    navLinks.forEach((a) => {
      const target = (a.getAttribute("href") || "").replace("#", "");
      a.classList.toggle("is-active", target === id);
    });
  };

  // Ativo ao carregar (hash ou perfil)
  const startId = (location.hash || "#perfil").replace("#", "");
  setActive(startId);

  // Ativo ao clicar (responde logo)
  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      const id = (a.getAttribute("href") || "").replace("#", "");
      if (id) setActive(id);
    });
  });

  // Ativo ao scroll (o mais importante)
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Ajuste para header sticky: considera “ativa” a secção quando passa por baixo do header
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-140px 0px -55% 0px",
      }
    );

    sections.forEach((s) => observer.observe(s));
  }
});
