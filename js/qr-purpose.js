// qr-purpose.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("qrForm");
  const urlInput = document.getElementById("urlInput");
  const qrCanvas = document.getElementById("qrCanvas");
  const logoPreview = document.getElementById("logoPreview");
  const logoDropContainer = document.getElementById("logoDropContainer");
  const mainColorInput = document.getElementById("mainColor");
  const gradientColorInput = document.getElementById("gradientColor");
  const logoSizeSlider = document.getElementById("logoSize");
  const logoSizeValue = document.getElementById("logoSizeValue");

  const qrType = document.getElementById("qrType");
  const inputFields = document.querySelectorAll(".purpose-field");

  qrType.addEventListener("change", updatePurposeFields);
  updatePurposeFields();

  logoSizeSlider.addEventListener("input", () => {
    logoSizeValue.textContent = `${logoSizeSlider.value}%`;
  });

  let qr;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const type = qrType.value;
    let data = "";

    switch (type) {
      case "url":
        data = urlInput.value;
        break;
      case "text":
        data = document.getElementById("textInput").value;
        break;
      case "email":
        data = `mailto:${document.getElementById("emailInput").value}`;
        break;
      case "phone":
        data = `tel:${document.getElementById("phoneInput").value}`;
        break;
      case "sms":
        data = `sms:${document.getElementById("smsInput").value}`;
        break;
      case "wifi":
        const ssid = document.getElementById("ssidInput").value;
        const password = document.getElementById("wifiPasswordInput").value;
        const encryption = document.getElementById("encryption").value;
        data = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        break;
      case "vcard":
        const name = document.getElementById("vcardName").value;
        const phone = document.getElementById("vcardPhone").value;
        const email = document.getElementById("vcardEmail").value;
        data = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
        break;
    }

    const dotStyle = form.dotStyle.value;
    const cornerStyle = form.cornerStyle.value;
    const errorCorrection = form.errorCorrection.value;

    const mainColor = mainColorInput.value;
    const gradientColor = gradientColorInput.value;
    const logoSize = parseInt(logoSizeSlider.value);

    if (qrCanvas.firstChild) {
      qrCanvas.innerHTML = "";
    }

    qr = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: data,
      image: logoPreview.src,
      imageOptions: {
        crossOrigin: "anonymous",
        imageSize: logoSize / 100
      },
      dotsOptions: {
        gradient: {
          type: "linear",
          rotation: 0,
          colorStops: [
            { offset: 0, color: mainColor },
            { offset: 1, color: gradientColor }
          ]
        },
        type: dotStyle
      },
      cornersSquareOptions: {
        type: cornerStyle,
        color: mainColor
      },
      qrOptions: {
        errorCorrectionLevel: errorCorrection
      }
    });

    qr.append(qrCanvas);
  });

  // Drag and Drop Overlay
  logoDropContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
    logoDropContainer.classList.add("dragover");
  });

  logoDropContainer.addEventListener("dragleave", function () {
    logoDropContainer.classList.remove("dragover");
  });

  logoDropContainer.addEventListener("drop", function (e) {
    e.preventDefault();
    logoDropContainer.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        logoPreview.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  function updatePurposeFields() {
    inputFields.forEach(field => field.style.display = "none");
    const selected = qrType.value + "Field";
    const active = document.getElementById(selected);
    if (active) active.style.display = "block";
  }
});
