
/* =========================================================
   STACKLY REAL ESTATE — COMMON JAVASCRIPT

   1. Shared Header
   2. Shared Footer
   3. Mobile Navigation
   4. Active Navigation
   5. Header Scroll Effect
   6. 3D Building Construction Preloader
   7. Footer Newsletter Toast
   8. 8 Language Translation System

========================================================= */

(() => {

    "use strict";


    /* =====================================================
       1. CONFIGURATION
    ===================================================== */

    const CONFIG = {

        logoPath: "assets/Stackly Real Estate Logo.webp",

        brandName: "STACKLY",

        navItems: [

            {
                label: "Home",
                href: "index.html",
                key: "home"
            },

            {
                label: "Buy",
                href: "buy.html",
                key: "buy"
            },

            {
                label: "List Property",
                href: "list-property.html",
                key: "list"
            },

            {
                label: "Saved",
                href: "saved.html",
                key: "saved"
            }

        ],

        registerHref: "register.html",

        loaderMinimumMs: 2500,

        loaderMaximumMs: 2300,

        languageStorageKey: "stacklyRealEstateLanguage"

    };


    const $ = (selector, root = document) =>
        root.querySelector(selector);



    /* =====================================================
       2. SUPPORTED LANGUAGES
    ===================================================== */

    const LANGUAGES = {

        en: "English",
        ta: "தமிழ்",
        hi: "हिन्दी",
        te: "తెలుగు",
        ml: "മലയാളം",
        kn: "ಕನ್ನಡ",
        bn: "বাংলা",
        mr: "मराठी"

    };



    /* =====================================================
       3. TRANSLATION DICTIONARY

       Add translations for page content using data-i18n.
    ===================================================== */

    const TRANSLATIONS = {

        en: {

            home: "Home",
            buy: "Buy",
            list: "List Property",
            saved: "Saved",
            register: "Register",

            footerDescription:
                "Property conversations, made simple. Buy, sell and rent with confidence through a more direct real-estate experience.",

            zeroBrokerage:
                "Zero brokerage. Direct owners.",

            explore: "Explore",
            buyProperties: "Buy Properties",
            listProperty: "List Property",
            savedProperties: "Saved Properties",

            support: "Support",
            aboutUs: "About Us",
            contactUs: "Contact Us",
            faqs: "FAQs",
            privacyPolicy: "Privacy Policy",

            stayConnected: "Stay Connected",

            newsletterDescription:
                "Share your email and our team will get in touch with you soon.",

            emailPlaceholder: "Enter your email address",
            send: "Send",

            success:
                "Our team will contact you soon!",

            terms:
                "Terms & Conditions",

            rights:
                "All rights reserved.",

            loader:
                "Building your experience..."

        },


        ta: {

            home: "முகப்பு",
            buy: "வாங்க",
            list: "சொத்தை பட்டியலிடு",
            saved: "சேமித்தவை",
            register: "பதிவு செய்",

            footerDescription:
                "சொத்து வாங்குதல், விற்பனை மற்றும் வாடகை தொடர்பான செயல்களை எளிதாக்குகிறோம். நேரடி உரிமையாளர்களுடன் நம்பிக்கையுடன் தொடர்பு கொள்ளுங்கள்.",

            zeroBrokerage:
                "தரகு கட்டணம் இல்லை. நேரடி உரிமையாளர்கள்.",

            explore: "ஆராயுங்கள்",
            buyProperties: "சொத்துகளை வாங்குங்கள்",
            listProperty: "சொத்தை பட்டியலிடுங்கள்",
            savedProperties: "சேமித்த சொத்துகள்",

            support: "உதவி",
            aboutUs: "எங்களைப் பற்றி",
            contactUs: "தொடர்பு கொள்ள",
            faqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
            privacyPolicy: "தனியுரிமைக் கொள்கை",

            stayConnected: "தொடர்பில் இருங்கள்",

            newsletterDescription:
                "உங்கள் மின்னஞ்சலைப் பகிருங்கள். எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.",

            emailPlaceholder: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
            send: "அனுப்பு",

            success:
                "எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்!",

            terms:
                "விதிமுறைகள் மற்றும் நிபந்தனைகள்",

            rights:
                "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

            loader:
                "உங்கள் அனுபவத்தை உருவாக்குகிறோம்..."

        },


        hi: {

            home: "होम",
            buy: "खरीदें",
            list: "संपत्ति सूचीबद्ध करें",
            saved: "सहेजे गए",
            register: "रजिस्टर करें",

            footerDescription:
                "संपत्ति खरीदना, बेचना और किराए पर लेना आसान बनाएं। सीधे मालिकों से जुड़ें और भरोसे के साथ निर्णय लें।",

            zeroBrokerage:
                "कोई ब्रोकरेज नहीं। सीधे मालिक।",

            explore: "एक्सप्लोर करें",
            buyProperties: "संपत्ति खरीदें",
            listProperty: "संपत्ति सूचीबद्ध करें",
            savedProperties: "सहेजी गई संपत्तियां",

            support: "सहायता",
            aboutUs: "हमारे बारे में",
            contactUs: "संपर्क करें",
            faqs: "अक्सर पूछे जाने वाले प्रश्न",
            privacyPolicy: "गोपनीयता नीति",

            stayConnected: "जुड़े रहें",

            newsletterDescription:
                "अपना ईमेल साझा करें। हमारी टीम जल्द ही आपसे संपर्क करेगी।",

            emailPlaceholder: "अपना ईमेल पता दर्ज करें",
            send: "भेजें",

            success:
                "हमारी टीम जल्द ही आपसे संपर्क करेगी!",

            terms:
                "नियम और शर्तें",

            rights:
                "सर्वाधिकार सुरक्षित।",

            loader:
                "आपका अनुभव तैयार किया जा रहा है..."

        },


        te: {

            home: "హోమ్",
            buy: "కొనండి",
            list: "ఆస్తిని జాబితా చేయండి",
            saved: "సేవ్ చేసినవి",
            register: "నమోదు చేయండి",

            footerDescription:
                "ఆస్తులను కొనడం, అమ్మడం మరియు అద్దెకు ఇవ్వడం సులభం. యజమానులతో నేరుగా సంప్రదించండి.",

            zeroBrokerage:
                "బ్రోకరేజ్ లేదు. నేరుగా యజమానులు.",

            explore: "అన్వేషించండి",
            buyProperties: "ఆస్తులను కొనండి",
            listProperty: "ఆస్తిని జాబితా చేయండి",
            savedProperties: "సేవ్ చేసిన ఆస్తులు",

            support: "సహాయం",
            aboutUs: "మా గురించి",
            contactUs: "సంప్రదించండి",
            faqs: "తరచుగా అడిగే ప్రశ్నలు",
            privacyPolicy: "గోప్యతా విధానం",

            stayConnected: "సంప్రదింపులో ఉండండి",

            newsletterDescription:
                "మీ ఇమెయిల్‌ను పంచుకోండి. మా బృందం త్వరలో మిమ్మల్ని సంప్రదిస్తుంది.",

            emailPlaceholder: "మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి",
            send: "పంపండి",

            success:
                "మా బృందం త్వరలో మిమ్మల్ని సంప్రదిస్తుంది!",

            terms:
                "నిబంధనలు మరియు షరతులు",

            rights:
                "అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",

            loader:
                "మీ అనుభవాన్ని సిద్ధం చేస్తున్నాము..."

        },


        ml: {

            home: "ഹോം",
            buy: "വാങ്ങുക",
            list: "പ്രോപ്പർട്ടി ലിസ്റ്റ് ചെയ്യുക",
            saved: "സേവ് ചെയ്തത്",
            register: "രജിസ്റ്റർ ചെയ്യുക",

            footerDescription:
                "വസ്തു വാങ്ങുന്നതും വിൽക്കുന്നതും വാടകയ്ക്ക് നൽകുന്നതും എളുപ്പമാക്കുന്നു. ഉടമകളുമായി നേരിട്ട് ബന്ധപ്പെടുക.",

            zeroBrokerage:
                "ബ്രോക്കറേജ് ഇല്ല. നേരിട്ടുള്ള ഉടമകൾ.",

            explore: "പര്യവേക്ഷണം",
            buyProperties: "പ്രോപ്പർട്ടികൾ വാങ്ങുക",
            listProperty: "പ്രോപ്പർട്ടി ലിസ്റ്റ് ചെയ്യുക",
            savedProperties: "സേവ് ചെയ്ത പ്രോപ്പർട്ടികൾ",

            support: "സഹായം",
            aboutUs: "ഞങ്ങളെക്കുറിച്ച്",
            contactUs: "ബന്ധപ്പെടുക",
            faqs: "പതിവ് ചോദ്യങ്ങൾ",
            privacyPolicy: "സ്വകാര്യതാ നയം",

            stayConnected: "ബന്ധം നിലനിർത്തുക",

            newsletterDescription:
                "നിങ്ങളുടെ ഇമെയിൽ പങ്കിടൂ. ഞങ്ങളുടെ ടീം ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.",

            emailPlaceholder: "നിങ്ങളുടെ ഇമെയിൽ വിലാസം നൽകുക",
            send: "അയയ്ക്കുക",

            success:
                "ഞങ്ങളുടെ ടീം ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും!",

            terms:
                "നിബന്ധനകളും വ്യവസ്ഥകളും",

            rights:
                "എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.",

            loader:
                "നിങ്ങളുടെ അനുഭവം തയ്യാറാക്കുന്നു..."

        },


        kn: {

            home: "ಮುಖಪುಟ",
            buy: "ಖರೀದಿಸಿ",
            list: "ಆಸ್ತಿಯನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",
            saved: "ಉಳಿಸಿದವು",
            register: "ನೋಂದಣಿ",

            footerDescription:
                "ಆಸ್ತಿ ಖರೀದಿ, ಮಾರಾಟ ಮತ್ತು ಬಾಡಿಗೆ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸುಲಭಗೊಳಿಸಿ. ಮಾಲೀಕರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ.",

            zeroBrokerage:
                "ಬ್ರೋಕರೇಜ್ ಇಲ್ಲ. ನೇರ ಮಾಲೀಕರು.",

            explore: "ಅನ್ವೇಷಿಸಿ",
            buyProperties: "ಆಸ್ತಿಗಳನ್ನು ಖರೀದಿಸಿ",
            listProperty: "ಆಸ್ತಿಯನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",
            savedProperties: "ಉಳಿಸಿದ ಆಸ್ತಿಗಳು",

            support: "ಬೆಂಬಲ",
            aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
            contactUs: "ಸಂಪರ್ಕಿಸಿ",
            faqs: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
            privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",

            stayConnected: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",

            newsletterDescription:
                "ನಿಮ್ಮ ಇಮೇಲ್ ಹಂಚಿಕೊಳ್ಳಿ. ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.",

            emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ",
            send: "ಕಳುಹಿಸಿ",

            success:
                "ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ!",

            terms:
                "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",

            rights:
                "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

            loader:
                "ನಿಮ್ಮ ಅನುಭವವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ..."

        },


        bn: {

            home: "হোম",
            buy: "কিনুন",
            list: "সম্পত্তি তালিকাভুক্ত করুন",
            saved: "সংরক্ষিত",
            register: "নিবন্ধন করুন",

            footerDescription:
                "সম্পত্তি কেনা, বিক্রি এবং ভাড়া নেওয়া সহজ করুন। সরাসরি মালিকদের সঙ্গে যোগাযোগ করুন।",

            zeroBrokerage:
                "কোনো ব্রোকারেজ নেই। সরাসরি মালিক।",

            explore: "অন্বেষণ করুন",
            buyProperties: "সম্পত্তি কিনুন",
            listProperty: "সম্পত্তি তালিকাভুক্ত করুন",
            savedProperties: "সংরক্ষিত সম্পত্তি",

            support: "সহায়তা",
            aboutUs: "আমাদের সম্পর্কে",
            contactUs: "যোগাযোগ করুন",
            faqs: "সাধারণ প্রশ্নাবলী",
            privacyPolicy: "গোপনীয়তা নীতি",

            stayConnected: "যোগাযোগ রাখুন",

            newsletterDescription:
                "আপনার ইমেল শেয়ার করুন। আমাদের দল শীঘ্রই আপনার সঙ্গে যোগাযোগ করবে।",

            emailPlaceholder: "আপনার ইমেল ঠিকানা লিখুন",
            send: "পাঠান",

            success:
                "আমাদের দল শীঘ্রই আপনার সঙ্গে যোগাযোগ করবে!",

            terms:
                "শর্তাবলী",

            rights:
                "সর্বস্বত্ব সংরক্ষিত।",

            loader:
                "আপনার অভিজ্ঞতা প্রস্তুত করা হচ্ছে..."

        },


        mr: {

            home: "मुख्यपृष्ठ",
            buy: "खरेदी करा",
            list: "मालमत्ता सूचीबद्ध करा",
            saved: "जतन केलेले",
            register: "नोंदणी करा",

            footerDescription:
                "मालमत्ता खरेदी, विक्री आणि भाड्याने देणे सोपे करा. मालकांशी थेट संपर्क साधा.",

            zeroBrokerage:
                "कोणतेही ब्रोकरेज नाही. थेट मालक.",

            explore: "एक्सप्लोर करा",
            buyProperties: "मालमत्ता खरेदी करा",
            listProperty: "मालमत्ता सूचीबद्ध करा",
            savedProperties: "जतन केलेल्या मालमत्ता",

            support: "मदत",
            aboutUs: "आमच्याबद्दल",
            contactUs: "संपर्क साधा",
            faqs: "वारंवार विचारले जाणारे प्रश्न",
            privacyPolicy: "गोपनीयता धोरण",

            stayConnected: "संपर्कात रहा",

            newsletterDescription:
                "तुमचा ईमेल शेअर करा. आमची टीम लवकरच तुमच्याशी संपर्क साधेल.",

            emailPlaceholder: "तुमचा ईमेल पत्ता टाका",
            send: "पाठवा",

            success:
                "आमची टीम लवकरच तुमच्याशी संपर्क साधेल!",

            terms:
                "अटी आणि शर्ती",

            rights:
                "सर्व हक्क राखीव.",

            loader:
                "तुमचा अनुभव तयार करत आहोत..."

        }

    };



    const SHARED_BRAND_TRANSLATIONS = {
        "en": {
                "directPeer": "Direct Peer",
                "realEstate": "REAL ESTATE",
                "emailAddress": "Email address"
        },
        "ta": {
                "directPeer": "டைரக்ட் பியர்",
                "realEstate": "ரியல் எஸ்டேட்",
                "emailAddress": "மின்னஞ்சல் முகவரி"
        },
        "te": {
                "directPeer": "డైరెక్ట్ పీర్",
                "realEstate": "రియల్ ఎస్టేట్",
                "emailAddress": "ఇమెయిల్ చిరునామా"
        },
        "hi": {
                "directPeer": "डायरेक्ट पीयर",
                "realEstate": "रियल एस्टेट",
                "emailAddress": "ईमेल पता"
        },
        "ml": {
                "directPeer": "ഡയറക്ട് പിയർ",
                "realEstate": "റിയൽ എസ്റ്റേറ്റ്",
                "emailAddress": "ഇമെയിൽ വിലാസം"
        },
        "kn": {
                "directPeer": "ಡೈರೆಕ್ಟ್ ಪೀರ್",
                "realEstate": "ರಿಯಲ್ ಎಸ್ಟೇಟ್",
                "emailAddress": "ಇಮೇಲ್ ವಿಳಾಸ"
        },
        "bn": {
                "directPeer": "ডাইরেক্ট পিয়ার",
                "realEstate": "রিয়েল এস্টেট",
                "emailAddress": "ইমেল ঠিকানা"
        },
        "mr": {
                "directPeer": "डायरेक्ट पीअर",
                "realEstate": "रिअल इस्टेट",
                "emailAddress": "ईमेल पत्ता"
        }
};
    Object.keys(SHARED_BRAND_TRANSLATIONS).forEach(language => Object.assign(TRANSLATIONS[language], SHARED_BRAND_TRANSLATIONS[language]));

    /* =====================================================
       4. CURRENT LANGUAGE
    ===================================================== */

    let currentLanguage = localStorage.getItem(
        CONFIG.languageStorageKey
    ) || "en";


    if (!TRANSLATIONS[currentLanguage]) {

        currentLanguage = "en";

    }



    /* =====================================================
       5. TRANSLATION HELPER
    ===================================================== */

    function translate(key) {

        return (

            TRANSLATIONS[currentLanguage]?.[key] ||

            TRANSLATIONS.en[key] ||

            key

        );

    }



    /* =====================================================
       6. BRAND MARKUP
    ===================================================== */

    function brandMarkup(extraClass = "") {

        return `

            <a
                class="sr-brand ${extraClass}"
                href="index.html"
                aria-label="STACKLY home"
            >

                <img
                    src="${CONFIG.logoPath}"
                    alt="STACKLY Real Estate"
                >

            </a>

        `;

    }



    /* =====================================================
       7. LANGUAGE DROPDOWN
    ===================================================== */

    function languageMarkup() {

        const options = Object.entries(LANGUAGES)
            .map(([code, label]) => `
                <option value="${code}" ${currentLanguage === code ? "selected" : ""}>
                    ${label}
                </option>
            `)
            .join("");

        return `
            <label class="sr-language" aria-label="Select website language">
                <svg class="sr-language-globe" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M5.6 6.5h12.8M5.6 17.5h12.8"></path>
                </svg>
                <span class="sr-language-code" id="srLanguageCode">${currentLanguage.toUpperCase()}</span>
                <svg class="sr-language-chevron" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="m2.5 4.5 3.5 3 3.5-3"></path>
                </svg>
                <select id="srLanguageSelect" aria-label="Select website language">
                    ${options}
                </select>
            </label>
        `;

    }


    /* =====================================================
       8. COMMON HEADER
    ===================================================== */

    function headerMarkup() {

        const links = CONFIG.navItems.map(item => {

            return `

                <a
                    class="sr-nav-link"
                    href="${item.href}"
                    data-nav-key="${item.key}"
                    data-i18n="${item.key}"
                >

                    ${translate(item.key)}${item.key === "saved" ? ` <span class="sr-saved-count" id="srSavedCount">0</span>` : ""}

                </a>

            `;

        }).join("");


        return `

            <header
                class="sr-header"
                id="srHeader"
            >

                <div class="sr-container sr-header-inner">


                    <!-- LOGO + BRAND NAME -->

                    <div class="sr-header-brand">

                        ${brandMarkup()}

                        <span class="sr-brand-name" data-i18n="directPeer">

                            ${translate("directPeer")}

                        </span>

                    </div>



                    <!-- MOBILE MENU -->

                    <button
                        class="sr-menu-toggle"
                        id="srMenuToggle"
                        type="button"
                        aria-label="Open navigation"
                        aria-expanded="false"
                        aria-controls="srNavWrap"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>



                    <!-- NAVIGATION -->

                    <div
                        class="sr-nav-wrap"
                        id="srNavWrap"
                    >

                        <nav
                            class="sr-nav"
                            aria-label="Main navigation"
                        >

                            ${links}

                        </nav>



                        <!-- ACTIONS -->

                        <div class="sr-header-actions">


                            <a
                                class="sr-btn sr-register-btn"
                                href="${CONFIG.registerHref}"
                                data-i18n="register"
                            >

                                ${translate("register")}

                            </a>


                            ${languageMarkup()}


                        </div>

                    </div>

                </div>

            </header>

        `;

    }



    /* =====================================================
       9. COMMON FOOTER
    ===================================================== */

    function footerMarkup() {

        const year = new Date().getFullYear();


        return `

            <footer
                class="sr-footer"
                id="srFooter"
            >

                <div class="sr-container sr-footer-main">


                    <!-- BRAND -->

                    <div class="sr-footer-brand-col">

                        <div class="sr-footer-brand">

                            ${brandMarkup()}

                        </div>


                        <p
                            class="sr-footer-description"
                            data-i18n="footerDescription"
                        >

                            ${translate("footerDescription")}

                        </p>

                        <div class="sr-social-links" aria-label="Social media">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">f</a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">◎</a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube">▶</a>
                        </div>

                        <p
                            class="sr-footer-title"
                            style="margin-top:18px"
                            data-i18n="zeroBrokerage"
                        >

                            ${translate("zeroBrokerage")}

                        </p>

                    </div>



                    <!-- EXPLORE -->

                    <div>

                        <h3
                            class="sr-footer-title"
                            data-i18n="explore"
                        >

                            ${translate("explore")}

                        </h3>


                        <div class="sr-footer-links">

                            <a href="index.html" data-i18n="home">
                                ${translate("home")}
                            </a>

                            <a href="buy.html" data-i18n="buyProperties">
                                ${translate("buyProperties")}
                            </a>

                            <a href="list-property.html" data-i18n="listProperty">
                                ${translate("listProperty")}
                            </a>

                            <a href="saved.html" data-i18n="savedProperties">
                                ${translate("savedProperties")}
                            </a>

                        </div>

                    </div>



                    <!-- SUPPORT -->

                    <div>

                        <h3
                            class="sr-footer-title"
                            data-i18n="support"
                        >

                            ${translate("support")}

                        </h3>


                        <div class="sr-footer-links">

                            <a href="about.html" data-i18n="aboutUs">
                                ${translate("aboutUs")}
                            </a>

                            <a href="contact.html" data-i18n="contactUs">
                                ${translate("contactUs")}
                            </a>

                            <a href="faq.html" data-i18n="faqs">
                                ${translate("faqs")}
                            </a>

                            <a href="privacy.html" data-i18n="privacyPolicy">
                                ${translate("privacyPolicy")}
                            </a>

                        </div>

                    </div>



                    <!-- NEWSLETTER -->

                    <div class="sr-footer-newsletter">

                        <h3
                            class="sr-footer-title"
                            data-i18n="stayConnected"
                        >

                            ${translate("stayConnected")}

                        </h3>


                        <p data-i18n="newsletterDescription">

                            ${translate("newsletterDescription")}

                        </p>


                        <form
                            class="sr-newsletter-form"
                            id="srNewsletterForm"
                        >

                            <label
                                class="sr-sr-only"
                                for="srNewsletterEmail"
                                data-i18n="emailAddress"
                            >

                                Email address

                            </label>


                            <input
                                id="srNewsletterEmail"
                                name="email"
                                type="email"
                                placeholder="${translate("emailPlaceholder")}"
                                autocomplete="email"
                                required
                                data-i18n-placeholder="emailPlaceholder"
                            >


                            <button
                                type="submit"
                                data-i18n="send"
                            >

                                ${translate("send")}

                            </button>

                        </form>



                        <!-- SUCCESS TOAST -->

                        <div
                            class="sr-footer-toast"
                            id="srFooterToast"
                            role="status"
                            aria-live="polite"
                            data-i18n="success"
                        >

                            ${translate("success")}

                        </div>

                    </div>


                </div>



                <!-- FOOTER BOTTOM -->

                <div class="sr-container sr-footer-bottom">

                    <span>

                        © ${year} ${CONFIG.brandName}
                        Real Estate.

                        <span data-i18n="rights">
                            ${translate("rights")}
                        </span>

                    </span>


                    <div class="sr-footer-legal">

                        <a href="privacy.html" data-i18n="privacyPolicy">
                            ${translate("privacyPolicy")}
                        </a>

                        <a href="terms.html" data-i18n="terms">
                            ${translate("terms")}
                        </a>

                    </div>

                </div>

            </footer>

        `;

    }



    /* =====================================================
       10. 3D BUILDING CONSTRUCTION PRELOADER
    ===================================================== */

    function loaderMarkup() {

        const windows = Array.from(

            { length: 12 },

            () => "<i></i>"

        ).join("");


        return `

            <div
                class="sr-preloader"
                id="srPreloader"
                role="status"
                aria-label="Loading website"
            >

                <div class="sr-loader-content">


                    <!-- LOADER BRAND -->

                    <div class="sr-loader-brand">

                        STACKLY

                        <span data-i18n="realEstate">
                            ${translate("realEstate")}
                        </span>

                    </div>



                    <!-- CONSTRUCTION SCENE -->

                    <div
                        class="sr-loader-scene"
                        aria-hidden="true"
                    >

                        <div class="sr-cityline"></div>

                        <div class="sr-ground"></div>



                        <!-- BUILDING -->

                        <div class="sr-building">

                            <div class="sr-building-side"></div>

                            <div class="sr-building-front"></div>

                            <div class="sr-building-roof"></div>

                            <div class="sr-building-windows">

                                ${windows}

                            </div>

                        </div>



                        <!-- YELLOW TOWER CRANE -->

                        <div class="sr-crane">

                            <div class="sr-crane-arm"></div>

                            <div class="sr-crane-cable">

                                <div class="sr-crane-hook"></div>

                            </div>

                        </div>

                    </div>



                    <!-- STATUS -->

                    <div
                        class="sr-loader-status"
                        data-i18n="loader"
                    >

                        ${translate("loader")}

                    </div>



                    <!-- PROGRESS -->

                    <div class="sr-loader-progress">

                        <span id="srLoaderBar"></span>

                    </div>



                    <div
                        class="sr-loader-percent"
                        id="srLoaderPercent"
                    >

                        0%

                    </div>


                </div>

            </div>

        `;

    }



    /* =====================================================
       11. LANGUAGE TRANSLATION ENGINE
    ===================================================== */

    function applyLanguage(language) {

        if (!TRANSLATIONS[language]) {

            language = "en";

        }


        currentLanguage = language;


        localStorage.setItem(

            CONFIG.languageStorageKey,

            language

        );


        document.documentElement.lang = language;


        /* Translate marked text */

        document.querySelectorAll("[data-i18n]").forEach(element => {

            const key = element.dataset.i18n;

            const value = translate(key);


            if (value) {
                const savedBadge = element.querySelector("#srSavedCount");
                if (savedBadge) {
                    element.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) node.textContent = "";
                    });
                    element.insertBefore(document.createTextNode(value + " "), savedBadge);
                } else {
                    element.textContent = value;
                }
            }

        });



        /* Translate placeholders */

        document.querySelectorAll(

            "[data-i18n-placeholder]"

        ).forEach(element => {

            const key = element.dataset.i18nPlaceholder;

            element.placeholder = translate(key);

        });



        /* Translate title attributes */

        document.querySelectorAll(

            "[data-i18n-title]"

        ).forEach(element => {

            element.title = translate(

                element.dataset.i18nTitle

            );

        });



        /* Translate accessibility labels */

        document.querySelectorAll(

            "[data-i18n-aria]"

        ).forEach(element => {

            element.setAttribute(

                "aria-label",

                translate(element.dataset.i18nAria)

            );

        });



        /* Update selector */

        const selector = $("#srLanguageSelect");

        if (selector) {
            selector.value = language;
        }

        const languageCode = $("#srLanguageCode");
        if (languageCode) {
            languageCode.textContent = language.toUpperCase();
        }



        document.dispatchEvent(

            new CustomEvent("stacklyLanguageChanged", {

                detail: {

                    language,

                    translations: TRANSLATIONS[language]

                }

            })

        );

    }



    /* =====================================================
       12. LANGUAGE SELECTOR EVENTS
    ===================================================== */

    function initLanguageSelector() {

        const selector = $("#srLanguageSelect");

        if (!selector) return;


        selector.addEventListener("change", event => {

            applyLanguage(event.target.value);

        });

    }



    /* =====================================================
       13. ACTIVE NAVIGATION
    ===================================================== */

    function setActiveLink() {

        const current = (

            location.pathname.split("/").pop() || "index.html"

        ).toLowerCase();


        document.querySelectorAll(".sr-nav-link").forEach(link => {

            const target = (

                link.getAttribute("href") || ""

            ).toLowerCase();


            const active = target === current;


            link.classList.toggle(

                "is-active",

                active

            );


            if (active) {

                link.setAttribute(

                    "aria-current",

                    "page"

                );

            } else {

                link.removeAttribute(

                    "aria-current"

                );

            }

        });

    }



    /* =====================================================
       14. MOBILE NAVIGATION
    ===================================================== */

    function initMenu() {

        const toggle = $("#srMenuToggle");

        const nav = $("#srNavWrap");


        if (!toggle || !nav) return;


        function closeMenu() {

            nav.classList.remove("is-open");


            toggle.setAttribute(

                "aria-expanded",

                "false"

            );


            toggle.setAttribute(

                "aria-label",

                "Open navigation"

            );


            document.body.classList.remove(

                "sr-menu-open"

            );

        }



        toggle.addEventListener("click", () => {

            const open = !nav.classList.contains(

                "is-open"

            );


            nav.classList.toggle(

                "is-open",

                open

            );


            toggle.setAttribute(

                "aria-expanded",

                String(open)

            );


            toggle.setAttribute(

                "aria-label",

                open ? "Close navigation" : "Open navigation"

            );


            document.body.classList.toggle(

                "sr-menu-open",

                open

            );

        });



        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener(

                "click",

                closeMenu

            );

        });



        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        });



        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        });

    }



    /* =====================================================
       15. HEADER SCROLL EFFECT
    ===================================================== */

    function initHeaderScroll() {

        const header = $("#srHeader");

        if (!header) return;


        const update = () => {

            header.classList.toggle(

                "is-scrolled",

                window.scrollY > 12

            );

        };


        update();


        window.addEventListener(

            "scroll",

            update,

            { passive: true }

        );

    }



    /* =====================================================
       16. FOOTER EMAIL VALIDATION + TOAST
    ===================================================== */

    function initNewsletter() {

        const form = $("#srNewsletterForm");

        const input = $("#srNewsletterEmail");

        const toast = $("#srFooterToast");


        if (!form || !input || !toast) return;


        let toastTimer;


        form.addEventListener("submit", event => {

            event.preventDefault();


            if (!input.checkValidity()) {

                input.reportValidity();

                return;

            }


            toast.textContent = translate("success");


            toast.classList.add("is-visible");


            input.value = "";


            window.clearTimeout(toastTimer);


            toastTimer = window.setTimeout(() => {

                toast.classList.remove("is-visible");

            }, 4500);

        });

    }



    /* =====================================================
       17. PRELOADER ANIMATION CONTROL

       Building completion is triggered before loader exit.
    ===================================================== */

    function initPreloader() {

        const loader = $("#srPreloader");

        const bar = $("#srLoaderBar");

        const percent = $("#srLoaderPercent");


        if (!loader || !bar || !percent) return;


        const reduced = window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches;


        const start = performance.now();


        const minTime = reduced

            ? 250

            : CONFIG.loaderMinimumMs;


        const maxTime = reduced

            ? 450

            : CONFIG.loaderMaximumMs;


        let progress = 0;

        let hidden = false;

        let constructionCompleted = false;



        function completeConstruction() {

            if (constructionCompleted) return;

            constructionCompleted = true;


            loader.classList.add(

                "is-building-complete"

            );


            loader.dispatchEvent(

                new CustomEvent("buildingComplete")

            );

        }



        function hideLoader() {

            if (hidden) return;

            hidden = true;


            completeConstruction();


            bar.style.width = "100%";

            percent.textContent = "100%";


            window.setTimeout(() => {

                loader.classList.add("is-hidden");


                document.body.classList.remove(

                    "sr-loading"

                );


                window.setTimeout(() => {

                    loader.remove();

                }, 650);

            }, 220);

        }



        function tick() {

            if (hidden) return;


            const elapsed = performance.now() - start;


            const timeProgress = Math.min(

                100,

                (elapsed / maxTime) * 100

            );


            const pageReady = document.readyState === "complete";


            const target = pageReady

                ? Math.min(

                    100,

                    (elapsed / minTime) * 100

                )

                : Math.min(

                    92,

                    timeProgress

                );


            progress = Math.max(

                progress,

                target

            );


            bar.style.width = `${progress}%`;


            percent.textContent =

                `${Math.floor(progress)}%`;



            /*
               Complete the building before the
               loader disappears.
            */

            if (progress >= 96 && pageReady) {

                completeConstruction();

            }



            if (

                pageReady &&

                elapsed >= minTime &&

                progress >= 96 &&

                constructionCompleted

            ) {

                hideLoader();

            }

            else if (elapsed >= maxTime && pageReady) {

                progress = 100;
                completeConstruction();
                hideLoader();

            }

            else {

                requestAnimationFrame(tick);

            }

        }



        document.body.classList.add("sr-loading");


        requestAnimationFrame(tick);



        window.addEventListener("load", () => {

            if (

                performance.now() - start >= minTime

            ) {

                hideLoader();

            }

        }, { once: true });

    }



    /* =====================================================
       18. INITIALIZE COMMON COMPONENTS
    ===================================================== */

    function updateSavedCount() {
        const badge = document.getElementById("srSavedCount");
        if (!badge) return;
        try {
            const ids = JSON.parse(localStorage.getItem("stacklyFavoriteProperties") || "[]");
            badge.textContent = Array.isArray(ids) ? ids.length : 0;
            badge.hidden = !ids || !ids.length;
        } catch (_) { badge.textContent = "0"; badge.hidden = true; }
    }

function mountSharedLayout() {


        /* HEADER */

        const headerMount = $("[data-sr-header]");

        const footerMount = $("[data-sr-footer]");


        if (headerMount) {

            headerMount.innerHTML = headerMarkup();

        }



        /* FOOTER */

        if (footerMount) {

            footerMount.innerHTML = footerMarkup();

        }



        /* PRELOADER */

        if (!$("#srPreloader")) {

            document.body.insertAdjacentHTML(

                "afterbegin",

                loaderMarkup()

            );

        }



        /* INITIALIZE FEATURES */

        setActiveLink();

        initMenu();

        initHeaderScroll();

        initLanguageSelector();

        initNewsletter();

        initPreloader();
        updateSavedCount();
        window.addEventListener("storage", updateSavedCount);
        window.addEventListener("stacklyFavoritesChanged", updateSavedCount);



        /* RESTORE SAVED LANGUAGE */

        applyLanguage(currentLanguage);

    }



    /* =====================================================
       19. DOM READY
    ===================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(

            "DOMContentLoaded",

            mountSharedLayout,

            { once: true }

        );

    } else {

        mountSharedLayout();

    }


/* =====================================================
   20. REGISTER PAGE TRANSLATIONS
===================================================== */

function registerPageTranslations(pageTranslations) {

    if (!pageTranslations || typeof pageTranslations !== "object") {
        return;
    }

    Object.keys(LANGUAGES).forEach((language) => {

        const pageDictionary = pageTranslations[language];

        if (!pageDictionary || typeof pageDictionary !== "object") {
            return;
        }

        Object.assign(TRANSLATIONS[language], pageDictionary);

    });

    applyLanguage(currentLanguage);

}


/* =====================================================
   21. GLOBAL LANGUAGE API
===================================================== */

window.StacklyLanguage = {

    set: applyLanguage,

    translate: translate,

    register: registerPageTranslations,

    getCurrent: () => currentLanguage,

    getLanguages: () => LANGUAGES,

    getTranslations: () => TRANSLATIONS

};
})();