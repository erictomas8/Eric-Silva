document.addEventListener('DOMContentLoaded', () => {
    // ===== Idade dinâmica =====
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

    // ===== Carrossel =====
    const track = document.querySelector('.carousel-track');
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.querySelector('.carousel .next');
    const prevButton = document.querySelector('.carousel .prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (track && slides.length && nextButton && prevButton && indicatorsContainer) {
        let index = 0;
        const intervalTime = 3000;
        let autoSlide;

        // Criar indicadores
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                index = i;
                updateCarousel();
                startAutoSlide();
            });
            indicatorsContainer.appendChild(dot);
        });

        function updateIndicators() {
            indicatorsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function updateCarousel() {
            if (!slides.length) return;
            const width = slides[0].offsetWidth; // largura atual do slide
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

        nextButton.addEventListener('click', () => {
            index = (index + 1) % slides.length;
            updateCarousel();
            startAutoSlide();
        });

        prevButton.addEventListener('click', () => {
            index = (index - 1 + slides.length) % slides.length;
            updateCarousel();
            startAutoSlide();
        });

        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        // Atualizar carrossel ao redimensionar janela
        window.addEventListener('resize', updateCarousel);

        // Inicia só depois das imagens carregarem
        window.addEventListener('load', () => {
            updateCarousel();
            startAutoSlide();
        });
    }

    // === Hamburger Menu ===
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    // Abrir/fechar menu ao clicar no ícone
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Fechar menu ao clicar num link (em telas pequenas)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
});
