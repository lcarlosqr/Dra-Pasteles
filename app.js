/* ================= Configuration ================= */
const WHATSAPP_NUMBER = "51955763861";
// base URL for wa.me with optional prefilled text (we'll generate per product)
function waLink(productName) {
    const text = encodeURIComponent("Hola, quisiera pedir: " + productName);
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
}

// Data model: for each slide (index) a list of 5 products.
const slidesData = [
    { // 0 - Pasteles Clásicos
        title: "Pasteles Clásicos :)",
        products: [
            { id: "cl1", name: "Pastel Vainilla (8 porciones)", img: placeholderImage("Vainilla"), desc: "Esponjoso, crema de vainilla" },
            { id: "cl2", name: "Pastel Chocolate (8 porciones)", img: placeholderImage("Chocolate"), desc: "Rico y húmedo" },
            { id: "cl3", name: "Pastel Red Velvet", img: placeholderImage("Red Velvet"), desc: "Con frosting de queso" },
            { id: "cl4", name: "Pastel Moka", img: placeholderImage("Moka"), desc: "Cafe y chocolate" },
            { id: "cl5", name: "Pastel Tres Leches", img: placeholderImage("Tres Leches"), desc: "Super húmedo y dulce" }
        ]
    },
    { // 1 - Tartas & Cheesecakes
        title: "Tartas & Cheesecakes",
        products: [
            { id: "tc1", name: "Cheesecake Clásico", img: placeholderImage("Cheesecake"), desc: "Base crocante, textura cremosa" },
            { id: "tc2", name: "Tarta de Manzana", img: placeholderImage("Manzana"), desc: "Con especias y crumble" },
            { id: "tc3", name: "Cheesecake Frutos Rojos", img: placeholderImage("Frutos Rojos"), desc: "Cobertura natural" },
            { id: "tc4", name: "Tarta Limón & Merengue", img: placeholderImage("Limón"), desc: "Acidito y ligero" },
            { id: "tc5", name: "Tarta de Queso y Caramelo", img: placeholderImage("Caramelo"), desc: "Toques salados" }
        ]
    },
    { // 2 - Repostería Creativa
        title: "Repostería Creativa",
        products: [
            { id: "rc1", name: "Cupcakes Decorados x6", img: placeholderImage("Cupcakes"), desc: "Diseños personalizados" },
            { id: "rc2", name: "Cookies Gigantes", img: placeholderImage("Cookies"), desc: "Perfectas para regalo" },
            { id: "rc3", name: "Macarons x12", img: placeholderImage("Macarons"), desc: "Sabores surtidos" },
            { id: "rc4", name: "Mini Tartaletas", img: placeholderImage("Tartaletas"), desc: "Variedad de rellenos" },
            { id: "rc5", name: "Galletas Decoradas", img: placeholderImage("Galletas"), desc: "Temáticas por encargo" }
        ]
    }
];

// Featured products for the homepage (5 items)
const featuredProducts = [
    { id: "f1", name: "Caja Sorpresa Pasteles x4", img: "https://i.postimg.cc/tCMQ0Tx3/caja-sorpresa.jpg", desc: "Selección de 4 mini pasteles" },
    { id: "f2", name: "Cheesecake", img: "https://i.postimg.cc/0jZxF1gb/Cheesecake1.png", desc: "Perfecto para festejos pequeños" },
    { id: "f3", name: "Pastel Personalizado 20cm", img: "https://i.postimg.cc/BQnQSTFK/smiling-critters.jpg", desc: "Diseños según tu pedido" },
    { id: "f4", name: "Bandeja de Cookies", img: "https://i.postimg.cc/SQrxbTn4/cookies.jpg", desc: "10 unidades surtidas" },
    { id: "f5", name: "Cupcakes Premium x12", img: "https://i.postimg.cc/NFps8M3F/cup-cake-unicornio.jpg", desc: "Decoración gourmet" }
];

/* ================ Helpers ================ */
// Create a simple inline SVG placeholder with text (keeps single-file)
function placeholderImage(text) {
    const encoded = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
    <rect width='100%' height='100%' fill='%23ffffff'/>
    <rect x='0' y='0' width='100%' height='100%' fill='%23f8f4f6'/>
    <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='34' fill='%23202b3a'>${text}</text>
</svg>`
    );
    return 'data:image/svg+xml;utf8,' + encoded;
}

/* ================ Carousel logic ================ */
const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

let currentIndex = 0;
let autoplayInterval = null;
function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    const offset = -index * track.clientWidth;
    track.style.transform = 'translateX(' + offset + 'px)';
    updateDots();
}

// Dots
slides.forEach((s, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Ir a slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
});
function updateDots() {
    Array.from(dotsContainer.children).forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
    });
}

// Prev/Next
prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); resetAutoplay(); });
nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); resetAutoplay(); });

// Resize: keep translation consistent
window.addEventListener('resize', () => goTo(currentIndex));

// Autoplay
function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => goTo(currentIndex + 1), 5000);
}
function stopAutoplay() { if (autoplayInterval) clearInterval(autoplayInterval); autoplayInterval = null; }
function resetAutoplay() { stopAutoplay(); startAutoplay(); }
startAutoplay();

// Clicking a slide -> open products section for that slide
slides.forEach(slide => {
    slide.addEventListener('click', () => {
        const idx = Number(slide.dataset.index) || 0;
        showProductsForSlide(idx);
        // scroll to products section smoothly
        const productsSection = document.getElementById('products-section');
        productsSection.classList.add('visible');
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    // also keyboard accessible
    slide.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            slide.click();
        }
    });
});

// Back link
document.getElementById('backHome').addEventListener('click', (e) => {
    // hide products section and scroll to top
    document.getElementById('products-section').classList.remove('visible');
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============== Render featured products on homepage =============== */
const featuredGrid = document.getElementById('featuredGrid');
function renderFeatured() {
    featuredGrid.innerHTML = '';
    featuredProducts.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
    <div class="product-img"><img src="${p.img}" alt="${escapeHtml(p.name)}"></div>
    <div>
    <p class="title">${escapeHtml(p.name)}</p>
    <p class="desc">${escapeHtml(p.desc)}</p>
    </div>
    <a class="buy" href="${waLink(p.name)}" target="_blank" rel="noopener noreferrer">Comprar ahora</a>
`;
        featuredGrid.appendChild(card);
    });
}
renderFeatured();

/* =============== Show products for clicked slide =============== */
const prodList = document.getElementById('prodList');
function showProductsForSlide(index) {
    const data = slidesData[index] || slidesData[0];
    document.getElementById('productsHeading').textContent = data.title + " — Productos destacados";
    prodList.innerHTML = '';
    data.products.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
    <div class="product-img"><img src="${p.img}" alt="${escapeHtml(p.name)}"></div>
    <div>
    <p class="title">${escapeHtml(p.name)}</p>
    <p class="desc">${escapeHtml(p.desc)}</p>
    </div>
    <a class="buy" href="${waLink(p.name)}" target="_blank" rel="noopener noreferrer">Comprar ahora</a>
`;
        prodList.appendChild(card);
    });
}

/* =============== Utility =============== */
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Accessibility: pause autoplay on focus/hover
document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);
document.querySelector('.carousel').addEventListener('focusin', stopAutoplay);
document.querySelector('.carousel').addEventListener('focusout', startAutoplay);

// init: ensure track width recalculated when images load (so translate works)

window.addEventListener('load', () => goTo(0));
