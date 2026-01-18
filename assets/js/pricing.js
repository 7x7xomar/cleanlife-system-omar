// pricing.js - حاسبة تكلفة الخدمة

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pricing-form");
  if (!form) return;
  form.innerHTML = `
    <label>نوع الخدمة:</label>
    <select id="service-type"></select>
    <label>المساحة (م²):</label>
    <input type="number" id="area" min="10" required>
    <label>عدد الغرف:</label>
    <input type="number" id="rooms" min="1" required>
    <button type="submit">احسب التكلفة</button>
  `;
  fetch("assets/data/services.json")
    .then((res) => res.json())
    .then((services) => {
      const select = document.getElementById("service-type");
      select.innerHTML = services
        .map((s) => `<option value="${s.id}">${s.name}</option>`)
        .join("");
    });
  form.onsubmit = (e) => {
    e.preventDefault();
    const serviceId = document.getElementById("service-type").value;
    const area = +document.getElementById("area").value;
    const rooms = +document.getElementById("rooms").value;
    fetch("assets/data/services.json")
      .then((res) => res.json())
      .then((services) => {
        const service = services.find((s) => s.id === serviceId);
        let base = service ? service.basePrice : 0;
        let total =
          base + area * service.pricePerMeter + rooms * service.pricePerRoom;
        document.getElementById(
          "pricing-result"
        ).innerHTML = `<div>التكلفة التقديرية: <b>${total} ريال</b></div>`;
      });
  };
});
