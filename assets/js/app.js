// app.js - وظائف الصفحة الرئيسية

document.addEventListener("DOMContentLoaded", () => {
  loadServicesPreview();
  loadTestimonials();
  setupWelcomeModal();
  setupScrollTopBtn();
  animateSectionsOnScroll();
  autoTestimonialsSlider();
  setupLangToggle();
});

function loadServicesPreview() {
  fetch("assets/data/services.json")
    .then((res) => res.json())
    .then((services) => {
      const container =
        document.getElementById("services-preview") ||
        document.getElementById("services-list");
      if (!container) return;
      container.innerHTML = services
        .slice(0, 3)
        .map(
          (service) => `
        <div class="service-card">
          <img src="assets/images/${service.icon}" alt="${service.name}">
          <h3>${service.name}</h3>
          <p>${service.desc}</p>
          <a href="services.html#${service.id}" class="cta">تفاصيل</a>
        </div>
      `
        )
        .join("");
    });
}

function loadTestimonials() {
  const testimonials = [
    { name: "عمر من اليمن", text: "خدمة ممتازة وسريعة!" },
    { name: "سارة من الرياض", text: "خدمة رائعة !" },
    { name: "محمد من جدة", text: "أنصح الجميع بالتعامل معهم." },
    { name: "ليلى من الدمام", text: "فريق محترف ونتيجة رائعة." }
  ];
  const slider = document.getElementById("testimonials-slider");
  if (!slider) return;
  slider.innerHTML = testimonials
    .map(
      (t) => `
    <div class="testimonial">
      <p>"${t.text}"</p>
      <span>- ${t.name}</span>
    </div>
  `
    )
    .join("");
}

// تم حذف جميع أكواد الوضع الليلي (theme-toggle)

function setupWelcomeModal() {
  const modal = document.getElementById("welcome-modal");
  const closeBtn = document.getElementById("close-modal");
  if (!modal || !closeBtn) return;
  if (!localStorage.getItem("visited")) {
    modal.classList.remove("hidden");
    closeBtn.onclick = () => {
      modal.classList.add("hidden");
      localStorage.setItem("visited", "1");
    };
  }
}

function setupScrollTopBtn() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("hidden", window.scrollY < 200);
  });
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

function animateSectionsOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    },
    { threshold: 0.2 }
  );
  document
    .querySelectorAll("section, .service-card, .testimonial")
    .forEach((el) => {
      observer.observe(el);
    });
}

function autoTestimonialsSlider() {
  const slider = document.getElementById("testimonials-slider");
  if (!slider) return;
  let idx = 0;
  setInterval(() => {
    const items = slider.querySelectorAll(".testimonial");
    if (!items.length) return;
    items.forEach((el, i) => (el.style.display = i === idx ? "block" : "none"));
    idx = (idx + 1) % items.length;
  }, 3500);
}

// زر الترجمة الموحد لجميع الصفحات
function setupLangToggle() {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;
  btn.onclick = function () {
    const isAr = document.documentElement.lang === "ar";
    if (isAr) {
      document.documentElement.lang = "en";
      document.body.dir = "ltr";
      localStorage.setItem("lang", "en");
      translatePageToEnglish();
      btn.textContent = "AR";
    } else {
      document.documentElement.lang = "ar";
      document.body.dir = "rtl";
      localStorage.setItem("lang", "ar");
      location.reload();
    }
  };
  // تفعيل اللغة المحفوظة
  const savedLang = localStorage.getItem("lang");
  if (savedLang === "en") {
    document.documentElement.lang = "en";
    document.body.dir = "ltr";
    translatePageToEnglish();
    btn.textContent = "AR";
  }
}

function translatePageToEnglish() {
  // ترجمة عامة للصفحات الرئيسية
  if (document.querySelector("h1"))
    document.querySelector("h1").textContent = "Welcome to CleanLife";
  if (document.querySelector(".hero p"))
    document.querySelector(".hero p").textContent =
      "The best cleaning services for homes and businesses in your city";
  if (document.querySelector(".cta"))
    document.querySelector(".cta").textContent = "Book Now";
  if (document.querySelector(".steps h2"))
    document.querySelector(".steps h2").textContent =
      "How does our service work?";
  if (document.querySelectorAll(".step p").length) {
    document.querySelectorAll(".step p")[0].textContent =
      "Choose the right service";
    document.querySelectorAll(".step p")[1].textContent =
      "Select time and place";
    document.querySelectorAll(".step p")[2].textContent =
      "Pay online or on delivery";
    document.querySelectorAll(".step p")[3].textContent =
      "Enjoy perfect cleanliness!";
  }
  if (document.querySelector(".features h2"))
    document.querySelector(".features h2").textContent =
      "Why choose CleanLife?";
  if (document.querySelectorAll(".feature h3").length) {
    document.querySelectorAll(".feature h3")[0].textContent = "High Quality";
    document.querySelectorAll(".feature p")[0].textContent =
      "Trained team and eco-friendly materials";
    document.querySelectorAll(".feature h3")[1].textContent =
      "Speed & Flexibility";
    document.querySelectorAll(".feature p")[1].textContent =
      "Same day service or as you wish";
    document.querySelectorAll(".feature h3")[2].textContent =
      "Continuous Support";
    document.querySelectorAll(".feature p")[2].textContent =
      "24/7 customer service";
    document.querySelectorAll(".feature h3")[3].textContent =
      "Safety & Reliability";
    document.querySelectorAll(".feature p")[3].textContent =
      "Your full satisfaction guaranteed";
  }
  if (document.querySelector(".partners h2"))
    document.querySelector(".partners h2").textContent = "Our Partners";
  if (document.querySelector(".services-preview h2"))
    document.querySelector(".services-preview h2").textContent =
      "Our Services Preview";
  if (document.querySelector(".testimonials h2"))
    document.querySelector(".testimonials h2").textContent = "Customer Reviews";
  if (document.querySelector("footer div"))
    document.querySelector("footer div").innerHTML =
      "All rights reserved &copy; CleanLife 2026";
  if (document.querySelector("footer a"))
    document.querySelector("footer a").textContent = "Contact Us";
  // صفحات أخرى
  if (document.querySelector(".dashboard-section h2"))
    document.querySelectorAll(".dashboard-section h2")[0].textContent =
      "Bookings";
  if (document.querySelector(".dashboard-section h2"))
    document.querySelectorAll(".dashboard-section h2")[1].textContent =
      "Customer Feedback";
  if (document.getElementById("search-bookings"))
    document.getElementById("search-bookings").placeholder =
      "Search by customer or service...";
  // ترجمة عناصر لوحة الإدارة
  if (document.querySelector("nav ul")) {
    const navLinks = document.querySelectorAll("nav ul li a");
    if (navLinks.length >= 7) {
      navLinks[0].textContent = "Home";
      navLinks[1].textContent = "Services";
      navLinks[2].textContent = "Book Service";
      navLinks[3].textContent = "Pricing";
      navLinks[4].textContent = "About Us";
      navLinks[5].textContent = "Contact Us";
      navLinks[6].textContent = "Admin Panel";
    }
  }
  if (document.querySelector(".logo"))
    document.querySelector(".logo").alt = "CleanLife Logo";
  // جدول لوحة الإدارة
  if (document.querySelectorAll("th").length >= 6) {
    const ths = document.querySelectorAll("th");
    ths[0].textContent = "Service";
    ths[1].textContent = "Date";
    ths[2].textContent = "Time";
    ths[3].textContent = "Customer";
    ths[4].textContent = "Phone";
    ths[5].textContent = "Action";
  }
  // جودة عالية، السرعة، الأمان، دعم متواصل
  if (document.querySelectorAll(".feature h3").length) {
    document.querySelectorAll(".feature h3")[0].textContent = "High Quality";
    document.querySelectorAll(".feature h3")[1].textContent =
      "Speed & Flexibility";
    document.querySelectorAll(".feature h3")[2].textContent =
      "Continuous Support";
    document.querySelectorAll(".feature h3")[3].textContent =
      "Safety & Reliability";
  }
  // ... أضف ترجمة حسب الحاجة لكل صفحة ...
}
