/* =========================================================
   SITE DATA — edit only this file.
   Text fields are { ar: "...", en: "..." }.
   [TODO] = still waiting for the real value.
   ========================================================= */

const SITE = {
  name: { ar: "اليد الذهبية للعناية بالسيارات", en: "Golden Hand" },
  logo: "logo.png",
  phone: "+218 94 0111 555",
  phoneRaw: "+218940111555",
  whatsapp: "218940111555",
  address: { ar: "بنغازي، حي السندباد، شارع السندباد، بجوار منتجع الماسة", en: "Benghazi, Al-Sindbad district, Al-Sindbad St., next to Al-Masa Resort" },
  hours: { ar: "السبت–الخميس 09:00–21:00", en: "Sat–Thu 09:00–21:00" },
  mapUrl: "https://maps.app.goo.gl/cKkkZqKyopALpqBBA",
};

/* Vehicle classes */
const SEGMENTS = [
  { id: "ab",      name: { ar: "سيارة صغيرة (فئة A / B)", en: "Small car (A / B segment)" } },
  { id: "c",       name: { ar: "سيدان متوسطة (فئة C)",   en: "Mid-size sedan (C segment)" } },
  { id: "d",       name: { ar: "سيدان كبيرة (فئة D)",    en: "Large sedan (D segment)" } },
  { id: "suv",     name: { ar: "SUV",                    en: "SUV" } },
  { id: "premium", name: { ar: "SUV فاخرة",              en: "Premium SUV" } },
];

/* XPEL PPF products */
const PRODUCTS = [
  {
    id: "fusion",
    name: "XPEL Ultimate Fusion",
    micron: 200, warranty: 10,
    finish:  { ar: "لامع", en: "Gloss" },
    feature: { ar: "حماية PPF + طبقة علوية طاردة للماء", en: "PPF protection + hydrophobic top coat" },
    bestFor: { ar: "لمن يريد سهولة العناية ولمعاناً فاخراً", en: "Easy maintenance and premium gloss" },
  },
  {
    id: "plus",
    name: "XPEL Ultimate Plus",
    micron: 200, warranty: 10,
    finish:  { ar: "شفاف / لامع", en: "Clear / gloss" },
    feature: { ar: "فيلم فاخر يحافظ على مظهر الطلاء الأصلي", en: "Premium PPF focused on preserving the original paint look" },
    bestFor: { ar: "لمن يريد حماية شفافة وقوية", en: "Clear, strong protection" },
  },
  {
    id: "stealth",
    name: "XPEL Stealth",
    micron: 200, warranty: 10,
    finish:  { ar: "ساتان / مطفي", en: "Satin / matte" },
    feature: { ar: "يحوّل الطلاء اللامع إلى مظهر ساتان", en: "Turns gloss paint into a satin finish" },
    bestFor: { ar: "لمن يريد تغيير المظهر مع الحماية", en: "A new look plus protection" },
  },
  {
    id: "exo",
    name: "XPEL Exo Armor",
    micron: 175, warranty: 7,
    finish:  { ar: "شفاف", en: "Clear" },
    feature: { ar: "مستوى حماية متوازن", en: "Balanced level of protection" },
    bestFor: { ar: "لمن يبحث عن توازن السعر والأداء", en: "Best price / performance balance" },
  },
  {
    id: "xtreme",
    name: "XPEL Xtreme",
    micron: 190, warranty: 5,
    finish:  { ar: "شفاف", en: "Clear" },
    feature: { ar: "الخيار الأكثر اقتصادية", en: "The more affordable option" },
    bestFor: { ar: "لمن يريد التحكم في الميزانية", en: "Keeping the budget under control" },
  },
];

/* Services */
const SERVICES = [
  { id: "ppf",     icon: "🛡️", name: { ar: "أفلام حماية الطلاء PPF", en: "Paint Protection Film (PPF)" }, text: { ar: "حماية الطلاء من الحصى والخدوش مع أفلام XPEL الأصلية.", en: "Protect paint from stone chips and scratches with genuine XPEL film." } },
  { id: "pdr",     icon: "🔧", name: { ar: "إصلاح الصدمات بدون طلاء PDR", en: "Paintless Dent Repair (PDR)" }, text: { ar: "إزالة الصدمات والانبعاجات مع الحفاظ على الطلاء الأصلي.", en: "Remove dents while keeping the factory paint intact." } },
  { id: "ceramic", icon: "💎", name: { ar: "نانو سيراميك", en: "Nano Ceramic" }, text: { ar: "طبقة سيراميك تمنح لمعاناً عميقاً وتطرد الماء والأوساخ.", en: "A ceramic layer for deep gloss that repels water and dirt." } },
  { id: "polish",  icon: "✨", name: { ar: "تلميع", en: "Polish" }, text: { ar: "تلميع احترافي يزيل الخدوش الدقيقة ويعيد لمعان السيارة.", en: "Professional polishing that removes swirls and restores shine." } },
];

/* Authorized centers.
   coords: "lat,lng" from Google Maps (right-click on the pin → copy coordinates) */
const CENTERS = [
  {
    code: "golden-hand",
    name: SITE.name,
    city: { ar: "بنغازي", en: "Benghazi" },
    address: SITE.address,
    phone: SITE.phone,
    hours: SITE.hours,
    services: ["PPF", "PDR", "Nano Ceramic", "Polish"],
    level: "Authorized",                // Platinum | Gold | Authorized
    coords: "32.0724455,20.139975",
    mapUrl: SITE.mapUrl,
  },
];
