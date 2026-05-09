import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  Compass,
  Globe,
  Landmark,
  Leaf,
  Menu,
  MessageSquare,
  PackageSearch,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Target,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import BazaarBot from './components/BazaarBot';
import heroImage from './assets/hero.png';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'AI Tools', path: '/tools' },
  { label: 'Schemes', path: '/schemes' },
  { label: 'Impact', path: '/impact' },
];

const sectors = [
  { id: 'handicrafts', name: 'Handicrafts', place: 'Srinagar and Budgam', demand: 86, risk: 24 },
  { id: 'tourism', name: 'Tourism', place: 'Dal Lake, Gulmarg, Pahalgam', demand: 78, risk: 38 },
  { id: 'agriculture', name: 'Agriculture', place: 'Pampore, Shopian, Sopore', demand: 82, risk: 42 },
  { id: 'retail', name: 'Retail and Services', place: 'Local bazaars and online stores', demand: 69, risk: 31 },
];

const modules = [
  {
    id: 'market',
    title: 'Global Market Finder',
    group: 'Growth',
    description: 'Find export-ready markets, buyer channels, and pricing angles for Kashmiri products.',
    icon: Globe,
    accent: 'text-sky-300',
  },
  {
    id: 'scheme',
    title: 'Haq Advisor',
    group: 'Finance',
    description: 'Match a business with J&K and India schemes, grants, subsidies, and documents.',
    icon: Landmark,
    accent: 'text-emerald-300',
  },
  {
    id: 'dukaan',
    title: 'Digital Dukaan',
    group: 'Sales',
    description: 'Generate a marketplace listing, price guidance, and photo checklist for sellers.',
    icon: ShoppingBag,
    accent: 'text-amber-300',
  },
  {
    id: 'climate',
    title: 'Climate Shield',
    group: 'Risk',
    description: 'Estimate weather, seasonal, and supply risk for saffron, apples, tourism, and logistics.',
    icon: CloudSun,
    accent: 'text-cyan-300',
  },
  {
    id: 'skills',
    title: 'Skill Compass',
    group: 'Workforce',
    description: 'Predict next skills a Kashmiri business needs for digital growth and resilience.',
    icon: Compass,
    accent: 'text-indigo-300',
  },
  {
    id: 'resilience',
    title: 'Continuity Simulator',
    group: 'Risk',
    description: 'Run a what-if scenario and get a resilience score with practical recovery actions.',
    icon: ShieldCheck,
    accent: 'text-rose-300',
  },
];

const marketData = {
  handicrafts: {
    product: 'Pashmina shawls and walnut wood craft',
    markets: ['UAE boutique stores', 'UK heritage gift shops', 'US ethical fashion'],
    action: 'Add GI proof, artisan story, care card, and export-size packaging.',
    revenue: '18-32%',
  },
  tourism: {
    product: 'Houseboat stays and guided experiences',
    markets: ['Domestic premium travel', 'GCC family travel', 'EU slow tourism'],
    action: 'Bundle winter, craft, food, and local guide experiences into bookable packages.',
    revenue: '14-26%',
  },
  agriculture: {
    product: 'Saffron, apples, walnuts, honey',
    markets: ['Metro gourmet stores', 'GCC dry fruit buyers', 'D2C subscription boxes'],
    action: 'Use batch traceability, moisture-safe packaging, and seasonal pre-orders.',
    revenue: '16-29%',
  },
  retail: {
    product: 'Local retail and service businesses',
    markets: ['Nearby repeat buyers', 'WhatsApp commerce', 'Google Maps discovery'],
    action: 'Launch catalog, UPI checkout, reviews, and weekly offer automation.',
    revenue: '10-22%',
  },
};

const schemeMatches = [
  { name: 'PMEGP', fit: 'High', note: 'Good for new manufacturing, services, and artisan units.' },
  { name: 'J&K KVIB support', fit: 'High', note: 'Useful for village industries, training, and credit-linked support.' },
  { name: 'MSME Udyam', fit: 'Essential', note: 'Base registration for loans, procurement, and formal benefits.' },
  { name: 'GI and craft certification', fit: 'Medium', note: 'Protects authentic Pashmina, saffron, and regional craft value.' },
];

const getCurrentPath = () => {
  const path = window.location.pathname;
  return navItems.some((item) => item.path === path) ? path : '/';
};

const App = () => {
  const [path, setPath] = useState(getCurrentPath);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeSector, setActiveSector] = useState('handicrafts');
  const [activeModule, setActiveModule] = useState('market');
  const [query, setQuery] = useState('');
  const [scenario, setScenario] = useState('road-closure');
  const [monthlySales, setMonthlySales] = useState(180000);
  const [digitalLevel, setDigitalLevel] = useState(45);

  useEffect(() => {
    const onPopState = () => setPath(getCurrentPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sector = sectors.find((item) => item.id === activeSector);
  const market = marketData[activeSector];

  const resilienceScore = useMemo(() => {
    const scenarioPenalty = scenario === 'cyber' ? 18 : scenario === 'weather' ? 14 : 11;
    return Math.max(35, Math.min(96, Math.round(digitalLevel * 0.55 + sector.demand * 0.45 - scenarioPenalty + 18)));
  }, [digitalLevel, scenario, sector.demand]);

  const forecast = useMemo(() => {
    const demandLift = sector.demand / 100;
    const digitalLift = digitalLevel / 160;
    const low = Math.round(monthlySales * (1 + demandLift * 0.08 + digitalLift));
    const high = Math.round(monthlySales * (1 + demandLift * 0.18 + digitalLift * 1.4));
    return { low, high };
  }, [digitalLevel, monthlySales, sector.demand]);

  const filteredModules = modules.filter((module) => {
    const haystack = `${module.title} ${module.group} ${module.description}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const sharedProps = {
    activeModule,
    activeSector,
    digitalLevel,
    filteredModules,
    forecast,
    market,
    monthlySales,
    navigate,
    query,
    resilienceScore,
    scenario,
    sector,
    setActiveModule,
    setActiveSector,
    setDigitalLevel,
    setIsBotOpen,
    setMonthlySales,
    setQuery,
    setScenario,
  };

  return (
    <div className="min-h-screen bg-[#07110f] font-sans text-white selection:bg-emerald-200 selection:text-emerald-950">
      <Ticker />
      <Nav path={path} navigate={navigate} mobileNav={mobileNav} setMobileNav={setMobileNav} setIsBotOpen={setIsBotOpen} />

      <AnimatePresence mode="wait">
        <motion.main key={path} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
          {path === '/' && <HomePage {...sharedProps} />}
          {path === '/dashboard' && <DashboardPage {...sharedProps} />}
          {path === '/tools' && <ToolsPage {...sharedProps} />}
          {path === '/schemes' && <SchemesPage />}
          {path === '/impact' && <ImpactPage {...sharedProps} />}
        </motion.main>
      </AnimatePresence>

      <Footer navigate={navigate} setIsBotOpen={setIsBotOpen} />

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsBotOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-emerald-950 shadow-2xl shadow-emerald-900/40"
        aria-label="Toggle Bazaar Bot"
      >
        {isBotOpen ? <X size={25} /> : <MessageSquare size={25} />}
      </motion.button>

      <AnimatePresence>
        {isBotOpen && <BazaarBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} sector={sector.name} />}
      </AnimatePresence>
    </div>
  );
};

const Ticker = () => (
  <div className="border-b border-white/10 bg-emerald-950 text-white">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-2 overflow-hidden px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-100 sm:grid-cols-[260px_1fr] sm:px-6 lg:px-8">
      <span className="relative z-10 whitespace-nowrap text-amber-300">Live Kashmir Business Signals</span>
      <div className="relative min-w-0 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-emerald-950 to-transparent" />
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex w-max gap-10 pl-12">
          {[
            'Pampore saffron: premium demand rising',
            'Walnut wood: export inquiries up',
            'Houseboats: winter packages trending',
            'Apple cold-chain risk: medium',
            'GI proof improves buyer trust',
            'Pampore saffron: premium demand rising',
            'Walnut wood: export inquiries up',
            'Houseboats: winter packages trending',
            'Apple cold-chain risk: medium',
            'GI proof improves buyer trust',
          ].map((item, index) => (
            <span key={`${item}-${index}`} className="whitespace-nowrap">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
);

const Nav = ({ path, navigate, mobileNav, setMobileNav, setIsBotOpen }) => (
  <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#07110f]/88 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <button onClick={() => navigate('/')} className="flex items-center gap-3" aria-label="Go to home">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20">
          <Zap size={22} fill="currentColor" />
        </span>
        <span className="text-xl font-bold tracking-tight">Wular AI</span>
      </button>

      <div className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${path === item.path ? 'bg-emerald-300 text-emerald-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setIsBotOpen(true)} className="hidden rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-950 transition hover:bg-emerald-100 sm:inline-flex">
          Ask Bazaar Bot
        </button>
        <button className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/10" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button onClick={() => setMobileNav((value) => !value)} className="rounded-lg border border-white/10 p-2 md:hidden" aria-label="Open menu">
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>
    {mobileNav && (
      <div className="border-t border-white/10 px-4 py-3 md:hidden">
        {navItems.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)} className={`block w-full rounded-lg px-3 py-3 text-left text-sm font-bold ${path === item.path ? 'bg-emerald-300 text-emerald-950' : 'text-slate-200 hover:bg-white/10'}`}>
            {item.label}
          </button>
        ))}
      </div>
    )}
  </nav>
);

const HomePage = ({ forecast, market, navigate, resilienceScore, sector, setIsBotOpen }) => (
  <div>
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Kashmir landscape" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07110f] via-[#07110f]/86 to-[#07110f]/55" />
      </div>
      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-950/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">
            <Sparkles size={14} className="text-amber-300" />
            AI for Kashmiri business growth
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-white md:text-7xl">Future-proof Kashmiri businesses from the bazaar to the world.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
            Wular AI helps artisans, growers, tourism operators, and local shops forecast demand, find buyers, access schemes, reduce risk, and build digital sales.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button onClick={() => navigate('/tools')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-6 py-3 font-bold text-emerald-950 transition hover:bg-emerald-300">
              Open AI tools <ArrowUpRight size={19} />
            </button>
            <button onClick={() => setIsBotOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15">
              Chat with Bazaar Bot <MessageSquare size={19} />
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#07110f]/82 p-5 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Business Health</p>
              <h2 className="mt-2 text-5xl font-black">{Math.round((sector.demand + resilienceScore) / 2)}</h2>
            </div>
            <div className="rounded-lg bg-emerald-400/15 p-3 text-emerald-200">
              <BarChart3 size={30} />
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ['Selected sector', sector.name],
              ['Primary area', sector.place],
              ['Forecast range', `Rs ${forecast.low.toLocaleString('en-IN')} - Rs ${forecast.high.toLocaleString('en-IN')}`],
              ['Next action', market.action],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <PagePreview navigate={navigate} />
  </div>
);

const PagePreview = ({ navigate }) => (
  <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
    {navItems.slice(1).map((item) => (
      <button key={item.path} onClick={() => navigate(item.path)} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-emerald-300 hover:bg-emerald-300/10">
        <p className="text-lg font-black">{item.label}</p>
        <p className="mt-2 text-sm text-slate-400">Open the {item.label.toLowerCase()} page</p>
      </button>
    ))}
  </section>
);

const DashboardPage = ({ activeSector, forecast, market, resilienceScore, sector, setActiveSector }) => (
  <PageShell eyebrow="Dashboard" title="Choose a Kashmir business type" subtitle="Each sector changes the health score, forecast, market actions, and AI recommendations across the website.">
    <div className="grid gap-4 md:grid-cols-4">
      {sectors.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSector(item.id)}
          className={`rounded-lg border p-5 text-left transition ${activeSector === item.id ? 'border-emerald-300 bg-emerald-300/12' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'}`}
        >
          <BriefcaseBusiness className="mb-4 text-emerald-200" size={24} />
          <h3 className="font-bold">{item.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{item.place}</p>
          <div className="mt-5 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-emerald-300" style={{ width: `${item.demand}%` }} />
          </div>
        </button>
      ))}
    </div>
    <div className="mt-8 grid gap-4 md:grid-cols-4">
      <Stat label="Active sector" value={sector.name} />
      <Stat label="Business health" value={Math.round((sector.demand + resilienceScore) / 2)} />
      <Stat label="Forecast low" value={`Rs ${forecast.low.toLocaleString('en-IN')}`} />
      <Stat label="Forecast high" value={`Rs ${forecast.high.toLocaleString('en-IN')}`} />
    </div>
    <ResultCard icon={Target} title="Recommended action" value={market.action} />
  </PageShell>
);

const ToolsPage = (props) => (
  <PageShell eyebrow="AI Tools" title="Working modules for growth, risk, and sales" subtitle="Search and open each tool as its own working panel.">
    <div className="mb-6 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          value={props.query}
          onChange={(event) => props.setQuery(event.target.value)}
          placeholder="Search tools, risk, export, schemes..."
          className="w-full rounded-lg border border-white/10 bg-white/8 py-3 pl-10 pr-4 text-sm text-white outline-none ring-emerald-300/40 transition placeholder:text-slate-500 focus:ring-4"
        />
      </div>
    </div>
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-3">
        {props.filteredModules.map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => props.setActiveModule(module.id)}
              className={`flex items-center gap-4 rounded-lg border p-4 text-left transition ${props.activeModule === module.id ? 'border-emerald-300 bg-emerald-300/12' : 'border-white/10 bg-[#07110f]/70 hover:bg-white/[0.06]'}`}
            >
              <Icon className={module.accent} size={24} />
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{module.title}</span>
                <span className="mt-1 block text-sm text-slate-400">{module.description}</span>
              </span>
              <ChevronRight size={18} className="text-slate-500" />
            </button>
          );
        })}
      </div>
      <ToolPanel {...props} activeTool={modules.find((module) => module.id === props.activeModule)} />
    </div>
  </PageShell>
);

const SchemesPage = () => (
  <PageShell eyebrow="Schemes" title="Haq Advisor shortlist" subtitle="A practical starting list for Kashmiri SMEs with scheme fit and preparation notes.">
    <div className="grid gap-4 md:grid-cols-2">
      {schemeMatches.map((scheme) => (
        <div key={scheme.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold">{scheme.name}</h3>
            <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold text-emerald-200">{scheme.fit}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">{scheme.note}</p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-emerald-200 transition hover:bg-white/10">
            View document checklist <ArrowUpRight size={16} />
          </button>
        </div>
      ))}
    </div>
  </PageShell>
);

const ImpactPage = ({ digitalLevel, market, resilienceScore, sector }) => (
  <PageShell eyebrow="Impact" title="Measure the business improvement" subtitle="The demo tracks income lift, risk reduction, buyer channels, and readiness for the selected Kashmiri business.">
    <div className="grid gap-4 md:grid-cols-4">
      <Stat label="Income lift forecast" value={market.revenue} />
      <Stat label="Buyer channels" value={market.markets.length} />
      <Stat label="Resilience score" value={resilienceScore} />
      <Stat label="Digital readiness" value={`${digitalLevel}%`} />
    </div>
    <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Selected business story</p>
      <p className="mt-3 text-lg font-semibold leading-8 text-slate-100">
        For {sector.name}, Wular AI focuses on verified local identity, buyer discovery, scheme readiness, climate resilience, and simple digital sales workflows that work for real Kashmir conditions.
      </p>
    </div>
  </PageShell>
);

const PageShell = ({ children, eyebrow, subtitle, title }) => (
  <section className="mx-auto min-h-[calc(100vh-220px)] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mb-10 max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-300">{subtitle}</p>
    </div>
    {children}
  </section>
);

const ToolPanel = ({
  activeModule,
  activeTool,
  digitalLevel,
  forecast,
  market,
  monthlySales,
  resilienceScore,
  scenario,
  sector,
  setDigitalLevel,
  setMonthlySales,
  setScenario,
}) => {
  const Icon = activeTool.icon;

  return (
    <motion.div key={activeModule} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-white/10 bg-[#07110f] p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <Icon className={activeTool.accent} size={28} />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{activeTool.group}</p>
          </div>
          <h3 className="mt-3 text-3xl font-black">{activeTool.title}</h3>
          <p className="mt-3 text-slate-400">{activeTool.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {activeModule === 'market' && (
          <>
            <ResultCard icon={PackageSearch} title="Best product angle" value={market.product} />
            <div className="grid gap-3 md:grid-cols-3">
              {market.markets.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <Globe className="mb-3 text-sky-300" size={21} />
                  <p className="text-sm font-bold">{item}</p>
                </div>
              ))}
            </div>
            <ResultCard icon={Target} title="Recommended next move" value={market.action} />
          </>
        )}

        {activeModule === 'scheme' && (
          <div className="grid gap-4 md:grid-cols-2">
            {schemeMatches.map((scheme) => (
              <ResultCard key={scheme.name} icon={Landmark} title={`${scheme.name}: ${scheme.fit}`} value={scheme.note} />
            ))}
          </div>
        )}

        {activeModule === 'dukaan' && (
          <>
            <label className="text-sm font-bold text-slate-300" htmlFor="sales">Current monthly sales</label>
            <input id="sales" type="range" min="25000" max="800000" step="5000" value={monthlySales} onChange={(event) => setMonthlySales(Number(event.target.value))} />
            <ResultCard icon={TrendingUp} title="90-day online sales forecast" value={`Rs ${forecast.low.toLocaleString('en-IN')} - Rs ${forecast.high.toLocaleString('en-IN')}`} />
            <ResultCard icon={ShoppingBag} title="Listing draft" value={`Authentic Kashmiri ${market.product}, crafted with local skill, traceable origin, careful packaging, and buyer-ready story.`} />
          </>
        )}

        {activeModule === 'climate' && (
          <>
            <ResultCard icon={CloudSun} title={`${sector.name} risk level`} value={sector.risk > 36 ? 'Medium: prepare backup stock, route plan, and weather alerts.' : 'Low: monitor demand spikes and keep supplier alternatives ready.'} />
            <ResultCard icon={Sprout} title="Local action" value="Track weekly weather, keep moisture-safe packaging, and build a 14-day buffer during peak season." />
          </>
        )}

        {activeModule === 'skills' && (
          <>
            <label className="text-sm font-bold text-slate-300" htmlFor="digital">Digital readiness</label>
            <input id="digital" type="range" min="10" max="95" value={digitalLevel} onChange={(event) => setDigitalLevel(Number(event.target.value))} />
            <div className="grid gap-4 md:grid-cols-3">
              {['UPI and invoices', 'Product photography', 'WhatsApp catalog automation'].map((skill) => (
                <ResultCard key={skill} icon={CheckCircle2} title={skill} value="Recommended for the next 30 days." />
              ))}
            </div>
          </>
        )}

        {activeModule === 'resilience' && (
          <>
            <select value={scenario} onChange={(event) => setScenario(event.target.value)} className="rounded-lg border border-white/10 bg-[#0f211c] px-4 py-3 text-white outline-none">
              <option value="road-closure">Road closure or supply delay</option>
              <option value="weather">Extreme weather season</option>
              <option value="cyber">Payment or account cyber issue</option>
            </select>
            <ResultCard icon={ShieldCheck} title="Resilience score" value={`${resilienceScore}/100`} />
            <ResultCard icon={Leaf} title="Recovery plan" value="Keep alternate suppliers, offline records, emergency customer messages, and a 30-day cash-flow buffer." />
          </>
        )}
      </div>
    </motion.div>
  );
};

const ResultCard = ({ icon: Icon, title, value }) => (
  <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-5">
    <Icon className="mb-3 text-emerald-200" size={23} />
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{title}</p>
    <p className="mt-3 text-base font-semibold leading-7 text-slate-100">{value}</p>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
    <p className="break-words text-3xl font-black text-emerald-200">{value}</p>
    <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
  </div>
);

const Footer = ({ navigate, setIsBotOpen }) => (
  <footer className="border-t border-white/10 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
      <p>Wular AI, made for Kashmir. Multipage demo prototype for business growth and future-proofing.</p>
      <div className="flex flex-wrap gap-4">
        {navItems.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)} className="font-bold text-slate-300 hover:text-emerald-200">
            {item.label}
          </button>
        ))}
        <button onClick={() => setIsBotOpen(true)} className="inline-flex items-center gap-2 font-bold text-emerald-200">
          Start diagnosis <Bot size={17} />
        </button>
      </div>
    </div>
  </footer>
);

export default App;
