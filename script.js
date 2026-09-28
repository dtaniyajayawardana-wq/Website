/* =========================================================
   TANIYA JAYAWARDENA — PORTFOLIO
   script.js
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SETTINGS
       ===================================================== */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       02. CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       03. HEADER
       ===================================================== */

    const header =
        document.getElementById("siteHeader");

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

    const navToggle =
        document.getElementById("navToggle");

    const navMenu =
        document.getElementById("navMenu");


    const openMenu = () => {

        if (!navToggle || !navMenu) return;

        navToggle.classList.add("is-open");
        navMenu.classList.add("is-open");

        navToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );
    };


    const closeMenu = () => {

        if (!navToggle || !navMenu) return;

        navToggle.classList.remove("is-open");
        navMenu.classList.remove("is-open");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    };


    const toggleMenu = () => {

        if (!navToggle || !navMenu) return;

        if (
            navMenu.classList.contains(
                "is-open"
            )
        ) {
            closeMenu();
        } else {
            openMenu();
        }
    };


    if (navToggle) {

        navToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleMenu();
            }
        );
    }


    if (navMenu) {

        navMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });
    }


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 980) {
                closeMenu();
            }
        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }
        }
    );


    /* =====================================================
       05. PROFILE PHOTO SLIDER
       EXACTLY 5 SECONDS
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


    /*
       Force every portrait to load immediately.

       These three images should NEVER be lazy loaded.
    */

    profileSlides.forEach((slide) => {

        slide.loading = "eager";
        slide.decoding = "async";

        const preload = new Image();

        preload.src =
            slide.currentSrc ||
            slide.src;
    });


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
    };


    const stopProfileSlider = () => {

        if (profileTimer !== null) {

            window.clearTimeout(
                profileTimer
            );

            profileTimer = null;
        }
    };


    /*
       setTimeout is used instead of setInterval.

       Each successful change creates the next
       5-second countdown. This avoids overlapping
       timers after indicator clicks/tab changes.
    */

    const scheduleNextProfile = () => {

        stopProfileSlider();

        if (profileSlides.length < 2) {
            return;
        }

        profileTimer =
            window.setTimeout(
                () => {

                    showProfileSlide(
                        currentProfileIndex + 1
                    );

                    scheduleNextProfile();

                },
                PROFILE_INTERVAL
            );
    };


    if (profileSlides.length) {

        showProfileSlide(0);

        scheduleNextProfile();
    }


    /*
       Manual indicator controls
    */

    profileIndicators.forEach(
        (indicator, index) => {

            indicator.addEventListener(
                "click",
                () => {

                    let requestedIndex =
                        Number(
                            indicator.dataset.index
                        );


                    if (
                        !Number.isInteger(
                            requestedIndex
                        ) ||
                        requestedIndex < 0 ||
                        requestedIndex >=
                            profileSlides.length
                    ) {
                        requestedIndex = index;
                    }


                    showProfileSlide(
                        requestedIndex
                    );

                    scheduleNextProfile();
                }
            );
        }
    );


    /*
       Pause only while the tab is actually hidden.

       IMPORTANT:
       We do NOT disable the carousel because of
       prefers-reduced-motion. Your previous script
       did that, which can make the photos appear
       permanently stuck for users/devices with that
       preference enabled.
    */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopProfileSlider();

            } else {

                scheduleNextProfile();
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

        window.setInterval(
            changeRole,
            3200
        );
    }


    /* =====================================================
       07. REVEAL ON SCROLL
       ===================================================== */

    const revealElements =
        Array.from(
            document.querySelectorAll(
                ".reveal"
            )
        );


    if (
        reduceMotion ||
        !("IntersectionObserver" in window)
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


    internalLinks.forEach((link) => {

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


                let target = null;


                try {

                    target =
                        document.querySelector(
                            href
                        );

                } catch (error) {

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
    });


    /* =====================================================
       09. ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        Array.from(
            document.querySelectorAll(
                '.nav-menu a[href^="#"]'
            )
        ).filter((link) => {

            const href =
                link.getAttribute(
                    "href"
                );

            return (
                href &&
                href !== "#"
            );
        });


    const navigationSections =
        navLinks
            .map((link) => {

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

                } catch (error) {

                    return null;
                }
            })
            .filter(Boolean);


    const setActiveNavigation =
        (sectionId) => {

            navLinks.forEach(
                (link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${sectionId}`
                    );
                }
            );
        };


    if (
        navigationSections.length &&
        "IntersectionObserver" in window
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
       10. PROJECT LIGHTBOX
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


    const galleryItems =
        Array.from(
            document.querySelectorAll(
                ".project-main-image, .gallery-item"
            )
        );


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
    };


    galleryItems.forEach((item) => {

        const activateGalleryItem =
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
            };


        item.addEventListener(
            "click",
            activateGalleryItem
        );


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
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        activateGalleryItem();
                    }
                }
            );
        }
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


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeLightbox();
            }
        }
    );


    /* =====================================================
       11. IMAGE LOADING
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            /*
               Never lazy-load profile carousel images.
            */

            if (
                image.matches(
                    "[data-profile-slide]"
                )
            ) {

                image.loading =
                    "eager";

                image.decoding =
                    "async";

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


            image.decoding =
                "async";
        });


    /* =====================================================
       12. NAVIGATION SCROLL FALLBACK
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


    let scrollTicking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (scrollTicking) return;


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
       13. INITIAL ACCESSIBILITY STATES
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

});