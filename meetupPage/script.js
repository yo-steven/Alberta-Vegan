// Vegan Social Meetups Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadPageContent();
    setupModalHandlers();
});

async function loadPageContent() {
    const descriptionEl = document.getElementById('vsmDescription');
    const photoGrid = document.getElementById('vsmPhotoGrid');
    const loadingEl = document.getElementById('vsmLoading');
    const emptyEl = document.getElementById('vsmEmpty');

    try {
        const response = await fetch('/api/vegan-social-meetups');
        const data = await response.json();

        loadingEl.style.display = 'none';

        // Update description if available
        if (data.description) {
            descriptionEl.textContent = data.description;
        }

        // Load photos
        if (!data.items || data.items.length === 0) {
            emptyEl.style.display = 'block';
            return;
        }

        emptyEl.style.display = 'none';
        photoGrid.innerHTML = '';

        data.items.forEach(item => {
            const itemEl = createPhotoItem(item);
            photoGrid.appendChild(itemEl);
        });
    } catch (error) {
        console.error('Error loading content:', error);
        loadingEl.style.display = 'none';
        emptyEl.style.display = 'block';
        emptyEl.querySelector('p').textContent = 'Error loading content. Please try again later.';
    }
}

function createPhotoItem(item) {
    const div = document.createElement('div');
    div.className = 'vsm-photo-item';
    div.onclick = () => openMediaModal(item);

    let thumbnailHtml = '';
    if (item.type === 'video') {
        const videoId = extractYouTubeId(item.url);
        if (videoId) {
            thumbnailHtml = `
                <div class="vsm-photo-thumbnail-container">
                    <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
                         alt="${item.caption || 'Video thumbnail'}" 
                         class="vsm-photo-thumbnail"
                         onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                    <div class="vsm-video-indicator">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        } else {
            thumbnailHtml = `
                <div class="vsm-photo-thumbnail-container" style="background: #8e24aa; display: flex; align-items: center; justify-content: center;">
                    <div class="vsm-video-indicator">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        }
    } else {
        const imageUrl = convertGoogleDriveUrl(item.url);
        thumbnailHtml = `
            <div class="vsm-photo-thumbnail-container">
                <img src="${imageUrl}" 
                     alt="${item.caption || 'Photo'}" 
                     class="vsm-photo-thumbnail"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22240%22><rect fill=%22%23ddd%22 width=%22320%22 height=%22240%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22>Image</text></svg>'">
            </div>
        `;
    }

    div.innerHTML = `
        ${thumbnailHtml}
        <div class="vsm-photo-content">
            <span class="vsm-photo-type ${item.type}">${item.type === 'video' ? 'Video' : 'Photo'}</span>
            ${item.caption ? `<p class="vsm-photo-caption">${escapeHtml(item.caption)}</p>` : ''}
        </div>
    `;

    return div;
}

function openMediaModal(item) {
    const modal = document.getElementById('vsmModal');
    const modalBody = document.getElementById('vsmModalBody');
    const modalCaption = document.getElementById('vsmModalCaption');

    if (item.type === 'video') {
        const videoId = extractYouTubeId(item.url);
        if (videoId) {
            modalBody.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else {
            modalBody.innerHTML = `<p>Invalid video URL</p>`;
        }
    } else {
        const imageUrl = convertGoogleDriveUrl(item.url);
        modalBody.innerHTML = `<img src="${imageUrl}" alt="${item.caption || 'Photo'}">`;
    }

    modalCaption.textContent = item.caption || '';
    modal.classList.add('active');
}

function setupModalHandlers() {
    const modal = document.getElementById('vsmModal');
    const closeBtn = document.getElementById('vsmModalCloseBtn');
    const overlay = document.getElementById('vsmModalClose');

    closeBtn.onclick = () => closeMediaModal();
    overlay.onclick = () => closeMediaModal();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeMediaModal();
        }
    });
}

function closeMediaModal() {
    const modal = document.getElementById('vsmModal');
    const modalBody = document.getElementById('vsmModalBody');

    modal.classList.remove('active');

    // Stop video playback
    setTimeout(() => {
        modalBody.innerHTML = '';
    }, 300);
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

    // Convert Google Drive sharing links to direct image links
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