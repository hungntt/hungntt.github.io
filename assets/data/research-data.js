/* ============================================================================
   research-data.js  —  the content database behind index.html
   ============================================================================
   The Publications, Honors & Awards and Academic Services sections are all
   generated from this file. Edit, save, refresh. The page handles sorting,
   year grouping, counts, search, and the filter dropdowns by itself.

   ── ADD A PAPER ─────────────────────────────────────────────────────────────
   1. Copy the TEMPLATE below.
   2. Paste it anywhere inside `publications: [ ... ]` (order doesn't matter).
   3. Fill in what you know. Leave the rest as "" or delete the line.
   4. Keep a comma between entries:  { ... },  { ... },

   ── TEMPLATE ────────────────────────────────────────────────────────────────
     {
       title:   "",
       authors: ["", "Truong Thanh Hung Nguyen"],
       venue:   "",                 // full name
       short:   "",                 // e.g. "ACML 2023"
       year:    2025,               // number, no quotes
       month:   "",                 // "Nov" (orders papers inside a year)
       type:    "conference",       // see TYPES
       topics:  ["xai"],            // research-interest ids (see INTERESTS below)
       tags:    { core: "", coreYear: "", quartile: "", quartileSource: "", impact: "", extra: [] },
       award:   "",
       note:    "",
       links:   { paper: "", code: "" }
     },

   ── FIELDS ──────────────────────────────────────────────────────────────────
     title     required.
     authors   required. Your name (see `me` below) is bolded automatically.
               Add * after a name for equal contribution:  "Jane Doe*"
     year      required. A number: 2024
     type      "conference" | "journal" | "workshop" | "preprint" | "chapter" | "thesis"
     topics    Research-interest ids, e.g. ["xai", "cv"]. Each one shows as a
               dark chip on the paper, and the paper appears when a visitor
               clicks that interest's tile in the Bio section (or picks it in
               the "Research interest" filter). Ids come from `interests` below.
     award     Any text, e.g. "Best Paper Runner-up". Shows a gold ★ chip and
               makes the paper appear under the "Awarded" filter.
     note      Small grey line under the venue, e.g. "Oral presentation".
     links     Any of: paper, pdf, arxiv, doi, code, slides, video, poster, project.
               Each value is a full URL. Other keys work too (the key becomes
               the button label). Empty "" links are skipped.

   ── TAGS (all optional) ─────────────────────────────────────────────────────
     tags: {
       core:           "A*",        // "A*" | "A" | "B" | "C" | "Australasian" | "National" | "Unranked"
       coreYear:       "CORE2023",  // which CORE edition you checked (shown on hover)
       quartile:       "Q1",        // "Q1" | "Q2" | "Q3" | "Q4"
       quartileSource: "SJR 2024",  // or "JCR 2024". The chip then reads "SJR Q1"
       impact:         "IF 7.5",    // free text, shown as a plain chip
       extra:          ["Oral"]     // any custom chips. Each becomes a "Tag" filter option
     }

     The CORE / Quartile / Tag dropdowns list only the values that exist in
     this file, so a new tag shows up in the filters automatically.
     Visitors can also click any chip on a paper to filter by it.

     Where to look rankings up:
       CORE conference ranks   https://portal.core.edu.au/conf-ranks/
       CORE journal ranks      https://portal.core.edu.au/jnl-ranks/
       SJR quartiles           https://www.scimagojr.com/journalrank.php
       JCR quartiles           https://jcr.clarivate.com/

   ── TROUBLESHOOTING ─────────────────────────────────────────────────────────
     If the paper list says "Could not load research-data.js", this file has
     a syntax error (usually a missing comma or quote). Open the browser
     console (F12) — it shows the line number.
   ========================================================================== */

window.RESEARCH_DATA = {

  /* Name spellings that should be bolded in author lists (and count as
     "you" for the First-author filter). */
  me: ["Truong Thanh Hung Nguyen"],

  /* ── RESEARCH INTERESTS ──────────────────────────────────────────────────
     The clickable tiles under "Research interests" (and the planets in the
     orbit.exe widget). Clicking a tile filters Publications to the papers
     whose `topics` contain that `id`.
       id     short lowercase key used in a paper's `topics`
       name   full label on the tile
       short  label on the small chip shown on each paper
       file   joke file name under the tile (optional)
       icon   magnifier | eye | chip | pulse | joystick | agents | atom |
              monitor | globe | sparkle | doc | folder                    */
  interests: [
    { id: "agents",  name: "Self-Evolving Multi-agent Systems",     short: "MULTI-AGENT", file: "swarm.exe",  icon: "agents" },
    { id: "xai",     name: "Contestable / Explainable AI (C/XAI)",  short: "C/XAI",       file: "xai.exe",    icon: "magnifier" },
    { id: "cv",      name: "Computer Vision",                       short: "VISION",      file: "vision.dll", icon: "eye" },
    { id: "edge",    name: "Edge Computing",                        short: "EDGE",        file: "edge.sys",   icon: "chip" },
    { id: "biomed",  name: "Biomedical Signal / Image Analysis",    short: "BIOMED",      file: "biosig.dat", icon: "pulse" },
    { id: "quantum", name: "Quantum Machine Learning",              short: "QUANTUM ML",  file: "qubit.bin",  icon: "atom" },
    { id: "rl",      name: "Reinforcement Learning",                short: "RL",          file: "agent.bin",  icon: "joystick" }
  ],

  /* ── PUBLICATIONS ─────────────────────────────────────────────────────── */
  publications: [
    {
      title:   "Efficient and Concise Explanations for Object Detection with Gaussian-Class Activation Mapping Explainer",
      authors: ["Quoc Khanh Nguyen", "Truong Thanh Hung Nguyen", "Vo Thanh Khang Nguyen", "Van Binh Truong", "Tuong Phan", "Hung Cao"],
      venue:   "The 37th Canadian Conference on Artificial Intelligence",
      short:   "Canadian AI 2024",
      year:    2024,
      month:   "May",
      type:    "conference",
      topics:  ["xai", "cv"],
      tags:    { core: "", coreYear: "", extra: [] },
      links:   { paper: "https://arxiv.org/abs/2404.13417", code: "https://github.com/khanhnguyenuet/GCAME/" }
    },
    {
      title:   "Towards Better Explanations for Object Detection",
      authors: ["Van Binh Truong", "Truong Thanh Hung Nguyen", "Vo Thanh Khang Nguyen", "Quoc Khanh Nguyen", "Quoc Hung Cao"],
      venue:   "The 15th Asian Conference on Machine Learning",
      short:   "ACML 2023",
      year:    2023,
      month:   "Nov",
      type:    "conference",
      topics:  ["xai", "cv"],
      tags:    { core: "", coreYear: "", extra: [] },
      // TODO: these two links are copied from the Canadian AI 2024 paper above
      // (same as on the previous version of the site). Replace with the ACML ones.
      links:   { paper: "https://arxiv.org/abs/2404.13417", code: "https://github.com/khanhnguyenuet/GCAME/" }
    }
  ],

  /* ── HONORS & AWARDS ─────────────────────────────────────────────────────
     kind: "award" (trophy icon) or "scholarship" (medal icon).
     `tags` works here too, if you want to show the event's rank.        */
  awards: [
    { year: "2024",      kind: "award",       title: "Best Presentation Award",    event: "IEEE 42nd International Conference on Consumer Electronics (ICCE 2024)" },
    { year: "2024",      kind: "award",       title: "Best Contribution Award",    event: "IEEE 42nd International Conference on Consumer Electronics (ICCE 2024)" },
    { year: "2023",      kind: "award",       title: "Best Runner-up Paper Award", event: "Australasian Joint Conference on Artificial Intelligence 2023 (AJCAI 2023)" },
    { year: "2021–2023", kind: "scholarship", title: "DAAD Scholarship",           event: "for Master Studies in Germany" },
    { year: "2016–2020", kind: "scholarship", title: "DAAD Scholarship",           event: "for Exchange Bachelor Studies in Germany" }
  ],

  /* ── ACADEMIC SERVICES ───────────────────────────────────────────────────
     Rows with the same `role` next to each other are grouped in the table.
     `url` (optional) turns the venue name into a link. `tags` = same as above. */
  service: [
    { role: "Conference Reviewer", venue: "Canadian AI Conference", url: "", tags: {} },
    { role: "Journal Reviewer",    venue: "IGI Global Book Chapter [Navigating the Circular Age of a Sustainable Digital Revolution]", url: "", tags: {} },
    { role: "Journal Reviewer",    venue: "IET Smart Cities", url: "", tags: {} }
  ]
};
