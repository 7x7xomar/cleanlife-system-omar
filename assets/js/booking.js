// booking.js - نظام الحجز متعدد الخطوات

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  if (!form) return;
  // بناء النموذج خطوة بخطوة (مبسط)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;
  form.innerHTML = `
    <label>نوع الخدمة:</label>
    <select id="service-type"></select>
    <label>التاريخ:</label>
    <input type="date" id="booking-date" min="${minDate}" required>
    <label>الوقت:</label>
    <input type="time" id="booking-time" required>
    <label>الاسم:</label>
    <input type="text" id="customer-name" required>
    <label>رقم الجوال:</label>
    <input type="tel" id="customer-phone" required>
    <button type="submit">تأكيد الحجز</button>
  `;
  // تحميل الخدمات
  fetch("assets/data/services.json")
    .then((res) => res.json())
    .then((services) => {
      const select = document.getElementById("service-type");
      select.innerHTML = services
        .map((s) => `<option value="${s.name}">${s.name}</option>`)
        .join("");
    });
  form.onsubmit = (e) => {
    e.preventDefault();
    const dateValue = document.getElementById("booking-date").value;
    // تنسيق التاريخ الميلادي (YYYY-MM-DD إلى DD / MM / YYYY)
    let formattedDate = dateValue;
    if (dateValue && dateValue.includes("-")) {
      const [yyyy, mm, dd] = dateValue.split("-");
      formattedDate = `${dd} / ${mm} / ${yyyy}`;
    }
    const booking = {
      service: document.getElementById("service-type").value,
      date: formattedDate,
      time: document.getElementById("booking-time").value,
      name: document.getElementById("customer-name").value,
      phone: document.getElementById("customer-phone").value,
    };
    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    document.getElementById(
      "booking-summary"
    ).innerHTML = `<div class='success'>تم الحجز بنجاح!<br>التاريخ: <b>${formattedDate}</b><br>سنقوم بالتواصل معك قريباً.</div>`;
    form.reset();
  };
});
