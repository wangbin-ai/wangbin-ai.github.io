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
        </svg>`,
        email: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
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

    // Detect if we're on the CV page
    const isCVPage = document.querySelector('.cv-page') !== null;

    function renderAll(data) {
        if (isCVPage) {
            renderCVPage(data);
            return;
        }

        renderNav(data);
        renderHero(data);
        renderNews(data);
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

    function renderNews(data) {
        const container = document.getElementById('heroNewsContainer');
        if (!container || !data.news || data.news.length === 0) return;

        const newsItems = data.news.slice(0, 3).map(item => {
            const datePart = item.date ? `<span class="news-date">${item.date}</span>` : '';
            const className = item.important ? 'news-item important' : 'news-item';
            return `<li class="${className}">${datePart}<span class="news-text">${item.text}</span></li>`;
        }).join('');

        container.innerHTML = `
            <div class="hero-news">
                <div class="hero-news-header">
                    <svg class="hero-news-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                        <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/>
                    </svg>
                    <span>Latest News</span>
                </div>
                <div class="hero-news-scroll">
                    <ul class="hero-news-list">${newsItems}</ul>
                </div>
            </div>
        `;
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
    // CV Page Rendering
    // ============================================
    // SVG icons for CV section titles
    const cvSectionIcons = {
        'cv-research-interests': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
        'cv-experience': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
        'cv-education': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`,
        'cv-publications': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
        'cv-awards': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>`,
        'cv-services': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    };

    // CV contact item SVG icons
    const cvContactIcons = {
        location: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z"/></svg>`,
        linkedin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
        scholar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5L12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>`,
        email: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>`
    };

    function renderCVPage(data) {
        renderCVNav(data);
        renderCVHeader(data);
        renderCVSidebar(data);
        renderCVResearchInterests(data);
        renderCVExperience(data);
        renderCVEducation(data);
        renderCVPublications(data);
        renderCVAwards(data);
        renderCVServices(data);
        renderCVFooter(data);

        initCVSidebar();
        initSmoothScroll();
    }

    function renderCVNav(data) {
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.innerHTML = `<img src="${data.personal.photo}" alt="${data.personal.name}" class="nav-avatar">`;
        }
    }

    function renderCVHeader(data) {
        const avatar = document.getElementById('cvAvatar');
        if (avatar) {
            avatar.src = data.personal.photo;
            avatar.alt = data.personal.name;
        }

        const name = document.getElementById('cvName');
        if (name) name.textContent = data.personal.name;

        const title = document.getElementById('cvTitle');
        if (title) title.textContent = data.cv.titleFull;

        const contactRow = document.getElementById('cvContactRow');
        if (!contactRow) return;

        // Location (not a link)
        let contactHtml = `<span class="cv-contact-item">${cvContactIcons.location} ${data.personal.location}</span>`;

        // Social links
        const socialOrder = ['linkedin', 'scholar', 'email'];
        socialOrder.forEach(key => {
            const social = data.personal.social[key];
            if (social) {
                contactHtml += `<a href="${social.url}" target="_blank" class="cv-contact-item">${cvContactIcons[key] || ''} ${social.label}</a>`;
            }
        });

        contactRow.innerHTML = contactHtml;
    }

    function renderCVSidebar(data) {
        const sidebar = document.getElementById('cvSidebarNav');
        if (!sidebar || !data.cv.sections) return;

        sidebar.innerHTML = data.cv.sections.map(section =>
            `<a href="#${section.id}" class="cv-sidebar-link" data-section="${section.id}">${section.title}</a>`
        ).join('');
    }

    function renderCVResearchInterests(data) {
        const container = document.getElementById('cvResearchInterests');
        if (!container) return;

        container.innerHTML = `
            <h2 class="cv-section-title">${cvSectionIcons['cv-research-interests']} Research Interests</h2>
            <p class="cv-interests-text">${data.cv.researchInterests}</p>
        `;
    }

    function renderCVExperience(data) {
        const container = document.getElementById('cvExperience');
        if (!container) return;

        const itemsHtml = data.cv.experience.map(exp => {
            let subItemsHtml = '';
            if (exp.subItems && exp.subItems.length > 0) {
                subItemsHtml = `<div class="cv-sub-items">${exp.subItems.map(sub => `
                    <div class="cv-sub-item">
                        <div class="cv-sub-item-header">
                            <div class="cv-sub-item-role">${sub.role}</div>
                            <div class="cv-sub-item-date">${sub.date}</div>
                        </div>
                        <div class="cv-sub-item-desc">${sub.description}</div>
                    </div>
                `).join('')}</div>`;
            }

            const descHtml = exp.description ? `<div class="cv-item-org">${exp.description}</div>` : '';

            return `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <div class="cv-item-role">${exp.role}</div>
                            <div class="cv-item-org">${exp.organization}</div>
                            ${descHtml}
                        </div>
                        <div class="cv-item-date">${exp.date}</div>
                    </div>
                    ${subItemsHtml}
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <h2 class="cv-section-title">${cvSectionIcons['cv-experience']} Professional Experience</h2>
            ${itemsHtml}
        `;
    }

    function renderCVEducation(data) {
        const container = document.getElementById('cvEducation');
        if (!container) return;

        const itemsHtml = data.cv.education.map(edu => {
            const descHtml = edu.description ? `<div class="cv-item-org">${edu.description}</div>` : '';
            return `
                <div class="cv-item">
                    <div class="cv-item-header">
                        <div>
                            <div class="cv-item-role">${edu.degree}</div>
                            <div class="cv-item-org">${edu.institution}</div>
                            ${descHtml}
                        </div>
                        <div class="cv-item-date">${edu.date}</div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <h2 class="cv-section-title">${cvSectionIcons['cv-education']} Education</h2>
            ${itemsHtml}
        `;
    }

    function renderCVPublications(data) {
        const container = document.getElementById('cvPublications');
        if (!container) return;

        const pubsHtml = data.publications.map(pub => `
            <div class="cv-pub-item">
                <span class="cv-pub-venue">${pub.venue}</span>
                <div class="cv-pub-title">${pub.title}</div>
                <div class="cv-pub-authors">${pub.authors}</div>
            </div>
        `).join('');

        const scholarUrl = data.personal.social.scholar.url;

        container.innerHTML = `
            <h2 class="cv-section-title">${cvSectionIcons['cv-publications']} Selected Publications</h2>
            ${pubsHtml}
            <div class="cv-pub-footer">
                <a href="${scholarUrl}" target="_blank" class="btn-cv btn-cv-print">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <path d="M15 3h6v6"/>
                        <path d="M10 14L21 3"/>
                    </svg>
                    View Full Publication List
                </a>
            </div>
        `;
    }

    function renderCVAwards(data) {
        const container = document.getElementById('cvAwards');
        if (!container) return;

        const itemsHtml = data.cv.awards.map(award => `
            <div class="cv-item">
                <div class="cv-item-header">
                    <div class="cv-item-role">${award.title}</div>
                    <div class="cv-item-date">${award.year}</div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <h2 class="cv-section-title">${cvSectionIcons['cv-awards']} Awards &amp; Honors</h2>
            ${itemsHtml}
        `;
    }

    function renderCVServices(data) {
        const container = document.getElementById('cvServices');
        if (!container) return;

        const itemsHtml = data.cv.services.map(service => `
            <div class="cv-item">
                <div class="cv-item-role">${service.role}</div>
                <div class="cv-item-desc">${service.description}</div>
            </div>
        `).join('');

        container.innerHTML = `
            <h2 class="cv-section-title">${cvSectionIcons['cv-services']} Professional Services</h2>
            ${itemsHtml}
        `;
    }

    function renderCVFooter(data) {
        const footerCopyright = document.getElementById('footerCopyright');
        if (footerCopyright) {
            const currentYear = new Date().getFullYear();
            footerCopyright.innerHTML = `&copy; ${currentYear} ${data.personal.name}. All rights reserved.`;
        }
    }

    // ============================================
    // CV Sidebar Navigation Logic
    // ============================================
    function initCVSidebar() {
        const sidebar = document.getElementById('cvSidebarNav');
        if (!sidebar) return;

        const sidebarLinks = sidebar.querySelectorAll('.cv-sidebar-link');
        const cvSections = [];

        sidebarLinks.forEach(link => {
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                cvSections.push({ id: sectionId, el: section, link: link });
            }
        });

        let cvTicking = false;

        function updateSidebar() {
            const scrollY = window.scrollY;
            const navHeight = 72;
            const triggerOffset = 200;

            if (scrollY > triggerOffset) {
                sidebar.classList.add('visible');
            } else {
                sidebar.classList.remove('visible');
            }

            let activeSection = null;
            const isAtBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 50);
            if (isAtBottom && cvSections.length > 0) {
                activeSection = cvSections[cvSections.length - 1];
            } else {
                for (let i = cvSections.length - 1; i >= 0; i--) {
                    const sectionTop = cvSections[i].el.offsetTop - navHeight - 60;
                    if (scrollY >= sectionTop) {
                        activeSection = cvSections[i];
                        break;
                    }
                }
            }

            sidebarLinks.forEach(link => link.classList.remove('active'));
            if (activeSection) {
                activeSection.link.classList.add('active');
            }

            cvTicking = false;
        }

        window.addEventListener('scroll', function() {
            if (!cvTicking) {
                window.requestAnimationFrame(updateSidebar);
                cvTicking = true;
            }
        });

        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section) {
                    const navHeight = 72;
                    window.scrollTo({
                        top: section.offsetTop - navHeight - 20,
                        behavior: 'smooth'
                    });
                }
            });
        });

        updateSidebar();
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
