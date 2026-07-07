import { useState, useEffect } from 'react'
import { 
  Sparkles, 
  Palette, 
  Heart, 
  FolderHeart, 
  BookOpen, 
  Terminal, 
  Download, 
  Laptop, 
  Check, 
  Copy, 
  Trash2, 
  Smile
} from 'lucide-react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './App.css'

// Custom Github Icon SVG to avoid bundler import mismatch issues
function GithubIcon({ size = 18 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function App() {
  // Interactive note builder state
  const [noteBg, setNoteBg] = useState('pink')
  const [washiPattern, setWashiPattern] = useState('stripes')
  const [activeSticker, setActiveSticker] = useState('💖')
  
  // Showcase Screenshot tabs state
  const [showcaseTab, setShowcaseTab] = useState('dashboard')
  
  // Terminal commands state
  const [terminalTab, setTerminalTab] = useState('install')
  const [copied, setCopied] = useState(false)

  // Scroll Spy state
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'features', 'playground', 'gallery', 'get-started']
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Smooth scroll on anchor link clicks
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault()
        const targetElement = document.getElementById(href.substring(1))
        if (targetElement) {
          lenis.scrollTo(targetElement)
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      if (link.getAttribute('href') !== '#') {
        link.addEventListener('click', handleAnchorClick)
      }
    })

    return () => {
      lenis.destroy()
      links.forEach(link => {
        link.removeEventListener('click', handleAnchorClick)
      })
    }
  }, [])

  // Color options maps
  const colorMap = {
    pink: {
      bgClass: 'var(--pastel-pink-bg)',
      textClass: 'var(--pastel-pink-text)',
      hex: '#ffccd5',
      name: 'Cherry Pink'
    },
    lavender: {
      bgClass: 'var(--pastel-lavender-bg)',
      textClass: 'var(--pastel-lavender-text)',
      hex: '#e8dbfc',
      name: 'Lavender'
    },
    peach: {
      bgClass: 'var(--pastel-peach-bg)',
      textClass: 'var(--pastel-peach-text)',
      hex: '#ffe5d9',
      name: 'Sweet Peach'
    },
    mint: {
      bgClass: 'var(--pastel-mint-bg)',
      textClass: 'var(--pastel-mint-text)',
      hex: '#d8f3dc',
      name: 'Fresh Mint'
    },
    yellow: {
      bgClass: 'var(--pastel-yellow-bg)',
      textClass: 'var(--pastel-yellow-text)',
      hex: '#fff2b2',
      name: 'Custard Yellow'
    }
  }

  // Washi styles
  const washiMap = {
    stripes: 'tape-stripes',
    polka: 'tape-polka',
    grid: 'tape-grid'
  }

  // Showcase details
  const showcaseInfo = {
    dashboard: {
      title: 'Pastel Dashboard',
      description: 'A playful workspace to hold note cards customized with colors, titles, stickers, washi tapes, and folders.',
      img: '/screenshots/notes_grid_loaded.png'
    },
    delete: {
      title: 'Custom Delete Modal',
      description: 'Protect your notes with a delightful warning banner styled with washi tape borders and pastel custom warning headers.',
      img: '/screenshots/delete_modal_layout.png'
    },
    toast: {
      title: 'Toast Notification Systems',
      description: 'Elegant slide-in toast notifications confirming action success, such as note creation, deletes, and edits.',
      img: '/screenshots/after_delete_toast.png'
    }
  }

  // Terminal commands code
  const commands = {
    install: 'npm install',
    'run-web': 'npm run dev',
    'run-electron': 'npm run electron:dev'
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="header">
        <a href="#" className="logo-container" id="nav-logo">
          <span className="logo-icon" role="img" aria-label="flower">🌸</span>
          <span className="logo-text">Cute Notes</span>
          <span className="logo-badge">v1.0.0</span>
        </a>
        <nav className="nav-links">
          <a 
            href="#features" 
            className={`nav-link ${activeSection === 'features' ? 'active' : ''}`} 
            id="nav-features-link"
          >
            Features
          </a>
          <a 
            href="#playground" 
            className={`nav-link ${activeSection === 'playground' ? 'active' : ''}`} 
            id="nav-playground-link"
          >
            Design Sandbox
          </a>
          <a 
            href="#gallery" 
            className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`} 
            id="nav-gallery-link"
          >
            Gallery
          </a>
          <a 
            href="#get-started" 
            className={`nav-link ${activeSection === 'get-started' ? 'active' : ''}`} 
            id="nav-get-started-link"
          >
            Get Started
          </a>
          <a 
            href="https://github.com/revanzaRaihan/cute-notes-landing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link"
            id="nav-github-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <GithubIcon size={18} />
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-title-badge" id="hero-badge">
          <Sparkles size={16} className="spin-slow" />
          Delightful Pastel Note-Taking
        </div>
        <h1 className="hero-title" id="hero-heading">
          Write, Doodle, & Decorate <br />
          Your Thoughts in <span>Pastels</span>
        </h1>
        <p className="hero-subtitle" id="hero-subheading">
          Cute Notes is a feature-rich desktop notes application designed with a playful spiral-notebook aesthetic. Write notes, organize them with folders, and style them with stickers and washi tapes.
        </p>

        <div className="hero-cta" id="hero-actions">
          <a href="/CuteNotes-Setup.exe" download="CuteNotes-Setup.exe" className="btn btn-primary" id="btn-download">
            <Download size={18} />
            Get Desktop App
          </a>
          <a href="#playground" className="btn btn-secondary" id="btn-sandbox">
            <Smile size={18} />
            Try Sandbox
          </a>
        </div>

        {/* Live-Sync App Mockup Showcase */}
        <div className="app-showcase-container" id="app-showcase">
          <div className="app-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="mockup-dot red"></span>
                <span className="mockup-dot yellow"></span>
                <span className="mockup-dot green"></span>
              </div>
              <span className="mockup-title">Cute Notes Desktop App</span>
            </div>
            <div className="mockup-body">
              <img 
                src={showcaseInfo[showcaseTab].img} 
                alt={showcaseInfo[showcaseTab].title} 
                className="mockup-img"
                id="mockup-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Playground */}
      <section className="interactive-section" id="playground">
        <h2 className="section-title" id="playground-heading">🎨 Design Sandbox</h2>
        <p className="section-subtitle" id="playground-subheading">
          Get a sneak peek at the note customization features! Customize the note card styling below to preview how it looks inside the app.
        </p>

        <div className="interactive-container">
          {/* Controls Panel */}
          <div className="customizer-panel" id="customizer-controls">
            {/* Color controls */}
            <div className="control-group">
              <label className="control-label">
                <Palette size={18} />
                Background Color: {colorMap[noteBg].name}
              </label>
              <div className="color-picker" id="picker-colors">
                {Object.keys(colorMap).map((colorKey) => (
                  <button
                    key={colorKey}
                    className={`color-dot ${noteBg === colorKey ? 'active' : ''}`}
                    style={{ backgroundColor: colorMap[colorKey].hex }}
                    onClick={() => setNoteBg(colorKey)}
                    title={colorMap[colorKey].name}
                    aria-label={`Select ${colorMap[colorKey].name}`}
                    id={`color-opt-${colorKey}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Washi controls */}
            <div className="control-group">
              <label className="control-label">
                <Heart size={18} />
                Washi Tape Pattern
              </label>
              <div className="tape-selector" id="picker-washi">
                {Object.keys(washiMap).map((washiKey) => (
                  <button
                    key={washiKey}
                    className={`tape-option ${washiPattern === washiKey ? 'active' : ''}`}
                    onClick={() => setWashiPattern(washiKey)}
                    id={`washi-opt-${washiKey}`}
                  >
                    <div className={`tape-preview-swatch ${washiMap[washiKey]}`}></div>
                    <span>{washiKey.charAt(0).toUpperCase() + washiKey.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sticker controls */}
            <div className="control-group">
              <label className="control-label">
                <Sparkles size={18} />
                Select Note Sticker
              </label>
              <div className="sticker-picker" id="picker-sticker">
                {['💖', '🌸', '⭐', '🐱', '🍰', '🍡'].map((sticker) => (
                  <button
                    key={sticker}
                    className={`sticker-option ${activeSticker === sticker ? 'active' : ''}`}
                    onClick={() => setActiveSticker(sticker)}
                    id={`sticker-opt-${sticker}`}
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Note Mockup Preview */}
          <div className="note-preview-area" id="note-preview-canvas">
            <div 
              className="preview-note-card lined-paper"
              style={{ 
                backgroundColor: colorMap[noteBg].hex,
                color: colorMap[noteBg].textClass,
                borderColor: colorMap[noteBg].textClass + '33' 
              }}
              id="preview-note"
            >
              {/* Lined spiral binder elements */}
              <div className="preview-note-binding">
                <span className="binding-ring"></span>
                <span className="binding-ring"></span>
                <span className="binding-ring"></span>
                <span className="binding-ring"></span>
                <span className="binding-ring"></span>
                <span className="binding-ring"></span>
                <span className="binding-ring"></span>
              </div>

              {/* Tape Element */}
              <div className={`preview-note-washi ${washiMap[washiPattern]}`} id="preview-note-washi"></div>

              {/* Sticker Element */}
              <div className="preview-note-sticker" id="preview-note-sticker">
                {activeSticker}
              </div>

              {/* Lined paper interior text */}
              <div className="note-paper-content">
                <div className="note-preview-title">My Doodle Pad</div>
                <div className="note-preview-text">
                  - Style note backgrounds ✨<br />
                  - Choose washi tape patterns 🎗️<br />
                  - Stamp lovely stickers! 🌸<br />
                  - Drag notes into folders 📂
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase Tab-switcher */}
      <section className="showcase-section" id="gallery">
        <h2 className="section-title" id="gallery-heading">📸 Interface Showcase</h2>
        <p className="section-subtitle" id="gallery-subheading">
          Explore screens and key layout details of the application. Click options below to switch images inside the preview.
        </p>

        <div className="showcase-container">
          <div className="showcase-tabs" id="gallery-tabs">
            {Object.keys(showcaseInfo).map((tabKey) => (
              <button
                key={tabKey}
                className={`showcase-tab ${showcaseTab === tabKey ? 'active' : ''}`}
                onClick={() => setShowcaseTab(tabKey)}
                id={`gallery-tab-${tabKey}`}
              >
                {showcaseInfo[tabKey].title}
              </button>
            ))}
          </div>

          <div className="showcase-panel" id="gallery-panel">
            <div className="showcase-card">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot red"></span>
                  <span className="mockup-dot yellow"></span>
                  <span className="mockup-dot green"></span>
                </div>
                <span className="mockup-title">{showcaseInfo[showcaseTab].title}</span>
              </div>
              <img 
                src={showcaseInfo[showcaseTab].img} 
                alt={showcaseInfo[showcaseTab].title} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
                id="gallery-image"
              />
              <div className="showcase-info">
                <h3>{showcaseInfo[showcaseTab].title}</h3>
                <p>{showcaseInfo[showcaseTab].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section" id="features">
        <h2 className="section-title" id="features-heading">🌸 Beautiful Key Features</h2>
        <p className="section-subtitle" id="features-subheading">
          A note pad application that is designed from scratch to look adorable, interactive, and premium.
        </p>

        <div className="features-grid" id="features-cards">
          {/* Card 1 */}
          <div className="feature-card" id="feat-pastel">
            <div className="feature-icon-wrapper" style={{ backgroundColor: 'var(--pastel-pink-bg)', color: 'var(--pastel-pink-text)' }}>
              <Palette size={22} />
            </div>
            <h3 className="feature-title">Pastel Customizer</h3>
            <p className="feature-description">
              Style your note cards with five hand-picked pastel themes: Cherry Pink, Lavender, Sweet Peach, Fresh Mint, and Custard Yellow.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card" id="feat-decor">
            <div className="feature-icon-wrapper" style={{ backgroundColor: 'var(--pastel-lavender-bg)', color: 'var(--pastel-lavender-text)' }}>
              <Sparkles size={22} />
            </div>
            <h3 className="feature-title">Washi & Stickers</h3>
            <p className="feature-description">
              Decorate your notepad. Apply washi tapes with grids, polka dots, or stripes, tilted at natural angles. Stamp stickers like stars, cakes, and cats!
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card" id="feat-folders">
            <div className="feature-icon-wrapper" style={{ backgroundColor: 'var(--pastel-peach-bg)', color: 'var(--pastel-peach-text)' }}>
              <FolderHeart size={22} />
            </div>
            <h3 className="feature-title">Drag & Drop Folders</h3>
            <p className="feature-description">
              Keep your board organized. Simply drag notes onto each other to group them into folders, complete with overlay overlays and rename tags.
            </p>
          </div>

          {/* Card 4 */}
          <div className="feature-card" id="feat-editor">
            <div className="feature-icon-wrapper" style={{ backgroundColor: 'var(--pastel-mint-bg)', color: 'var(--pastel-mint-text)' }}>
              <BookOpen size={22} />
            </div>
            <h3 className="feature-title">Spiral Notebook Editor</h3>
            <p className="feature-description">
              Open notes into a large notebook view. Complete with red binders, line grids, automatic list numbering, bullet points, and tab indentation.
            </p>
          </div>

          {/* Card 5 */}
          <div className="feature-card" id="feat-deletes">
            <div className="feature-icon-wrapper" style={{ backgroundColor: 'var(--pastel-yellow-bg)', color: 'var(--pastel-yellow-text)' }}>
              <Trash2 size={22} />
            </div>
            <h3 className="feature-title">Cute Confirmation Dialogs</h3>
            <p className="feature-description">
              Protect your entries with charming confirmation screens decorated with banners, color borders, and soft transitions.
            </p>
          </div>

          {/* Card 6 */}
          <div className="feature-card" id="feat-desktop">
            <div className="feature-icon-wrapper" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Laptop size={22} />
            </div>
            <h3 className="feature-title">Native Desktop Shell</h3>
            <p className="feature-description">
              Runs as a borderless native application powered by Electron. Packaged into a portable Windows executable (.exe) with no setup required.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start / Developer Guide */}
      <section className="terminal-section" id="get-started">
        <h2 className="section-title" id="started-heading">💻 Developer Quick Start</h2>
        <p className="section-subtitle" id="started-subheading">
          Want to run the app locally? Switch the developer tab to copy execution scripts.
        </p>

        <div className="terminal-window" id="terminal">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot"></span>
              <span className="terminal-dot"></span>
              <span className="terminal-dot"></span>
            </div>
            <span className="terminal-title">bash — cute-notes dev-server</span>
            <button 
              className="copy-btn" 
              onClick={() => handleCopy(commands[terminalTab])}
              title="Copy command"
              aria-label="Copy command text to clipboard"
              id="btn-copy-command"
            >
              {copied ? <Check size={16} style={{ color: '#d8f3dc' }} /> : <Copy size={16} />}
            </button>
          </div>

          <div className="terminal-tabs" id="terminal-tabs">
            <button 
              className={`terminal-tab ${terminalTab === 'install' ? 'active' : ''}`}
              onClick={() => setTerminalTab('install')}
              id="terminal-tab-install"
            >
              1. Installation
            </button>
            <button 
              className={`terminal-tab ${terminalTab === 'run-web' ? 'active' : ''}`}
              onClick={() => setTerminalTab('run-web')}
              id="terminal-tab-run-web"
            >
              2. Web Mode
            </button>
            <button 
              className={`terminal-tab ${terminalTab === 'run-electron' ? 'active' : ''}`}
              onClick={() => setTerminalTab('run-electron')}
              id="terminal-tab-run-electron"
            >
              3. Desktop Mode
            </button>
          </div>

          <div className="terminal-content" id="terminal-content">
            {terminalTab === 'install' && (
              <div>
                <span className="term-comment"># Navigate to cute-notes project and install modules</span><br />
                <span className="term-cmd">cd</span> cute-notes<br />
                <span className="term-cmd">npm install</span>
              </div>
            )}
            {terminalTab === 'run-web' && (
              <div>
                <span className="term-comment"># Start hot module reloading inside the web browser</span><br />
                <span className="term-cmd">npm run dev</span><br />
                <span className="term-output">&gt; Local: http://localhost:5173/</span>
              </div>
            )}
            {terminalTab === 'run-electron' && (
              <div>
                <span className="term-comment"># Start the app running in native Electron shell wrapper</span><br />
                <span className="term-cmd">npm run electron:dev</span><br />
                <span className="term-output">&gt; Launching standalone Electron Window...</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span style={{ fontSize: '1.4rem' }}>🌸</span>
          <span style={{ fontFamily: 'var(--font-title)', fontWeight: 600, color: 'var(--text-heading)' }}>Cute Notes</span>
        </div>
        <p className="footer-text">
          Made with love & React + Vite + Electron.
        </p>
        <div className="footer-links">
          <a href="#features" className="footer-link">Features</a>
          <a href="#playground" className="footer-link">Sandbox</a>
          <a href="#gallery" className="footer-link">Gallery</a>
        </div>
        <p className="footer-text" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} Cute Notes App. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
