import React, { useState, useEffect, useRef, useContext, createContext } from 'react';

// --- MOCK DATA ---
// Centralizing all site content for easier management and scalability.
const siteData = {
  companyName: "Paul's Roofing",
  tagline: "Southern New Brunswick's Premier Metal Roofing Specialist",
  contact: {
    phone: "(506) 717-PAUL",
    phoneHref: "tel:+15067177285",
    email: "paul@paulsroofing.ca",
    emergencyEmail: "247@paulsroofing.ca",
    address: "Quispamsis, New Brunswick",
    facebookUrl: "https://www.facebook.com/paulsroofnb",
  },
  branding: {
      logoUrl: "https://i.ibb.co/27bdbCdp/D3-C774-CF-1-A36-40-AF-B385-07-CF5-DCC67-E4.png",
      lunaiLogoUrl: "https://placehold.co/100x40/111827/FBBF24?text=lunAi",
      placedLogoUrl: "https://placehold.co/100x40/111827/F9FAFB?text=plAced"
  },
  nav: {
    main: [
      { href: '/', label: 'Home', icon: 'HomeIcon' },
      { href: '/what-we-do', label: 'Services', icon: 'WrenchIcon' },
      { href: '/where-we-do-it', label: 'Our Work', icon: 'MapPinIcon' },
      { href: '/ask-your-neighbour', label: 'About Us', icon: 'UsersIcon' },
      { href: '/handbook', label: "Owner's Handbook", icon: 'BookOpenIcon'},
    ],
    footer: [
      { href: '/what-we-do', label: 'Services' },
      { href: '/where-we-do-it', label: 'Our Work' },
      { href: '/ask-your-neighbour', label: 'About Us' },
      { href: '/handbook', label: "Owner's Handbook"},
      { href: '/get-quote', label: 'Get a Quote' },
    ]
  },
  testimonials: [
    { text: "Paul's Roofing did an incredible job on our new metal roof in Quispamsis. Professional, efficient, and the quality is outstanding. Highly recommend!", author: "Sarah L., Quispamsis, NB" },
    { text: "Emergency repair in the middle of winter - Paul came out the same day and fixed our leak. Saved us from thousands in water damage!", author: "Mike T., Saint John, NB" },
    { text: "30 years experience really shows. Our shingle roof looks amazing and hasn't had a single issue in 3 years. Paul's is the best!", author: "Jennifer R., Hampton, NB" },
  ],
  services: [
    { 
      id: 'metal', 
      title: 'PREMIUM METAL ROOFING', 
      icon: '🏠', 
      image: 'https://images.unsplash.com/photo-1564153278942-63670a41a39c?q=80&w=2070&auto=format&fit=crop',
      desc: "We specialize in high-quality metal roofing systems sourced from industry leaders like Community Metal and Dairy Town Exteriors. These systems offer unparalleled durability, longevity, and resistance to harsh Atlantic Canadian weather.",
      features: ["Superior resistance to extreme weather", "Exceptional longevity (50+ years)", "Energy-efficient, reflecting solar heat", "Low maintenance and fire-resistant", "Increases home value significantly"],
      isFeatured: true,
      warranty: {
        title: "Industry-Leading Warranties",
        points: [
            "40-Year Paint Warranty on most colours, ensuring your roof won't chip, crack, or peel.",
            "Lifetime Material Warranty on steel roofing panels against defects.",
            "Our own comprehensive Workmanship Guarantee on all installations."
        ]
      },
      colors: [
        {name: 'Black', hex: '#2C3A47'},
        {name: 'Charcoal', hex: '#535C68'},
        {name: 'Graphite Grey', hex: '#57606f'},
        {name: 'Bright Red', hex: '#E74C3C'},
        {name: 'Forest Green', hex: '#228B22'},
        {name: 'Galvalume', hex: '#BDC3C7'},
        {name: 'Ocean Blue', hex: '#3498DB'},
        {name: 'White', hex: '#FDFEFE'}
      ]
    },
    { 
      id: 'shingle', 
      title: 'ARCHITECTURAL SHINGLES', 
      icon: '🔧', 
      image: 'https://images.unsplash.com/photo-1599751449208-e327d783811b?q=80&w=2070&auto=format&fit=crop',
      desc: "We install a wide range of high-performance architectural shingles from Canada's top manufacturers, including IKO and BP. These products offer an excellent combination of durability, curb appeal, and value.",
      features: ["Proven durability & weather resistance", "Wide range of designer colors & styles", "Cost-effective roofing solution", "Excellent manufacturer warranties"],
      suppliers: [
          { name: 'IKO', logoUrl: 'https://www.iko.com/na/wp-content/themes/iko/dist/images/logo.svg', visualizerUrl: 'https://www.iko.com/na/roofviewer/' },
          { name: 'BP Canada', logoUrl: 'https://bpcan.com/wp-content/themes/bp-canada/img/logo-bp.svg', visualizerUrl: 'https://bpcan.com/visualizer/' }
      ]
    },
    { 
      id: 'exterior', 
      title: 'EXTERIOR MAINTENANCE', 
      icon: '🔨', 
      image: 'https://images.unsplash.com/photo-1600585152225-357245853333?q=80&w=2070&auto=format&fit=crop',
      desc: "Beyond roofing, we offer extensive exterior maintenance and remodeling services to ensure your entire home is protected and looks its best, preventing costly future damages.",
      features: ["Siding repair and installation", "Gutter cleaning and repair", "Fascia and soffit maintenance", "Comprehensive exterior inspections"],
    },
  ],
   comparisonData: [
    { feature: 'Lifespan', metal: '50-70+ Years', shingle: '15-30 Years', winner: 'metal' },
    { feature: 'Cost', metal: 'Higher Initial Cost', shingle: 'Lower Initial Cost', winner: 'shingle' },
    { feature: 'Maintenance', metal: 'Very Low', shingle: 'Moderate', winner: 'metal' },
    { feature: 'Weather Resistance', metal: 'Excellent', shingle: 'Good to Very Good', winner: 'metal' },
    { feature: 'Energy Efficiency', metal: 'High (Reflects Heat)', shingle: 'Moderate', winner: 'metal' },
  ],
  portfolio: [
    { title: "Sleek Metal Roof", location: "Quispamsis, NB", image: "https://images.unsplash.com/photo-1564153278942-63670a41a39c?q=80&w=2070&auto=format&fit=crop" },
    { title: "Architectural Shingles", location: "Saint John, NB", image: "https://images.unsplash.com/photo-1599751449208-e327d783811b?q=80&w=2070&auto=format&fit=crop" },
    { title: "Custom Flashing Detail", location: "Hampton, NB", image: "https://images.unsplash.com/photo-1605146234333-259165b4515a?q=80&w=1974&auto=format&fit=crop" },
    { title: "Full Exterior Upgrade", location: "Rothesay, NB", image: "https://images.unsplash.com/photo-1600585152225-357245853333?q=80&w=2070&auto=format&fit=crop" },
  ],
  processSteps: [
    {step: 1, title: 'Consultation', desc: 'We discuss your needs and assess your property.'},
    {step: 2, title: 'Detailed Quote', desc: 'You receive a clear, itemized, no-obligation estimate.'},
    {step: 3, title: 'Expert Installation', desc: 'Our experienced crew completes the work efficiently.'},
    {step: 4, title: 'Final Walk-through', desc: 'We ensure your complete satisfaction with the final result.'}
  ],
  whyUs: [
    { icon: 'AwardIcon', title: 'Metal Roofing Specialists', desc: 'Decades of hands-on expertise in every project we undertake.' },
    { icon: 'ShieldIcon', title: 'Licensed & Insured', desc: 'Complete peace of mind knowing you are fully protected.' },
    { icon: 'UsersIcon', title: 'Locally Owned', desc: 'Proudly serving our neighbours in Southern New Brunswick.' },
    { icon: 'StarIcon', title: 'Premium Materials', desc: 'Sourcing from leaders like Community Metal & Dairy Town Exteriors.' },
  ],
  handbookArticles: [
      { slug: 'choosing-metal-roof-color', title: "How to Choose the Perfect Metal Roof Color for Your Home", excerpt: "Your roof color has a huge impact on curb appeal. Here are our top tips for selecting a color that complements your home's style and surroundings.", date: "July 12, 2025" },
      { slug: 'metal-vs-shingles', title: "Metal vs. Shingles: An Honest Comparison for NB Homeowners", excerpt: "We break down the pros and cons of Atlantic Canada's two most popular roofing materials, looking at cost, lifespan, and durability.", date: "July 5, 2025" },
      { slug: 'preparing-for-install', title: "What to Expect: Preparing for Your New Roof Installation", excerpt: "A new roof is exciting! Here’s a simple checklist to ensure everything goes smoothly on installation day.", date: "June 28, 2025" },
  ]
};

// --- ICONS (using inline SVGs to avoid external dependencies) ---
const icons = {
  HomeIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  WrenchIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  MapPinIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  UsersIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  MessageSquareIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  LightningIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  CheckIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  MenuIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
  XIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  AwardIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"/></svg>,
  ShieldIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  StarIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  BookOpenIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  LockIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  ExternalLinkIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
};
const Icon = ({ name, ...props }) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

// --- CUSTOM ROUTER IMPLEMENTATION ---
const RouterContext = createContext(null);
const useLocation = () => useContext(RouterContext);
const Link = ({ href, children, ...props }) => {
  const { navigate } = useLocation();
  const handleClick = (e) => { e.preventDefault(); navigate(href); window.scrollTo(0, 0); };
  return <a href={`#${href.startsWith('/') ? href : '/' + href}`} onClick={handleClick} {...props}>{children}</a>;
};
const Route = ({ path, component }) => {
  const { location } = useLocation();
  return location.pathname === path ? React.createElement(component) : null;
};
const Switch = ({ children }) => {
  const { location } = useLocation();
  let match = null;
  React.Children.forEach(children, child => {
    if (match === null && React.isValidElement(child)) {
      if (child.props.path === undefined || child.props.path === location.pathname) {
        match = child;
      }
    }
  });
  return match;
};
const HashRouter = ({ children }) => {
  const [location, setLocation] = useState({ pathname: window.location.hash.substring(1) || '/' });
  const navigate = (path) => { window.location.hash = path; };
  useEffect(() => {
    const handleHashChange = () => setLocation({ pathname: window.location.hash.substring(1) || '/' });
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  return <RouterContext.Provider value={{ location, navigate }}>{children}</RouterContext.Provider>;
};

// --- STYLES & ANIMATIONS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700;800&family=Roboto:wght@400;500&display=swap');
    html { scroll-behavior: smooth; }
    body { 
      font-family: 'Roboto', sans-serif; 
      line-height: 1.6; 
      color: #9ca3af; /* gray-400 */
      background-color: #030712; /* gray-950 */
      -webkit-font-smoothing: antialiased; 
      -moz-osx-font-smoothing: grayscale; 
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Roboto Slab', serif;
      color: #f9fafb; /* gray-50 */
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .hero-bg { background: linear-gradient(rgba(3, 7, 18, 0.7), rgba(3, 7, 18, 0.7)), url('https://images.unsplash.com/photo-1564153278942-63670a41a39c?q=80&w=2070&auto=format&fit=crop&grayscale&brightness=0.6') no-repeat center center/cover; }
    .testimonial-slide { display: none; animation: fadeIn 0.5s ease-in-out; }
    .testimonial-slide.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .page-header-bg { background-color: #111827; background-image: radial-gradient(#1f2937 1px, transparent 1px); background-size: 20px 20px; }
    .content-card { background-color: #111827; border-color: #374151; }
    .content-card-light { background-color: #1f2937; border-color: #4b5563; }
  `}</style>
);
const AnimatedSection = ({ children, className }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);
    return <section ref={ref} className={`${className} transition-all duration-1000 ease-in ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{children}</section>;
};

// --- LAYOUT COMPONENTS ---
const Header = () => {
  const { location, navigate } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLinkClick = (href) => { navigate(href); setIsMenuOpen(false); };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl py-3">
        <Link href="/" className="flex-shrink-0"><img src={siteData.branding.logoUrl} alt="Paul's Roofing Logo" className="h-12 cursor-pointer" /></Link>
        <nav className="hidden lg:flex gap-1">
          {siteData.nav.main.map(item => <a key={item.href} href={`#${item.href}`} onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }} className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold uppercase tracking-wider rounded-md transition-colors ${location.pathname === item.href ? 'bg-amber-500 text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}><Icon name={item.icon} /><span>{item.label}</span></a>)}
        </nav>
        <div className="flex items-center gap-2">
            <Link href="/get-quote" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-900 bg-amber-500 rounded-md hover:bg-amber-400 transition-colors shadow-sm">
                GET A QUOTE
            </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md text-gray-300 hover:bg-gray-700" aria-label="Toggle menu"><Icon name={isMenuOpen ? 'XIcon' : 'MenuIcon'} /></button>
        </div>
      </div>
      {isMenuOpen && <div className="lg:hidden bg-gray-800 shadow-lg absolute top-full left-0 w-full"><div className="px-2 pt-2 pb-3 space-y-1">{siteData.nav.main.map(item => <a key={item.href} href={`#${item.href}`} onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }} className={`flex items-center gap-3 px-3 py-2 text-base font-semibold uppercase tracking-wider rounded-md ${location.pathname === item.href ? 'bg-amber-500 text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}><Icon name={item.icon} /><span>{item.label}</span></a>)}<div className="border-t border-gray-700 pt-2 mt-2"><Link href="/get-quote" className="flex items-center justify-center gap-3 mt-2 px-3 py-3 text-base font-bold uppercase tracking-wider rounded-md bg-amber-500 text-gray-900">Get a Quote</Link></div></div></div>}
    </header>
  );
};
const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="md:col-span-2 lg:col-span-1"><img src={siteData.branding.logoUrl} alt="Paul's Roofing Logo" className="h-12 mb-4" /><p className="text-sm">Your trusted roofing partner in Southern New Brunswick for over 30 years. Quality and reliability you can count on.</p></div>
            <div><h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Quick Links</h4><ul className="space-y-2">{siteData.nav.footer.map(item => <li key={item.href}><Link href={item.href} className="hover:text-amber-400 text-sm">{item.label}</Link></li>)}</ul></div>
            <div><h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Contact Info</h4><address className="not-italic space-y-2 text-sm"><p>Email: <a href={`mailto:${siteData.contact.email}`} className="hover:text-amber-400">{siteData.contact.email}</a></p><p>Phone: <a href={siteData.contact.phoneHref} className="hover:text-amber-400">{siteData.contact.phone}</a></p><p>{siteData.contact.address}</p></address></div>
            <div><h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Business Hours</h4><p className="text-sm mb-1">Mon - Fri: 6:00 am - 7:00 pm</p><p className="text-sm font-semibold text-red-500">24/7 Emergency Services</p></div>
        </div>
        <div className="container mx-auto px-4 mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm flex justify-between items-center"><p>&copy; {new Date().getFullYear()} {siteData.companyName}. All Rights Reserved.</p><p><Link href="/privacy" className="hover:text-amber-400">Privacy Policy</Link></p></div>
    </footer>
);
const CtaBanner = () => (
    <AnimatedSection className="bg-amber-500 mt-20">
        <div className="container mx-auto max-w-7xl py-12 px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">READY TO START YOUR PROJECT?</h2>
            <p className="text-gray-800 mb-6 max-w-2xl mx-auto">Don't wait for a small leak to become a big problem. Contact us today for a free, no-obligation estimate.</p>
            <Link href="/get-quote" className="inline-block bg-gray-900 text-white font-bold text-lg px-8 py-3 rounded-md transition-transform duration-300 hover:scale-105 shadow-lg hover:bg-black">Get My Free Quote</Link>
        </div>
    </AnimatedSection>
);
const FloatingCta = () => (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <a href={`mailto:${siteData.contact.emergencyEmail}`} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-yellow-300 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors shadow-lg">
            <Icon name="LightningIcon" /> <span className="hidden sm:inline">24/7 EMERGENCY</span>
        </a>
        <Link href="/get-quote" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-900 bg-amber-500 rounded-full hover:bg-amber-400 transition-colors shadow-lg">
            <Icon name="MessageSquareIcon" /> <span className="hidden sm:inline">GET A QUOTE</span>
        </Link>
    </div>
);

// --- PAGE COMPONENTS ---
const HomePage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    useEffect(() => { const timer = setInterval(() => { setCurrentTestimonial(prev => (prev + 1) % siteData.testimonials.length); }, 5000); return () => clearInterval(timer); }, []);
    return (
        <div>
            <section className="hero-bg min-h-screen flex items-center justify-center text-center p-4 pt-32">
                <div className="bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-2xl max-w-3xl text-white">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">THE LAST ROOF YOU'LL EVER NEED.</h1>
                    <p className="text-lg md:text-xl mt-4 text-gray-200 max-w-2xl mx-auto font-sans italic tracking-wider">{siteData.tagline}</p>
                    <div className="mt-8"><Link href="/get-quote" className="inline-block bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 font-bold text-lg px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 shadow-lg hover:from-amber-400 hover:to-amber-500">GET YOUR FREE ESTIMATE</Link></div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl space-y-16 md:space-y-24">
                <AnimatedSection className="content-card p-8 md:p-10 rounded-lg shadow-lg border"><h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-6">WHY CHOOSE PAUL'S ROOFING?</h2><p className="text-center text-lg max-w-4xl mx-auto text-gray-300">With over <strong>30 YEARS OF EXPERIENCE</strong>, Paul's Roofing delivers high-quality workmanship and reliable service. We protect homes across Quispamsis, Saint John, Hampton, and all surrounding areas in Southern New Brunswick.</p></AnimatedSection>
                <AnimatedSection><h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">OUR CORE SERVICES</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{siteData.services.map(item => <div key={item.title} className={`content-card p-8 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-1 border-2 ${item.isFeatured ? 'border-amber-500' : 'border-gray-700'}`}><div className="text-5xl mb-4 text-amber-400">{item.icon}</div><h3 className="text-xl font-bold text-white mb-2">{item.title}</h3><p className="text-gray-400 mb-4 text-sm">{item.desc}</p><Link href={`/what-we-do#${item.id}`} className="font-semibold text-amber-400 hover:text-amber-300 text-sm">LEARN MORE &raquo;</Link></div>)}</div></AnimatedSection>
                <AnimatedSection><h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">ASK YOUR NEIGHBOURS</h2><div className="relative max-w-3xl mx-auto content-card p-8 rounded-lg shadow-lg border-l-4 border-amber-500"><div className="testimonial-slide active"><p className="text-xl italic text-gray-300">"{siteData.testimonials[currentTestimonial].text}"</p><p className="text-right mt-4 font-semibold text-gray-200">&mdash; {siteData.testimonials[currentTestimonial].author}</p></div><div className="flex justify-center gap-2 mt-4">{siteData.testimonials.map((_, index) => <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-2.5 h-2.5 rounded-full transition-colors ${currentTestimonial === index ? 'bg-amber-500' : 'bg-gray-600 hover:bg-gray-500'}`} aria-label={`View testimonial ${index + 1}`}></button>)}</div></div></AnimatedSection>
            </div>
            <CtaBanner />
        </div>
    );
};
const PageShell = ({ title, subtitle, children }) => (
    <div className="pt-32"><div className="page-header-bg py-12 md:py-16 border-b border-gray-700"><div className="container mx-auto px-4 max-w-7xl text-center"><h1 className="text-4xl md:text-5xl font-extrabold text-white">{title}</h1>{subtitle && <p className="text-lg md:text-xl mt-2 text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}</div></div><div className="container mx-auto px-4 py-16 max-w-7xl">{children}</div></div>
);
const ServicesPage = () => {
    const [activeColor, setActiveColor] = useState({});
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const RoofVisualizer = ({ colors, serviceId }) => {
        const currentHex = activeColor[serviceId] || colors[0].hex;
        const currentColor = colors.find(c => c.hex === currentHex);

        return (
            <div className="mt-6">
                <h4 className="font-semibold text-center mb-2 text-white">LIVE COLOR VISUALIZER</h4>
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 flex flex-col justify-center items-center h-48">
                    <svg viewBox="0 0 100 60" className="w-40 h-auto transition-colors duration-300" style={{ fill: currentHex }}>
                        <polygon points="0,60 50,0 100,60" />
                    </svg>
                    <p className="font-semibold text-sm mt-2 text-gray-200">{currentColor.name}</p>
                </div>
                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                    {colors.map(color => (
                        <button 
                            key={color.name} 
                            onClick={() => setActiveColor(prev => ({...prev, [serviceId]: color.hex}))} 
                            className="w-8 h-8 rounded-full border-2 border-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-transform hover:scale-110" 
                            style={{ backgroundColor: color.hex, borderColor: currentHex === color.hex ? '#f59e0b' : '#1f2937' }} 
                            aria-label={color.name}
                        />
                    ))}
                </div>
            </div>
        );
    }

    const SupplierInfo = ({ suppliers }) => (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-white mb-3 text-center">OUR TRUSTED SHINGLE SUPPLIERS</h4>
            <div className="flex justify-center items-center gap-8">
                {suppliers.map(supplier => (
                    <div key={supplier.name} className="text-center">
                        <img src={supplier.logoUrl} alt={`${supplier.name} logo`} className="h-8 mx-auto mb-2 brightness-0 invert" />
                        <a href={supplier.visualizerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300">
                            Try Visualizer <Icon name="ExternalLinkIcon" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );

    const InteractiveComparison = ({ data }) => (
        <div className="content-card p-6 rounded-lg shadow-lg border overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="p-4 font-semibold text-white">FEATURE</th>
                        <th className="p-4 font-semibold text-white text-center">METAL ROOFING</th>
                        <th className="p-4 font-semibold text-white text-center">SHINGLE ROOFING</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr 
                            key={row.feature} 
                            className="border-b border-gray-700"
                            onMouseEnter={() => setHoveredFeature(row.feature)}
                            onMouseLeave={() => setHoveredFeature(null)}
                        >
                            <td className="p-4 font-medium text-gray-200">{row.feature}</td>
                            <td className={`p-4 text-center transition-colors duration-300 ${hoveredFeature === row.feature && row.winner === 'metal' ? 'bg-green-900/50 text-green-300 font-semibold' : 'text-gray-300'}`}>{row.metal}</td>
                            <td className={`p-4 text-center transition-colors duration-300 ${hoveredFeature === row.feature && row.winner === 'shingle' ? 'bg-green-900/50 text-green-300 font-semibold' : 'text-gray-300'}`}>{row.shingle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <PageShell title="OUR SERVICES" subtitle="EXPERT SOLUTIONS FOR EVERY PART OF YOUR ROOF AND EXTERIOR, BUILT TO LAST.">
            <div className="space-y-20">
                {siteData.services.map((service) => (
                    <AnimatedSection key={service.id} id={service.id} className="content-card p-6 md:p-8 rounded-lg shadow-lg border overflow-hidden">
                        <div className="flex flex-wrap md:flex-nowrap gap-8 items-center">
                            <div className="w-full md:w-2/5">
                                <img src={service.image} alt={service.title} className="w-full h-64 object-cover rounded-md"/>
                            </div>
                            <div className="w-full md:w-3/5">
                                <h3 className="text-2xl font-bold text-amber-400 mb-3">{service.icon} {service.title}</h3>
                                <p className="text-gray-400 mb-5">{service.desc}</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {service.features.map(feature => (
                                        <li key={feature} className="flex items-start">
                                            <Icon name="CheckIcon" className="text-amber-400 w-4 h-4 mr-3 mt-1 flex-shrink-0" /> 
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                {service.warranty && (
                                    <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
                                        <h4 className="font-semibold text-amber-400 mb-2">{service.warranty.title}</h4>
                                        <ul className="space-y-1">
                                            {service.warranty.points.map(point => (
                                                <li key={point} className="text-sm text-amber-300/80">{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {service.colors && <RoofVisualizer colors={service.colors} serviceId={service.id} />}
                                {service.suppliers && <SupplierInfo suppliers={service.suppliers} />}
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
                 <AnimatedSection>
                    <h3 className="text-3xl font-bold text-white text-center mb-8">METAL VS. SHINGLE: AN HONEST COMPARISON</h3>
                    <InteractiveComparison data={siteData.comparisonData} />
                    <div className="mt-6 content-card-light p-6 rounded-lg border text-center">
                        <Icon name="BookOpenIcon" className="text-amber-400 w-12 h-12 mx-auto mb-3" />
                        <h4 className="font-semibold text-lg text-white">WANT THE FULL BREAKDOWN?</h4>
                        <p className="text-gray-400 mt-1 mb-3">Get the no-BS, in-depth discussion on which roofing material is right for your home in our handbook.</p>
                        <Link href="/handbook" className="font-semibold text-amber-400 hover:text-amber-300">READ THE METAL VS. SHINGLES GUIDE &raquo;</Link>
                    </div>
                </AnimatedSection>
            </div>
            <CtaBanner />
        </PageShell>
    );
};
const PortfolioPage = () => (
    <PageShell title="OUR WORK" subtitle="A GALLERY OF OUR COMPLETED PROJECTS SHOWCASING OUR COMMITMENT TO QUALITY CRAFTSMANSHIP.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{siteData.portfolio.map(project => <AnimatedSection key={project.title} className="content-card rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-1 border"><img src={project.image} alt={`${project.title} in ${project.location}`} className="w-full h-56 object-cover" /><div className="p-5"><h3 className="text-lg font-semibold text-white">{project.title}</h3><p className="text-amber-400 font-medium text-sm">{project.location}</p></div></AnimatedSection>)}</div>
        <div className="mt-20"><CtaBanner /></div>
    </PageShell>
);
const AboutPage = () => (
    <PageShell title="ABOUT PAUL'S ROOFING" subtitle="A LEGACY OF QUALITY, BUILT ON 30 YEARS OF TRUST AND EXPERIENCE.">
        <div className="space-y-16">
            <AnimatedSection className="content-card p-8 md:p-12 rounded-lg shadow-lg border"><div className="flex flex-wrap md:flex-nowrap gap-10 items-center"><div className="w-full md:w-1/3"><img src="https://images.unsplash.com/photo-1559755863-e45a05a03577?q=80&w=1974&auto=format&fit=crop" alt="Paul, owner of Paul's Roofing" className="rounded-lg shadow-md w-full" /></div><div className="w-full md:w-2/3"><h2 className="text-2xl font-bold text-amber-400 mb-4">OUR STORY</h2><div className="prose prose-invert max-w-none text-gray-300"><p>For over 30 years, Paul's Roofing has been a trusted name in the roofing industry across Southern New Brunswick. Founded on principles of integrity, unmatched craftsmanship, and genuine customer care, we have built our reputation one roof at a time.</p><p>Our passion is providing peace of mind and protecting families' most valuable assets. Every project is approached with the precision and attention to detail that only decades of hands-on experience can provide.</p></div></div></div></AnimatedSection>
            <AnimatedSection><h2 className="text-3xl font-bold text-white text-center mb-12">WHY WE'RE DIFFERENT</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">{siteData.whyUs.map(item => <div key={item.title} className="content-card p-6 rounded-lg shadow-lg border"><div className="text-amber-400 w-12 h-12 flex items-center justify-center mx-auto mb-4"><Icon name={item.icon} /></div><h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3><p className="text-sm text-gray-400">{item.desc}</p></div>)}</div></AnimatedSection>
            <AnimatedSection><h2 className="text-3xl font-bold text-white text-center mb-8">OUR PROCESS: SIMPLE & TRANSPARENT</h2><div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">{siteData.processSteps.map(item => <div key={item.step} className="content-card p-6 rounded-lg shadow-lg border"><div className="bg-amber-500 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">{item.step}</div><h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3><p className="text-sm text-gray-400">{item.desc}</p></div>)}</div></AnimatedSection>
        </div>
        <div className="mt-20"><CtaBanner /></div>
    </PageShell>
);
const ContactPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ projectType: '', roofType: '', description: '', firstName: '', lastName: '', email: '', phone: '', photo: null });
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
        }
    };

    const handleSubmit = (e) => { e.preventDefault(); console.log(formData); alert('Thank you for your request! This is a demo, but in a real site, your quote request would be sent to Paul.'); setStep(1); setFormData({ projectType: '', roofType: '', description: '', firstName: '', lastName: '', email: '', phone: '', photo: null }); };
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const projectTypes = [{id: 'new-roof', label: 'New Roof'}, {id: 'replacement', label: 'Replacement'}, {id: 'repair', label: 'Repair/Leak'}, {id: 'inspection', label: 'Inspection'}];
    const roofTypes = [{id: 'metal', label: 'Metal'}, {id: 'shingles', label: 'Shingles'}, {id: 'unsure', label: 'Unsure'}];

    return (<PageShell title="GET A FREE QUOTE" subtitle="OUR INTERACTIVE PROJECT CONFIGURATOR MAKES GETTING AN ESTIMATE QUICK AND EASY.">
        <div className="content-card p-8 rounded-lg shadow-lg max-w-4xl mx-auto border">
            <div className="flex justify-between items-center mb-4">
                <img src={siteData.branding.lunaiLogoUrl} alt="lunAi Logo" className="h-8" />
                <p className="text-sm text-gray-500">Interactive Quote by lunAi</p>
            </div>
            <div className="mb-8"><div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" style={{width: `${(step/3)*100}%`}}></div></div></div>
            <form data-netlify="true" name="quote" onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="form-name" value="quote" />
                {step === 1 && <AnimatedSection> <h3 className="text-lg font-semibold text-white mb-4 text-center">STEP 1: WHAT TYPE OF PROJECT IS THIS?</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{projectTypes.map(type => <button key={type.id} type="button" onClick={() => { setFormData(p => ({...p, projectType: type.label})); nextStep(); }} className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${formData.projectType === type.label ? 'bg-amber-500 border-amber-400 text-gray-900' : 'bg-gray-700 border-gray-600 hover:border-amber-500'}`}><span className="font-bold block">{type.label}</span></button>)}</div></AnimatedSection>}
                {step === 2 && <AnimatedSection> <h3 className="text-lg font-semibold text-white mb-4 text-center">STEP 2: WHAT TYPE OF ROOF?</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">{roofTypes.map(type => <button key={type.id} type="button" onClick={() => setFormData(p => ({...p, roofType: type.label}))} className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${formData.roofType === type.label ? 'bg-amber-500 border-amber-400 text-gray-900' : 'bg-gray-700 border-gray-600 hover:border-amber-500'}`}><span className="font-bold block">{type.label}</span></button>)}</div><h4 className="text-md font-semibold text-white mb-2 text-center mt-6">UPLOAD A PHOTO (OPTIONAL)</h4><div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10"><div className="text-center"><Icon name="UploadCloudIcon" className="mx-auto h-12 w-12 text-gray-500" /> <div className="mt-4 flex text-sm leading-6 text-gray-400"><label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-amber-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-amber-300"><span>Upload a file</span><input id="file-upload" name="photo" type="file" className="sr-only" onChange={handleFileChange} /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>{formData.photo && <p className="text-sm mt-2 text-green-400">File selected: {formData.photo.name}</p>}</div></div></AnimatedSection>}
                {step === 3 && <AnimatedSection> <h3 className="text-lg font-semibold text-white mb-4 text-center">STEP 3: YOUR CONTACT INFORMATION</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" required className="w-full bg-gray-900 text-gray-300 p-3 rounded-md border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" /><input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name *" required className="w-full bg-gray-900 text-gray-300 p-3 rounded-md border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" /><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" required className="w-full bg-gray-900 text-gray-300 p-3 rounded-md border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" /><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone *" required className="w-full bg-gray-900 text-gray-300 p-3 rounded-md border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" /></div></AnimatedSection>}
                <div className="flex justify-between items-center pt-4"> {step > 1 ? <button type="button" onClick={prevStep} className="bg-gray-600 text-white font-bold px-6 py-2 rounded-md hover:bg-gray-500">BACK</button> : <span></span>} {step < 3 ? <button type="button" onClick={nextStep} className="bg-amber-500 text-gray-900 font-bold px-6 py-2 rounded-md hover:bg-amber-400">NEXT</button> : <button type="submit" className="bg-green-600 text-white font-bold px-6 py-2 rounded-md hover:bg-green-700">SUBMIT REQUEST</button>}</div>
            </form>
        </div>
    </PageShell>);
};
const SimplePage = ({ title, children }) => (<PageShell title={title}><div className="content-card p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto border"><div className="prose prose-invert max-w-none text-gray-300">{children}</div></div></PageShell>);
const HandbookPage = () => (
    <PageShell title="OWNER'S HANDBOOK" subtitle="EXPERT ADVICE AND INSIGHTS FOR NEW BRUNSWICK HOMEOWNERS.">
        <div className="mb-12 text-center">
            <h3 className="text-lg text-gray-400 font-sans normal-case tracking-normal">PRESENTED IN PARTNERSHIP WITH</h3>
            <img src={siteData.branding.placedLogoUrl} alt="plAced Logo" className="h-10 mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.handbookArticles.map(article => (
                <AnimatedSection key={article.slug} className="content-card rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-1 border">
                    <div className="p-6">
                        <p className="text-sm text-gray-400 mb-2">{article.date}</p>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">{article.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{article.excerpt}</p>
                        <a href="#" onClick={e=>e.preventDefault()} className="font-semibold text-amber-400 hover:text-amber-300 text-sm">READ MORE &raquo;</a>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    </PageShell>
);
const PrivacyPolicyPage = () => (<SimplePage title="PRIVACY POLICY"><p><strong>Effective Date: July 13, 2025</strong></p><p>At Paul's Roofing, we are committed to protecting the privacy of our visitors and clients. This Privacy Policy outlines the types of information we collect, how it is used, and the steps we take to safeguard your personal data.</p><h3>INFORMATION WE COLLECT</h3><p>We collect information to provide better services. This includes personal information you provide through our contact forms (such as name, email address, and phone number) and non-personally identifiable usage data collected automatically (such as browser type and pages visited).</p><h3>HOW WE USE YOUR INFORMATION</h3><p>Your information is used solely to respond to your direct inquiries, provide quotes, schedule appointments, and improve our website. We do not use your information for marketing mailing lists without your explicit consent.</p><h3>SHARING YOUR INFORMATION</h3><p>Paul's Roofing does not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.</p></SimplePage>);
const NotFoundPage = () => (<PageShell title="404 - PAGE NOT FOUND"><div className="text-center"><p className="mb-8 text-lg">Oops! The page you're looking for doesn't seem to exist.</p><Link href="/" className="inline-block bg-amber-500 text-gray-900 font-bold px-6 py-3 rounded-md hover:bg-amber-400 transition-colors">RETURN TO HOMEPAGE</Link></div></PageShell>);
const ProjectHQPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-20">
        <AnimatedSection className="w-full max-w-md">
            <form className="content-card shadow-lg rounded-lg p-8 space-y-6 border">
                <div className="text-center">
                    <Icon name="LockIcon" className="mx-auto h-12 w-12 text-amber-400" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">PROJECT HQ</h2>
                    <p className="mt-2 text-center text-sm text-gray-400">AUTHORIZED ACCESS ONLY</p>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">USERNAME</label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email" required className="w-full bg-gray-900 text-gray-300 p-3 rounded-md border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-300">PASSWORD</label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password" required className="w-full bg-gray-900 text-gray-300 p-3 rounded-md border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-gray-900 bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500">
                        SECURE LOGIN
                    </button>
                </div>
            </form>
        </AnimatedSection>
    </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <HashRouter>
      <GlobalStyles />
      <Header />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/what-we-do" component={ServicesPage} />
          <Route path="/where-we-do-it" component={PortfolioPage} />
          <Route path="/ask-your-neighbour" component={AboutPage} />
          <Route path="/get-quote" component={ContactPage} />
          <Route path="/handbook" component={HandbookPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/hq" component={ProjectHQPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
      <FloatingCta />
    </HashRouter>
  );
}
