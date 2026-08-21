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

    // Collapses all active layers and clears overflow body blocks on close
    function closeMobileMenu() {
        navbar?.classList.remove("open");
        document.body.classList.remove("menu-open");
        
        document.querySelectorAll(".nav-dropdown, .nested-dropdown").forEach(item => {
            item.classList.remove("active");
        });
    }

    function createHamburger() {
        if (hamburger || !headerInner || !navbar) return;

        hamburger = document.createElement("div");
        hamburger.classList.add("hamburger");
        hamburger.innerHTML = `<span></span><span></span><span></span>`;
        headerInner.appendChild(hamburger);

        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            if (navbar.classList.contains("open")) {
                closeMobileMenu();
            } else {
                navbar.classList.add("open");
                document.body.classList.add("menu-open");
            }
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

    // Handles clicks outside the navbar element to close the context clean
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar") && !e.target.closest(".hamburger")) {
            closeMobileMenu();
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

    // Handle Layer 3 sub-category accordion expansion on mobile layouts
    document.addEventListener("click", function (e) {
        const nestedToggle = e.target.closest(".nested-toggle");
        if (!nestedToggle) return;
        if (window.innerWidth > 1024) return;

        e.preventDefault();
        const parentLi = nestedToggle.parentElement;
        const wasActive = parentLi.classList.contains("active");

        // Collapse sibling sub-menus
        parentLi.parentElement.querySelectorAll(".nested-dropdown").forEach(item => {
            item.classList.remove("active");
        });

        if (!wasActive) {
            parentLi.classList.add("active");
        }
    });

    // ==========================================
    // HYBRID HTML-PARSED CLIENT SEARCH ENGINE
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let siteSearchIndex = null;

    // Build the searchable index dynamically from the hidden HTML elements
    function buildSearchIndex() {
        if (siteSearchIndex) return;
        
        const entries = document.querySelectorAll('#site-search-data .search-entry');
        siteSearchIndex = Array.from(entries).map(entry => {
            return {
                title: entry.getAttribute('data-title'),
                url: entry.getAttribute('data-url'),
                content: entry.textContent.replace(/\s+/g, ' ').trim()
            };
        });
    }

    function generateSnippet(content, query) {
        const index = content.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return content.slice(0, 80) + "...";

        const start = Math.max(0, index - 30);
        const end = Math.min(content.length, index + query.length + 50);
        
        let snippet = content.slice(start, end);
        if (start > 0) snippet = "..." + snippet;
        if (end < content.length) snippet = snippet + "...";

        const regex = new RegExp(`(${query})`, 'gi');
        return snippet.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    searchInput?.addEventListener('focus', buildSearchIndex);
    searchInput?.addEventListener('input', function() {
        buildSearchIndex();
        const query = this.value.trim();
        searchResults.innerHTML = '';

        if (!query || !siteSearchIndex) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = siteSearchIndex.filter(page => 
            page.title.toLowerCase().includes(query.toLowerCase()) || 
            page.content.toLowerCase().includes(query.toLowerCase())
        );

        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="search-no-result">No matches found</div>';
            searchResults.style.display = 'block';
            return;
        }

        matches.slice(0, 5).forEach(page => {
            const resultItem = document.createElement('a');
            resultItem.href = page.url;
            resultItem.className = 'search-result-item';

            const snippetText = generateSnippet(page.content, query);

            resultItem.innerHTML = `
                <div class="search-result-title">${page.title}</div>
                <div class="search-result-snippet">${snippetText}</div>
            `;
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-nav-item')) {
            if (searchResults) searchResults.style.display = 'none';
        }
    });

    // ==========================================
    // INLINE PDF.JS MULTI-PAGE RENDERER (HiDPI / Crisp Text)
    // ==========================================
    const pdfContainers = document.querySelectorAll("[data-pdf-embed]");

    if (pdfContainers.length > 0 && window.pdfjsLib) {
        pdfContainers.forEach(function (container) {
            const url = container.getAttribute("data-pdf-embed");
            const loadingText = container.querySelector(".pdf-loading");

            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.alignItems = "center";
            container.style.gap = "16px";
            container.style.width = "100%";

            pdfjsLib.getDocument(url).promise.then(function (pdf) {
                if (loadingText) loadingText.remove();

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    pdf.getPage(pageNum).then(function (page) {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");

                        const containerWidth = container.clientWidth || window.innerWidth;
                        const unscaledViewport = page.getViewport({ scale: 1.0 });
                        
                        // Base layout scale based on container width
                        const cssScale = (containerWidth - 32) / unscaledViewport.width;
                        const baseScale = cssScale > 0 ? cssScale : 1.0;

                        // Detect screen pixel ratio (Mobile Retina = 2x or 3x)
                        const dpr = window.devicePixelRatio || 1;
                        const viewport = page.getViewport({ scale: baseScale * dpr });

                        // Set physical canvas pixel dimensions (High DPI)
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        // Set CSS display dimensions back to normal scale
                        canvas.style.width = (viewport.width / dpr) + "px";
                        canvas.style.height = (viewport.height / dpr) + "px";
                        canvas.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                        canvas.style.borderRadius = "4px";

                        container.appendChild(canvas);

                        page.render({
                            canvasContext: ctx,
                            viewport: viewport
                        });
                    });
                }
            }).catch(function () {
                if (loadingText) {
                    loadingText.innerHTML = 'Unable to render inline. <a href="' + url + '" target="_blank">Tap here to view PDF</a>.';
                }
            });
        });
    }

});