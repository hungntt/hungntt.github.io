// Renders cv.html and publications.html from index.html and assets/data/research-data.js.
// The page picks what to show with data-page on <main id="cv">: "cv" (default) or "publications".
(function () {
  "use strict";
  const DATA = window.RESEARCH_DATA || {};
  const root = document.getElementById("cv");
  const PAGE = root.dataset.page || "cv";
  const clean = (v) => (v == null ? "" : String(v).replace(/\s+/g, " ").trim());
  const esc = (s) => clean(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const txt = (el) => (el ? clean(el.textContent) : "");
  const norm = (s) => clean(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  const ME = (DATA.me || []).map((n) => norm(n.replace(/\*/g, "")));
  const isMe = (a) => ME.includes(norm(a.replace(/\*/g, "")));
  // CV-only name parts for compound surnames and names supplied surname-first.
  const AUTHOR_PARTS = new Map([
    ["seyed alireza rahimi azghadi", { given: "Seyed Alireza", family: "Rahimi Azghadi" }],
    ["matsuba hiroya", { given: "Hiroya", family: "Matsuba" }],
    ["nguyen truong thanh hung", { given: "Truong Thanh Hung", family: "Nguyen" }]
  ]);
  function authorInitials(name, self = isMe(name)) {
    const full = clean(name);
    const suffix = (full.match(/\*+$/) || [""])[0];
    const bare = full.replace(/\*+$/, "").trim();
    if (self) return "T. T. H. Nguyen" + suffix;
    const words = bare.split(/\s+/);
    if (words.length < 2) return bare + suffix;
    const parts = AUTHOR_PARTS.get(norm(bare)) || { given: words.slice(0, -1).join(" "), family: words[words.length - 1] };
    const initials = parts.given.split(/\s+/).map((word) => word.split("-").map((part) => {
      const first = part.match(/\p{L}/u)?.[0];
      return first ? first.toUpperCase() + "." : "";
    }).filter(Boolean).join("-")).join(" ");
    return initials + " " + parts.family + suffix;
  }
  function authorsHTML(values) {
    const authors = (Array.isArray(values) ? values : [values]).filter(Boolean).map(String);
    const nameKey = (name) => norm(name.replace(/\*/g, ""));
    // When a full self-name is present, "Hung Nguyen" identifies another coauthor.
    const hasFullSelfName = authors.some((name) => isMe(name) && nameKey(name) !== "hung nguyen");
    return authors.map((name) => {
      const self = isMe(name) && !(hasFullSelfName && nameKey(name) === "hung nguyen");
      const label = esc(authorInitials(name, self));
      return self ? '<span class="me">' + label + "</span>" : label;
    }).join(", ");
  }
  const HOMEPAGE = { label: "Homepage", value: "hungntt.github.io", href: "https://hungntt.github.io/" };
  const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const safeUrl = (u) => /^(https?:|mailto:)/i.test(clean(u));
  const link = (href, inner) => (safeUrl(href) ? '<a href="' + esc(href) + '">' + inner + "</a>" : inner);

  // text of an element without the parts that are only for screen readers or captions
  function textWithout(el, sel) {
    if (!el) return "";
    const c = el.cloneNode(true);
    c.querySelectorAll(sel).forEach((x) => x.remove());
    return clean(c.textContent);
  }
  // escaped text of an element, keeping its links (e.g. supervisors' pages) as links
  function richText(el) {
    if (!el) return "";
    return clean(Array.from(el.childNodes).map((n) => n.nodeType === 3 ? n.textContent.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])
      : n.nodeType !== 1 ? "" : n.tagName === "A" ? link(n.getAttribute("href"), richText(n)) : richText(n)).join(""));
  }
  const bracketless = (s) => clean(s).replace(/^\[\s*|\s*\]$/g, "");
  // "GERMANY · VIETNAM" -> "Germany · Vietnam"; short acronyms such as UNB or FAU stay as they are
  const titleCase = (s) => s.replace(/\p{L}+/gu, (w) => (w.length <= 3 ? w : w[0] + w.slice(1).toLowerCase()));

  /* ---------------------------------------------------- homepage content */
  function fromHomepage(doc) {
    const q = (s) => doc.querySelector(s);
    const qa = (s, r) => Array.from((r || doc).querySelectorAll(s));
    const lines = (el) => (el ? el.innerHTML.split(/<br\s*\/?>/i).map((h) => { const d = doc.createElement("div"); d.innerHTML = h; return clean(d.textContent); }).filter(Boolean) : []);

    const logEntry = (li) => {
      const d = bracketless(txt(li.querySelector(".d")));
      let title = txt(li.querySelector(".deg")), org = txt(li.querySelector(".uni"));
      if (!title) {
        // plain "Title — Organisation" lines (e.g. guest lectures)
        const parts = textWithout(li.querySelector(".w"), ".cap,.uni,.sr-only").split(" — ");
        title = parts.shift(); if (!org) org = parts.join(" — ");
      }
      return {
        when: /\d/.test(d) ? d : "",          // labels such as [TA] or [GUEST] are not dates
        title, org,
        major: txt(li.querySelector(".maj")),
        cert: li.querySelector("a.cert")?.getAttribute("href") || "",   // certificate image linked next to the title
        cap: qa(".cap", li).filter((c) => !c.closest(".thesis")).map(richText),
        thesis: qa(".thesis .cap", li).map(richText),
        where: titleCase(bracketless(textWithout(li.querySelector(".st"), ".sr-only"))),
        now: !!li.querySelector(".st.run")      // shown on the homepage with a blinking "running" dot
      };
    };
    const logGroups = (sec) => qa("ul.log", sec).map((ul) => {
      let h = ul.previousElementSibling;
      while (h && h.tagName !== "H3") h = h.previousElementSibling;
      return { heading: txt(h), items: qa(":scope > li", ul).map(logEntry) };
    });

    const edu = logGroups(q("#education"));
    return {
      name: lines(q("#hero-name")).join(" "),
      role: txt(q(".hero-role")),
      aff: lines(q(".hero-aff")),
      bio: qa("#about .bio p").map(richText).filter(Boolean),
      // the CV lists the personal homepage (right after email) instead of the lab page
      contacts: qa("#contact .link-tile").map((a) => ({ label: txt(a.querySelector("b")), value: txt(a.querySelector("small")), href: a.getAttribute("href") }))
        .filter((c) => !/aelab/i.test(c.label))
        .reduce((out, c, i) => (i === 0 ? [c, HOMEPAGE] : out.concat(c)), []),
      education: edu[0] ? edu[0].items : [],
      positions: edu.slice(1).flatMap((g) => g.items),
      teaching: logGroups(q("#teaching")).map((g) => ({
        ...g,
        items: g.items.map((e) => {
          const course = (DATA.cv?.taCourses || []).find((c) => c.title === e.title);
          if (g.heading === "Teaching assistant" && course) return { ...e, title: course.code + ": " + course.title, when: course.years };
          if (e.title === "Diploma of University Teaching" && DATA.cv?.teachingIssuer) return { ...e, org: DATA.cv.teachingIssuer };
          return e;
        })
      }))
    };
  }

  /* -------------------------------------------------------------- render */
  function entryHTML(e) {
    const when = e.when.replace(/\s*[-–]\s*/g, " – ").replace(/\bnow\b/i, "Present");
    return '<li class="entry' + (e.now ? " now" : "") + '"><div class="l"><span class="t">' + esc(e.title) + (e.major ? ' <span class="maj">' + esc(e.major) + "</span>" : "") +
      (safeUrl(e.cert) ? '<a class="lk" href="' + esc(e.cert) + '"><span class="ico">' + pixelSVG("doc") + "</span>Diploma</a>" : "") + "</span>" +
      (e.org ? '<span class="sub">' + esc(e.org) + "</span>" : "") +
      e.cap.map((c) => '<span class="cap">' + c + "</span>").join("") +
      (e.thesis.length ? '<span class="thesis-block">' + e.thesis.map((c, i) => '<span class="cap' + (i === 0 ? " thesis-title" : "") + '">' + c + "</span>").join("") + "</span>" : "") + "</div>" +
      '<div class="r">' + (when ? '<span class="when">' + esc(when) + "</span>" : "") + (e.where ? '<span class="where">' + esc(e.where) + "</span>" : "") + "</div></li>";
  }

  const PUB_GROUPS = [
    ["chapter", "Book Chapters", "B"], ["journal", "Journal Articles", "J"], ["conference", "Conference Papers", "C"],
    ["challenge", "Challenge Papers", "CH"], ["workshop", "Workshop Papers", "W"], ["report", "Technical Reports", "R"],
    ["preprint", "Preprints", "P"], ["thesis", "Theses", "T"]
  ];
  // `cvType` files a paper under another group here only (e.g. a preprint under review at a journal)
  const cvType = (p) => (clean(p.cvType) || clean(p.type)).toLowerCase();

  // the homepage's pixel icons for paper/code/video links (same art as index.html)
  const PAL = { k: "#0a0a0a", w: "#ffffff", s: "#d7d7d7", g: "#8b8b8b", n: "#0b3c7d", c: "#6ed9ff", b: "#168dda", e: "#7ee89a" };
  const ICONS = {
    doc: ["..kkkkkkkkk.....", "..kwwwwwwwkk....", "..kwwwwwwwkwk...", "..kwnnnnwwkkkk..", "..kwwwwwwwwwwk..", "..kwnnnnnnnnwk..", "..kwwwwwwwwwwk..", "..kwnnnnnnnwwk..",
      "..kwwwwwwwwwwk..", "..kwnnnnnnnnwk..", "..kwwwwwwwwwwk..", "..kwnnnnnwwwwk..", "..kwwwwwwwwwwk..", "..kwwwwwwwwwwk..", "..kkkkkkkkkkkk.."],
    chip: ["................", "....k.k.k.k.....", "....k.k.k.k.....", "..kkkkkkkkkkk...", "..knnnnnnnnnk...", "kkkncccccnnnkkk.", "..kncwwwcnnnk...", "kkkncwwwcnnnkkk.",
      "..kncccccnnnk...", "kkknnnnnnnnnkkk.", "..knnnnnnnnnk...", "..kkkkkkkkkkk...", "....k.k.k.k.....", "....k.k.k.k....."],
    globe: ["................", ".....kkkkkk.....", "...kkbbccbbkk...", "..kbbeebbbbcbk..", ".kbeeeebbbbbbbk.", ".kbeeeeebbbeebk.", "kbbbeeebbbeeeebk", "kbbbbeebbbbeeebk",
      "kbbbbbbbbbbeebbk", "kbbbbbbeebbbbbbk", ".kbbbbeeeebbbbk.", ".kbbbbbeeebbbbk.", "..kbbbbbebbbbk..", "...kkbbbbbbkk...", ".....kkkkkk....."],
    monitor: ["................", ".kkkkkkkkkkkkkk.", ".kssssssssssssk.", ".ksnnnnnnnnnnsk.", ".ksnncnnnnnnnsk.", ".ksnnnnnnbnnnsk.", ".ksnnnnnbcbnnsk.", ".ksnnnnnnbnnnsk.",
      ".ksnncnnnnnnnsk.", ".ksnnnnnnnncnsk.", ".ksssssssssssgk.", ".kkkkkkkkkkkkkk.", "......kssk......", "....kkkkkkkk....", "....kssssssk....", "....kkkkkkkk...."]
  };
  function pixelSVG(name) {
    let rects = "";
    (ICONS[name] || []).forEach((row, y) => {
      for (let x = 0; x < row.length;) {
        const ch = row[x];
        if (!PAL[ch]) { x++; continue; }
        let run = 1;
        while (row[x + run] === ch) run++;
        rects += '<rect x="' + x + '" y="' + y + '" width="' + run + '" height="1" fill="' + PAL[ch] + '"/>';
        x += run;
      }
    });
    return '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + rects + "</svg>";
  }
  const LINK_LABEL = { paper: "Paper", pdf: "PDF", arxiv: "arXiv", doi: "DOI", code: "Code", slides: "Slides", video: "Video", poster: "Poster", project: "Project", bibtex: "BibTeX" };
  function linksHTML(L) {
    // a DOI is the paper's canonical link: it takes the "Paper" button instead of showing both
    L = { ...L };
    if (safeUrl(L.doi)) { L.paper = L.doi; delete L.doi; }
    const keys = Object.keys(LINK_LABEL).concat(Object.keys(L).filter((k) => !LINK_LABEL[k]));
    return keys.filter((k) => safeUrl(L[k])).map((k) => {
      const icon = k === "code" ? "chip" : k === "video" || k === "slides" ? "monitor" : "doc";
      return '<a class="lk" href="' + esc(L[k]) + '"><span class="ico">' + pixelSVG(icon) + "</span>" + esc(LINK_LABEL[k] || k) + "</a>";
    }).join("");
  }
  function pubHTML(p, n) {
    const authors = authorsHTML(p.authors);
    const L = p.links || {};
    const url = [L.doi, L.paper, L.pdf, L.arxiv].map(clean).find(safeUrl);
    const links = linksHTML(L);
    const t = p.tags || {};
    const tags = [];
    if (clean(p.award)) tags.push('<span class="tag award">★ ' + esc(p.award) + "</span>");
    if (clean(t.core)) tags.push('<span class="tag rank">CORE ' + esc(t.core) + "</span>");
    if (clean(t.quartile)) { const src = clean(t.quartileSource).split(/\s+/)[0]; tags.push('<span class="tag rank">' + (/^(sjr|jcr)$/i.test(src) ? esc(src.toUpperCase()) + " " : "") + esc(clean(t.quartile).toUpperCase()) + "</span>"); }
    if (clean(t.impact)) tags.push('<span class="tag rank">' + esc(/^\d+(\.\d+)?$/.test(clean(t.impact)) ? "IF " + clean(t.impact) : t.impact) + "</span>");
    (Array.isArray(t.extra) ? t.extra : [t.extra]).map(clean).filter(Boolean).forEach((x) => tags.push('<span class="tag">' + esc(x) + "</span>"));
    const venue = clean(p.venue) || clean(p.short);
    const shortTag = clean(p.short) && clean(p.venue) && !clean(p.venue).includes(clean(p.short)) ? " (" + esc(p.short) + ")" : "";
    // three lines: title / authors / venue, year and tags
    return '<li class="pub"><span class="n">[' + n + ']</span><span class="pb">' +
      '<span class="ttl">' + link(url, esc(p.title)) + (links ? ' <span class="lks">' + links + "</span>" : "") + "</span>" +
      '<span class="au">' + authors + "</span>" +
      '<span class="meta">' + (venue ? '<span class="ven">' + esc(venue) + "</span>" + shortTag + ", " : "") + esc(p.year) +
      (tags.length ? ' <span class="tags">' + tags.join("") + "</span>" : "") + "</span>" +
      (/under review|submitted/i.test(clean(p.note)) ? '<span class="note">' + esc(clean(p.note)) + "</span>" : "") + "</span></li>";
  }
  function pubGroups() {
    const pubs = (DATA.publications || []).filter((p) => clean(p.title));
    const key = (p) => (parseInt(p.year, 10) || 0) * 100 + (MONTHS.indexOf(clean(p.month).slice(0, 3).toLowerCase()) + 1);
    const known = PUB_GROUPS.map((g) => g[0]);
    return PUB_GROUPS.concat([["other", "Other", "O"]]).map(([type, label, pre]) => ({
      label, pre,
      items: pubs.filter((p) => (type === "other" ? !known.includes(cvType(p)) : cvType(p) === type))
        .sort((a, b) => key(b) - key(a))
    })).filter((g) => g.items.length);
  }
  const pubListHTML = (g) => '<ol class="pubs">' + g.items.map((p, i) => pubHTML(p, g.pre + (g.items.length - i))).join("") + "</ol>";
  const publicationsHTML = () => pubGroups().map((g) => "<h3>" + esc(g.label) + "</h3>" + pubListHTML(g)).join("");

  // each artifact names the start of its paper's title; the paper supplies the venue and link
  const ARTIFACT_LINKS = { code: ["Code", "chip"], demo: ["Demo", "monitor"], benchmark: ["Benchmark", "doc"], webpage: ["Webpage", "globe"], dataset: ["Dataset", "doc"] };
  function toolHTML(a) {
    const L = a.links || {};
    const paper = clean(a.paper) && (DATA.publications || []).find((p) => clean(p.title).toLowerCase().startsWith(clean(a.paper).toLowerCase()));
    let ven = "";
    if (paper) {
      const PL = paper.links || {};
      // journals read better in full ("Information Fusion"); conferences by their short name
      const label = (clean(paper.type) === "journal" && clean(paper.venue)) || clean(paper.short) || clean(paper.venue);
      ven = " Published in " + link([PL.doi, PL.paper, PL.pdf, PL.arxiv].map(clean).find(safeUrl),
        '<span class="ven">' + esc(label + (label.includes(String(paper.year)) ? "" : " " + paper.year)) + "</span>") + ".";
    }
    const keys = Object.keys(ARTIFACT_LINKS).concat(Object.keys(L).filter((k) => !ARTIFACT_LINKS[k]));
    const links = keys.filter((k) => safeUrl(L[k])).map((k) => {
      const [label, icon] = ARTIFACT_LINKS[k] || [k, "doc"];
      return '<a class="lk" href="' + esc(L[k]) + '"><span class="ico">' + pixelSVG(icon) + "</span>" + esc(label) + "</a>";
    }).join("");
    return '<li class="tool"><span class="nm">' + esc(a.name) + "</span> — " + esc(a.summary) + "." + ven +
      (links ? ' <span class="lks">' + links + "</span>" : "") + "</li>";
  }
  function artifactsHTML(list) {
    const isProto = (a) => clean(a.kind).toLowerCase() === "prototype";
    return [["Selected Open-Source Software, Public Code &amp; Research Demos", list.filter((a) => !isProto(a))], ["Other Prototypes &amp; Research Artifacts", list.filter(isProto)]]
      .filter(([, items]) => items.length)
      .map(([label, items]) => "<h3>" + label + '</h3><ul class="tools">' + items.map(toolHTML).join("") + "</ul>").join("");
  }

  function ipHTML(ip) {
    return '<ul class="rows">' + ip.map((r) => {
      const authors = authorsHTML(r.authors);
      const detail = [clean(r.kind) && clean(r.kind) + (clean(r.number) ? " No. " + clean(r.number) : ""), clean(r.issuer), clean(r.date)].filter(Boolean);
      return '<li class="row"><span class="y">' + esc(r.year) + "</span><span><b>" + link(r.url, esc(r.title)) + "</b>" +
        (detail.length ? ' — <span class="e">' + esc(detail.join(", ")) + "</span>" : "") +
        (authors ? '<span class="au">' + authors + "</span>" : "") + "</span></li>";
    }).join("") + "</ul>";
  }

  function render(H) {
    let h = '<header class="head"><div><h1>' + esc(H.name) + "</h1>" +
      (H.role ? '<p class="role">' + esc(H.role) + "</p>" : "") +
      H.aff.map((a) => '<p class="aff">' + esc(a) + "</p>").join("") + "</div>" +
      '<ul class="contact">' + H.contacts.map((c) => "<li><b>" + esc(c.label) + ":</b> " + link(c.href, esc(c.value)) + "</li>").join("") + "</ul></header>";

    // every section: a title button that shows/hides its body (screen only; the PDF always prints expanded)
    let n = 0;
    const sec = (title, count, body) => {
      const id = "sec-" + (++n);
      return '<section class="sec"><h2><button type="button" class="tog" aria-expanded="true" aria-controls="' + id + '">' +
        "<span>" + title + "</span>" + (count ? '<span class="more">' + count + " hidden</span>" : "") + '<span class="chev" aria-hidden="true"></span></button></h2>' +
        '<div class="body" id="' + id + '">' + body + "</div></section>";
    };
    const show = (doc) => {
      root.innerHTML = h;
      const title = H.name + " · " + doc;
      document.documentElement.style.setProperty("--cv-title", JSON.stringify(title));
      document.title = title;
    };

    const ip = DATA.intellectualProperty || [];
    // the publication list: the CV's publications, one section per type, then patents and copyrights
    if (PAGE === "publications") {
      h += pubGroups().map((g) => sec(esc(g.label), g.items.length, pubListHTML(g))).join("");
      if (ip.length) h += sec("Patents &amp; Copyrights", ip.length, ipHTML(ip));
      return show("Publications");
    }

    const interests = (DATA.interests || []).map((it) => clean(it.name)).filter(Boolean);
    const awards = DATA.awards || [];
    const service = DATA.service || [];
    const svcGroups = [];
    // a journal's publisher follows its name
    const svcItem = (s) => clean(s.venue) + (clean(s.publisher) ? " (" + clean(s.publisher) + ")" : "");
    service.forEach((s) => { const g = svcGroups.find((x) => x.role === clean(s.role)); g ? g.items.push(svcItem(s)) : svcGroups.push({ role: clean(s.role), items: [svcItem(s)] }); });

    const nPubs = (DATA.publications || []).length;
    const profile = clean(DATA.cv?.profile);
    if (profile || H.bio.length) h += sec("Profile", "", '<p class="summary">' + (profile ? esc(profile) : H.bio[0]) + "</p>");
    if (interests.length) h += sec("Research Interests", "", "<p>" + esc(interests.join(" · ")) + "</p>");
    if (H.education.length) h += sec("Education", H.education.length, '<ul class="entries">' + H.education.map(entryHTML).join("") + "</ul>");
    if (H.positions.length) h += sec("Research &amp; Professional Experience", H.positions.length, '<ul class="entries">' + H.positions.map(entryHTML).join("") + "</ul>");
    if (awards.length) h += sec("Honors, Awards &amp; Scholarships", awards.length, '<ul class="rows">' + awards.map((a) =>
      '<li class="row"><span class="y">' + esc(a.year) + "</span><span><b>" + esc(a.title) + "</b>" + (clean(a.event) ? ' — <span class="e">' + esc(a.event) + "</span>" : "") +
      (clean(a.prize) ? '<span class="tag prize">' + esc(a.prize) + "</span>" : "") + "</span></li>").join("") + "</ul>");
    if (nPubs) h += sec("Publications", nPubs, publicationsHTML());
    const artifacts = (DATA.artifacts || []).filter((a) => clean(a.name));
    if (artifacts.length) h += sec("Knowledge Mobilization &amp; Technology Transfer", artifacts.length,
      '<p class="intro">Publicly available code, demos and benchmarks released with peer-reviewed publications to support reproducibility, transparency and research translation.</p>' + artifactsHTML(artifacts));
    if (ip.length) h += sec("Patents &amp; Copyrights", ip.length, ipHTML(ip));
    if (H.teaching.length) h += sec("Teaching Experience", H.teaching.reduce((t, g) => t + g.items.length, 0), H.teaching.map((g) =>
      (g.heading ? "<h3>" + esc(g.heading) + "</h3>" : "") + '<ul class="entries">' + g.items.map(entryHTML).join("") + "</ul>").join(""));
    const mentorship = DATA.mentorship || [];
    // a student is a name, or { name, affiliation, achievements: [] }
    const students = (m) => (m.students || []).map((s) => (typeof s === "string" ? { name: s } : s || {})).filter((s) => clean(s.name));
    // one sub-heading per level with its count, then a bullet per student
    if (mentorship.length) h += sec("Student Mentorship", "", mentorship.map((m) => {
      const list = students(m);
      return "<h3>" + esc(m.level) + " (" + esc(list.length || m.count) + ")</h3>" + (list.length ? '<ul class="tools">' + list.map((s) => {
        const ach = (s.achievements || []).map(clean).filter(Boolean);
        return '<li class="tool"><span class="nm">' + esc(s.name) + "</span>" + (clean(s.affiliation) ? ', <span class="af">' + esc(s.affiliation) + "</span>" : "") +
          (ach.length ? ' — <span class="ach">' + esc(ach.join("; ")) + "</span>" : "") + "</li>";
      }).join("") + "</ul>" : "");
    }).join(""));
    if (svcGroups.length) h += sec("Academic Service", service.length, svcGroups.map((g) =>
      "<h3>" + esc(g.role) + '</h3><ul class="tools">' + g.items.map((v) => '<li class="tool">' + esc(v) + "</li>").join("") + "</ul>").join(""));
    const skills = (DATA.skills || []).filter((g) => clean(g.area));
    if (skills.length) h += sec("Technical Skills", "", '<ul class="tools">' + skills.map((g) =>
      '<li class="tool"><span class="nm">' + esc(g.area) + ":</span> " + esc((g.items || []).map(clean).filter(Boolean).join(", ")) + "</li>").join("") + "</ul>");
    const languages = DATA.languages || [];
    if (languages.length) h += sec("Languages", "", "<p>" + languages.map((l) => esc(l.name) + " (" + esc(l.level) + ")").join(" · ") + "</p>");
    const references = DATA.references || [];
    if (references.length) h += sec("References", "", references.map((r, i) => {
      const details = [
        ["Position", esc(r.position)], ["Address", esc(r.address)],
        ["Email", link("mailto:" + r.email, esc(r.email))], ["Phone", esc(r.phone)],
        ["Relationship", esc(r.relationship)]
      ];
      return '<article class="reference"><h3>' + (i + 1) + ". " + link(r.url, esc(r.name)) + "</h3><dl>" +
        details.map(([label, value]) => "<dt>" + label + "</dt><dd>" + value + "</dd>").join("") + "</dl></article>";
    }).join(""));

    show("CV");
  }

  /* ------------------------------------------------------ collapse/expand */
  const allBtn = document.getElementById("toggle-all");
  function setOpen(secEl, open) {
    secEl.classList.toggle("collapsed", !open);
    secEl.querySelector(".tog").setAttribute("aria-expanded", String(open));
  }
  function syncAll() {
    const secs = Array.from(root.querySelectorAll(".sec"));
    const allClosed = secs.length && secs.every((x) => x.classList.contains("collapsed"));
    allBtn.textContent = allClosed ? "Expand all" : "Collapse all";
    allBtn.setAttribute("aria-pressed", String(allClosed));
  }
  root.addEventListener("click", (e) => {
    const b = e.target.closest(".tog"); if (!b) return;
    const secEl = b.closest(".sec");
    setOpen(secEl, secEl.classList.contains("collapsed"));
    syncAll();
  });
  allBtn.addEventListener("click", () => {
    const open = allBtn.getAttribute("aria-pressed") === "true";
    root.querySelectorAll(".sec").forEach((x) => setOpen(x, open));
    syncAll();
  });

  fetch("index.html", { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then((html) => render(fromHomepage(new DOMParser().parseFromString(html, "text/html"))))
    .then(() => { void root.offsetHeight; return document.fonts ? document.fonts.ready : null; })
    .then(() => { document.documentElement.setAttribute("data-cv-ready", "1"); })
    .catch((err) => {
      root.innerHTML = '<p class="msg">Could not read the homepage (' + esc(err.message) + ").<br>" +
        (location.protocol === "file:" ? "Open this page through a web server, e.g. run <code>python3 -m http.server</code> in the site folder and visit http://localhost:8000/cv.html." : "") + "</p>";
      document.documentElement.setAttribute("data-cv-ready", "error");
    });
})();
