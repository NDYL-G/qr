
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("qrForm");
  const qrContainer = document.getElementById("qrCanvas");
  const logoPreview = document.getElementById("logoPreview");
  const logoInput = document.getElementById("qrLogo");

  let qrCode = null;

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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    qrContainer.innerHTML = "";

    const data = document.getElementById("qrData").value;
    const dotStyle = document.getElementById("dotStyle").value;
    const cornerStyle = document.getElementById("cornerStyle").value;
    const mainColor = document.getElementById("mainColor").value;
    const gradientColor = document.getElementById("gradientColor").value;
    const logo = logoPreview.src;

    qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: data,
      image: logo.includes("data:image") || logo.includes("logo.png") ? logo : "",
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
});
