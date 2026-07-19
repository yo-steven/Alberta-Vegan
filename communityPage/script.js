// Community Events Calendar Functionality
// Community Events Calendar Functionality
async function initCommunityEventsCalendar() {
    const calendarContainer = document.querySelector('.vvoa-community-upcoming-events-calendar');

    if (!calendarContainer) {
        console.log('Calendar container not found, skipping calendar initialization');
        return;
    }

    // Fetch events from database
    let databaseEvents = [];
    try {
        const response = await fetch('/api/events');
        const data = await response.json();
        if (data.success) {
            databaseEvents = data.events;
            console.log('Loaded events from database:', databaseEvents.length);
        }
    } catch (error) {
        console.error('Error loading events from database:', error);
    }

    // Create calendar HTML structure
    calendarContainer.innerHTML = `
        <h3 class="vvoa-community-calendar-title">
            <i class="fas fa-calendar-alt"></i>
            Upcoming Community Events
        </h3>

        <div class="vvoa-community-calendar-navigation-header">
            <button class="vvoa-community-calendar-nav-button vvoa-community-calendar-prev-button">
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="vvoa-community-calendar-month-year-display">
                <h4 class="vvoa-community-calendar-current-month-year"></h4>
            </div>

            <button class="vvoa-community-calendar-nav-button vvoa-community-calendar-next-button">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>

        <div class="vvoa-community-calendar-weekdays-header">
            <div class="vvoa-community-calendar-weekday-label">Sun</div>
            <div class="vvoa-community-calendar-weekday-label">Mon</div>
            <div class="vvoa-community-calendar-weekday-label">Tue</div>
            <div class="vvoa-community-calendar-weekday-label">Wed</div>
            <div class="vvoa-community-calendar-weekday-label">Thu</div>
            <div class="vvoa-community-calendar-weekday-label">Fri</div>
            <div class="vvoa-community-calendar-weekday-label">Sat</div>
        </div>

        <div class="vvoa-community-calendar-days-grid-container">
            <!-- Calendar days will be populated by JavaScript -->
        </div>

        <!-- Event Details Modal -->
        <div class="vvoa-community-calendar-event-details-modal" id="communityEventModal">
            <div class="vvoa-community-calendar-modal-content">
                <div class="vvoa-community-calendar-modal-header">
                    <h4 class="vvoa-community-calendar-modal-title"></h4>
                    <button class="vvoa-community-calendar-modal-close-button">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="vvoa-community-calendar-modal-body">
                    <div class="vvoa-community-calendar-modal-date"></div>
                    <div class="vvoa-community-calendar-modal-time"></div>
                    <div class="vvoa-community-calendar-modal-description"></div>
                    <div class="vvoa-community-calendar-modal-location"></div>
                </div>
            </div>
        </div>
    `;

    let currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function generateEventsForMonth(year, month) {
        // Filter database events for this month
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        return databaseEvents
            .filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= monthStart && eventDate <= monthEnd;
            })
            .map(event => {
                const eventDate = new Date(event.date);
                return {
                    date: eventDate.getDate(),
                    title: event.title,
                    time: event.time + (event.endTime ? ' - ' + event.endTime : ''),
                    description: event.description,
                    type: event.eventType,
                    venue: event.venue || '',
                    city: event.city || '',
                    organizer: event.organizer || 'VVoA',
                    cost: event.cost || '',
                    memberCost: event.memberCost || ''
                };
            });
    }

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update month/year display
        document.querySelector('.vvoa-community-calendar-current-month-year').textContent = 
            `${monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        // Get events for this month
        const monthEvents = generateEventsForMonth(year, month);

        // Create calendar grid
        const daysContainer = document.querySelector('.vvoa-community-calendar-days-grid-container');
        daysContainer.innerHTML = '';

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'vvoa-community-calendar-day-cell other-month';
            daysContainer.appendChild(emptyCell);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'vvoa-community-calendar-day-cell';
            dayCell.textContent = day;

            // Check if this day has events
            const dayEvents = monthEvents.filter(event => event.date === day);
            if (dayEvents.length > 0) {
                dayCell.classList.add('has-event');
                dayCell.addEventListener('click', () => showEventModal(dayEvents[0], year, month, day));
            }

            // Highlight today
            const today = new Date();
            if (year === today.getFullYear() && 
                month === today.getMonth() && 
                day === today.getDate()) {
                dayCell.classList.add('today');
            }

            daysContainer.appendChild(dayCell);
        }
    }

    function showEventModal(event, year, month, day) {
        const modal = document.getElementById('communityEventModal');
        const eventDate = new Date(year, month, day);

        document.querySelector('.vvoa-community-calendar-modal-title').textContent = event.title;
        document.querySelector('.vvoa-community-calendar-modal-date').textContent = 
            eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        document.querySelector('.vvoa-community-calendar-modal-time').textContent = event.time;
        document.querySelector('.vvoa-community-calendar-modal-description').textContent = event.description;

        // Add location info
        const modalBody = document.querySelector('.vvoa-community-calendar-modal-body');

        // Remove old additional info if exists
        const oldInfo = modalBody.querySelector('.vvoa-community-calendar-modal-additional-info');
        if (oldInfo) oldInfo.remove();

        // Create additional info section
        const additionalInfo = document.createElement('div');
        additionalInfo.className = 'vvoa-community-calendar-modal-additional-info';
        additionalInfo.style.marginTop = '20px';
        additionalInfo.style.paddingTop = '20px';
        additionalInfo.style.borderTop = '1px solid #e0e0e0';

        let infoHTML = '';

        // Venue and City
        if (event.venue || event.city) {
            infoHTML += `
                <div style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;">
                    <i class="fas fa-map-marker-alt" style="min-width: 20px; text-align: center; color: #4CAF50; margin-top: 3px;"></i>
                    <div>
                        <strong>Location:</strong><br>
                        ${event.venue ? event.venue : ''}${event.venue && event.city ? ', ' : ''}${event.city ? event.city : ''}
                    </div>
                </div>
            `;
        }

        // Organizer
        if (event.organizer) {
            infoHTML += `
                <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-users" style="min-width: 20px; color: #4CAF50;"></i>
                    <div><strong>Organizer:</strong> ${event.organizer}</div>
                </div>
            `;
        }

        // Cost
        if (event.cost || event.memberCost) {
            infoHTML += `
                <div style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px;">
                    <i class="fas fa-ticket-alt" style="min-width: 20px; color: #4CAF50; margin-top: 3px;"></i>
                    <div>
                        <strong>Cost:</strong><br>
                        ${event.cost ? 'General: ' + event.cost : ''}${event.cost && event.memberCost ? '<br>' : ''}
                        ${event.memberCost ? 'Members: ' + event.memberCost : ''}
                    </div>
                </div>
            `;
        }

        additionalInfo.innerHTML = infoHTML;
        modalBody.appendChild(additionalInfo);

        modal.classList.add('active');
    }

    function hideEventModal() {
        document.getElementById('communityEventModal').classList.remove('active');
    }

    // Event listeners
    document.querySelector('.vvoa-community-calendar-prev-button').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.querySelector('.vvoa-community-calendar-next-button').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.querySelector('.vvoa-community-calendar-modal-close-button').addEventListener('click', hideEventModal);

    document.getElementById('communityEventModal').addEventListener('click', (e) => {
        if (e.target.id === 'communityEventModal') {
            hideEventModal();
        }
    });

    // Initial render
    renderCalendar();
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add small delay to ensure all elements are rendered
    setTimeout(initCommunityEventsCalendar, 100);
});