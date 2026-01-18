// contact.js - نموذج التواصل

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.onsubmit = (e) => {
    e.preventDefault();
    document.getElementById(
      "contact-result"
    ).innerHTML = `<div class='success'>تم إرسال رسالتك بنجاح! سنرد عليك قريباً.</div>`;
    form.reset();
  };
});
