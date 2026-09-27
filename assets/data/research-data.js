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
     type      "conference" | "journal" | "workshop" | "challenge" | "preprint" | "chapter" | "thesis"
     topics    Research-interest ids, e.g. ["xai", "cv"]. Each one shows as a
               chip in that interest's `color` on the paper, and the paper appears when a visitor
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
       impact:         "7.5",       // journal impact factor; a bare number shows as "IF 7.5"
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

/* ============================================================================
 * research-data.js — populated research profile
 *
 * Sources cross-checked on 2026-09-26 against public records including:
 * DBLP, PMLR, Springer, ACM/DOI metadata, arXiv, the AELab publication page,
 * and the author's existing academic webpage.
 *
 * IMPORTANT TODOs:
 * 1) Google Scholar rate-limited automated access, so compare once manually
 *    against your Scholar profile for any Scholar-only records.
 * 2) CORE/SJR/JCR metadata is intentionally left blank unless verified.
 *    Fill core/coreYear/quartile/quartileSource using the edition you want.
 * 3) Update preprints (SEMV, CANOE, depression annotation, HTS, MoE) when
 *    final peer-reviewed venues/DOIs become available.
 * 4) SEval-NAS: add the final ACM DOI when you confirm it.
 * 5) Add any 2026 reviewer/service roles not yet listed on your public page.
 * 6) Optional: add UNB Graduate Research Conference / Research Expo posters
 *    if you want them to appear in Publications rather than only Awards/CV.
 * ========================================================================= */

window.RESEARCH_DATA = {
  "me": [
    "Truong Thanh Hung Nguyen",
    "Hung Truong Thanh Nguyen",
    "Truong-Thanh-Hung Nguyen",
    "Nguyen Truong Thanh Hung",
    "Hung Nguyen"
  ],
  "interests": [
    {
      "id": "agents",
      "name": "Self-Evolving Multi-agent Systems",
      "short": "MAS",
      "file": "swarm.exe",
      "icon": "agents",
      "color": "#FFD84A"
    },
    {
      "id": "xai",
      "name": "Contestable / Explainable AI (C/XAI)",
      "short": "C/XAI",
      "file": "xai.exe",
      "icon": "magnifier",
      "color": "#6ED9FF"
    },
    {
      "id": "cv",
      "name": "Computer Vision",
      "short": "VISION",
      "file": "vision.dll",
      "icon": "eye",
      "color": "#B9A6FF"
    },
    {
      "id": "edge",
      "name": "Edge Computing",
      "short": "EDGE",
      "file": "edge.sys",
      "icon": "chip",
      "color": "#FFA24C"
    },
    {
      "id": "biomed",
      "name": "Biomedical Engineering",
      "short": "BIOMED",
      "file": "biosig.dat",
      "icon": "pulse",
      "color": "#FF7F96"
    },
    {
      "id": "quantum",
      "name": "Quantum Machine Learning",
      "short": "QUANTUM ML",
      "file": "qubit.bin",
      "icon": "atom",
      "color": "#F59CFF"
    },
    {
      "id": "rl",
      "name": "Reinforcement Learning",
      "short": "RL",
      "file": "agent.bin",
      "icon": "joystick",
      "color": "#7EE89A"
    },
    // {
    //   "id": "chem",
    //   "name": "Cheminformatics",
    //   "short": "CHEMINFO",
    //   "file": "molecule.mol",
    //   "icon": "flask",
    //   "color": "#D4F26B"
    // }
  ],
  "publications": [
    {
      "title": "Self-Evolving Multimedia Verification through Memory Consolidation of Contestation Experiences",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Vo Thanh Khang Nguyen",
        "Hoang-Loc Cao",
        "Phuc Ho",
        "Truong Thinh Nguyen",
        "Van Pham",
        "Hung Cao"
      ],
      "venue": "arXiv preprint arXiv:2609.27175",
      "short": "arXiv",
      "year": 2026,
      "month": "Sep",
      "type": "preprint",
      "topics": [
        "agents",
        "xai",
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2609.27175",
        "code": "https://github.com/Analytics-Everywhere-Lab/SEMV"
      }
    },
    {
      "title": "Geometry-anchored PET-aware multimodal pseudo-CT synthesis for whole-body attenuation correction: the BIC-MAC Challenge",
      "authors": [
        "Xuan Loc Nguyen",
        "Hoang-Loc Cao",
        "Truong Thanh Hung Nguyen",
        "Phuc Ho",
        "Phuc Truong Loc Nguyen",
        "Nguyen Truong Toan To",
        "Hung Cao"
      ],
      "venue": "Big Cross-Modal Attenuation Correction (BIC-MAC) Challenge at MICCAI 2026",
      "short": "MICCAI 2026",
      "year": 2026,
      "month": "Sep",
      "type": "challenge",
      "topics": [
        "cv",
        "biomed"
      ],
      "tags": {
        "core": "A",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "1st Place",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2609.27848",
      }
    },
    {
      "title": "CoPlan: A Trustworthy Co-Intelligence Interface for Care Planning through Role-Based Contestable Argument Graphs",
      "authors": [
        "Hung Truong Thanh Nguyen",
        "Hélène Fournier",
        "Piper Jackson",
        "Makoto Itoh",
        "Shannon Freeman",
        "Rene Richard",
        "Hung Cao"
      ],
      "venue": "The 2026 International Conference on Next Generation AI Systems",
      "short": "NGEN-AI 2026",
      "year": 2026,
      "month": "",
      "type": "conference",
      "topics": [
        "agents",
        "xai",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2608.05107",
        "code": "https://github.com/Analytics-Everywhere-Lab/CAIAiPCP",
      }
    },
    {
      "title": "Adaptive Arena-based Contestable Argumentative Network-of-Experts for Open-Ended Care Plan Coordination",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Hoang-Loc Cao",
        "Phuc Ho",
        "Phuc Truong Loc Nguyen",
        "René Richard",
        "Hung Cao"
      ],
      "venue": "4th International Conference on Frontiers of Artificial Intelligence, Ethics, and Multidisciplinary Applications",
      "short": "FAIEMA 2026",
      "year": 2026,
      "month": "Aug",
      "type": "conference",
      "topics": [
        "agents",
        "xai",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2608.05391"
      }
    },
    {
      "title": "Self-Evolving Human-Centered Framework for Explainable Depression Symptom Annotation",
      "authors": [
        "Hoang-Loc Cao",
        "Van Pham",
        "Truong Thanh Hung Nguyen",
        "Phuc Truong Loc Nguyen",
        "Phuc Ho",
        "Veronica Whitford",
        "Hung Cao"
      ],
      "venue": "The IEEE International Conference on Omni-Layer Intelligent Systems (COINS) 2026",
      "short": "IEEE COINS 2026",
      "year": 2026,
      "month": "Jul",
      "type": "conference",
      "topics": [
        "agents",
        "xai",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2607.15202"
      }
    },
    {
      "title": "Toward a Unified Geospatial Intelligence Framework Utilizing Edge Computing, IoT, and Multimodal Generative AI for Climate Risk Mitigation and Adaptive Evacuation Planning",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Hung Cao"
      ],
      "venue": "XXV ISPRS Congress 2026 / The International Archives of the Photogrammetry, Remote Sensing and Spatial Information Sciences",
      "short": "ISPRS 2026",
      "year": 2026,
      "month": "Jul",
      "type": "conference",
      "topics": [
        "edge",
        "agents"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": [
          "Invited Paper"
        ]
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.5194/isprs-archives-XLIX-M-1-2026-33-2026",
      }
    },
    {
      "title": "Consensus-based Agentic Large Language Model Framework for Harmonized Tariff Schedule Code Classification",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Khanh Van Quynh Nguyen",
        "Hoang-Loc Cao",
        "Tri Duong",
        "Phuc Ho",
        "Van Pham",
        "Loc Nguyen",
        "Hung Cao"
      ],
      "venue": "The 3rd International Conference of Resilience by Technology and Design (RTD 2026)",
      "short": "RTD 2026",
      "year": 2026,
      "month": "Jun",
      "type": "conference",
      "topics": [
        "agents",
        "xai"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2606.16987",
        "code": "https://github.com/Analytics-Everywhere-Lab/hts"
      }
    },
    {
      "title": "Does Mixture-of-Experts Actually Help Inference on Consumer and Edge Hardware? An Empirical Study",
      "authors": [
        "Alfarizy Alfarizy",
        "Hung Truong Thanh Nguyen",
        "René Richard",
        "Roozbeh Razavi-Far",
        "Hung Cao"
      ],
      "venue": "4th International Conference on Frontiers of Artificial Intelligence, Ethics, and Multidisciplinary Applications",
      "short": "FAIEMA 2026",
      "year": 2026,
      "month": "Jun",
      "type": "conference",
      "topics": [
        "edge",
        "agents"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "arXiv notes submission to FAIEMA 2026; keep as preprint until final publication is verified.",
      "links": {
        "paper": "https://arxiv.org/abs/2606.21428",
        "code": "https://github.com/Analytics-Everywhere-Lab/edge-moe"
      }
    },
    {
      "title": "Contestable Multi-Agent Debate with Arena-based Argumentative Computation for Multimedia Verification",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Vo Thanh Khang Nguyen",
        "Hoang-Loc Cao",
        "Phuc Ho",
        "Van Pham",
        "Hung Cao"
      ],
      "venue": "Grand Challenge on Multimedia Verification at The 16th ACM International Conference on Multimedia Retrieval",
      "short": "ICMR 2026",
      "year": 2026,
      "month": "Jun",
      "type": "challenge",
      "topics": [
        "agents",
        "xai",
        "cv"
      ],
      "tags": {
        "core": "B",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "1st Place",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1145/3805622.3812606",
        "code": "https://github.com/Analytics-Everywhere-Lab/MV2026_the_liems"
      }
    },
    {
      "title": "Anatomically-conditioned Latent Diffusion Model for Data-Efficient Few-Shot Cross-Domain 3D Glioma MRI Synthesis",
      "authors": [
        "Salman Shaik",
        "Hung Truong Thanh Nguyen",
        "Hung Cao"
      ],
      "venue": "The 39th Canadian Conference on Artificial Intelligence",
      "short": "Canadian AI 2026",
      "year": 2026,
      "month": "May",
      "type": "conference",
      "topics": [
        "cv",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://proceedings.mlr.press/v318/shaik26a.html",
        "code": "https://github.com/Analytics-Everywhere-Lab/anatomically-conditioned-LDM"
      }
    },
    {
      "title": "Neuro-Symbolic Adaptive Collaboration of Arena-Based Argumentative LLMs for Contestable Legal Reasoning",
      "authors": [
        "Hoang-Loc Cao",
        "Phuc Ho",
        "Truong Thanh Hung Nguyen",
        "Phuc Truong Loc Nguyen",
        "Dinh Thien Loc Nguyen",
        "Hung Cao"
      ],
      "venue": "The 39th Canadian Conference on Artificial Intelligence",
      "short": "Canadian AI 2026",
      "year": 2026,
      "month": "May",
      "type": "conference",
      "topics": [
        "agents",
        "xai"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://proceedings.mlr.press/v318/cao26b.html",
        "code": "https://github.com/loc110504/ACAL"
      }
    },
    {
      "title": "Multi-Dimensional Model Integrity and Responsibility Assessment Index and Scoring Framework",
      "authors": [
        "Phuc Truong Loc Nguyen",
        "Thanh Hung Do",
        "Truong Thanh Hung Nguyen",
        "Hung Cao"
      ],
      "venue": "The 39th Canadian Conference on Artificial Intelligence",
      "short": "Canadian AI 2026",
      "year": 2026,
      "month": "May",
      "type": "conference",
      "topics": [
        "xai"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://proceedings.mlr.press/v318/nguyen26b.html",
      }
    },
    {
      "title": "Variational Quantum Rainbow Deep Q-Network for Optimizing Resource Allocation Problem",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Truong Thinh Nguyen",
        "Hung Cao"
      ],
      "venue": "The 41st ACM/SIGAPP Symposium on Applied Computing",
      "short": "SAC 2026",
      "year": 2026,
      "month": "Mar",
      "type": "conference",
      "topics": [
        "quantum",
        "rl"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1145/3748522.3779769",
        "code": "https://github.com/Analytics-Everywhere-Lab/qtrl/"
      }
    },
    {
      "title": "SEval-NAS: A Search-Agnostic Evaluation for Neural Architecture Search",
      "authors": [
        "Atah Nuh Mih",
        "Jianzhou Wang",
        "Truong Thanh Hung Nguyen",
        "Hung Cao"
      ],
      "venue": "The 41st ACM/SIGAPP Symposium on Applied Computing",
      "short": "SAC 2026",
      "year": 2026,
      "month": "Mar",
      "type": "conference",
      "topics": [
        "edge"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://dl.acm.org/doi/10.1145/3748522.3779788",
      }
    },
    {
      "title": "Heart2Mind: Human-Centered Contestable Psychiatric Disorder Prediction System Using Wearable ECG Monitors",
      "authors": [
        "Hung Nguyen",
        "Alireza Rahimi",
        "Veronica Whitford",
        "Hélène Fournier",
        "Irina Kondratova",
        "René Richard",
        "Hung Cao"
      ],
      "venue": "ACM Transactions on Computing for Healthcare",
      "short": "ACM HEALTH 2026",
      "year": 2026,
      "month": "Jan",
      "type": "journal",
      "topics": [
        "xai",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "Q1",
        "quartileSource": "",
        "impact": "8.0",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1145/3788686",
        "code": "https://github.com/Analytics-Everywhere-Lab/heart2mind"
      }
    },
    {
      "title": "Motion2Meaning: A Clinician-Centered Framework for Contestable LLM in Parkinson’s Disease Gait Interpretation",
      "authors": [
        "Loc Phuc Truong Nguyen",
        "Hung Thanh Do",
        "Hung Truong Thanh Nguyen",
        "Hung Cao"
      ],
      "venue": "9th International Symposium on Chatbots and Human-Centred AI (CONVERSATIONS 2025)",
      "short": "CONVERSATIONS 2025",
      "year": 2025,
      "month": "Jul",
      "type": "conference",
      "topics": [
        "xai",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "Best Paper Nominee",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1007/978-3-032-26717-7_20",
        "code": "https://github.com/hungdothanh/motion2meaning"
      }
    },
    {
      "title": "Multimedia Verification Through Multi-Agent Deep Research Multimodal Large Language Models",
      "authors": [
        "Huy Hoan Le",
        "Van Sy Thinh Nguyen",
        "Thi Le Chi Dang",
        "Vo Thanh Khang Nguyen",
        "Truong Thanh Hung Nguyen",
        "Hung Cao"
      ],
      "venue": "The 33rd ACM International Conference on Multimedia",
      "short": "ACM MM 2025",
      "year": 2025,
      "month": "Oct",
      "type": "conference",
      "topics": [
        "agents",
        "cv"
      ],
      "tags": {
        "core": "A*",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": [
        ]
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1145/3746027.3762033"
      }
    },
    {
      "title": "ODExAI: A Comprehensive Object Detection Explainable AI Evaluation",
      "authors": [
        "Phuc Truong Loc Nguyen",
        "Hung Truong Thanh Nguyen",
        "Hung Cao"
      ],
      "venue": "The 48th German Conference on Artificial Intelligence",
      "short": "KI 2025",
      "year": 2025,
      "month": "Sep",
      "type": "conference",
      "topics": [
        "xai",
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "Lecture Notes in Computer Science, pp. 118–133.",
      "links": {
        "paper": "https://arxiv.org/abs/2504.19249",
        "doi": "https://doi.org/10.1007/978-3-032-02813-6_9",
        "code": "https://github.com/Analytics-Everywhere-Lab/odexai"
      }
    },
    {
      "title": "SimInterview: Transforming Business Education through Large Language Model-Based Simulated Multilingual Interview Training System",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Tran Diem Quynh Nguyen",
        "Hoang Loc Cao",
        "Thi Cam Thanh Tran",
        "Thi Cam Mai Truong",
        "Hung Cao"
      ],
      "venue": "International Conference on Economics, Finance, and Management",
      "short": "ICEFM 2025",
      "year": 2025,
      "month": "Aug",
      "type": "conference",
      "topics": [
        "xai",
        "agents"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": [""]
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2508.11873"
      }
    },
    {
      "title": "Privacy-Preserving Multi-Stage Fall Detection Framework with Semi-supervised Federated Learning and Robotic Vision Confirmation",
      "authors": [
        "Seyed Alireza Rahimi Azghadi",
        "Truong-Thanh-Hung Nguyen",
        "Hélène Fournier",
        "Monica Wachowicz",
        "René Richard",
        "Francis Palma",
        "Hung Cao"
      ],
      "venue": "arXiv preprint arXiv:2507.10474",
      "short": "arXiv 2025",
      "year": 2025,
      "month": "Jul",
      "type": "preprint",
      "topics": [
        "edge",
        "biomed",
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.2139/ssrn.5390384"
      }
    },
    {
      "title": "Human-Centered Explainable Psychiatric Disorder Diagnosis System Using Wearable ECG Monitors",
      "authors": [
        "Hung Nguyen",
        "Alireza Rahimi",
        "Veronica Whitford",
        "Hélène Fournier",
        "Irina Kondratova",
        "René Richard",
        "Hung Cao"
      ],
      "venue": "The 29th Pacific-Asia Conference on Knowledge Discovery and Data Mining",
      "short": "PAKDD 2025",
      "year": 2025,
      "month": "Jun",
      "type": "conference",
      "topics": [
        "xai",
        "biomed"
      ],
      "tags": {
        "core": "B",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1007/978-981-96-8173-0_33",
      }
    },
    {
      "title": "XGD: Explainable AI-Guided Knowledge Distillation with Feature Refinement for Semantic Segmentation",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Van Binh Truong",
        "Quoc Khanh Nguyen",
        "Vo Thanh Khang Nguyen",
        "Phuc Truong Loc Nguyen",
        "Francis Palma",
        "Hung Cao"
      ],
      "venue": "The 38th Canadian Conference on Artificial Intelligence",
      "short": "Canadian AI 2025",
      "year": 2025,
      "month": "May",
      "type": "conference",
      "topics": [
        "xai",
        "cv",
        "edge"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://assets.pubpub.org/6ab98p0b/48-11746729842910.pdf",
        "code": "https://github.com/Analytics-Everywhere-Lab/xaiseg"
      }
    },
    {
      "title": "SF2D: Semi-supervised Federated Learning for Fall Detection using (Un)labelled Data in Edge-Cloud",
      "authors": [
        "Seyed Alireza Rahimi Azghadi",
        "Hung Nguyen",
        "Irina Kondratova",
        "Hélène Fournier",
        "Monica Wachowicz",
        "Francis Palma",
        "René Richard",
        "Hung Cao"
      ],
      "venue": "The 38th Canadian Conference on Artificial Intelligence",
      "short": "Canadian AI 2025",
      "year": 2025,
      "month": "May",
      "type": "conference",
      "topics": [
        "edge",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://nrc-publications.canada.ca/eng/view/object/?id=5142c906-e5f5-45ee-a070-1486125ce44a"
      }
    },
    {
      "title": "XEdgeAI: A Human-centered Industrial Inspection Framework with Data-centric Explainable Edge AI Approach",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Phuc Truong Loc Nguyen",
        "Hung Cao"
      ],
      "venue": "Information Fusion",
      "short": "Inf. Fusion",
      "year": 2025,
      "month": "Apr",
      "type": "journal",
      "topics": [
        "xai",
        "cv",
        "edge"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "Q1",
        "quartileSource": "",
        "impact": "18.6",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1016/j.inffus.2024.102782",
        "code": "https://github.com/Analytics-Everywhere-Lab/vqixai"
      }
    },
    {
      "title": "MACeIP: A Multimodal Ambient Context-enriched Intelligence Platform in Smart Cities",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Phuc Truong Loc Nguyen",
        "Monica Wachowicz",
        "Hung Cao"
      ],
      "venue": "The 9th IEEE/IEIE International Conference on Consumer Electronics-Asia",
      "short": "ICCE-Asia 2024",
      "year": 2024,
      "month": "Nov",
      "type": "conference",
      "topics": [
        "edge",
        "agents"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": ["Invited Paper"]
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1109/ICCE-Asia63397.2024.10774046",
      }
    },
    {
      "title": "Protecting Older Adults: A Wearable-Based Federated Learning Approach for Pre-Impact Fall Detection",
      "authors": [
        "Seyed Alireza Rahimi Azghadi",
        "Truong Thanh Hung Nguyen",
        "Irina Kondratova",
        "Hélène Fournier",
        "Francis Palma",
        "René Richard",
        "Hung Cao"
      ],
      "venue": "The 34th International Conference on Collaborative Advances in Software and COmputiNg",
      "short": "CASCON 2024",
      "year": 2024,
      "month": "",
      "type": "conference",
      "topics": [
        "edge",
        "biomed"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {}
    },
    {
      "title": "LangXAI: Integrating Large Vision Models for Generating Textual Explanations to Enhance Explainability in Visual Perception Tasks",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Tobias Clement",
        "Phuc Truong Loc Nguyen",
        "Nils Kemmerzell",
        "Van Binh Truong",
        "Vo Thanh Khang Nguyen",
        "Mohamed Abdelaal",
        "Hung Cao"
      ],
      "venue": "The 33rd International Joint Conference on Artificial Intelligence",
      "short": "IJCAI 2024",
      "year": 2024,
      "month": "Aug",
      "type": "conference",
      "topics": [
        "xai",
        "cv"
      ],
      "tags": {
        "core": "A*",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.24963/ijcai.2024/1025"
      }
    },
    {
      "title": "Efficient and Concise Explanations for Object Detection with Gaussian-Class Activation Mapping Explainer",
      "authors": [
        "Quoc Khanh Nguyen",
        "Truong Thanh Hung Nguyen",
        "Vo Thanh Khang Nguyen",
        "Van Binh Truong",
        "Tuong Phan",
        "Hung Cao"
      ],
      "venue": "The 37th Canadian Conference on Artificial Intelligence",
      "short": "Canadian AI 2024",
      "year": 2024,
      "month": "May",
      "type": "conference",
      "topics": [
        "xai",
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2404.13417",
        "code": "https://github.com/khanhnguyenuet/GCAME/"
      }
    },
    {
      "title": "Examining Monitoring System: Detecting Abnormal Behavior In Online Examinations",
      "authors": [
        "Dinh An Ngo",
        "Thanh Dat Nguyen",
        "Thi Le Chi Dang",
        "Huy Hoan Le",
        "Ton Bao Ho",
        "Vo Thanh Khang Nguyen",
        "Truong Thanh Hung Nguyen"
      ],
      "venue": "arXiv preprint arXiv:2402.12179",
      "short": "arXiv 2024",
      "year": 2024,
      "month": "Feb",
      "type": "preprint",
      "topics": [
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/abs/2402.12179"
      }
    },
    {
      "title": "Enhancing the Fairness and Performance of Edge Cameras with Explainable AI",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Vo Thanh Khang Nguyen",
        "Quoc Hung Cao",
        "Van Binh Truong",
        "Quoc Khanh Nguyen",
        "Hung Cao"
      ],
      "venue": "The 42nd IEEE International Conference on Consumer Electronics",
      "short": "ICCE 2024",
      "year": 2024,
      "month": "Jan",
      "type": "conference",
      "topics": [
        "xai",
        "cv",
        "edge"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://ieeexplore.ieee.org/document/10444383"
      }
    },
    {
      "title": "XAI-Enhanced Semantic Segmentation Models for Visual Quality Inspection",
      "authors": [
        "Tobias Clement",
        "Truong Thanh Hung Nguyen",
        "Mohamed Abdelaal",
        "Hung Cao"
      ],
      "venue": "The 42nd IEEE International Conference on Consumer Electronics",
      "short": "ICCE 2024",
      "year": 2024,
      "month": "Jan",
      "type": "conference",
      "topics": [
        "xai",
        "cv",
        "edge"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://ieeexplore.ieee.org/document/10444225/"
      }
    },
    {
      "title": "Coping with Data Distribution Shifts: XAI-Based Adaptive Learning with SHAP Clustering for Energy Consumption Prediction",
      "authors": [
        "Tobias Clement",
        "Hung Truong Thanh Nguyen",
        "Nils Kemmerzell",
        "Mohamed Abdelaal",
        "Davor Stjelja"
      ],
      "venue": "The 36th Australasian Joint Conference on Artificial Intelligence",
      "short": "AJCAI 2023",
      "year": 2023,
      "month": "Nov",
      "type": "conference",
      "topics": [
        "xai"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "Best Runner-up Paper Award",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1007/978-981-99-8391-9_12",
      }
    },
    {
      "title": "Towards Better Explanations for Object Detection",
      "authors": [
        "Van Binh Truong",
        "Truong Thanh Hung Nguyen",
        "Vo Thanh Khang Nguyen",
        "Quoc Khanh Nguyen",
        "Quoc Hung Cao"
      ],
      "venue": "The 15th Asian Conference on Machine Learning",
      "short": "ACML 2023",
      "year": 2023,
      "month": "Nov",
      "type": "conference",
      "topics": [
        "xai",
        "cv"
      ],
      "tags": {
        "core": "C",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://proceedings.mlr.press/v222/truong24a.html"
      }
    },
    {
      "title": "Towards Trust of Explainable AI in Thyroid Nodule Diagnosis",
      "authors": [
        "Truong Thanh Hung Nguyen",
        "Van Binh Truong",
        "Vo Thanh Khang Nguyen",
        "Quoc Hung Cao",
        "Quoc Khanh Nguyen"
      ],
      "venue": "The 7th International Workshop on Health Intelligence (W3PHIAI-23), AAAI 2023",
      "short": "W3PHIAI 2023",
      "year": 2023,
      "month": "Feb",
      "type": "workshop",
      "topics": [
        "xai",
        "cv",
        "biomed"
      ],
      "tags": {
        "core": "A*",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1007/978-3-031-36938-4_2"
      }
    },
    {
      "title": "SeCAM: Tightly Accelerate the Image Explanation via Region-Based Segmentation",
      "authors": [
        "Phong X. Nguyen",
        "Hung Q. Cao",
        "Khang V. T. Nguyen",
        "Hung Nguyen",
        "Takehisa Yairi"
      ],
      "venue": "IEICE Transactions on Information and Systems",
      "short": "IEICE 2022",
      "year": 2022,
      "month": "Aug",
      "type": "journal",
      "topics": [
        "xai",
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://doi.org/10.1587/transinf.2021EDP7205"
      }
    },
    {
      "title": "A Novel Explainable Artificial Intelligence Model in Image Classification problem",
      "authors": [
        "Hung Quoc Cao",
        "Hung Truong Thanh Nguyen",
        "Khang Vo Thanh Nguyen",
        "Xuan Phong Nguyen"
      ],
      "venue": "FPT AI Conference",
      "short": "FAIC 2021",
      "year": 2021,
      "month": "Dec",
      "type": "conference",
      "topics": [
        "xai",
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "Best Paper Award",
      "note": "",
      "links": {
        "paper": "https://arxiv.org/pdf/2307.04137",
      }
    },
    {
      "title": "Evaluation of Explainable Artificial Intelligence: SHAP, LIME, and CAM",
      "authors": [
        "Hung Truong Thanh Nguyen",
        "Hung Quoc Cao",
        "Khang Vo Thanh Nguyen",
        "Nguyen Dinh Khoi Pham"
      ],
      "venue": "FPT AI Conference",
      "short": "FAIC 2021",
      "year": 2021,
      "month": "Dec",
      "type": "conference",
      "topics": [
        "xai",
        "cv"
      ],
      "tags": {
        "core": "",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "Best Runner-up Paper Award",
      "note": "",
      "links": {
        "paper": "https://www.researchgate.net/publication/362165633_Evaluation_of_Explainable_Artificial_Intelligence_SHAP_LIME_and_CAM",
      }
    },
    {
      "title": "Can Reinforcement Learning Solve a Human Allocation Problem?",
      "authors": [
        "Phong Nguyen",
        "Matsuba Hiroya",
        "Tejdeep Hunabad",
        "Dmitrii Zhilenkov",
        "Hung Nguyen",
        "Khang Nguyen"
      ],
      "venue": "The International Conference on Automated Planning and Scheduling — PRL Workshop",
      "short": "ICAPS 2021",
      "year": 2021,
      "month": "Jun",
      "type": "workshop",
      "topics": [
        "rl"
      ],
      "tags": {
        "core": "A*",
        "coreYear": "",
        "quartile": "",
        "quartileSource": "",
        "impact": "",
        "extra": []
      },
      "award": "",
      "note": "",
      "links": {
        "paper": "https://prl-theworkshop.github.io/prl2021/papers/PRL2021_paper_15.pdf",
      }
    },
  ],
  "awards": [
    {
      "year": "2026",
      "kind": "award",
      "title": "1st Place Prize",
      "event": "ICMR 2026 Grand Challenge on Multimedia Verification"
    },
    {
      "year": "2026",
      "kind": "award",
      "title": "1st Place Prize",
      "event": "Big Cross-Modal Attenuation Correction (BIC-MAC) Challenge at MICCAI 2026"
    },
    {
      "year": "2025",
      "kind": "award",
      "title": "Best Paper Nominee",
      "event": "9th International Symposium on Chatbots and Human-Centred AI (CONVERSATIONS 2025)"
    },
    {
      "year": "2025",
      "kind": "award",
      "title": "Runner-up of the Best Poster Award",
      "event": "Atlantic Canada AI Summit"
    },
    {
      "year": "2025",
      "kind": "award",
      "title": "Best Poster Award",
      "event": "UNB Computer Science Research Expo"
    },
    {
      "year": "2025",
      "kind": "award",
      "title": "Best Runner-up Poster Award",
      "event": "UNB Computer Science Research Expo"
    },
    {
      "year": "2024",
      "kind": "scholarship",
      "title": "Colin Ware Prize in Computer Science",
      "event": "University of New Brunswick"
    },
    {
      "year": "2024",
      "kind": "award",
      "title": "Best Presentation Award",
      "event": "IEEE 42nd International Conference on Consumer Electronics (ICCE 2024)"
    },
    {
      "year": "2024",
      "kind": "award",
      "title": "Best Contribution Award",
      "event": "IEEE 42nd International Conference on Consumer Electronics (ICCE 2024)"
    },
    {
      "year": "2023",
      "kind": "award",
      "title": "Best Runner-up Paper Award",
      "event": "Australasian Joint Conference on Artificial Intelligence (AJCAI 2023)"
    },
    {
      "year": "2021",
      "kind": "award",
      "title": "Best Paper Award",
      "event": "FPT AI Conference 2021 (FAIC 2021)"
    },
    {
      "year": "2021",
      "kind": "award",
      "title": "Best Runner-up Paper Award",
      "event": "FPT AI Conference 2021 (FAIC 2021)"
    },
    {
      "year": "2020",
      "kind": "scholarship",
      "title": "DAAD Scholarship",
      "event": "Sur-place scholarship"
    },
    {
      "year": "2016–2020",
      "kind": "scholarship",
      "title": "DAAD Scholarship",
      "event": "Exchange bachelor studies in Germany"
    }
  ],
  "mentorship": [
    {
      "count": 7,
      "level": "Master's students"
    },
    {
      "count": 10,
      "level": "Undergraduate students"
    }
  ],
  "service": [
    {
      "role": "PC Member",
      "venue": "Canadian AI Conference 2026",
      "url": "",
      "tags": {}
    },
    {
      "role": "PC Member",
      "venue": "IEEE 44th International Conference on Consumer Electronics (IEEE ICCE 2026)",
      "url": "",
      "tags": {}
    },
    {
      "role": "PC Member",
      "venue": "35th IEEE International Conference on Collaborative Advances in Software and Computing (CASCON 2025)",
      "url": "",
      "tags": {}
    },
    {
      "role": "PC Member",
      "venue": "International Conference on Cryptography and Information Security (VCRIS 2026, 2025)",
      "url": "",
      "tags": {}
    },
    {
      "role": "Judge",
      "venue": "Canada-Wide Science Fair (Senior) 2025",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "Information Processing & Management",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "Information Fusion",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "IEEE Transactions on Mobile Computing",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "European Journal of Operational Research",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "International Journal of Human–Computer Interaction",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "IEEE Canadian Journal of Electrical and Computer Engineering",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "IET Smart Cities",
      "url": "",
      "tags": {}
    },
    {
      "role": "Journal Reviewer",
      "venue": "IGI Global Book Chapter — Navigating the Circular Age of a Sustainable Digital Revolution",
      "url": "",
      "tags": {}
    },
    {
      "role": "Conference Reviewer",
      "venue": "Canadian AI Conference 2026, 2025, 2024",
      "url": "",
      "tags": {}
    },
    {
      "role": "Conference Reviewer",
      "venue": "Conference on Information Technology and its Applications (CITA 2025, 2024)",
      "url": "",
      "tags": {}
    },
    {
      "role": "Conference Reviewer",
      "venue": "International Conference on Cryptography and Information Security (VCRIS 2024)",
      "url": "",
      "tags": {}
    },
    {
      "role": "Conference Reviewer",
      "venue": "International Conference on Information Reuse and Integration for Data Science (IEEE IRI 2025, 2024)",
      "url": "",
      "tags": {}
    }
  ]
};

