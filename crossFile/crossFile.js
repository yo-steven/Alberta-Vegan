// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if mobile navigation elements don't exist
    const existingOverlay = document.querySelector('.vvoa-mobile-nav-overlay');
    const existingMenu = document.querySelector('.vvoa-mobile-nav-menu');

    if (!existingOverlay || !existingMenu) {
        initializeMobileNavigation();
    }

    // Initialize mobile navigation functionality
    setupMobileNavigation();

    // Initialize mobile particles
    initializeMobileParticles();
});

function initializeMobileNavigation() {
    // Create mobile nav overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'vvoa-mobile-nav-overlay';

    // Create mobile nav menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'vvoa-mobile-nav-menu';

    // Get navigation items from desktop menu
    const desktopMenu = document.querySelector('.vvoa-main-navigation-menu');
    const navItems = desktopMenu ? desktopMenu.querySelectorAll('.vvoa-nav-menu-item') : [];

    let mobileMenuHTML = `
        <div class="vvoa-mobile-close-button">
            <i class="fas fa-times"></i>
        </div>
        <div class="vvoa-mobile-nav-particles">
    `;

    // Generate particles
    for (let i = 0; i < 15; i++) {
        mobileMenuHTML += `<div class="vvoa-mobile-particle" style="left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 8}s;"></div>`;
    }

    mobileMenuHTML += '</div><ul>';

    // Convert desktop nav items to mobile format
    navItems.forEach(item => {
        const link = item.querySelector('.vvoa-nav-link-primary');
        const dropdown = item.querySelector('.vvoa-dropdown-menu');

        if (link) {
            const href = link.getAttribute('href');
            const text = link.textContent.replace(/\s*\u25BC\s*/, '').trim(); // Remove any existing arrows

            if (dropdown) {
                // Dropdown item
                mobileMenuHTML += `
                    <li class="vvoa-mobile-nav-item">
                        <div class="vvoa-mobile-nav-dropdown">
                            <div class="vvoa-mobile-nav-link vvoa-mobile-dropdown-toggle">
                                <span>${text}</span>
                                <i class="fas fa-chevron-down vvoa-mobile-dropdown-arrow"></i>
                            </div>
                            <div class="vvoa-mobile-dropdown-content">
                `;

                const dropdownLinks = dropdown.querySelectorAll('.vvoa-dropdown-link');
                dropdownLinks.forEach(dropLink => {
                    mobileMenuHTML += `
                        <a href="${dropLink.getAttribute('href')}" class="vvoa-mobile-dropdown-link">
                            ${dropLink.textContent}
                        </a>
                    `;
                });

                mobileMenuHTML += `
                            </div>
                        </div>
                    </li>
                `;
            } else {
                // Regular item
                mobileMenuHTML += `
                    <li class="vvoa-mobile-nav-item">
                        <a href="${href}" class="vvoa-mobile-nav-link">${text}</a>
                    </li>
                `;
            }
        }
    });

    mobileMenuHTML += '</ul>';
    mobileMenu.innerHTML = mobileMenuHTML;

    // Append elements to DOM
    document.body.appendChild(mobileOverlay);
    document.body.appendChild(mobileMenu);
}

function setupMobileNavigation() {
    const mobileToggle = document.querySelector('.vvoa-mobile-nav-toggle');
    const mobileOverlay = document.querySelector('.vvoa-mobile-nav-overlay');
    const mobileMenu = document.querySelector('.vvoa-mobile-nav-menu');
    const closeButton = document.querySelector('.vvoa-mobile-close-button');

    if (!mobileToggle || !mobileOverlay || !mobileMenu) return;

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = mobileToggle.classList.contains('active');

        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Trigger animation for nav items
        setTimeout(() => {
            const navItems = mobileMenu.querySelectorAll('.vvoa-mobile-nav-item');
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '1';
                }, index * 100);
            });
        }, 100);
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';

        // Reset nav items animation
        const navItems = mobileMenu.querySelectorAll('.vvoa-mobile-nav-item');
        navItems.forEach(item => {
            item.style.transform = 'translateX(50px)';
            item.style.opacity = '0';
        });
    }

    // Event listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    if (closeButton) {
        closeButton.addEventListener('click', closeMobileMenu);
    }

    // Handle dropdown toggles (these will be created dynamically)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.vvoa-mobile-dropdown-toggle')) {
            e.preventDefault();
            const dropdown = e.target.closest('.vvoa-mobile-nav-dropdown');
            dropdown.classList.toggle('open');
        }
    });

    // Close mobile menu when clicking on links
    document.addEventListener('click', function(e) {
        if (e.target.matches('.vvoa-mobile-nav-link:not(.vvoa-mobile-dropdown-toggle), .vvoa-mobile-dropdown-link')) {
            setTimeout(closeMobileMenu, 100);
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function initializeMobileParticles() {
    // Wait for particles container to be created
    setTimeout(() => {
        const particlesContainer = document.querySelector('.vvoa-mobile-nav-particles');
        if (!particlesContainer) return;

        // Additional particles will be added dynamically
        setInterval(() => {
            if (document.querySelector('.vvoa-mobile-nav-menu.active')) {
                const particle = document.createElement('div');
                particle.className = 'vvoa-mobile-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = '0s';
                particle.style.animationDuration = (8 + Math.random() * 4) + 's';

                particlesContainer.appendChild(particle);

                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 12000);
            }
        }, 2000);
    }, 500);
}
