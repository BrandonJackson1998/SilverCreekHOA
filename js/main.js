document.addEventListener('DOMContentLoaded', function () {

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

    const header = document.querySelector(".site-header");
    const headerInner = document.querySelector(".site-header-inner");
    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".navbar-menu");

    let hamburger = document.querySelector(".hamburger");

    function createHamburger() {
        if (hamburger || !headerInner || !navbar) return;

        hamburger = document.createElement("div");
        hamburger.classList.add("hamburger");
        hamburger.innerHTML = `<span></span><span></span><span></span>`;
        headerInner.appendChild(hamburger);

        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navbar.classList.toggle("open");
            document.body.classList.toggle("menu-open");
        });
    }

    createHamburger();

    function checkNavbarOverflow() {
        if (!header || !menu) return;

        const headerWidth = header.getBoundingClientRect().width;
        const menuWidth = menu.scrollWidth;

        const shouldCollapse = menuWidth > (headerWidth - 220);

        if (shouldCollapse) {
            header.classList.add("overflow-mode");
            navbar.classList.add("collapsed");
            createHamburger();
        } else {
            header.classList.remove("overflow-mode");
            navbar.classList.remove("collapsed");
        }
    }

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar") && !e.target.closest(".hamburger")) {
            navbar?.classList.remove("open");
            document.body.classList.remove("menu-open");
        }
    });

    document.addEventListener("click", function (e) {

        const link = e.target.closest(".nav-dropdown > .nav-link");

        if (!link) return;
        if (window.innerWidth > 1024) return;

        e.preventDefault();

        const parent = link.parentElement;
        const isActive = parent.classList.contains("active");

        document.querySelectorAll(".nav-dropdown")
            .forEach(item => item.classList.remove("active"));

        if (!isActive) parent.classList.add("active");
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".nav-dropdown")) {
            document.querySelectorAll(".nav-dropdown.active")
                .forEach(item => item.classList.remove("active"));
        }
    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {
            document.querySelectorAll(".nav-dropdown")
                .forEach(el => el.classList.remove("active"));

            navbar?.classList.remove("open");
            modal?.classList.remove("active");
        }

        checkNavbarOverflow();
    });

    function initNav() {
        createHamburger();
        requestAnimationFrame(checkNavbarOverflow);
        setTimeout(checkNavbarOverflow, 100);
    }

    window.addEventListener("load", initNav);
    initNav();

    const pdfModal = document.getElementById("pdf-modal");
    const pdfFrame = document.getElementById("pdf-frame");
    const pdfDownload = document.getElementById("pdf-download");

    function closePdf() {
        pdfModal?.classList.remove("active");
        if (pdfFrame) pdfFrame.src = "about:blank";
        document.body.style.overflow = "";
    }

    function openPdf(url) {

        if (window.innerWidth > 768) {
            pdfFrame.src = url + "#view=FitV&toolbar=1";
            pdfDownload.href = url;
            pdfModal.classList.add("active");
            document.body.style.overflow = "hidden";
            return;
        }

        const newTab = window.open(url, "_blank");

        if (!newTab) {
            window.location.href = url;
        }
    }

    document.addEventListener("click", function (e) {

        const link = e.target.closest(".pdf-open");
        if (!link) return;

        e.preventDefault();

        const url = link.dataset.pdf || link.getAttribute("href");
        if (!url) return;

        openPdf(url);
    });

    document.querySelector("#pdf-modal .close")?.addEventListener("click", closePdf);

    pdfModal?.addEventListener("click", (e) => {
        if (e.target === pdfModal) closePdf();
    });

});