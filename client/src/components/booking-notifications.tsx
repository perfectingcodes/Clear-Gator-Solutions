import { useEffect, useState } from "react";
import { CheckCircle2, X, MapPin } from "lucide-react";

type Booking = {
  name: string;
  city: string;
  service: string;
  minutesAgo: number;
};

const FIRST_NAMES = [
  "Marcus", "Sandra", "Derek", "Tasha", "Luis", "Megan", "Kevin", "Priya",
  "Tony", "Rachel", "Jared", "Ashley", "Brandon", "Diana", "Carlos", "Nicole",
  "Sean", "Heather", "Wesley", "Bianca",
];
const LAST_INITIALS = ["A.", "B.", "C.", "D.", "F.", "G.", "H.", "K.", "L.", "M.", "N.", "P.", "R.", "S.", "T.", "W."];
const CITIES = [
  "Cape Coral", "Naples", "Bonita Springs", "Punta Gorda", "Fort Myers",
  "Sanibel Island", "St. James City", "Babcock Ranch",
];
const SERVICES = ["Demo", "Hauling", "Site Cleanup", "Lot Clearing", "Handyman / Painting"];

const NOTIFY_INTERVAL_MS = 4 * 60 * 1000;
const VISIBLE_MS = 7000;
const FIRST_DELAY_MS = 15000;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeBooking(): Booking {
  return {
    name: `${pick(FIRST_NAMES)} ${pick(LAST_INITIALS)}`,
    city: pick(CITIES),
    service: pick(SERVICES),
    minutesAgo: Math.floor(Math.random() * 5) + 1,
  };
}

export default function BookingNotifications() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let hideTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      setBooking(makeBooking());
      hideTimer = setTimeout(() => setBooking(null), VISIBLE_MS);
    };

    const firstTimer = setTimeout(show, FIRST_DELAY_MS);
    const interval = setInterval(show, NOTIFY_INTERVAL_MS);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !booking) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="booking-notification"
      className="fixed bottom-4 left-4 z-[60] max-w-[320px] sm:max-w-sm bg-background border border-border rounded-lg shadow-2xl shadow-black/15 overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-300"
      style={{ marginBottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }}
    >
      <div className="p-4 pr-9 flex gap-3">
        <div className="w-9 h-9 rounded-md bg-gator-orange/10 border border-gator-orange/20 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 text-gator-orange" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
            New booking
          </div>
          <div className="text-sm font-bold text-foreground leading-tight">
            {booking.name} · <span className="text-muted-foreground font-medium">{booking.service}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{booking.city}</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{booking.minutesAgo}m ago</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 w-6 h-6 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
