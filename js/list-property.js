(function () {
  "use strict";

  const form = document.getElementById("listingForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const photoInput = document.getElementById("photos");
  const preview = document.getElementById("photoPreview");
  const storageKey = "stacklyRealEstateListings";
  const maxPhotos = 6;
  let selectedFiles = [];

  function show(message) {
    status.textContent = message;
    status.classList.add("is-visible");
  }

  function collect() {
    return {
      id: Date.now(),
      intent: form.querySelector("[name=intent]:checked")?.value || "Sale",
      type: document.getElementById("propertyType").value,
      title: document.getElementById("propertyTitle").value.trim(),
      area: document.getElementById("area").value,
      unit: document.getElementById("unit").value,
      bedrooms: document.getElementById("bedrooms").value,
      bathrooms: document.getElementById("bathrooms").value,
      city: document.getElementById("city").value.trim(),
      locality: document.getElementById("locality").value.trim(),
      address: document.getElementById("address").value.trim(),
      price: document.getElementById("price").value,
      description: document.getElementById("description").value.trim(),
      owner: document.getElementById("ownerName").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      createdAt: new Date().toISOString()
    };
  }

  function fileToWebP(file) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const objectUrl = URL.createObjectURL(file);
      image.onload = () => {
        const scale = Math.min(1, 1440 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob(blob => {
          if (!blob) return reject(new Error("Image conversion failed."));
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, "image/webp", 0.78);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("One of the selected images could not be opened."));
      };
      image.src = objectUrl;
    });
  }

  function renderPreview() {
    if (!preview) return;
    preview.innerHTML = "";
    selectedFiles.forEach((file, index) => {
      const item = document.createElement("span");
      item.className = "listing-photo-preview-item";
      item.textContent = `${index + 1}. ${file.name}`;
      preview.appendChild(item);
    });
  }

  photoInput?.addEventListener("change", event => {
    selectedFiles = [...(event.target.files || [])];
    if (selectedFiles.length !== maxPhotos) {
      selectedFiles = [];
      event.target.value = "";
      renderPreview();
      show("Please select exactly 6 property photos.");
      return;
    }
    if (selectedFiles.some(file => !file.type.startsWith("image/"))) {
      selectedFiles = [];
      event.target.value = "";
      renderPreview();
      show("Please select valid image files only.");
      return;
    }
    renderPreview();
    show("6 photos selected. They will be optimized and saved as WebP.");
  });

  async function buildListing() {
    if (selectedFiles.length !== maxPhotos) {
      show("Please upload exactly 6 property photos before publishing.");
      throw new Error("Six property photos are required.");
    }
    const item = collect();
    item.photos = await Promise.all(selectedFiles.map(fileToWebP));
    return item;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Saving photos...";
    }

    try {
      const item = await buildListing();
      const rows = JSON.parse(localStorage.getItem(storageKey) || "[]");
      rows.push(item);
      localStorage.setItem(storageKey, JSON.stringify(rows));
      show("Your property and all 6 photos have been saved. It is now available on Buy Properties.");
      form.reset();
      selectedFiles = [];
      renderPreview();
      window.dispatchEvent(new CustomEvent("stacklyOwnerListingsChanged"));
    } catch (error) {
      if (error.message !== "Six property photos are required.") {
        show("Could not save the photos. Please use smaller images and try again.");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = window.StacklyLanguage?.translate?.("publish") || "Publish Property";
      }
    }
  });

  document.getElementById("saveDraft")?.addEventListener("click", async () => {
    try {
      const draft = collect();
      if (selectedFiles.length) draft.photos = await Promise.all(selectedFiles.map(fileToWebP));
      localStorage.setItem("stacklyRealEstateDraft", JSON.stringify(draft));
      show("Draft saved successfully.");
    } catch (_) {
      show("Please check the selected photos and try again.");
    }
  });
})();
