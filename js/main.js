(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    const showNavMenu = () => {
        navMenu.classList.toggle("open");
        fadeOutEffect();
    };

    const hideNavMenu = () => {
        navMenu.classList.remove("open");
        fadeOutEffect();
        toggleBodyScrolling();
    };

    const fadeOutEffect = () => {
        const fadeEffect = document.querySelector(".fade-out-effect");
        fadeEffect.classList.add("active");
        toggleBodyScrolling();
        setTimeout(() => {
            fadeEffect.classList.remove("active");
        }, 300);
    };

   
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item") && event.target.hash !== "") {
            event.preventDefault();
            const hash = event.target.hash;

        
            document.querySelector(".section.active").classList.add("hide");
            document.querySelector(".section.active").classList.remove("active");
            document.querySelector(hash).classList.add("active");
            document.querySelector(hash).classList.remove("hide");

           
            const activeNavItem = navMenu.querySelector(".active");
            activeNavItem.classList.add("outer-shadow", "hover-in-shadow");
            activeNavItem.classList.remove("active", "inner-shadow");

            if (navMenu.classList.contains("open")) {
                event.target.classList.add("active", "inner-shadow");
                event.target.classList.remove("outer-shadow", "hover-in-shadow");
                hideNavMenu();
            } else {
                navMenu.querySelectorAll(".link-item").forEach((item) => {
                    if (hash === item.hash) {
                        item.classList.add("active", "inner-shadow");
                        item.classList.remove("outer-shadow", "hover-in-shadow");
                    }
                });
                fadeOutEffect();
            }

            // Update URL hash
            window.location.hash = hash;
        }
    });
})();


(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");

            // Update active tab
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");

            // Update active content
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    });
})();


(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        preBtn = popup.querySelector(".pp-pre"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetails = popup.querySelector(".pp-project-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    const togglePopup = () => {
        popup.classList.toggle("open");
        toggleBodyScrolling();
    };

    const updateSlideshow = () => {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        const loader = popup.querySelector(".pp-loader");

        loader.classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            loader.classList.remove("active");
        };

        popup.querySelector(".pp-counter").textContent = `${slideIndex + 1} of ${screenshots.length}`;
    };

    const updatePopupDetails = () => {
        const itemDetails = portfolioItems[itemIndex].querySelector(".portfolio-item-details");
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").textContent;
        const category = portfolioItems[itemIndex].getAttribute("data-category").split("-").join(" ");

        if (!itemDetails) {
            projectDetailsBtn.style.display = "none";
            projectDetailsContainer.style.maxHeight = "0px";
            projectDetailsContainer.classList.remove("active");
            return;
        }

        projectDetails.innerHTML = itemDetails.innerHTML;
        popup.querySelector(".pp-title h2").textContent = title;
        popup.querySelector(".pp-project-category").textContent = category;
        projectDetailsBtn.style.display = "block";
    };

    const togglePopupDetails = () => {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.replace("fa-minus", "fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = "0px";
        } else {
            projectDetailsBtn.querySelector("i").classList.replace("fa-plus", "fa-minus");
            projectDetailsContainer.style.maxHeight = `${projectDetailsContainer.scrollHeight}px`;
            projectDetailsContainer.classList.add("active");
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    };


    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("outer-shadow", "active");

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        }
    });

    portfolioItemsContainer.addEventListener("click", (event) => {
        const portfolioItem = event.target.closest(".portfolio-item-inner")?.parentElement;
        if (portfolioItem) {
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-image img").getAttribute("data-screenshots").split(",");

            slideIndex = 0;
            togglePopup();
            updateSlideshow();
            updatePopupDetails();

            preBtn.style.display = screenshots.length > 1 ? "block" : "none";
            nextBtn.style.display = screenshots.length > 1 ? "block" : "none";
        }
    });

    closeBtn.addEventListener("click", () => {
        togglePopup();
        if (projectDetailsContainer.classList.contains("active")) {
            togglePopupDetails();
        }
    });

    preBtn.addEventListener("click", () => {
        slideIndex = slideIndex === 0 ? screenshots.length - 1 : slideIndex - 1;
        updateSlideshow();
    });

    nextBtn.addEventListener("click", () => {
        slideIndex = slideIndex === screenshots.length - 1 ? 0 : slideIndex + 1;
        updateSlideshow();
    });

    projectDetailsBtn.addEventListener("click", togglePopupDetails);
})();


function toggleBodyScrolling() {
    document.body.classList.toggle("stop-scrolling");
}


window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 600);
});
