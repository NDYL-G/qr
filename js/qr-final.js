
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("qrForm");
  const qrContainer = document.getElementById("qrCanvas");
  const logoPreview = document.getElementById("logoPreview");
  const logoInput = document.getElementById("qrLogo");
  const swatchContainer = document.getElementById("colourSwatches");
  const mainColorInput = document.getElementById("mainColor");
  const gradientColorInput = document.getElementById("gradientColor");
  const logoSizeInput = document.getElementById("logoSize");
  const logoSizeValue = document.getElementById("logoSizeValue");

  const colorThief = new ColorThief();

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  function generateSwatches(img) {
    if (img.complete && img.naturalHeight !== 0) {
      const palette = colorThief.getPalette(img, 5);
      swatchContainer.innerHTML = "";
      if (palette.length > 0) {
        const primary = palette[0];
        const secondary = palette[1] || palette[0];
        mainColorInput.value = rgbToHex(primary[0], primary[1], primary[2]);
        gradientColorInput.value = rgbToHex(secondary[0], secondary[1], secondary[2]);
        palette.forEach(color => {
          const hex = rgbToHex(color[0], color[1], color[2]);
          const swatch = document.createElement("div");
          swatch.className = "colour-swatch";
          swatch.style.backgroundColor = hex;
          swatch.title = hex;
          swatch.onclick = () => {
            mainColorInput.value = hex;
          };
          swatchContainer.appendChild(swatch);
        });
      }
    }
  }

  logoPreview.onload = function () {
    try {
      generateSwatches(logoPreview);
    } catch (e) {
      console.warn("Swatch error:", e);
    }
  };

  logoInput.addEventListener("change", function () {
    if (logoInput.files.length > 0) {
      const file = logoInput.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        logoPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  logoSizeInput.addEventListener("input", function () {
    logoSizeValue.textContent = this.value + "%";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    qrContainer.innerHTML = "";

    const data = document.getElementById("qrData").value;
    const dotStyle = document.getElementById("dotStyle").value;
    const cornerStyle = document.getElementById("cornerStyle").value;
    const errorCorrection = document.getElementById("errorCorrection").value;
    const mainColor = mainColorInput.value;
    const gradientColor = gradientColorInput.value;
    const logo = logoPreview.src;
    const logoSize = parseInt(logoSizeInput.value, 10) / 100;

    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: data,
      image: logo.includes("data:image") || logo.includes("logo.png") ? logo : "",
      qrOptions: {
        errorCorrectionLevel: errorCorrection
      },
      dotsOptions: {
        color: mainColor,
        type: dotStyle
      },
      cornersSquareOptions: {
        type: cornerStyle
      },
      backgroundOptions: {
        color: "#ffffff"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        imageSize: logoSize,
        margin: 5
      },
      dotsOptionsGradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: mainColor },
          { offset: 1, color: gradientColor }
        ]
      }
    });

    qrCode.append(qrContainer);
  });

  if (logoPreview.complete) {
    logoPreview.onload();
  }
});
