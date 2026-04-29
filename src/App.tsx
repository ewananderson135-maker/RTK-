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
    <div className="min-h-screen selection:bg-brand-gold selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-brand-cream/90 backdrop-blur-md py-4" : "bg-transparent py-8"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-light tracking-widest uppercase cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            RTK <span className="font-bold">Aesthetics</span>
          </motion.div>
          
          <div className="hidden md:flex gap-12 items-center">
            {['Services', 'Facials', 'Waxing', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-xs uppercase tracking-[0.3em] font-sans font-medium hover:text-brand-gold transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-brand-charcoal text-white text-[11px] uppercase tracking-[0.3em] px-8 py-4 font-sans hover:bg-brand-gold transition-colors"
            >
              Book Now
            </button>
          </div>

          <button 
            className="md:hidden text-brand-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-brand-cream">
        {/* Background Decorative Elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-sand rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-brand-gold rounded-full mix-blend-overlay filter blur-[100px] opacity-10"></div>

        <div className="absolute inset-0 opacity-30 grayscale contrast-125">
           <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
            alt="Spa environment"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="text-brand-gold font-sans text-[11px] uppercase tracking-[0.4em] font-bold">
              Certified Medical Aesthetician & MUA
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-serif text-7xl md:text-9xl mb-12 italic leading-[0.85] font-light"
          >
            Atmospheric <br /> 
            <span className="text-brand-gold">Beauty.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-xs mx-auto text-brand-charcoal/70 mb-12 text-sm italic leading-relaxed"
          >
            Home-based professional care in Nepean, Ontario. Specialized in clinical results with a luxury touch.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-brand-charcoal text-white px-10 py-5 font-sans text-xs uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors group"
            >
              Book Treatment
            </button>
            <div className="hidden sm:block w-24 h-[1px] bg-brand-gold"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="services" className="py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" 
              alt="Skincare detail"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand-gold p-8 rounded-2xl hidden md:block">
              <Sparkles className="text-white" size={32} />
            </div>
          </motion.div>
          
          <div className="text-left">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Our Philosophy</span>
            <h2 className="font-serif text-4xl mb-6">Home-Based Luxury, Professional Excellence</h2>
            <p className="text-brand-charcoal/70 leading-relaxed mb-8">
              Welcome to RTK Aesthetics. I believe that skincare is more than just a routine—it's a form of self-care 
              and confidence. As a certified professional medical aesthetician, I combine clinical precision with 
              the comfort of a private, home-based studio in Nepean.
            </p>
            <ul className="space-y-4 text-sm font-medium uppercase tracking-wider">
              <li className="flex items-center gap-3 text-brand-charcoal/80">
                <Check size={16} className="text-brand-gold" /> Personalized Treatment Plans
              </li>
              <li className="flex items-center gap-3 text-brand-charcoal/80">
                <Check size={16} className="text-brand-gold" /> Professional Grade Equipment
              </li>
              <li className="flex items-center gap-3 text-brand-charcoal/80">
                <Check size={16} className="text-brand-gold" /> Exclusive One-on-One Service
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Facials Section */}
      <section id="facials" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start bg-white/30 rounded-[60px] p-8 md:p-16 border border-white/50 backdrop-blur-sm shadow-xl">
            <div className="lg:w-1/3">
              <span className="text-brand-gold font-sans text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">Service Menu</span>
              <h2 className="font-serif text-5xl md:text-6xl mb-8 font-light italic text-brand-charcoal">Atmospheric <br />Facials</h2>
              <p className="text-brand-charcoal/60 mb-12 max-w-sm italic text-sm">
                All treatments are tailored to regular, dry, acneic, mature, and oily skin types. 
              </p>
              
              <div className="bg-brand-gold/10 p-8 rounded-tr-[40px] border border-brand-gold/20">
                <h4 className="font-serif text-xl mb-4 italic text-brand-gold">Signature Offer</h4>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-medium tracking-tight uppercase">{SERVICES.waxing.special.name}</span>
                  <span className="text-brand-gold font-bold">${SERVICES.waxing.special.price}</span>
                </div>
                <p className="font-sans text-[10px] opacity-60 italic leading-relaxed">
                  {SERVICES.waxing.special.description}
                </p>
              </div>
            </div>
            
            <div className="lg:w-2/3 grid gap-2 w-full">
              {SERVICES.facials.map((facial) => (
                <PriceItem key={facial.name} name={facial.name} price={facial.price} description={facial.description} />
              ))}
              
              <div className="mt-12">
                <h4 className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-8">Studio Enhancements</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {SERVICES.addOns.map((add) => (
                    <div key={add.name} className="flex justify-between items-center p-6 bg-white/40 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-colors group">
                      <div>
                        <span className="block text-sm font-medium mb-1 group-hover:text-brand-gold transition-colors">{add.name}</span>
                        {add.recommended && (
                          <span className="text-[10px] text-brand-gold uppercase tracking-tighter">Recommended</span>
                        )}
                      </div>
                      <span className="text-brand-gold font-sans font-bold">${add.price}</span>
                    </div>
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
      <section className="py-24 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Archive</span>
            <h2 className="font-serif text-5xl font-light italic">The Gallery</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-medium hover:text-brand-gold transition-all">
            @RTK.Aesthetics <Instagram size={14} />
          </a>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar px-6">
          {[
            "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop"
          ].map((src, i) => (
            <motion.div 
              key={i}
              className="min-w-[300px] md:min-w-[400px] aspect-[4/5] bg-brand-cream rounded-3xl overflow-hidden snap-center"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <img src={src} alt="Gallery item" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-brand-charcoal text-white rounded-[60px] p-12 md:p-24 overflow-hidden relative border border-white/10">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/10 blur-[100px]" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight font-light italic">Artistic <br /><span className="text-brand-gold">Atmosphere.</span></h2>
              <p className="text-white/60 mb-12 text-sm max-w-sm italic">
                Studio sessions are by appointment only. Experience professional medical grade care in a luxury setting.
              </p>
              
              <div className="space-y-8">
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-gold transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.4em] text-white/40 mb-1 font-bold">Inquiries</span>
                    <span className="text-xl font-sans font-light tracking-tighter">{CONTACT.phone}</span>
                  </div>
                </a>
                
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.4em] text-white/40 mb-1 font-bold">Location</span>
                    <span className="text-sm opacity-80">{CONTACT.address}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white/5 backdrop-blur-sm p-12 border border-white/10 rounded-tr-[80px] text-center w-full max-w-md">
                <div className="font-serif text-4xl mb-6 font-light italic text-brand-gold">Studio Hours</div>
                <div className="text-2xl font-sans font-light mb-8 tracking-tighter">Open Until 10:00 PM</div>
                <div className="w-full h-[1px] bg-brand-gold/30 mb-8 mx-auto"></div>
                <div className="flex justify-center gap-8">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[10px] italic">IG</div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[10px] italic">FB</div>
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

