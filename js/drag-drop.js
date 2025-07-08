
document.addEventListener("DOMContentLoaded", function () {
  const dropZone = document.getElementById("qrDropZone");
  const fileInput = document.getElementById("qrLogo");
  const previewImage = document.getElementById("logoPreview");
  const useDefaultCheckbox = document.getElementById("useDefaultLogo");

  function handleFile(file) {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
      useDefaultCheckbox.checked = false;
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
      fileInput.files = e.dataTransfer.files;
      handleFile(e.dataTransfer.files[0]);
    }
  });

  dropZone.addEventListener("click", function () {
    fileInput.click();
  });

  useDefaultCheckbox.addEventListener("change", function () {
    if (this.checked) {
      previewImage.src = "../img/logo.png";
      previewImage.style.display = "block";
    } else {
      previewImage.src = "";
      previewImage.style.display = "none";
    }
  });

  const sizeSlider = document.getElementById("logoSize");
  const sizeValue = document.getElementById("logoSizeValue");
  sizeSlider.addEventListener("input", function () {
    sizeValue.textContent = `${this.value}%`;
  });
});
