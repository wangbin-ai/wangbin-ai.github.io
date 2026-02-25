/**
 * Modern Homepage - Main JavaScript
 * Loads content from data.json and handles navigation, animations, and interactive features
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const sections = document.querySelectorAll('section[id]');
    const themeToggle = document.getElementById('themeToggle');

    // ============================================
    // Theme Toggle - Dark/Light Mode
    // ============================================
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else if (savedTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else if (!systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        updateMetaThemeColor();
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        if (newTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', newTheme);
        }

        localStorage.setItem('theme', newTheme);
        updateMetaThemeColor();
    }

    function updateMetaThemeColor() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', currentTheme === 'light' ? '#ffffff' : '#0a0a0f');
        }
    }

    // Initialize theme on script load (before DOMContentLoaded to prevent flash)
    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
            updateMetaThemeColor();
        }
    });

    // ============================================
    // SVG Icon Templates for Research Cards
    // ============================================
    const researchIcons = {
        'foundation-models': `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="4" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>
            <circle cx="8" cy="20" r="2"/><circle cx="16" cy="20" r="2"/>
            <path d="M12 6v4M6 12l4-4M18 12l-4-4M8 18l2-4M16 18l-2-4M8 12h8"/>
        </svg>`,
        'reinforcement-learning': `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2a10 10 0 0 1 10 10"/><path d="M22 12a10 10 0 0 1-10 10"/>
            <path d="M12 22a10 10 0 0 1-10-10"/><path d="M2 12a10 10 0 0 1 10-10"/>
            <path d="M19 5l3-1-1 3"/><path d="M19 19l3 1-1-3"/>
            <path d="M5 19l-3 1 1-3"/><path d="M5 5l-3-1 1 3"/>
        </svg>`,
        'ai-agents': `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="4" y="4" width="16" height="12" rx="2"/>
            <circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/>
            <path d="M8 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"/>
            <path d="M12 1v3"/><circle cx="12" cy="1" r="1"/>
        </svg>`,
        'embodied-ai': `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="5" cy="5" r="2"/><path d="M5 7v4"/><path d="M5 11l6 4"/>
            <circle cx="11" cy="15" r="1.5"/><path d="M12.5 15.5l4 3"/>
            <path d="M16.5 18.5l3-1"/><path d="M19.5 17.5l1 2"/><path d="M20.5 19.5l-2 1"/>
            <rect x="14" y="3" width="6" height="4" rx="1"/><path d="M17 7v4"/>
        </svg>`
    };

    // ============================================
    // SVG Icon Templates for Links
    // ============================================
    const linkIcons = {
        openreview: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <path d="M15 3h6v6"/><path d="M10 14L21 3"/>
        </svg>`,
        github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>`,
        project: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>`
    };

    // ============================================
    // Social Link SVG Icons
    // ============================================
    const socialIcons = {
        linkedin: `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>`,
        scholar: `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.242 13.769L0 9.5L12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
        </svg>`,
        github: `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>`
    };

    // ============================================
    // Data Loading and Rendering
    // ============================================
    async function loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Failed to load data.json');
            const data = await response.json();
            renderAll(data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    function renderAll(data) {
        renderNav(data);
        renderHero(data);
        renderAbout(data);
        renderExperience(data);
        renderResearch(data);
        renderPublications(data);
        renderContact(data);
        renderFooter(data);

        // Initialize interactive features after content is rendered
        initAnimations();
        animateCards();
        initMouseEffect();
        initCardGlowEffect();
        initTypedEffect(data.personal.typingText);
        initTagFiltering();
        initSmoothScroll();
        updateAllCitations();
        initCitationClickHandlers();
    }

    // ============================================
    // Render Functions
    // ============================================
    function renderNav(data) {
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.innerHTML = `<img src="${data.personal.photo}" alt="${data.personal.name}" class="nav-avatar">`;
        }

        const navScholarLink = document.getElementById('navScholarLink');
        if (navScholarLink) {
            navScholarLink.href = data.personal.social.scholar.url;
        }
    }

    function renderHero(data) {
        const avatarWrapper = document.querySelector('.hero-avatar-wrapper');
        if (avatarWrapper) {
            avatarWrapper.innerHTML = `<img src="${data.personal.photo}" alt="${data.personal.name}" class="hero-avatar-img">`;
        }

        const heroLocation = document.getElementById('heroLocation');
        if (heroLocation) {
            heroLocation.textContent = data.personal.location;
        }

        const heroSubtitle = document.getElementById('heroSubtitle');
        if (heroSubtitle) {
            // Parse the titleFull to add highlight spans
            const highlights = ['AI Agents', 'Foundation Models', 'Reinforcement Learning'];
            let subtitleHtml = data.personal.titleFull;
            highlights.forEach(term => {
                subtitleHtml = subtitleHtml.replace(term, `<span class="highlight">${term}</span>`);
            });
            heroSubtitle.innerHTML = subtitleHtml;
        }

        const heroDesc = document.getElementById('heroDesc');
        if (heroDesc) {
            heroDesc.textContent = data.personal.heroDescription;
        }
    }

    function renderAbout(data) {
        const aboutText = document.getElementById('aboutText');
        if (!aboutText) return;

        aboutText.innerHTML = data.about.paragraphs.map(p => {
            const className = p.isLead ? 'about-lead' : '';
            return `<p class="${className}">${p.text}</p>`;
        }).join('');
    }

    function renderExperience(data) {
        const timeline = document.getElementById('experienceTimeline');
        if (!timeline) return;

        timeline.innerHTML = data.experience.map(exp => `
            <div class="experience-item">
                <div class="experience-dot"></div>
                <div class="experience-date">${exp.date}</div>
                <div class="experience-card">
                    <h3 class="experience-role">${exp.role}</h3>
                    <div class="experience-org">${exp.organization}</div>
                </div>
            </div>
        `).join('');
    }

    function renderResearch(data) {
        const grid = document.getElementById('researchGrid');
        if (!grid) return;

        grid.innerHTML = data.research.map(r => `
            <div class="research-card" data-filter-tag="${r.id}">
                <div class="card-glow"></div>
                <div class="research-header">
                    <div class="research-icon">
                        ${researchIcons[r.icon] || ''}
                    </div>
                </div>
                <h3>${r.title}</h3>
                <p>${r.description}</p>
                <div class="research-tags">
                    ${r.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    function renderPublications(data) {
        const list = document.getElementById('publicationsList');
        if (!list) return;

        list.innerHTML = data.publications.map(pub => {
            const tagsAttr = pub.tags.join(',');
            const semanticAttr = pub.semanticId ? `data-semantic-id="${pub.semanticId}"` : '';

            const linksHtml = pub.links.length > 0 ? `
                <div class="pub-links">
                    ${pub.links.map(link => `
                        <a href="${link.url}" target="_blank" class="pub-link">
                            ${linkIcons[link.type] || linkIcons.openreview}
                            ${link.label}
                        </a>
                    `).join('')}
                </div>
            ` : '';

            return `
                <article class="pub-card" id="${pub.id}" data-paper-title="${pub.title}" ${semanticAttr} data-tags="${tagsAttr}">
                    <div class="pub-year-section">
                        <div class="pub-year">${pub.year}</div>
                        <div class="pub-citations" title="Citations from Semantic Scholar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21"/>
                            </svg>
                            <span class="citation-count">--</span>
                        </div>
                    </div>
                    <div class="pub-content">
                        <div class="pub-venue-tag">${pub.venue}</div>
                        <h3 class="pub-title"><a href="${pub.url}" target="_blank">${pub.title}</a></h3>
                        <p class="pub-authors">${pub.authors}</p>
                        <div class="pub-tags">
                            ${pub.tagLabels.map((label, i) => `<span class="pub-tag" data-filter="${pub.tags[i]}">${label}</span>`).join('')}
                        </div>
                        ${linksHtml}
                    </div>
                </article>
            `;
        }).join('');

        // Update scholar footer link
        const scholarFooterLink = document.getElementById('scholarFooterLink');
        if (scholarFooterLink) {
            scholarFooterLink.href = data.personal.social.scholar.url;
        }
    }

    function renderContact(data) {
        const contactIntro = document.getElementById('contactIntro');
        if (contactIntro) {
            contactIntro.textContent = data.contact.intro;
        }

        const contactCards = document.getElementById('contactCards');
        if (!contactCards) return;

        const socialEntries = Object.entries(data.personal.social);
        contactCards.innerHTML = socialEntries.map(([key, social]) => `
            <a href="${social.url}" target="_blank" class="contact-card">
                <div class="contact-icon">
                    ${socialIcons[key] || ''}
                </div>
                <div class="contact-info">
                    <span class="contact-label">${social.label}</span>
                    <span class="contact-value">${social.value}</span>
                </div>
                <svg class="contact-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            </a>
        `).join('');
    }

    function renderFooter(data) {
        const footerLogo = document.getElementById('footerLogo');
        if (footerLogo) {
            footerLogo.textContent = data.personal.shortName;
        }

        const footerCopyright = document.getElementById('footerCopyright');
        if (footerCopyright) {
            const currentYear = new Date().getFullYear();
            footerCopyright.innerHTML = `&copy; ${currentYear} ${data.personal.name}. All rights reserved.`;
        }
    }

    // ============================================
    // Navigation - Scroll Effect
    // ============================================
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNav() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const navOverlay = document.getElementById('navOverlay');

    function openMobileMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                closeMobileMenu();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    if ((href === '#publications' || href === '#research') && typeof window.resetTagFilter === 'function') {
                        window.resetTagFilter();
                    }

                    const navHeight = nav ? nav.offsetHeight : 0;
                    const targetPosition = target.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - (nav ? nav.offsetHeight : 0);
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNavLink();
            });
        }
    });

    // ============================================
    // Intersection Observer - Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ============================================
    // Initialize Animations on Load
    // ============================================
    function initAnimations() {
        const animateSelectors = [
            '.research-card',
            '.pub-card',
            '.info-card',
            '.contact-card',
            '.section-header',
            '.about-text',
            '.about-cards'
        ];

        animateSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('fade-in');
                el.style.transitionDelay = `${index * 0.1}s`;
                fadeInObserver.observe(el);
            });
        });
    }

    function animateCards() {
        const cards = document.querySelectorAll('.research-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // ============================================
    // Mouse Move Effect for Hero
    // ============================================
    function initMouseEffect() {
        const hero = document.querySelector('.hero');
        const bgGlow = document.querySelector('.bg-glow');

        if (hero && bgGlow) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

                bgGlow.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
            });

            hero.addEventListener('mouseleave', () => {
                bgGlow.style.transform = 'translateX(-50%)';
            });
        }
    }

    // ============================================
    // Typed Text Effect for Hero Title
    // ============================================
    function initTypedEffect(text) {
        const typingText = document.getElementById('typingText');
        if (!typingText || !text) return;

        let i = 0;

        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        typingText.appendChild(cursor);

        function type() {
            if (i < text.length) {
                typingText.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                    setTimeout(() => cursor.remove(), 500);
                }, 2000);
            }
        }

        setTimeout(type, 500);
    }

    // ============================================
    // Card Hover Effect - Glow Follow
    // ============================================
    function initCardGlowEffect() {
        const cards = document.querySelectorAll('.research-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // ============================================
    // Parallax Effect for Background
    // ============================================
    function initParallax() {
        const bgGradient = document.querySelector('.bg-gradient');

        window.addEventListener('scroll', () => {
            if (bgGradient) {
                const scrolled = window.scrollY;
                bgGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // ============================================
    // Semantic Scholar Citation Fetcher
    // ============================================
    async function fetchCitationById(paperId) {
        try {
            const response = await fetch(
                `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=citationCount`
            );

            if (response.status === 429) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                return fetchCitationById(paperId);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.citationCount !== undefined ? data.citationCount : null;
        } catch (error) {
            console.warn(`Failed to fetch citations by ID: ${paperId}`, error);
            return null;
        }
    }

    async function fetchCitationByTitle(paperTitle) {
        try {
            const encodedTitle = encodeURIComponent(paperTitle);
            const response = await fetch(
                `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodedTitle}&fields=citationCount,title&limit=1`
            );

            if (response.status === 429) {
                return null;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                return data.data[0].citationCount;
            }
            return null;
        } catch (error) {
            console.warn(`Failed to fetch citations for: ${paperTitle}`, error);
            return null;
        }
    }

    async function updateSingleCitation(card) {
        const semanticId = card.getAttribute('data-semantic-id');
        const title = card.getAttribute('data-paper-title');
        const citationElement = card.querySelector('.pub-citations');
        const countElement = card.querySelector('.citation-count');

        if (!countElement) return;

        if (citationElement) {
            citationElement.classList.add('loading');
        }

        let citationCount = null;
        if (semanticId) {
            citationCount = await fetchCitationById(semanticId);
        }

        if (citationCount === null && title) {
            citationCount = await fetchCitationByTitle(title);
        }

        if (citationCount !== null) {
            countElement.textContent = citationCount;
        } else {
            countElement.textContent = '--';
        }

        if (citationElement) {
            citationElement.classList.remove('loading');
        }
    }

    async function updateAllCitations() {
        const pubCards = document.querySelectorAll('.pub-card[data-paper-title]');

        for (let i = 0; i < pubCards.length; i++) {
            await updateSingleCitation(pubCards[i]);

            if (i < pubCards.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    function initCitationClickHandlers() {
        const pubCards = document.querySelectorAll('.pub-card[data-paper-title]');
        pubCards.forEach(card => {
            const citationElement = card.querySelector('.pub-citations');
            if (citationElement) {
                citationElement.style.cursor = 'pointer';
                citationElement.title = 'Click to refresh citation count';
                citationElement.addEventListener('click', () => {
                    updateSingleCitation(card);
                });
            }
        });
    }

    // ============================================
    // Publication Tag Filtering
    // ============================================
    let scrolledFromResearch = false;

    function initTagFiltering() {
        const pubCards = document.querySelectorAll('.pub-card[data-tags]');
        const researchCards = document.querySelectorAll('.research-card[data-filter-tag]');

        let activeFilter = 'all';

        function applyFilter(tag) {
            activeFilter = tag;

            researchCards.forEach(card => {
                card.classList.toggle('filter-active', card.getAttribute('data-filter-tag') === tag);
            });

            pubCards.forEach(card => {
                const cardTags = card.getAttribute('data-tags').split(',');
                if (tag === 'all' || cardTags.includes(tag)) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });
        }

        window.resetTagFilter = function() {
            applyFilter('all');
            scrolledFromResearch = false;
        };

        researchCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.research-cite')) return;

                const tag = card.getAttribute('data-filter-tag');
                applyFilter(tag === activeFilter ? 'all' : tag);
                scrolledFromResearch = true;

                const pubSection = document.getElementById('publications');
                if (pubSection) {
                    const navHeight = nav ? nav.offsetHeight : 0;
                    const targetPosition = pubSection.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        const pubSection = document.getElementById('publications');
        const researchSection = document.getElementById('research');
        if (pubSection && researchSection) {
            const pubObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!scrolledFromResearch && activeFilter !== 'all') {
                            applyFilter('all');
                        }
                    }
                });
            }, { threshold: 0.1 });
            pubObserver.observe(pubSection);

            const researchObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scrolledFromResearch = false;
                    }
                });
            }, { threshold: 0.1 });
            researchObserver.observe(researchSection);
        }

        document.querySelectorAll('.research-cite').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetId = link.getAttribute('href').substring(1);
                const targetCard = document.getElementById(targetId);

                if (targetCard) {
                    applyFilter('all');

                    const navHeight = nav ? nav.offsetHeight : 0;
                    const targetPosition = targetCard.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    targetCard.classList.add('highlight');
                    setTimeout(() => {
                        targetCard.classList.remove('highlight');
                    }, 2000);
                }
            });
        });
    }

    // ============================================
    // Initialize Everything
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initParallax();
        loadData();
    });

    // ============================================
    // Handle Reduced Motion Preference
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }

})();
