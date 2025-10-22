document.addEventListener("DOMContentLoaded", () => {
    const features = document.querySelectorAll(".feature-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    features.forEach((feature) => {
        observer.observe(feature);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
    });
});

 document.addEventListener("DOMContentLoaded", function() {
    const featuresVideo = document.querySelector("video.features-bg");
    if (featuresVideo) {
      featuresVideo.playbackRate = 1; // Change 0.75 to your desired speed (e.g., 0.5 for half speed)
    }
  });
