/* =========================================================
   STACKLY REAL ESTATE
   HOME HERO BACKGROUND IMAGE SLIDER
   File: js/hero-slider.js

   Independent hero slider.
   Does not modify existing property sliders,
   favorites, or property search functionality.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       1. SELECT HERO SLIDER ELEMENTS
    ===================================================== */

    const heroSlider = document.querySelector(".sr-hero-slider");

    // Stop safely if hero slider is not present.
    if (!heroSlider) return;

    const slides = Array.from(
        heroSlider.querySelectorAll(".sr-hero-slide")
    );

    const dots = Array.from(
        heroSlider.querySelectorAll(".sr-hero-dots button")
    );

    const previousButton = heroSlider.querySelector(
        "[data-hero-prev]"
    );

    const nextButton = heroSlider.querySelector(
        "[data-hero-next]"
    );

    if (slides.length <= 1) return;


    /* =====================================================
       2. SLIDER CONFIGURATION
    ===================================================== */

    const AUTO_SLIDE_INTERVAL = 2500;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let currentSlide = 0;

    let autoSlideTimer = null;

    let isPaused = false;


    /* =====================================================
       3. SHOW SELECTED SLIDE
    ===================================================== */

    function showSlide(index) {

        // Keep the index inside the available slide range.
        currentSlide = (index + slides.length) % slides.length;


        slides.forEach((slide, slideIndex) => {

            const isActive = slideIndex === currentSlide;

            slide.classList.toggle("active", isActive);

            slide.setAttribute(
                "aria-hidden",
                String(!isActive)
            );

        });


        // Update navigation dots.
        dots.forEach((dot, dotIndex) => {

            const isActive = dotIndex === currentSlide;

            dot.classList.toggle("active", isActive);

            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });

    }


    /* =====================================================
       4. NEXT SLIDE
    ===================================================== */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* =====================================================
       5. PREVIOUS SLIDE
    ===================================================== */

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    /* =====================================================
       6. STOP AUTO SLIDE
    ===================================================== */

    function stopAutoSlide() {

        if (autoSlideTimer !== null) {

            window.clearInterval(autoSlideTimer);

            autoSlideTimer = null;

        }

    }


    /* =====================================================
       7. START AUTO SLIDE
    ===================================================== */

    function startAutoSlide() {

        stopAutoSlide();

        if (reducedMotion.matches) return;

        if (isPaused) return;

        if (document.hidden) return;


        autoSlideTimer = window.setInterval(() => {

            nextSlide();

        }, AUTO_SLIDE_INTERVAL);

    }


    /* =====================================================
       8. RESTART AUTO SLIDE AFTER MANUAL NAVIGATION
    ===================================================== */

    function restartAutoSlide() {

        stopAutoSlide();

        startAutoSlide();

    }


    /* =====================================================
       9. NEXT BUTTON EVENT
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            nextSlide();

            restartAutoSlide();

        });

    }


    /* =====================================================
       10. PREVIOUS BUTTON EVENT
    ===================================================== */

    if (previousButton) {

        previousButton.addEventListener("click", () => {

            previousSlide();

            restartAutoSlide();

        });

    }


    /* =====================================================
       11. DOT NAVIGATION EVENTS
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            restartAutoSlide();

        });

    });


    /* =====================================================
       12. PAUSE ON MOUSE HOVER
    ===================================================== */

    heroSlider.addEventListener("mouseenter", () => {

        isPaused = true;

        stopAutoSlide();

    });


    heroSlider.addEventListener("mouseleave", () => {

        isPaused = false;

        startAutoSlide();

    });


    /* =====================================================
       13. PAUSE WHEN KEYBOARD FOCUS IS INSIDE SLIDER
    ===================================================== */

    heroSlider.addEventListener("focusin", () => {

        isPaused = true;

        stopAutoSlide();

    });


    heroSlider.addEventListener("focusout", (event) => {

        if (!heroSlider.contains(event.relatedTarget)) {

            isPaused = false;

            startAutoSlide();

        }

    });


    /* =====================================================
       14. PAUSE WHEN BROWSER TAB IS HIDDEN
    ===================================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            stopAutoSlide();

        } else {

            startAutoSlide();

        }

    });


    /* =====================================================
       15. REDUCED MOTION SUPPORT
    ===================================================== */

    function handleMotionPreference() {

        if (reducedMotion.matches) {

            stopAutoSlide();

        } else {

            startAutoSlide();

        }

    }


    if (typeof reducedMotion.addEventListener === "function") {

        reducedMotion.addEventListener(
            "change",
            handleMotionPreference
        );

    } else if (typeof reducedMotion.addListener === "function") {

        reducedMotion.addListener(handleMotionPreference);

    }


    /* =====================================================
       16. INITIALIZE SLIDER
    ===================================================== */

    // Ensure the first slide is visible.
    showSlide(0);

    // Start automatic background transitions.
    startAutoSlide();


    /* =====================================================
       17. CLEANUP
    ===================================================== */

    window.addEventListener("pagehide", () => {

        stopAutoSlide();

    });


});