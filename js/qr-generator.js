<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>QR Code Generator</title>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/navbar.css" />
  <link rel="stylesheet" href="../css/landing.css" />
  <link rel="icon" type="image/x-icon" href="../img/favicon.ico" />
</head>
<body>
  <div id="header"></div>

  <main>
    <section class="content">
      <h1>QR Code Generator</h1>
      <p>Use the form below to generate a custom QR code based on your selected content type.</p>

      <form id="qrForm">
        <label for="qrType">Select QR Code Type:</label>
        <select id="qrType" name="qrType">
          <option value="url">URL</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="phone">Phone Number</option>
          <option value="sms">SMS</option>
          <option value="wifi">Wi-Fi</option>
          <option value="vcard">Contact (vCard)</option>
          <option value="event">Calendar Event</option>
          <option value="geo">Location</option>
        </select>

        <div id="qrInputs">
          <!-- Dynamic inputs will be injected here -->
        </div>

        <label for="qrLogo">Upload Centre Image (optional):</label>
        <div id="qrDropZone" style="border: 2px dashed #ccc; padding: 1em; text-align: center; cursor: pointer;">
          <p>📥 Drag and drop your image here, or click to select a file.</p>
          <input type="file" id="qrLogo" accept="image/*" style="display: none;" />
          <img id="logoPreview" alt="Image preview" style="max-width: 100px; margin-top: 10px; display: none;" />
        </div>

        <button type="submit" style="margin-top: 1em;">Generate QR Code</button>
      </form>

      <div id="qrPreview" style="margin-top: 2em;">
        <h2>Preview</h2>
        <canvas id="qrCanvas"></canvas>
      </div>
    </section>
  </main>

  <div id="footer"></div>

  <!-- Script dependencies -->
  <script src="../js/include-loader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/qrious/dist/qrious.min.js"></script>
  <script src="../js/qr-generator.js"></script>
  <script src="../js/drag-drop.js"></script>
</body>
</html>
