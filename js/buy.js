(() => {
  "use strict";
  const grid = document.getElementById("propertyGrid");
  if (!grid) return;

  const form = document.getElementById("buyFilters");
  const count = document.getElementById("resultCount");
  const favoriteKey = "stacklyFavoriteProperties";
  const listingKey = "stacklyRealEstateListings";
  const data = window.StacklyPropertyData;

  const readJSON = (key, fallback = []) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return Array.isArray(value) ? value : fallback;
    } catch (_) { return fallback; }
  };
  const readFavorites = () => readJSON(favoriteKey);
  const writeFavorites = ids => {
    localStorage.setItem(favoriteKey, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent("stacklyFavoritesChanged"));
  };
  const remoteImage = (value, width = 900) => {
    if (!value) return "";
    if (value.startsWith("assets/")) return value;
    if (/^(data:|blob:|https?:)/i.test(value)) {
      if (value.startsWith("https://images.unsplash.com/")) {
        return value.replace(/([?&])w=\d+/, `$1w=${width}`);
      }
      return value;
    }
    return `https://images.unsplash.com/${value}?auto=format&fit=crop&w=${width}&q=85`;
  };

  function makeSlider(box, images, alt) {
    if (!box || !images?.length) return;
    box.style.backgroundImage = "none";
    box.innerHTML = "";
    const image = document.createElement("img");
    image.className = "listing-slider-image";
    image.alt = alt || "Property image";
    image.src = remoteImage(images[0]);
    box.appendChild(image);

    if (images.length > 1) {
      let current = 0;
      const timer = window.setInterval(() => {
        if (!document.body.contains(box)) {
          window.clearInterval(timer);
          return;
        }
        current = (current + 1) % images.length;
        image.classList.add("is-changing");
        window.setTimeout(() => {
          image.src = remoteImage(images[current]);
          image.classList.remove("is-changing");
        }, 160);
      }, 1800);
    }
  }

  // The nine built-in Buy cards use the exact same six images as Home.
  const cards = [...grid.querySelectorAll(".listing-card")];
  cards.forEach(card => {
    const id = Number((card.dataset.propertyId || "").replace("property-", ""));
    const images = data?.getImages(id) || [];
    makeSlider(card.querySelector(".listing-photo"), images, card.querySelector("h3")?.textContent);
  });

  function ownerCard(item) {
    const id = `owner-${item.id}`;
    const card = document.createElement("article");
    card.className = "listing-card owner-listing-card";
    card.dataset.propertyId = id;
    const photos = Array.isArray(item.photos) ? item.photos.slice(0, 6) : [];
    const imageBox = document.createElement("div");
    imageBox.className = "listing-photo";
    const image = document.createElement("img");
    image.className = "listing-slider-image";
    image.alt = item.title || "Owner property";
    image.src = photos[0] || "";
    imageBox.appendChild(image);

    const favorite = document.createElement("button");
    favorite.className = "property-favorite listing-favorite";
    favorite.type = "button";
    favorite.setAttribute("aria-label", "Save property");
    favorite.setAttribute("aria-pressed", "false");
    favorite.textContent = "♡";
    imageBox.appendChild(favorite);

    const tag = document.createElement("span");
    tag.className = "listing-tag";
    tag.textContent = item.intent === "Rent" ? "For Rent" : "For Sale";
    imageBox.appendChild(tag);

    const body = document.createElement("div");
    body.className = "listing-body";
    const price = document.createElement("p");
    price.className = "listing-price";
    price.textContent = item.price ? `₹${Number(item.price).toLocaleString("en-IN")}${item.intent === "Rent" ? " / month" : ""}` : "Price on request";
    const title = document.createElement("h3");
    title.textContent = item.title || "Owner-listed property";
    const meta = document.createElement("div");
    meta.className = "listing-meta";
    meta.textContent = `${item.locality || ""}, ${item.city || ""} · ${item.area || "—"} ${item.unit || ""} · ${item.type || ""}`;
    const foot = document.createElement("div");
    foot.className = "listing-foot";
    foot.innerHTML = "<span>Posted by Owner</span><strong>ZERO BROKERAGE</strong>";
    const action = document.createElement("div");
    action.className = "listing-action";
    const link = document.createElement("a");
    link.className = "sr-btn";
    link.href = `property-details.html?id=${encodeURIComponent(id)}`;
    link.textContent = "View Details & Contact Owner";
    action.appendChild(link);
    body.append(price, title, meta, foot, action);
    card.append(imageBox, body);

    if (photos.length > 1) {
      let current = 0;
      const timer = window.setInterval(() => {
        if (!document.body.contains(card)) return window.clearInterval(timer);
        current = (current + 1) % photos.length;
        image.src = photos[current];
      }, 1800);
    }
    return card;
  }

  // User-added listings are included in Buy Properties, with their six uploaded photos.
  const ownerListings = readJSON(listingKey);
  ownerListings.forEach(item => {
    if (Array.isArray(item.photos) && item.photos.length === 6) grid.appendChild(ownerCard(item));
  });
  if (count) count.textContent = grid.querySelectorAll(".listing-card").length;

  function paintFavorite(card) {
    const button = card.querySelector(".listing-favorite");
    if (!button) return;
    const active = readFavorites().includes(card.dataset.propertyId);
    button.classList.toggle("is-saved", active);
    button.textContent = active ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(active));
  }

  grid.querySelectorAll(".listing-card").forEach(card => {
    paintFavorite(card);
    card.querySelector(".listing-favorite")?.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const id = card.dataset.propertyId;
      const ids = readFavorites();
      writeFavorites(ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id]);
      paintFavorite(card);
    });
  });

  function filter() {
    const query = (document.getElementById("filterLocation")?.value || "").toLowerCase().trim();
    const type = (document.getElementById("filterType")?.value || "").toLowerCase();
    let shown = 0;
    [...grid.querySelectorAll(".listing-card")].forEach(card => {
      const text = card.innerText.toLowerCase();
      const ok = (!query || text.includes(query)) && (!type || text.includes(type));
      card.hidden = !ok;
      if (ok) shown++;
    });
    if (count) count.textContent = shown;
  }
  form?.addEventListener("submit", event => { event.preventDefault(); filter(); });

  document.getElementById("sortListings")?.addEventListener("change", event => {
    const all = [...grid.querySelectorAll(".listing-card")];
    const priceOf = card => Number((card.querySelector(".listing-price")?.textContent.match(/[\d,]+/) || ["0"])[0].replace(/,/g, ""));
    all.sort((a, b) => event.target.value === "low" ? priceOf(a) - priceOf(b)
      : event.target.value === "high" ? priceOf(b) - priceOf(a) : all.indexOf(a) - all.indexOf(b));
    all.forEach(card => grid.appendChild(card));
  });
})();
