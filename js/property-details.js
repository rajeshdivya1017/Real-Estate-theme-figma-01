(function () {
  "use strict";
  const target = document.getElementById("propertyDetails");
  if (!target) return;

  const photo = (id, w=1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=88`;
  const img = (value, w=1400) => {
    if (!value) return "";
    if (/^(data:|blob:|https?:)/i.test(value)) {
      if (value.startsWith("https://images.unsplash.com/")) return value.replace(/([?&])w=\d+/, `$1w=${w}`);
      return value;
    }
    if (value.startsWith("assets/")) return value;
    return photo(value, w);
  };
  const properties = [
    {id:1,price:"₹92,00,000",title:"3 BHK apartment in Whitefield",location:"Whitefield, Bengaluru",address:"Whitefield Main Road, Bengaluru, Karnataka",area:"1,450 sq.ft.",type:"Apartment",beds:3,baths:3,owner:"Arun Kumar",email:"arun.owner@example.com",phone:"+91 98765 43210",description:"A spacious, naturally lit apartment with a modern living area, comfortable bedrooms and convenient access to schools, shopping and public transport.",images:["photo-1600596542815-ffad4c1539a9","photo-1600607687939-ce8a6c25118c","photo-1600566753190-17f0baa2a6c3","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d","photo-1600566753086-00f18fb6b3ea"],facilities:["Parking","Swimming Pool","24/7 Security","Lift","Power Backup","Gym"]},
    {id:2,price:"₹48,00,000",title:"Residential plot in Sarjapur",location:"Sarjapur Road, Bengaluru",address:"Sarjapur Road, Bengaluru, Karnataka",area:"1,200 sq.ft.",type:"Land / Plot",beds:0,baths:0,owner:"Priya Reddy",email:"priya.owner@example.com",phone:"+91 98765 12340",description:"A well-positioned residential plot in a growing neighbourhood, suitable for building an independent home with good road access.",images:["photo-1500382017468-9049fed747ef","photo-1510798831971-661eb04b3739","photo-1500530855697-b586d89ba3ee","photo-1449158743715-0a90ebb6d2d8","photo-1500382017468-9049fed747ef","photo-1510798831971-661eb04b3739"],facilities:["Road Access","Water Supply","Electricity","Clear Title"]},
    {id:3,price:"₹85,00,000",title:"2 BHK apartment in Hebbal",location:"Hebbal, Bengaluru",address:"Hebbal, Bengaluru, Karnataka",area:"1,250 sq.ft.",type:"Apartment",beds:2,baths:2,owner:"Vikram Rao",email:"vikram.owner@example.com",phone:"+91 98450 12345",description:"A contemporary 2 BHK home with an airy lounge, functional kitchen and easy access to major work hubs and daily conveniences.",images:["photo-1600607687939-ce8a6c25118c","photo-1600566753086-00f18fb6b3ea","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d","photo-1600566753190-17f0baa2a6c3","photo-1600596542815-ffad4c1539a9"],facilities:["Covered Parking","Lift","Security","Children's Play Area","Power Backup"]},
    {id:4,price:"₹68,00,000",title:"2 BHK apartment in Electronic City",location:"Electronic City, Bengaluru",address:"Electronic City Phase 1, Bengaluru, Karnataka",area:"1,100 sq.ft.",type:"Apartment",beds:2,baths:2,owner:"Meena S",email:"meena.owner@example.com",phone:"+91 99000 12345",description:"A practical and well-maintained apartment close to offices, shops and public transport.",images:["photo-1600566753190-17f0baa2a6c3","photo-1600607687939-ce8a6c25118c","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d","photo-1600566753086-00f18fb6b3ea","photo-1600596542815-ffad4c1539a9"],facilities:["Parking","Lift","Security","Water Supply"]},
    {id:5,price:"₹1,15,00,000",title:"3 BHK house in Yelahanka",location:"Yelahanka, Bengaluru",address:"Yelahanka New Town, Bengaluru, Karnataka",area:"1,800 sq.ft.",type:"Independent House",beds:3,baths:3,owner:"Suresh Nair",email:"suresh.owner@example.com",phone:"+91 98860 11122",description:"An independent family home with generous indoor spaces, private outdoor area and convenient neighbourhood access.",images:["photo-1600047509807-ba8f99d2cdde","photo-1600566753086-00f18fb6b3ea","photo-1600607687939-ce8a6c25118c","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d","photo-1600566753190-17f0baa2a6c3"],facilities:["Private Garden","Car Parking","Terrace","Water Supply","Security"]},
    {id:6,price:"₹72,00,000",title:"Residential plot in Devanahalli",location:"Devanahalli, Bengaluru",address:"Devanahalli, Bengaluru, Karnataka",area:"1,500 sq.ft.",type:"Land / Plot",beds:0,baths:0,owner:"Kiran Gowda",email:"kiran.owner@example.com",phone:"+91 98451 67890",description:"A residential plot in a developing area, suitable for a custom-built home or long-term investment.",images:["photo-1500382017468-9049fed747ef","photo-1449158743715-0a90ebb6d2d8","photo-1510798831971-661eb04b3739","photo-1500530855697-b586d89ba3ee"],facilities:["Road Access","Electricity","Water Supply","Clear Title"]},
    {id:7,price:"₹55,00,000",title:"2 BHK apartment in HSR Layout",location:"HSR Layout, Bengaluru",address:"HSR Layout, Bengaluru, Karnataka",area:"1,080 sq.ft.",type:"Apartment",beds:2,baths:2,owner:"Divya Menon",email:"divya.owner@example.com",phone:"+91 98440 22233",description:"A comfortable apartment in a popular residential neighbourhood with everyday amenities nearby.",images:["photo-1600607687920-4e2a09cf159d","photo-1600210492486-724fe5c67fb0","photo-1600566753190-17f0baa2a6c3","photo-1600607687939-ce8a6c25118c","photo-1600566753086-00f18fb6b3ea","photo-1600596542815-ffad4c1539a9"],facilities:["Lift","Parking","Security","Gym","Power Backup"]},
    {id:8,price:"₹1,35,00,000",title:"Independent house in J.P. Nagar",location:"J.P. Nagar, Bengaluru",address:"J.P. Nagar, Bengaluru, Karnataka",area:"2,100 sq.ft.",type:"Independent House",beds:3,baths:3,owner:"Raghav Shetty",email:"raghav.owner@example.com",phone:"+91 99001 45678",description:"A spacious independent home with bright interiors, multiple bedrooms and a quiet residential setting.",images:["photo-1600566753086-00f18fb6b3ea","photo-1600047509807-ba8f99d2cdde","photo-1600607687939-ce8a6c25118c","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d","photo-1600566753190-17f0baa2a6c3"],facilities:["Garden","Car Parking","Terrace","Security","Water Supply"]},
    {id:9,price:"₹28,000 / month",title:"Ready-to-use office space",location:"Outer Ring Road, Bengaluru",address:"Outer Ring Road, Bengaluru, Karnataka",area:"900 sq.ft.",type:"Commercial",beds:0,baths:1,owner:"Anand Iyer",email:"anand.owner@example.com",phone:"+91 98451 22211",description:"A ready-to-use commercial office space with a flexible layout, convenient access and essential building services.",images:["photo-1497366754035-f200968a6e72","photo-1497366811353-6870744d04b2","photo-1497366216548-37526070297c","photo-1497366754035-f200968a6e72","photo-1497366216548-37526070297c","photo-1497366811353-6870744d04b2"],facilities:["Lift","Power Backup","Security","Parking","Internet Ready"]}
  ];
  const rawId = new URLSearchParams(location.search).get("id") || "1";
  const isOwnerListing = String(rawId).startsWith("owner-");
  const ownerListingId = isOwnerListing ? String(rawId).slice(6) : null;
  const id = Number(String(rawId).match(/([0-9]+)/)?.[1]) || 1;
  let p = properties.find(x => x.id === id) || properties[0];

  if (isOwnerListing) {
    let ownerRows = [];
    try { ownerRows = JSON.parse(localStorage.getItem("stacklyRealEstateListings") || "[]"); } catch (_) {}
    const row = ownerRows.find(item => String(item.id) === ownerListingId);
    if (row) {
      p = {
        id: `owner-${row.id}`,
        price: row.price ? `₹${Number(row.price).toLocaleString("en-IN")}${row.intent === "Rent" ? " / month" : ""}` : "Price on request",
        title: row.title || "Owner-listed property",
        location: `${row.locality || ""}, ${row.city || ""}`,
        address: row.address || `${row.locality || ""}, ${row.city || ""}`,
        area: `${row.area || "—"} ${row.unit || ""}`,
        type: row.type || "Property",
        beds: row.bedrooms || "—",
        baths: row.bathrooms || "—",
        owner: row.owner || "Property Owner",
        email: row.email || "Not provided",
        phone: row.mobile || "Not provided",
        description: row.description || "",
        images: Array.isArray(row.photos) ? row.photos.slice(0, 6) : [],
        facilities: []
      };
    }
  } else if (window.StacklyPropertyData) {
    p.images = window.StacklyPropertyData.getImages(p.id);
  }

  const t = key => window.StacklyLanguage?.translate(key) || key;
  const typeTranslationKey = {
    "Apartment": "apartment",
    "Independent House": "independentHouse",
    "Land / Plot": "landPlot",
    "Commercial": "commercialProperty"
  };
  const typeKey = typeTranslationKey[p.type] || "commercialProperty";

  // Real Unsplash photography selected for each overview fact and amenity.
  // Keep these image references shared across property listings for a consistent UI.
  const factImages = {
    area: "photo-1449158743715-0a90ebb6d2d8",       // neighbourhood / land context
    type: "photo-1600607687939-ce8a6c25118c",       // modern apartment architecture
    bedrooms: "photo-1616594039964-ae9021a400a0",   // bedroom interior
    bathrooms: "photo-1620626011761-996317b8d101"   // bathroom interior
  };
  const factImageUrl = (key) => photo(factImages[key] || factImages.type, 320);

  const amenityImages = {
    "Parking": "photo-1506521781263-d8422e82f27a",
    "Covered Parking": "photo-1506521781263-d8422e82f27a",
    "Car Parking": "photo-1506521781263-d8422e82f27a",
    "Swimming Pool": "photo-1572331165267-854da2b10ccc",
    "24/7 Security": "photo-1557597774-9d273605dfa9",
    "Security": "photo-1557597774-9d273605dfa9",
    "Lift": "photo-1511818966892-d7d671e672a2",
    "Power Backup": "photo-1581092921461-eab62e97a780",
    "Gym": "photo-1540497077202-7c8a3999166f",
    "Road Access": "photo-1449158743715-0a90ebb6d2d8",
    "Water Supply": "photo-1542013936693-884638332954",
    "Electricity": "photo-1473341304170-971dccb5ac1e",
    "Clear Title": "photo-1450101499163-c8848c66ca85",
    "Children's Play Area": "photo-1596461404969-9ae70f2830c1",
    "Private Garden": "photo-1416879595882-3373a0480b5b",
    "Terrace": "photo-1600047509807-ba8f99d2cdde",
    "Garden": "photo-1416879595882-3373a0480b5b",
    "Internet Ready": "photo-1519389950473-47ba0277781c"
  };
  const facilityImage = (facility) => photo(amenityImages[facility] || "photo-1600607687939-ce8a6c25118c", 360);

  const facilityIcons = {
    "Parking":"🅿",
    "Swimming Pool":"🏊",
    "24/7 Security":"🛡",
    "Security":"🛡",
    "Lift":"🛗",
    "Power Backup":"⚡",
    "Gym":"🏋",
    "Road Access":"🛣",
    "Water Supply":"💧",
    "Electricity":"🔌",
    "Clear Title":"📄",
    "Covered Parking":"🅿",
    "Children's Play Area":"🛝",
    "Private Garden":"🌳",
    "Car Parking":"🚗",
    "Terrace":"🏡",
    "Garden":"🌿",
    "Internet Ready":"📶"
  };

  const facilityTranslationKey = value => {
    if (value === "Security") return "amenity_247Security";
    return "amenity_" + value.replace(/[^a-z0-9]/gi, "");
  };

  function renderDetails() {
  target.classList.add("property-detail-shell");
  target.innerHTML = `
    <div class="detail-gallery">
      <div class="detail-main-image">
        <img id="detailMainImage" src="${img(p.images[0])}" alt="${p.title}">
        <span class="detail-image-count">${t("propertyGallery")}</span>
      </div>
      <div class="detail-thumbnails" aria-label="${t("propertyGallery")}">
        ${p.images.slice(0, 6).map((image, index) => `
          <button
            type="button"
            class="detail-thumb ${index === 0 ? "is-active" : ""}"
            data-image-index="${index}"
            aria-label="${t("viewImage")} ${index + 1}"
            aria-pressed="${index === 0 ? "true" : "false"}"
          >
            <img src="${img(image, 500)}" alt="${p.title} ${index + 1}">
          </button>
        `).join("")}
      </div>
    </div>

    <div class="detail-heading-row">
      <div>
        <p class="detail-eyebrow">${t("verifiedOwnerListing")}</p>
        <h1>${isOwnerListing ? p.title : t(`propTitle${p.id}`)}</h1>
        <p class="detail-location">⌖ ${p.address}</p>
      </div>
      <div class="detail-price">
        ${p.price}
        <small>${t("ownerListedZeroBrokerage")}</small>
      </div>
    </div>

    <div class="detail-facts" aria-label="Property overview">
      <div class="detail-fact-card">
        <img class="fact-photo" src="${factImageUrl("area")}" alt="" loading="lazy">
        <div class="fact-copy"><strong>${p.area}</strong><span>${t("area")}</span></div>
      </div>
      <div class="detail-fact-card">
        <img class="fact-photo" src="${factImageUrl("type")}" alt="" loading="lazy">
        <div class="fact-copy"><strong>${t(typeKey)}</strong><span>${t("propertyTypeLabel")}</span></div>
      </div>
      <div class="detail-fact-card">
        <img class="fact-photo" src="${factImageUrl("bedrooms")}" alt="" loading="lazy">
        <div class="fact-copy"><strong>${p.beds || "—"}</strong><span>${t("bedrooms")}</span></div>
      </div>
      <div class="detail-fact-card">
        <img class="fact-photo" src="${factImageUrl("bathrooms")}" alt="" loading="lazy">
        <div class="fact-copy"><strong>${p.baths || "—"}</strong><span>${t("bathrooms")}</span></div>
      </div>
    </div>

    <section class="detail-section">
      <h2>${t("aboutProperty")}</h2>
      <p>${isOwnerListing && p.description ? p.description : t("propertyDescriptionGeneric")}</p>
    </section>

    <section class="detail-section">
      <h2>${t("facilitiesAmenities")}</h2>
      <div class="amenity-grid">
        ${(p.facilities || []).map(facility => {
          const key = facilityTranslationKey(facility);
          const translated = t(key);
          const label = translated === key ? facility : translated;
          return `
            <div class="amenity-item">
              <img class="amenity-photo" src="${facilityImage(facility)}" alt="" loading="lazy">
              <strong>${label}</strong>
            </div>
          `;
        }).join("")}
      </div>
    </section>

    <section class="detail-owner-card">
      <div>
        <p class="detail-eyebrow">${t("propertyOwnerDetails")}</p>
        <h2>${p.owner}</h2>
        <p>${p.email} · ${p.phone}</p>
      </div>
      <div class="detail-actions">
        <a class="sr-btn" href="contact.html?id=${p.id}">${t("contactUs")}</a>
        <a class="sr-btn secondary" href="buy.html">${t("backToProperties")}</a>
      </div>
    </section>
  `;

  const mainImage = target.querySelector("#detailMainImage");
  const thumbnails = [...target.querySelectorAll(".detail-thumb")];

  let activeIndex = 0;
  let galleryTimer;
  const showImage = (index) => {
      const selectedImage = p.images[index];
      if (!selectedImage || !mainImage) return;
      activeIndex = index;
      mainImage.classList.add("is-switching");
      window.setTimeout(() => {
        mainImage.src = img(selectedImage);
        mainImage.alt = `${p.title} - ${t("viewImage")} ${index + 1}`;
        mainImage.classList.remove("is-switching");
      }, 120);
      thumbnails.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
        item.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
  };
  const startGallery = () => {
    window.clearInterval(galleryTimer);
    if (p.images.length > 1) {
      galleryTimer = window.setInterval(() => showImage((activeIndex + 1) % p.images.length), 1800);
    }
  };
  thumbnails.forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.imageIndex);
      showImage(index);
      startGallery();
    });
  });

  startGallery();
  target.querySelector(".detail-gallery")?.addEventListener("mouseenter", () => window.clearInterval(galleryTimer));
  target.querySelector(".detail-gallery")?.addEventListener("mouseleave", startGallery);
  mainImage?.addEventListener("error", () => {
    mainImage.alt = p.title;
    mainImage.classList.add("image-load-failed");
  });

  window.StacklyCurrentProperty = p;
  }

  renderDetails();
  document.addEventListener("stacklyLanguageChanged", renderDetails);
})();
