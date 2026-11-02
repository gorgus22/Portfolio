import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  ExternalLink,
  FileText,
  Tv,
  Instagram,
  Youtube,
  HardDrive,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { projectsData, site, type MediaItem, type Project } from './data/projects';
import { getDriveEmbedUrl, getYoutubeId, getThumbnailUrl } from './lib/media';

type Page = 'home' | 'digital-art' | 'visual';

const PAGE_TITLES: Record<Page, string> = {
  home: 'Giorgio Mascio (Gorgo) — Digital Artist & VJ',
  'digital-art': 'Digital Art — Giorgio Mascio',
  visual: 'Visual — Giorgio Mascio',
};

function pathToPage(path: string): Page {
  const clean = path.replace(/\/+$/, '');
  if (clean === '/digital-art') return 'digital-art';
  if (clean === '/visual') return 'visual';
  return 'home';
}

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState<Page>(() => pathToPage(window.location.pathname));
  const [activeSection, setActiveSection] = useState('');

  // Navigazione tra pagine senza ricaricare (history API)
  const go = (target: Page, hash?: string) => (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    const path = target === 'home' ? '/' : `/${target}`;
    try { window.history.pushState(null, '', path + (hash ? `#${hash}` : '')); } catch { /* anteprime in sandbox */ }
    setPage(target);
    setTimeout(() => {
      const el = hash ? document.getElementById(hash) : null;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo(0, 0);
    }, 30);
  };

  useEffect(() => {
    const onPop = () => setPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', onPop);
    // Arrivo diretto con un'ancora (es. /#about)
    if (window.location.hash) {
      setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView(), 100);
    }
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[page];
  }, [page]);

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    projectTitle: string;
    items: MediaItem[];
    index: number;
  }>({
    isOpen: false,
    projectTitle: '',
    items: [],
    index: 0
  });

  // Observe active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'contatti'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    setActiveSection('');
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  // Keyboard Navigation in Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const openLightbox = (projectTitle: string, items: MediaItem[], initialIndex: number) => {
    setLightbox({
      isOpen: true,
      projectTitle,
      items,
      index: initialIndex
    });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  };

  const handleNext = () => {
    if (lightbox.items.length <= 1) return;
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.items.length
    }));
  };

  const handlePrev = () => {
    if (lightbox.items.length <= 1) return;
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + prev.items.length) % prev.items.length
    }));
  };


  return (
    <div className="min-h-screen bg-[#080B0A] text-[#E4EDE8] selection:bg-[#00FF88] selection:text-black">
      
      {/* SCANLINE / GLITCH OVERLAY BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.2]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF88] to-transparent animate-scan"></div>
      </div>

      {/* FIXED NAVIGATION */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-40 bg-[#080B0A]/90 backdrop-blur-xl border-b border-[#00FF88]/15 px-4 md:px-12 py-4 flex items-center justify-between transition-all duration-300">
        <a href="/" onClick={go('home')} className="font-['Space_Grotesk'] font-bold text-xl tracking-[0.08em] hover:text-[#00FF88] transition duration-200" id="nav-logo">
          GM<span className="text-[#00FF88]">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="/digital-art"
            onClick={go('digital-art')}
            className={`font-['JetBrains_Mono'] text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${page === 'digital-art' ? 'text-[#00FF88]' : 'text-[#8FA89A] hover:text-[#00FF88]'}`}
          >
            Digital Art
          </a>
          <a 
            href="/visual"
            onClick={go('visual')}
            className={`font-['JetBrains_Mono'] text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${page === 'visual' ? 'text-[#9B3FFF]' : 'text-[#8FA89A] hover:text-[#9B3FFF]'}`}
          >
            Visual
          </a>
          <a 
            href="/#about"
            onClick={go('home', 'about')}
            className={`font-['JetBrains_Mono'] text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${page === 'home' && activeSection === 'about' ? 'text-[#E4EDE8]' : 'text-[#8FA89A] hover:text-white'}`}
          >
            About
          </a>
          {site.cvUrl && (
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.15em] text-[#8FA89A] hover:text-[#00FF88] transition-colors duration-200"
            >
              CV
            </a>
          )}
          <a 
            href="#contatti" 
            className="font-['JetBrains_Mono'] text-xs text-black bg-[#00FF88] hover:bg-[#00e277] active:scale-95 px-4 py-2 rounded-[2px] font-semibold transition-all duration-200 shadow-[0_0_15px_rgba(0,255,136,0.15)] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          >
            Contatti
          </a>
        </div>

        {/* Mobile Hamburger toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#8FA89A] hover:text-[#00FF88] transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center rounded border border-transparent active:border-[#00FF88]/30"
          aria-label="Toggle navigation menu"
          id="mobile-nav-toggle"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile menu block */}
        {mobileMenuOpen && (
          <div className="absolute top-[100%] left-0 right-0 bg-[#080B0A] border-b border-[#00FF88]/20 p-6 flex flex-col gap-5 md:hidden shadow-2xl animate-glitch" id="mobile-menu-drawer">
            <a 
              href="/digital-art"
              onClick={go('digital-art')}
              className="font-['Space_Grotesk'] text-lg font-medium text-[#E4EDE8] hover:text-[#00FF88] transition duration-200 border-b border-[#ffffff]/5 pb-2"
            >
              ↳ Digital Art
            </a>
            <a 
              href="/visual"
              onClick={go('visual')}
              className="font-['Space_Grotesk'] text-lg font-medium text-[#E4EDE8] hover:text-[#9B3FFF] transition duration-200 border-b border-[#ffffff]/5 pb-2"
            >
              ↳ Visual
            </a>
            <a 
              href="/#about"
              onClick={go('home', 'about')}
              className="font-['Space_Grotesk'] text-lg font-medium text-[#E4EDE8] hover:text-white transition duration-200 border-b border-[#ffffff]/5 pb-2"
            >
              ↳ About
            </a>
            {site.cvUrl && (
              <a
                href={site.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="font-['Space_Grotesk'] text-lg font-medium text-[#E4EDE8] hover:text-[#00FF88] transition duration-200 border-b border-white/5 pb-2"
              >
                ↳ CV (PDF)
              </a>
            )}
            <a 
              href="#contatti"
              onClick={() => setMobileMenuOpen(false)}
              className="font-['JetBrains_Mono'] text-sm tracking-widest text-center text-black bg-[#00FF88] px-5 py-3 rounded-[3px] font-bold block transition"
            >
              Contatti ↓
            </a>
          </div>
        )}
      </nav>

      {page === 'home' && (<>
      {/* HERO SECTION */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 overflow-hidden" id="hero">
        <div className="absolute inset-0 custom-grid animate-grid pointer-events-none bg-fixed"></div>
        
        {/* Glowing gradient backdrops */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-radial from-[#9B3FFF]/10 to-transparent blur-3xl rounded-full pointer-events-none animate-glow"></div>
        <div className="absolute top-[10%] right-[5%] w-[250px] h-[250px] bg-radial from-[#00FF88]/5 to-transparent blur-2xl rounded-full pointer-events-none"></div>

        <div className="relative max-w-5xl z-10 select-none animate-glitch">
          <p className="font-['JetBrains_Mono'] text-xs font-semibold text-[#00FF88] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] inline-block animate-ping"></span>
            // Digital Artist &amp; Creative Technologist
          </p>
          <h1 className="font-['Space_Grotesk'] text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-[-0.03em] uppercase mb-6">
            Giorgio<br />
            <span className="text-transparent text-stroke-cyan font-outline">Mascio</span>
          </h1>
          {site.stageName && (
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm uppercase tracking-[0.3em] text-[#9B3FFF] mb-6">
              aka {site.stageName} · VJ
            </p>
          )}
          <p className="text-[#8FA89A] font-light text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            3D Modeling &amp; Animation · Motion Design · VFX · Live Visuals.<br />
            Al confine tra precisione tecnica e ricerca visiva procedurale.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap gap-2 mb-12">
            {['Blender', 'TouchDesigner', 'Geometry Nodes', 'Resolume', 'AI / Stable Diffusion', 'Stream Diffusion', 'Kinect', 'DaVinci Resolve'].map((tag, idx) => (
              <span key={idx} className="font-['JetBrains_Mono'] text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-[2px] border border-[#00FF88]/15 bg-[#00FF88]/5 text-[#8FA89A] transition-colors duration-300 hover:border-[#00FF88]/40 hover:text-white">
                {tag}
              </span>
            ))}
          </div>

          {/* Quick jump menu buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <a 
              href="/digital-art"
              onClick={go('digital-art')}
              className="flex-1 inline-flex items-center justify-between p-5 rounded-[4px] border border-white/5 bg-[#0B0F0D] hover:border-[#00FF88]/30 group transition-all duration-300 hover:-translate-y-0.5"
              id="quick-link-digital-art"
            >
              <div className="text-left">
                <span className="block font-['Space_Grotesk'] font-bold text-base text-[#E4EDE8] group-hover:text-[#00FF88] transition duration-200">Digital Art</span>
                <span className="block font-['JetBrains_Mono'] text-[10px] text-[#5E7568] uppercase tracking-wider mt-1">CGI &amp; Produzione Realtime</span>
              </div>
              <ChevronRight size={18} className="text-[#5E7568] group-hover:text-[#00FF88] transition group-hover:translate-x-1 duration-200" />
            </a>

            <a 
              href="/visual"
              onClick={go('visual')}
              className="flex-1 inline-flex items-center justify-between p-5 rounded-[4px] border border-white/5 bg-[#0B0F0D] hover:border-[#9B3FFF]/30 group transition-all duration-300 hover:-translate-y-0.5"
              id="quick-link-visual"
            >
              <div className="text-left">
                <span className="block font-['Space_Grotesk'] font-bold text-base text-[#E4EDE8] group-hover:text-[#C084FC] transition duration-200">Visual</span>
                <span className="block font-['JetBrains_Mono'] text-[10px] text-[#5E7568] uppercase tracking-wider mt-1">Live Mapping &amp; Interattività</span>
              </div>
              <ChevronRight size={18} className="text-[#5E7568] group-hover:text-[#9B3FFF] transition group-hover:translate-x-1 duration-200" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#5E7568] select-none">
          <span className="w-8 h-[1px] bg-[#00FF88]/50"></span>
          Scroll to explore
        </div>
      </header>

      {/* 001 — PROFILE / ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-5 mb-16 select-none" id="heading-about">
          <span className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.25em] text-[#00FF88]">
            // 001 — Profile
          </span>
          <div className="flex-1 h-[1px] bg-[#00FF88]/15"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <div className="flex flex-col justify-center">
            <p className="font-['Space_Grotesk'] text-xl sm:text-2xl leading-relaxed text-[#8FA89A] font-light">
              Artista digitale con base in Italia, specializzato in <span className="text-[#E4EDE8] font-medium border-b border-[#00FF88]/30">CGI, 3D motion, VFX e live visuals</span>. 
              Collaborando con studi emergenti, collettivi e progetti musicali indipendenti, porta in ogni progetto un approccio procedurale, rigoroso e sperimentale. 
              <br /><br />
              L'intelligenza artificiale è <span className="text-[#E4EDE8] font-medium border-b border-[#9B3FFF]/30">una parte centrale della sua ricerca visiva</span>: non una scorciatoia tecnica, ma un medium generativo da capire e da forzare.
            </p>
            {site.collaborations.length > 0 && (
              <div className="mt-10">
                <span className="block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.25em] text-[#5E7568] mb-3">
                  Ha collaborato con
                </span>
                <div className="flex flex-wrap gap-2">
                  {site.collaborations.map(c => (
                    <span key={c} className="font-['Space_Grotesk'] text-sm font-semibold text-[#E4EDE8] border border-[#00FF88]/25 bg-[#00FF88]/5 px-4 py-2 rounded-[2px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded p-px overflow-hidden select-none">
            {[
              { title: 'CGI & Motion', number: '3D', desc: 'Modeling, Animation & Nodes' },
              { title: 'VFX Production', number: 'FX', desc: 'Fluids & Procedural Ember' },
              { title: 'Live Performance', number: 'VJ', desc: 'Stage Mapping & Resolume' },
              { title: 'AI Integration', number: 'SD', desc: 'Stream Diffusion Research' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0B0F0D] p-6 lg:p-8 flex flex-col justify-between hover:bg-[#111A16]/30 transition group duration-300">
                <span className="font-['Space_Grotesk'] text-[#00FF88] text-4xl font-extrabold block group-hover:scale-110 origin-left transition duration-300">{stat.number}</span>
                <div className="mt-8">
                  <span className="block font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider text-white">{stat.title}</span>
                  <span className="block font-['JetBrains_Mono'] text-[10px] text-[#5E7568] mt-1">{stat.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </>)}

      {/* DIGITAL ART (pagina /digital-art) */}
      {page === 'digital-art' && (
      <section id="digital-art" className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-6 select-none" id="heading-digital-art">
          <span className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.25em] text-[#00FF88]">
            // Digital Art
          </span>
          <div className="flex-1 h-[1px] bg-[#00FF88]/15"></div>
        </div>

        <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black mb-4 uppercase">Digital Art</h2>
        <p className="text-[#8FA89A] max-w-2xl font-light text-sm sm:text-base leading-relaxed mb-20">
          Produzione CGI, effetti speciali (VFX) e sperimentazioni generative per videoclip, documentari, e lavori d'autore. Dalle simulazioni fluide ai sistemi procedurali reattivi.
        </p>

        {/* SUBSECTION: TOPIC STUDIO */}
        <div className="mb-24" id="subsec-topic-studio">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white">Topic Studio VFX</h3>
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#9B3FFF] border border-[#9B3FFF]/30 bg-[#9B3FFF]/5 px-2 py-0.5 rounded-[2px] w-fit">
              Collaborazioni Ufficiali
            </span>
          </div>
          <p className="text-[#5E7568] text-xs sm:text-sm max-w-2xl mb-10 leading-relaxed font-light">
            Collettivo emergente di giovani artisti CGI che lavora su videoclip e produzioni musicali in Italia, integrando 3D e post-produzione cinematografica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData['topic-studio'].map(proj => (
              <ProjectCard key={proj.id} project={proj} onOpenLightbox={openLightbox} />
            ))}
          </div>
        </div>

        {/* SUBSECTION: SPERIMENTAZIONI */}
        <div className="mb-12" id="subsec-sperimentazioni">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white">Sperimentazioni</h3>
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#00FF88] border border-[#00FF88]/30 bg-[#00FF88]/5 px-2 py-0.5 rounded-[2px] w-fit">
              Lavori Autoriali e di Ricerca
            </span>
          </div>
          <p className="text-[#5E7568] text-xs sm:text-sm max-w-2xl mb-10 leading-relaxed font-light">
            Progetti personali e di ricerca tra Geometry Nodes, modellazione complessa e interattività, per spingere al limite le pipeline digitali.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData['sperimentazioni'].map(proj => (
              <ProjectCard key={proj.id} project={proj} onOpenLightbox={openLightbox} />
            ))}
          </div>
        </div>
        <PageSwitch label="Visual" sub="Live mapping, eventi e installazioni" href="/visual" onClick={go('visual')} accent="#9B3FFF" />
      </section>
      )}

      {/* VISUAL (pagina /visual) */}
      {page === 'visual' && (
      <section id="visual" className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-6 select-none" id="heading-visual">
          <span className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.25em] text-[#9B3FFF]">
            // Visual
          </span>
          <div className="flex-1 h-[1px] bg-[#9B3FFF]/15"></div>
        </div>

        <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black mb-4 uppercase">Visual</h2>
        <p className="text-[#8FA89A] max-w-2xl font-light text-sm sm:text-base leading-relaxed mb-20">
          Scenografie generative, stage mapping, live performance e installazioni interattive. Dalla manipolazione geometrica allo specchio interattivo con Kinect.
        </p>

        {/* SUBSECTION: EVENTI & ESIBIZIONI */}
        <div className="mb-24" id="subsec-eventi-live">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white">Eventi &amp; Esibizioni</h3>
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#9B3FFF] border border-[#9B3FFF]/30 bg-[#9B3FFF]/5 px-2 py-0.5 rounded-[2px] w-fit">
              VJ Live &amp; Stage Design
            </span>
          </div>
          <p className="text-[#5E7568] text-xs sm:text-sm max-w-2xl mb-10 leading-relaxed font-light">
            Visual per eventi e feste nel Nord Italia, in collaborazione con collettivi come Trikster Tribe e Sistema Drago.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData['visual-eventi'].map(proj => (
              <ProjectCard key={proj.id} project={proj} onOpenLightbox={openLightbox} />
            ))}
          </div>
        </div>

        {/* SUBSECTION: INSTALLAZIONI & ALTRI PROGETTI */}
        <div className="mb-12" id="subsec-installazioni">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-3">
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white">Installazioni &amp; Sperimentazioni Visive</h3>
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#00FF88] border border-[#00FF88]/30 bg-[#00FF88]/5 px-2 py-0.5 rounded-[2px] w-fit">
              Interactive Systems
            </span>
          </div>
          <p className="text-[#5E7568] text-xs sm:text-sm max-w-2xl mb-10 leading-relaxed font-light">
            Progetti che esplorano il rapporto tra movimento del corpo, profondità 3D e generazione neurale in tempo reale.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData['visual-installazioni'].map(proj => (
              <ProjectCard key={proj.id} project={proj} onOpenLightbox={openLightbox} />
            ))}
          </div>
        </div>
        <PageSwitch label="Digital Art" sub="CGI, VFX e sperimentazioni" href="/digital-art" onClick={go('digital-art')} accent="#00FF88" />
      </section>
      )}

      {/* CONTATTI (in fondo a ogni pagina) */}
      <section id="contatti" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-5 mb-12 select-none">
          <span className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.25em] text-[#00FF88]">
            // 002 — Contatti
          </span>
          <div className="flex-1 h-[1px] bg-[#00FF88]/15"></div>
        </div>
        <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-black mb-6 uppercase leading-[0.95]">
          Lavoriamo<br /><span className="text-[#00FF88]">insieme</span>
        </h2>
        <p className="text-[#8FA89A] max-w-xl font-light text-sm sm:text-base leading-relaxed mb-10">
          Videoclip, visual per eventi, installazioni o sperimentazioni: scrivimi per collaborazioni e preventivi.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center gap-2 font-['JetBrains_Mono'] text-sm text-black bg-[#00FF88] hover:bg-[#00e277] px-6 py-4 rounded-[3px] font-bold transition shadow-[0_0_20px_rgba(0,255,136,0.15)]"
          >
            <Mail size={16} /> {site.email}
          </a>
          {site.socials.map(s => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-['JetBrains_Mono'] text-sm text-[#E4EDE8] border border-white/10 hover:border-[#00FF88]/50 hover:text-[#00FF88] px-6 py-4 rounded-[3px] transition"
            >
              {s.label} <ArrowUpRight size={14} />
            </a>
          ))}
          {site.cvUrl && (
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-['JetBrains_Mono'] text-sm text-[#E4EDE8] border border-white/10 hover:border-[#00FF88]/50 hover:text-[#00FF88] px-6 py-4 rounded-[3px] transition"
            >
              <FileText size={14} /> CV (PDF)
            </a>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#080B0A]/85 z-10 relative">
        <span className="font-['Space_Grotesk'] font-bold text-lg select-none text-[#5E7568]">
          GM<span className="text-[#00FF88]">.</span>
        </span>
        <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-[#5E7568] text-center sm:text-right">
          © {new Date().getFullYear()} {site.name}{site.stageName ? ` (${site.stageName})` : ''} — {site.role}
          <span className="inline-block w-1.5 h-3 bg-[#00FF88] ml-2 animate-pulse leading-none align-baseline"></span>
        </span>
      </footer>

      {/* DYNAMIC REACT LIGHTBOX MODAL */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 bg-[#040706]/98 backdrop-blur-md z-[60] flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-300 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          id="custom-lightbox-overlay"
        >
          <div className="relative w-full max-w-4xl flex flex-col h-full max-h-[90vh] justify-between">
            
            {/* Lightbox Header Controls */}
            <div className="flex items-center justify-between py-2 text-[#8FA89A] border-b border-white/5">
              <div className="text-left font-['Space_Grotesk']">
                <p className="text-white font-bold text-sm sm:text-base leading-tight">
                  {lightbox.projectTitle}
                </p>
                {lightbox.items.length > 0 && (
                  <p className="font-['JetBrains_Mono'] text-[10px] tracking-wider text-[#5E7568] uppercase mt-0.5">
                    {lightbox.index + 1} / {lightbox.items.length}
                  </p>
                )}
              </div>
              
              <button 
                onClick={closeLightbox}
                className="text-white hover:text-[#00FF88] border border-white/10 hover:border-[#00FF88]/30 bg-white/5 p-2 rounded transition-all duration-200 active:scale-90 flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] tracking-normal min-h-[40px] px-3 ml-4"
                aria-label="Chiudi"
                id="lightbox-close-btn"
              >
                <X size={15} /> <span className="hidden sm:inline">Chiudi</span>
              </button>
            </div>

            {/* Main Carousel / Lightbox Media Player */}
            <div className="relative flex-1 flex items-center justify-center py-6">
              
              {/* Prev Button */}
              {lightbox.items.length > 1 && (
                <button 
                  onClick={handlePrev} 
                  className="absolute left-0 sm:left-[-60px] z-20 text-white border border-white/10 hover:border-[#00FF88]/40 bg-black/40 hover:bg-[#00FF88]/10 p-3 sm:p-4 rounded-full transition-all duration-200 active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Precedente"
                  id="lightbox-prev-btn"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Media viewer container */}
              <div className="w-full h-full max-h-[60vh] sm:max-h-[68vh] rounded-[3px] overflow-hidden bg-black/80 flex items-center justify-center border border-white/5 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {lightbox.items.length > 0 ? (
                  <LightboxMediaPlayer item={lightbox.items[lightbox.index]} />
                ) : (
                  <div className="text-center p-6 text-[#5E7568] font-['JetBrains_Mono']">
                    Nessun file multimediale disponibile in anteprima.
                  </div>
                )}
              </div>

              {/* Next Button */}
              {lightbox.items.length > 1 && (
                <button 
                  onClick={handleNext}
                  className="absolute right-0 sm:right-[-60px] z-20 text-white border border-white/10 hover:border-[#00FF88]/40 bg-black/40 hover:bg-[#00FF88]/10 p-3 sm:p-4 rounded-full transition-all duration-200 active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Successivo"
                  id="lightbox-next-btn"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Lightbox Footer - Caption and Jump Dots */}
            <div className="py-4 text-center border-t border-white/5 flex flex-col gap-4">
              <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#8FA89A] max-w-2xl mx-auto leading-relaxed px-4">
                {lightbox.items[lightbox.index]?.caption || 'Nessuna didascalia.'}
              </p>

              {/* Slide Counter Dots */}
              {lightbox.items.length > 1 && (
                <div className="flex gap-2 justify-center flex-wrap max-w-md mx-auto px-4">
                  {lightbox.items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightbox(prev => ({ ...prev, index: idx }))}
                      className={`w-2.5 h-2.5 rounded-full outline-hidden transition-all duration-200 ${idx === lightbox.index ? 'bg-[#00FF88] scale-125 shadow-[0_0_8px_rgba(0,255,136,0.5)]' : 'bg-white/20 hover:bg-white/40'}`}
                      aria-label={`Vai al media ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Media renderer within active lightbox
function LightboxMediaPlayer({ item }: { item: MediaItem }) {
  if (item.type === 'youtube') {
    const yId = getYoutubeId(item.url);
    if (yId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${yId}?autoplay=1&rel=0`}
          className="w-full h-full aspect-video border-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="YouTube Video Player"
        />
      );
    }
  }

  if (item.type === 'drive') {
    return (
      <div className="w-full h-full relative flex flex-col items-stretch justify-items-stretch">
        <div className="flex-1 min-h-0 flex">
          <DrivePlayer key={item.url} item={item} />
        </div>
        <div className="bg-[#0B0F0D] border-t border-white/5 p-3 flex justify-between items-center px-5 shrink-0 text-left select-none">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#5E7568] tracking-wider flex items-center gap-1.5">
            <HardDrive size={12} className="text-[#00FF88]" /> Google Drive
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['JetBrains_Mono'] text-[10px] text-[#00FF88] hover:text-white transition duration-200 flex items-center gap-1.5 min-h-[30px] px-2 border border-[#00FF88]/20 rounded bg-[#00FF88]/5 hover:bg-[#00FF88]/15"
          >
            Apri su Drive <ExternalLink size={10} />
          </a>
        </div>
      </div>
    );
  }

  if (item.type === 'instagram') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0F0A1A] w-full h-full select-none">
        <div className="w-16 h-16 rounded-full bg-[#9B3FFF]/12 flex items-center justify-center text-[#9B3FFF] mb-6 shadow-lg animate-pulse">
          <Instagram size={32} />
        </div>
        <h4 className="font-['Space_Grotesk'] font-bold text-lg text-white mb-2">Instagram Media Integration</h4>
        <p className="font-['JetBrains_Mono'] text-[11px] text-[#8FA89A] max-w-sm mb-6 leading-relaxed">
          Instagram non permette di incorporare storie e highlight. Aprilo direttamente su Instagram.
        </p>
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-['JetBrains_Mono'] text-xs text-white hover:text-white bg-[#9B3FFF] hover:bg-[#802de2] px-6 py-3 rounded-[3px] font-semibold transition shadow-[0_0_20px_rgba(155,63,255,0.2)]"
        >
          Apri su Instagram ↗
        </a>
      </div>
    );
  }

  if (item.type === 'video') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0B0B0C] w-full h-full select-none">
        <div className="w-16 h-16 rounded-full bg-[#00FF88]/12 flex items-center justify-center text-[#00FF88] mb-6 shadow-lg animate-pulse">
          <Tv size={32} />
        </div>
        <h4 className="font-['Space_Grotesk'] font-bold text-lg text-white mb-2">Video Esterno</h4>
        <p className="font-['JetBrains_Mono'] text-[11px] text-[#8FA89A] max-w-sm mb-6 leading-relaxed">
          Questo video è ospitato su una piattaforma esterna.
        </p>
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-['JetBrains_Mono'] text-xs text-black bg-[#00FF88] hover:bg-[#00e277] px-6 py-3 rounded-[3px] font-bold transition shadow-[0_0_20px_rgba(0,255,136,0.15)]"
        >
          Apri il video nel tab ↗
        </a>
      </div>
    );
  }

  return (
    <div className="p-8 text-center text-[#5E7568] font-['JetBrains_Mono']">
      Tipologia media non supportata direttamente.
    </div>
  );
}

// Subordinate Card Component with Interactive Carousel
function ProjectCard({ project, onOpenLightbox }: { project: Project; onOpenLightbox: (t: string, items: MediaItem[], idx: number) => void; key?: string }) {
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const mediaCount = project.media?.length || 0;

  return (
    <div className="bg-[#0B0F0D] border border-white/5 rounded-[4px] flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:border-[#00FF88]/30 hover:-translate-y-0.5" id={`card-project-${project.id}`}>
      
      {/* Decorative colored glow bar at the top on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#9B3FFF] to-[#00FF88] opacity-20 hover:opacity-100 transition-opacity duration-300"></div>

      {/* Main Card Hero Media Preview Indicator */}
      <div className="relative overflow-hidden w-full aspect-video bg-black/60 select-none">
        {mediaCount > 0 ? (
          <div className="w-full h-full relative cursor-pointer" onClick={() => onOpenLightbox(project.title, project.media, activeThumbIndex)}>
            <CardThumbnailPreview item={project.media[activeThumbIndex]} />
            
            {/* Click to Play / Open overlay */}
            <div className="absolute inset-0 bg-black/25 opacity-0 hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#00FF88]/90 text-black flex items-center justify-center shadow-lg transform translate-y-2 hover:scale-115 transition duration-200">
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </div>
            </div>

            {/* Media category type banner (nascosto per Drive) */}
            {project.media[activeThumbIndex].type !== 'drive' && <span className="absolute bottom-3 left-3 bg-[#0B0F0D]/90 border border-white/5 text-white text-[9px] uppercase tracking-wider px-2 py-1 font-['JetBrains_Mono'] rounded-[1px] flex items-center gap-1 text-stroke-thin">
              {project.media[activeThumbIndex].type === 'youtube' && <Youtube size={10} className="text-[#00FF88]" />}
              {project.media[activeThumbIndex].type === 'instagram' && <Instagram size={10} className="text-[#9B3FFF]" />}
              {project.media[activeThumbIndex].type === 'video' && <Tv size={10} className="text-[#00FF88]" />}
              {project.media[activeThumbIndex].type}
            </span>}

            {/* Process highlight on preview */}
            {project.media[activeThumbIndex].isProcess && (
              <span className="absolute top-3 left-3 bg-[#00FF88] text-black text-[9px] font-bold uppercase py-0.5 px-1.5 rounded-[1px] shadow-md tracking-wider">
                Processo creativo
              </span>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#111A16]/20 p-6 select-none border-b border-white/5" id={`card-placeholder-${project.id}`}>
            <svg className="w-14 h-14 text-[#00FF88]/20 animate-spin-slow" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="15" width="50" height="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="font-['JetBrains_Mono'] text-[9px] font-semibold text-[#5E7568] tracking-widest uppercase mt-4">
              Media in arrivo
            </span>
          </div>
        )}
      </div>

      {/* Card Carousel Thumbnail Horizontal Strip */}
      {mediaCount > 1 && (
        <div className="border-b border-white/5 select-none shrink-0" id={`thumbnail-strip-proj-${project.id}`}>
          <div className="flex gap-2.5 overflow-x-auto p-3.5 pb-2 scrollbar-none touch-pan-x bg-black/40">
            {project.media.map((med, thumbIdx) => (
              <button
                key={thumbIdx}
                onClick={() => setActiveThumbIndex(thumbIdx)}
                className={`relative flex-none w-[70px] aspect-video rounded-[2px] overflow-hidden bg-black border transition-all duration-200 outline-hidden ${thumbIdx === activeThumbIndex ? 'border-[#00FF88] scale-[1.03] opacity-100 shadow-[0_0_10px_rgba(0,255,136,0.15)]' : 'border-white/5 opacity-60 hover:opacity-100'}`}
                title={med.caption}
                id={`thumb-btn-${project.id}-${thumbIdx}`}
              >
                <CardThumbnailSmallPreview item={med} />
                {med.isProcess && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card Info Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div className="mb-6">
          <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs font-semibold text-[#00FF88] uppercase tracking-[0.15em] block mb-2 select-none">
            {project.category}
          </span>
          <h4 className="font-['Space_Grotesk'] font-bold text-lg text-white mb-3">
            {project.title}
          </h4>
          <p className="text-[#8FA89A] text-xs sm:text-sm font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {mediaCount > 0 && (
            <button 
              onClick={() => onOpenLightbox(project.title, project.media, activeThumbIndex)}
              className="font-['JetBrains_Mono'] text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#00FF88] bg-[#00FF88]/10 border border-[#00FF88]/20 hover:border-[#00FF88] hover:bg-[#00FF88] hover:text-black py-2.5 px-4 rounded-[2px] inline-flex items-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer min-h-[38px] min-w-[44px]"
              id={`open-media-btn-${project.id}`}
            >
              <Maximize2 size={11} /> <span>Apri Galleria ({mediaCount})</span>
            </button>
          )}

          {project.pdfLinks && project.pdfLinks.map((pdf, pdfIdx) => (
            <a 
              key={pdfIdx}
              href={pdf.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-['JetBrains_Mono'] text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#b180ff] bg-[#9B3FFF]/12 border border-[#9B3FFF]/20 hover:border-[#9B3FFF] hover:text-white py-2.5 px-4 rounded-[2px] inline-flex items-center gap-1.5 transition-all duration-200 active:scale-95 min-h-[38px] min-w-[44px]"
              id={`pdf-btn-${project.id}-${pdfIdx}`}
            >
              <FileText size={11} /> <span>{pdf.label} ↗</span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

// Immagine con fallback: se la miniatura non si carica mostra il segnaposto
function ThumbImage({ src, alt, fallback, className = '' }: { src: string | null; alt: string; fallback: React.ReactNode; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
    />
  );
}

// Segnaposto quando un media non ha miniatura (Instagram, link esterni, errori)
function ThumbFallback({ item, small = false }: { item: MediaItem; small?: boolean }) {
  const size = small ? 16 : 40;
  const icon =
    item.type === 'instagram' ? <Instagram size={size} className="text-[#9B3FFF]" /> :
    item.type === 'video' ? <Tv size={size} className="text-[#00FF88]/70" /> :
    item.type === 'youtube' ? <Youtube size={size} className="text-[#00FF88]/70" /> :
    item.isProcess ? <Sparkles size={size} className="text-[#00FF88]" /> :
    <Layers size={size} className="text-[#5E7568]" />;
  const label =
    item.type === 'instagram' ? 'Instagram' :
    item.type === 'video' ? 'Video esterno' :
    item.isProcess ? 'Processo creativo' : 'Media';
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-3 select-none ${item.type === 'instagram' ? 'bg-[#0F0A1A]' : 'bg-[#0D110F]'}`}>
      {icon}
      {!small && (
        <>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase text-[#8FA89A]">{label}</span>
          <span className="font-['JetBrains_Mono'] text-[9px] text-[#5E7568] px-6 text-center max-w-[260px] line-clamp-2">{item.caption}</span>
        </>
      )}
    </div>
  );
}

// Anteprima grande della card: per i formati verticali aggiunge uno sfondo sfocato
function CardThumbnailPreview({ item }: { item: MediaItem }) {
  const src = getThumbnailUrl(item, 960);
  if (!src) return <ThumbFallback item={item} />;
  return (
    <div className="w-full h-full relative bg-black">
      <div
        className="absolute inset-0 bg-center bg-cover scale-110 blur-xl opacity-40"
        style={{ backgroundImage: `url("${src}")` }}
        aria-hidden="true"
      />
      <div className="relative w-full h-full">
        <ThumbImage src={src} alt={item.caption} fallback={<ThumbFallback item={item} />} className="!object-contain" />
      </div>
    </div>
  );
}

// Miniatura piccola per la striscia della card
function CardThumbnailSmallPreview({ item }: { item: MediaItem }) {
  return <ThumbImage src={getThumbnailUrl(item, 240)} alt="" fallback={<ThumbFallback item={item} small />} />;
}

// Link grande in fondo a una pagina per passare all'altra sezione
function PageSwitch({ label, sub, href, onClick, accent }: { label: string; sub: string; href: string; onClick: (e?: { preventDefault: () => void }) => void; accent: string }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group mt-20 flex items-center justify-between gap-6 p-8 md:p-10 rounded-[4px] border border-white/5 bg-[#0B0F0D] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div>
        <span className="block font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.25em] text-[#5E7568] mb-2">Continua con</span>
        <span className="block font-['Space_Grotesk'] text-3xl sm:text-4xl font-black uppercase" style={{ color: accent }}>{label}</span>
        <span className="block font-['JetBrains_Mono'] text-xs text-[#8FA89A] mt-2">{sub}</span>
      </div>
      <ChevronRight size={32} className="text-[#5E7568] group-hover:translate-x-1 transition duration-200" style={{ color: accent }} />
    </a>
  );
}

// Lettore Drive: mostra la miniatura con un pulsante play e carica il player solo al clic
function DrivePlayer({ item }: { item: MediaItem }) {
  const [started, setStarted] = useState(false);
  const poster = getThumbnailUrl(item, 1600);
  if (started) {
    return (
      <iframe
        src={getDriveEmbedUrl(item.url) + '?autoplay=1'}
        className="w-full h-full flex-1 border-0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title={item.caption}
      />
    );
  }
  return (
    <button
      onClick={() => setStarted(true)}
      className="relative w-full h-full flex-1 group cursor-pointer bg-black"
      aria-label={`Riproduci ${item.caption}`}
    >
      {poster && (
        <>
          <div className="absolute inset-0 bg-center bg-cover blur-2xl opacity-30 scale-110" style={{ backgroundImage: `url("${poster}")` }} aria-hidden="true" />
          <img src={poster} alt={item.caption} referrerPolicy="no-referrer" className="relative w-full h-full object-contain" />
        </>
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-[#00FF88]/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.35)] group-hover:scale-110 transition duration-200">
          <Play size={24} fill="currentColor" className="ml-1" />
        </span>
      </span>
    </button>
  );
}
