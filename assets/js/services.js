// services.js - عرض جميع الخدمات

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/services.json")
    .then((res) => res.json())
    .then((services) => {
      const list = document.getElementById("services-list");
      if (!list) return;
      list.innerHTML = services
        .map(
          (service) => `
        <div class="service-card" id="${service.id}">
          <img src="assets/images/${service.icon}" alt="${
            service.name
          }" style="height:64px">
          <h3>${service.name}</h3>
          <p>${service.desc}</p>
          <ul>${service.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        </div>
      `
        )
        .join("");
    });
});
