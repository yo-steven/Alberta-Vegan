// VegFest Team Section Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTeamMemberInteractions();
    initializeTeamCollaborationEffects();
    initializeTeamAchievementCelebrations();
});

function initializeTeamMemberInteractions() {
    const teamMembers = document.querySelectorAll('.vegfest-individual-team-member-showcase-container');

    teamMembers.forEach(member => {
        // Add click interaction for team member details
        member.addEventListener('click', function() {
            const memberName = this.querySelector('.vegfest-team-member-name-display').textContent;
            const memberRole = this.querySelector('.vegfest-team-member-role-title-display').textContent;

            // Create a subtle celebration effect
            createTeamMemberCelebrationEffect(this);

            // Optional: Add more interactive features here
            console.log(`Clicked on team member: ${memberName} - ${memberRole}`);
        });

        // Add mouse enter effect
        member.addEventListener('mouseenter', function() {
            // Pause achievement stars animation temporarily for focus
            const achievementStars = document.querySelectorAll('.vegfest-team-achievement-star-particle');
            achievementStars.forEach(star => {
                star.style.animationPlayState = 'paused';
            });
        });

        // Add mouse leave effect
        member.addEventListener('mouseleave', function() {
            // Resume achievement stars animation
            const achievementStars = document.querySelectorAll('.vegfest-team-achievement-star-particle');
            achievementStars.forEach(star => {
                star.style.animationPlayState = 'running';
            });
        });
    });
}

function createTeamMemberCelebrationEffect(memberElement) {
    // Create temporary celebration particles
    for (let i = 0; i < 6; i++) {
        const celebrationParticle = document.createElement('div');
        celebrationParticle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #4CAF50, #E91E63);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = memberElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        celebrationParticle.style.left = centerX + 'px';
        celebrationParticle.style.top = centerY + 'px';

        document.body.appendChild(celebrationParticle);

        // Animate particle
        const angle = (i / 6) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        celebrationParticle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX}px, ${endY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).addEventListener('finish', function() {
            celebrationParticle.remove();
        });
    }
}

function initializeTeamCollaborationEffects() {
    const collaborationLines = document.querySelectorAll('.vegfest-team-collaboration-energy-beam');

    // Add interaction to collaboration lines
    let isCollaborationActive = false;

    function toggleCollaborationIntensity() {
        isCollaborationActive = !isCollaborationActive;

        collaborationLines.forEach((line, index) => {
            if (isCollaborationActive) {
                line.style.animationDuration = '4s';
                line.style.transform = 'scaleY(2)';
            } else {
                line.style.animationDuration = '8s';
                line.style.transform = 'scaleY(1)';
            }
        });
    }

    // Toggle collaboration intensity every 10 seconds
    setInterval(toggleCollaborationIntensity, 10000);
}

function initializeTeamAchievementCelebrations() {
    const achievementStars = document.querySelectorAll('.vegfest-team-achievement-star-particle');

    // Add click interaction to achievement stars
    achievementStars.forEach(star => {
        star.addEventListener('click', function(e) {
            e.stopPropagation();

            // Create burst effect
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                border: 2px solid ${this.style.color};
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.8;
            `;

            this.appendChild(ripple);

            ripple.animate([
                { 
                    width: '20px',
                    height: '20px',
                    opacity: 0.8
                },
                { 
                    width: '100px',
                    height: '100px',
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).addEventListener('finish', function() {
                ripple.remove();
            });

            // Reset star transform after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, 600);
        });
    });

    // Random celebration burst effect
    function createRandomCelebrationBurst() {
        const randomStar = achievementStars[Math.floor(Math.random() * achievementStars.length)];
        if (randomStar) {
            randomStar.click();
        }
    }
}


// VegFest Vendors & Exhibitors Section Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeVendorCategoryInteractions();
    initializeVendorBenefitsShowcase();
    initializeApplicationButtonEffects();
    initializeMarketplaceFloatingElements();
});

function initializeVendorCategoryInteractions() {
    const categoryItems = document.querySelectorAll('.vegfest-vendor-category-highlight-item');

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryTitle = this.querySelector('.vegfest-vendor-category-title').textContent;

            // Create category celebration effect
            createVendorCategoryCelebrationEffect(this);

            // Optional: Add more interactive features for vendor categories
            console.log(`Exploring vendor category: ${categoryTitle}`);
        });

        item.addEventListener('mouseenter', function() {
            // Add subtle glow effect to icon
            const icon = this.querySelector('.vegfest-vendor-category-icon-container');
            icon.style.boxShadow = '0 15px 40px rgba(76, 175, 80, 0.5), 0 0 20px rgba(76, 175, 80, 0.3)';
        });

        item.addEventListener('mouseleave', function() {
            // Reset icon glow
            const icon = this.querySelector('.vegfest-vendor-category-icon-container');
            icon.style.boxShadow = '0 8px 20px rgba(76, 175, 80, 0.3)';
        });
    });
}

function createVendorCategoryCelebrationEffect(categoryElement) {
    // Create floating category particles
    for (let i = 0; i < 8; i++) {
        const categoryParticle = document.createElement('div');
        categoryParticle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #4CAF50, #66BB6A);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = categoryElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        categoryParticle.style.left = centerX + 'px';
        categoryParticle.style.top = centerY + 'px';

        document.body.appendChild(categoryParticle);

        // Animate particle in circular pattern
        const angle = (i / 8) * Math.PI * 2;
        const radius = 40 + Math.random() * 20;
        const endX = Math.cos(angle) * radius;
        const endY = Math.sin(angle) * radius;

        categoryParticle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX}px, ${endY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).addEventListener('finish', function() {
            categoryParticle.remove();
        });
    }
}

function initializeVendorBenefitsShowcase() {
    const benefitItems = document.querySelectorAll('.vegfest-vendor-benefit-highlight-item');

    benefitItems.forEach(item => {
        item.addEventListener('click', function() {
            const benefitText = this.querySelector('.vegfest-vendor-benefit-text').textContent;

            // Create benefit highlight effect
            createVendorBenefitHighlightEffect(this);

            console.log(`Highlighted vendor benefit: ${benefitText}`);
        });

        // Add sequential hover effects
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.vegfest-vendor-benefit-icon-display');
            icon.style.background = 'linear-gradient(135deg, #F06292, #E91E63)';
            icon.style.boxShadow = '0 12px 30px rgba(233, 30, 99, 0.5)';
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.vegfest-vendor-benefit-icon-display');
            icon.style.background = 'linear-gradient(135deg, #E91E63, #F06292)';
            icon.style.boxShadow = '0 6px 15px rgba(233, 30, 99, 0.3)';
        });
    });
}

function createVendorBenefitHighlightEffect(benefitElement) {
    // Create expanding highlight ring
    const highlightRing = document.createElement('div');
    highlightRing.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 3px solid #E91E63;
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
    `;

    benefitElement.style.position = 'relative';
    benefitElement.appendChild(highlightRing);

    highlightRing.animate([
        { 
            width: '20px',
            height: '20px',
            opacity: 1
        },
        { 
            width: '150px',
            height: '150px',
            opacity: 0
        }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).addEventListener('finish', function() {
        highlightRing.remove();
    });
}

function initializeApplicationButtonEffects() {
    const applicationButton = document.querySelector('.vegfest-vendors-application-button');

    if (applicationButton) {
        applicationButton.addEventListener('click', function(e) {
            console.log('Vendor application link clicked');
        });

        // Add pulse effect on hover
        applicationButton.addEventListener('mouseenter', function() {
            this.style.animation = 'vegfest-vendors-application-button-pulse 1.5s ease-in-out infinite';
        });

        applicationButton.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
}



function initializeMarketplaceFloatingElements() {
    const commerceElements = document.querySelectorAll('.vegfest-vendor-commerce-element');

    commerceElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();

            // Create marketplace celebration burst
            createMarketplaceCelebrationBurst(this);
        });
    });
}

function createMarketplaceCelebrationBurst(commerceElement) {
    // Create burst particles around the clicked commerce element
    for (let i = 0; i < 12; i++) {
        const burstParticle = document.createElement('div');
        burstParticle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${commerceElement.style.color || '#FF9800'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = commerceElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        burstParticle.style.left = centerX + 'px';
        burstParticle.style.top = centerY + 'px';

        document.body.appendChild(burstParticle);

        // Animate burst particle
        const angle = (i / 12) * Math.PI * 2;
        const distance = 30 + Math.random() * 25;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        burstParticle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX}px, ${endY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).addEventListener('finish', function() {
            burstParticle.remove();
        });
    }

    // Temporarily scale the commerce element
    commerceElement.style.transform = 'scale(1.3) rotate(360deg)';
    commerceElement.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    setTimeout(() => {
        commerceElement.style.transform = '';
    }, 600);
}

// Add custom CSS animations dynamically
const vendorAnimationStyles = document.createElement('style');
vendorAnimationStyles.textContent = `
    @keyframes vegfest-vendors-application-button-pulse {
        0%, 100% { 
            box-shadow: 0 12px 30px rgba(103, 58, 183, 0.4);
        }
        50% { 
            box-shadow: 0 20px 50px rgba(103, 58, 183, 0.6), 0 0 20px rgba(103, 58, 183, 0.3);
        }
    }
`;
document.head.appendChild(vendorAnimationStyles);

// Vendor Category Showcase Tips (Optional Enhancement)
const vendorCategoryTips = {
    'Food & Drinks': 'Taste amazing plant-based cuisine from local Edmonton restaurants!',
    'Merchandise': 'Discover eco-friendly products that align with your values!',
    'Non-Profits': 'Connect with organizations making a positive impact!'
};

function displayVendorCategoryTip(categoryTitle) {
    const tip = vendorCategoryTips[categoryTitle];
    if (!tip) return;

    const tipElement = document.createElement('div');
    tipElement.textContent = tip;
    tipElement.style.cssText = `
        position: fixed;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(255, 193, 7, 0.95), rgba(255, 152, 0, 0.9));
        color: white;
        padding: 12px 25px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1001;
        pointer-events: none;
        box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
        max-width: 300px;
        text-align: center;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(tipElement);

    // Auto-remove tip after 3 seconds
    setTimeout(() => {
        tipElement.remove();
    }, 3000);
}


// VegFest Guests & Speakers Section Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAnticipationEffects();
    initializeSocialLinksInteractions();
    initializeCountdownElements();
});

function initializeAnticipationEffects() {
    const anticipationIcon = document.querySelector('.vegfest-guests-anticipation-icon-display');

    if (anticipationIcon) {
        anticipationIcon.addEventListener('click', function() {
            createAnticipationBurstEffect(this);
            displayComingSoonMessage();
        });

        // Add breathing effect on hover
        anticipationIcon.addEventListener('mouseenter', function() {
            this.style.animation = 'vegfest-guests-anticipation-icon-breathing-effect 1.5s ease-in-out infinite';
        });

        anticipationIcon.addEventListener('mouseleave', function() {
            this.style.animation = 'vegfest-guests-anticipation-icon-countdown-pulse 2.5s ease-in-out infinite';
        });
    }
}

function createAnticipationBurstEffect(iconElement) {
    // Create excitement burst particles
    for (let i = 0; i < 10; i++) {
        const burstParticle = document.createElement('div');
        burstParticle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #4CAF50, #66BB6A);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = iconElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        burstParticle.style.left = centerX + 'px';
        burstParticle.style.top = centerY + 'px';

        document.body.appendChild(burstParticle);

        // Animate burst particle
        const angle = (i / 10) * Math.PI * 2;
        const distance = 40 + Math.random() * 30;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        burstParticle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX}px, ${endY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).addEventListener('finish', function() {
            burstParticle.remove();
        });
    }
}

function displayComingSoonMessage() {
    const comingSoonMessages = [
        "Exciting speakers are being confirmed! 🎤",
        "Amazing performers coming soon! 🎵",
        "Stay tuned for special announcements! ⭐",
        "Follow our socials for updates! 📱",
        "The lineup will be worth the wait! 🌟"
    ];

    const randomMessage = comingSoonMessages[Math.floor(Math.random() * comingSoonMessages.length)];

    const messageElement = document.createElement('div');
    messageElement.textContent = randomMessage;
    messageElement.style.cssText = `
        position: fixed;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(129, 199, 132, 0.9));
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: 600;
        font-size: 16px;
        z-index: 1001;
        pointer-events: none;
        box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(messageElement);

    // Animate message appearance and disappearance
    messageElement.animate([
        { 
            opacity: 0,
            transform: 'translateX(-50%) translateY(-20px) scale(0.8)'
        },
        { 
            opacity: 1,
            transform: 'translateX(-50%) translateY(0px) scale(1)'
        },
        { 
            opacity: 1,
            transform: 'translateX(-50%) translateY(0px) scale(1)'
        },
        { 
            opacity: 0,
            transform: 'translateX(-50%) translateY(20px) scale(0.8)'
        }
    ], {
        duration: 3500,
        easing: 'ease-in-out'
    }).addEventListener('finish', function() {
        messageElement.remove();
    });
}

function initializeSocialLinksInteractions() {
    const socialLinks = document.querySelectorAll('.vegfest-guests-social-link-button');

    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Remove this when real links are added

            const platform = this.querySelector('span').textContent;
            createSocialFollowFeedback(this, platform);

            console.log(`Social follow clicked: ${platform}`);
        });

        // Add platform-specific hover effects
        link.addEventListener('mouseenter', function() {
            const platform = this.querySelector('span').textContent.toLowerCase();

            if (platform === 'facebook') {
                this.style.transform = 'translateY(-5px) scale(1.05) rotate(2deg)';
            } else if (platform === 'instagram') {
                this.style.transform = 'translateY(-5px) scale(1.05) rotate(-2deg)';
            }
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1) rotate(0deg)';
        });
    });
}

function createSocialFollowFeedback(linkElement, platform) {
    const feedbackMessage = `Opening ${platform}... Stay tuned for guest announcements!`;

    const feedbackElement = document.createElement('div');
    feedbackElement.textContent = feedbackMessage;
    feedbackElement.style.cssText = `
        position: fixed;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #1877F2, #E4405F);
        color: white;
        padding: 12px 25px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1001;
        pointer-events: none;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(feedbackElement);

    // Auto-remove feedback after 2.5 seconds
    setTimeout(() => {
        if (feedbackElement.parentNode) {
            feedbackElement.remove();
        }
    }, 2500);
}

function displayAnticipationDetails() {
    const anticipationDetails = [
        "We're reviewing incredible speaker applications!",
        "Local performers are being shortlisted!",
        "Special guests are being contacted!",
        "The entertainment lineup is being finalized!",
        "Educational sessions are being planned!"
    ];

    const randomDetail = anticipationDetails[Math.floor(Math.random() * anticipationDetails.length)];

    const detailElement = document.createElement('div');
    detailElement.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 8px;">Behind the Scenes:</div>
        <div>${randomDetail}</div>
    `;
    detailElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.98);
        color: #2E7D32;
        padding: 20px 30px;
        border-radius: 20px;
        font-size: 16px;
        z-index: 1001;
        pointer-events: none;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        border: 3px solid rgba(76, 175, 80, 0.3);
        backdrop-filter: blur(15px);
        text-align: center;
        max-width: 350px;
    `;

    document.body.appendChild(detailElement);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (detailElement.parentNode) {
            detailElement.remove();
        }
    }, 4000);
}

function initializeCountdownElements() {
    const anticipationElements = document.querySelectorAll('.vegfest-guest-anticipation-element');

    anticipationElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();

            // Create countdown celebration effect
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                border: 2px solid rgba(76, 175, 80, 0.6);
                border-radius: 50%;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            ripple.animate([
                { 
                    width: '10px',
                    height: '10px',
                    opacity: 0.8
                },
                { 
                    width: '80px',
                    height: '80px',
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).addEventListener('finish', function() {
                ripple.remove();
            });

            // Reset element after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, 800);
        });
    });
}

// Add custom CSS animations dynamically
const guestsAnimationStyles = document.createElement('style');
guestsAnimationStyles.textContent = `
    @keyframes vegfest-guests-anticipation-icon-breathing-effect {
        0%, 100% { 
            transform: scale(1);
        }
        50% { 
            transform: scale(1.05);
        }
    }

    @keyframes vegfest-guests-coming-soon-container-pulse {
        0%, 100% { 
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.1);
        }
        50% { 
            box-shadow: 0 35px 90px rgba(76, 175, 80, 0.15), 0 0 30px rgba(76, 175, 80, 0.1);
        }
    }
`;
document.head.appendChild(guestsAnimationStyles);

// Anticipation countdown timer (optional feature)
function startAnticipationCountdown() {
    // This could be connected to a real event date
    const eventDate = new Date();
    eventDate.setMonth(eventDate.getMonth() + 3); // 3 months from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            // Optional: Display countdown in anticipation icon
            console.log(`Countdown: ${days} days, ${hours} hours until announcements`);
        }
    }

    // Update every hour
    setInterval(updateCountdown, 3600000);
    updateCountdown();
}

// Initialize countdown (optional)
startAnticipationCountdown();





//////////////////////////////////////////////
// Navigations for all sections in vegfest page
//////////////////////////////////////////////

// VegFest Navigation System for Smooth Section Scrolling
document.addEventListener('DOMContentLoaded', function() {
    initializeVegFestNavigation();
    updateNavigationLinks();
    initializeSmoothScrolling();
    initializeActiveNavigation();
});

// Section mapping for navigation
const vegfestSections = {
    'hero': '.vegfest-edmonton-hero-section-main-container',
    'features': '.vegfest-feature-cards-section-main-container', 
    'volunteer': '.vegfest-volunteer-section-main-container',
    'sponsors': '.vegfest-sponsors-section-main-container',
    'team': '.vegfest-team-behind-festival-section-main-container',
    'vendors': '.vegfest-vendors-exhibitors-section-main-container',
    'guests': '.vegfest-guests-speakers-section-main-container',
    'schedule': '.vegfest-schedule-calendar-section-main-container'
};

function initializeVegFestNavigation() {
    // Add section IDs to match navigation
    Object.keys(vegfestSections).forEach(sectionName => {
        const sectionElement = document.querySelector(vegfestSections[sectionName]);
        if (sectionElement) {
            sectionElement.id = `vegfest-${sectionName}-section`;
        }
    });
}

function addSectionNavigationButtons() {
    // Create floating navigation menu for sections
    const floatingNav = document.createElement('div');
    floatingNav.className = 'vegfest-floating-section-navigation';
    floatingNav.innerHTML = `
        <div class="vegfest-floating-nav-toggle">
            <i class="fas fa-bars"></i>
        </div>
        <div class="vegfest-floating-nav-menu">
            <a href="#vegfest-hero-section" class="vegfest-floating-nav-link" title="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="#vegfest-features-section" class="vegfest-floating-nav-link" title="Features">
                <i class="fas fa-star"></i>
                <span>Features</span>
            </a>
            <a href="#vegfest-volunteer-section" class="vegfest-floating-nav-link" title="Volunteer">
                <i class="fas fa-heart"></i>
                <span>Volunteer</span>
            </a>
            <a href="#vegfest-sponsors-section" class="vegfest-floating-nav-link" title="Sponsors">
                <i class="fas fa-handshake"></i>
                <span>Sponsors</span>
            </a>
            <a href="#vegfest-team-section" class="vegfest-floating-nav-link" title="Team">
                <i class="fas fa-users"></i>
                <span>Team</span>
            </a>
            <a href="#vegfest-vendors-section" class="vegfest-floating-nav-link" title="Vendors">
                <i class="fas fa-store"></i>
                <span>Vendors</span>
            </a>
            <a href="#vegfest-guests-section" class="vegfest-floating-nav-link" title="Guests">
                <i class="fas fa-microphone"></i>
                <span>Guests</span>
            </a>
            <a href="#vegfest-schedule-section" class="vegfest-floating-nav-link" title="Schedule">
                <i class="fas fa-calendar"></i>
                <span>Schedule</span>
            </a>
        </div>
    `;

    document.body.appendChild(floatingNav);

}

function createScrollFeedback(targetSelector) {
    const sectionNames = {
        '#vegfest-hero-section': 'VegFest Edmonton',
        '#vegfest-features-section': 'Festival Features',
        '#vegfest-volunteer-section': 'Volunteer With Us',
        '#vegfest-sponsors-section': 'Our Sponsors',
        '#vegfest-team-section': 'Meet Our Team',
        '#vegfest-vendors-section': 'Vendors & Exhibitors',
        '#vegfest-guests-section': 'Guests & Speakers',
        '#vegfest-schedule-section': 'Plan Your Day'
    };

    const sectionName = sectionNames[targetSelector] || 'Section';

    const feedbackElement = document.createElement('div');
    feedbackElement.textContent = `Navigating to ${sectionName}`;
    feedbackElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #66BB6A);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1002;
        pointer-events: none;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
        transform: translateX(300px);
        transition: transform 0.4s ease;
    `;

    document.body.appendChild(feedbackElement);

    // Slide in
    setTimeout(() => {
        feedbackElement.style.transform = 'translateX(0px)';
    }, 100);

    // Slide out and remove
    setTimeout(() => {
        feedbackElement.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (feedbackElement.parentNode) {
                feedbackElement.remove();
            }
        }, 400);
    }, 2000);
}

function initializeActiveNavigation() {

    // Create intersection observer for active section tracking
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavigation(sectionId);
            }
        });
    }, observerOptions);

    // Observe all VegFest sections
    Object.values(vegfestSections).forEach(sectionSelector => {
        const section = document.querySelector(sectionSelector);
        if (section) {
            observer.observe(section);
        }
    });
}

function updateActiveNavigation(activeSectionId) {
    // Update floating navigation active state
    const floatingNavLinks = document.querySelectorAll('.vegfest-floating-nav-link');
    floatingNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSectionId}`) {
            link.classList.add('active');
        }
    });

    // Update main navigation if needed
    const mainNavLinks = document.querySelectorAll('.vvoa-nav-link-primary, .vvoa-mobile-nav-link');
    mainNavLinks.forEach(link => {
        link.classList.remove('active');
    });
}

function closeMobileNavigation() {
    // Close the original mobile navigation
    const mobileToggle = document.querySelector('.vvoa-mobile-nav-toggle');
    const mobileOverlay = document.querySelector('.vvoa-mobile-nav-overlay');
    const mobileMenu = document.querySelector('.vvoa-mobile-nav-menu');

    if (mobileToggle && mobileToggle.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

