import { useEffect, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { projects } from './data/projects'
import { skillGroups } from './data/skills'
import { achievements } from './data/achievements'
import './App.css'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeNav, setActiveNav] = useState('about')
  const navListRef = useRef(null)
  const navLinkRefs = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  })
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const currentYear = new Date().getFullYear()
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.2,
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveNav(visibleEntries[0].target.id)
        }
      },
      {
        root: null,
        threshold: [0.35, 0.6, 0.8],
        rootMargin: '-20% 0px -55% 0px',
      },
    )

    sections.forEach((section) => sectionObserver.observe(section))

    return () => sectionObserver.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8

      if (nearPageBottom) {
        setActiveNav('contact')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateIndicatorPosition = () => {
      const navListElement = navListRef.current
      const activeLinkElement = navLinkRefs.current[activeNav]

      if (!navListElement || !activeLinkElement) {
        return
      }

      const navListRect = navListElement.getBoundingClientRect()
      const linkRect = activeLinkElement.getBoundingClientRect()

      setIndicatorStyle({
        left: linkRect.left - navListRect.left,
        top: linkRect.top - navListRect.top,
        width: linkRect.width,
        height: linkRect.height,
        opacity: 1,
      })
    }

    const rafId = window.requestAnimationFrame(updateIndicatorPosition)
    window.addEventListener('resize', updateIndicatorPosition)
    window.addEventListener('load', updateIndicatorPosition)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateIndicatorPosition)
      window.removeEventListener('load', updateIndicatorPosition)
    }
  }, [activeNav])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setSubmitStatus('loading')
    setSubmitMessage('')

    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send message right now.')
      }

      setSubmitStatus('success')
      setSubmitMessage('Message sent successfully. I will get back to you soon.')
      setFormState({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="app-page">
      <Analytics />
      <iframe
        src="/background/index.html"
        title="Animated background"
        className="matrix-background"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="background-overlay" aria-hidden="true" />
      <div className="app-shell">
      <header className="navbar-wrap">
        <nav className="navbar">
          <ul className="nav-links" ref={navListRef}>
            <li
              className="nav-active-pill"
              style={{
                transform: `translate(${indicatorStyle.left}px, ${indicatorStyle.top}px)`,
                width: `${indicatorStyle.width}px`,
                height: `${indicatorStyle.height}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  ref={(element) => {
                    if (element) {
                      navLinkRefs.current[item.id] = element
                    }
                  }}
                  href={`#${item.id}`}
                  className={activeNav === item.id ? 'active' : ''}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-content" data-reveal>
            <p className="eyebrow">Full Stack Developer Portfolio</p>
            <h1>Aromal M</h1>
            <h2>Computer Science And Engineering Student | Full Stack Developer</h2>
            <p className="intro">
              I build Projects with clean architecture,
              scalable APIs, and thoughtful user experiences focused on real-world
              impact. I am a fast learner and a passionate problem solver, always eager to take on new
            </p>

            <div className="cta-group">
              <a href="https://github.com/Argonebee" className="btn btn-primary" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/argonebee" className="btn btn-primary" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="/resume.pdf" className="btn btn-secondary" download>
                Download Resume
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">About</p>
            <h3>Building practical, polished software</h3>
          </div>
          <p className="section-text">
            I am a B.tech Computer Science And Engineering student passionate about full-stack
            development And AI Integration. I enjoy turning complex ideas into maintainable,
            production-ready interfaces and backend services. I am a fast learner and actively seek out new technologies and challenges to grow my skills. My projects focus on real-world impact, with an emphasis on clean architecture, scalable APIs, and thoughtful user experiences.
          </p>
        </section>

        <section id="projects" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Projects</p>
            <h3>Selected Project works</h3>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="card project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <ul className="tag-list">
                  {project.techStack.map((tech) => (
                    <li key={`${project.title}-${tech}`}>{tech}</li>
                  ))}
                </ul>
                <div className="card-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Skills</p>
            <h3>Skillkit</h3>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article key={group.category} className="card skill-card">
                <h4>{group.category}</h4>
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li key={`${group.category}-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Achievements</p>
            <h3>Highlights</h3>
          </div>
          <div className="achievement-grid">
            {achievements.map((item) => (
              <article key={item.title} className="card achievement-card">
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Resume</p>
            <h3>Professional snapshot</h3>
          </div>
          <article className="card resume-card">
            <div>
              <h4>Aromal - Full Stack Developer Resume</h4>
              <p>
                Includes education, technical stack, project highlights, and
                hands-on development experience.
              </p>
            </div>
            <a href="/resume.pdf" className="btn btn-primary" download>
              Download Resume
            </a>
          </article>
        </section>

        <section id="contact" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Contact</p>
            <h3>Let us build something together</h3>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formState.message}
              onChange={handleInputChange}
              placeholder="Tell me about your project"
              required
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitStatus === 'loading'}
            >
              {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {submitMessage && (
              <p
                className={`form-status ${submitStatus === 'error' ? 'error' : 'success'}`}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>{currentYear} Aromal. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/Argonebee" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/argonebee/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
      </div>
    </div>
  )
}

export default App
