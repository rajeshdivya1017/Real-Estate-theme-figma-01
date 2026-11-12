(function(){
  "use strict";
  const form=document.getElementById("contactForm");
  const qs=new URLSearchParams(location.search);
  const rawPropertyId=qs.get("id")||"";
  const isOwnerListing=rawPropertyId.startsWith("owner-");
  const ownerListingId=isOwnerListing?rawPropertyId.slice(6):null;
  const propertyId=Number(rawPropertyId.match(/([0-9]+)/)?.[1])||0;
  const propertyRows={
    1:{title:"3 BHK apartment in Whitefield",price:"₹92,00,000",location:"Whitefield, Bengaluru",owner:"Arun Kumar",email:"arun.owner@example.com",phone:"+91 98765 43210",image:"photo-1600596542815-ffad4c1539a9"},
    2:{title:"Residential plot in Sarjapur",price:"₹48,00,000",location:"Sarjapur Road, Bengaluru",owner:"Priya Reddy",email:"priya.owner@example.com",phone:"+91 98765 12340",image:"photo-1500382017468-9049fed747ef"},
    3:{title:"2 BHK apartment in Hebbal",price:"₹85,00,000",location:"Hebbal, Bengaluru",owner:"Vikram Rao",email:"vikram.owner@example.com",phone:"+91 98450 12345",image:"photo-1600607687939-ce8a6c25118c"},
    4:{title:"2 BHK apartment in Electronic City",price:"₹68,00,000",location:"Electronic City, Bengaluru",owner:"Meena S",email:"meena.owner@example.com",phone:"+91 99000 12345",image:"photo-1600566753190-17f0baa2a6c3"},
    5:{title:"3 BHK house in Yelahanka",price:"₹1,15,00,000",location:"Yelahanka, Bengaluru",owner:"Suresh Nair",email:"suresh.owner@example.com",phone:"+91 98860 11122",image:"photo-1600047509807-ba8f99d2cdde"},
    6:{title:"Residential plot in Devanahalli",price:"₹72,00,000",location:"Devanahalli, Bengaluru",owner:"Kiran Gowda",email:"kiran.owner@example.com",phone:"+91 98451 67890",image:"photo-1449158743715-0a90ebb6d2d8"},
    7:{title:"2 BHK apartment in HSR Layout",price:"₹55,00,000",location:"HSR Layout, Bengaluru",owner:"Divya Menon",email:"divya.owner@example.com",phone:"+91 98440 22233",image:"photo-1600607687920-4e2a09cf159d"},
    8:{title:"Independent house in J.P. Nagar",price:"₹1,35,00,000",location:"J.P. Nagar, Bengaluru",owner:"Raghav Shetty",email:"raghav.owner@example.com",phone:"+91 99001 45678",image:"photo-1600566753086-00f18fb6b3ea"},
    9:{title:"Ready-to-use office space",price:"₹28,000 / month",location:"Outer Ring Road, Bengaluru",owner:"Anand Iyer",email:"anand.owner@example.com",phone:"+91 98451 22211",image:"photo-1497366754035-f200968a6e72"}
  };
  let p=propertyRows[propertyId]||null;
  if (isOwnerListing) {
    let ownerRows=[];
    try { ownerRows=JSON.parse(localStorage.getItem("stacklyRealEstateListings")||"[]"); } catch (_) {}
    const row=ownerRows.find(item=>String(item.id)===ownerListingId);
    if(row) p={
      title:row.title||"Owner-listed property",
      price:row.price?`₹${Number(row.price).toLocaleString("en-IN")}${row.intent==="Rent"?" / month":""}`:"Price on request",
      location:`${row.locality||""}, ${row.city||""}`,
      owner:row.owner||"Property Owner",email:"Not provided",phone:row.mobile||"Not provided",
      image:(row.photos||[])[0]||"",images:(row.photos||[]).slice(0,6),address:row.address||""
    };
  } else if(p && window.StacklyPropertyData) {
    p.image=window.StacklyPropertyData.getImages(propertyId)[0];
    p.images=window.StacklyPropertyData.getImages(propertyId);
  }
  const hero=document.getElementById("contactPropertyHero");
  if(hero&&p){
    hero.hidden=false;
    const heroImage=document.getElementById("contactHeroImage");
    if(heroImage) heroImage.src=p.image?.startsWith("assets/")||p.image?.startsWith("data:")?p.image:(p.image?.startsWith("https://")?p.image:`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=1800&q=90`);
    const title=document.getElementById("contactHeroPropertyTitle");
    if(title) title.textContent=window.StacklyLanguage?.translate?.(`propTitle${propertyId}`)||p.title;
    const price=document.getElementById("contactHeroPrice"); if(price) price.textContent=p.price;
    const loc=document.getElementById("contactHeroLocation"); if(loc) loc.textContent=p.location;
  }
  const context=document.getElementById("contactPropertyContext");
  if(context&&p){context.hidden=false;context.innerHTML=`<h2 data-i18n="selectedProperty">Selected property</h2><div class="contact-property-grid"><div><span data-i18n="propertyTitle">Property</span><strong>${(isOwnerListing?p.title:window.StacklyLanguage.translate(`propTitle${propertyId}`))}</strong></div><div><span data-i18n="askingPrice">Price</span><strong>${p.price}</strong></div><div><span data-i18n="locationLabel">Location</span><strong>${p.location}</strong></div></div><h3 data-i18n="propertyOwnerDetails">Owner details</h3><div class="contact-property-grid"><div><span data-i18n="ownerName">Owner name</span><strong>${p.owner}</strong></div><div><span data-i18n="email">Email address</span><strong>${p.email}</strong></div><div><span data-i18n="mobile">Mobile number</span><strong>${p.phone}</strong></div></div>`;}
  const locationText=document.getElementById("contactPropertyLocation");
  const mapFrame=document.getElementById("propertyLocationMap");
  const mapLink=document.getElementById("propertyMapLink");
  if(p&&locationText){locationText.textContent=p.location;}
  if(p&&mapFrame){
    const coords={1:[12.9698,77.7499],2:[12.9121,77.6955],3:[13.0500,77.5970],4:[12.8452,77.6600],5:[13.1007,77.5963],6:[13.1986,77.7066],7:[12.9116,77.6389],8:[12.9105,77.5857],9:[12.9352,77.6960]};
    const point=coords[propertyId]||[12.9716,77.5946];const [lat,lon]=point;
    mapFrame.src=`https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.018}%2C${lat-0.014}%2C${lon+0.018}%2C${lat+0.014}&layer=mapnik&marker=${lat}%2C${lon}`;
    if(mapLink)mapLink.href=`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
  }
  const occupancy=document.getElementById("visitorType");
  const familyWrap=document.getElementById("familyCountWrap");
  function toggleFamily(){if(familyWrap){const show=!!occupancy&&occupancy.value==="family";familyWrap.hidden=!show;const count=document.getElementById("familyCount");if(count)count.required=show;}}
  if(occupancy){occupancy.addEventListener("change",toggleFamily);toggleFamily();}
  if(form){form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;const status=document.getElementById("contactStatus");const data=Object.fromEntries(new FormData(form).entries());data.propertyId=rawPropertyId||null;data.property=p||null;const saved=JSON.parse(localStorage.getItem("stacklyPropertyEnquiries")||"[]");saved.push({...data,submittedAt:new Date().toISOString()});localStorage.setItem("stacklyPropertyEnquiries",JSON.stringify(saved));status.classList.add("is-visible","success-animate");const submitButton=form.querySelector('[type="submit"]');if(submitButton){submitButton.disabled=true;submitButton.dataset.originalText=submitButton.textContent;submitButton.textContent="✓ Submitted";}form.reset();toggleFamily();window.setTimeout(()=>{status.classList.remove("is-visible","success-animate");if(submitButton){submitButton.disabled=false;submitButton.textContent=submitButton.dataset.originalText||"Send Enquiry";}},6000);});}
  const back=document.getElementById("contactBackButton");if(back){back.addEventListener("click",()=>{if(history.length>1)history.back();else location.href=rawPropertyId?`property-details.html?id=${encodeURIComponent(rawPropertyId)}`:"buy.html";});}
  if(window.StacklyLanguage?.set) window.StacklyLanguage.set(window.StacklyLanguage.getCurrent());
})();
