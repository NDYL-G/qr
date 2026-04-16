document.addEventListener("DOMContentLoaded", function () {
  const qrType = document.getElementById("qrType");
  const fields = document.querySelectorAll(".purpose-field");

  function updateFieldVisibility() {
    fields.forEach(f => f.style.display = "none");
    const selected = document.getElementById(qrType.value + "Field");
    if (selected) selected.style.display = "block";
  }

  qrType.addEventListener("change", updateFieldVisibility);
  updateFieldVisibility();

  const form = document.getElementById("qrForm");
  const qrContainer = document.getElementById("qrCanvas");

  function buildQRContent(type) {
    switch (type) {
      case "url":
        return document.getElementById("urlInput").value;
      case "text":
        return document.getElementById("textInput").value;
      case "email":
        return `mailto:${document.getElementById("emailInput").value}`;
      case "phone":
        return `tel:${document.getElementById("phoneInput").value}`;
      case "sms":
        return `sms:${document.getElementById("smsInput").value}`;
      case "wifi":
        const ssid = document.getElementById("ssidInput").value;
        const pass = document.getElementById("wifiPasswordInput").value;
        const enc = document.getElementById("encryption").value;
        return `WIFI:S:${ssid};T:${enc};P:${pass};;`;
      case "vcard":
        const name = document.getElementById("vcardName").value;
        const vphone = document.getElementById("vcardPhone").value;
        const vemail = document.getElementById("vcardEmail").value;
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${vphone}\nEMAIL:${vemail}\nEND:VCARD`;
      default:
        return "";
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const type = qrType.value;
    const data = buildQRContent(type);

    if (!data || data.trim() === "") {
      alert("Please enter the required information.");
      return;
    }

    qrContainer.innerHTML = "";

    if (typeof QRCodeStyling === "undefined") {
      alert("QR library not loaded.");
      return;
    }

    try {
      const mainColor = document.getElementById("mainColor").value;
      const dotStyle = document.getElementById("dotStyle").value;
      const cornerStyle = document.getElementById("cornerStyle").value;
      const errorCorrection = document.getElementById("errorCorrection").value;

      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: data,
        qrOptions: { errorCorrectionLevel: errorCorrection },
        dotsOptions: { color: mainColor, type: dotStyle },
        cornersSquareOptions: { type: cornerStyle },
        backgroundOptions: { color: "#ffffff" }
      });

      qrCode.append(qrContainer);
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
});
