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
  icon: "Hammer" | "Construction" | "Truck" | "HardHat" | "Leaf" | "Droplets";
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
    category: "Kitchen · Bath · Floors",
    icon: "Hammer",
    accent: "orange",
    title: "Interior Demolition for SW Florida Homes — Kitchen, Bath, Floors",
    description:
      "Residential interior demolition for homes and condos across Cape Coral, Naples, Fort Myers and Southwest Florida. Kitchen and bath tear-outs, floor removal, drywall removal — floors protected, dust contained, debris hauled.",
    lede:
      "Getting ready for a renovation? We do the dirty part — tear out the old kitchen, old bathroom, old flooring — and we leave your home clean for whoever's doing the install.",
    intro: [
      "We handle interior demo for homeowners planning a renovation. Kitchen gut-outs, bathroom tear-outs, old tile and carpet removal, popcorn ceiling removal, pantry and closet rip-outs — the messy prep work that stands between you and a fresh space.",
      "Every job starts with a walk-through at your house. We talk about what's coming out, where to protect, how we'll handle dust around pets and kids, and when the next trade is coming in behind us. Floors covered, plastic walls where it matters, debris loaded same-day where access allows.",
    ],
    scope: [
      { label: "Kitchen Tear-Outs",       detail: "Cabinets out, countertops off, tile backsplash down, old appliances disconnected and hauled. Save anything you want to keep." },
      { label: "Bathroom Gut-Outs",       detail: "Tub or shower out, toilet pulled, vanity gone, tile down to studs and slab. Rough-ins capped for the plumber." },
      { label: "Floor Removal",           detail: "Tile, hardwood, laminate, sheet vinyl, carpet. We tell you up front whether we're going to the slab or the subfloor." },
      { label: "Drywall & Plaster",       detail: "Walls, ceilings, popcorn removal — full room or partial. Plastic-wall containment to keep the rest of the house clean." },
      { label: "Closets & Built-Ins",     detail: "Pantry, closet systems, old built-ins, dated millwork — out and hauled, ready for the new install." },
      { label: "Drop Ceilings & Soffits", detail: "Common in older condos and lanais. Grid and tiles bagged for a clean haul-off." },
      { label: "Partial Wall Removal",    detail: "Open a kitchen to a dining room, cut in a new doorway — non-structural only. Load-bearing walls go through a licensed structural contractor." },
    ],
    process: [
      { step: "01", title: "Walk-Through",   detail: "We come to your house, look at what's coming out, and talk about dust control, access, and timing around kids, pets, or short-term rentals." },
      { step: "02", title: "Fixed Quote",    detail: "Written estimate inside 24 hours — scope, dump fees, and timeline. The number we quote is the number you pay." },
      { step: "03", title: "Protect & Demo", detail: "Floors covered, plastic containment on dusty rooms, utilities locked out. Demo runs top-down so debris flows the right way." },
      { step: "04", title: "Haul & Hand-Off", detail: "Debris loaded into our truck, site swept, your installer walks into a clean space. Final walk-through with you before we leave." },
    ],
    reasons: [
      { title: "Dust control that works",   body: "Plastic walls, floor protection, daily clean-up. We work in homes where people are still living without leaving a trail." },
      { title: "No surprise charges",       body: "Written quote, dump fees included, scope spelled out. If something turns out bigger than the walk-through showed, you hear from us before we go past the quote." },
      { title: "Same crew, start to finish", body: "The guys that quoted the job are the guys doing it. No handoff, no \"the other crew didn't tell me that.\"" },
      { title: "Hauled when we're done",    body: "Debris leaves with us the day we're finished. No pile sitting on your driveway waiting for a dumpster pickup." },
    ],
    doNot: [
      "Structural demolition (load-bearing walls, beams, footings) — that's a licensed structural contractor's call.",
      "Asbestos abatement — if we find it, we stop, document, and connect you with a licensed abatement firm.",
      "Permit pulling — we work to your scope; you or your general contractor own permits.",
    ],
    faq: [
      { q: "Do you do single-room jobs?",
        a: "Yes. A single bathroom tear-out is a 1-day job for us. Full kitchens are usually 1–2 days. Whole-house gut-outs run 3–7 days depending on size." },
      { q: "Can we live in the house during the demo?",
        a: "Usually yes for a single-room job with containment. For whole-floor work it's easier when the space is empty. We'll tell you honestly what we'd do." },
      { q: "Do you haul the debris yourself?",
        a: "Yes. Load-out is included in the quote — no separate dumpster bill unless you want a roll-off staged for an ongoing renovation." },
      { q: "How fast can you start?",
        a: "Same-week starts are common. Call us and we'll tell you what's on the schedule." },
      { q: "Do you protect the floors and walls we're keeping?",
        a: "Always. Ram board on floors, plastic on millwork, daily clean-up. We don't trade speed for damage." },
    ],
    stats: [
      { value: "1–7", label: "days typical" },
      { value: "Same week",  label: "common start" },
      { value: "Haul-off",   label: "included" },
    ],
  },

  {
    slug: "outdoor-demolition",
    name: "Outdoor Demolition",
    category: "Pools · Sheds · Fences",
    icon: "Construction",
    accent: "orange",
    title: "Outdoor Demolition for SW Florida Homes — Pools, Sheds, Fences",
    description:
      "Pool removal, shed and fence tear-outs, old deck and concrete removal for SW Florida homes. Equipment that fits through your gate, same-day haul-off, a yard you can actually walk on when we leave.",
    lede:
      "Pool you don't want anymore? Shed falling apart? Old deck that didn't survive the last storm? We take it out, haul it off, and leave the yard flat and clean.",
    intro: [
      "We handle outdoor tear-downs for homeowners across Southwest Florida — pools, sheds, fences, old wood decks, concrete pads, pavers, and the random outbuildings that came with the house.",
      "The hard part of outdoor demo isn't breaking the thing; it's loading it and hauling it off so your yard isn't a construction site for two weeks. We bring compact equipment that fits through a residential gate, the operators who know how to use it, and our own dump trucks so debris leaves the same day.",
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
      { title: "Equipment that fits your gate",  body: "Mini-skids and compact excavators that pass through a 36\" residential gate without ripping out your fence." },
      { title: "Same-day load-out",              body: "We bring the dump truck the structure comes off in. No piles of debris sitting in your yard for a week waiting on a hauler." },
      { title: "Honest pool quotes",             body: "We tell you straight whether a partial fill-in or full removal is right for what you want to do with the yard next." },
      { title: "Storm-ready",                    body: "Downed fences, broken screen cages, wrecked sheds — call us early after a storm. We work in the order we hear from people." },
    ],
    doNot: [
      "Tree work that requires a certified arborist climbing a live canopy — we partner with arborists for those.",
      "Septic or sewer line work — that's a plumber's job.",
      "Pool fill-in permits — we'll walk you through what's needed; the permit itself is yours.",
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
    name: "Junk Hauling",
    category: "Junk · Debris · Bulk",
    icon: "Truck",
    accent: "green",
    title: "Junk Hauling for SW Florida Homes — Garage, Attic, Yard, Debris",
    description:
      "Same-day junk hauling and bulk trash removal for SW Florida homes. Garage cleanouts, old furniture, appliances, renovation debris, yard waste. We load it, we haul it, flat-rate pricing — no hourly meter.",
    lede:
      "Garage full of stuff that needs to go? Old furniture, broken appliances, renovation debris, yard pile? Point at it. We load it. We haul it.",
    intro: [
      "Hauling is the service you call when you want something out of your house and gone today. Garage and attic cleanouts, old appliances, mattresses and furniture, hot-tub removal, yard debris, renovation leftovers.",
      "We run our own dump trucks across Southwest Florida and quote flat-rate by the load — no hourly meter, no mystery fees. You don't lift anything unless you want to. We're insured, we show up when we said, and we leave your driveway cleaner than we found it.",
    ],
    scope: [
      { label: "Garage & Attic Cleanouts", detail: "Years of \"someday\" piles — out in a morning. We'll even set aside anything you still want." },
      { label: "Furniture & Appliances",   detail: "Couches, mattresses, old fridges, washers, dryers, exercise equipment, hot tubs. We disconnect and haul." },
      { label: "Renovation Debris",        detail: "The pile left behind after your renovation. Drywall, tile, old cabinets, flooring — gone same day." },
      { label: "Yard Debris",              detail: "Downed limbs, hedge trimmings, fence sections, the pile under the oak tree. Storm cleanups run heavy — call early." },
      { label: "Estate & Rental Cleanouts", detail: "Full-house cleanouts between tenants, estate downsizes, snowbird exits. Fast, discreet." },
      { label: "Hot Tub & Playset Removal", detail: "Awkward backyard items that need two people and a plan. We bring both." },
    ],
    process: [
      { step: "01", title: "Text Us a Photo",  detail: "Snap a photo of the pile or the room. We quote a flat price inside the hour, most days." },
      { step: "02", title: "Pick a Window",     detail: "Same-day or next-day for most jobs. Give us a two-hour arrival window that works for you." },
      { step: "03", title: "We Load",           detail: "Our crew loads everything — garage, upstairs, backyard. You don't have to lift a thing." },
      { step: "04", title: "Clean & Go",        detail: "Driveway and work area swept before we leave. Payment on completion — cash, card, or ACH." },
    ],
    reasons: [
      { title: "Flat-rate, not hourly",     body: "Hourly meters feel like a parking app. We quote the load up front and that's the number." },
      { title: "Same-day common",           body: "If a truck is open and you're inside our route, we'll knock it out today." },
      { title: "You don't lift anything",    body: "That's the whole point. Point, we load, we haul." },
      { title: "Clean driveway when we leave", body: "Yard, driveway, and work area swept before we pull away." },
    ],
    faq: [
      { q: "Do I have to be home?",
        a: "No. Lots of customers send a gate code or garage code and a photo of the pile. We handle it and send you a photo when we're done." },
      { q: "What can't you haul?",
        a: "Hazardous stuff — paint thinner, automotive fluids, asbestos, car batteries — needs a licensed hazmat hauler. Pretty much everything else, we'll take." },
      { q: "How fast can you come?",
        a: "Same day or next day most weeks. Snap a photo and text us to find out." },
      { q: "Do you bring a dumpster?",
        a: "We can — but for one-shot cleanouts, our load-and-go usually beats renting a dumpster for the week." },
      { q: "How do you charge?",
        a: "Flat rate by the truckload. We quote the price up front and that's the price — no hourly surprises." },
    ],
    stats: [
      { value: "Same-day", label: "pickup" },
      { value: "Flat-rate", label: "by truckload" },
      { value: "No lifting", label: "for you" },
    ],
  },

  {
    slug: "site-cleanup",
    name: "Site Cleanup",
    category: "Post-Reno · Move-In Ready",
    icon: "HardHat",
    accent: "green",
    title: "Post-Renovation & Move-In Cleanup for SW Florida Homes",
    description:
      "Post-renovation cleanup and move-in-ready cleans for Southwest Florida homes. Fine drywall dust gone, floors detailed, kitchens and baths wiped down — your contractor leaves, your house looks finished.",
    lede:
      "Renovation's done and the construction dust is everywhere? Just bought a house and want it move-in clean? We handle both — floor to ceiling, fixtures to fingerprints.",
    intro: [
      "Site cleanup is the step between \"the renovation is done\" and \"the house feels like yours again.\" Fine drywall dust settles on every surface for weeks if it's not cleaned right the first time. We handle it right the first time — HEPA vacuums, microfiber, the whole house.",
      "We also do move-in cleans for homes just sold or just bought, pre-listing cleans to help a house show better, and detail cleans after a big home project. One crew, one standard, done when we say it's done.",
    ],
    scope: [
      { label: "Post-Renovation Clean",     detail: "Fine construction dust lifted off every surface — walls, trim, floors, cabinets, ceiling fans. Not just wiped around." },
      { label: "Move-In Deep Clean",         detail: "Kitchen inside the cabinets and oven, bathrooms down to the grout, floors detailed. Ready for the first night in your home." },
      { label: "Pre-Listing Clean",          detail: "A sharp clean before the photographer shows up. Houses show better when the baseboards aren't dusty." },
      { label: "Bathroom & Kitchen Detail",  detail: "Caulk lines wiped, grout haze lifted, fixtures polished, drawer interiors cleaned, inside of the oven and fridge." },
      { label: "Window & Track Clean",       detail: "Sticker and tape residue off, inside glass cleaned, tracks and frames wiped." },
      { label: "Floor Detail",               detail: "Tile, hardwood, luxury vinyl, polished concrete. Method matched to the floor so nothing streaks or dulls." },
      { label: "Dust Management",            detail: "HEPA vacuums for drywall dust — we don't just push it from room to room with a leaf blower." },
    ],
    process: [
      { step: "01", title: "Walk + Scope",     detail: "We walk your house with you, scope what needs cleaning and detailing, and quote a flat price in writing." },
      { step: "02", title: "Schedule",          detail: "Pick a day that works. Most residential cleans are a single day. Larger homes or heavier post-reno jobs run two days." },
      { step: "03", title: "Clean",             detail: "Our crew runs the scope top-down, room by room, with HEPA vacuums and professional supplies — not a shop vac and a Swiffer." },
      { step: "04", title: "Final Walk",        detail: "You walk the house with us before we leave. Anything missed gets fixed on the spot." },
    ],
    reasons: [
      { title: "Drywall dust gone for real", body: "HEPA-vacuumed, not pushed around. The dust that settles for weeks on your furniture — we get it the first time." },
      { title: "We bring the supplies",      body: "HEPA vacuums, microfiber systems, professional cleaners. All you provide is water access." },
      { title: "One flat price",             body: "We quote the scope up front — no \"and that's extra\" surprises when we finish." },
      { title: "Same crew every time",       body: "You get the same people — not whoever the staffing app sent today." },
    ],
    faq: [
      { q: "How far in advance do I need to book?",
        a: "A week is comfortable. Faster turnarounds we try to accommodate — just call and we'll tell you what's open." },
      { q: "Do you bring your own supplies and vacuums?",
        a: "Yes — HEPA vacuums, microfiber, pro cleaners. You provide water access and we handle the rest." },
      { q: "Can we live in the house during the clean?",
        a: "Most of the time, yes. We work room by room. Bigger post-reno cleans go faster when the house is empty but it's not required." },
      { q: "Do you clean inside the oven and fridge?",
        a: "On move-in deep cleans, yes. We'll call them out on the walk-through so you know what's in and what's not." },
      { q: "Do you do windows outside too?",
        a: "Standard clean covers interior glass and tracks. Exterior window washing we quote as an add-on or coordinate with our pressure-washing crew." },
    ],
    stats: [
      { value: "HEPA",    label: "dust control" },
      { value: "1 day",   label: "most homes" },
      { value: "Walk-off", label: "guarantee" },
    ],
  },

  {
    slug: "landscaping",
    name: "Lawn Care",
    category: "Mow · Edge · Trim",
    icon: "Leaf",
    accent: "green",
    title: "Lawn Care in Southwest Florida — Weekly Mowing, Edging & Trim",
    description:
      "Weekly and bi-weekly lawn care for Southwest Florida homes — mowing, edging, line trimming, blow-off, hedge trim, and seasonal mulch refresh. Reliable crews across Cape Coral, Naples, Fort Myers.",
    lede:
      "Your lawn, cut right every week. Clean lines along the walk, a crisp edge at the driveway, and nothing left behind on your porch when we drive off.",
    intro: [
      "We handle weekly lawn care for homeowners across Southwest Florida. Mow, edge, line-trim around posts and beds, blow the clippings off every walk and driveway, and leave the yard looking tight before we pull away.",
      "Pick weekly in growing season, bi-weekly off-season, or a one-time cleanup when the yard got away from you. Add hedge trimming, mulch refresh, and seasonal cleanups as you need them — we quote per visit so you always know what you're paying for.",
    ],
    scope: [
      { label: "Weekly Mowing",        detail: "Fresh-cut lawn on your scheduled day. St. Augustine, Zoysia, Bahia — we set the mower height for your grass and the season." },
      { label: "Edging & Trim",        detail: "Clean line along driveways, walks, and beds. Line-trim around mailboxes, light posts, fences, and A/C pads." },
      { label: "Blow-Off",             detail: "Driveway, walks, lanai, porch, and pool deck blown clean every visit. No clippings left in the paver cracks." },
      { label: "Hedge Trimming",       detail: "Keep privacy hedges tight and front-yard shrubs shaped. Monthly or quarterly rotation available." },
      { label: "Seasonal Cleanups",    detail: "Spring reset, pre-season tidy, post-storm yard pickup. One-shot or scheduled." },
      { label: "Mulch Refresh",        detail: "Pine straw, cypress, hardwood, or shell/rock. Clean bed edges and weed-barrier where needed." },
      { label: "Overgrown Yard Reset", detail: "Just moved in, back from up north, or let it go? We'll bring it back to a clean weekly cut." },
    ],
    process: [
      { step: "01", title: "Quick Quote",     detail: "Text us your address or send a photo of the yard. We send a flat weekly or bi-weekly price inside 24 hours — mow, edge, trim, blow-off included." },
      { step: "02", title: "Pick Your Day",   detail: "Lock in a day of the week. We show up the same day each visit — rain reschedules to the next dry day." },
      { step: "03", title: "Weekly Service",  detail: "Mow, edge, trim, blow off. Yard gets the same crew and the same standard every visit." },
      { step: "04", title: "Add-Ons as Needed", detail: "Hedge trim, mulch refresh, yard reset — add any of it on top of your weekly service when you want it." },
    ],
    reasons: [
      { title: "We show up when we said",   body: "Same day each week. If a storm bumps your day, you hear from us before the appointment window — not after." },
      { title: "Clean lines, every time",    body: "Edged lawns look twice as good as mowed ones. We edge every visit, not when we remember to." },
      { title: "No surprise bills",          body: "Flat weekly or bi-weekly price. Add-ons quoted first — you say yes before we start, not after." },
      { title: "One crew for the whole yard", body: "Mow today, mulch next month, pressure wash the drive before the holidays. One company, one call." },
    ],
    doNot: [
      "Full landscape design plans — we handle maintenance and installs; a landscape architect handles master plans.",
      "Irrigation system installs or major repair — we work with licensed irrigators for those.",
      "Tree work over ~30 ft — we partner with a certified arborist when the job needs a climber.",
    ],
    faq: [
      { q: "Do you do weekly mowing?",
        a: "Yes — that's the main thing we do. Weekly in growing season, bi-weekly off-season. Pick a day and we're there." },
      { q: "What's included every visit?",
        a: "Mow at the right height for your grass, edge driveways and walks, line-trim around posts and beds, blow off every walkway and driveway. No upcharges per visit." },
      { q: "Can I add hedge trimming and mulch to my weekly service?",
        a: "Yes. We quote hedge trim and mulch refresh as add-ons and schedule them around your regular visits." },
      { q: "What if it rains on my day?",
        a: "We bump to the next dry day and text you. You never pay for a visit we didn't make." },
      { q: "Can you reset an overgrown yard first, then start weekly?",
        a: "Yes — one-time cleanup to get it back to a mow-able state, then on the weekly schedule from there." },
    ],
    stats: [
      { value: "Weekly",   label: "or bi-weekly" },
      { value: "Flat-rate", label: "per visit" },
      { value: "Same day", label: "each week" },
    ],
  },

  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    category: "House · Driveway · Lanai",
    icon: "Droplets",
    accent: "orange",
    title: "Pressure Washing for SW Florida Homes — House, Driveway, Roof, Lanai",
    description:
      "Residential pressure washing across Southwest Florida homes. Whole-house soft wash, driveway refresh, pool-deck mold removal, roof streak wash, fence and lanai cage. No stripes, plant-safe chemistry.",
    lede:
      "Florida grime builds fast. We soft-wash your house, pressure-wash your driveway and pool deck, and leave your plants and paint exactly how we found them.",
    intro: [
      "Pressure washing is one of those services that looks the same from the truck until the first stripe shows up on your house. We don't leave stripes. We soft-wash siding, paint, and screens, and save the real pressure for driveways, pool decks, and pavers where it belongs.",
      "Most of our calls are whole-house soft washes, driveway and walkway refreshes, pool-deck mold removal, roof streak removal, fence brightening, and lanai cage cleaning. We cover your beds, pre-rinse your plants, pick the right detergent for each surface, and rinse everything down when we're done.",
    ],
    scope: [
      { label: "House Soft Wash",       detail: "Vinyl, stucco, Hardie, painted. Low-pressure chemistry that lifts dirt and mildew without blasting the finish." },
      { label: "Driveway & Walkway",    detail: "Concrete, pavers, stamped. Oil-stain treatment on top of a hot-pressure wash." },
      { label: "Pool Deck",             detail: "Paver, Kool-Deck, aggregate. Algae and mold off; sealer-friendly rinses." },
      { label: "Roof Wash",             detail: "Soft-wash only — never pressure on shingles or tile. Removes black streaks, algae, and lichen." },
      { label: "Fence Restoration",     detail: "Wood, vinyl, aluminum. Weathered-wood brightening and vinyl rinse." },
      { label: "Lanai & Screen Cage",   detail: "Pool-cage frames, screens, and lanai floors. Mildew off, mesh un-stressed." },
      { label: "Pre-Listing Wash",      detail: "Driveway, walks, house, and lanai cleaned up before your listing photos. The house will show much better." },
    ],
    process: [
      { step: "01", title: "Walk-Through",   detail: "We look at surfaces, flag anything delicate (older paint, loose caulk, lanai mesh), and check landscape runoff." },
      { step: "02", title: "Written Quote",  detail: "Written estimate inside 24 hours with surfaces, chemistry choice, and timing spelled out." },
      { step: "03", title: "Protect + Wash", detail: "Plant protection in place, outlets covered, chemistry matched to each surface. Daily rinse so nothing dries weird." },
      { step: "04", title: "Walk + Sign-Off", detail: "Walk the property with you so anything we missed gets a second pass before we pack up." },
    ],
    reasons: [
      { title: "No stripes",              body: "Technique first. Soft-wash where it belongs, pressure where it earns its keep. You won't see our lap lines after." },
      { title: "Plant-safe chemistry",     body: "Detergents and rinses tuned so your gardenias don't come out of this looking crispy." },
      { title: "Pre-listing ready",        body: "Realtor-and-stager pace. We can show up the day before a listing goes live and leave the exterior camera-ready." },
      { title: "Commercial after-hours",   body: "Storefronts and dumpster pads overnight so your business doesn't close for the wash." },
    ],
    doNot: [
      "Sealer application — we leave sealers to the paver/deck sealing specialists we work with.",
      "Painting touch-ups after wash — we hand that back to your painter.",
      "Window washing beyond the exterior rinse — real interior/exterior detail is a window-cleaning specialty.",
    ],
    faq: [
      { q: "Can you wash my tile roof?",
        a: "Yes — soft-wash only. Pressure on tile roofs will crack them. We use low-pressure chemistry that lifts the black streaks and algae without touching the tile integrity." },
      { q: "What about my landscaping during the wash?",
        a: "We pre-water the beds, cover anything sensitive, and rinse soap off plants during the wash so detergents never sit." },
      { q: "How long does a whole-house wash take?",
        a: "Most single-story 2,000–3,000 sq ft houses are a half-day. Two-story or larger lots push into a full day." },
      { q: "Driveway oil stains — can you get them out?",
        a: "Most fresh stains, yes. Baked-in oil that's been there a decade is a maybe — we'll tell you what we think at the walk-through." },
      { q: "Do you wash before painting?",
        a: "All the time. We prep-wash houses for paint crews and coordinate on timing so the paint goes on dry." },
    ],
    stats: [
      { value: "Half-day",   label: "typical house wash" },
      { value: "Soft-wash",  label: "on anything delicate" },
      { value: "Plant-safe", label: "chemistry" },
    ],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
