
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("qrForm");
  const typeSelect = document.getElementById("qrType");
  const inputContainer = document.getElementById("qrInputs");
  const canvas = document.getElementById("qrCanvas");

  function updateInputs(type) {
    inputContainer.innerHTML = "";
    const input = document.createElement("input");
    input.type = "text";
    input.id = type;
    input.name = type;
    input.placeholder = "Enter " + type;
    inputContainer.appendChild(input);
  }

  typeSelect.addEventListener("change", () => updateInputs(typeSelect.value));
  updateInputs(typeSelect.value);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const type = typeSelect.value;
    const value = document.getElementById(type).value;
    const errorLevel = document.getElementById("qrErrorLevel").value;
    const logoSizePercent = parseInt(document.getElementById("logoSize").value, 10);
    const qrData = value;

    const qr = new QRious({
      element: canvas,
      value: qrData,
      size: 300,
      level: errorLevel
    });

    const previewImage = document.getElementById("logoPreview");
    const useDefault = document.getElementById("useDefaultLogo");

    let shouldOverlay = false;
    let src = previewImage?.src;

    if (useDefault?.checked && src && src.includes("logo.png")) {
      shouldOverlay = true;
    } else if (!useDefault?.checked && src && src.startsWith("data:image")) {
      shouldOverlay = true;
    }

    if (shouldOverlay) {
      const img = new Image();
      img.onload = function () {
        const ctx = canvas.getContext("2d");
        const size = canvas.width * (logoSizePercent / 100);
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;
        ctx.drawImage(img, x, y, size, size);
      };
      img.src = src;
    }
  });
});
