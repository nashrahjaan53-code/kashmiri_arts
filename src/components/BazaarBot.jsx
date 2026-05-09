import { useEffect, useRef, useState } from 'react';
import { Bot, Languages, Mic, Send, Sparkles, User, X } from 'lucide-react';
import { motion } from 'framer-motion';

const playbooks = [
  {
    keywords: ['export', 'buyer', 'global', 'market', 'etsy', 'amazon'],
    answer:
      'For export growth, start with one hero product, GI or origin proof, clear dimensions, moisture-safe packaging, and a short artisan story. For Kashmir, UAE boutiques, UK heritage stores, and ethical fashion marketplaces are strong first targets.',
  },
  {
    keywords: ['scheme', 'loan', 'grant', 'pmegp', 'kvib', 'finance', 'money'],
    answer:
      'Your first finance checklist should be Udyam registration, Aadhaar/PAN, bank statement, project cost, photos of work, and proof of local unit. PMEGP and J&K KVIB support are good starting points for many Kashmiri SMEs.',
  },
  {
    keywords: ['saffron', 'apple', 'walnut', 'farm', 'climate', 'weather'],
    answer:
      'For growers, future-proofing means batch traceability, storage protection, pre-season buyer commitments, and weather alerts. Keep a two-week logistics buffer during fragile harvest and road-risk periods.',
  },
  {
    keywords: ['tourism', 'hotel', 'houseboat', 'travel', 'guest'],
    answer:
      'For tourism, package the experience instead of selling only a stay: local food, craft visits, guide support, airport pickup, and seasonal itineraries. This raises trust and average booking value.',
  },
  {
    keywords: ['digital', 'whatsapp', 'instagram', 'listing', 'photo', 'online'],
    answer:
      'Your digital starter plan: Google Business profile, WhatsApp catalog, 12 clean product photos, UPI payment flow, review collection, and one weekly offer message. This is enough to look serious online.',
  },
];

const quickPrompts = [
  'How do I export Pashmina?',
  'Which scheme can help me?',
  'Make my shop digital',
  'How to protect saffron sales?',
];

const BazaarBot = ({ isOpen, onClose, sector = 'Kashmiri business' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Assalamu alaikum. I am Bazaar Bot for ${sector}. Ask me about exports, schemes, online selling, climate risk, or skills.`,
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const messageIdRef = useRef(2);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getReply = (text) => {
    const normalized = text.toLowerCase();
    const match = playbooks.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));

    if (match) {
      return match.answer;
    }

    return `For ${sector}, I would first check three things: current monthly sales, top product or service, and biggest risk. Then Wular AI can suggest one buyer channel, one funding path, and one skill to learn this month.`;
  };

  const handleSend = (value = input) => {
    if (!value.trim()) return;

    const userMessage = { id: messageIdRef.current, type: 'user', text: value };
    messageIdRef.current += 1;
    setMessages((current) => [...current, userMessage]);
    setInput('');

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: messageIdRef.current,
          type: 'bot',
          text: getReply(value),
        },
      ]);
      messageIdRef.current += 1;
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 24 }}
      className="fixed bottom-24 right-4 z-50 flex h-[560px] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#07110f] shadow-2xl sm:right-6"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-emerald-950/75 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-300 text-emerald-950">
            <Bot size={23} />
          </div>
          <div>
            <h3 className="font-bold text-white">Bazaar Bot</h3>
            <p className="flex items-center gap-1 text-xs text-emerald-200">
              <Languages size={13} /> English, Urdu, Kashmiri-ready
            </p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10" aria-label="Close chat">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'bot' && <Bot className="mt-2 shrink-0 text-emerald-200" size={18} />}
            <div className={`max-w-[82%] rounded-lg p-3 text-sm leading-6 ${message.type === 'user' ? 'bg-emerald-300 text-emerald-950' : 'bg-white/[0.07] text-slate-100'}`}>
              {message.text}
            </div>
            {message.type === 'user' && <User className="mt-2 shrink-0 text-emerald-200" size={18} />}
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button key={prompt} onClick={() => handleSend(prompt)} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10">
              {prompt}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-white/10 p-3 text-slate-300" aria-label="Voice input demo">
            <Mic size={18} />
          </button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSend()}
            placeholder="Ask about your Kashmiri business..."
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none ring-emerald-300/40 placeholder:text-slate-500 focus:ring-4"
          />
          <button onClick={() => handleSend()} className="rounded-lg bg-emerald-300 p-3 text-emerald-950 transition hover:bg-emerald-200" aria-label="Send message">
            <Send size={18} />
          </button>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-slate-500">
          <Sparkles size={12} /> Demo AI logic. Add a real API later for production answers.
        </p>
      </div>
    </motion.div>
  );
};

export default BazaarBot;
