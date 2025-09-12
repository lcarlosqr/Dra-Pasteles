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
    { id: "f1", name: "Caja Sorpresa Pasteles x4", img: "https://scontent.flim28-2.fna.fbcdn.net/v/t39.30808-6/471225632_2092010577909398_6784466255018233532_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=q69_E2oy7MYQ7kNvwGkkHQ5&_nc_oc=AdnayiioQg_R6e_Ng0A72zJ6SHoeLtU7DDyjSCExsQlxP2WdLUDkJcg28UsYDyHVpGo&_nc_zt=23&_nc_ht=scontent.flim28-2.fna&_nc_gid=1W7mM-qtW0rXD34zVeWBRA&oh=00_AfY8blvyJMn8bqI6ZHHpFezk48d5sWeMTzBDH6KJ2Ob5Nw&oe=68CA5AE5", desc: "Selección de 4 mini pasteles" },
    { id: "f2", name: "Cheesecake", img: "https://scontent.flim28-2.fna.fbcdn.net/v/t1.6435-9/67431267_718404525270017_5885446801569349632_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Fudd_cxFOW8Q7kNvwGWh3wZ&_nc_oc=Adkn4nl4x1OEAVQD9rNoRYxdgj2Qx_eFzzXNfxdYL2rfsuzBokV_wDRBlcjcBoGAXJ4&_nc_zt=23&_nc_ht=scontent.flim28-2.fna&_nc_gid=Jp1w15cN6Bgapxwn0UmU_A&oh=00_Afa3Fn7SGdpjbbYKEnlxCOlNNyFn71zYn_QjB4rnt7kO6A&oe=68EBCDB8", desc: "Perfecto para festejos pequeños" },
    { id: "f3", name: "Pastel Personalizado 20cm", img: "https://scontent.flim28-1.fna.fbcdn.net/v/t39.30808-6/508333135_10237621421896033_5824103227284096968_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fiAYZxYVqrUQ7kNvwFZiK10&_nc_oc=AdmflcC3yKeOEZRxgwEdUlFeE9T4Xh9lAc80ugrQ6ktDQ_SvXA__60okuXoi6aP3A1k&_nc_zt=23&_nc_ht=scontent.flim28-1.fna&_nc_gid=pxsVyEcZjtpoUPyiVCWdgg&oh=00_AfYujufdgP3qGBZ-Sbrilsya3rPvI3BLWiMz-hQwb4KP5w&oe=68CA4871", desc: "Diseños según tu pedido" },
    { id: "f4", name: "Bandeja de Cookies", img: "https://scontent.flim28-1.fna.fbcdn.net/v/t39.30808-6/505828486_10237506425181187_6353489940829777157_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=27J0T_znYysQ7kNvwHgDV5_&_nc_oc=AdnqWzeDEBxcKfDZwg2RG4wYkAM_83SaQrHMpBUitrLAreqBuon0iJO4yAp0Vic-YDA&_nc_zt=23&_nc_ht=scontent.flim28-1.fna&_nc_gid=oIcpDC8UD_lhStlTIO_rQw&oh=00_AfYy6hI1ApyFrmgsEwF6nhhu4tFWbRiId2x4iZOtJGXtjg&oe=68CA4FFA", desc: "10 unidades surtidas" },
    { id: "f5", name: "Cupcakes Premium x12", img: "https://scontent.flim28-2.fna.fbcdn.net/v/t39.30808-6/470886602_2089867798123676_4029737239250229463_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=GAu5N5rP67YQ7kNvwGzaGhC&_nc_oc=AdmKleiSWAO4cldsgkz_XYPIaZuQJuLmST3ETVfEWMHfMAuAMJ8r6HzW4J6HfNsgK-U&_nc_zt=23&_nc_ht=scontent.flim28-2.fna&_nc_gid=q55Fn5q-e-4IxVoK-6N0OQ&oh=00_AfbAXGCO0A2rqKwHYHQzcB4_p7u3BNxsPTj5ugZd4Y_SDg&oe=68CA580A", desc: "Decoración gourmet" }
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