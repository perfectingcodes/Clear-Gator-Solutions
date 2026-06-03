/**
 * City catalog — used to generate /service-areas/[slug] pages.
 *
 * Voice note: write what's actually true about each city. Real neighborhoods,
 * common project types, weather realities. If you don't know something specific,
 * leave it out rather than make it up.
 */

export type CityContent = {
  slug: string;
  /** Full city display name */
  name: string;
  /** State abbrev for headlines */
  state: string;
  /** County or region for context */
  county: string;
  /** SEO */
  title: string;
  description: string;
  /** 1-sentence lede above the headline */
  category: string;
  /** Opening pitch — keep specific and short */
  lede: string;
  /** Longer narrative — local context for SEO + humans */
  intro: string[];
  /** Common project types / customers */
  commonWork: { label: string; detail: string }[];
  /** Notable neighborhoods or areas served — proves we know the place */
  neighborhoods: string[];
  /** What sets us apart in this market */
  reasons: { title: string; body: string }[];
  /** Hand-written FAQ specific to local concerns */
  faq: { q: string; a: string }[];
  /** Anchor stats for the hero strip */
  stats: { value: string; label: string }[];
};

export const CITIES: CityContent[] = [
  {
    slug: "cape-coral",
    name: "Cape Coral",
    state: "FL",
    county: "Lee County",
    title: "Demolition, Hauling & Property Services in Cape Coral, FL",
    description:
      "Local Cape Coral demolition, hauling, site cleanup, lot clearing, and property maintenance. Licensed and insured, serving every Cape Coral neighborhood from Pelican to Burnt Store.",
    category: "Home Base · Lee County",
    lede:
      "Cape Coral is where we work most weeks. Canal lots, builder spec homes, hurricane recovery, the whole catalog.",
    intro: [
      "Cape Coral is the largest city in Lee County by area, with hundreds of miles of canals and one of the most active residential construction markets in Florida. We grew up working it.",
      "Most weeks we're moving between active builds south of Pine Island Road, gulf-access teardowns near the Yacht Club, and storm cleanup wherever the last front pushed through. We know the gate widths, the canal-side access limits, and which neighborhoods care most about which permits.",
    ],
    commonWork: [
      { label: "Canal-Front Pool Demo", detail: "Old gunite pools on canal lots ahead of a rebuild or a buyer-driven removal. Access is the constraint, not the breaking." },
      { label: "Full Interior Gut-Outs", detail: "1970s and 80s ranch homes inland — full strip-down ahead of major renovations." },
      { label: "New-Build Cleanup",     detail: "Post-construction final cleans for spec builders south of Pine Island, and rolling cleanup for active GCs." },
      { label: "Hurricane Cleanup",     detail: "Yard debris, downed fences, broken pool screens. We run heavy after named storms." },
      { label: "Vacant Lot Clearing",   detail: "Overgrown lots that haven't been touched since the buyer bought them. Brush, palmetto, fence-line invasives." },
    ],
    neighborhoods: [
      "Yacht Club", "Pelican", "Cape Harbour", "Tarpon Point", "Sands", "Hancock", "Burnt Store", "Mariner", "Caloosahatchee", "Trafalgar", "Coral Lakes",
    ],
    reasons: [
      { title: "We work this city every week",  body: "Cape Coral is the bulk of our weekly run. We know the dump schedules, the city permitting quirks, and what the protected tree list looks like." },
      { title: "Canal-access expertise",         body: "Working on water-front lots is different. We bring equipment that fits between the seawall and the house without taking out your dock." },
      { title: "Storm-season ready",             body: "Hurricane response is what we're known for here. Call us early in the recovery window — schedule fills fast." },
    ],
    faq: [
      { q: "Do I need a permit to remove a tree in Cape Coral?",
        a: "Depends on the species and size. Cape Coral has a protected tree list and a permit process for anything qualifying. We'll tell you what we see at the lot walk — the actual permit is yours or your GC's." },
      { q: "Can you fill in my canal-side pool?",
        a: "Yes. Canal-front pool fill-ins are routine for us. Pool fill-ins in Cape Coral generally require a permit; we'll guide you through what's needed." },
      { q: "How fast can you start in Cape Coral?",
        a: "Often same week. Cape Coral is on our regular route — you're not waiting on a crew getting routed from out of town." },
      { q: "Do you take credit cards?",
        a: "Yes — credit, ACH, check. Property managers and GCs typically run on net-15." },
    ],
    stats: [
      { value: "Local",  label: "headquarters" },
      { value: "Weekly", label: "active route" },
      { value: "24-hour", label: "quote turnaround" },
    ],
  },

  {
    slug: "fort-myers",
    name: "Fort Myers",
    state: "FL",
    county: "Lee County",
    title: "Demolition & Property Services in Fort Myers, FL",
    description:
      "Fort Myers demolition, hauling, site cleanup, lot clearing, and property maintenance from Downtown River District through McGregor and East Fort Myers.",
    category: "Lee County",
    lede:
      "From the River District up McGregor to East Fort Myers — we work this city like it's home, because it nearly is.",
    intro: [
      "Fort Myers is the working capital of Southwest Florida. We work it weekly — historic downtown adaptive-reuse projects, McGregor Boulevard renovations, commercial fit-outs along Cleveland, and post-construction final cleans for builders working east of I-75.",
      "Older Fort Myers homes have history, which means surprises in the walls. We've pulled enough plaster, original tile, and 1950s wiring to know how to scope it honestly.",
    ],
    commonWork: [
      { label: "Historic Home Demo", detail: "Selective interior demo on McGregor and downtown Craftsman / Mid-Century homes. We protect what's worth keeping." },
      { label: "Commercial Fit-Outs", detail: "Strip-outs of dated office and retail space along Cleveland, Daniels, and Colonial corridors." },
      { label: "Post-Construction Cleanups", detail: "New-build final cleans east of I-75 for spec and semi-custom builders." },
      { label: "Property Maintenance",        detail: "Rental turnovers and routine maintenance for landlords across the city." },
    ],
    neighborhoods: [
      "Downtown River District", "Edison Park", "McGregor", "Dean Park", "Fort Myers Shores", "East Fort Myers", "Whiskey Creek", "San Carlos Park",
    ],
    reasons: [
      { title: "Old houses, real estimates",  body: "Plaster, 1950s wiring, original tile beds — we've seen it. We scope what's actually in the walls, not what we hope is there." },
      { title: "Commercial-comfortable",       body: "We coordinate with property managers, COI for landlords, after-hours work when the storefront needs to stay open." },
      { title: "Tight downtown access",        body: "Loading from a one-way street with a parking meter is a different job. We figure it out." },
    ],
    faq: [
      { q: "Will you work after hours for a retail space?",
        a: "Yes — overnight and weekend work for commercial spaces is normal for us. We'll quote it." },
      { q: "Can you handle a historic property carefully?",
        a: "Yes. We've done selective demo on McGregor and downtown historic homes. We protect what's salvageable and pull what's actually coming out." },
      { q: "Do you do new-build cleanups east of I-75?",
        a: "Routinely. We're contracted with several semi-custom and spec builders on that side." },
    ],
    stats: [
      { value: "Weekly", label: "on-route city" },
      { value: "Insured", label: "COI on file" },
      { value: "Same-week", label: "common start" },
    ],
  },

  {
    slug: "naples",
    name: "Naples",
    state: "FL",
    county: "Collier County",
    title: "Demolition & Cleanup Services in Naples, FL",
    description:
      "Naples interior and outdoor demolition, hauling, post-construction cleanup, lot clearing, and property maintenance. From Old Naples to Pelican Bay and Vineyards.",
    category: "Collier County",
    lede:
      "Naples standards are exacting. We work to them — quiet trucks, neat job sites, COI for the gated communities.",
    intro: [
      "Naples is where finish standards run highest in Southwest Florida. We work most weeks across Old Naples, Pelican Bay, Park Shore, and the gated communities east of Goodlette-Frank.",
      "The Naples job runs differently. Gated-community COIs, HOA notice timelines, and a finished-surface standard that's tighter than most of the region. We slow down for it and price accordingly — and the result speaks for itself when the buyers walk through.",
    ],
    commonWork: [
      { label: "Estate Renovation Demo", detail: "Selective interior demo for major estate renovations across Old Naples and Port Royal area." },
      { label: "Gated Community Cleanups", detail: "Post-construction finals for builders working in Pelican Bay, Mediterra, Vineyards, etc." },
      { label: "Pool Conversions", detail: "Outdated pool tear-outs ahead of design-build rebuilds." },
      { label: "Property Maintenance for Seasonal Homes", detail: "Off-season repairs, painting, and turnovers for snowbird-owned properties." },
    ],
    neighborhoods: [
      "Old Naples", "Aqualane Shores", "Port Royal", "Pelican Bay", "Park Shore", "Vineyards", "Mediterra", "Quail Creek", "Pine Ridge",
    ],
    reasons: [
      { title: "Gated-community ready",   body: "COI to your community manager, gate-pass coordination, HOA notice — we run that paperwork without you babysitting." },
      { title: "Finish-grade standards",   body: "Naples buyers notice the details. We do too. Trim lines, paint lines, the things that should look like nothing happened." },
      { title: "Seasonal turnover scheduled around you", body: "Off-season repairs, owner-arrival prep, and turnover work for second-home owners." },
    ],
    faq: [
      { q: "Do you have insurance certificates ready for gated communities?",
        a: "Yes. Send us your community manager's contact — we'll have the COI in their inbox before your gate-pass goes in." },
      { q: "Will you coordinate with my design-build firm?",
        a: "Routinely. We work alongside several Naples design-build firms on selective demo and final cleanups." },
      { q: "Can you work while we're away for the season?",
        a: "Yes. We update with photos and walk-throughs. Owners absent from May–October is normal." },
    ],
    stats: [
      { value: "Gated", label: "community-ready COIs" },
      { value: "Finish", label: "grade standards" },
      { value: "Seasonal", label: "scheduling" },
    ],
  },

  {
    slug: "bonita-springs",
    name: "Bonita Springs",
    state: "FL",
    county: "Lee County",
    title: "Demolition & Property Services in Bonita Springs, FL",
    description:
      "Bonita Springs hauling, demolition, cleanup, and property maintenance. Bonita Bay, Pelican Landing, and Old Bonita — we work the whole footprint.",
    category: "Lee County · Estero corridor",
    lede:
      "Bonita Springs sits between Naples and Fort Myers and gets the best of both. We work it like a regular stop.",
    intro: [
      "Bonita Springs covers everything from Old Bonita's downtown core out to Bonita Bay and the gulf-side neighborhoods. The mix is wide — golf communities, beach cottages, mainland single-family, and the rental stock east of I-75.",
      "Our typical Bonita week mixes Bonita Bay community work (with the COI paperwork that comes with it), Old Bonita renovation demo, and ongoing maintenance for the rental and short-term-stay properties scattered through the area.",
    ],
    commonWork: [
      { label: "Bonita Bay Coordination", detail: "Post-construction finals and selective demo inside Bonita Bay and Pelican Landing. Community-manager coordination handled." },
      { label: "Old Bonita Renovation Demo", detail: "Older single-family stripped for major renovations. We watch for the surprises in 1970s-built homes." },
      { label: "Vacation Rental Maintenance", detail: "Painting, drywall patches, fixture swaps, and post-stay touch-ups for short-term rental owners." },
      { label: "Beach-Lot Cleanup",          detail: "Storm debris, sand-blown vegetation, fence replacement debris from the gulf-side properties." },
    ],
    neighborhoods: [
      "Bonita Bay", "Pelican Landing", "Old Bonita Springs", "Bonita Beach", "Bonita Farms", "Worthington", "Hawthorne", "Spanish Wells",
    ],
    reasons: [
      { title: "Community-ready", body: "Bonita Bay and Pelican Landing protocol locked in. COI, gate-pass, on-site contact — we run it." },
      { title: "Short-term-rental friendly", body: "Same-week turnaround for touch-ups between guests is our routine." },
      { title: "Beach-area savvy", body: "We know what salt air does to job-site materials and we work accordingly." },
    ],
    faq: [
      { q: "Do you do Bonita Bay community work?",
        a: "Yes — regularly. We have COI and contractor protocols dialed in for the community-managed work." },
      { q: "Can you handle a same-day turnover touch-up?",
        a: "Same-week, yes. Same-day depends on schedule — call us; if we're open, we'll make it work." },
    ],
    stats: [
      { value: "Bi-weekly", label: "on-route city" },
      { value: "Gated", label: "ready COIs" },
      { value: "Same-week", label: "turnaround" },
    ],
  },

  {
    slug: "punta-gorda",
    name: "Punta Gorda",
    state: "FL",
    county: "Charlotte County",
    title: "Demolition & Cleanup Services in Punta Gorda, FL",
    description:
      "Punta Gorda demolition, hauling, lot clearing, and property maintenance. Punta Gorda Isles, Burnt Store, and Charlotte Harbor properties.",
    category: "Charlotte County",
    lede:
      "Punta Gorda is canal country and old Florida charm — and we work it both ways.",
    intro: [
      "Punta Gorda sits on Charlotte Harbor and runs from the historic downtown out through Punta Gorda Isles and Burnt Store. It's a market of canal-front homes, retirement renovations, and seasonal property owners.",
      "We work Punta Gorda about every other week — canal-side pool demos, owner-renovation gut-outs in PGI, and routine maintenance for the snowbird-heavy second-home market.",
    ],
    commonWork: [
      { label: "Canal-Front Pool Demo", detail: "Punta Gorda Isles pool removals and conversions. Access via the canal side when the gate won't take equipment." },
      { label: "Seasonal Home Maintenance", detail: "Owner-absent repair and painting, scheduled around season returns." },
      { label: "Renovation Demo",       detail: "Interior gut-outs for the long-running renovation market in PGI and Burnt Store." },
      { label: "Hurricane Recovery",    detail: "Charlotte County was hit hard in recent storms — we still respond fast for repairs and debris." },
    ],
    neighborhoods: [
      "Punta Gorda Isles (PGI)", "Burnt Store Isles", "Historic Downtown", "Burnt Store Marina", "Charlotte Harbor", "Deep Creek",
    ],
    reasons: [
      { title: "Canal-side equipment", body: "We come from the canal side when the front gate doesn't allow tracked equipment." },
      { title: "Hurricane-zone aware", body: "We know Charlotte County's post-storm permitting realities and FEMA timelines." },
      { title: "Seasonal owner friendly", body: "Communication for absent owners, photo updates, scheduled around your travel." },
    ],
    faq: [
      { q: "Can you respond after a hurricane?",
        a: "Yes. Charlotte County is in our storm-response area. Call early — we work the order we hear from people." },
      { q: "Do you work owner-absent?",
        a: "Often. We update with photos, schedule around your return, and bill on completion." },
    ],
    stats: [
      { value: "Bi-weekly", label: "on-route" },
      { value: "Storm-ready", label: "response area" },
      { value: "Canal-access", label: "experience" },
    ],
  },

  {
    slug: "sanibel-island",
    name: "Sanibel Island",
    state: "FL",
    county: "Lee County",
    title: "Demolition & Property Services on Sanibel Island, FL",
    description:
      "Sanibel Island demolition, hauling, lot clearing, and property maintenance. Hurricane recovery, building elevations, and post-rebuild cleanup.",
    category: "Lee County · Barrier Island",
    lede:
      "Sanibel is in a long rebuild. We've been on the island for it.",
    intro: [
      "Sanibel Island took the worst of Hurricane Ian and the rebuild is ongoing. We've worked the island through it — debris hauling, structure demolition, lot clearing, and post-rebuild cleanups for owners and contractors restoring properties.",
      "Working Sanibel is logistics-heavy. Causeway access, conservation rules, narrow island roads, and a finish-line standard set by the resort properties. We schedule accordingly and price honestly for the extra coordination.",
    ],
    commonWork: [
      { label: "Storm Debris & Structure Removal", detail: "Houses too far gone to repair, slabs needing removal, accumulated storm debris on private lots." },
      { label: "Lot Clearing for Rebuild",         detail: "Site prep for elevated new construction." },
      { label: "Construction Cleanup",             detail: "Final cleans for the new builds going up across the island." },
      { label: "Resort & Vacation Rental Maintenance", detail: "Maintenance and repair for rental-managed properties." },
    ],
    neighborhoods: [
      "East End", "Mid-Island", "West End", "Captiva Drive corridor", "Beach Cottages district",
    ],
    reasons: [
      { title: "Causeway logistics", body: "We plan loads around the causeway and dump schedules so we're not sitting in line." },
      { title: "Sanibel-specific rules", body: "Conservation-aware. We know what stays and what goes when working an island lot." },
      { title: "Rebuild-era familiar", body: "We've worked Sanibel through Ian and after. The crew knows the island." },
    ],
    faq: [
      { q: "Are you island-ready?",
        a: "Yes. We've worked Sanibel since the storm. Causeway access, dump logistics, conservation rules — handled." },
      { q: "How long do projects take with island logistics?",
        a: "Typically 30–50% longer than the same job mainland. We quote you the real timeline up front." },
    ],
    stats: [
      { value: "Causeway-ready", label: "scheduling" },
      { value: "Rebuild-era", label: "experience" },
      { value: "Conservation", label: "aware" },
    ],
  },

  {
    slug: "babcock-ranch",
    name: "Babcock Ranch",
    state: "FL",
    county: "Charlotte County",
    title: "Construction & Property Services in Babcock Ranch, FL",
    description:
      "Babcock Ranch new-build cleanup, hauling, lot clearing, and property maintenance for one of America's first solar-powered planned communities.",
    category: "Charlotte County · Planned Community",
    lede:
      "Babcock Ranch is one of the fastest-growing planned communities in the country. We're routine here.",
    intro: [
      "Babcock Ranch is a master-planned community that grew faster than almost anyone expected — and stayed working during recent storms when the rest of the area didn't. We work it weekly for builders running active homesites and homeowners settling in.",
      "Most of our Babcock work is post-construction cleanup for builders and rolling property maintenance for the homeowners moving in. Community standards are tight, scheduling is predictable, and the work runs clean.",
    ],
    commonWork: [
      { label: "New-Build Final Cleans", detail: "Move-in standard cleanups for the active builder pool across all sections." },
      { label: "Active-Build Site Cleanup", detail: "Rolling cleanups during construction to keep sites tidy for inspections." },
      { label: "Homeowner Move-In Prep",    detail: "Touch-ups, paint corrections, and the punch lists that follow new-home delivery." },
      { label: "Maintenance Schedules",    detail: "Routine paint, drywall, and trim repairs for homeowners settling in." },
    ],
    neighborhoods: [
      "Lake Babcock", "Trail's Edge", "Edgewater", "Parkside", "Babcock Square (commercial)",
    ],
    reasons: [
      { title: "Builder-rotation regular", body: "We're on the route with several Babcock builders for rolling and final cleanups." },
      { title: "Community-standard aware", body: "Babcock has design standards and we work to them." },
      { title: "Predictable schedule",      body: "Babcock work runs on time. We schedule weekly and stick to it." },
    ],
    faq: [
      { q: "Do you work for the builders here?",
        a: "Yes — for several of them. If you're a new-build buyer, ask your builder if we're on their rotation." },
      { q: "Can you do my settle-in punch list?",
        a: "Absolutely. We work directly with homeowners on the standard 90-day post-close fix list." },
    ],
    stats: [
      { value: "Weekly", label: "on-route" },
      { value: "Builder", label: "rotation" },
      { value: "Move-in", label: "ready cleanups" },
    ],
  },

  {
    slug: "st-james-city",
    name: "St. James City",
    state: "FL",
    county: "Lee County",
    title: "Demolition & Property Services in St. James City, FL",
    description:
      "St. James City on Pine Island — demolition, hauling, lot clearing, hurricane debris, and property maintenance for the islands.",
    category: "Lee County · Pine Island",
    lede:
      "Pine Island. St. James City. Old Florida — and we know how to work it.",
    intro: [
      "St. James City sits at the south end of Pine Island, which is its own kind of working environment. Narrow roads, water access, fishing-village pace, and a real concern about working with neighbors not against them.",
      "We work St. James City and the broader Pine Island regularly — canal property cleanups, post-storm debris, light demo for renovations, and the maintenance work that comes with weekend cabins and full-time waterfront homes.",
    ],
    commonWork: [
      { label: "Canal Property Cleanup",   detail: "Storm debris, downed vegetation, fence section runs along the canal-front." },
      { label: "Storm Debris Removal",     detail: "Pine Island sits exposed. After named storms, we're on-island fast." },
      { label: "Renovation Demo",          detail: "Light interior demo for the older cottage stock undergoing renovation." },
      { label: "Property Maintenance",     detail: "Paint, drywall, trim, and routine fixes for weekend and full-time owners." },
    ],
    neighborhoods: [
      "St. James City", "Bokeelia", "Pineland", "Pine Island Center", "Cherry Estates",
    ],
    reasons: [
      { title: "Island access",       body: "We know which boat ramps work for material runs when the bridge route doesn't fit the load." },
      { title: "Storm fast",          body: "Pine Island gets exposed. We push to be on-island in the first response window." },
      { title: "Neighbor-conscious",  body: "Pine Island still feels like a small community. We work that way — quiet hours, clean job sites, manners." },
    ],
    faq: [
      { q: "Do you serve all of Pine Island?",
        a: "Yes — St. James City, Pine Island Center, Bokeelia, Pineland. Whole island." },
      { q: "Can you do storm response on Pine Island?",
        a: "Yes. We work island-side post-storm. Call early in the recovery window." },
    ],
    stats: [
      { value: "Island", label: "on-route" },
      { value: "Storm-fast", label: "response" },
      { value: "Boat-aware", label: "logistics" },
    ],
  },
];

export function getCity(slug: string): CityContent | undefined {
  return CITIES.find((c) => c.slug === slug);
}
