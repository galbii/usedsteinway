import type { Payload } from 'payload'

type PianoSeed = {
  title: string
  slug: string
  brandSlug: string
  model: string
  year: number
  serialNumber: string
  finish: string
  condition: 'new' | 'used' | 'reconditioned' | 'rebuilt'
  price: number
  retailPrice?: number
  isAvailable: boolean
  isFeatured: boolean
  stockImageUrl?: string
  specifications: {
    size: string
    length: string
    width?: string
    stringLength?: string
    keys: number
  }
  conditionReport: string
  restorationHistory?: string
  tags: Array<{ tag: string }>
}

const SAMPLE_PIANOS: PianoSeed[] = [
  // ─── STEINWAY D ───────────────────────────────────────────────
  {
    title: '2005 Steinway Model D — Polished Ebony',
    slug: 'steinway-d-2005-polished-ebony',
    brandSlug: 'steinway',
    model: 'Model D',
    year: 2005,
    serialNumber: '568234',
    finish: 'Polished Ebony',
    condition: 'rebuilt',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_D_Black_03.jpg',
    price: 185000,
    retailPrice: 227000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "8'11¾\" (274 cm)",
      length: "8'11¾\"",
      width: '61.75"',
      stringLength: 'Bass: 95.5" | Treble: 8.1"',
      keys: 88,
    },
    conditionReport:
      'Full concert rebuild completed 2022 by Steinway-authorized rebuilder with 30+ years experience. New Renner action, Mapes bass strings, Abel hammers. Cabinet refinished in mirror-gloss ebony. Concert-ready throughout.',
    restorationHistory:
      'Comprehensive rebuild 2022 — new strings, hammers, dampers, complete action parts. Cabinet fully refinished. Concert-grade regulation and voicing. Investment: approximately $52,000.',
    tags: [{ tag: 'concert-grand' }, { tag: 'rebuilt' }, { tag: 'stage-ready' }],
  },
  {
    title: '1999 Steinway Model D — Polished Ebony',
    slug: 'steinway-d-1999-polished-ebony',
    brandSlug: 'steinway',
    model: 'Model D',
    year: 1999,
    serialNumber: '523847',
    finish: 'Polished Ebony',
    condition: 'rebuilt',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_D_Black_03.jpg',
    price: 162000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "8'11¾\" (274 cm)",
      length: "8'11¾\"",
      width: '61.75"',
      stringLength: 'Bass: 95.5" | Treble: 8.1"',
      keys: 88,
    },
    conditionReport:
      'Retired from a New England conservatory, rebuilt in 2020 by Steinway-certified rebuilder. New soundboard (Bolduc), new Renner action, new bass strings (Steinway-wound). Cabinet shows minor professional-use wear consistent with stage life.',
    restorationHistory:
      'Full rebuild 2020 — new soundboard, new strings, new Renner hammers, complete action rebuild. Concert regulation performed post-rebuild. Investment: approximately $48,000.',
    tags: [{ tag: 'concert-grand' }, { tag: 'rebuilt' }, { tag: 'conservatory' }],
  },
  {
    title: '2012 Steinway Model D — Satin Ebony',
    slug: 'steinway-d-2012-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model D',
    year: 2012,
    serialNumber: '593102',
    finish: 'Satin Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_D_Black_03.jpg',
    price: 196000,
    retailPrice: 227000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "8'11¾\" (274 cm)",
      length: "8'11¾\"",
      width: '61.75"',
      stringLength: 'Bass: 95.5" | Treble: 8.1"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9/10 — light wear on key fallboard from professional use. Action: 9.5/10 — recently regulated by Steinway technician. Soundboard: 10/10 — no cracks or separations. Strings: 9/10 — original, bright tone. A serious concert instrument in exceptional condition.',
    tags: [{ tag: 'concert-grand' }, { tag: 'single-owner' }, { tag: 'low-hours' }],
  },

  // ─── STEINWAY C ───────────────────────────────────────────────
  {
    title: '2008 Steinway Model C — Satin Ebony',
    slug: 'steinway-c-2008-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model C',
    year: 2008,
    serialNumber: '577442',
    finish: 'Satin Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_C_Black_03.jpg',
    price: 115000,
    retailPrice: 175000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "7'5\" (225 cm)",
      length: "7'5\"",
      width: '59"',
      stringLength: 'Bass: 84" | Treble: 6.6"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9.5/10 — near-showroom condition. Action: 10/10 — recently regulated and voiced by Steinway technician. Soundboard: 10/10 — no cracks, full crown maintained. Strings: 9.5/10 — original, full tone. An exceptional example of the Model C.',
    tags: [{ tag: 'professional' }, { tag: 'recital-hall' }, { tag: 'single-owner' }],
  },

  // ─── STEINWAY B ───────────────────────────────────────────────
  {
    title: '2015 Steinway Model B — Satin Ebony',
    slug: 'steinway-b-2015-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model B',
    year: 2015,
    serialNumber: '609834',
    finish: 'Satin Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_B_Black_03.jpg',
    price: 89500,
    retailPrice: 116900,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "6'10\" (211 cm)",
      length: "6'10\"",
      width: '58"',
      stringLength: 'Bass: 77.5" | Treble: 6.4"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9.5/10 — hairline bench scuff on underside only. Action: 10/10 — recently regulated. Soundboard: 10/10 — no cracks. Strings: 10/10 — original, bright tone. Finish: 9.5/10 — showroom quality. Single owner, Steinway-certified maintenance.',
    restorationHistory:
      'Full regulation and voicing 2024 by Steinway-certified technician. New hammer felt installed 2022.',
    tags: [{ tag: 'featured' }, { tag: 'concert-quality' }, { tag: 'single-owner' }],
  },
  {
    title: '2003 Steinway Model B — Polished Ebony',
    slug: 'steinway-b-2003-polished-ebony',
    brandSlug: 'steinway',
    model: 'Model B',
    year: 2003,
    serialNumber: '559217',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_B_Black_03.jpg',
    price: 67500,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'10\" (211 cm)",
      length: "6'10\"",
      width: '58"',
      stringLength: 'Bass: 77.5" | Treble: 6.4"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 8.5/10 — minor polished-ebony swirl marks, professionally buffed. Action: 9/10 — plays well, light regulation recommended. Soundboard: 10/10 — no cracks. Strings: 8.5/10 — original, slight aging in the mid-bass. A solid example at an accessible price point.",
    tags: [{ tag: 'value' }, { tag: 'home-grand' }],
  },

  // ─── STEINWAY A3 ──────────────────────────────────────────────
  {
    title: '2010 Steinway Model A3 — Satin Ebony',
    slug: 'steinway-a3-2010-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model A3',
    year: 2010,
    serialNumber: '584671',
    finish: 'Satin Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/products/steinway/870/Fluegel_A_Black_03.png',
    price: 71500,
    retailPrice: 108000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'4\" (193 cm)",
      length: "6'4\"",
      width: '57"',
      stringLength: 'Bass: 76" | Treble: 6.2"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9/10 — light use marks only. Action: 9.5/10 — recently serviced. Soundboard: 10/10 — full crown, no cracks. Strings: 9/10 — original, strong tone. An underappreciated model that represents excellent value.',
    tags: [{ tag: 'value' }, { tag: 'home-grand' }, { tag: 'single-owner' }],
  },

  // ─── STEINWAY A ───────────────────────────────────────────────
  {
    title: '2012 Steinway Model A — Polished Ebony',
    slug: 'steinway-a-2012-polished-ebony',
    brandSlug: 'steinway',
    model: 'Model A',
    year: 2012,
    serialNumber: '592344',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/products/steinway/870/Fluegel_A_Black_03.png',
    price: 77000,
    retailPrice: 112000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'2\" (188 cm)",
      length: "6'2\"",
      width: '57"',
      stringLength: 'Bass: 74" | Treble: 6.1"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — minor swirl marks in polished finish. Action: 10/10 — regulated 2023. Soundboard: 10/10 — no cracks, excellent crown. Strings: 9/10 — original, strong even tone. Excellent university faculty instrument from a climate-controlled home.",
    tags: [{ tag: 'professional' }, { tag: 'single-owner' }],
  },
  {
    title: '1997 Steinway Model A — Satin Ebony',
    slug: 'steinway-a-1997-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model A',
    year: 1997,
    serialNumber: '514087',
    finish: 'Satin Ebony',
    condition: 'reconditioned',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/products/steinway/870/Fluegel_A_Black_03.png',
    price: 54500,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'2\" (188 cm)",
      length: "6'2\"",
      width: '57"',
      stringLength: 'Bass: 74" | Treble: 6.1"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 8.5/10 — satin finish in good condition with minor bench wear. Action: 9/10 — regulation performed 2023, plays evenly. Soundboard: 9.5/10 — no cracks, slight crown reduction consistent with age. Strings: 8/10 — original, warm vintage tone. Excellent value for a Hamburg-era instrument.',
    tags: [{ tag: 'value' }, { tag: 'vintage' }, { tag: 'hamburg-era' }],
  },

  // ─── STEINWAY O ───────────────────────────────────────────────
  {
    title: '1975 Steinway Model O — Satin Ebony',
    slug: 'steinway-o-1975-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model O',
    year: 1975,
    serialNumber: '453218',
    finish: 'Satin Ebony',
    condition: 'rebuilt',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_O_Black_03.jpg',
    price: 44500,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'10¾\" (180 cm)",
      length: "5'10¾\"",
      width: '57"',
      stringLength: 'Bass: 71" | Treble: 5.9"',
      keys: 88,
    },
    conditionReport:
      'Full rebuild completed 2019 — new bass strings, new hammers, complete action regulation. Soundboard: 9/10 — refinished and repaired, no active cracks. Cabinet refinished 2019. A thoroughly restored vintage Steinway at a compelling price.',
    restorationHistory:
      'Full rebuild 2019: new bass strings, new Abel hammers, complete Renner action parts, soundboard refinish. Cabinet refinished in satin ebony.',
    tags: [{ tag: 'vintage' }, { tag: 'rebuilt' }, { tag: 'discontinued-model' }],
  },
  {
    title: '1963 Steinway Model O — Polished Ebony',
    slug: 'steinway-o-1963-polished-ebony',
    brandSlug: 'steinway',
    model: 'Model O',
    year: 1963,
    serialNumber: '415873',
    finish: 'Polished Ebony',
    condition: 'rebuilt',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_O_Black_03.jpg',
    price: 47000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'10¾\" (180 cm)",
      length: "5'10¾\"",
      width: '57"',
      stringLength: 'Bass: 71" | Treble: 5.9"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — refinished in polished ebony, excellent result. Action: 9.5/10 — complete Renner rebuild. Soundboard: 9/10 — original, healthy crown. Strings: 9.5/10 — new Röslau strings. Pre-CBS era Steinway with extraordinary tonal depth.",
    restorationHistory:
      'Comprehensive rebuild 2021: new Röslau strings, complete Renner action rebuild, new Abel hammers. Cabinet professionally refinished in polished ebony.',
    tags: [{ tag: 'vintage' }, { tag: 'rebuilt' }, { tag: 'collector' }, { tag: 'pre-1970' }],
  },

  // ─── STEINWAY M ───────────────────────────────────────────────
  {
    title: '2018 Steinway Model M — Polished Ebony',
    slug: 'steinway-m-2018-polished-ebony',
    brandSlug: 'steinway',
    model: 'Model M',
    year: 2018,
    serialNumber: '622087',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_M_Black_03.jpg',
    price: 62500,
    retailPrice: 90000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "5'7\" (170 cm)",
      length: "5'7\"",
      width: '57"',
      stringLength: 'Bass: 68" | Treble: 5.6"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9.5/10 — near-new condition. Action: 10/10 — Steinway-regulated 2024. Soundboard: 10/10 — no cracks, full crown. Strings: 10/10 — original, excellent tone. A pristine modern M from a single meticulous owner.',
    tags: [{ tag: 'featured' }, { tag: 'home-grand' }, { tag: 'single-owner' }],
  },
  {
    title: '2007 Steinway Model M — Satin Ebony',
    slug: 'steinway-m-2007-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model M',
    year: 2007,
    serialNumber: '574213',
    finish: 'Satin Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_M_Black_03.jpg',
    price: 48000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'7\" (170 cm)",
      length: "5'7\"",
      width: '57"',
      stringLength: 'Bass: 68" | Treble: 5.6"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 8.5/10 — normal satin finish wear, no damage. Action: 9/10 — plays well, regulation recommended. Soundboard: 10/10 — no cracks. Strings: 8.5/10 — original, warm tone typical of this era. A solid, well-priced home Steinway.',
    tags: [{ tag: 'value' }, { tag: 'home-grand' }],
  },
  {
    title: '1995 Steinway Model M — Polished Walnut',
    slug: 'steinway-m-1995-polished-walnut',
    brandSlug: 'steinway',
    model: 'Model M',
    year: 1995,
    serialNumber: '509841',
    finish: 'Polished Walnut',
    condition: 'reconditioned',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_M_Black_03.jpg',
    price: 37500,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'7\" (170 cm)",
      length: "5'7\"",
      width: '57"',
      stringLength: 'Bass: 68" | Treble: 5.6"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 8/10 — polished walnut in good condition, minor surface marks. Action: 9/10 — regulation completed 2023. Soundboard: 9.5/10 — original, no cracks. Strings: 8/10 — original, warm mellow tone. Rare walnut finish adds warmth to the room and the sound.',
    tags: [{ tag: 'walnut' }, { tag: 'rare-finish' }, { tag: 'home-grand' }],
  },

  // ─── HAMBURG STEINWAY S ───────────────────────────────────────
  {
    title: '2014 Hamburg Steinway S — Polished Ebony',
    slug: 'hamburg-steinway-s-2014-polished-ebony',
    brandSlug: 'steinway',
    model: 'Hamburg S',
    year: 2014,
    serialNumber: '603271',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_S_Black_03.jpg',
    price: 51500,
    retailPrice: 78000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'1\" (155 cm)",
      length: "5'1\"",
      width: '57"',
      stringLength: 'Bass: 61.5" | Treble: 5.1"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — excellent polished ebony. Action: 9.5/10 — Hamburg regulation, plays with characteristic European refinement. Soundboard: 10/10 — no cracks, original crown. Strings: 9.5/10 — original. A rare Hamburg-made S in the North American market.",
    tags: [{ tag: 'hamburg' }, { tag: 'european' }, { tag: 'rare' }],
  },

  // ─── STEINWAY S ───────────────────────────────────────────────
  {
    title: '2010 Steinway Model S — Satin Ebony',
    slug: 'steinway-s-2010-satin-ebony',
    brandSlug: 'steinway',
    model: 'Model S',
    year: 2010,
    serialNumber: '584932',
    finish: 'Satin Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_S_Black_03.jpg',
    price: 41500,
    retailPrice: 72000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'1\" (155 cm)",
      length: "5'1\"",
      width: '57"',
      stringLength: 'Bass: 61.5" | Treble: 5.1"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — excellent satin ebony. Action: 9.5/10 — recently regulated. Soundboard: 10/10 — no cracks, full crown. Strings: 9/10 — original. A well-maintained apartment Steinway in excellent condition.",
    tags: [{ tag: 'apartment-grand' }, { tag: 'compact' }],
  },
  {
    title: '2001 Steinway Model S — Polished Ebony',
    slug: 'steinway-s-2001-polished-ebony',
    brandSlug: 'steinway',
    model: 'Model S',
    year: 2001,
    serialNumber: '547823',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://eu.steinway.com/fileadmin/user_upload/Fluegel_S_Black_03.jpg',
    price: 34000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'1\" (155 cm)",
      length: "5'1\"",
      width: '57"',
      stringLength: 'Bass: 61.5" | Treble: 5.1"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 8/10 — minor swirl marks in polished ebony. Action: 8.5/10 — functions well, light regulation recommended. Soundboard: 9.5/10 — no cracks. Strings: 8/10 — original, mellow tone. An honest, well-priced S for the compact space.",
    tags: [{ tag: 'value' }, { tag: 'apartment-grand' }, { tag: 'compact' }],
  },

  // ─── BÖSENDORFER 214 CS ───────────────────────────────────────
  {
    title: '2016 Bösendorfer 214 CS — Polished Ebony',
    slug: 'bosendorfer-214cs-2016-polished-ebony',
    brandSlug: 'bosendorfer',
    model: '214 CS',
    year: 2016,
    serialNumber: '53487',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl:
      'https://www.boesendorfer.com/_Resources/Persistent/08da634b71cd148c007465b22dad07bcda8ee3a7/214%20von%20oben%20med%20res.jpg',
    price: 94000,
    retailPrice: 145000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "7'1\" (214 cm)",
      length: "7'1\"",
      width: '59"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9.5/10 — exceptional polished ebony, near-new. Action: 10/10 — Viennese regulation, exquisite feel. Soundboard: 10/10 — no cracks, Austrian spruce in full voice. Strings: 10/10 — original. A nearly new Bösendorfer at a substantial saving.",
    tags: [{ tag: 'austrian' }, { tag: 'viennese' }, { tag: 'professional' }],
  },

  // ─── BÖSENDORFER 225 ──────────────────────────────────────────
  {
    title: '2010 Bösendorfer 225 — Polished Ebony',
    slug: 'bosendorfer-225-2010-polished-ebony',
    brandSlug: 'bosendorfer',
    model: '225',
    year: 2010,
    serialNumber: '47821',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl:
      'https://www.boesendorfer.com/_Resources/Persistent/be16c2a43ecb5f6bc6ca16dbc1aaa98f631e9bca/grand%20piano%20225%20-%20top.png',
    price: 98000,
    retailPrice: 175000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "7'4\" (225 cm)",
      length: "7'4\"",
      width: '59"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — excellent original finish. Action: 9.5/10 — recently serviced by Bösendorfer technician. Soundboard: 10/10 — no cracks, superb Austrian spruce resonance. Strings: 9/10 — original Viennese wire, warm rich tone.",
    tags: [{ tag: 'austrian' }, { tag: 'viennese' }, { tag: 'single-owner' }],
  },

  // ─── C. BECHSTEIN B ───────────────────────────────────────────
  {
    title: '2018 C. Bechstein B 212 — Polished Ebony',
    slug: 'bechstein-b-2018-polished-ebony',
    brandSlug: 'bechstein',
    model: 'B 212',
    year: 2018,
    serialNumber: '203145',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl:
      'https://www.bechstein.com/fileadmin/user_upload/Bechstein/02_Fluegel_Klaviere/01_C_Bechstein/Concert_B-212/CB_C_B212_black-pol-2018.jpg',
    price: 78000,
    retailPrice: 118000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "7'0\" (212 cm)",
      length: "7'0\"",
      width: '58"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9.5/10 — near-new polished ebony. Action: 10/10 — Bechstein precision regulation, extraordinarily responsive. Soundboard: 10/10 — no cracks. Strings: 10/10 — original. Characteristic Bechstein analytical clarity at its finest.",
    tags: [{ tag: 'german' }, { tag: 'professional' }, { tag: 'single-owner' }],
  },
  {
    title: '2011 C. Bechstein B 212 — Satin Ebony',
    slug: 'bechstein-b-2011-satin-ebony',
    brandSlug: 'bechstein',
    model: 'B 212',
    year: 2011,
    serialNumber: '196532',
    finish: 'Satin Ebony',
    condition: 'used',
    stockImageUrl:
      'https://www.bechstein.com/fileadmin/user_upload/Bechstein/02_Fluegel_Klaviere/01_C_Bechstein/Concert_B-212/CB_C_B212_black-pol-2018.jpg',
    price: 61500,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "7'0\" (212 cm)",
      length: "7'0\"",
      width: '58"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — satin finish in very good condition. Action: 9.5/10 — recently serviced. Soundboard: 10/10 — no cracks, excellent resonance. Strings: 9/10 — original, clear focused tone. Outstanding value for a flagship Bechstein.",
    tags: [{ tag: 'german' }, { tag: 'professional' }, { tag: 'value' }],
  },

  // ─── BLÜTHNER MODEL 2 ─────────────────────────────────────────
  {
    title: '2007 Blüthner Model 2 — Polished Ebony',
    slug: 'bluthner-model-2-2007-polished-ebony',
    brandSlug: 'bluthner',
    model: 'Model 2',
    year: 2007,
    serialNumber: '183742',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl:
      'https://bluthner.co.uk/assets/img/pianos/models/bluthner-classic/bluthner-model-2-piano-black-lrg.jpg',
    price: 51000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'3\" (193 cm)",
      length: "6'3\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — excellent polished ebony. Action: 9/10 — plays well, light regulation noted. Soundboard: 10/10 — no cracks, aliquot strings singing beautifully. The harmonic warmth of the Blüthner aliquot system is intact and impressive.",
    tags: [{ tag: 'german' }, { tag: 'aliquot' }, { tag: 'warm-tone' }, { tag: 'leipzig' }],
  },

  // ─── SHIGERU KAWAI SK-6 ───────────────────────────────────────
  {
    title: '2018 Shigeru Kawai SK-6 — Polished Ebony',
    slug: 'shigeru-kawai-sk6-2018-polished-ebony',
    brandSlug: 'shigeru-kawai',
    model: 'SK-6',
    year: 2018,
    serialNumber: 'SK618042',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://www.kawai-global.com/mgr/wp-content/uploads/2015/08/SK-6_top_pc_2022.jpg',
    price: 68000,
    retailPrice: 115000,
    isAvailable: true,
    isFeatured: true,
    specifications: {
      size: "7'0\" (212 cm)",
      length: "7'0\"",
      width: '58"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9.5/10 — excellent polished ebony. Action: 10/10 — Renner action in perfect regulation, extraordinary feel. Soundboard: 10/10 — premium European spruce, no defects. Strings: 10/10 — original Röslau wire.',
    tags: [{ tag: 'japanese' }, { tag: 'renner' }, { tag: 'professional' }, { tag: 'excellent-value' }],
  },

  // ─── SHIGERU KAWAI SK-3 ───────────────────────────────────────
  {
    title: '2016 Shigeru Kawai SK-3 — Polished Ebony',
    slug: 'shigeru-kawai-sk3-2016-polished-ebony',
    brandSlug: 'shigeru-kawai',
    model: 'SK-3',
    year: 2016,
    serialNumber: 'SK316423',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://www.kawai-global.com/mgr/wp-content/uploads/2015/08/SK-3_top_pc_2022.jpg',
    price: 47500,
    retailPrice: 82000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'2\" (188 cm)",
      length: "6'2\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9.5/10 — near-new polished ebony. Action: 10/10 — Renner action in excellent condition. Soundboard: 10/10 — premium spruce. Strings: 9.5/10 — original. Competes directly with Steinway A at 40% less.',
    tags: [{ tag: 'japanese' }, { tag: 'renner' }, { tag: 'excellent-value' }],
  },

  // ─── SHIGERU KAWAI SK-2 ───────────────────────────────────────
  {
    title: '2019 Shigeru Kawai SK-2 — Polished Ebony',
    slug: 'shigeru-kawai-sk2-2019-polished-ebony',
    brandSlug: 'shigeru-kawai',
    model: 'SK-2',
    year: 2019,
    serialNumber: 'SK219327',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://www.kawai-global.com/mgr/wp-content/uploads/2015/11/SK-2_top_pc_2022.jpg',
    price: 37500,
    retailPrice: 68000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'11\" (180 cm)",
      length: "5'11\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9.5/10 — virtually new. Action: 10/10 — Renner action, precision regulation. Soundboard: 10/10 — premium European spruce. Strings: 10/10 — original. World-class Shigeru craftsmanship in a home-friendly format.",
    tags: [{ tag: 'japanese' }, { tag: 'renner' }, { tag: 'home-grand' }, { tag: 'excellent-value' }],
  },

  // ─── PETROF 173 BREEZE ────────────────────────────────────────
  {
    title: '2017 Petrof P173 Breeze — Polished Ebony',
    slug: 'petrof-173-breeze-2017-polished-ebony',
    brandSlug: 'petrof',
    model: 'P173 Breeze',
    year: 2017,
    serialNumber: 'P17317841',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'http://www.petrof.com/data/filecache/cc/DSC_4913-Breeze-final_mensi_1.jpg',
    price: 27500,
    retailPrice: 42000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'8\" (173 cm)",
      length: "5'8\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9/10 — excellent polished ebony. Action: 9.5/10 — recently serviced. Soundboard: 10/10 — Czech spruce, no cracks. Strings: 9.5/10 — original. Warm Central European tone at a compelling price.',
    tags: [{ tag: 'european' }, { tag: 'czech' }, { tag: 'value' }],
  },

  // ─── PETROF 194 STORM ─────────────────────────────────────────
  {
    title: '2015 Petrof P194 Storm — Polished Ebony',
    slug: 'petrof-194-storm-2015-polished-ebony',
    brandSlug: 'petrof',
    model: 'P194 Storm',
    year: 2015,
    serialNumber: 'P19415632',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'http://www.petrof.com/data/filecache/18/P-194-Storm_5.jpg',
    price: 37500,
    retailPrice: 58000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'4\" (194 cm)",
      length: "6'4\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9/10 — very good polished ebony. Action: 9.5/10 — well-maintained. Soundboard: 10/10 — Czech spruce, strong resonance. Strings: 9/10 — original. Recital-capable Czech craftsmanship at an accessible price.',
    tags: [{ tag: 'european' }, { tag: 'czech' }, { tag: 'professional' }, { tag: 'value' }],
  },

  // ─── PETROF 210 PASAT ─────────────────────────────────────────
  {
    title: '2013 Petrof P210 Pasat — Polished Ebony',
    slug: 'petrof-210-pasat-2013-polished-ebony',
    brandSlug: 'petrof',
    model: 'P210 Pasat',
    year: 2013,
    serialNumber: 'P21013214',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'http://www.petrof.com/data/filecache/13/P-210-Pasat_3.jpg',
    price: 47000,
    retailPrice: 72000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'10\" (210 cm)",
      length: "6'10\"",
      width: '58"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9/10 — good polished ebony with minor polishing marks. Action: 9.5/10 — plays with characteristic Petrof expressiveness. Soundboard: 10/10 — Czech spruce, excellent resonance. Strings: 9/10 — original. The finest Petrof grand — extraordinary value.',
    tags: [{ tag: 'european' }, { tag: 'czech' }, { tag: 'professional' }, { tag: 'value' }],
  },

  // ─── KAYSERBURG KA160 ─────────────────────────────────────────
  {
    title: '2020 Kayserburg KA160 — Polished Ebony',
    slug: 'kayserburg-ka160-2020-polished-ebony',
    brandSlug: 'kayserburg',
    model: 'KA160',
    year: 2020,
    serialNumber: 'KB1600128',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl:
      'https://kayserburgusa.com/wp-content/uploads/elementor/thumbs/Kay_Portfolio-KA160-oqryzn0knfaowpyv0drs3sn4d5wm4tg2jn9m89ewpw.jpg',
    price: 22000,
    retailPrice: 36000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'3\" (160 cm)",
      length: "5'3\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9.5/10 — excellent near-new condition. Action: 10/10 — Renner action, exceptional for the price category. Soundboard: 10/10 — Sitka spruce. Strings: 10/10 — Röslau wire. World-class components, practically new.',
    tags: [{ tag: 'chinese' }, { tag: 'renner' }, { tag: 'value' }, { tag: 'near-new' }],
  },

  // ─── YAMAHA C7 ────────────────────────────────────────────────
  {
    title: '2012 Yamaha C7 — Polished Ebony',
    slug: 'yamaha-c7-2012-polished-ebony',
    brandSlug: 'yamaha',
    model: 'C7',
    year: 2012,
    serialNumber: 'C75624831',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'https://www.yamaha.com/us/pianos/images/c7x.jpg',
    price: 44500,
    retailPrice: 82000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "7'6\" (227 cm)",
      length: "7'6\"",
      width: '60"',
      keys: 88,
    },
    conditionReport:
      'Cabinet: 9/10 — excellent polished ebony. Action: 9.5/10 — recently regulated. Soundboard: 10/10 — Yamaha spruce, no cracks. Strings: 9/10 — original, brilliant Yamaha tone. The most recorded professional grand ever made.',
    tags: [{ tag: 'japanese' }, { tag: 'studio' }, { tag: 'professional' }, { tag: 'recording' }],
  },

  // ─── WENDL & LUNG W162 ────────────────────────────────────────
  {
    title: '2015 Wendl & Lung W162 — Polished Ebony',
    slug: 'wendl-lung-w162-2015-polished-ebony',
    brandSlug: 'wendl-lung',
    model: 'W162',
    year: 2015,
    serialNumber: 'WL1621502',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'http://wl-piano.com/uploadfile/2016/0725/20160725052720982.png',
    price: 27500,
    retailPrice: 44000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'4\" (162 cm)",
      length: "5'4\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9/10 — excellent polished ebony. Action: 9.5/10 — Viennese regulation, responsive. Soundboard: 10/10 — Austrian spruce. Strings: 9.5/10 — original. The Viennese warmth in an apartment-friendly format.",
    tags: [{ tag: 'austrian' }, { tag: 'viennese' }, { tag: 'compact' }, { tag: 'value' }],
  },

  // ─── WENDL & LUNG W218 ────────────────────────────────────────
  {
    title: '2017 Wendl & Lung W218 — Polished Ebony',
    slug: 'wendl-lung-w218-2017-polished-ebony',
    brandSlug: 'wendl-lung',
    model: 'W218',
    year: 2017,
    serialNumber: 'WL2181704',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl: 'http://wl-piano.com/uploadfile/2016/0726/20160726014712863.png',
    price: 51500,
    retailPrice: 85000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "7'2\" (218 cm)",
      length: "7'2\"",
      width: '59"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9.5/10 — excellent polished ebony. Action: 10/10 — Viennese regulation, extraordinary lyrical response. Soundboard: 10/10 — Austrian spruce. Strings: 9.5/10 — original. Full Viennese voice — substantially undervalued vs. comparable Bösendorfer.",
    tags: [{ tag: 'austrian' }, { tag: 'viennese' }, { tag: 'professional' }, { tag: 'value' }],
  },

  // ─── BRODMANN PE162 ───────────────────────────────────────────
  {
    title: '2019 Brodmann PE162 — Polished Ebony',
    slug: 'brodmann-pe162-2019-polished-ebony',
    brandSlug: 'brodmann',
    model: 'PE162',
    year: 2019,
    serialNumber: 'BD1621934',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl:
      'https://www.brodmannpianousa.com/sites/default/files/styles/550_x_550/public/catalogimages/PE162A-1000.jpg',
    price: 18000,
    retailPrice: 28000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "5'4\" (162 cm)",
      length: "5'4\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9.5/10 — near-new condition. Action: 9.5/10 — plays well with musical responsiveness. Soundboard: 10/10 — excellent. Strings: 10/10 — original. Austrian-designed professional instrument at an entry-level price.",
    tags: [{ tag: 'austrian-design' }, { tag: 'value' }, { tag: 'compact' }],
  },

  // ─── BRODMANN PE187 ───────────────────────────────────────────
  {
    title: '2018 Brodmann PE187 — Polished Ebony',
    slug: 'brodmann-pe187-2018-polished-ebony',
    brandSlug: 'brodmann',
    model: 'PE187',
    year: 2018,
    serialNumber: 'BD1871822',
    finish: 'Polished Ebony',
    condition: 'used',
    stockImageUrl:
      'https://www.brodmannpianousa.com/sites/default/files/styles/550_x_550/public/catalogimages/PE187H-1000.jpg',
    price: 23500,
    retailPrice: 36000,
    isAvailable: true,
    isFeatured: false,
    specifications: {
      size: "6'2\" (187 cm)",
      length: "6'2\"",
      width: '57"',
      keys: 88,
    },
    conditionReport:
      "Cabinet: 9.5/10 — excellent polished ebony. Action: 9.5/10 — well-regulated, musical feel. Soundboard: 10/10 — strong resonance. Strings: 10/10 — original. A genuine 6'2\" grand with Austrian character at an accessible price.",
    tags: [{ tag: 'austrian-design' }, { tag: 'value' }, { tag: 'home-grand' }],
  },
]

export async function seedPianos(payload: Payload): Promise<{ created: number; skipped: number }> {
  let created = 0
  let skipped = 0

  for (const piano of SAMPLE_PIANOS) {
    const existing = await payload.find({
      collection: 'pianos',
      where: { slug: { equals: piano.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`Piano "${piano.slug}" already exists — skipping.`)
      skipped++
      continue
    }

    const brandResult = await payload.find({
      collection: 'brands',
      where: { slug: { equals: piano.brandSlug } },
      limit: 1,
    })

    const brandId = brandResult.docs[0]?.id

    const { brandSlug: _b, ...pianoData } = piano

    await payload.create({
      collection: 'pianos',
      draft: true,
      data: {
        ...pianoData,
        ...(brandId ? { brand: brandId } : {}),
        _status: 'draft',
      },
    })

    payload.logger.info(`Created piano: ${piano.title}`)
    created++
  }

  return { created, skipped }
}
