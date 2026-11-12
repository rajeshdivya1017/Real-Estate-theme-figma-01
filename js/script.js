/* =========================================================
   STACKLY REAL ESTATE
   HOME PAGE JAVASCRIPT

   File: js/script.js

   FEATURES:
   1. Automatic Property Image Slider
   2. Previous / Next Navigation
   3. Image Dots Navigation
   4. Hover Pause
   5. Favourite Properties
   6. LocalStorage
   7. Property Search
   8. Responsive Support

========================================================= */

(() => {

    "use strict";


    /* =====================================================
       1. CONFIGURATION
    ===================================================== */

    const CONFIG = {

        sliderInterval: 2500,

        favoriteStorageKey: "stacklyFavoriteProperties",

        searchPage: "buy.html"

    };


    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       2. SELECT ELEMENTS
    ===================================================== */

    const propertyCards = document.querySelectorAll(
        ".property-card"
    );



    /* =====================================================
       3. LOCAL STORAGE HELPERS
    ===================================================== */

    function getFavorites() {

        try {

            const stored = localStorage.getItem(
                CONFIG.favoriteStorageKey
            );

            const parsed = stored
                ? JSON.parse(stored)
                : [];

            return Array.isArray(parsed)
                ? parsed.filter(id => typeof id === "string")
                : [];

        } catch (error) {

            console.error(
                "Unable to read favorite properties:",
                error
            );

            return [];

        }

    }



    function saveFavorites(favorites) {

        try {

            localStorage.setItem(
                CONFIG.favoriteStorageKey,
                JSON.stringify(favorites)
            );
            window.dispatchEvent(new CustomEvent("stacklyFavoritesChanged"));

            return true;

        } catch (error) {

            console.error(
                "Unable to save favorite properties:",
                error
            );

            return false;

        }

    }



    /* =====================================================
       4. PROPERTY IMAGE SLIDER
    ===================================================== */

    function initializePropertySliders() {

        propertyCards.forEach(card => {

            const images = Array.from(
                card.querySelectorAll(".property-slide")
            );


            const previousButton = card.querySelector(
                ".slide-prev"
            );


            const nextButton = card.querySelector(
                ".slide-next"
            );


            const counter = card.querySelector(
                ".slide-count"
            );


            const dots = Array.from(
                card.querySelectorAll(".slider-dots button")
            );


            const imageWrapper = card.querySelector(
                ".property-image-wrapper"
            );


            if (!images.length) return;


            let currentIndex = 0;

            let sliderTimer = null;

            let isHovered = false;

            let isFocused = false;


            const totalImages = images.length;



            /* =========================================
               UPDATE IMAGE
            ========================================== */

            function showImage(index) {

                currentIndex = (
                    index + totalImages
                ) % totalImages;


                images.forEach((image, imageIndex) => {

                    const active = imageIndex === currentIndex;


                    image.classList.toggle(
                        "active",
                        active
                    );


                    image.setAttribute(
                        "aria-hidden",
                        String(!active)
                    );

                });



                /* UPDATE COUNTER */

                if (counter) {

                    counter.textContent =
                        `${currentIndex + 1} / ${totalImages}`;

                }



                /* UPDATE DOTS */

                dots.forEach((dot, dotIndex) => {

                    const active = dotIndex === currentIndex;


                    dot.classList.toggle(
                        "active",
                        active
                    );


                    dot.setAttribute(
                        "aria-current",
                        active ? "true" : "false"
                    );

                });

            }



            /* =========================================
               NEXT IMAGE
            ========================================== */

            function nextImage() {

                showImage(currentIndex + 1);

            }



            /* =========================================
               PREVIOUS IMAGE
            ========================================== */

            function previousImage() {

                showImage(currentIndex - 1);

            }



            /* =========================================
               START AUTOMATIC SLIDER
            ========================================== */

            function startSlider() {

                if (prefersReducedMotion) return;

                if (totalImages <= 1) return;

                if (sliderTimer) return;

                if (document.hidden) return;

                if (isHovered || isFocused) return;


                sliderTimer = window.setInterval(() => {

                    nextImage();

                }, CONFIG.sliderInterval);

            }



            /* =========================================
               STOP AUTOMATIC SLIDER
            ========================================== */

            function stopSlider() {

                if (sliderTimer) {

                    window.clearInterval(
                        sliderTimer
                    );

                    sliderTimer = null;

                }

            }



            /* =========================================
               RESTART SLIDER
            ========================================== */

            function restartSlider() {

                stopSlider();

                startSlider();

            }



            /* =========================================
               NEXT BUTTON EVENT
            ========================================== */

            if (nextButton) {

                nextButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();

                        nextImage();

                        restartSlider();

                    }
                );

            }



            /* =========================================
               PREVIOUS BUTTON EVENT
            ========================================== */

            if (previousButton) {

                previousButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();

                        previousImage();

                        restartSlider();

                    }
                );

            }



            /* =========================================
               DOT NAVIGATION
            ========================================== */

            dots.forEach((dot, index) => {

                dot.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();

                        showImage(index);

                        restartSlider();

                    }
                );

            });



            /* =========================================
               MOUSE HOVER PAUSE
            ========================================== */

            if (imageWrapper) {

                imageWrapper.addEventListener(
                    "mouseenter",
                    () => {

                        isHovered = true;

                        stopSlider();

                    }
                );


                imageWrapper.addEventListener(
                    "mouseleave",
                    () => {

                        isHovered = false;

                        startSlider();

                    }
                );

            }



            /* =========================================
               KEYBOARD FOCUS PAUSE
            ========================================== */

            card.addEventListener(
                "focusin",
                () => {

                    isFocused = true;

                    stopSlider();

                }
            );


            card.addEventListener(
                "focusout",
                event => {

                    if (
                        !card.contains(event.relatedTarget)
                    ) {

                        isFocused = false;

                        startSlider();

                    }

                }
            );



            /* =========================================
               INITIALIZE SLIDER
            ========================================== */

            showImage(0);

            startSlider();



            /* =========================================
               STORE SLIDER CONTROLS
            ========================================== */

            card._stacklySlider = {

                next: nextImage,

                previous: previousImage,

                show: showImage,

                start: startSlider,

                stop: stopSlider

            };

        });

    }



    /* =====================================================
       5. PAUSE SLIDERS WHEN TAB IS NOT VISIBLE
    ===================================================== */

    function initializeVisibilityControl() {

        document.addEventListener(
            "visibilitychange",
            () => {

                propertyCards.forEach(card => {

                    const slider = card._stacklySlider;

                    if (!slider) return;


                    if (document.hidden) {

                        slider.stop();

                    } else {

                        slider.start();

                    }

                });

            }
        );

    }



    /* =====================================================
       6. FAVOURITE PROPERTY SYSTEM
    ===================================================== */

    function initializeFavorites() {

        const favoriteButtons = document.querySelectorAll(
            ".property-favorite"
        );


        let favorites = getFavorites();



        /* =========================================
           UPDATE BUTTON APPEARANCE
        ========================================== */

        function updateFavoriteButton(button, isSaved) {

            button.classList.toggle(
                "is-saved",
                isSaved
            );


            button.textContent = isSaved
                ? "♥"
                : "♡";


            button.setAttribute(
                "aria-pressed",
                String(isSaved)
            );


            button.setAttribute(
                "aria-label",
                isSaved
                    ? "Remove from saved properties"
                    : "Save property"
            );

        }



        /* =========================================
           INITIALIZE BUTTONS
        ========================================== */

        favoriteButtons.forEach(button => {

            const card = button.closest(
                ".property-card"
            );


            if (!card) return;


            const propertyId = card.dataset.propertyId;


            if (!propertyId) return;


            const isSaved = favorites.includes(
                propertyId
            );


            updateFavoriteButton(
                button,
                isSaved
            );



            /* =====================================
               TOGGLE FAVORITE
            ====================================== */

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const alreadySaved = favorites.includes(
                        propertyId
                    );


                    if (alreadySaved) {

                        favorites = favorites.filter(
                            id => id !== propertyId
                        );

                    } else {

                        favorites.push(
                            propertyId
                        );

                    }


                    const savedSuccessfully = saveFavorites(
                        favorites
                    );


                    if (!savedSuccessfully) {

                        return;

                    }


                    updateFavoriteButton(
                        button,
                        !alreadySaved
                    );


                    showFavoriteFeedback(
                        !alreadySaved
                    );

                }
            );

        });

    }



    /* =====================================================
       7. FAVOURITE FEEDBACK
    ===================================================== */

    function showFavoriteFeedback(isSaved) {

        let toast = document.querySelector(
            ".home-feedback-toast"
        );


        if (!toast) {

            toast = document.createElement("div");

            toast.className = "home-feedback-toast";

            toast.setAttribute(
                "role",
                "status"
            );

            toast.setAttribute(
                "aria-live",
                "polite"
            );


            Object.assign(toast.style, {

                position: "fixed",

                right: "22px",

                bottom: "22px",

                zIndex: "1500",

                padding: "14px 20px",

                borderRadius: "8px",

                background: "#102a43",

                color: "#ffffff",

                fontSize: "13px",

                fontWeight: "600",

                boxShadow: "0 8px 25px rgba(0,0,0,.15)",

                opacity: "0",

                transform: "translateY(12px)",

                transition: "all .25s ease"

            });


            document.body.appendChild(toast);

        }



        toast.textContent = isSaved

            ? "Property added to your saved list!"

            : "Property removed from saved list!";


        toast.style.opacity = "1";

        toast.style.transform = "translateY(0)";


        window.clearTimeout(
            toast._timer
        );


        toast._timer = window.setTimeout(() => {

            toast.style.opacity = "0";

            toast.style.transform = "translateY(12px)";

        }, 2300);

    }



    /* =====================================================
       8. PROPERTY SEARCH
    ===================================================== */

    function initializePropertySearch() {

        const searchForm = document.querySelector(
            "#propertySearchForm"
        );


        if (!searchForm) return;


        searchForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const location = document.querySelector(
                    "#searchLocation"
                )?.value.trim() || "";


                const type = document.querySelector(
                    "#searchType"
                )?.value || "";


                const budget = document.querySelector(
                    "#searchBudget"
                )?.value || "";


                const intent = document.querySelector(
                    "#searchIntent"
                )?.value || "Buy";



                /* =================================
                   BUILD SEARCH PARAMETERS
                ================================== */

                const params = new URLSearchParams();


                if (location) {

                    params.set(
                        "location",
                        location
                    );

                }


                if (type) {

                    params.set(
                        "type",
                        type
                    );

                }


                if (budget) {

                    params.set(
                        "budget",
                        budget
                    );

                }


                if (intent) {

                    params.set(
                        "intent",
                        intent
                    );

                }



                /* =================================
                   NAVIGATE TO BUY PAGE
                ================================== */

                const query = params.toString();


                const destination = query

                    ? `${CONFIG.searchPage}?${query}`

                    : CONFIG.searchPage;


                window.location.href = destination;

            }
        );

    }



    /* =====================================================
       9. PROPERTY IMAGE ERROR HANDLING
    ===================================================== */

    function initializeImageHandling() {

        const images = document.querySelectorAll(
            ".category-image img, .property-slide"
        );


        images.forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-load-error"
                    );


                    image.alt = "Property image unavailable";


                    image.style.background = "#e8edf2";

                },
                { once: true }
            );

        });

    }



    /* =====================================================
       10. PROPERTY CARD INTERACTION
    ===================================================== */

    function initializeCardAccessibility() {

        propertyCards.forEach(card => {

            const imageLink = card.querySelector(
                ".property-image-link"
            );


            if (!imageLink) return;


            imageLink.setAttribute(
                "aria-label",
                "Explore property details and view all images"
            );

        });

    }



    /* =====================================================
       11. INITIALIZE HOME PAGE
    ===================================================== */

    function initializeHomePage() {

        initializePropertySliders();

        initializeVisibilityControl();

        initializeFavorites();

        initializePropertySearch();

        initializeImageHandling();

        initializeCardAccessibility();


        console.log(
            "STACKLY Real Estate Home Page initialized successfully."
        );

    }



    /* =====================================================
       12. DOM READY
    ===================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(

            "DOMContentLoaded",

            initializeHomePage,

            { once: true }

        );

    } else {

        initializeHomePage();

    }


})();