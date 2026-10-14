// Mobile navigation and portfolio tabs
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const navContent = document.getElementById("nav-content");

  if (menuToggle && navContent) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navContent.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });

    navContent.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navContent.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !navContent.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navContent.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  // Contact form: prepare a WhatsApp message from the entered details.
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("message");

      if (!nameField || !emailField || !messageField) return;
      if (!contactForm.reportValidity()) return;

      const message =
        "Hello Victor, my name is " +
        nameField.value.trim() +
        ".\\nMy email: " +
        emailField.value.trim() +
        "\\n\\n" +
        messageField.value.trim();

      const whatsappUrl =
        "https://wa.me/2348108123223?text=" + encodeURIComponent(message);

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Projects / Certificates / Tech Stack tabs
  const tabButtons = [
    document.getElementById("projects-button"),
    document.getElementById("certificates-button"),
    document.getElementById("tech-button"),
  ];

  const tabPanels = [
    document.querySelector(".projects"),
    document.querySelector(".certificates"),
    document.querySelector(".tech-stack"),
  ];

  const tabSlider = document.querySelector(".tab-slider");

  function showTab(index) {
    tabPanels.forEach(function (panel, panelIndex) {
      if (!panel) return;

      panel.style.display = panelIndex === index ? "grid" : "none";
      panel.setAttribute("aria-hidden", String(panelIndex !== index));
    });

    tabButtons.forEach(function (button, buttonIndex) {
      if (!button) return;

      const isActive = buttonIndex === index;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    if (tabSlider) {
      tabSlider.style.transform = "translateX(" + index * 100 + "%)";
    }
  }

  tabButtons.forEach(function (button, index) {
    if (button) {
      button.setAttribute("role", "tab");
      button.addEventListener("click", function () {
        showTab(index);
      });
    }
  });

  // Ensure all panels have a predictable initial state.
  showTab(0);

  // Keyboard navigation for tabs.
  const tabsContainer = document.querySelector(".tabs");
  if (tabsContainer) {
    tabsContainer.setAttribute("role", "tablist");

    tabsContainer.addEventListener("keydown", function (event) {
      const currentIndex = tabButtons.findIndex(function (button) {
        return button && button.classList.contains("active");
      });

      let nextIndex = currentIndex;
      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabButtons.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
      } else {
        return;
      }

      event.preventDefault();
      showTab(nextIndex);
      if (tabButtons[nextIndex]) tabButtons[nextIndex].focus();
    });
  }
});
