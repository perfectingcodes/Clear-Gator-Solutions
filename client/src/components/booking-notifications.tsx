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
      className="fixed bottom-4 left-4 z-[60] max-w-[320px] sm:max-w-sm bg-card/95 backdrop-blur-md border border-card-border rounded-2xl shadow-2xl shadow-black/30 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300"
      style={{ marginBottom: "calc(env(safe-area-inset-bottom, 0px) + 92px)" }}
    >
      <div className="h-1 w-full bg-gradient-to-r from-gator-orange via-gator-orange-light to-gator-orange" />
      <div className="p-4 pr-9 flex gap-3">
        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gator-orange to-gator-orange-dark flex items-center justify-center flex-shrink-0 shadow-md shadow-gator-orange/30">
          <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-foreground leading-tight">
            {booking.name} just booked!
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
            <span className="font-semibold text-foreground/85">{booking.service}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-muted-foreground">
            <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
            <span className="truncate">{booking.city}</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{booking.minutesAgo} min ago</span>
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
