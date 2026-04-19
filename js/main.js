document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       LIGHTBOX (CENTER FIXED)
    ========================= */

    const modal = document.getElementById("lightbox");
    const modalImg = document.getElementById("lightbox-img");
    const images = document.querySelectorAll('.gallery-item');

    let currentIndex = 0;

    if (modal && modalImg && images.length > 0) {

        images.forEach((item, index) => {
            item.addEventListener('click', function () {
                modal.classList.add("active");
                modalImg.src = item.querySelector('img').src;
                currentIndex = index;
            });
        });

        document.querySelector(".close")?.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        modal?.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });

        document.querySelector(".next")?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            modalImg.src = images[currentIndex].querySelector('img').src;
        });

        document.querySelector(".prev")?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            modalImg.src = images[currentIndex].querySelector('img').src;
        });
    }

    /* =========================
       HAMBURGER MENU
    ========================= */

    const header = document.querySelector(".site-header");
    const headerInner = document.querySelector(".site-header-inner");
    const navbar = document.querySelector(".navbar");

    if (header && headerInner && navbar) {

        const hamburger = document.createElement("div");
        hamburger.classList.add("hamburger");

        hamburger.innerHTML = `<span></span><span></span><span></span>`;

        headerInner.appendChild(hamburger);

        // toggle menu
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navbar.classList.toggle("open");
        });

        // close when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".navbar") && !e.target.closest(".hamburger")) {
                navbar.classList.remove("open");
            }
        });
    }

    /* =========================
       MOBILE DROPDOWNS
    ========================= */

    document.addEventListener("click", function (e) {

        const link = e.target.closest(".nav-dropdown > .nav-link");

        if (!link) return;

        if (window.innerWidth > 1024) return;

        e.preventDefault();

        const parent = link.parentElement;

        const isActive = parent.classList.contains("active");

        document.querySelectorAll(".nav-dropdown").forEach(item => {
            item.classList.remove("active");
        });

        if (!isActive) {
            parent.classList.add("active");
        }
    });

    /* =========================
       CLOSE DROPDOWNS ON OUTSIDE CLICK
    ========================= */

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".nav-dropdown")) {
            document.querySelectorAll(".nav-dropdown.active")
                .forEach(item => item.classList.remove("active"));
        }
    });

    /* =========================
       RESIZE CLEANUP
    ========================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {
            document.querySelectorAll(".nav-dropdown")
                .forEach(el => el.classList.remove("active"));

            navbar?.classList.remove("open");
            header?.classList.remove("overflow-mode");
            modal?.classList.remove("active");
        }

        checkNavbarOverflow();
    });

    /* =========================
       AUTO OVERFLOW → HAMBURGER SWITCH
    ========================= */

    function checkNavbarOverflow() {
        const header = document.querySelector(".site-header");
        const menu = document.querySelector(".navbar-menu");

        if (!header || !menu) return;

        const availableWidth = header.offsetWidth - 220; // logo buffer
        const menuWidth = menu.scrollWidth;

        if (menuWidth > availableWidth) {
            header.classList.add("overflow-mode");
        } else {
            header.classList.remove("overflow-mode");
        }
    }

    window.addEventListener("load", checkNavbarOverflow);
    window.addEventListener("resize", checkNavbarOverflow);
});