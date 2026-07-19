// Contact form interactions
function initContactFormEffects() {
    const formInputs = document.querySelectorAll('.vvoa-form-input, .vvoa-form-textarea');
    const submitButton = document.querySelector('.vvoa-contact-submit-button');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
        });
    });

    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            submitContactForm(this);
        });
    }
}

async function submitContactForm(submitButton) {
    const form = document.querySelector('.vvoa-contact-form-container');
    const formData = new FormData(form);
    
    // Get form values
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        const result = await response.json();

        if (result.success) {
            // Create success ripple effect
            createSuccessRipple(submitButton);
            
            // Show success message
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        } else {
            showFormMessage(result.message || 'There was an error sending your message. Please try again.', 'error');
        }

    } catch (error) {
        console.error('Contact form submission error:', error);
        showFormMessage('There was an error sending your message. Please try again.', 'error');
    } finally {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

function createSuccessRipple(button) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * (1.5 + i * 0.3);

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = `rgba(76, 175, 80, ${0.4 - i * 0.06})`;
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = `vvoa-success-ripple ${1 + i * 0.2}s ease-out`;
            ripple.style.pointerEvents = 'none';

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, (1000 + i * 200));
        }, i * 100);
    }
}

function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.vvoa-form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `vvoa-form-message vvoa-form-message-${type}`;
    messageDiv.textContent = message;

    // Insert message before the submit button
    const submitContainer = document.querySelector('.vvoa-form-submit-container');
    submitContainer.parentNode.insertBefore(messageDiv, submitContainer);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

initContactFormEffects();