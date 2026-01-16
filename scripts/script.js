/* =========================================================
   ERIC SILVA — script.js (organizado + comentado)
   - Menu mobile (hamburger + fullscreen)
   - Idade automática
   - Carrossel (setas + dots)
   ========================================================= */

/* =========================================================
   1) HELPERS (funções pequenas para facilitar)
   ========================================================= */

/**
 * Seleciona 1 elemento (atalho)
 * @param {string} selector
 * @param {ParentNode} scope
 */
function $(selector, scope = document) {
  return scope.querySelector(selector);
}

/**
 * Seleciona vários elementos (atalho)
 * @param {string} selector
 * @param {ParentNode} scope
 */
function $all(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/* =========================================================
   2) MENU MOBILE (abrir/fechar)
   ========================================================= */

(function setupMobileMenu() {
  // Botão hamburger
  const toggleBtn = $(".menu-toggle");

  // Lista do menu <ul class="menu">
  const menu = $("nav .menu");

  // Header (o teu CSS usa header.menu-open para esconder flags no overlay)
  const header = $("header");

  // Links do menu (para fechar quando clicas numa secção)
  const menuLinks = $all("nav .menu a");

  // Se algum elemento não existir, não faz nada (evita erros)
  if (!toggleBtn || !menu || !header) return;

  /**
   * Abre/fecha o menu
   * - .active -> mostra o overlay (CSS)
   * - body.menu-open -> bloqueia scroll (CSS)
   * - header.menu-open -> esconde flags enquanto menu está aberto (CSS)
   */
  function toggleMenu() {
    const isOpen = menu.classList.contains("active");

    if (isOpen) {
      // FECHAR
      menu.classList.remove("active");
      document.body.classList.remove("menu-open");
      header.classList.remove("menu-open");

      // Acessibilidade (opcional)
      toggleBtn.setAttribute("aria-expanded", "false");
    } else {
      // ABRIR
      menu.classList.add("active");
      document.body.classList.add("menu-open");
      header.classList.add("menu-open");

      // Acessibilidade (opcional)
      toggleBtn.setAttribute("aria-expanded", "true");
    }
  }

  // Clicar no hamburger -> abre/fecha
  toggleBtn.addEventListener("click", toggleMenu);

  // Clicar num link -> fecha menu (em mobile)
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Só fecha se estiver aberto
      if (menu.classList.contains("active")) toggleMenu();
    });
  });

  // Tecla ESC -> fecha menu se estiver aberto
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      toggleMenu();
    }
  });
})();

/* =========================================================
   3) IDADE AUTOMÁTICA
   ========================================================= */

(function setupAge() {
  const ageEl = $("#idade");
  if (!ageEl) return;

  const birthDate = new Date(2002, 7, 10); 

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Verifica se já fez anos este ano
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Se ainda não chegou ao mês do aniversário OU chegou mas ainda não chegou ao dia -> tira 1 ano
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Coloca no HTML
  ageEl.textContent = age;
})();

/* =========================================================
   4) CARROSSEL (setas + indicadores)
   ========================================================= */

(function setupCarousel() {
  const carousel = $(".carousel");
  if (!carousel) return;

  const track = $(".carousel-track", carousel);
  const images = $all(".carousel-track img", carousel);

  const prevBtn = $(".prev", carousel);
  const nextBtn = $(".next", carousel);

  const indicatorsContainer = $(".carousel-indicators");
  if (!track || images.length === 0 || !prevBtn || !nextBtn || !indicatorsContainer)
    return;

  // Índice atual da imagem
  let currentIndex = 0;

  /**
   * Move o carrossel para a imagem atual
   * Como cada imagem tem width: 100%, basta traduzir em %
   */
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Atualiza dots (bolinhas)
    const dots = $all(".dot", indicatorsContainer);
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  /**
   * Cria as bolinhas (dots) automaticamente
   */
  function createDots() {
    indicatorsContainer.innerHTML = ""; // limpa antes

    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";

      // Ao clicar numa bolinha -> vai para essa imagem
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });

      indicatorsContainer.appendChild(dot);
    });
  }

  /**
   * Vai para a imagem anterior
   */
  function goPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  /**
   * Vai para a imagem seguinte
   */
  function goNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  // Botões
  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  // (Opcional) teclado: setas esquerda/direita
  document.addEventListener("keydown", (e) => {
    // Evita mexer no carrossel se o menu overlay estiver aberto
    if (document.body.classList.contains("menu-open")) return;

    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  // Inicializa
  createDots();
  updateCarousel();
})();
