/* Shared STACKLY property image source.
   Home, Buy, Details and Saved pages all use this same six-image collection.
   Local owner listings keep their six uploaded WebP images in localStorage.
*/
(() => {
  "use strict";
  const images = {
  "1": [
    "assets/property 01/luxuious apartment exterior.webp",
    "assets/property 01/luxuious apartment interior.webp",
    "assets/property 01/luxurious apartment bedroom.webp",
    "assets/property 01/luxious bathroom.webp",
    "assets/property 01/living area.webp",
    "assets/property 01/luxurios balcony.webp"
  ],
  "2": [
    "assets/exterior/property 02 exteriour.webp",
    "assets/interior/property 02 interior.webp",
    "assets/living room/property 02 living room.webp",
    "assets/bedroom/property 02 bedroom.webp",
    "assets/bathroom/property 02 bathroom.webp",
    "assets/balcony/propert 02 balcony.webp"
  ],
  "3": [
    "assets/exterior/property 03 extriour.webp",
    "assets/interior/property 03 interior.webp",
    "assets/bedroom/property 03 bedroom.webp",
    "assets/living room/property 03 living room.webp",
    "assets/balcony/property 03 balacony.webp",
    "assets/bathroom/property 03 bathroom.webp"
  ],
  "4": [
    "assets/exterior/property 04 exteriour.webp",
    "assets/interior/property 04 interior.webp",
    "assets/living room/property 04 living room.webp",
    "assets/bedroom/property 04 bedroom.webp",
    "assets/balcony/property 04 balcony.webp",
    "assets/bathroom/property 04 bathroom.webp"
  ],
  "5": [
    "assets/exterior/property 05 exteriour.webp",
    "assets/interior/property 05 interior.webp",
    "assets/bedroom/property 05 bedroom.webp",
    "assets/balcony/property 05 balcony.webp",
    "assets/bathroom/property 05 bathroom.webp",
    "assets/living room/property 05 living room.webp"
  ],
  "6": [
    "assets/exterior/property 06 exterior.webp",
    "assets/interior/property 06 interior.webp",
    "assets/living room/property 06 living room.webp",
    "assets/bedroom/property 06 bedroom.webp",
    "assets/bathroom/property 06 bathroom.webp",
    "assets/balcony/property 06 balcony.webp"
  ],
  "7": [
    "assets/exterior/property 07 exteriour.webp",
    "assets/interior/property 07 interior.webp",
    "assets/living room/property 02 living room.webp",
    "assets/bedroom/property 03 bedroom.webp",
    "assets/balcony/propert 02 balcony.webp",
    "assets/bathroom/property 02 bathroom.webp"
  ],
  "8": [
    "assets/exterior/property 08 exterior.webp",
    "assets/interior/property 08 interior.webp",
    "assets/balcony/property 06 balcony.webp",
    "assets/bedroom/property 04 bedroom.webp",
    "assets/living room/property 05 living room.webp",
    "assets/bathroom/property 05 bathroom.webp"
  ],
  "9": [
    "assets/exterior/property 09 exterior.webp",
    "assets/interior/property 09 interior.webp",
    "assets/bathroom/property 03 bathroom.webp",
    "assets/living room/property 02 living room.webp",
    "assets/balcony/property 05 balcony.webp",
    "assets/bedroom/property 04 bedroom.webp"
  ]
};
  const url = (value, width=900) => {
    if (!value) return "";
    if (/^(data:|blob:|https?:)/i.test(value)) {
      if (value.startsWith("https://images.unsplash.com/")) return value.replace(/([?&])w=\d+/, `$1w=${width}`);
      return value;
    }
    return value;
  };
  window.StacklyPropertyData = Object.freeze({
    images,
    imageUrl: url,
    getImages(id) { return (images[String(id)] || []).map(item => url(item)); },
    getOwnerListings() {
      try {
        const rows = JSON.parse(localStorage.getItem("stacklyRealEstateListings") || "[]");
        return Array.isArray(rows) ? rows : [];
      } catch (_) { return []; }
    }
  });
})();
