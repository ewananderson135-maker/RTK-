import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Check, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { SERVICES, CONTACT } from "./constants";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-serif text-4xl md:text-5xl lg:text-7xl font-light italic mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-brand-gold font-sans text-[11px] uppercase tracking-[0.4em]"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const PriceItem = ({ name, price, description }: { name: string; price: number; description?: string; key?: string | number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group border-b border-brand-gold/20 py-6 last:border-0"
  >
    <div className="flex justify-between items-baseline mb-2">
      <h3 className="text-lg font-medium tracking-tight group-hover:text-brand-gold transition-colors">{name}</h3>
      <span className="font-sans font-semibold text-brand-gold tracking-wide">${price}</span>
    </div>
    {description && (
      <p className="font-sans text-[11px] opacity-60 italic leading-relaxed max-w-lg">
        {description}
      </p>
    )}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Booking Request - RTK Aesthetics");
    const body = encodeURIComponent(bookingMessage);
    const mailtoUrl = `mailto:ewan.anderson135@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
    setIsBookingOpen(false);
    setBookingMessage("");
  };

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white noise-overlay">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-brand-cream/80 backdrop-blur-xl py-4" : "bg-transparent py-10"
      }`}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            RTK <span className="font-bold text-brand-gold">Aesthetics</span>
          </motion.div>
          
          <div className="hidden lg:flex gap-16 items-center">
            {['Services', 'Facials', 'Waxing', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium hover:text-brand-gold transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="border border-brand-charcoal px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-sans hover:bg-brand-charcoal hover:text-white transition-all duration-500"
            >
              Request Session
            </button>
          </div>

          <button 
            className="lg:hidden text-brand-charcoal p-2 border border-brand-charcoal/10 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-brand-cream rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden border border-white/50"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-8 right-8 text-brand-charcoal/40 hover:text-brand-gold transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Schedule Session</span>
                <h2 className="font-serif text-4xl font-light italic text-brand-charcoal">Request Appointment</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal/40 mb-3">Service Details & Preferred Time</label>
                  <textarea 
                    autoFocus
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    placeholder="Tell us which treatments you are interested in and your preferred availability..."
                    className="w-full h-40 bg-brand-sand/50 rounded-2xl p-6 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all border border-brand-charcoal/5 italic"
                  />
                </div>
                
                <button 
                  onClick={handleSendEmail}
                  disabled={!bookingMessage.trim()}
                  className="w-full bg-brand-charcoal text-white py-5 rounded-full font-sans text-xs uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                >
                  Confirm Request <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-[10px] text-center text-brand-charcoal/40 uppercase tracking-widest leading-relaxed">
                  This will open your email client to send your request directly to our team.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-brand-cream flex flex-col items-center justify-center gap-8"
          >
            {['Services', 'Facials', 'Waxing', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-serif text-4xl hover:text-brand-gold transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="mt-8 bg-brand-charcoal text-white px-10 py-5 font-sans text-xs uppercase tracking-[0.3em]"
            >
              Book Now
            </button>
            <a 
              href={`tel:${CONTACT.phone}`}
              className="mt-4 text-brand-gold flex items-center gap-2"
            >
              <Phone size={20} /> {CONTACT.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-brand-silk">
        {/* Decorative Floating Elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-gold rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ y: [0, 40, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-brand-sand rounded-full blur-[120px]" 
        />

        <div className="absolute inset-0 opacity-[0.15] grayscale mix-blend-multiply">
           <img 
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop" 
            alt="Spa environment"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.5em] font-bold">
              EST. 2024 — Nepean, Ontario
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
            className="relative"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-8xl md:text-[10rem] lg:text-[13rem] mb-12 sm:mb-8 leading-[0.75] font-light tracking-tight text-brand-charcoal"
            >
              The Art of <br /> 
              <span className="text-brand-gold italic">Beauty.</span>
            </motion.h1>
            
            {/* Overlapping text border for style */}
            <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 font-serif text-[15rem] leading-[0.75] text-border opacity-5 pointer-events-none select-none">
              Beauty.
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="max-w-sm mx-auto text-brand-charcoal/80 mb-16 text-xs uppercase tracking-[0.2em] font-medium leading-loose"
          >
            Certified Medical Aesthetician & MUA <br />
            Clinical Results meets Atmospheric Luxury
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-12 justify-center items-center"
          >
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="group relative overflow-hidden bg-brand-charcoal text-white px-12 py-6 text-[10px] uppercase tracking-[0.4em] transition-all duration-500"
            >
              <span className="relative z-10">Request a Consultation</span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
            </button>
            <div className="hidden sm:block w-32 h-[1px] bg-brand-gold/40"></div>
          </motion.div>
        </div>
        
        {/* Hero Bottom Info */}
        <div className="absolute bottom-12 left-8 md:left-16 hidden md:block">
           <div className="font-sans text-[9px] uppercase tracking-[0.4em] text-brand-gold mb-2 font-bold">Studio Location</div>
           <div className="text-[11px] uppercase tracking-widest">{CONTACT.address}</div>
        </div>
        
        <div className="absolute bottom-12 right-8 md:right-16 hidden md:block">
           <div className="font-sans text-[9px] uppercase tracking-[0.4em] text-brand-gold mb-2 font-bold">Connect</div>
           <div className="text-[11px] uppercase tracking-widest">@RTK.Aesthetics</div>
        </div>
      </section>

      {/* About Section */}
      <section id="services" className="py-32 px-8 md:px-16 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Arched Image Mask */}
            <div className="rounded-t-full overflow-hidden aspect-[4/5] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" 
                alt="Skincare detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-gold/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-brand-gold/20"
            >
              <div className="text-[8px] uppercase tracking-[0.3em] font-bold text-brand-gold text-center p-6">
                Certified • Professional • Medical
              </div>
            </motion.div>
          </motion.div>
          
          <div className="text-left">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-brand-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block"
            >
              Our Philosophy
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl mb-8 font-light italic leading-tight"
            >
              Bespoke Care, <br />Clinical precision.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-brand-charcoal/70 leading-relaxed mb-10 text-lg md:text-xl font-light italic"
            >
              RTK Aesthetics is a private, home-based sanctuary in Nepean where high-end medical 
              technology meets the tranquility of a boutique spa.
            </motion.p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                "Personalized Treatments",
                "Clinical Excellence",
                "Advanced Technology",
                "Private Studio"
              ].map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal/60"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facials Section */}
      <section id="facials" className="py-32 px-8 md:px-16 relative overflow-hidden bg-brand-silk">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-sand/30 -skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="lg:w-2/5">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block"
              >
                Service Menu
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-6xl md:text-8xl mb-10 font-light italic text-brand-charcoal leading-[0.85]"
              >
                Atmospheric <br />Facials
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-brand-charcoal/60 mb-16 max-w-sm italic text-lg leading-relaxed"
              >
                All treatments are bespoke, tailored to your skin's unique composition and goals. 
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-brand-charcoal text-white p-12 rounded-tr-[80px] border border-white/5 relative group cursor-default shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="font-serif text-2xl mb-6 italic text-brand-gold relative z-10">The Signature Concept</h4>
                <div className="flex justify-between items-baseline mb-4 relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{SERVICES.waxing.special.name}</span>
                  <span className="text-brand-gold font-bold text-xl">${SERVICES.waxing.special.price}</span>
                </div>
                <p className="font-sans text-xs opacity-60 italic leading-relaxed relative z-10">
                  {SERVICES.waxing.special.description}
                </p>
              </motion.div>
            </div>
            
            <div className="lg:w-3/5 grid gap-4 w-full">
              {SERVICES.facials.map((facial, i) => (
                <PriceItem key={facial.name} name={facial.name} price={facial.price} description={facial.description} />
              ))}
              
              <div className="mt-20">
                <motion.h4 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-brand-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-10"
                >
                  Technical Add-Ons
                </motion.h4>
                <div className="grid gap-4">
                  {SERVICES.addOns.map((add, i) => (
                    <motion.div 
                      key={add.name} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between items-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 group cursor-default shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/5 flex items-center justify-center text-brand-gold">
                           {i === 0 ? <Sparkles size={16} /> : <Check size={16} />}
                        </div>
                        <div>
                          <span className="block text-sm font-medium tracking-tight group-hover:text-brand-gold transition-colors">{add.name}</span>
                          {add.recommended && (
                            <span className="text-[9px] text-brand-gold uppercase tracking-[0.2em] font-bold">Clinical Recommended</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-brand-gold/20" />
                        <span className="text-brand-gold font-sans font-bold text-lg">${add.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waxing Section */}
      <section id="waxing" className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-sand rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader title="Smooth Excellence" subtitle="Waxing Treatments" />
          
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="bg-white/30 rounded-[60px] p-8 md:p-12 border border-white/50 backdrop-blur-sm">
              <h4 className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.4em] font-bold mb-8">Separately</h4>
              <div className="grid md:grid-cols-2 gap-x-12">
                {SERVICES.waxing.separate.map((item) => (
                  <PriceItem key={item.name} name={item.name} price={item.price} />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="bg-white/30 rounded-[60px] p-8 md:p-12 border border-white/50 backdrop-blur-sm">
                <h4 className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.4em] font-bold mb-8">Combo Packages</h4>
                <div className="space-y-2">
                  {SERVICES.waxing.combos.map((item) => (
                    <PriceItem key={item.name} name={item.name} price={item.price} />
                  ))}
                </div>
              </div>
              
              <div className="p-12 bg-brand-gold/5 rounded-[60px] border border-brand-gold/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-serif text-3xl mb-4 italic font-light italic">Variety of Hard Wax Available</h4>
                  <p className="text-brand-charcoal/60 mb-8 max-w-xs text-sm italic">
                    We exclusively use premium hard wax to ensure minimal discomfort and clinical results.
                  </p>
                  <button 
                    onClick={() => scrollTo('contact')}
                    className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                  >
                    Speak with a specialist <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Images */}
      <section className="py-32 bg-brand-silk overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
        
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">Archive</span>
            <h2 className="font-serif text-6xl md:text-8xl font-light italic text-brand-charcoal leading-[0.85]">The <br />Gallery</h2>
          </div>
          <motion.a 
            whileHover={{ x: 10 }}
            href="#" 
            className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-medium text-brand-gold border-b border-brand-gold/30 pb-2"
          >
            Explore on Instagram <Instagram size={14} />
          </motion.a>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar px-8 md:px-16">
          {[
            { src: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop", label: "Bridal Prep" },
            { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop", label: "Skin Renewal" },
            { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop", label: "Aftercare" },
            { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop", label: "Glow Ritual" },
            { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop", label: "The Studio" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="min-w-[320px] md:min-w-[450px] aspect-[4/5] bg-brand-cream rounded-[40px] overflow-hidden snap-center relative group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 md:px-16 max-w-[1440px] mx-auto">
        <div className="bg-brand-charcoal text-white rounded-[80px] p-12 md:p-24 overflow-hidden relative border border-white/5 shadow-2xl">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-0 w-2/3 h-full bg-brand-gold/20 blur-[120px]" 
          />
          
          <div className="grid lg:grid-cols-2 gap-24 relative z-10">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block"
              >
                Inquiries
              </motion.span>
              <h2 className="font-serif text-6xl md:text-8xl mb-12 leading-[0.85] font-light italic">Artistic <br /><span className="text-brand-gold">Atmosphere.</span></h2>
              <p className="text-white/40 mb-16 text-lg max-w-sm italic leading-relaxed">
                Experience clinical medical grade care in an immersive luxury setting. All sessions by private appointment.
              </p>
              
              <div className="space-y-12">
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500">
                    <Phone size={24} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-bold">Studio Phone</span>
                    <span className="text-2xl font-sans font-light tracking-widest group-hover:text-brand-gold transition-colors">{CONTACT.phone}</span>
                  </div>
                </a>
                
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 font-bold">Studio Location</span>
                    <span className="text-sm md:text-md opacity-80 uppercase tracking-widest">{CONTACT.address}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white/5 backdrop-blur-md p-16 border border-white/10 rounded-tr-[120px] rounded-bl-[120px] text-center w-full max-w-md shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-[1s]" />
                <div className="relative z-10">
                  <div className="font-serif text-5xl mb-8 font-light italic text-brand-gold">Schedule</div>
                  <div className="text-3xl font-sans font-light mb-12 tracking-widest">Open Until 10:00 PM</div>
                  <div className="w-24 h-[1px] bg-brand-gold/30 mb-12 mx-auto"></div>
                  <div className="flex justify-center gap-10">
                    <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[10px] italic hover:border-brand-gold hover:text-brand-gold transition-all duration-300">IG</a>
                    <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[10px] italic hover:border-brand-gold hover:text-brand-gold transition-all duration-300">FB</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-xl tracking-tight">
            RTK<span className="text-brand-gold italic">Aesthetics</span>
          </div>
          
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-brand-charcoal/40">
            <span>© {new Date().getFullYear()} All Rights Reserved</span>
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

