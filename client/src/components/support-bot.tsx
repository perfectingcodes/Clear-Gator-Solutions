import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, CheckCircle2 } from "lucide-react";

type Sender = "bot" | "user";
type Msg = { id: number; sender: Sender; text: string };

type Step =
  | "greet"
  | "askName"
  | "askEmail"
  | "askPhone"
  | "askTopic"
  | "askMessage"
  | "done";

type Lead = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "clear-gator-support-leads";

const TOPICS = ["Get a quote", "Existing job", "Service question", "Other"];

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 7;

function saveLead(lead: Lead) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: Lead[] = raw ? JSON.parse(raw) : [];
    list.push(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore storage errors
  }
}

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greet");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm the Clear Gator support bot. I can help you get a quote, check on a job, or pass your question to our team. What's your name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState<Partial<Lead>>({});
  const [unread, setUnread] = useState(false);
  const idRef = useRef(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "greet") setStep("askName");
  }, [step]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const pushBot = (text: string) =>
    setMessages((m) => [...m, { id: idRef.current++, sender: "bot", text }]);
  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: idRef.current++, sender: "user", text }]);

  const handleSend = (raw?: string) => {
    const value = (raw ?? input).trim();
    if (!value || step === "done") return;
    pushUser(value);
    setInput("");

    setTimeout(() => {
      switch (step) {
        case "askName": {
          setLead((l) => ({ ...l, name: value }));
          pushBot(`Nice to meet you, ${value.split(" ")[0]}! What's the best email to reach you at?`);
          setStep("askEmail");
          break;
        }
        case "askEmail": {
          if (!isValidEmail(value)) {
            pushBot("Hmm, that doesn't look like a valid email. Mind trying again?");
            return;
          }
          setLead((l) => ({ ...l, email: value }));
          pushBot("Got it. What's a good phone number? (We'll only use it for this request.)");
          setStep("askPhone");
          break;
        }
        case "askPhone": {
          if (!isValidPhone(value)) {
            pushBot("That phone number looks short — could you double-check it?");
            return;
          }
          setLead((l) => ({ ...l, phone: value }));
          pushBot("Thanks! What can we help you with today?");
          setStep("askTopic");
          break;
        }
        case "askTopic": {
          setLead((l) => ({ ...l, topic: value }));
          pushBot("Perfect. Tell me a bit more about what you need and I'll make sure the right person gets back to you.");
          setStep("askMessage");
          break;
        }
        case "askMessage": {
          const finalLead: Lead = {
            name: lead.name ?? "",
            email: lead.email ?? "",
            phone: lead.phone ?? "",
            topic: lead.topic ?? "",
            message: value,
            createdAt: new Date().toISOString(),
          };
          saveLead(finalLead);
          pushBot(
            `Thanks, ${finalLead.name.split(" ")[0]}! I've passed your info to our team. Someone will reach out within 24 hours. For anything urgent, give us a ring at (305) 555-0190.`
          );
          setStep("done");
          break;
        }
      }
    }, 350);
  };

  const handleTopic = (topic: string) => {
    if (step !== "askTopic") return;
    handleSend(topic);
  };

  const toggleOpen = () => {
    setOpen((o) => !o);
    if (!open) setUnread(false);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={toggleOpen}
          aria-label="Open support chat"
          data-testid="support-bot-toggle"
          className="fixed bottom-4 right-4 z-[60] w-14 h-14 rounded-full bg-gator-orange hover:bg-gator-orange-dark text-white shadow-2xl shadow-gator-orange/40 flex items-center justify-center transition-all hover:scale-105"
          style={{ marginBottom: "calc(env(safe-area-inset-bottom, 0px) + 76px)" }}
        >
          <MessageCircle className="w-6 h-6" />
          {unread && (
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-background" />
          )}
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Support chat"
          data-testid="support-bot-window"
          className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[520px] max-h-[80vh] bg-card border border-card-border rounded-2xl shadow-2xl shadow-black/30 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200"
          style={{ marginBottom: "calc(env(safe-area-inset-bottom, 0px) + 76px)" }}
        >
          <div className="flex items-center gap-3 p-4 border-b border-card-border bg-gator-orange text-white">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm leading-tight">Clear Gator Support</div>
              <div className="text-[11px] text-white/80 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online · replies in minutes
              </div>
            </div>
            <button
              type="button"
              onClick={toggleOpen}
              aria-label="Close support chat"
              className="w-8 h-8 rounded-md hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-gator-orange text-white rounded-br-sm"
                      : "bg-background border border-card-border text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {step === "askTopic" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTopic(t)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-background border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {step === "done" && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 pl-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Request submitted
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-card-border bg-background flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step === "done" ? "Conversation complete" : "Type your message..."}
              disabled={step === "done"}
              data-testid="support-bot-input"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || step === "done"}
              className="w-9 h-9 rounded-lg bg-gator-orange hover:bg-gator-orange-dark disabled:bg-muted disabled:text-muted-foreground text-white flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
