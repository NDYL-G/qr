document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("qrForm");
  const typeSelect = document.getElementById("qrType");
  const inputContainer = document.getElementById("qrInputs");
  const canvas = document.getElementById("qrCanvas");
  const previewImage = document.getElementById("logoPreview");

  if (!form || !typeSelect || !inputContainer || !canvas) {
    console.error("Essential form elements not found. Check HTML IDs.");
    return;
  }

  function clearInputs() {
    inputContainer.innerHTML = "";
  }

  function createInput(name, label, placeholder = "") {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "0.5em";

    const lbl = document.createElement("label");
    lbl.setAttribute("for", name);
    lbl.textContent = label;

    const input = document.createElement("input");
    input.type = "text";
    input.name = name;
    input.id = name;
    input.placeholder = placeholder;

    wrapper.appendChild(lbl);
    wrapper.appendChild(input);
    return wrapper;
  }

  function updateInputs(type) {
    clearInputs();
    switch (type) {
      case "url":
        inputContainer.appendChild(createInput("url", "Website URL", "https://example.com"));
        break;
      case "text":
        inputContainer.appendChild(createInput("text", "Text Message"));
        break;
      case "email":
        inputContainer.appendChild(createInput("email", "Email Address", "someone@example.com"));
        break;
      case "phone":
        inputContainer.appendChild(createInput("phone", "Phone Number", "+441234567890"));
        break;
      case "sms":
        inputContainer.appendChild(createInput("sms", "SMS Number", "+441234567890"));
        inputContainer.appendChild(createInput("smsbody", "Message Body"));
        break;
      case "wifi":
        inputContainer.appendChild(createInput("ssid", "Wi-Fi SSID"));
        inputContainer.appendChild(createInput("password", "Password"));
        inputContainer.appendChild(createInput("encryption", "Encryption Type (WPA/WEP)"));
        break;
      case "vcard":
        inputContainer.appendChild(createInput("name", "Full Name"));
        inputContainer.appendChild(createInput("org", "Organisation"));
        inputContainer.appendChild(createInput("tel", "Telephone"));
        inputContainer.appendChild(createInput("email", "Email"));
        break;
      case "event":
        inputContainer.appendChild(createInput("summary", "Event Title"));
        inputContainer.appendChild(createInput("location", "Location"));
        inputContainer.appendChild(createInput("start", "Start (YYYYMMDDTHHMMSSZ)"));
        inputContainer.appendChild(createInput("end", "End (YYYYMMDDTHHMMSSZ)"));
        break;
      case "geo":
        inputContainer.appendChild(createInput("lat", "Latitude"));
        inputContainer.appendChild(createInput("lng", "Longitude"));
        break;
    }
  }

  typeSelect.addEventListener("change", () => updateInputs(typeSelect.value));
  updateInputs(typeSelect.value);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const type = typeSelect.value;
    let qrData = "";

    switch (type) {
      case "url":
        qrData = document.getElementById("url").value;
        break;
      case "text":
        qrData = document.getElementById("text").value;
        break;
      case "email":
        qrData = "mailto:" + document.getElementById("email").value;
        break;
      case "phone":
        qrData = "tel:" + document.getElementById("phone").value;
        break;
      case "sms":
        const number = document.getElementById("sms").value;
        const body = document.getElementById("smsbody").value;
        qrData = `sms:${number}?body=${encodeURIComponent(body)}`;
        break;
      case "wifi":
        const ssid = document.getElementById("ssid").value;
        const password = document.getElementById("password").value;
        const encryption = document.getElementById("encryption").value || "WPA";
        qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        break;
      case "vcard":
        qrData = `BEGIN:VCARD\\nVERSION:3.0\\nFN:${document.getElementById("name").value}\\nORG:${document.getElementById("org").value}\\nTEL:${document.getElementById("tel").value}\\nEMAIL:${document.getElementById("email").value}\\nEND:VCARD`;
        break;
      case "event":
        qrData = `BEGIN:VEVENT\\nSUMMARY:${document.getElementById("summary").value}\\nLOCATION:${document.getElementById("location").value}\\nDTSTART:${document.getElementById("start").value}\\nDTEND:${document.getElementById("end").value}\\nEND:VEVENT`;
        break;
      case "geo":
        qrData = `geo:${document.getElementById("lat").value},${document.getElementById("lng").value}`;
        break;
    }

    console.log("Generating QR with data:", qrData);

    const qr = new QRious({
      element: canvas,
      value: qrData,
      size: 300,
      level: 'H'
    });

    // Handle logo overlay
    if (!previewImage) {
      console.warn("Logo preview image (logoPreview) not found in DOM.");
      return;
    }

    const src = previewImage.src;
    if (
      previewImage.style.display !== "none" &&
      src &&
      src.startsWith("data:image")
    ) {
      const img = new Image();
      img.onload = function () {
        console.log("Overlay image loaded. Drawing on canvas.");
        const ctx = canvas.getContext("2d");
        const size = canvas.width * 0.25;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;
        ctx.drawImage(img, x, y, size, size);
      };
      img.onerror = function () {
        console.warn("Failed to load image:", src);
      };
      img.src = src;
    } else {
      console.log("No valid image found for overlay.");
    }
  });
});
