document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("header[id], main section[id], footer[id]");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function setActiveLink() {
        const offset = 120;
        const scrollPosition = window.pageYOffset + offset;
        let currentId = null;

        sections.forEach(function (section) {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                if (currentId && href === "#" + currentId) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();

    const navbarCollapseElement = document.getElementById("primaryNavbar");
    let navbarCollapse = null;

    if (navbarCollapseElement && navbarCollapseElement.classList.contains("collapse") && typeof bootstrap !== "undefined") {
        navbarCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapseElement, { toggle: false });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbarCollapse && window.innerWidth < 768) {
                navbarCollapse.hide();
            }
        });
    });

    const subscribeForm = document.getElementById("subscribeForm");
    if (subscribeForm) {
        const emailInput = document.getElementById("subscriberEmail");
        const successAlert = document.getElementById("subscribeSuccess");
        const errorAlert = document.getElementById("subscribeError");
        const emailRegex = /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/;

        subscribeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!emailInput) {
                return;
            }

            const email = emailInput.value.trim();
            const isValid = emailRegex.test(email);

            if (successAlert) {
                successAlert.classList.add("d-none");
            }
            if (errorAlert) {
                errorAlert.classList.add("d-none");
            }

            if (isValid) {
                if (successAlert) {
                    successAlert.classList.remove("d-none");
                }
                emailInput.value = "";
            } else {
                if (errorAlert) {
                    errorAlert.classList.remove("d-none");
                }
                emailInput.focus();
            }
        });
    }
});

