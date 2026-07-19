
let adminPassword = '';
let allEvents = [];
let allCities = [];

// ============================================
// AUTHENTICATION
// ============================================

document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('adminPassword').value;
    const loginError = document.getElementById('loginError');

    // Test the password by making an authenticated request
    try {
        const response = await fetch('/api/admin/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-password': password
            }
        });

        const data = await response.json();

        // Check if it's a rate limit error
        if (response.status === 429) {
            loginError.textContent = data.message || 'Too many login attempts. Please try again in 15 minutes.';
            loginError.classList.add('show');
            setTimeout(() => {
                loginError.classList.remove('show');
            }, 5000); // Show for 5 seconds for rate limit
            return;
        }

        // Check if authenticated successfully
        if (response.ok && data.success) {
            adminPassword = password;
            document.getElementById('adminLoginOverlay').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            loadInitialData();
        } else {
            // Authentication failed
            loginError.textContent = data.message || 'Invalid password. Please try again.';
            loginError.classList.add('show');
            setTimeout(() => {
                loginError.classList.remove('show');
            }, 3000);
        }
    } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = 'Connection error. Please try again.';
        loginError.classList.add('show');
        setTimeout(() => {
            loginError.classList.remove('show');
        }, 3000);
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    adminPassword = '';
    document.getElementById('adminLoginOverlay').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminPassword').value = '';
});

// ============================================
// TAB NAVIGATION
// ============================================

document.querySelectorAll('.vvoa-admin-nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;

        // Update active tab
        document.querySelectorAll('.vvoa-admin-nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding content
        document.querySelectorAll('.vvoa-admin-tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const targetTab = document.getElementById(tabName + 'Tab');

        if (targetTab) {
            targetTab.classList.add('active');
        } else {
            console.error('Tab not found:', tabName + 'Tab');
        }

        // Load data for specific tabs
        if (tabName === 'events') {
            loadEvents();
        } else if (tabName === 'cities') {
            loadCities();
        } else if (tabName === 'gallery') {
            loadGalleryContent();
        } else if (tabName === 'vsm') {
            loadVsmContent();
        }
    });
});
// ============================================
// LOAD INITIAL DATA
// ============================================

async function loadInitialData() {
    await Promise.all([loadEvents(), loadCities()]);
    populateMonthFilter();
    updateStats();
}

async function loadEvents(filters = {}) {
    try {
        let url = '/api/events?';
        const params = new URLSearchParams();

        if (filters.city && filters.city !== 'all') {
            params.append('city', filters.city);
        }
        if (filters.type && filters.type !== 'all') {
            params.append('type', filters.type);
        }
        if (filters.month && filters.month !== 'all') {
            const [year, month] = filters.month.split('-');
            params.append('year', year);
            params.append('month', month);
        }

        url += params.toString();

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            allEvents = data.events;
            displayEvents(allEvents);
            updateStats();
        }
    } catch (error) {
        console.error('Error loading events:', error);
        showToast('Error loading events', 'error');
    }
}

function displayEvents(events) {
    const tbody = document.getElementById('eventsTableBody');

    if (events.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="vvoa-admin-empty-state">
                        <i class="fas fa-calendar-times"></i>
                        <h3>No Events Found</h3>
                        <p>Try adjusting your filters or add a new event</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = events.map(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });

        return `
            <tr>
                <td>${formattedDate}</td>
                <td><strong>${event.title}</strong></td>
                <td>${event.city}</td>
                <td>
                    <span class="vvoa-admin-event-type-badge ${event.eventType}">
                        ${event.eventType}
                    </span>
                </td>
                <td>${event.organizer}</td>
                <td>
                    <div class="vvoa-admin-event-actions">
                        <button class="vvoa-admin-action-button edit" onclick="editEvent('${event._id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="vvoa-admin-action-button delete" onclick="deleteEvent('${event._id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function loadCities() {
    try {
        const response = await fetch('/api/events/cities/list');
        const data = await response.json();

        if (data.success) {
            allCities = data.cities;
            displayCities();
            populateCityFilter();
            updateStats();
        }
    } catch (error) {
        console.error('Error loading cities:', error);
        showToast('Error loading cities', 'error');
    }
}

function displayCities() {
    const citiesGrid = document.getElementById('citiesGrid');

    if (allCities.length === 0) {
        citiesGrid.innerHTML = `
            <div class="vvoa-admin-empty-state">
                <i class="fas fa-city"></i>
                <h3>No Cities Yet</h3>
                <p>Add events to see cities</p>
            </div>
        `;
        return;
    }

    // Count events per city
    const cityCounts = {};
    allEvents.forEach(event => {
        cityCounts[event.city] = (cityCounts[event.city] || 0) + 1;
    });

    citiesGrid.innerHTML = allCities.map(city => `
        <div class="vvoa-admin-city-card" onclick="filterByCity('${city}')">
            <h3>
                <i class="fas fa-map-marker-alt"></i>
                ${city}
            </h3>
            <div class="vvoa-admin-city-event-count">${cityCounts[city] || 0}</div>
            <div class="vvoa-admin-city-label">events</div>
        </div>
    `).join('');
}

function populateCityFilter() {
    const filterCity = document.getElementById('filterCity');
    filterCity.innerHTML = '<option value="all">All Cities</option>' +
        allCities.map(city => `<option value="${city}">${city}</option>`).join('');
}

function populateMonthFilter() {
    const filterMonth = document.getElementById('filterMonth');
    const currentDate = new Date();
    const months = [];

    // Generate next 12 months
    for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        const monthValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        months.push({ value: monthValue, label: monthLabel });
    }

    filterMonth.innerHTML = '<option value="all">All Months</option>' +
        months.map(m => `<option value="${m.value}">${m.label}</option>`).join('');
}

function filterByCity(city) {
    document.querySelector('[data-tab="events"]').click();
    document.getElementById('filterCity').value = city;
    applyFilters();
}

function updateStats() {
    document.getElementById('totalEvents').textContent = allEvents.length;
    document.getElementById('totalCities').textContent = allCities.length;
}

// ============================================
// FILTERS
// ============================================

document.getElementById('applyFilters').addEventListener('click', applyFilters);

document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('filterCity').value = 'all';
    document.getElementById('filterType').value = 'all';
    document.getElementById('filterMonth').value = 'all';
    loadEvents();
});

function applyFilters() {
    const filters = {
        city: document.getElementById('filterCity').value,
        type: document.getElementById('filterType').value,
        month: document.getElementById('filterMonth').value
    };

    loadEvents(filters);
}

// ============================================
// ADD EVENT
// ============================================

document.getElementById('addEventForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventData = {
        title: document.getElementById('eventTitle').value,
        description: document.getElementById('eventDescription').value,
        eventType: document.getElementById('eventType').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        endTime: document.getElementById('eventEndTime').value || undefined,
        city: document.getElementById('eventCity').value,
        venue: document.getElementById('eventVenue').value || undefined,
        organizer: document.getElementById('eventOrganizer').value || 'VVoA',
        cost: document.getElementById('eventCost').value || undefined,
        memberCost: document.getElementById('eventMemberCost').value || undefined
    };

    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-password': adminPassword
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();

        if (data.success) {
            showToast('Event created successfully!');
            document.getElementById('addEventForm').reset();
            loadEvents();
            loadCities();
        } else {
            showToast(data.message || 'Error creating event', 'error');
        }
    } catch (error) {
        console.error('Error creating event:', error);
        showToast('Error creating event', 'error');
    }
});

// ============================================
// EDIT EVENT
// ============================================

async function editEvent(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();

        if (data.success) {
            const event = data.event;

            // Uses the right timezones
            const eventDate = new Date(event.date);
            const localDate = new Date(eventDate.getTime() - (eventDate.getTimezoneOffset() * 60000));
            const dateString = localDate.toISOString().split('T')[0];

            // Populate edit form
            document.getElementById('editEventId').value = event._id;
            document.getElementById('editEventTitle').value = event.title;
            document.getElementById('editEventDescription').value = event.description;
            document.getElementById('editEventType').value = event.eventType;
            document.getElementById('editEventCity').value = event.city;
            document.getElementById('editEventDate').value = dateString;
            document.getElementById('editEventTime').value = event.time;
            document.getElementById('editEventVenue').value = event.venue || '';
            document.getElementById('editEventOrganizer').value = event.organizer || '';
            document.getElementById('editEventCost').value = event.cost || '';
            document.getElementById('editEventMemberCost').value = event.memberCost || '';

            // Show modal
            document.getElementById('editEventModal').classList.add('active');
        }
    } catch (error) {
        console.error('Error loading event:', error);
        showToast('Error loading event', 'error');
    }
}

document.getElementById('closeEditModal').addEventListener('click', () => {
    document.getElementById('editEventModal').classList.remove('active');
});

document.getElementById('cancelEdit').addEventListener('click', () => {
    document.getElementById('editEventModal').classList.remove('active');
});

// Update the editEventForm submit handler
document.getElementById('editEventForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventId = document.getElementById('editEventId').value;
    const updateData = {
        title: document.getElementById('editEventTitle').value,
        description: document.getElementById('editEventDescription').value,
        eventType: document.getElementById('editEventType').value,
        date: document.getElementById('editEventDate').value, // Keep as YYYY-MM-DD string
        time: document.getElementById('editEventTime').value,
        city: document.getElementById('editEventCity').value,
        venue: document.getElementById('editEventVenue').value,
        organizer: document.getElementById('editEventOrganizer').value,
        cost: document.getElementById('editEventCost').value,
        memberCost: document.getElementById('editEventMemberCost').value
    };

    try {
        const response = await fetch(`/api/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-password': adminPassword
            },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();

        if (data.success) {
            showToast('Event updated successfully!');
            document.getElementById('editEventModal').classList.remove('active');
            loadEvents();
            loadCities();
        } else {
            showToast(data.message || 'Error updating event', 'error');
        }
    } catch (error) {
        console.error('Error updating event:', error);
        showToast('Error updating event', 'error');
    }
});

// ============================================
// DELETE EVENT
// ============================================

async function deleteEvent(eventId) {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
        return;
    }

    try {
        const response = await fetch(`/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'x-admin-password': adminPassword
            }
        });

        const data = await response.json();

        if (data.success) {
            showToast('Event deleted successfully!');
            loadEvents();
            loadCities();
        } else {
            showToast(data.message || 'Error deleting event', 'error');
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        showToast('Error deleting event', 'error');
    }
}

// ============================================
// BULK IMPORT
// ============================================

document.getElementById('bulkImportForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const jsonInput = document.getElementById('bulkJsonInput').value;

    try {
        const data = JSON.parse(jsonInput);

        if (!data.events || !Array.isArray(data.events)) {
            showToast('Invalid JSON format. Must have "events" array', 'error');
            return;
        }

        const response = await fetch('/api/events/bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-password': adminPassword
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showToast(`Successfully imported ${result.events.length} events!`);
            document.getElementById('bulkJsonInput').value = '';
            loadEvents();
            loadCities();
        } else {
            showToast(result.message || 'Error importing events', 'error');
        }
    } catch (error) {
        console.error('Error importing events:', error);
        showToast('Invalid JSON format or connection error', 'error');
    }
});

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('adminToast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.remove('error');

    if (type === 'error') {
        toast.classList.add('error');
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modal when clicking outside
document.getElementById('editEventModal').addEventListener('click', (e) => {
    if (e.target.id === 'editEventModal') {
        document.getElementById('editEventModal').classList.remove('active');
    }
});


// ============================================
// GALLERY MANAGEMENT FUNCTIONS
// ============================================

document.getElementById('addGalleryItemForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = document.getElementById('galleryMediaType').value;
    const url = document.getElementById('galleryMediaUrl').value;
    const caption = document.getElementById('galleryMediaCaption').value;

    try {
        const response = await fetch('/api/admin/gallery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-password': adminPassword
            },
            body: JSON.stringify({ type, url, caption })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showToast('Media added successfully!');
            document.getElementById('addGalleryItemForm').reset();
            loadGalleryContent();
        } else {
            showToast(data.message || 'Failed to add media', 'error');
        }
    } catch (error) {
        console.error('Error adding gallery item:', error);
        showToast('Error adding media', 'error');
    }
});

async function loadGalleryContent() {
    try {
        const response = await fetch('/api/gallery');
        const data = await response.json();

        const listContainer = document.getElementById('galleryItemsList');

        if (!data.items || data.items.length === 0) {
            listContainer.innerHTML = `
                <div class="vvoa-admin-empty-media-state">
                    <i class="fas fa-images"></i>
                    <p>No gallery items yet. Add your first photo or video!</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = '';
        data.items.forEach((item, index) => {
            const itemEl = createAdminMediaItem(item, index, 'gallery');
            listContainer.appendChild(itemEl);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

async function deleteGalleryItem(index) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/gallery/${index}`, {
            method: 'DELETE',
            headers: {
                'x-admin-password': adminPassword
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showToast('Item deleted successfully!');
            loadGalleryContent();
        } else {
            showToast(data.message || 'Failed to delete item', 'error');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        showToast('Error deleting item', 'error');
    }
}

// ============================================
// VEGAN SOCIAL MEETUPS MANAGEMENT FUNCTIONS
// ============================================

document.getElementById('updateVsmDescriptionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.getElementById('vsmDescription').value;

    try {
        const response = await fetch('/api/admin/vegan-social-meetups/description', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-password': adminPassword
            },
            body: JSON.stringify({ description })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showToast('Description updated successfully!');
        } else {
            showToast(data.message || 'Failed to update description', 'error');
        }
    } catch (error) {
        console.error('Error updating description:', error);
        showToast('Error updating description', 'error');
    }
});

document.getElementById('addVsmItemForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = document.getElementById('vsmMediaType').value;
    const url = document.getElementById('vsmMediaUrl').value;
    const caption = document.getElementById('vsmMediaCaption').value;

    try {
        const response = await fetch('/api/admin/vegan-social-meetups/media', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-password': adminPassword
            },
            body: JSON.stringify({ type, url, caption })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showToast('Media added successfully!');
            document.getElementById('addVsmItemForm').reset();
            loadVsmContent();
        } else {
            showToast(data.message || 'Failed to add media', 'error');
        }
    } catch (error) {
        console.error('Error adding VSM item:', error);
        showToast('Error adding media', 'error');
    }
});

async function loadVsmContent() {
    try {
        const response = await fetch('/api/vegan-social-meetups');
        const data = await response.json();

        // Load description
        if (data.description) {
            document.getElementById('vsmDescription').value = data.description;
        }

        // Load media items
        const listContainer = document.getElementById('vsmItemsList');

        if (!data.items || data.items.length === 0) {
            listContainer.innerHTML = `
                <div class="vvoa-admin-empty-media-state">
                    <i class="fas fa-images"></i>
                    <p>No media items yet. Add your first photo or video!</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = '';
        data.items.forEach((item, index) => {
            const itemEl = createAdminMediaItem(item, index, 'vsm');
            listContainer.appendChild(itemEl);
        });
    } catch (error) {
        console.error('Error loading VSM content:', error);
    }
}

async function deleteVsmItem(index) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/vegan-social-meetups/media/${index}`, {
            method: 'DELETE',
            headers: {
                'x-admin-password': adminPassword
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showToast('Item deleted successfully!');
            loadVsmContent();
        } else {
            showToast(data.message || 'Failed to delete item', 'error');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        showToast('Error deleting item', 'error');
    }
}

// ============================================
// UTILITY FUNCTIONS FOR MEDIA MANAGEMENT
// ============================================

function createAdminMediaItem(item, index, source) {
    const div = document.createElement('div');
    div.className = 'vvoa-admin-media-item';

    let thumbnailHtml = '';
    if (item.type === 'video') {
        const videoId = extractYouTubeId(item.url);
        if (videoId) {
            thumbnailHtml = `
                <div style="position: relative;">
                    <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" 
                         alt="Video thumbnail" 
                         class="vvoa-admin-media-thumbnail">
                    <div class="vvoa-admin-media-video-indicator">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        } else {
            thumbnailHtml = `
                <div style="position: relative; background: #333; height: 180px; display: flex; align-items: center; justify-content: center;">
                    <div class="vvoa-admin-media-video-indicator">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        }
    } else {
        const imageUrl = convertGoogleDriveUrl(item.url);
        thumbnailHtml = `
            <img src="${imageUrl}" 
                 alt="Photo" 
                 class="vvoa-admin-media-thumbnail"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22180%22><rect fill=%22%23ddd%22 width=%22280%22 height=%22180%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22>Image</text></svg>'">
        `;
    }

    div.innerHTML = `
        ${thumbnailHtml}
        <div class="vvoa-admin-media-info">
            <span class="vvoa-admin-media-type-badge ${item.type}">${item.type === 'video' ? 'Video' : 'Photo'}</span>
            ${item.caption ? `<div class="vvoa-admin-media-caption">${escapeHtml(item.caption)}</div>` : ''}
            <div class="vvoa-admin-media-url">${escapeHtml(item.url)}</div>
            <div class="vvoa-admin-media-actions">
                <button class="vvoa-admin-btn-delete" onclick="${source === 'gallery' ? 'deleteGalleryItem' : 'deleteVsmItem'}(${index})">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    `;

    return div;
}

function extractYouTubeId(url) {
    if (!url) return null;

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /youtube\.com\/embed\/([^&\s]+)/,
        /youtube\.com\/v\/([^&\s]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

function convertGoogleDriveUrl(url) {
    if (!url) return '';

    const driveMatch = url.match(/\/file\/d\/([^\/]+)/);
    if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
    }

    return url;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}