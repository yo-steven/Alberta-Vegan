// Advanced header scroll transformation
window.addEventListener('scroll', function() {
    const header = document.querySelector('.vvoa-main-header-container');
    const scrollProgress = Math.min(window.scrollY / 100, 1);

    if (scrollProgress > 0.1) {
        header.classList.add('vvoa-header-scrolled');
        header.style.transform = `translateY(${-scrollProgress * 5}px)`;
    } else {
        header.classList.remove('vvoa-header-scrolled');
        header.style.transform = 'translateY(0px)';
    }
});

// Alberta shape morphing animation
function initAlbertaShapeEffects() {
    const albertaShape = document.querySelector('.vvoa-alberta-province-shape');
    const growthContainer = document.querySelector('.vvoa-logo-alberta-growth-container');

    growthContainer.addEventListener('mouseenter', function() {
        albertaShape.style.clipPath = 'polygon(15% 0%, 85% 0%, 100% 25%, 95% 75%, 75% 100%, 25% 100%, 5% 75%, 0% 25%)';
        albertaShape.style.transform = 'scale(1.15) rotate(8deg)';
    });

    growthContainer.addEventListener('mouseleave', function() {
        albertaShape.style.clipPath = 'polygon(20% 0%, 80% 0%, 100% 30%, 90% 70%, 70% 100%, 30% 100%, 10% 70%, 0% 30%)';
        albertaShape.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Community leaf synchronization
function initCommunityLeafNetwork() {
    const leaves = document.querySelectorAll('.vvoa-community-leaf');
    const container = document.querySelector('.vvoa-logo-alberta-growth-container');

    container.addEventListener('click', function() {
        leaves.forEach((leaf, index) => {
            leaf.style.animationDelay = `${index * 0.2}s`;
            leaf.style.animationDuration = '1s';

            setTimeout(() => {
                leaf.style.animationDuration = '3s';
                leaf.style.animationDelay = `${index * 0.5}s`;
            }, 2000);
        });
    });
}

// Food showcase molecular interaction
function initFoodShowcaseMolecularEffects() {
    const showcase = document.querySelector('.vvoa-hero-food-showcase-container');
    const molecules = document.querySelectorAll('.vvoa-nutrition-molecule-structure');

    showcase.addEventListener('mouseenter', function() {
        molecules.forEach((molecule, index) => {
            const centerAtom = molecule.querySelector('.vvoa-molecule-center-atom');
            const orbit = molecule.querySelector('.vvoa-molecule-electron-orbit');

            centerAtom.style.animationDuration = '1s';
            orbit.style.animationDuration = '1.5s';
            molecule.style.transform = `scale(1.3) rotate(${index * 120}deg)`;
        });
    });

    showcase.addEventListener('mouseleave', function() {
        molecules.forEach(molecule => {
            const centerAtom = molecule.querySelector('.vvoa-molecule-center-atom');
            const orbit = molecule.querySelector('.vvoa-molecule-electron-orbit');

            centerAtom.style.animationDuration = '2s';
            orbit.style.animationDuration = '3s';
            molecule.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Community connection network visualization
function initCommunityConnectionNetwork() {
    const nodes = document.querySelectorAll('.vvoa-community-connection-node');

    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            nodes.forEach((otherNode, otherIndex) => {
                if (otherIndex !== index) {
                    otherNode.style.animationDuration = '3s';
                    otherNode.style.transform = 'scale(0.8)';
                    otherNode.style.opacity = '0.6';
                }
            });

            this.style.animationDuration = '1s';
            this.style.transform = 'scale(1.4)';
            this.style.opacity = '1';
            this.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.8)';
        });

        node.addEventListener('mouseleave', function() {
            nodes.forEach(otherNode => {
                otherNode.style.animationDuration = '6s';
                otherNode.style.transform = 'scale(1)';
                otherNode.style.opacity = '1';
                otherNode.style.boxShadow = '';
            });
        });
    });
}

// CTA button advanced ripple and transformation effects
function initAdvancedCTAEffects() {
    const ctaButton = document.querySelector('.vvoa-primary-cta-button');

    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Create multiple ripple effects
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * (1 + i * 0.3);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = `rgba(255, 255, 255, ${0.4 - i * 0.1})`;
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = `vvoa-ripple-effect ${0.8 + i * 0.2}s ease-out`;
                ripple.style.pointerEvents = 'none';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, (800 + i * 200));
            }, i * 100);
        }

        // Button transformation effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, 100);
    });
}

// Prairie wind interaction with cursor
function initPrairieWindCursorEffects() {
    const prairieElements = document.querySelectorAll('.vvoa-wheat-stalk-graphic');
    const heroSection = document.querySelector('.vvoa-hero-section-container');

    heroSection.addEventListener('mousemove', function(e) {
        const centerX = window.innerWidth / 2;
        const mouseX = e.clientX;
        const windForce = (mouseX - centerX) / centerX;

        prairieElements.forEach((stalk, index) => {
            const baseRotation = windForce * (5 + index * 2);
            stalk.style.transform = `rotate(${baseRotation}deg)`;
            stalk.style.transition = 'transform 0.3s ease-out';
        });
    });

    heroSection.addEventListener('mouseleave', function() {
        prairieElements.forEach(stalk => {
            stalk.style.transform = '';
            stalk.style.transition = 'transform 1s ease-out';
        });
    });
}

// Text animation with staggered reveal
function initStaggeredTextAnimations() {
    const celebratingText = document.querySelector('.vvoa-hero-heading-celebrating');
    const everythingVegText = document.querySelector('.vvoa-hero-heading-everything-veg');
    const descriptionText = document.querySelector('.vvoa-hero-description-text');

    // Split text into individual characters for animation
    function animateTextCharacters(element, delay = 0) {
        const text = element.textContent;
        element.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            span.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay + index * 0.05}s`;
            element.appendChild(span);

            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // Trigger animations
    setTimeout(() => animateTextCharacters(celebratingText, 0), 500);
    setTimeout(() => animateTextCharacters(everythingVegText, 0.5), 800);

    // Description text word-by-word animation
    setTimeout(() => {
        const words = descriptionText.textContent.split(' ');
        descriptionText.innerHTML = '';

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.4s ease ${index * 0.1}s`;
            span.style.display = 'inline-block';
            descriptionText.appendChild(span);

            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 50);
        });
    }, 1500);
}

// Growth metrics interactive visualization
function initGrowthMetricsInteraction() {
    const growthBars = document.querySelectorAll('.vvoa-growth-metric-bar');
    const showcase = document.querySelector('.vvoa-hero-food-showcase-container');

    showcase.addEventListener('mouseenter', function() {
        growthBars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.2}s`;
            bar.style.animationDuration = '1.5s';
            bar.style.transform = `scaleY(${1.5 + index * 0.2})`;
        });
    });

    showcase.addEventListener('mouseleave', function() {
        growthBars.forEach((bar, index) => {
            bar.style.animationDuration = '3s';
            bar.style.transform = '';
        });
    });
}

// Keyboard navigation enhancement
function initAdvancedKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    let currentFocusIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Enhanced tab navigation with visual feedback
            const currentElement = document.activeElement;
            if (currentElement && currentElement.classList.contains('vvoa-nav-link-primary')) {
                currentElement.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.5)';
                setTimeout(() => {
                    currentElement.style.boxShadow = '';
                }, 300);
            }
        }

        if (e.key === 'Enter' && e.target.classList.contains('vvoa-scroll-discovery-arrow')) {
            e.preventDefault();
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    });
}

// Performance optimization with intersection observer
function initPerformanceOptimizations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vvoa-in-viewport');
            } else {
                entry.target.classList.remove('vvoa-in-viewport');
            }
        });
    }, observerOptions);

    // Observe expensive animation elements
    const expensiveElements = document.querySelectorAll(
        '.vvoa-energy-particle, .vvoa-nutrition-molecule-structure, .vvoa-community-connection-node'
    );

    expensiveElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-speed', '0.5s');
        const style = document.createElement('style');
        style.textContent = `
            .vvoa-energy-particle,
            .vvoa-floating-nutrition-nodes {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Advanced parallax system for enhanced visual effects
function initAdvancedParallaxSystem() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax for floating elements
        const floatingElements = document.querySelectorAll('.vvoa-floating-community-icons .vvoa-community-connection-node');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax for energy particles
        const energyParticles = document.querySelectorAll('.vvoa-energy-particle');
        energyParticles.forEach((particle, index) => {
            const speed = 0.05 + (index * 0.01);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize all advanced functionality
document.addEventListener('DOMContentLoaded', function() {
    initAlbertaShapeEffects();
    initCommunityLeafNetwork();
    initFoodShowcaseMolecularEffects();
    initCommunityConnectionNetwork();
    initAdvancedCTAEffects();
    initPrairieWindCursorEffects();
    initAdvancedParallaxSystem();
    initStaggeredTextAnimations();
    initGrowthMetricsInteraction();
    initAdvancedKeyboardNavigation();
    initPerformanceOptimizations();

    // Add dynamic CSS animations
    const dynamicStyle = document.createElement('style');
    dynamicStyle.textContent = `
        @keyframes vvoa-ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .vvoa-in-viewport .vvoa-energy-particle {
            animation-play-state: running;
        }

        .vvoa-in-viewport .vvoa-nutrition-molecule-structure {
            animation-play-state: running;
        }

        .vvoa-energy-particle:not(.vvoa-in-viewport),
        .vvoa-nutrition-molecule-structure:not(.vvoa-in-viewport) {
            animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        .vvoa-accessibility-focus:focus {
            outline: 3px solid #4CAF50 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(dynamicStyle);

    // Add accessibility enhancements
    const accessibleElements = document.querySelectorAll('a, button');
    accessibleElements.forEach(el => {
        el.classList.add('vvoa-accessibility-focus');
    });
});


// Advanced parallax scrolling for about section
function initAboutSectionParallax() {
    window.addEventListener('scroll', function() {
        const aboutSection = document.querySelector('.vvoa-about-section-main-container');
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;

        // Calculate if section is in viewport
        const sectionProgress = Math.max(0, Math.min(1, 
            (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight)
        ));

        if (sectionProgress > 0 && sectionProgress < 1) {
            // Compassionate pattern overlay movement
            const patternOverlay = document.querySelector('.vvoa-compassionate-living-pattern-overlay');
            patternOverlay.style.transform = `translateY(${(scrolled - sectionTop) * 0.3}px)`;

            // Floating compassion elements parallax
            const compassionElements = document.querySelectorAll('.vvoa-compassion-spirit-particle');
            compassionElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translateY(${(scrolled - sectionTop) * speed}px)`;
            });

            // Impact statistics orbital adjustment
            const impactCircles = document.querySelectorAll('.vvoa-impact-metric-circle');
            impactCircles.forEach((circle, index) => {
                const speedMultiplier = 1 + (sectionProgress * 0.5);
                circle.style.animationDuration = `${12 / speedMultiplier}s`;
            });
        }
    });
}

// Compassionate image showcase interaction effects
function initCompassionateImageEffects() {
    const imageShowcase = document.querySelector('.vvoa-compassionate-image-showcase');
    const floatingElements = document.querySelectorAll('.vvoa-compassion-spirit-particle');

    imageShowcase.addEventListener('mouseenter', function() {
        floatingElements.forEach((element, index) => {
            element.style.transform = `scale(1.3) rotate(${index * 90}deg)`;
            element.style.animationPlayState = 'paused';
            element.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.5)';
        });
    });

    imageShowcase.addEventListener('mouseleave', function() {
        floatingElements.forEach(element => {
            element.style.transform = '';
            element.style.animationPlayState = 'running';
            element.style.boxShadow = '';
        });
    });
}

// Mission highlights staggered animation
function initMissionHighlightsAnimation() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const highlights = entry.target.querySelectorAll('.vvoa-mission-highlight-item');
                highlights.forEach((highlight, index) => {
                    setTimeout(() => {
                        highlight.style.opacity = '1';
                        highlight.style.transform = 'translateX(0px)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    const highlightsContainer = document.querySelector('.vvoa-mission-highlights-container');
    if (highlightsContainer) {
        // Initially hide highlights
        const highlights = highlightsContainer.querySelectorAll('.vvoa-mission-highlight-item');
        highlights.forEach(highlight => {
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateX(-50px)';
            highlight.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        highlightObserver.observe(highlightsContainer);
    }
}

// Animal protection badge interaction
function initAnimalProtectionBadgeEffects() {
    const protectionBadge = document.querySelector('.vvoa-animal-protection-badge');

    protectionBadge.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.inset = '-10px';
        ripple.style.background = 'rgba(76, 175, 80, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'vvoa-badge-ripple 1s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);

        // Badge transformation
        this.style.transform = 'scale(0.95) rotate(-5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }, 100);
    });
}

// Compassionate choice indicator heartbeat effect
function initCompassionateChoiceEffects() {
    const choiceIndicator = document.querySelector('.vvoa-compassionate-choice-indicator');

    choiceIndicator.addEventListener('mouseenter', function() {
        this.style.animationDuration = '1s';
        this.style.background = 'rgba(233, 30, 99, 1)';

        // Create heart particles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '💚';
                heart.style.position = 'absolute';
                heart.style.fontSize = '16px';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.animation = 'vvoa-heart-float 2s ease-out forwards';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '10';

                this.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }, i * 200);
        }
    });

    choiceIndicator.addEventListener('mouseleave', function() {
        this.style.animationDuration = '2.5s';
        this.style.background = 'rgba(233, 30, 99, 0.9)';
    });
}

// Mission text dynamic gradient effects
function initMissionTextEffects() {
    const whoWeAreText = document.querySelector('.vvoa-who-we-are-text');
    const whatWeDoText = document.querySelector('.vvoa-what-we-do-text');

    function createTextSparkle(element) {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'vvoa-sparkle-fade 1.5s ease-out forwards';
        sparkle.style.pointerEvents = 'none';

        element.style.position = 'relative';
        element.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }

    setInterval(() => {
        if (Math.random() > 0.7) {
            createTextSparkle(whoWeAreText);
        }
        if (Math.random() > 0.8) {
            createTextSparkle(whatWeDoText);
        }
    }, 2000);
}

// Learn About Us button advanced effects
function initLearnAboutUsButtonEffects() {
    const learnButton = document.querySelector('.vvoa-learn-about-us-button');

    learnButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Multi-layer ripple effect
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * (1.5 + i * 0.3);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = `rgba(255, 255, 255, ${0.3 - i * 0.08})`;
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = `vvoa-ripple-effect ${1 + i * 0.3}s ease-out`;
                ripple.style.pointerEvents = 'none';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, (1000 + i * 300));
            }, i * 150);
        }

        // Button energy burst effect
        this.style.background = 'linear-gradient(135deg, #8E24AA, #AB47BC, #9C27B0)';
        this.style.transform = 'scale(0.98)';

        setTimeout(() => {
            this.style.background = '';
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }, 150);
    });
}

// Impact statistics orbital interaction
function initImpactStatisticsEffects() {
    const impactVisualization = document.querySelector('.vvoa-impact-statistics-visualization');
    const impactCircles = document.querySelectorAll('.vvoa-impact-metric-circle');

    if (impactVisualization) {
        impactVisualization.addEventListener('mouseenter', function() {
            impactCircles.forEach((circle, index) => {
                circle.style.animationDuration = '6s';
                circle.style.transform += ` scale(1.2)`;
                circle.style.background = 'rgba(76, 175, 80, 0.2)';
                circle.style.borderColor = 'rgba(76, 175, 80, 0.6)';
            });
        });

        impactVisualization.addEventListener('mouseleave', function() {
            impactCircles.forEach(circle => {
                circle.style.animationDuration = '12s';
                circle.style.transform = '';
                circle.style.background = '';
                circle.style.borderColor = '';
            });
        });
    }
}

// Environmental benefit particles interaction
function initEnvironmentalParticlesEffects() {
    const benefitParticles = document.querySelectorAll('.vvoa-benefit-particle');
    const aboutSection = document.querySelector('.vvoa-about-section-main-container');

    aboutSection.addEventListener('mousemove', function(e) {
        const sectionRect = this.getBoundingClientRect();
        const mouseX = e.clientX - sectionRect.left;
        const mouseY = e.clientY - sectionRect.top;
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;

        const attractionForceX = (mouseX - centerX) / centerX * 30;
        const attractionForceY = (mouseY - centerY) / centerY * 20;

        benefitParticles.forEach((particle, index) => {
            const offsetX = attractionForceX * (0.5 + index * 0.1);
            const offsetY = attractionForceY * (0.3 + index * 0.05);

            particle.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
            particle.style.transition = 'transform 0.3s ease-out';
        });
    });

    aboutSection.addEventListener('mouseleave', function() {
        benefitParticles.forEach(particle => {
            particle.style.transform = '';
            particle.style.transition = 'transform 1s ease-out';
        });
    });
}

// Keyboard navigation enhancement
function initAboutSectionKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('.vvoa-learn-about-us-button, .vvoa-mission-highlight-item');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(76, 175, 80, 0.6)';
            this.style.outlineOffset = '3px';
            this.style.transform = 'scale(1.02)';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
            this.style.transform = '';
        });
    });
}

// Performance optimization for animations
function initAboutSectionPerformanceOptimizations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            .vvoa-about-section-main-container * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Pause expensive animations when not in viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '100px 0px'
    };

    const performanceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const particles = entry.target.querySelectorAll('.vvoa-benefit-particle, .vvoa-compassion-spirit-particle');

            if (entry.isIntersecting) {
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'running';
                });
            } else {
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'paused';
                });
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.vvoa-about-section-main-container');
    performanceObserver.observe(aboutSection);
}

// Initialize all about section functionality
document.addEventListener('DOMContentLoaded', function() {
    initAboutSectionParallax();
    initCompassionateImageEffects();
    initMissionHighlightsAnimation();
    initAnimalProtectionBadgeEffects();
    initCompassionateChoiceEffects();
    initMissionTextEffects();
    initLearnAboutUsButtonEffects();
    initImpactStatisticsEffects();
    initEnvironmentalParticlesEffects();
    initAboutSectionKeyboardNavigation();
    initAboutSectionPerformanceOptimizations();

    // Add additional CSS animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes vvoa-badge-ripple {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }

        @keyframes vvoa-heart-float {
            0% {
                transform: translateY(0px) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-40px) scale(0.5);
                opacity: 0;
            }
        }

        @keyframes vvoa-sparkle-fade {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes vvoa-ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(additionalStyles);
});


// Advanced team section parallax effects
function initTeamSectionParallax() {
    window.addEventListener('scroll', function() {
        const teamSection = document.querySelector('.vvoa-team-section-main-container');
        const sectionTop = teamSection.offsetTop;
        const sectionHeight = teamSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;

        const sectionProgress = Math.max(0, Math.min(1, 
            (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight)
        ));

        if (sectionProgress > 0 && sectionProgress < 1) {
            // Edmonton skyline silhouette movement
            const skylineSilhouette = document.querySelector('.vvoa-edmonton-skyline-silhouette-overlay');
            skylineSilhouette.style.transform = `translateY(${(scrolled - sectionTop) * 0.2}px)`;

            // Volunteer network nodes parallax
            const networkNodes = document.querySelectorAll('.vvoa-volunteer-network-node');
            networkNodes.forEach((node, index) => {
                const speed = 0.15 + (index * 0.03);
                node.style.transform = `translateY(${(scrolled - sectionTop) * speed}px)`;
            });

            // Leadership constellation adjustment
            const leadershipStars = document.querySelectorAll('.vvoa-leadership-star');
            leadershipStars.forEach((star, index) => {
                const twinkleSpeed = 1 + (sectionProgress * 0.3);
                star.style.animationDuration = `${4 / twinkleSpeed}s`;
            });
        }
    });
}

// Edmonton skyline showcase interaction
function initEdmontonSkylineEffects() {
    const skylineShowcase = document.querySelector('.vvoa-edmonton-skyline-showcase');
    const networkNodes = document.querySelectorAll('.vvoa-volunteer-network-node');

    skylineShowcase.addEventListener('mouseenter', function() {
        networkNodes.forEach((node, index) => {
            node.style.transform = `scale(1.4) rotate(${index * 72}deg)`;
            node.style.animationPlayState = 'paused';
            node.style.boxShadow = '0 20px 50px rgba(25, 118, 210, 0.5)';
        });
    });

    skylineShowcase.addEventListener('mouseleave', function() {
        networkNodes.forEach(node => {
            node.style.transform = '';
            node.style.animationPlayState = 'running';
            node.style.boxShadow = '';
        });
    });
}

// Volunteer passion highlights staggered reveal
function initVolunteerHighlightsAnimation() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -80px 0px'
    };

    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const highlights = entry.target.querySelectorAll('.vvoa-passion-highlight-item');
                highlights.forEach((highlight, index) => {
                    setTimeout(() => {
                        highlight.style.opacity = '1';
                        highlight.style.transform = 'translateX(0px) scale(1)';
                    }, index * 300);
                });
            }
        });
    }, observerOptions);

    const highlightsContainer = document.querySelector('.vvoa-volunteer-passion-highlights');
    if (highlightsContainer) {
        const highlights = highlightsContainer.querySelectorAll('.vvoa-passion-highlight-item');
        highlights.forEach(highlight => {
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateX(-60px) scale(0.9)';
            highlight.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        highlightObserver.observe(highlightsContainer);
    }
}

// Edmonton location badge interactive effects
function initEdmontonLocationBadgeEffects() {
    const locationBadge = document.querySelector('.vvoa-edmonton-location-badge');

    locationBadge.addEventListener('click', function() {
        // Create city energy burst
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const energyBurst = document.createElement('div');
                energyBurst.style.position = 'absolute';
                energyBurst.style.width = '20px';
                energyBurst.style.height = '20px';
                energyBurst.style.background = 'rgba(25, 118, 210, 0.7)';
                energyBurst.style.borderRadius = '50%';
                energyBurst.style.left = '50%';
                energyBurst.style.top = '50%';
                energyBurst.style.transform = 'translate(-50%, -50%)';
                energyBurst.style.animation = `vvoa-city-energy-burst 1.5s ease-out forwards`;
                energyBurst.style.pointerEvents = 'none';
                energyBurst.style.zIndex = '5';

                const angle = (i * 60) * (Math.PI / 180);
                energyBurst.style.setProperty('--angle', angle + 'rad');

                this.appendChild(energyBurst);

                setTimeout(() => {
                    energyBurst.remove();
                }, 1500);
            }, i * 100);
        }

        this.style.transform = 'scale(0.9) rotate(-8deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.15) rotate(3deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 250);
        }, 150);
    });
}

// Team collaboration indicator handshake effect
function initTeamCollaborationEffects() {
    const collaborationIndicator = document.querySelector('.vvoa-team-collaboration-indicator');

    collaborationIndicator.addEventListener('mouseenter', function() {
        this.style.animationDuration = '2s';
        this.style.background = 'rgba(76, 175, 80, 1)';

        // Create collaboration sparkles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.fontSize = '18px';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animation = 'vvoa-collaboration-sparkle 2.5s ease-out forwards';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '10';

                this.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 2500);
            }, i * 150);
        }
    });

    collaborationIndicator.addEventListener('mouseleave', function() {
        this.style.animationDuration = '4s';
        this.style.background = 'rgba(76, 175, 80, 0.9)';
    });
}

// Meet Our Team text dynamic effects
function initTeamTextEffects() {
    const teamText = document.querySelector('.vvoa-meet-our-team-text');
    const volunteerIcon = document.querySelector('.vvoa-team-volunteer-spirit-icon');

    function createTeamSpirit() {
        const spirit = document.createElement('span');
        spirit.textContent = '👥';
        spirit.style.position = 'absolute';
        spirit.style.fontSize = '25px';
        spirit.style.left = Math.random() * 100 + '%';
        spirit.style.top = Math.random() * 100 + '%';
        spirit.style.animation = 'vvoa-team-spirit-float 2s ease-out forwards';
        spirit.style.pointerEvents = 'none';

        teamText.style.position = 'relative';
        teamText.appendChild(spirit);

        setTimeout(() => {
            spirit.remove();
        }, 2000);
    }

    // Random team spirit appearances
    setInterval(() => {
        if (Math.random() > 0.8) {
            createTeamSpirit();
        }
    }, 3000);

    // Volunteer icon interaction
    if (volunteerIcon) {
        volunteerIcon.addEventListener('mouseenter', function() {
            this.style.animationDuration = '6s';
            this.style.color = 'rgba(25, 118, 210, 0.6)';
            this.style.transform += ' scale(1.2)';
        });

        volunteerIcon.addEventListener('mouseleave', function() {
            this.style.animationDuration = '12s';
            this.style.color = '';
            this.style.transform = '';
        });
    }
}

// Meet The Team button advanced effects
function initMeetTeamButtonEffects() {
    const meetTeamButton = document.querySelector('.vvoa-meet-team-button');

    meetTeamButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Multi-layered team energy ripple
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * (1.8 + i * 0.4);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = `rgba(255, 255, 255, ${0.4 - i * 0.08})`;
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = `vvoa-team-ripple-effect ${1.2 + i * 0.4}s ease-out`;
                ripple.style.pointerEvents = 'none';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, (1200 + i * 400));
            }, i * 200);
        }

        // Button team synergy effect
        this.style.background = 'linear-gradient(135deg, #8E24AA, #AB47BC, #9C27B0, #7B1FA2)';
        this.style.transform = 'scale(0.96)';

        setTimeout(() => {
            this.style.background = '';
            this.style.transform = 'scale(1.06)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        }, 200);
    });
}

// Leadership constellation interaction
function initLeadershipConstellationEffects() {
    const constellation = document.querySelector('.vvoa-team-leadership-constellation');
    const stars = document.querySelectorAll('.vvoa-leadership-star');

    if (constellation) {
        constellation.addEventListener('mouseenter', function() {
            stars.forEach((star, index) => {
                star.style.animationDuration = '2s';
                star.style.transform = `scale(${1.5 + index * 0.1})`;
                star.style.opacity = '1';
            });
        });

        constellation.addEventListener('mouseleave', function() {
            stars.forEach(star => {
                star.style.animationDuration = '4s';
                star.style.transform = '';
                star.style.opacity = '';
            });
        });
    }
}

// Team motivation particles cursor interaction
function initTeamMotivationParticlesEffects() {
    const motivationParticles = document.querySelectorAll('.vvoa-motivation-particle');
    const teamSection = document.querySelector('.vvoa-team-section-main-container');

    teamSection.addEventListener('mousemove', function(e) {
        const sectionRect = this.getBoundingClientRect();
        const mouseX = e.clientX - sectionRect.left;
        const mouseY = e.clientY - sectionRect.top;
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;

        const magnetForceX = (mouseX - centerX) / centerX * 25;
        const magnetForceY = (mouseY - centerY) / centerY * 15;

        motivationParticles.forEach((particle, index) => {
            const offsetX = magnetForceX * (0.4 + index * 0.08);
            const offsetY = magnetForceY * (0.3 + index * 0.05);

            particle.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
            particle.style.transition = 'transform 0.4s ease-out';
        });
    });

    teamSection.addEventListener('mouseleave', function() {
        motivationParticles.forEach(particle => {
            particle.style.transform = '';
            particle.style.transition = 'transform 1.2s ease-out';
        });
    });
}

// Keyboard navigation for team section
function initTeamSectionKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('.vvoa-meet-team-button, .vvoa-passion-highlight-item');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(25, 118, 210, 0.6)';
            this.style.outlineOffset = '4px';
            this.style.transform = 'scale(1.03)';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
            this.style.transform = '';
        });
    });
}

// Performance optimizations for team section
function initTeamSectionPerformanceOptimizations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            .vvoa-team-section-main-container * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '100px 0px'
    };

    const performanceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const particles = entry.target.querySelectorAll('.vvoa-motivation-particle, .vvoa-volunteer-network-node, .vvoa-leadership-star');

            if (entry.isIntersecting) {
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'running';
                });
            } else {
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'paused';
                });
            }
        });
    }, observerOptions);

    const teamSection = document.querySelector('.vvoa-team-section-main-container');
    performanceObserver.observe(teamSection);
}

// Initialize all team section functionality
document.addEventListener('DOMContentLoaded', function() {
    initTeamSectionParallax();
    initEdmontonSkylineEffects();
    initVolunteerHighlightsAnimation();
    initEdmontonLocationBadgeEffects();
    initTeamCollaborationEffects();
    initTeamTextEffects();
    initMeetTeamButtonEffects();
    initLeadershipConstellationEffects();
    initTeamMotivationParticlesEffects();
    initTeamSectionKeyboardNavigation();
    initTeamSectionPerformanceOptimizations();

    // Add additional CSS animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes vvoa-city-energy-burst {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translateX(calc(cos(var(--angle)) * 60px)) translateY(calc(sin(var(--angle)) * 60px)) scale(0);
                opacity: 0;
            }
        }

        @keyframes vvoa-collaboration-sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.3) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes vvoa-team-spirit-float {
            0% {
                transform: translateY(0px) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-50px) scale(0.6);
                opacity: 0;
            }
        }

        @keyframes vvoa-team-ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(additionalStyles);
});


// Advanced cosmic involvement system
function initCosmicInvolvementSystem() {
    const involvedText = document.querySelector('.vvoa-get-involved-text');
    const networkOverlay = document.querySelector('.vvoa-community-growth-network-overlay');
    const ecosystemContainer = document.querySelector('.vvoa-get-involved-section-main-container');

    if (involvedText) {
        involvedText.addEventListener('mouseenter', function() {
            this.style.animationDuration = '6s';
            this.style.filter = 'drop-shadow(0 0 30px rgba(233, 30, 99, 0.8))';

            // Accelerate ecosystem breathing
            ecosystemContainer.style.animationDuration = '20s';
            networkOverlay.style.animationDuration = '15s';
        });

        involvedText.addEventListener('mouseleave', function() {
            this.style.animationDuration = '12s';
            this.style.filter = '';

            ecosystemContainer.style.animationDuration = '35s';
            networkOverlay.style.animationDuration = '25s';
        });
    }
}

// Community connection network interaction
function initCommunityConnectionNetworkEffects() {
    const connectionNodes = document.querySelectorAll('.vvoa-connection-node');
    const connectionVisualization = document.querySelector('.vvoa-community-connection-visualization');

    if (connectionVisualization) {
        connectionVisualization.addEventListener('mouseenter', function() {
            connectionNodes.forEach((node, index) => {
                node.style.animationDuration = '4s';
                node.style.transform = `scale(1.5) rotate(${index * 45}deg)`;
                node.style.boxShadow = '0 15px 40px rgba(233, 30, 99, 0.4)';
            });
        });

        connectionVisualization.addEventListener('mouseleave', function() {
            connectionNodes.forEach(node => {
                node.style.animationDuration = '8s';
                node.style.transform = '';
                node.style.boxShadow = '';
            });
        });
    }
}

// Involvement option cards advanced interactions
function initInvolvementCardAdvancedInteractions() {
    const involvementCards = document.querySelectorAll('.vvoa-involvement-option-card');

    involvementCards.forEach((card, cardIndex) => {
        const iconConstellation = card.querySelector('.vvoa-involvement-icon-constellation');
        const cardTitle = card.querySelector('.vvoa-involvement-option-title');
        const ctaButton = card.querySelector('.vvoa-involvement-cta-button');

        card.addEventListener('mouseenter', function() {
            // Create constellation energy burst
            for (let i = 0; i < 12; i++) {
                setTimeout(() => {
                    const energyBurst = document.createElement('div');
                    energyBurst.style.position = 'absolute';
                    energyBurst.style.width = '8px';
                    energyBurst.style.height = '8px';
                    energyBurst.style.background = `var(--card-primary-color)`;
                    energyBurst.style.borderRadius = '50%';
                    energyBurst.style.left = '50%';
                    energyBurst.style.top = '50%';
                    energyBurst.style.transform = 'translate(-50%, -50%)';
                    energyBurst.style.animation = `vvoa-constellation-energy-burst 2s ease-out forwards`;
                    energyBurst.style.pointerEvents = 'none';
                    energyBurst.style.zIndex = '10';

                    const angle = (i * 30) * (Math.PI / 180);
                    energyBurst.style.setProperty('--burst-angle', angle + 'rad');

                    iconConstellation.appendChild(energyBurst);

                    setTimeout(() => {
                        energyBurst.remove();
                    }, 2000);
                }, i * 50);
            }

            // Title enhancement effect
            cardTitle.style.transform = 'scale(1.05)';
            cardTitle.style.textShadow = '0 0 20px rgba(var(--card-primary-color-rgb), 0.6)';

            // CTA button anticipation effect
            ctaButton.style.transform = 'translateY(-2px) scale(1.02)';
            ctaButton.style.boxShadow = '0 15px 45px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            cardTitle.style.transform = '';
            cardTitle.style.textShadow = '';
            ctaButton.style.transform = '';
            ctaButton.style.boxShadow = '';
        });

        // Card click selection effect
        card.addEventListener('click', function() {
            // Create card selection wave
            const selectionWave = document.createElement('div');
            selectionWave.style.position = 'absolute';
            selectionWave.style.inset = '-20px';
            selectionWave.style.background = `conic-gradient(from 0deg, 
                transparent, 
                var(--card-primary-color), 
                transparent, 
                var(--card-secondary-color), 
                transparent)`;
            selectionWave.style.borderRadius = '50px';
            selectionWave.style.transform = 'scale(0)';
            selectionWave.style.animation = 'vvoa-card-selection-wave 2s ease-out';
            selectionWave.style.pointerEvents = 'none';
            selectionWave.style.zIndex = '1';
            selectionWave.style.opacity = '0.3';

            this.appendChild(selectionWave);

            setTimeout(() => {
                selectionWave.remove();
            }, 2000);

            // Card transformation sequence
            this.style.transform = 'scale(0.97)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05) rotate(1deg)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 400);
            }, 200);
        });
    });
}

// CTA buttons cosmic ripple effects
function initCTAButtonCosmicEffects() {
    const ctaButtons = document.querySelectorAll('.vvoa-involvement-cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Multi-dimensional cosmic ripple
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const cosmicRipple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height) * (2.5 + i * 0.7);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    cosmicRipple.style.width = cosmicRipple.style.height = size + 'px';
                    cosmicRipple.style.left = x + 'px';
                    cosmicRipple.style.top = y + 'px';
                    cosmicRipple.style.position = 'absolute';
                    cosmicRipple.style.borderRadius = '50%';
                    cosmicRipple.style.background = `conic-gradient(from ${i * 60}deg, 
                        rgba(255, 255, 255, ${0.5 - i * 0.07}), 
                        transparent, 
                        rgba(255, 255, 255, ${0.3 - i * 0.04}))`;
                    cosmicRipple.style.transform = 'scale(0) rotate(0deg)';
                    cosmicRipple.style.animation = `vvoa-cosmic-ripple-effect ${2 + i * 0.5}s ease-out`;
                    cosmicRipple.style.pointerEvents = 'none';

                    this.appendChild(cosmicRipple);

                    setTimeout(() => {
                        cosmicRipple.remove();
                    }, (2000 + i * 500));
                }, i * 150);
            }

            // Button cosmic transformation
            this.style.background = `conic-gradient(from 0deg, 
                var(--card-primary-color), 
                var(--card-secondary-color), 
                var(--card-primary-color))`;
            this.style.transform = 'scale(0.94)';

            setTimeout(() => {
                this.style.background = '';
                this.style.transform = 'scale(1.08)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 350);
            }, 200);
        });
    });
}

// Impact particles spiral interaction
function initImpactParticlesSpiralEffects() {
    const impactParticles = document.querySelectorAll('.vvoa-impact-particle');
    const involvedSection = document.querySelector('.vvoa-get-involved-section-main-container');

    involvedSection.addEventListener('mousemove', function(e) {
        const sectionRect = this.getBoundingClientRect();
        const mouseX = e.clientX - sectionRect.left;
        const mouseY = e.clientY - sectionRect.top;
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;

        const spiralForceX = (mouseX - centerX) / centerX * 50;
        const spiralForceY = (mouseY - centerY) / centerY * 35;

        impactParticles.forEach((particle, index) => {
            const offsetX = spiralForceX * (0.2 + index * 0.1);
            const offsetY = spiralForceY * (0.15 + index * 0.05);
            const rotation = (spiralForceX + spiralForceY) * (index + 1);

            particle.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotation}deg)`;
            particle.style.transition = 'transform 0.6s ease-out';
        });
    });

    involvedSection.addEventListener('mouseleave', function() {
        impactParticles.forEach(particle => {
            particle.style.transform = '';
            particle.style.transition = 'transform 2s ease-out';
        });
    });
}

// Impact metrics interactive enhancement
function initImpactMetricsInteractiveEffects() {
    const impactMetrics = document.querySelectorAll('.vvoa-impact-metric-display');

    impactMetrics.forEach((metric, index) => {
        const metricNumber = metric.querySelector('.vvoa-impact-metric-number');
        const metricLabel = metric.querySelector('.vvoa-impact-metric-label');

        metric.addEventListener('mouseenter', function() {
            // Create metric celebration sparkles
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
                    sparkle.style.position = 'absolute';
                    sparkle.style.fontSize = '16px';
                    sparkle.style.left = Math.random() * 100 + '%';
                    sparkle.style.top = Math.random() * 100 + '%';
                    sparkle.style.animation = 'vvoa-metric-sparkle-celebration 2.5s ease-out forwards';
                    sparkle.style.pointerEvents = 'none';
                    sparkle.style.zIndex = '5';

                    this.appendChild(sparkle);

                    setTimeout(() => {
                        sparkle.remove();
                    }, 2500);
                }, i * 100);
            }

            // Metric enhancement effects
            metricNumber.style.transform = 'scale(1.2)';
            metricNumber.style.color = '#E91E63';
            metricNumber.style.textShadow = '0 0 20px rgba(233, 30, 99, 0.6)';

            metricLabel.style.transform = 'scale(1.1)';
            metricLabel.style.color = '#4CAF50';
        });

        metric.addEventListener('mouseleave', function() {
            metricNumber.style.transform = '';
            metricNumber.style.color = '';
            metricNumber.style.textShadow = '';

            metricLabel.style.transform = '';
            metricLabel.style.color = '';
        });

        // Metric click counter animation
        metric.addEventListener('click', function() {
            const originalText = metricNumber.textContent;
            const numberMatch = originalText.match(/\d+/);

            if (numberMatch) {
                const baseNumber = parseInt(numberMatch[0]);
                const increment = Math.floor(baseNumber * 0.1);
                let currentNumber = baseNumber;
                const targetNumber = baseNumber + increment;

                const countAnimation = setInterval(() => {
                    currentNumber += Math.ceil((targetNumber - currentNumber) / 5);
                    metricNumber.textContent = originalText.replace(/\d+/, currentNumber + '+');

                    if (currentNumber >= targetNumber) {
                        clearInterval(countAnimation);
                        setTimeout(() => {
                            metricNumber.textContent = originalText;
                        }, 1500);
                    }
                }, 50);
            }

            // Metric selection glow
            this.style.boxShadow = '0 0 30px rgba(233, 30, 99, 0.5)';
            this.style.borderColor = 'rgba(233, 30, 99, 0.6)';

            setTimeout(() => {
                this.style.boxShadow = '';
                this.style.borderColor = '';
            }, 2000);
        });
    });
}

// Advanced involvement section parallax
function initInvolvementSectionParallax() {
    window.addEventListener('scroll', function() {
        const involvedSection = document.querySelector('.vvoa-get-involved-section-main-container');
        const sectionTop = involvedSection.offsetTop;
        const sectionHeight = involvedSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;

        const sectionProgress = Math.max(0, Math.min(1, 
            (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight)
        ));

        if (sectionProgress > 0 && sectionProgress < 1) {
            // Ecosystem breathing acceleration
            const ecosystemContainer = document.querySelector('.vvoa-get-involved-section-main-container');
            const accelerationFactor = 1 + sectionProgress * 0.5;
            ecosystemContainer.style.animationDuration = `${35 / accelerationFactor}s`;

            // Network overlay depth movement
            const networkOverlay = document.querySelector('.vvoa-community-growth-network-overlay');
            networkOverlay.style.transform = `translateY(${(scrolled - sectionTop) * 0.1}px)`;

            // Connection nodes parallax
            const connectionNodes = document.querySelectorAll('.vvoa-connection-node');
            connectionNodes.forEach((node, index) => {
                const speed = 0.05 + (index * 0.01);
                node.style.transform = `translateY(${(scrolled - sectionTop) * speed}px)`;
            });

            // Impact particles flow acceleration
            const impactParticles = document.querySelectorAll('.vvoa-impact-particle');
            impactParticles.forEach((particle, index) => {
                const baseDelay = parseFloat(particle.style.animationDelay) || 0;
                const acceleratedDelay = baseDelay - (sectionProgress * 3);
                particle.style.animationDelay = `${Math.max(0, acceleratedDelay)}s`;
            });
        }
    });
}

// Keyboard navigation for involvement section
function initInvolvementKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('.vvoa-involvement-cta-button, .vvoa-involvement-option-card, .vvoa-impact-metric-display');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '4px solid rgba(233, 30, 99, 0.6)';
            this.style.outlineOffset = '6px';
            this.style.transform = 'scale(1.05)';
            this.style.filter = 'drop-shadow(0 0 25px rgba(233, 30, 99, 0.4))';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
            this.style.transform = '';
            this.style.filter = '';
        });
    });
}

// Performance optimizations for involvement section
function initInvolvementPerformanceOptimizations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            .vvoa-get-involved-section-main-container * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '100px 0px'
    };

    const performanceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const animations = entry.target.querySelectorAll(
                '.vvoa-impact-particle, .vvoa-connection-node, .vvoa-involvement-icon-constellation'
            );

            if (entry.isIntersecting) {
                animations.forEach(element => {
                    element.style.animationPlayState = 'running';
                });
            } else {
                animations.forEach(element => {
                    element.style.animationPlayState = 'paused';
                });
            }
        });
    }, observerOptions);

    const involvedSection = document.querySelector('.vvoa-get-involved-section-main-container');
    performanceObserver.observe(involvedSection);
}

// Initialize all involvement section functionality
document.addEventListener('DOMContentLoaded', function() {
    initCosmicInvolvementSystem();
    initCommunityConnectionNetworkEffects();
    initInvolvementCardAdvancedInteractions();
    initCTAButtonCosmicEffects();
    initImpactParticlesSpiralEffects();
    initImpactMetricsInteractiveEffects();
    initInvolvementSectionParallax();
    initInvolvementKeyboardNavigation();
    initInvolvementPerformanceOptimizations();

    // Add CSS variables for card colors
    const style = document.createElement('style');
    style.textContent = `
        .vvoa-membership-card {
            --card-primary-color-rgb: 76, 175, 80;
        }

        .vvoa-donate-card {
            --card-primary-color-rgb: 255, 152, 0;
        }

        .vvoa-volunteer-card {
            --card-primary-color-rgb: 33, 150, 243;
        }
    `;
    document.head.appendChild(style);

    // Add additional CSS animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes vvoa-constellation-energy-burst {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translateX(calc(cos(var(--burst-angle)) * 100px)) translateY(calc(sin(var(--burst-angle)) * 100px)) scale(0);
                opacity: 0;
            }
        }

        @keyframes vvoa-card-selection-wave {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.4;
            }
            100% {
                transform: scale(2) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes vvoa-cosmic-ripple-effect {
            to {
                transform: scale(4) rotate(720deg);
                opacity: 0;
            }
        }

        @keyframes vvoa-metric-sparkle-celebration {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(additionalStyles);
});


// Advanced sponsor logo orbital effects
function initSponsorLogoOrbitalEffects() {
    const sponsorContainers = document.querySelectorAll('.vvoa-sponsor-logo-orbital-container');

    sponsorContainers.forEach((container, index) => {
        const logoDisplay = container.querySelector('.vvoa-sponsor-brand-logo-display');
        const businessName = container.querySelector('.vvoa-sponsor-business-name');

        container.addEventListener('mouseenter', function() {
            

            // Business name enhancement
            businessName.style.transform = 'scale(1.1)';
            businessName.style.color = '#E91E63';
            businessName.style.textShadow = '0 0 15px rgba(233, 30, 99, 0.6)';
        });

        container.addEventListener('mouseleave', function() {
            businessName.style.transform = '';
            businessName.style.color = '';
            businessName.style.textShadow = '';
        });

        // Sponsor selection effect
        container.addEventListener('click', function() {
            // Create partnership connection wave
            const connectionWave = document.createElement('div');
            connectionWave.style.position = 'absolute';
            connectionWave.style.inset = '-15px';
            connectionWave.style.background = 'conic-gradient(from 0deg, rgba(233, 30, 99, 0.3), rgba(76, 175, 80, 0.3), rgba(25, 118, 210, 0.3), rgba(233, 30, 99, 0.3))';
            connectionWave.style.borderRadius = '35px';
            connectionWave.style.transform = 'scale(0)';
            connectionWave.style.animation = 'vvoa-partnership-connection-wave 2s ease-out';
            connectionWave.style.pointerEvents = 'none';
            connectionWave.style.zIndex = '1';
            connectionWave.style.opacity = '0.5';

            this.appendChild(connectionWave);

            setTimeout(() => {
                connectionWave.remove();
            }, 2000);

            // Container transformation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.08)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 400);
            }, 200);
        });
    });
}

// Partnership connection energy beam effects
function initPartnershipConnectionEffects() {
    const connectionLines = document.querySelector('.vvoa-partnership-connection-lines');
    const energyBeams = document.querySelectorAll('.vvoa-connection-energy-beam');

    if (connectionLines) {
        connectionLines.addEventListener('mouseenter', function() {
            energyBeams.forEach((beam, index) => {
                beam.style.animationDuration = '2s';
                beam.style.height = '5px';
                beam.style.filter = 'drop-shadow(0 0 10px currentColor)';
            });
        });

        connectionLines.addEventListener('mouseleave', function() {
            energyBeams.forEach(beam => {
                beam.style.animationDuration = '4s';
                beam.style.height = '3px';
                beam.style.filter = '';
            });
        });
    }
}

// Floating gratitude elements interaction
function initGratitudeElementsEffects() {
    const gratitudeParticles = document.querySelectorAll('.vvoa-gratitude-particle');
    const sponsorsSection = document.querySelector('.vvoa-sponsors-section-main-container');

    sponsorsSection.addEventListener('mousemove', function(e) {
        const sectionRect = this.getBoundingClientRect();
        const mouseX = e.clientX - sectionRect.left;
        const mouseY = e.clientY - sectionRect.top;
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;

        const gratitudeForceX = (mouseX - centerX) / centerX * 30;
        const gratitudeForceY = (mouseY - centerY) / centerY * 20;

        gratitudeParticles.forEach((particle, index) => {
            const offsetX = gratitudeForceX * (0.3 + index * 0.1);
            const offsetY = gratitudeForceY * (0.2 + index * 0.05);

            particle.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
            particle.style.transition = 'transform 0.5s ease-out';
        });
    });

    sponsorsSection.addEventListener('mouseleave', function() {
        gratitudeParticles.forEach(particle => {
            particle.style.transform = '';
            particle.style.transition = 'transform 1.5s ease-out';
        });
    });
}

// Footer logo constellation effects
function initFooterLogoConstellationEffects() {
    const logoConstellation = document.querySelector('.vvoa-footer-logo-constellation-container');
    const plantNetwork = document.querySelector('.vvoa-footer-alberta-plant-network');

    logoConstellation.addEventListener('mouseenter', function() {
        // Create Alberta growth energy
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const growthEnergy = document.createElement('div');
                growthEnergy.style.position = 'absolute';
                growthEnergy.style.width = '8px';
                growthEnergy.style.height = '8px';
                growthEnergy.style.background = 'rgba(255, 255, 255, 0.8)';
                growthEnergy.style.borderRadius = '50%';
                growthEnergy.style.left = '50%';
                growthEnergy.style.top = '50%';
                growthEnergy.style.transform = 'translate(-50%, -50%)';
                growthEnergy.style.animation = `vvoa-alberta-growth-energy 2s ease-out forwards`;
                growthEnergy.style.pointerEvents = 'none';
                growthEnergy.style.zIndex = '5';

                const angle = (i * 45) * (Math.PI / 180);
                growthEnergy.style.setProperty('--growth-angle', angle + 'rad');

                this.appendChild(growthEnergy);

                setTimeout(() => {
                    growthEnergy.remove();
                }, 2000);
            }, i * 100);
        }

        // Plant network enhancement
        plantNetwork.style.animationDuration = '2s';
        plantNetwork.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))';
    });

    logoConstellation.addEventListener('mouseleave', function() {
        plantNetwork.style.animationDuration = '';
        plantNetwork.style.filter = '';
    });
}



// Footer social orbital effects
function initFooterSocialOrbitalEffects() {
    const socialLinks = document.querySelectorAll('.vvoa-footer-social-orbital-link');

    socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            // Create social connection sparkles
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.textContent = '✨';
                    sparkle.style.position = 'absolute';
                    sparkle.style.fontSize = '12px';
                    sparkle.style.left = Math.random() * 100 + '%';
                    sparkle.style.top = Math.random() * 100 + '%';
                    sparkle.style.animation = 'vvoa-social-sparkle 2s ease-out forwards';
                    sparkle.style.pointerEvents = 'none';
                    sparkle.style.zIndex = '5';

                    this.appendChild(sparkle);

                    setTimeout(() => {
                        sparkle.remove();
                    }, 2000);
                }, i * 150);
            }
        });

        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Social platform connection effect
            const connectionPulse = document.createElement('div');
            connectionPulse.style.position = 'absolute';
            connectionPulse.style.inset = '-10px';
            connectionPulse.style.background = 'rgba(255, 255, 255, 0.3)';
            connectionPulse.style.borderRadius = '50%';
            connectionPulse.style.transform = 'scale(0)';
            connectionPulse.style.animation = 'vvoa-social-connection-pulse 1.5s ease-out';
            connectionPulse.style.pointerEvents = 'none';
            connectionPulse.style.zIndex = '1';

            this.appendChild(connectionPulse);

            setTimeout(() => {
                connectionPulse.remove();
            }, 1500);
        });
    });
}

// Footer navigation link effects
function initFooterNavigationEffects() {
    const navColumns = document.querySelectorAll('.vvoa-footer-nav-column');
    const navLinks = document.querySelectorAll('.vvoa-footer-nav-link');

    navColumns.forEach(column => {
        const columnTitle = column.querySelector('.vvoa-footer-nav-column-title');
        const columnLinks = column.querySelectorAll('.vvoa-footer-nav-link');

        column.addEventListener('mouseenter', function() {
            columnLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateX(5px)';
                    link.style.color = 'rgba(255, 255, 255, 0.9)';
                }, index * 100);
            });
        });

        column.addEventListener('mouseleave', function() {
            columnLinks.forEach(link => {
                link.style.transform = '';
                link.style.color = '';
            });
        });
    });
}

// Advanced footer parallax system
function initFooterParallaxSystem() {
    window.addEventListener('scroll', function() {
        const footerSection = document.querySelector('.vvoa-footer-section-main-container');
        const landscapeSilhouette = document.querySelector('.vvoa-footer-alberta-landscape-silhouette');
        const footerTop = footerSection.offsetTop;
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;

        const footerProgress = Math.max(0, Math.min(1, 
            (scrolled + windowHeight - footerTop) / windowHeight
        ));

        if (footerProgress > 0) {
            // Landscape silhouette parallax
            landscapeSilhouette.style.transform = `translateY(${(scrolled - footerTop) * 0.3}px)`;

            // Footer growth energy acceleration
            const accelerationFactor = 1 + footerProgress * 0.5;
            footerSection.style.animationDuration = `${20 / accelerationFactor}s`;
        }
    });
}

// Keyboard navigation for footer
function initFooterKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
        '.vvoa-footer-nav-link, .vvoa-footer-social-orbital-link'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(255, 255, 255, 0.6)';
            this.style.outlineOffset = '3px';
            this.style.transform = 'scale(1.05)';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
            this.style.transform = '';
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };

    const performanceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const animations = entry.target.querySelectorAll('[class*="animation"], [class*="orbital"], [class*="gratitude"]');

            if (entry.isIntersecting) {
                animations.forEach(element => {
                    element.style.animationPlayState = 'running';
                });
            } else {
                animations.forEach(element => {
                    element.style.animationPlayState = 'paused';
                });
            }
        });
    }, observerOptions);

    const sponsorsSection = document.querySelector('.vvoa-sponsors-section-main-container');

    performanceObserver.observe(sponsorsSection);
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initSponsorLogoOrbitalEffects();
    initPartnershipConnectionEffects();
    initGratitudeElementsEffects();
    initFooterLogoConstellationEffects();
    initFooterSocialOrbitalEffects();
    initFooterNavigationEffects();
    initFooterParallaxSystem();
    initFooterKeyboardNavigation();
    initPerformanceOptimizations();
    updateUpcomingEvents();

    // Add additional CSS animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes vvoa-sponsor-appreciation-burst {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translateX(calc(cos(var(--burst-angle)) * 120px)) translateY(calc(sin(var(--burst-angle)) * 120px)) scale(0);
                opacity: 0;
            }
        }

        @keyframes vvoa-partnership-connection-wave {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.4;
            }
            100% {
                transform: scale(2) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes vvoa-alberta-growth-energy {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translateX(calc(cos(var(--growth-angle)) * 100px)) translateY(calc(sin(var(--growth-angle)) * 100px)) scale(0);
                opacity: 0;
            }
        }

        @keyframes vvoa-search-focus-ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes vvoa-search-cosmic-burst {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translateX(calc(cos(var(--search-angle)) * 60px)) translateY(calc(sin(var(--search-angle)) * 60px)) scale(0);
                opacity: 0;
            }
        }

        @keyframes vvoa-social-sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes vvoa-social-connection-pulse {
            0% {
                transform: scale(0);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.5);
                opacity: 0.4;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(additionalStyles);
});





// Automatic upcoming event detection
function updateUpcomingEvents() {
    const events = [
        { month: 'JAN', day: 26, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'FEB', day: 23, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'MAR', day: 30, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'APR', day: 27, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'MAY', day: 25, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'JUN', day: 29, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'JUL', day: 27, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'AUG', day: 31, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'SEP', day: 28, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'OCT', day: 26, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'NOV', day: 30, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' },
        { month: 'DEC', day: 21, title: 'VVoA Monthly Potluck', time: '5:30 pm - 7:00 pm' }
    ];

    const monthMap = { 'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5, 'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11 };
    const now = new Date();
    const currentYear = now.getFullYear();

    // Convert events to date objects
    const eventDates = events.map(event => {
        const eventDate = new Date(currentYear, monthMap[event.month], event.day);
        if (eventDate < now) {
            eventDate.setFullYear(currentYear + 1);
        }
        return { ...event, date: eventDate };
    });

    // Sort by date and get next 2 events
    eventDates.sort((a, b) => a.date - b.date);
    const upcomingEvents = eventDates.slice(0, 2);

    // Update the DOM
    const eventContainers = document.querySelectorAll('.vvoa-event-item-container');
    upcomingEvents.forEach((event, index) => {
        if (eventContainers[index]) {
            const monthElement = eventContainers[index].querySelector('.vvoa-event-month-abbreviation');
            const dayElement = eventContainers[index].querySelector('.vvoa-event-day-number');
            const titleElement = eventContainers[index].querySelector('.vvoa-event-title-text');
            const timeElement = eventContainers[index].querySelector('.vvoa-event-time-details');

            if (monthElement) monthElement.textContent = event.month;
            if (dayElement) dayElement.textContent = event.day;
            if (titleElement) titleElement.textContent = event.title;
            if (timeElement) timeElement.textContent = event.time;
        }
    });
}