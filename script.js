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

    // 3. Dynamic Interactive Scrolling Images & Lightbox
    const scrollingContainers = document.querySelectorAll(".interactive-16-9-container");
    const lightbox = document.getElementById("lightbox");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxScrollContainer = document.querySelector(".lightbox-scroll-container");
    const lightboxCaption = document.querySelector(".lightbox-caption");

    // Facilities tab switcher
    const facilityTabs = document.querySelectorAll(".facility-tab");
    const facilityPanels = document.querySelectorAll(".facility-panel");

    facilityTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            facilityTabs.forEach(item => item.classList.remove("active"));
            facilityPanels.forEach(panel => panel.classList.remove("active"));

            tab.classList.add("active");
            const panel = document.getElementById(`panel-${target}`);
            if (panel) {
                panel.classList.add("active");
            }
        });
    });

    // Recalculate scrolling speed and setup listeners for each scrolling container
    scrollingContainers.forEach(container => {
        const img = container.querySelector(".scrolling-img");
        if (!img) return;

        const calculateAndScroll = () => {
            const containerHeight = container.clientHeight;
            const imgHeight = img.clientHeight;
            const scrollDistance = imgHeight - containerHeight;

            if (scrollDistance > 0) {
                const duration = Math.max(4, Math.min(12, scrollDistance / 120));
                img.style.transitionDuration = `${duration}s`;

                container.onmouseenter = () => {
                    img.style.transform = `translateY(-${scrollDistance}px)`;
                };
                container.onmouseleave = () => {
                    img.style.transform = 'translateY(0)';
                };
            }
        };

        if (img.complete) {
            calculateAndScroll();
        } else {
            img.addEventListener("load", calculateAndScroll);
        }
        window.addEventListener("resize", calculateAndScroll);

        // Lightbox trigger for scrolling images
        if (lightbox && lightboxScrollContainer) {
            container.addEventListener("click", () => {
                // Clear any dynamic content
                lightboxScrollContainer.innerHTML = '';
                // Re-create the image inside container
                const newImg = document.createElement("img");
                newImg.src = img.src;
                newImg.alt = img.alt;
                newImg.className = "lightbox-img";
                lightboxScrollContainer.appendChild(newImg);

                if (lightboxCaption) {
                    lightboxCaption.textContent = img.alt + " 상세 (마우스 스크롤하여 전체 보기)";
                }
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        }
    });

    // Setup lightbox for facility gallery images
    const facilityGalleryItems = document.querySelectorAll(".facility-gallery-item");
    facilityGalleryItems.forEach(item => {
        if (lightbox && lightboxScrollContainer) {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                const src = item.dataset.img || (img ? img.src : "");
                const caption = item.dataset.caption || (img ? img.alt : "");
                if (!src) return;

                lightboxScrollContainer.innerHTML = "";
                const newImg = document.createElement("img");
                newImg.src = src;
                newImg.alt = caption;
                newImg.className = "lightbox-img";
                lightboxScrollContainer.appendChild(newImg);

                if (lightboxCaption) {
                    lightboxCaption.textContent = img.alt + " 상세 보기";
                }
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        }
    });

    // Setup lightbox for company promotional videos
    const videoLightboxTriggers = document.querySelectorAll(".video-lightbox-trigger");
    videoLightboxTriggers.forEach(trigger => {
        if (lightbox && lightboxScrollContainer) {
            trigger.addEventListener("click", () => {
                const src = trigger.dataset.video;
                const caption = trigger.dataset.caption || "회사 홍보 영상";
                if (!src) return;

                lightboxScrollContainer.innerHTML = "";
                lightboxScrollContainer.classList.add("video-mode");
                const newVideo = document.createElement("video");
                newVideo.src = src;
                newVideo.className = "lightbox-video";
                newVideo.controls = true;
                newVideo.autoplay = true;
                newVideo.playsInline = true;
                lightboxScrollContainer.appendChild(newVideo);

                if (lightboxCaption) {
                    lightboxCaption.textContent = caption;
                }
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
                newVideo.play().catch(() => {});
            });
        }
    });

    // Setup lightbox for certificate cards (HTML cloned overlays)
    const certificateWrappers = document.querySelectorAll(".certificate-wrapper");
    certificateWrappers.forEach(wrapper => {
        if (lightbox && lightboxScrollContainer) {
            wrapper.addEventListener("click", () => {
                const card = wrapper.querySelector(".certificate-card");
                if (!card) return;

                // Clear container and clone card
                lightboxScrollContainer.innerHTML = '';
                const clonedCard = card.cloneNode(true);
                // Make the cloned card styled nicely inside the lightbox
                clonedCard.style.maxWidth = "500px";
                clonedCard.style.transform = "none";
                clonedCard.style.boxShadow = "none";
                lightboxScrollContainer.appendChild(clonedCard);

                if (lightboxCaption) {
                    const titleText = card.querySelector(".cert-title") ? card.querySelector(".cert-title").textContent : "확인서";
                    lightboxCaption.textContent = titleText + " 상세 보기";
                }
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        }
    });

    // Universal Lightbox Close Logic
    if (lightbox && lightboxClose) {
        const closeLightbox = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
            if (lightboxScrollContainer) {
                lightboxScrollContainer.querySelectorAll("video").forEach(video => {
                    video.pause();
                    video.removeAttribute("src");
                    video.load();
                });
                lightboxScrollContainer.innerHTML = "";
                lightboxScrollContainer.classList.remove("video-mode");
            }
        };

        lightboxClose.addEventListener("click", closeLightbox);
        
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target.classList.contains("lightbox-content-wrapper")) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("active")) {
                closeLightbox();
            }
        });
    }

    // 4. Map Tab Switcher
    const mapTabs = document.querySelectorAll(".map-tab");
    const naverLink = document.getElementById("naver-map-link");
    const kakaoLink = document.getElementById("kakao-map-link");

    if (mapTabs.length > 0 && naverLink && kakaoLink) {
        mapTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const target = tab.dataset.target;

                // Deactivate all tabs
                mapTabs.forEach(t => {
                    t.classList.remove("active");
                    t.style.borderBottom = "3px solid transparent";
                    t.style.color = "#718096";
                });

                // Activate clicked tab
                tab.classList.add("active");
                if (target === "naver") {
                    tab.style.borderBottom = "3px solid #03C75A";
                    tab.style.color = "#03C75A";
                    naverLink.style.display = "block";
                    kakaoLink.style.display = "none";
                } else if (target === "kakao") {
                    tab.style.borderBottom = "3px solid #FFCD00";
                    tab.style.color = "#191919";
                    naverLink.style.display = "none";
                    kakaoLink.style.display = "block";
                }
            });
        });
    }
});
