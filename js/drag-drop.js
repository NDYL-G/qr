document.addEventListener("DOMContentLoaded", function () {
  const dropZone = document.getElementById("qrDropZone");
  const fileInput = document.getElementById("qrLogo");
  const previewImage = document.getElementById("logoPreview");

  function handleFile(file) {
    if (!file.type.startsWith("image/")) {
      alert("Only image files are supported.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Warning: Large file size may slow down QR rendering.");
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
      previewImage.setAttribute("data-ready", "true");
      previewImage.setAttribute("data-src", e.target.result);
    };
    reader.readAsDataURL(file);
  }

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropZone.classList.add("dragging");
  });

  dropZone.addEventListener("dragleave", function () {
    dropZone.classList.remove("dragging");
  });

  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropZone.classList.remove("dragging");
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      fileInput.files = e.dataTransfer.files;
      handleFile(file);
    }
  });

  dropZone.addEventListener("click", function () {
    fileInput.click();
  });
});
