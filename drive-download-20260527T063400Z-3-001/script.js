document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            // Toggle icon menu / close
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // 2. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll(".reveal");
    
    if (revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // 3. About Image 16:9 Hover Scrolling Logic
    const imageContainer = document.getElementById("about-image-container");
    const scrollingImg = document.getElementById("about-scrolling-img");

    if (imageContainer && scrollingImg) {
        // Adjust scroll transition speed and value dynamically based on image height
        const calculateAndScroll = () => {
            const containerHeight = imageContainer.clientHeight;
            const imgHeight = scrollingImg.clientHeight;
            const scrollDistance = imgHeight - containerHeight;

            if (scrollDistance > 0) {
                // Determine a proportional transition duration (approx 1s per 120px)
                const duration = Math.max(4, Math.min(12, scrollDistance / 120));
                scrollingImg.style.transitionDuration = `${duration}s`;

                imageContainer.onmouseenter = () => {
                    scrollingImg.style.transform = `translateY(-${scrollDistance}px)`;
                };
                imageContainer.onmouseleave = () => {
                    scrollingImg.style.transform = 'translateY(0)';
                };
            }
        };

        // Recalculate on image load or window resize
        if (scrollingImg.complete) {
            calculateAndScroll();
        } else {
            scrollingImg.addEventListener("load", calculateAndScroll);
        }
        window.addEventListener("resize", calculateAndScroll);

        // 4. Lightbox Modal Interaction
        const lightbox = document.getElementById("lightbox");
        const lightboxClose = document.getElementById("lightbox-close");

        if (lightbox && lightboxClose) {
            imageContainer.addEventListener("click", () => {
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent background scroll
            });

            const closeLightbox = () => {
                lightbox.classList.remove("active");
                document.body.style.overflow = ""; // Restore scroll
            };

            lightboxClose.addEventListener("click", closeLightbox);
            
            // Close lightbox on click outside the image
            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox || e.target.classList.contains("lightbox-content-wrapper")) {
                    closeLightbox();
                }
            });

            // Close lightbox on Escape key
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && lightbox.classList.contains("active")) {
                    closeLightbox();
                }
            });
        }
    }
});
