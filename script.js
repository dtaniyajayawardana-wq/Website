/* =========================================================
   TANIYA JAYAWARDENA
   PORTFOLIO — CLEAN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header =
        document.getElementById("siteHeader");

    const navToggle =
        document.getElementById("navToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!navToggle || !mobileMenu) {
            return;
        }

        navToggle.classList.add(
            "is-open"
        );

        mobileMenu.classList.add(
            "is-open"
        );

        navToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );
    }


    function closeMobileMenu() {

        if (!navToggle || !mobileMenu) {
            return;
        }

        navToggle.classList.remove(
            "is-open"
        );

        mobileMenu.classList.remove(
            "is-open"
        );

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );
    }


    function toggleMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        if (
            mobileMenu.classList.contains(
                "is-open"
            )
        ) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    if (navToggle) {

        navToggle.addEventListener(
            "click",
            toggleMobileMenu
        );
    }


    if (mobileMenu) {

        const menuLinks =
            mobileMenu.querySelectorAll(
                "a"
            );

        menuLinks.forEach((link) => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });
    }


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 980) {
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       PROFILE SLIDER
       ALWAYS ROTATES EVERY 5 SECONDS
    ===================================================== */

    const profileSlides =
        Array.from(
            document.querySelectorAll(
                "[data-profile-slide]"
            )
        );

    const profileIndicators =
        Array.from(
            document.querySelectorAll(
                ".profile-indicator"
            )
        );

    const PROFILE_INTERVAL = 5000;

    let currentProfileIndex = 0;
    let profileTimer = null;


    /* Preload every profile image */

    profileSlides.forEach((slide) => {

        slide.loading = "eager";

        const preload =
            new Image();

        preload.src =
            slide.currentSrc ||
            slide.src;
    });


    function showProfileSlide(index) {

        if (!profileSlides.length) {
            return;
        }

        currentProfileIndex =
            (
                index +
                profileSlides.length
            ) %
            profileSlides.length;


        profileSlides.forEach(
            (slide, slideIndex) => {

                const active =
                    slideIndex ===
                    currentProfileIndex;

                slide.classList.toggle(
                    "is-active",
                    active
                );

                slide.setAttribute(
                    "aria-hidden",
                    active
                        ? "false"
                        : "true"
                );
            }
        );


        profileIndicators.forEach(
            (indicator, indicatorIndex) => {

                const active =
                    indicatorIndex ===
                    currentProfileIndex;

                indicator.classList.toggle(
                    "is-active",
                    active
                );

                indicator.setAttribute(
                    "aria-pressed",
                    active
                        ? "true"
                        : "false"
                );
            }
        );
    }


    function stopProfileRotation() {

        if (profileTimer !== null) {

            window.clearTimeout(
                profileTimer
            );

            profileTimer = null;
        }
    }


    function scheduleProfileRotation() {

        stopProfileRotation();

        if (profileSlides.length < 2) {
            return;
        }

        profileTimer =
            window.setTimeout(
                () => {

                    showProfileSlide(
                        currentProfileIndex + 1
                    );

                    scheduleProfileRotation();

                },
                PROFILE_INTERVAL
            );
    }


    if (profileSlides.length > 0) {

        showProfileSlide(0);

        scheduleProfileRotation();
    }


    profileIndicators.forEach(
        (indicator, index) => {

            indicator.addEventListener(
                "click",
                () => {

                    const requestedIndex =
                        Number(
                            indicator.dataset.index
                        );

                    const safeIndex =
                        Number.isInteger(
                            requestedIndex
                        )
                            ? requestedIndex
                            : index;

                    showProfileSlide(
                        safeIndex
                    );

                    scheduleProfileRotation();
                }
            );
        }
    );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopProfileRotation();

            } else {

                scheduleProfileRotation();
            }
        }
    );


    /* =====================================================
       PROFESSIONAL ROLE ROTATION
    ===================================================== */

    const changingRole =
        document.getElementById(
            "changingRole"
        );

    const roles = [
        "Business Analysis",
        "Systems & Application Support",
        "Enterprise Technology",
        "Software Development"
    ];

    let roleIndex = 0;


    if (changingRole) {

        window.setInterval(
            () => {

                changingRole.classList.add(
                    "role-out"
                );

                window.setTimeout(
                    () => {

                        roleIndex =
                            (
                                roleIndex + 1
                            ) %
                            roles.length;

                        changingRole.textContent =
                            roles[roleIndex];

                        changingRole.classList.remove(
                            "role-out"
                        );

                    },
                    220
                );

            },
            3200
        );
    }


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "is-visible"
                                    );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -35px 0px"
                }
            );


        revealItems.forEach(
            (item) => {

                revealObserver.observe(
                    item
                );
            }
        );

    } else {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "is-visible"
                );
            }
        );
    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            href
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    closeMobileMenu();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            );
        });


    /* =====================================================
       ACTIVE DESKTOP NAV
    ===================================================== */

    const desktopLinks =
        Array.from(
            document.querySelectorAll(
                '.desktop-nav a[href^="#"]'
            )
        );

    const sections =
        desktopLinks
            .map((link) => {

                const selector =
                    link.getAttribute(
                        "href"
                    );

                return document.querySelector(
                    selector
                );
            })
            .filter(Boolean);


    function updateActiveNavigation() {

        if (!sections.length) {
            return;
        }

        const offset = 160;

        let currentSection =
            sections[0];


        sections.forEach(
            (section) => {

                const rect =
                    section.getBoundingClientRect();

                if (
                    rect.top <= offset
                ) {
                    currentSection =
                        section;
                }
            }
        );


        desktopLinks.forEach(
            (link) => {

                link.classList.toggle(
                    "active",

                    link.getAttribute(
                        "href"
                    ) ===
                    `#${currentSection.id}`
                );
            }
        );
    }


    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       PROJECT LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    function openLightbox(
        source,
        alt = ""
    ) {

        if (
            !lightbox ||
            !lightboxImage ||
            !source
        ) {
            return;
        }

        lightboxImage.src =
            source;

        lightboxImage.alt =
            alt;

        lightbox.classList.add(
            "is-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove(
            "is-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

        if (lightboxImage) {

            window.setTimeout(
                () => {

                    if (
                        !lightbox.classList
                            .contains(
                                "is-open"
                            )
                    ) {

                        lightboxImage.src =
                            "";
                    }
                },
                200
            );
        }
    }


    document
        .querySelectorAll(
            ".gallery-trigger"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const image =
                        button.querySelector(
                            "img"
                        );

                    const source =
                        button.dataset.image ||
                        image?.currentSrc ||
                        image?.src;

                    openLightbox(
                        source,
                        image?.alt || ""
                    );
                }
            );
        });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    lightbox
                ) {
                    closeLightbox();
                }
            }
        );
    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }

            closeMobileMenu();
            closeLightbox();
        }
    );


    /* =====================================================
       SAFETY: NON-PROFILE IMAGE LAZY LOADING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            if (
                image.matches(
                    "[data-profile-slide]"
                )
            ) {

                image.loading =
                    "eager";

                return;
            }

            if (
                !image.hasAttribute(
                    "loading"
                )
            ) {

                image.loading =
                    "lazy";
            }
        });

});