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
      previewImage.dataset.ready = "true";
      previewImage.dataset.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Manual browse: handle file when selected
  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  // Drag-and-drop: highlight zone
  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropZone.classList.add("dragging");
  });

  dropZone.addEventListener("dragleave", function () {
    dropZone.classList.remove("dragging");
  });

  // Drop file: preview and prepare it
  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropZone.classList.remove("dragging");
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      fileInput.files = e.dataTransfer.files; // Sync file input
      handleFile(file);
    }
  });

  // Clicking drop zone opens file dialog
  dropZone.addEventListener("click", function () {
    fileInput.click();
  });
});
