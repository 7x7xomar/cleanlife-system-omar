// admin.js - لوحة الإدارة المحلية

document.addEventListener("DOMContentLoaded", () => {
  // إحصائيات
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  const statBookings = document.getElementById("stat-bookings");
  const statServices = document.getElementById("stat-services");
  const statRating = document.getElementById("stat-rating");
  if (statBookings) statBookings.textContent = bookings.length;
  fetch("assets/data/services.json")
    .then((res) => res.json())
    .then((services) => {
      if (statServices) statServices.textContent = services.length;
    });

  // الحجوزات
  const bookingsList = document.getElementById("bookings-list");
  if (bookingsList) {
    bookingsList.innerHTML = bookings.length
      ? bookings
          .map(
            (b) => `
      <div class="booking-item">
        <b>الخدمة:</b> ${b.service} | <b>التاريخ:</b> ${b.date} | <b>العميل:</b> ${b.name} | <b>الجوال:</b> ${b.phone}
      </div>
    `
          )
          .join("")
      : "<div>لا توجد حجوزات بعد.</div>";
  }

  // جدول الحجوزات
  const tableBody = document.querySelector("#bookings-table tbody");
  function renderBookings(list) {
    if (!tableBody) return;
    tableBody.innerHTML = list.length
      ? list
          .map(
            (b) => `
      <tr>
        <td>${b.service}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
        <td>${b.name}</td>
        <td>${b.phone}</td>
        <td><button class="action-btn" onclick="this.closest('tr').remove()">حذف</button></td>
      </tr>
    `
          )
          .join("")
      : '<tr><td colspan="6">لا توجد حجوزات</td></tr>';
  }
  renderBookings(bookings);

  // بحث الحجوزات
  const searchInput = document.getElementById("search-bookings");
  if (searchInput) {
    searchInput.oninput = function () {
      const val = this.value.trim();
      const filtered = bookings.filter(
        (b) => b.name.includes(val) || b.service.includes(val)
      );
      renderBookings(filtered);
    };
  }

  // تصدير Excel (XLSX)
  document.getElementById("export-bookings").onclick = function () {
    // بناء جدول بيانات بسيط
    let table = [["الخدمة", "التاريخ", "الوقت", "العميل", "الجوال"]];
    bookings.forEach((b) => {
      table.push([b.service, b.date, b.time, b.name, b.phone]);
    });
    // إنشاء ملف Excel حقيقي باستخدام HTML Table
    let html =
      "<table><thead><tr>" +
      table[0].map((h) => `<th>${h}</th>`).join("") +
      "</tr></thead><tbody>" +
      table
        .slice(1)
        .map(
          (row) =>
            "<tr>" + row.map((cell) => `<td>${cell}</td>`).join("") + "</tr>"
        )
        .join("") +
      "</tbody></table>";
    let blob = new Blob([`\uFEFF${html}`], {
      type: "application/vnd.ms-excel"
    });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bookings.xls";
    a.click();
  };

  // التقييمات (وهمية)
  const feedbackList = document.getElementById("feedback-list");
  const feedbacks = [
    { name: "مهندس علي", text: "خدمة رائعة!", rating: 5 },
    { name: " عمر عبدالعزيز", text: "أنصح الجميع !", rating: 5 },
    { name: "محمد", text: "سريع واحترافي.", rating: 4 }
  ];
  if (feedbackList) {
    feedbackList.innerHTML = feedbacks
      .map(
        (f) => `
      <div class="feedback-item">
        <b>${f.name}:</b> ${f.text} <span class="stars">${"★".repeat(
          f.rating
        )}</span>
      </div>
    `
      )
      .join("");
  }

  // تقييمات العملاء
  const dashboardFeedbackList = document.getElementById(
    "dashboard-feedback-list"
  );
  if (dashboardFeedbackList) {
    dashboardFeedbackList.innerHTML = feedbacks
      .map(
        (f) => `
      <div class="feedback-item">
        <b>${f.name}:</b> ${f.text} <span class="stars">${"★".repeat(
          f.rating
        )}</span>
      </div>
    `
      )
      .join("");
  }

  if (statRating) {
    const avg = feedbacks.reduce((a, f) => a + f.rating, 0) / feedbacks.length;
    statRating.textContent = avg.toFixed(1) + " ★";
  }
});
