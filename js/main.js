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

    let hamburger;

    if (header && headerInner && navbar) {

        hamburger = document.createElement("div");
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
       AUTO OVERFLOW → HAMBURGER SWITCH (FIXED)
    ========================= */

    function checkNavbarOverflow() {
        const header = document.querySelector(".site-header");
        const menu = document.querySelector(".navbar-menu");

        if (!header || !menu) return;

        // 🔥 FIX: reliable width calculation (mobile-safe)
        const headerWidth = header.getBoundingClientRect().width;
        const menuWidth = menu.scrollWidth;

        const availableWidth = headerWidth - 220; // logo buffer

        if (menuWidth > availableWidth) {
            header.classList.add("overflow-mode");

            // safety: ensure hamburger exists
            if (!document.querySelector(".hamburger") && headerInner && navbar) {
                headerInner.appendChild(hamburger);
            }

        } else {
            header.classList.remove("overflow-mode");
        }
    }

    // 🔥 FIX: timing issue (THIS is what broke iPhone DevTools)
    window.addEventListener("load", () => {
        setTimeout(checkNavbarOverflow, 50);
    });

    window.addEventListener("resize", () => {
        setTimeout(checkNavbarOverflow, 50);
    });

    requestAnimationFrame(() => {
        checkNavbarOverflow();
    });

/* =========================
       PDF VIEWER MODAL (FIXED)
    ========================= */

    const pdfModal = document.getElementById("pdf-modal");
    const pdfFrame = document.getElementById("pdf-frame");
    const pdfDownload = document.getElementById("pdf-download");

    function closePdf() {
        pdfModal?.classList.remove("active");
        if (pdfFrame) pdfFrame.src = "about:blank";
    }

    document.querySelectorAll(".pdf-open").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
    
            const url = link.dataset.pdf;
    
            const viewerUrl = url + "#view=FitV&toolbar=1";
    
            pdfFrame.src = viewerUrl;
            pdfDownload.href = url;
    
            pdfModal.classList.add("active");
        });
    });

    document.querySelector("#pdf-modal .close")?.addEventListener("click", closePdf);

    pdfModal?.addEventListener("click", (e) => {
        if (e.target === pdfModal) closePdf();
    });

});