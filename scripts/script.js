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
    document.getElementById("idade").textContent = calcularIdade(dataNascimento);

    // ===== Carrossel =====
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel .next');
    const prevButton = document.querySelector('.carousel .prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let index = 0;
    let intervalTime = 3000;
    let autoSlide;

    // Criar indicadores
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            index = i;
            updateCarousel();
            stopAutoSlide();
            startAutoSlide();
        });

        indicatorsContainer.appendChild(dot);
    });

    function updateIndicators() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function updateCarousel() {
        const width = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * width}px)`;
        updateIndicators();
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            index = (index + 1) % slides.length;
            updateCarousel();
        }, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Botões
    nextButton.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateCarousel();
        stopAutoSlide();
        startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
        stopAutoSlide();
        startAutoSlide();
    });

    // Pausar ao passar o rato
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Inicia
    updateCarousel();
    startAutoSlide();
});
