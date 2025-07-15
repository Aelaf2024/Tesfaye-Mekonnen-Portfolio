// mentorGuide.js

// Renders content into the mentorResponse area
function mentorSpeak(message) {
  const container = document.getElementById("mentorResponse");
  container.innerHTML = message;
  container.scrollIntoView({ behavior: "smooth" });
}

// Handles top-level tab buttons (Work / Projects)
function handleExperienceBranch(type) {
  if (type === "work") {
    mentorSpeak(`
      <p><strong>Great! Let's explore Tesfaye’s résumé.</strong></p>
      <div class="mentor-options">
<button data-section="summary" class="resume-btn">📌 Career Summary</button>
<button data-section="skills" class="resume-btn">🧠 Technical Skills </button>
<button data-section="experience" class="resume-btn">💼 Work Timeline</button>
<button data-section="education" class="resume-btn">🎓 Academic Foundation</button>
<button data-section="certifications" class="resume-btn">🏆 Certifications</button>


    `);
  }

  if (type === "projects") {
    mentorSpeak(`<p>Redirecting to Tesfaye’s Project Showcase… 🧪</p>`);
    setTimeout(() => {
      // Use a more robust path, assuming 'Electronics Advisor' is a folder
      // directly under your website's root or a well-known 'projects' folder.
      // It's often safer to use absolute paths from the root if deployed,
      // or a path relative to the *main* index.html of your personal site.

      // Option 1: Relative to the current page (if 'Electronics Advisor' folder is sibling to the current page's folder)
      // window.location.href = "../Electronics Advisor/index.html";

      // Option 2: Relative to the website root (recommended for clarity if 'Electronics Advisor' is at the root level projects folder)
      window.location.href = "../electronics-advisor/index.html"; // Assuming 'projects' is a root folder

      // Option 3: If 'Electronics Advisor' folder is directly off the root (less common for projects)
      // window.location.href = "/Electronics Advisor/index.html";
    }, 900);
  }
}

// Handles resume section buttons inside "Work Experience"
function handleMentorChoice(section) {
  console.log("Handling section:", section);
  switch (section) {
    case "summary":
      mentorSpeak(`
        <p><strong>🧭 Overview coming up!</strong> This is where you get the essence of who Tesfaye is—his mindset, journey, and purpose.</p>
        <p>${mentorData.summary}</p>
      `);
      break;

    case "skills":
      const skillsHTML = mentorData.skills
        .map((skill) => `<li>${skill}</li>`)
        .join("");
      mentorSpeak(`
        <p><strong>🛠️ Core competencies unlocked!</strong> Here are the technical and creative tools Tesfaye brings to every project:</p>
        <ul>${skillsHTML}</ul>
      `);
      break;

    case "experience":
      const expHTML = mentorData.experience
        .map((job) => {
          const bullets = job.highlights.map((h) => `<li>${h}</li>`).join("");
          return `
            <p><strong>${job.role}</strong> — ${job.location} <br/>
            <em>${job.period}</em></p>
            <ul>${bullets}</ul>
          `;
        })
        .join("<hr/>");
      mentorSpeak(`
        <p><strong>📜 Let’s walk the timeline.</strong> Below are Tesfaye’s key professional roles and contributions:</p>
        ${expHTML}
      `);
      break;

    case "education":
      const edu = mentorData.education;
      mentorSpeak(`
        <p><strong>🎓 Academic roots matter.</strong> Here's where Tesfaye’s formal tech path began:</p>
        <p>
          <strong>${edu.degree}</strong><br/>
          ${edu.institution}<br/>
          <em>Graduated: ${edu.graduated}</em>
        </p>
      `);
      break;

    case "certifications":
      const certsHTML = mentorData.certifications
        .map((cert) => `<li>${cert}</li>`)
        .join("");
      mentorSpeak(`
        <p><strong>🏆 Verified and earned.</strong> Tesfaye has completed these key certifications to sharpen his edge:</p>
        <ul>${certsHTML}</ul>
      `);
      break;

    default:
      mentorSpeak(
        `<p>🧐 That section isn’t wired up yet. Try another one!</p>`
      );
  }
}

// Activate dynamic résumé buttons

document.addEventListener("click", (e) => {
  if (e.target.matches(".resume-btn")) {
    console.log("✅ Detected click on:", e.target.dataset.section);
    handleMentorChoice(e.target.dataset.section);
  }
});

// Clear previous bg
document.body.className = "dynamic-bg";

// Apply section-specific background
switch (section) {
  case "summary":
    document.body.classList.add("bg-summary");
    mentorSpeak(`...`);
    break;

  case "skills":
    document.body.classList.add("bg-skills");
    mentorSpeak(`...`);
    break;

  case "experience":
    document.body.classList.add("bg-experience");
    mentorSpeak(`...`);
    break;

  case "education":
    document.body.classList.add("bg-education");
    mentorSpeak(`...`);
    break;

  case "certifications":
    document.body.classList.add("bg-certifications");
    mentorSpeak(`...`);
    break;
}

// Newly Addes JS

function mentorSpeak(message) {
  const container = document.getElementById("mentorResponse");
  container.classList.remove("visible");
  container.innerHTML = message;

  // Force reflow to restart transition
  void container.offsetWidth;

  container.classList.add("visible");
  container.scrollIntoView({ behavior: "smooth" });
}
