/**
 * Service catalog — used to generate the /services/[slug] pages and to seed
 * structured data, meta tags, and the landing-page cards.
 *
 * Voice note for whoever edits this file: write like a working construction
 * crew talking to a customer at a job site, not like a marketing landing page.
 * Specific over vague. Real units (sq ft, yards, days) where it makes sense.
 */

export type ServiceFAQ = { q: string; a: string };

export type ServiceContent = {
  slug: string;
  /** Canonical service name (matches landing card title and SERVICE_TYPES) */
  name: string;
  /** Hero overline tag */
  category: string;
  /** Lucide icon name — resolved in the page component */
  icon: "Hammer" | "Construction" | "Truck" | "HardHat" | "TreePine" | "Wrench";
  /** Brand accent group */
  accent: "orange" | "green";
  /** SEO */
  title: string;
  description: string;
  /** Short above-the-fold sales pitch (1–2 sentences) */
  lede: string;
  /** Longer narrative paragraph(s) — keep humane */
  intro: string[];
  /** What we actually do (specific scope items, not generic adjectives) */
  scope: { label: string; detail: string }[];
  /** How the job runs from first call to drive-off */
  process: { step: string; title: string; detail: string }[];
  /** Why we earn the work for this specific service */
  reasons: { title: string; body: string }[];
  /** Things we don't do — sets honest expectations */
  doNot?: string[];
  /** Schema-friendly FAQ */
  faq: ServiceFAQ[];
  /** Anchor stats — keep factual */
  stats: { value: string; label: string }[];
};

export const SERVICES: ServiceContent[] = [
  {
    slug: "interior-demolition",
    name: "Interior Demolition",
    category: "Non-Structural Demo",
    icon: "Hammer",
    accent: "orange",
    title: "Interior Demolition in Southwest Florida — Clear Gator",
    description:
      "Non-structural interior demolition for homes, condos, and commercial buildouts across Cape Coral, Naples, Fort Myers and SW Florida. Floor tear-outs, kitchen and bath gut-outs, full interior gut jobs.",
    lede:
      "Interior demolition isn't just swinging a sledge. It's knowing what to protect, where utilities run, and how to leave the site clean for the trades coming in behind you.",
    intro: [
      "We handle interior demo for homeowners, contractors, and property managers across Southwest Florida. Single-room tear-outs, kitchen and bath gut-outs, whole-condo strip-downs ahead of a full renovation — same crew, same standards.",
      "Every job starts with a walk-through. We identify what's load-bearing, where the active plumbing and electrical run, and what surrounding finishes need to be protected. Then we work top-down so debris flows the right way and your finishes downstream don't take damage.",
    ],
    scope: [
      { label: "Floor Removal",          detail: "Tile, hardwood, laminate, sheet vinyl, carpet, glued-down rubber. Down to the slab or subfloor — we tell you which before we start." },
      { label: "Cabinet & Vanity Demo",   detail: "Uppers, base, islands, vanities, built-ins. Salvage what you want, haul the rest." },
      { label: "Drywall & Plaster",       detail: "Full or partial. Plastic-walled containment for dust-sensitive areas." },
      { label: "Bathroom Gut-Outs",       detail: "Tub, toilet, vanity, tile, drywall — stripped to studs and slab with the rough-in capped." },
      { label: "Kitchen Tear-Outs",       detail: "Cabinets, appliances disconnected (you keep what you want), counters, tile backsplash, soffits." },
      { label: "Drop Ceilings & Soffits", detail: "Common in older condos and offices. Removed with the grid and tiles bagged for clean haul-off." },
      { label: "Selective Demo",          detail: "Cut openings for new doors or pass-throughs without disturbing the rest of the room." },
    ],
    process: [
      { step: "01", title: "Walk-Through",   detail: "We meet you on site, look at what's coming out, confirm structural elements and utilities, and answer questions before we quote." },
      { step: "02", title: "Fixed Quote",    detail: "Written estimate within 24 hours with the scope, dump fees, and timeline spelled out. No surprises." },
      { step: "03", title: "Protect & Demo", detail: "Floor protection, plastic containment as needed, utilities locked out. Demo runs top-down so debris flows the right way." },
      { step: "04", title: "Haul & Hand-Off", detail: "Debris loaded into our truck, site swept, slab and studs ready for whoever's coming in behind us. Final walk-through with you." },
    ],
    reasons: [
      { title: "Structural awareness",   body: "We know what stays. If you're not sure whether a wall is load-bearing, we flag it before the demo plan goes in." },
      { title: "Dust control that works", body: "Plastic containment, negative-pressure fans, daily clean-up. We work in occupied buildings without leaving a trail." },
      { title: "Coordinated with trades", body: "We talk to your plumber and electrician before we start so they're not surprised by what they find." },
      { title: "One crew, start to finish", body: "Same guys from walk-through to haul-off. No subbing out, no handoff issues." },
    ],
    doNot: [
      "Structural demolition (load-bearing walls, beams, footings) — that's a licensed structural contractor's call.",
      "Asbestos abatement — if we find it, we stop, document, and connect you with a licensed abatement firm.",
      "Permitting — we work to your scope; you or your GC own permits.",
    ],
    faq: [
      { q: "Do you do single-room jobs or only full guts?",
        a: "Both. A single-bathroom tear-out is a 1-day job for us. Full condo gut-outs are 3–7 days depending on size and access." },
      { q: "Can we live in the house during the demo?",
        a: "Sometimes. Single-room work with containment is usually fine to live around. Whole-floor work is easier to schedule when the space is empty. We'll tell you straight." },
      { q: "Do you haul the debris yourself?",
        a: "Yes. Load-out is included in the quote — no separate dumpster bill unless you want a roll-off staged for an ongoing renovation." },
      { q: "How fast can you start?",
        a: "Same-week starts are common. Same-day for emergencies if we have a crew open." },
      { q: "Do you protect floors and finishes you're not removing?",
        a: "Always. Ram board on floors, plastic on millwork, daily clean-up. We don't trade speed for damage." },
    ],
    stats: [
      { value: "1–7", label: "days typical" },
      { value: "Same week",  label: "common start" },
      { value: "Included",   label: "haul-off in quote" },
    ],
  },

  {
    slug: "outdoor-demolition",
    name: "Outdoor Demolition",
    category: "Exterior Tear-Outs",
    icon: "Construction",
    accent: "orange",
    title: "Outdoor Demolition in SW Florida — Pools, Sheds, Concrete, Decks",
    description:
      "Pool demolition, shed and fence removal, concrete and driveway tear-out, deck and pergola removal across Cape Coral, Naples, and Southwest Florida. Hauling, fill, and final grade included.",
    lede:
      "When something outside has to come down, the hard part isn't the breaking — it's the loading, the hauling, and leaving a yard you can actually walk on.",
    intro: [
      "We do exterior tear-downs across Southwest Florida: pools, sheds, fences, decks, patios, concrete pads, driveways, pergolas, and the random outbuildings people inherit.",
      "Outdoor demo is heavier than people expect. A 14×28 concrete pool with 4\" of pool deck can be 50+ tons by the time you're done. We bring the equipment that fits in your gate, the operators who know how to use it, and the trucks to haul it the same day so debris isn't sitting in your yard.",
    ],
    scope: [
      { label: "Pool Demolition",       detail: "Partial fill-in or full removal. Steel cut, shell broken up, hauled, hole filled with clean fill and tamped. Surveyor-friendly." },
      { label: "Shed & Outbuilding",    detail: "Wood, metal, vinyl. Slab can come or stay — your call." },
      { label: "Fence Removal",         detail: "Wood, chain-link, vinyl, aluminum. Posts pulled, concrete footings out, holes backfilled." },
      { label: "Concrete & Driveway",   detail: "Slabs, walkways, driveways, pool decks. Saw-cut to a clean edge or full removal." },
      { label: "Deck & Patio Tear-Out", detail: "Wood, composite, paver patios, screened-in lanai frames." },
      { label: "Pergolas & Gazebos",    detail: "Stand-alone or attached. Footers extracted if needed." },
      { label: "Post-Hurricane Debris", detail: "Downed trees, broken fence runs, storm-damaged structures. We run heavy after storms — call early." },
    ],
    process: [
      { step: "01", title: "Site Visit",           detail: "We look at access (gate widths, overhead lines, neighbor's driveway), measure the thing coming down, and check what's underneath." },
      { step: "02", title: "Scope + Quote",        detail: "Written estimate inside 24 hours: scope, equipment, haul fees, fill, and timeline. Permits noted if needed for pool fill-ins." },
      { step: "03", title: "Tear-Out",             detail: "Equipment in, structure down, debris loaded same-day where access allows. Clean as we go." },
      { step: "04", title: "Fill, Grade, Finish",  detail: "Holes back-filled with clean fill, tamped, graded. Pool fill-ins get a final survey-ready grade." },
    ],
    reasons: [
      { title: "Equipment that fits your gate",  body: "Mini-skids and compact excavators that pass through a 36\" gate without ripping out your fence." },
      { title: "Same-day load-out",              body: "We bring the truck the structure comes off in. No piles of debris sitting in your yard for a week." },
      { title: "Honest pool quotes",             body: "We tell you up front whether a partial fill-in or full removal is right for your future plans — and what the surveyor will say." },
      { title: "Storm-ready",                    body: "Post-hurricane debris is what we do. Call early; we work in the order we hear from people." },
    ],
    doNot: [
      "Tree work that requires a certified arborist climbing live canopies — we partner with arborists for those.",
      "Septic / sewer line work — that's a plumber's domain.",
      "Pool fill-in permits — we'll guide you; permits are yours or your GC's.",
    ],
    faq: [
      { q: "Partial pool fill-in vs. full removal — what's the difference?",
        a: "Partial means we break the shell, perforate it for drainage, and fill the hole with clean compacted fill. It's cheaper but the area can't ever support a structure. Full removal pulls everything out and lets you build on the lot later. We'll tell you which makes sense for your plans." },
      { q: "Do I need a permit?",
        a: "Pool fill-ins do in most SW Florida jurisdictions. Sheds and small decks usually don't. We'll tell you what we know, but the permit is yours or your GC's." },
      { q: "How long does a pool demo take?",
        a: "Most residential pools are 1–2 days from break-in to final grade. Tighter access or larger pools can run 3 days." },
      { q: "Can you work around my landscaping?",
        a: "Yes. We protect what stays, lay plywood paths for tracked equipment, and patch sod when we're done." },
      { q: "Do you haul same-day?",
        a: "Almost always. Concrete and steel go straight from the bucket to our truck so there's no debris sitting in your yard overnight." },
    ],
    stats: [
      { value: "1–3", label: "days typical" },
      { value: "Same-day", label: "haul-off" },
      { value: "Surveyor-ready", label: "final grade" },
    ],
  },

  {
    slug: "hauling",
    name: "Hauling",
    category: "Load-and-Go",
    icon: "Truck",
    accent: "green",
    title: "Hauling & Junk Removal in SW Florida — Construction Debris, Bulk Trash",
    description:
      "Same-day hauling for construction debris, renovation waste, demo material, bulk trash, and dump runs across Cape Coral, Naples, and Southwest Florida. We load it. We haul it. Flat-rate pricing.",
    lede:
      "Load-and-go done right: we bring the truck, the crew, and the muscle. You point at the pile.",
    intro: [
      "Hauling is the unglamorous part of construction that decides whether your job site stays workable. We run a fleet of dump trucks across SW Florida and price by the load, not by the minute.",
      "Common runs are construction debris off of an active site, renovation waste sitting in someone's garage, bulk trash a property manager wants gone before a turnover, and post-storm yard debris. If it fits in a truck and it's legal, we'll haul it.",
    ],
    scope: [
      { label: "Construction Debris", detail: "Drywall, tile, lumber, flooring, fixtures from active builds and renovations." },
      { label: "Demo Load-Out",       detail: "If you demo'd it yourself, we'll haul it. Same-day pickup most weeks." },
      { label: "Bulk Trash",          detail: "Furniture, mattresses, appliances, exercise equipment, the storage unit you stopped paying for." },
      { label: "Yard Debris",         detail: "Brush, fence sections, downed limbs, pool patio piles. Storm cleanups run heavy — call early." },
      { label: "Dump Runs",           detail: "One-off trips to the transfer station for contractors without a permit truck on the job." },
      { label: "Property Cleanouts",  detail: "Foreclosures, evictions, estate cleanouts. We work fast and don't ask questions." },
    ],
    process: [
      { step: "01", title: "Quote by Volume",  detail: "Text us a photo or walk us through it. Flat price by load — 6, 12, or 20 yard equivalents." },
      { step: "02", title: "Schedule",          detail: "Same-day or next-day for most jobs. Tell us when access works for you." },
      { step: "03", title: "Load",              detail: "Our crew loads — you don't lift a thing unless you want to." },
      { step: "04", title: "Haul & Document",   detail: "Material goes to the right facility. You get a confirmation and a clean spot." },
    ],
    reasons: [
      { title: "Flat-rate, not hourly",       body: "Hourly meters feel like a parking app. We quote the load and stick to it." },
      { title: "Same-day common",             body: "If we have a truck open and you're inside 30 minutes of route, we'll knock it out today." },
      { title: "We sort what's recyclable",   body: "Metal, concrete, and clean wood go to recyclers. The rest goes to the transfer station." },
      { title: "Contractor accounts",          body: "Net-15 invoicing for GCs and trades we work with regularly." },
    ],
    faq: [
      { q: "Do I have to be on site?",
        a: "Not if access is clear. Lots of customers send a gate code and a photo of the pile and we handle it." },
      { q: "What can't you haul?",
        a: "Hazardous waste (paint thinners, automotive fluids, asbestos, batteries) needs a licensed hazmat hauler. Everything else, we'll take." },
      { q: "Can you bring a dumpster instead?",
        a: "Yes — we'll stage a roll-off if you have a multi-day project. For one-and-done jobs, our load-and-go usually beats the dumpster math." },
      { q: "How fast can you come?",
        a: "Inside 24 hours most weeks. Same-day if our schedule allows." },
      { q: "Are you insured for active job sites?",
        a: "Yes — fully insured with COI on file. Send us your GC's certificate-holder info." },
    ],
    stats: [
      { value: "Same-day", label: "common pickup" },
      { value: "Flat-rate", label: "by load" },
      { value: "Insured", label: "for active sites" },
    ],
  },

  {
    slug: "site-cleanup",
    name: "Site Cleanup",
    category: "Post-Construction",
    icon: "HardHat",
    accent: "green",
    title: "Construction Site Cleanup in SW Florida — Post-Build & Jobsite",
    description:
      "Post-construction cleanup and rolling jobsite cleanup for contractors, builders, and property managers across Cape Coral, Naples, and Southwest Florida. Move-in ready standard.",
    lede:
      "The last thousand bucks of a build is the thousand the homeowner remembers. We make sure that money is well spent.",
    intro: [
      "Site cleanup is what separates a project that closes on time from one that hangs in punch-list limbo. We run a tight cleanup crew for general contractors, custom-home builders, condo developers, and commercial fit-out teams across SW Florida.",
      "Two flavors of cleanup: rolling clean during the build (so the next trade walks into a workable site) and final/post-construction clean for move-in. Both priced and scheduled to fit your CO timeline.",
    ],
    scope: [
      { label: "Post-Construction Final",   detail: "All-room final clean for CO and move-in. Floors, windows, fixtures, hardware, trim wipe-down." },
      { label: "Rough Clean",                detail: "After drywall and paint, before flooring. Removes dust and overspray so the next trade has a clean slate." },
      { label: "Rolling Jobsite Cleanup",    detail: "Scheduled visits during the build to manage debris, sweep common areas, and keep the site walkable." },
      { label: "Bathroom & Kitchen Detail",  detail: "Caulk lines, grout haze, fixture polish, drawer interiors, range cleaning." },
      { label: "Window Cleanup",             detail: "Sticker removal, interior + exterior wash, track and frame detail." },
      { label: "Floor Detail",               detail: "Tile, hardwood, LVT, polished concrete. Method matched to the substrate." },
      { label: "Dust & Debris Management",   detail: "HEPA vacuums for fine drywall dust; we don't just push it around." },
    ],
    process: [
      { step: "01", title: "Walk + Scope",      detail: "Pre-CO walk with you, scope the cleans needed and identify trades that need to come back before final." },
      { step: "02", title: "Schedule",           detail: "Lock in dates that match your CO and move-in. Rolling clean visits scheduled around active trades." },
      { step: "03", title: "Execute",            detail: "Crew runs the scope on the agreed sequence. Daily check-ins on multi-day cleans." },
      { step: "04", title: "Punch + Hand-Off",   detail: "Final walk with you. Anything missed gets fixed before we leave." },
    ],
    reasons: [
      { title: "We've done this", body: "Final cleans for homes, condos, and commercial spaces from 1,200 to 50,000 sq ft. We know the standard your buyers expect." },
      { title: "Coordinated, not interrupting", body: "We schedule around other trades so we're not in their way and they're not in ours." },
      { title: "HEPA-grade dust control", body: "Drywall dust hides for months if you don't vacuum it right the first time. We vacuum it right." },
      { title: "Same crew on the punch", body: "The crew that did the clean comes back for the punch list. No re-training, no excuses." },
    ],
    faq: [
      { q: "How far in advance do I need to book?",
        a: "Final cleans for residential new builds — a week is comfortable. Rolling cleanup we schedule weekly. Tighter timelines, just call." },
      { q: "Do you supply your own supplies and vacuums?",
        a: "Yes. HEPA vacs, microfiber systems, professional cleaners. You provide water access." },
      { q: "Can you handle a phased move-in?",
        a: "Yes. Common with developments — we'll clean units in your closing order." },
      { q: "Do you do exterior pressure-washing?",
        a: "Walkway and driveway construction wash, yes. Full house pressure-washing is a separate service we can refer or coordinate." },
    ],
    stats: [
      { value: "Move-in", label: "ready standard" },
      { value: "HEPA",    label: "vacuum dust control" },
      { value: "Rolling", label: "or one-shot" },
    ],
  },

  {
    slug: "lot-clearing",
    name: "Lot Clearing",
    category: "Land Prep",
    icon: "TreePine",
    accent: "green",
    title: "Lot Clearing in SW Florida — Brush, Trees, Abandoned Property",
    description:
      "Residential and commercial lot clearing across Cape Coral, Lehigh Acres, Babcock Ranch, and Southwest Florida. Brush removal, light tree work, abandoned property cleanouts, build-ready prep.",
    lede:
      "If you bought the lot expecting to build and the brush has other plans — we'll clear it. If the rental down the street is two years past mowed — we'll handle that too.",
    intro: [
      "Florida grows back fast. A lot you bought two summers ago is a different lot today. We clear residential and commercial parcels for build-ready prep, overgrown rental cleanups, abandoned property recoveries, and the bayou backyard your in-laws never tackle.",
      "Common workflow: walk the lot, mark protected trees and palms (lots of cities have ordinances), clear brush and saplings, handle small/medium tree work in-house, partner with a certified arborist for anything tall or risky, haul everything off, and leave a graded edge ready for survey, permit, or the next phase.",
    ],
    scope: [
      { label: "Brush & Sapling Clearing",  detail: "Up to 4\" diameter, full-property or selective. Mowed, mulched on site, or hauled — your call." },
      { label: "Overgrowth Removal",         detail: "Vines, palmetto, overgrown ornamentals, fence-line invasives." },
      { label: "Light Tree Work",            detail: "Trees up to ~30 ft and under 12\" caliper with no critical clearance issues. Anything bigger, we sub in an arborist." },
      { label: "Abandoned Property Cleanout", detail: "Yard debris, dumped material, junk piles, structures past their prime." },
      { label: "Build-Ready Prep",           detail: "Stump grind, root rake, grade pass. Survey-ready lot edge." },
      { label: "Post-Hurricane",             detail: "Storm debris, downed limbs, fence wreckage. We move fast in the days after." },
    ],
    process: [
      { step: "01", title: "Lot Walk",          detail: "We walk the parcel with you, mark protected trees per local code, and flag anything that affects pricing." },
      { step: "02", title: "Quote + Permits",   detail: "Written estimate, and we'll tell you when you need a tree-removal permit (Cape Coral, Naples, etc. have specifics)." },
      { step: "03", title: "Clear",             detail: "Brush down, trees handled, debris loaded. Equipment matched to access and ground conditions." },
      { step: "04", title: "Final Grade",       detail: "Stump grind if requested, root rake, light grade. Lot ready for survey or build prep." },
    ],
    reasons: [
      { title: "We know the codes",      body: "Cape Coral protected trees, Naples landscape ordinances, Lee County permits — we work in them every week." },
      { title: "Equipment for the access", body: "Skid-steers, mulchers, mini-excavators. We bring what your gate will take." },
      { title: "Honest with tree work", body: "We do what we can in-house. Anything that needs a climber and a rigging plan, we'll connect you with an arborist we trust." },
      { title: "Storm response",        body: "After hurricanes, we run heavy. Call early — we work the schedule we hear." },
    ],
    doNot: [
      "Climbing live canopies — we partner with certified arborists for those.",
      "Land surveys — your civil engineer or surveyor handles that.",
      "Wetland delineation — that's an environmental consultant's job.",
    ],
    faq: [
      { q: "Do I need a permit to clear my lot?",
        a: "In Cape Coral, Naples, Lee County, and most SW Florida cities — yes if you're removing protected trees. Brush and ornamentals are usually fine. We'll tell you what we know; the permit is yours." },
      { q: "How fast can you clear a quarter-acre?",
        a: "Most quarter-acre clears are 1 day of work. Half-acre with light tree work, 2 days. We quote the day count up front." },
      { q: "Will you grind stumps?",
        a: "Yes — quoted as a line item. Grind depth quoted to your needs (4\" for grass, 12\" for foundations)." },
      { q: "Can you handle invasives like Brazilian pepper?",
        a: "Yes. We cut, treat the cut stump to prevent regrowth, and haul." },
      { q: "Do you mow ongoing?",
        a: "We don't do routine mowing — that's a landscaper's contract. We do clearing, not maintenance." },
    ],
    stats: [
      { value: "1/4 ac/day",  label: "typical clearing pace" },
      { value: "Build-ready", label: "final grade" },
      { value: "Permit-aware", label: "every city we work" },
    ],
  },

  {
    slug: "property-maintenance",
    name: "Property Maintenance",
    category: "Repairs · Painting · Punch Lists",
    icon: "Wrench",
    accent: "orange",
    title: "Property Maintenance in SW Florida — Painting, Repairs, Punch Lists",
    description:
      "Interior and exterior painting, drywall repair, door and trim installs, fixture replacement, and routine punch lists for homes, rentals, and commercial spaces in Cape Coral, Naples, and Southwest Florida.",
    lede:
      "Standing list of small jobs that never seem to get done? That's what we exist for. We show up, we knock them out, we leave.",
    intro: [
      "Property maintenance is the work nobody calls a big contractor for — and the work that keeps a property sharp. We do painting, drywall patch and repair, door and trim install, fixture replacements, hardware swaps, and the punch lists that always live in your phone notes.",
      "Most of our maintenance work is for homeowners between renovations, property managers running short-term rentals, and small commercial spaces. We block hours so you know what you're paying for, and we show up when we said we would.",
    ],
    scope: [
      { label: "Interior Painting",       detail: "Walls, ceilings, trim, doors. Repaints, accent walls, full-house refreshes between rentals." },
      { label: "Exterior Painting",       detail: "Houses, lanais, sheds, fences. Pressure-wash, prime, paint." },
      { label: "Drywall Repair",          detail: "Hole patches, water-damage repair, full-sheet replacement. Texture-matched." },
      { label: "Door & Trim Install",     detail: "Pre-hung doors, casing, base, crown. Sticky pocket doors fixed." },
      { label: "Fixture Replacement",     detail: "Faucets, toilets, ceiling fans, vanities, kitchen sinks. (Tied-in plumbing connections handled by licensed plumbing partner when needed.)" },
      { label: "Hardware & Finish Swaps", detail: "Knobs, pulls, hinges, switch plates. Looks small, reads expensive." },
      { label: "Routine Punch Lists",     detail: "The standing list of 'someday' fixes. Email it to us; we'll quote and schedule." },
    ],
    process: [
      { step: "01", title: "List + Quote",  detail: "Send us the list (text, email, or walk-through). We quote line items so you can pick what stays in scope." },
      { step: "02", title: "Schedule",       detail: "Half-day or full-day blocks. Rolling weekly visits for property managers with rotations." },
      { step: "03", title: "Execute",        detail: "We work the list. If something turns out bigger than expected, we tell you before we go past the quote." },
      { step: "04", title: "Walk + Sign-Off", detail: "Walk the list with you, document anything we didn't get to, schedule the next visit if needed." },
    ],
    reasons: [
      { title: "Block scheduling",        body: "Half-days and full-days, not 'we'll be there sometime Tuesday.' Your time matters." },
      { title: "Same crew, every visit",  body: "Property managers especially — same painter, same drywaller, same standards each rotation." },
      { title: "Honest scoping",          body: "If your hole patch turns out to be a leaking pipe, we'll tell you before we paint over it." },
      { title: "Texture matching",        body: "Drywall patches you can't see. Spray, knockdown, orange peel — we match." },
    ],
    doNot: [
      "Major plumbing or electrical work — we partner with licensed pros for anything past fixture swaps.",
      "Roofing repairs requiring permits — we'll point you to a roofer.",
      "HVAC service — that's a licensed HVAC company's territory.",
    ],
    faq: [
      { q: "Minimum job?",
        a: "Half-day. If you've only got a single hole patch, we'll combine you with a neighbor or pair it with a future visit." },
      { q: "Can you handle rental turnovers?",
        a: "Yes. Same-day turnovers are tight — schedule 2–5 days out and we'll have it done before your next guest." },
      { q: "Will you bring paint?",
        a: "Either way. You can supply (we'll use what you give us) or we'll bring Sherwin-Williams pulled to your color." },
      { q: "Do you fix sticky doors?",
        a: "Constantly. Door drag from settling is the most-fixed thing on our list." },
      { q: "Are you insured?",
        a: "Yes, fully insured. COI sent to property managers on request." },
    ],
    stats: [
      { value: "Same week", label: "common start" },
      { value: "Block", label: "scheduled" },
      { value: "Texture-matched", label: "drywall patches" },
    ],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
