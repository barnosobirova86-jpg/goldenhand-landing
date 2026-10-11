const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const mapSrc = (q, lang) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&hl=${lang}&output=embed`;

let lang = "ar";
try { lang = localStorage.getItem("lang") || "ar"; } catch {}
const t = k => T[lang][k];
const L = v => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v); // pick {ar,en}

const links = {
  tel: `tel:${SITE.phoneRaw}`,
  whatsapp: `https://wa.me/${SITE.whatsapp}`,
};
$$("[data-href]").forEach(el => (el.href = links[el.dataset.href]));
$("#year").textContent = new Date().getFullYear();
$("#burger").onclick = () => $("#burger").setAttribute("aria-expanded", $("#nav").classList.toggle("open"));
$$("#nav a").forEach(a => a.addEventListener("click", () => {
  $("#nav").classList.remove("open");
  $("#burger").setAttribute("aria-expanded", "false");
}));

/* ---------- Film picker ---------- */
const segSel = $("#segment"), prodSel = $("#product");
const current = () => PRODUCTS.find(p => p.id === prodSel.value) || PRODUCTS[0];
const warrantyText = p => `${p.warranty} ${t("years")}`;

function renderDetails() {
  const p = current();
  const rows = [
    [t("thickness"), `${p.micron} ${t("micron")}`],
    [t("warranty"), warrantyText(p)],
    [t("finish"), L(p.finish)],
    [t("feature"), L(p.feature)],
    [t("bestFor"), L(p.bestFor)],
  ];
  $("#details").innerHTML = rows.map(([k, v]) => `<div class="row"><span>${k}</span><span>${esc(v)}</span></div>`).join("");
}
segSel.onchange = prodSel.onchange = renderDetails;

$("#quoteBtn").onclick = () => {
  $("#quoteForm [name=date]").min = new Date().toLocaleDateString("en-CA"); // no past dates (YYYY-MM-DD)
  $("#quoteForm").hidden = false;
  $("#quoteForm").scrollIntoView({ behavior: "smooth", block: "center" });
  $("#quoteForm [name=name]").focus({ preventScroll: true });
};
$("#resetBtn").onclick = () => {
  segSel.selectedIndex = prodSel.selectedIndex = 0;
  $("#quoteForm").reset();
  $("#quoteForm").hidden = true;
  renderDetails();
};

/* No backend yet: the request opens WhatsApp with a ready-made message */
$("#quoteForm").addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const seg = SEGMENTS.find(s => s.id === segSel.value);
  const lines = [
    t("msgHead"),
    `${t("msgName")}: ${d.name}`,
    `${t("msgPhone")}: ${d.phone}`,
    `${t("msgCar")}: ${L(seg.name)}`,
    `${t("msgFilm")}: ${current().name}`,
    d.date && `${t("msgDate")}: ${d.date}`,
    d.note && `${t("msgNote")}: ${d.note}`,
  ].filter(Boolean);
  window.open(`${links.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
});

/* ---------- Authorized centers ---------- */
let order = CENTERS;

function renderCenters() {
  const q = $("#q").value.trim().toLowerCase();
  const city = $("#cityFilter").value;
  const list = order.filter(c =>
    (!city || L(c.city) === city) &&
    (!q || [c.name.ar, c.name.en, c.city.ar, c.city.en, c.address.ar, c.address.en].join(" ").toLowerCase().includes(q)));

  $("#list").innerHTML = list.length ? list.map(c => `
    <article class="center" data-code="${c.code}">
      <div class="center__top">
        <h3>${esc(L(c.name))}</h3>
        <span class="lvl lvl--${c.level}">${c.level}</span>
      </div>
      <p>📍 ${esc(L(c.address))}</p>
      <p>🕘 ${esc(L(c.hours))}</p>
      <p>☎ <span dir="ltr">${esc(c.phone)}</span>${c.dist != null ? ` · ${c.dist.toFixed(1)} ${t("km")}` : ""}</p>
      <div class="tags">${c.services.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
      <div class="center__actions">
        <a class="btn btn--accent btn--sm" href="tel:${c.phone.replace(/\s/g, "")}">${t("call")}</a>
        <a class="btn btn--outline btn--sm" target="_blank" rel="noopener" href="${c.mapUrl || `https://www.google.com/maps/dir/?api=1&destination=${c.coords}`}">${t("directions")}</a>
      </div>
    </article>`).join("") : `<p class="empty">${t("notFound")}</p>`;

  $$(".center").forEach(el => (el.onclick = e => {
    if (!e.target.closest("a")) selectCenter(el.dataset.code);
  }));
  if (list[0]) selectCenter(list[0].code);
}

function selectCenter(code) {
  const c = CENTERS.find(x => x.code === code);
  $$(".center").forEach(el => el.classList.toggle("active", el.dataset.code === code));
  const src = mapSrc(c.coords, lang);
  if ($("#map").src !== src) $("#map").src = src;
}

$("#q").addEventListener("input", renderCenters);
$("#cityFilter").addEventListener("input", renderCenters);

$("#nearBtn").onclick = () => {
  if (!navigator.geolocation) return alert(t("geoErr"));
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const rad = d => d * Math.PI / 180;
    CENTERS.forEach(c => {
      const [la, lo] = c.coords.split(",").map(Number);
      const a = Math.sin(rad(la - coords.latitude) / 2) ** 2 +
        Math.cos(rad(coords.latitude)) * Math.cos(rad(la)) * Math.sin(rad(lo - coords.longitude) / 2) ** 2;
      c.dist = 2 * 6371 * Math.asin(Math.sqrt(a));
    });
    order = [...CENTERS].sort((a, b) => a.dist - b.dist);
    renderCenters();
  }, () => alert(t("geoErr")));
};

/* ---------- Language ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  $("#langBtn").textContent = lang === "ar" ? "EN" : "عربي";
  $$("[data-i18n]").forEach(el => (el.textContent = t(el.dataset.i18n)));
  $$("[data-i18n-ph]").forEach(el => (el.placeholder = t(el.dataset.i18nPh)));
  $$("[data-site]").forEach(el => (el.textContent = L(SITE[el.dataset.site])));
  document.title = `${L(SITE.name)} — XPEL PPF`;

  const s = segSel.value, p = prodSel.value;
  segSel.innerHTML = SEGMENTS.map(x => `<option value="${x.id}">${esc(L(x.name))}</option>`).join("");
  prodSel.innerHTML = PRODUCTS.map(x => `<option value="${x.id}">${esc(x.name)}</option>`).join("");
  if (s) segSel.value = s;
  if (p) prodSel.value = p;
  renderDetails();

  $("#whyList").innerHTML = t("whyList").map(x => `<li>${esc(x)}</li>`).join("");
  $("#compareBody").innerHTML = PRODUCTS.map(p => `<tr>
    <td><b>${esc(p.name)}</b></td><td>${p.micron} ${t("micron")}</td><td>${warrantyText(p)}</td>
    <td>${esc(L(p.finish))}</td><td>${esc(L(p.feature))}</td><td>${esc(L(p.bestFor))}</td></tr>`).join("");

  const cities = [...new Set(CENTERS.map(c => L(c.city)))];
  $("#cityFilter").innerHTML = `<option value="">${t("allCities")}</option>` + cities.map(c => `<option>${esc(c)}</option>`).join("");
  renderCenters();
  $("#servicesGrid").innerHTML = SERVICES.map(x => `<article class="service">
    <div class="service__icon">${x.icon}</div><h3>${esc(L(x.name))}</h3><p>${esc(L(x.text))}</p></article>`).join("");
}

$("#langBtn").onclick = () => {
  lang = lang === "ar" ? "en" : "ar";
  try { localStorage.setItem("lang", lang); } catch {}
  applyLang();
};
applyLang();
