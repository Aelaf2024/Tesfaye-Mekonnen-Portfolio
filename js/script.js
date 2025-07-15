function toggleMenu() {
  document.querySelector(".menu").classList.toggle("active");
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// close menu on link click
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".menu").classList.remove("active");
  });
});

// Step 2. Create the Agent Logic
function respondToQuestion(input) {
  const query = input.toLowerCase();

  if (query.includes("web")) return skillBase["web development"];
  if (query.includes("ai")) return skillBase["ai prompting"];
  if (query.includes("analytics") || query.includes("data"))
    return skillBase["data analytics"];
  if (query.includes("sql")) return skillBase["sql server"];

  return [
    "I'm trained on Tesfaye’s tech skills. Try asking about: Web Development, AI Prompting, Data Analytics, or SQL Server.",
  ];
}
// Step 3
//🖥️ Step 3: Add a Simple UI
function handleAgent() {
  const input = document.getElementById("agentInput").value;
  const response = respondToQuestion(input);
  document.getElementById("agentResponse").innerHTML =
    "<ul>" + response.map((r) => `<li>${r}</li>`).join("") + "</ul>";

}



console.log(document.getElementById("agentInput")); // should NOT be null


document.getElementById("agentInput").value = "";
document.getElementById("agentInput").focus();
const navLinks = document.getElementById("navLinks");

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous messages
    formStatus.style.display = "none";
    formStatus.className = "form-status"; // Reset classes
    clearErrorMessages();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Basic validation
    if (name === "") {
      displayErrorMessage("nameError", "Name is required.");
      isValid = false;
    }
    if (email === "") {
      displayErrorMessage("emailError", "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      displayErrorMessage("emailError", "Please enter a valid email address.");
      isValid = false;
    }
    if (subject === "") {
      displayErrorMessage("subjectError", "Subject is required.");
      isValid = false;
    }
    if (message === "") {
      displayErrorMessage("messageError", "Message is required.");
      isValid = false;
    }

    if (isValid) {
      // Since there's no backend, simulate success
      formStatus.textContent =
        "Thank you for your message! I will get back to you shortly.";
      formStatus.classList.add("success");
      formStatus.style.display = "block";

      // Log form data to console (for development/debugging)
      console.log("Form Submitted (No Backend):");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Subject:", subject);
      console.log("Message:", message);

      // Optionally, clear the form fields after successful submission
      contactForm.reset();
    } else {
      formStatus.textContent = "Please correct the errors in the form.";
      formStatus.classList.add("error");
      formStatus.style.display = "block";
    }
  });

  function displayErrorMessage(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      element.textContent = "";
      element.style.display = "none";
    });
  }

  function isValidEmail(email) {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger-icon");
  const navLinks = document.getElementById("navLinks"); // Using ID as per your HTML
  const navLinksListItems = navLinks ? navLinks.querySelectorAll("a") : []; // Get all anchor tags within navLinks

  // Toggle menu visibility when hamburger icon is clicked
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open"); // Optional: for animating the hamburger icon itself
    });
  }

  // Close the menu when a navigation link is clicked (useful for single-page apps or when navigating)
  if (navLinksListItems.length > 0) {
    navLinksListItems.forEach((link) => {
      link.addEventListener("click", function () {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          if (hamburger) {
            hamburger.classList.remove("open");
          }
        }
      });
    });
  }

  // Optional: Close the menu if a click occurs outside the navigation area
  const siteNav = document.querySelector(".site-nav"); // The container for your nav and hamburger
  if (siteNav && navLinks) {
    document.addEventListener("click", function (event) {
      // Check if the click is outside the nav container AND the menu is currently active
      if (
        !siteNav.contains(event.target) &&
        navLinks.classList.contains("active")
      ) {
        navLinks.classList.remove("active");
        if (hamburger) {
          hamburger.classList.remove("open");
        }
      }
    });
  }

  // Placeholder for toggleDarkMode function if it's in this same JS file
  // If toggleDarkMode is in a separate script or defined elsewhere, you can remove this.
  window.toggleDarkMode = function () {
    document.body.classList.toggle("dark-mode");
    // You might also want to save the dark mode preference to localStorage here
  };
});

document.addEventListener("click", function (event) {
  if (
    navbar &&
    !navbar.contains(event.target) &&
    menuList.classList.contains("active")
  ) {
    menuList.classList.remove("active");
  }
});

if (languageToggle) {
  languageToggle.addEventListener("change", function () {
    if (this.checked) {
      console.log("Language switched to Amharic");
    } else {
      console.log("Language switched to English");
    }
  });
}
