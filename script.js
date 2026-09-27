/* =========================================================
   TANIYA JAYAWARDENA — PORTFOLIO
   script.js
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. GLOBAL SETTINGS
       ===================================================== */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       02. CURRENT YEAR
       ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       03. HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.getElementById("siteHeader");

    const updateHeader = () => {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       04. MOBILE NAVIGATION
       ===================================================== */

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    const openMenu = () => {
        if (!navToggle || !navMenu) return;

        navToggle.classList.add("is-open");
        navMenu.classList.add("is-open");

        navToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");
    };


    const closeMenu = () => {
        if (!navToggle || !navMenu) return;

        navToggle.classList.remove("is-open");
        navMenu.classList.remove("is-open");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    };


    const toggleMenu = () => {
        if (!navToggle || !navMenu) return;

        const isOpen =
            navMenu.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };


    if (navToggle) {
        navToggle.addEventListener(
            "click",
            toggleMenu
        );
    }


    if (navMenu) {
        const mobileNavLinks =
            navMenu.querySelectorAll("a");

        mobileNavLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {
                    closeMenu();
                }
            );

        });
    }


    /* Close menu if clicking outside it */

    document.addEventListener(
        "click",
        (event) => {

            if (!navMenu || !navToggle) return;

            if (
                !navMenu.classList.contains("is-open")
            ) {
                return;
            }

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                navToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }
        }
    );


    /* Close mobile menu when desktop width returns */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 980) {
                closeMenu();
            }

        }
    );


    /* =====================================================
       05. PROFILE IMAGE SLIDER
       EXACTLY 40 SECONDS
       ===================================================== */

    const profileSlides = [
        ...document.querySelectorAll(
            "[data-profile-slide]"
        )
    ];

    const profileIndicators = [
        ...document.querySelectorAll(
            ".profile-indicator"
        )
    ];

    let currentProfileIndex = 0;

    let profileTimer = null;

    const PROFILE_INTERVAL = 40000;


    const showProfileSlide = (index) => {

        if (!profileSlides.length) return;

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
                    String(!active)
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
                    String(active)
                );

            }
        );

    };


    const stopProfileRotation = () => {

        if (profileTimer) {

            clearInterval(profileTimer);

            profileTimer = null;

        }

    };


    const startProfileRotation = () => {

        stopProfileRotation();

        if (
            reduceMotion ||
            profileSlides.length < 2
        ) {
            return;
        }

        profileTimer = setInterval(
            () => {

                showProfileSlide(
                    currentProfileIndex + 1
                );

            },
            PROFILE_INTERVAL
        );

    };


    profileIndicators.forEach(
        (indicator, index) => {

            indicator.addEventListener(
                "click",
                () => {

                    const requestedIndex =
                        Number(
                            indicator.dataset.index
                        );

                    const targetIndex =
                        Number.isFinite(
                            requestedIndex
                        )
                            ? requestedIndex
                            : index;

                    showProfileSlide(
                        targetIndex
                    );

                    /*
                       Restart the full 40-second timer
                       after manual selection.
                    */

                    startProfileRotation();

                }
            );

        }
    );


    if (profileSlides.length) {

        showProfileSlide(0);

        startProfileRotation();

    }


    /* Pause slider while browser tab is hidden */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopProfileRotation();

            } else {

                startProfileRotation();

            }

        }
    );


    /* =====================================================
       06. ROTATING PROFESSIONAL ROLE
       ===================================================== */

    const changingRole =
        document.getElementById(
            "changingRole"
        );


    const professionalRoles = [
        "Business Analysis",
        "Systems & Application Support",
        "Enterprise Technology",
        "Software Development"
    ];


    let currentRoleIndex = 0;

    let roleTimer = null;


    const changeRole = () => {

        if (!changingRole) return;

        changingRole.classList.add(
            "role-out"
        );


        window.setTimeout(
            () => {

                currentRoleIndex =
                    (
                        currentRoleIndex + 1
                    ) %
                    professionalRoles.length;


                changingRole.textContent =
                    professionalRoles[
                        currentRoleIndex
                    ];


                changingRole.classList.remove(
                    "role-out"
                );

            },
            220
        );

    };


    if (
        changingRole &&
        !reduceMotion
    ) {

        roleTimer = window.setInterval(
            changeRole,
            3200
        );

    }


    /* =====================================================
       07. REVEAL ON SCROLL
       ===================================================== */

    const revealElements = [
        ...document.querySelectorAll(
            ".reveal"
        )
    ];


    if (
        reduceMotion ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    } else {

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
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -45px 0px"
                }

            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       08. SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    /*
                       Important:
                       Do not interfere with placeholder
                       links such as the GitHub href="#".
                    */

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    let target;

                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch {

                        return;

                    }


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            reduceMotion
                                ? "auto"
                                : "smooth",

                        block: "start"

                    });


                    closeMenu();

                }
            );

        }
    );


    /* =====================================================
       09. ACTIVE NAVIGATION LINK
       ===================================================== */

    const navLinks = [
        ...document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        )
    ].filter(
        (link) => {

            const href =
                link.getAttribute(
                    "href"
                );

            return (
                href &&
                href !== "#"
            );

        }
    );


    const navigationSections =
        navLinks
            .map(
                (link) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );

                    try {

                        return (
                            document.querySelector(
                                href
                            )
                        );

                    } catch {

                        return null;

                    }

                }
            )
            .filter(Boolean);


    const setActiveNavigation =
        (sectionId) => {

            navLinks.forEach(
                (link) => {

                    const active =
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${sectionId}`;


                    link.classList.toggle(
                        "active",
                        active
                    );

                }
            );

        };


    if (
        navigationSections.length &&
        "IntersectionObserver"
        in window
    ) {

        const navigationObserver =
            new IntersectionObserver(

                (entries) => {

                    const visibleEntries =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio
                            );


                    if (
                        visibleEntries.length
                    ) {

                        setActiveNavigation(
                            visibleEntries[0]
                                .target
                                .id
                        );

                    }

                },

                {
                    rootMargin:
                        "-30% 0px -58% 0px",

                    threshold: [
                        0,
                        0.05,
                        0.1,
                        0.2
                    ]
                }

            );


        navigationSections.forEach(
            (section) => {

                navigationObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       10. PROJECT IMAGE LIGHTBOX
       ===================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxCaption =
        document.getElementById(
            "lightboxCaption"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    /*
       Supports:
       - Main payroll screenshot
       - Every gallery screenshot

       No visible captions/tags are added
       to the normal project gallery.
    */

    const galleryItems = [
        ...document.querySelectorAll(
            ".project-main-image, .gallery-item"
        )
    ];


    let previousBodyOverflow = "";


    const openLightbox = (
        imageSource,
        imageAlt = ""
    ) => {

        if (
            !lightbox ||
            !lightboxImage ||
            !imageSource
        ) {
            return;
        }


        lightboxImage.src =
            imageSource;

        lightboxImage.alt =
            imageAlt;


        /*
           We intentionally do NOT display
           image tags/captions in the lightbox.
        */

        if (lightboxCaption) {

            lightboxCaption.textContent =
                "";

            lightboxCaption.style.display =
                "none";

        }


        lightbox.classList.add(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        previousBodyOverflow =
            document.body.style.overflow;


        document.body.style.overflow =
            "hidden";


        if (lightboxClose) {

            window.setTimeout(
                () => {

                    lightboxClose.focus();

                },
                50
            );

        }

    };


    const closeLightbox = () => {

        if (!lightbox) return;


        lightbox.classList.remove(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            previousBodyOverflow;


        if (lightboxImage) {

            /*
               Wait for fade-out before
               clearing image.
            */

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

                        lightboxImage.alt =
                            "";

                    }

                },
                220
            );

        }


        if (lightboxCaption) {

            lightboxCaption.textContent =
                "";

        }

    };


    galleryItems.forEach(
        (item) => {

            item.addEventListener(
                "click",
                () => {

                    const image =
                        item.querySelector(
                            "img"
                        );


                    if (!image) return;


                    openLightbox(
                        image.currentSrc ||
                        image.src,

                        image.alt || ""
                    );

                }
            );

        }
    );


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

                /*
                   Close only when clicking
                   the dark backdrop itself.
                */

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
       11. KEYBOARD CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Escape"
            ) {

                closeMenu();

                closeLightbox();

            }

        }
    );


    /* =====================================================
       12. ACCESSIBILITY FOR PROJECT IMAGES
       ===================================================== */

    galleryItems.forEach(
        (item) => {

            /*
               If the gallery item is not
               already a button/link, make
               keyboard activation possible.
            */

            const tagName =
                item.tagName.toLowerCase();


            if (
                tagName !== "button" &&
                tagName !== "a"
            ) {

                item.setAttribute(
                    "role",
                    "button"
                );

                item.setAttribute(
                    "tabindex",
                    "0"
                );


                item.addEventListener(
                    "keydown",
                    (event) => {

                        if (
                            event.key ===
                                "Enter" ||
                            event.key ===
                                " "
                        ) {

                            event.preventDefault();

                            const image =
                                item.querySelector(
                                    "img"
                                );


                            if (!image) return;


                            openLightbox(
                                image.currentSrc ||
                                image.src,

                                image.alt || ""
                            );

                        }

                    }
                );

            }

        }
    );


    /* =====================================================
       13. IMAGE LOADING SAFETY
       ===================================================== */

    const portfolioImages =
        document.querySelectorAll(
            "img"
        );


    portfolioImages.forEach(
        (image) => {

            /*
               Do not modify the first
               profile image loading behaviour.
            */

            if (
                !image.classList.contains(
                    "is-active"
                ) &&
                !image.hasAttribute(
                    "loading"
                )
            ) {

                image.setAttribute(
                    "loading",
                    "lazy"
                );

            }


            image.setAttribute(
                "decoding",
                "async"
            );

        }
    );


    /* =====================================================
       14. INITIAL NAVIGATION STATE
       ===================================================== */

    const updateNavigationFromScroll =
        () => {

            if (
                !navigationSections.length
            ) {
                return;
            }


            const headerOffset =
                (
                    header
                        ? header.offsetHeight
                        : 80
                ) + 80;


            let activeSection =
                navigationSections[0];


            navigationSections.forEach(
                (section) => {

                    const rect =
                        section.getBoundingClientRect();


                    if (
                        rect.top <=
                        headerOffset
                    ) {

                        activeSection =
                            section;

                    }

                }
            );


            if (activeSection) {

                setActiveNavigation(
                    activeSection.id
                );

            }

        };


    updateNavigationFromScroll();


    /*
       This scroll listener acts as a fallback
       and keeps navigation accurate near
       section boundaries.
    */

    let scrollTicking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (scrollTicking) {
                return;
            }


            scrollTicking = true;


            window.requestAnimationFrame(
                () => {

                    updateNavigationFromScroll();

                    scrollTicking = false;

                }
            );

        },
        { passive: true }
    );


    /* =====================================================
       15. INITIAL ACCESSIBILITY STATES
       ===================================================== */

    if (navToggle) {

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (lightbox) {

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       END
       ===================================================== */

});