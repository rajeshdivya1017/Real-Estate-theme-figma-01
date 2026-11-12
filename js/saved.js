(() => {
"use strict";
const KEY="stacklyFavoriteProperties";
const t={en:{savedPageTitle:"Your Saved Properties",savedPageIntro:"All the properties you have bookmarked, in one place.",savedEmptyTitle:"No saved properties yet",savedEmptyText:"Tap the heart on any property to keep it here.",removeSaved:"Remove",viewSavedDetails:"View Details & Contact Owner",savedCountText:"saved properties"},
ta:{savedPageTitle:"நீங்கள் சேமித்த சொத்துகள்",savedPageIntro:"நீங்கள் விருப்பமாகச் சேமித்த அனைத்து சொத்துகளும் இங்கே.",savedEmptyTitle:"இன்னும் சொத்துகள் சேமிக்கப்படவில்லை",savedEmptyText:"சேமிக்க ஏதேனும் சொத்தின் இதயக் குறியைத் தேர்ந்தெடுக்கவும்.",removeSaved:"நீக்கு",viewSavedDetails:"விவரங்கள் மற்றும் உரிமையாளரைத் தொடர்புகொள்",savedCountText:"சேமித்த சொத்துகள்"},
hi:{savedPageTitle:"आपकी सहेजी गई संपत्तियां",savedPageIntro:"आपके द्वारा सहेजी गई सभी संपत्तियां यहां हैं।",savedEmptyTitle:"अभी कोई संपत्ति सहेजी नहीं गई",savedEmptyText:"किसी भी संपत्ति को सहेजने के लिए दिल पर टैप करें।",removeSaved:"हटाएं",viewSavedDetails:"विवरण देखें और मालिक से संपर्क करें",savedCountText:"सहेजी गई संपत्तियां"},
te:{savedPageTitle:"మీరు సేవ్ చేసిన ఆస్తులు",savedPageIntro:"మీరు సేవ్ చేసిన అన్ని ఆస్తులు ఇక్కడ ఉన్నాయి.",savedEmptyTitle:"ఇంకా ఆస్తులు సేవ్ చేయలేదు",savedEmptyText:"ఏదైనా ఆస్తిని సేవ్ చేయడానికి హార్ట్ గుర్తును నొక్కండి.",removeSaved:"తొలగించు",viewSavedDetails:"వివరాలు చూడండి & యజమానిని సంప్రదించండి",savedCountText:"సేవ్ చేసిన ఆస్తులు"},
ml:{savedPageTitle:"നിങ്ങൾ സേവ് ചെയ്ത പ്രോപ്പർട്ടികൾ",savedPageIntro:"നിങ്ങൾ സേവ് ചെയ്ത എല്ലാ പ്രോപ്പർട്ടികളും ഇവിടെ കാണാം.",savedEmptyTitle:"ഇതുവരെ പ്രോപ്പർട്ടികൾ സേവ് ചെയ്തിട്ടില്ല",savedEmptyText:"ഒരു പ്രോപ്പർട്ടി സേവ് ചെയ്യാൻ ഹാർട്ട് അമർത്തുക.",removeSaved:"നീക്കംചെയ്യുക",viewSavedDetails:"വിശദാംശങ്ങൾ കാണുക, ഉടമയെ ബന്ധപ്പെടുക",savedCountText:"സേവ് ചെയ്ത പ്രോപ്പർട്ടികൾ"},
kn:{savedPageTitle:"ನೀವು ಉಳಿಸಿದ ಆಸ್ತಿಗಳು",savedPageIntro:"ನೀವು ಉಳಿಸಿದ ಎಲ್ಲಾ ಆಸ್ತಿಗಳು ಇಲ್ಲಿ ಇವೆ.",savedEmptyTitle:"ಇನ್ನೂ ಯಾವುದೇ ಆಸ್ತಿ ಉಳಿಸಿಲ್ಲ",savedEmptyText:"ಆಸ್ತಿಯನ್ನು ಉಳಿಸಲು ಹೃದಯ ಚಿಹ್ನೆಯನ್ನು ಒತ್ತಿ.",removeSaved:"ತೆಗೆದುಹಾಕಿ",viewSavedDetails:"ವಿವರಗಳನ್ನು ನೋಡಿ ಮತ್ತು ಮಾಲೀಕರನ್ನು ಸಂಪರ್ಕಿಸಿ",savedCountText:"ಉಳಿಸಿದ ಆಸ್ತಿಗಳು"},
bn:{savedPageTitle:"আপনার সংরক্ষিত সম্পত্তি",savedPageIntro:"আপনার সংরক্ষিত সব সম্পত্তি এখানে রয়েছে।",savedEmptyTitle:"এখনও কোনো সম্পত্তি সংরক্ষণ করা হয়নি",savedEmptyText:"কোনো সম্পত্তি সংরক্ষণ করতে হার্টে চাপ দিন।",removeSaved:"সরান",viewSavedDetails:"বিবরণ দেখুন ও মালিকের সঙ্গে যোগাযোগ করুন",savedCountText:"সংরক্ষিত সম্পত্তি"},
mr:{savedPageTitle:"तुमच्या जतन केलेल्या मालमत्ता",savedPageIntro:"तुम्ही जतन केलेल्या सर्व मालमत्ता येथे आहेत.",savedEmptyTitle:"अद्याप कोणतीही मालमत्ता जतन केलेली नाही",savedEmptyText:"मालमत्ता जतन करण्यासाठी हार्टवर टॅप करा.",removeSaved:"काढा",viewSavedDetails:"तपशील पहा आणि मालकाशी संपर्क साधा",savedCountText:"जतन केलेल्या मालमत्ता"}};
if(window.StacklyLanguage?.register) window.StacklyLanguage.register(t);
const data=[
[1,"3 BHK apartment in Whitefield","₹92,00,000","Whitefield, Bengaluru","1,450 sq.ft. · Apartment",["photo-1600596542815-ffad4c1539a9","photo-1600607687939-ce8a6c25118c","photo-1600566753190-17f0baa2a6c3","photo-1600607687920-4e2a09cf159d","photo-1600566753086-00f18fb6b3ea","photo-1600596542815-ffad4c1539a9"]],
[2,"Residential plot in Sarjapur","₹48,00,000","Sarjapur Road, Bengaluru","1,200 sq.ft. · Land / Plot",["photo-1500382017468-9049fed747ef","photo-1510798831971-661eb04b3739","photo-1500530855697-b586d89ba3ee","photo-1449158743715-0a90ebb6d2d8","photo-1500382017468-9049fed747ef","photo-1510798831971-661eb04b3739"]],
[3,"2 BHK apartment in Hebbal","₹85,00,000","Hebbal, Bengaluru","1,250 sq.ft. · Apartment",["photo-1600607687939-ce8a6c25118c","photo-1600566753086-00f18fb6b3ea","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d","photo-1600566753086-00f18fb6b3ea","photo-1600596542815-ffad4c1539a9"]],
[4,"2 BHK apartment in Electronic City","₹68,00,000","Electronic City, Bengaluru","1,100 sq.ft. · Apartment",["photo-1600566753190-17f0baa2a6c3","photo-1600607687939-ce8a6c25118c","photo-1600210492486-724fe5c67fb0","photo-1600607687920-4e2a09cf159d","photo-1600566753086-00f18fb6b3ea","photo-1600596542815-ffad4c1539a9"]],
[5,"3 BHK house in Yelahanka","₹1,15,00,000","Yelahanka, Bengaluru","1,800 sq.ft. · Independent House",["photo-1600047509807-ba8f99d2cdde","photo-1600566753086-00f18fb6b3ea","photo-1600607687939-ce8a6c25118c","photo-1600210492486-724fe5c67fb0"]],
[6,"Residential plot in Devanahalli","₹72,00,000","Devanahalli, Bengaluru","1,500 sq.ft. · Land / Plot",["photo-1500382017468-9049fed747ef","photo-1449158743715-0a90ebb6d2d8","photo-1510798831971-661eb04b3739","photo-1500530855697-b586d89ba3ee"]],
[7,"2 BHK apartment in HSR Layout","₹55,00,000","HSR Layout, Bengaluru","1,080 sq.ft. · Apartment",["photo-1600607687920-4e2a09cf159d","photo-1600210492486-724fe5c67fb0","photo-1600566753190-17f0baa2a6c3","photo-1600607687939-ce8a6c25118c"]],
[8,"Independent house in J.P. Nagar","₹1,35,00,000","J.P. Nagar, Bengaluru","2,100 sq.ft. · Independent House",["photo-1600566753086-00f18fb6b3ea","photo-1600047509807-ba8f99d2cdde","photo-1600607687939-ce8a6c25118c","photo-1600210492486-724fe5c67fb0"]],
[9,"Ready-to-use office space","₹28,000 / month","Outer Ring Road, Bengaluru","900 sq.ft. · Commercial",["photo-1497366754035-f200968a6e72","photo-1497366811353-6870744d04b2","photo-1497366216548-37526070297c","photo-1497366754035-f200968a6e72"]]
];
if (window.StacklyPropertyData) {
  data.forEach(row => { row[5] = window.StacklyPropertyData.getImages(row[0]); });
}
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(_){return []}};
const write=ids=>{localStorage.setItem(KEY,JSON.stringify(ids));window.dispatchEvent(new CustomEvent("stacklyFavoritesChanged"));};
const lang=()=>t[window.StacklyLanguage?.getCurrent?.()||"en"]||t.en;
function render(){
 const grid=document.getElementById("savedGrid"),empty=document.getElementById("savedEmpty"),summary=document.getElementById("savedSummary");if(!grid)return;
 const ids=read();
 const staticItems=data.filter(row=>ids.includes(`property-${row[0]}`));
 let ownerRows=[];
 try { ownerRows=JSON.parse(localStorage.getItem("stacklyRealEstateListings")||"[]"); } catch(_){}
 const ownerItems=ownerRows.filter(row=>ids.includes(`owner-${row.id}`)).map(row=>[
   `owner-${row.id}`,row.title||"Owner-listed property",
   row.price?`₹${Number(row.price).toLocaleString("en-IN")}${row.intent==="Rent"?" / month":""}`:"Price on request",
   `${row.locality||""}, ${row.city||""}`,`${row.area||"—"} ${row.unit||""} · ${row.type||""}`,
   Array.isArray(row.photos)?row.photos.slice(0,6):[]
 ]);
 const items=[...staticItems,...ownerItems];
 summary.textContent=`${items.length} ${lang().savedCountText}`;
 empty.hidden=items.length!==0;
 const imageUrl=value=>{
   if(!value)return "";
   if(value.startsWith("assets/")) return value;
   if (/^(data:|blob:|https?:)/i.test(value)) {
     return value.startsWith("https://images.unsplash.com/") ? value.replace(/([?&])w=\d+/, "$1w=900") : value;
   }
   return `https://images.unsplash.com/${value}?auto=format&fit=crop&w=900&q=85`;
 };
 const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
 grid.innerHTML=items.map(row=>{
   const id=String(row[0]).startsWith("owner-")?String(row[0]):`property-${row[0]}`;
   const title=String(row[0]).startsWith("owner-")?row[1]:(window.StacklyLanguage?.translate?.(`propTitle${row[0]}`)||row[1]);
   const photos=row[5]||[];
   return `<article class="saved-card" data-id="${esc(id)}">
     <div class="saved-photo"><img src="${imageUrl(photos[0])}" alt="${esc(title)}"><span class="saved-photo-tag">For Sale / Rent</span><button class="saved-remove" type="button" aria-label="${lang().removeSaved}">♥</button></div>
     <div class="saved-card-body"><strong class="saved-price">${esc(row[2])}</strong><h2>${esc(title)}</h2><p>${esc(row[3])}</p><small>${esc(row[4])}</small><a class="sr-btn saved-view" href="property-details.html?id=${encodeURIComponent(id)}">${lang().viewSavedDetails}</a></div>
   </article>`;
 }).join("");
 grid.querySelectorAll(".saved-card").forEach((card,i)=>{
   const row=items[i],img=card.querySelector("img"),photos=row[5]||[];
   let n=0;
   if(photos.length>1){
     const timer=setInterval(()=>{
       if(!document.body.contains(card)){clearInterval(timer);return;}
       n=(n+1)%photos.length;img.src=imageUrl(photos[n]);
     },1800);
   }
   card.querySelector(".saved-remove").addEventListener("click",()=>{
     write(read().filter(x=>x!==card.dataset.id));render();
   });
 });
}
window.addEventListener("stacklyLanguageChanged",render);window.addEventListener("stacklyFavoritesChanged",render);window.addEventListener("storage",render);document.addEventListener("DOMContentLoaded",render);render();
})();