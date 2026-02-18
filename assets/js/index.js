/**
 * Suman Portfolio - Client side logic
 */

// Initialize Typed.js for the hero section
if (document.getElementById("element")) {
  const typed = new Typed("#element", {
    strings: [
      "Student",
      "Coffee Lover",
      "Web Developer",
      "App Developer",
      "Tech Enthusiast",
      "Software Developer",
    ],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true,
  });
}

// Highlight active navigation link based on current page
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    // Get the href attribute (e.g., "about.html")
    const linkPath = link.getAttribute("href");

    // Remove active class from all links
    link.classList.remove("active");

    // Check if the current path contains the link path
    // For home page, check if path ends with / or index.html
    if (linkPath === "index.html" && (currentPath.endsWith("/") || currentPath.endsWith("index.html"))) {
      link.classList.add("active");
    } else if (currentPath.includes(linkPath) && linkPath !== "index.html") {
      link.classList.add("active");
    }
  });
});


// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log("Form submitted:", data);

    // Simulate API call
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Show success message
      responseMessage.textContent = "Thank you! Your message has been sent successfully.";
      responseMessage.style.display = "block";

      // Reset form
      contactForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        responseMessage.style.display = "none";
      }, 5000);

    }, 1500);
  });
}

// Download Button Animation
document.querySelectorAll('a[download]').forEach(button => {
  button.addEventListener('click', function (e) {
    // Only animate if not already loading or success
    if (this.classList.contains('btn-loading') || this.classList.contains('btn-success')) return;

    e.preventDefault();
    const originalText = this.innerHTML;
    const downloadUrl = this.getAttribute('href');
    const fileName = this.getAttribute('download') || 'download';

    // Set loading state
    this.classList.add('btn-loading');
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';

    // Simulate preparation delay
    setTimeout(() => {
      // Trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Set success state
      this.classList.remove('btn-loading');
      this.classList.add('btn-success');
      this.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';

      // Reset after delay
      setTimeout(() => {
        this.classList.remove('btn-success');
        this.innerHTML = originalText;
      }, 3000);

    }, 1500);
  });
});

// Mobile Menu Toggle Logic
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger i");

  navLinks.classList.toggle("active");

  // Toggle icon between bars and times (X)
  if (navLinks.classList.contains("active")) {
    hamburger.classList.remove("fa-bars");
    hamburger.classList.add("fa-xmark");
  } else {
    hamburger.classList.remove("fa-xmark");
    hamburger.classList.add("fa-bars");
  }
}

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger i");
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("fa-xmark");
      hamburger.classList.add("fa-bars");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  if (navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)) {

    navLinks.classList.remove("active");
    const icon = hamburger.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Project Details Modal Logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Create Modal HTML if not exists
  if (!document.querySelector('.modal')) {
    const modalHTML = `
        <div id="projectModal" class="modal">
            <div class="modal-content glass-card">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="modal-img-container">
                        <img src="" alt="Project Image" id="modalImg">
                    </div>
                    <div class="modal-info">
                        <h3 id="modalTitle">Project Title</h3>
                        <div class="modal-tech-stack" id="modalTech">
                            <!-- Tech tags injected here -->
                        </div>
                        <p class="modal-desc" id="modalDesc">Description goes here...</p>
                        <a href="#" target="_blank" class="btn btn-primary" id="modalLink">View Project <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.close-modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalImg = document.getElementById('modalImg');
  const modalTech = document.getElementById('modalTech');
  const modalLink = document.getElementById('modalLink');

  // 2. Open Modal
  document.querySelectorAll('.project-card-trigger').forEach(card => {
    card.addEventListener('click', () => {
      // Get data
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const tech = card.getAttribute('data-tech');
      const link = card.getAttribute('data-link');
      const img = card.getAttribute('data-img');

      // Populate Modal
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalImg.src = img || 'https://via.placeholder.com/800x400'; // Fallback
      modalLink.href = link;

      // Tech Tags
      modalTech.innerHTML = '';
      if (tech) {
        tech.split(',').forEach(t => {
          const span = document.createElement('span');
          span.className = 'modal-tech-tag';
          span.textContent = t.trim();
          modalTech.appendChild(span);
        });
      }

      // Show
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable scroll
    });
  });

  // 3. Close Modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
