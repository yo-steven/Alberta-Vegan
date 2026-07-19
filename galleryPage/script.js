// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadGalleryItems();
    setupModalHandlers();
});

async function loadGalleryItems() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadingEl = document.getElementById('galleryLoading');
    const emptyEl = document.getElementById('galleryEmpty');

    try {
        const response = await fetch('/api/gallery');
        const data = await response.json();

        loadingEl.style.display = 'none';

        if (!data.items || data.items.length === 0) {
            emptyEl.style.display = 'block';
            return;
        }

        emptyEl.style.display = 'none';
        galleryGrid.innerHTML = '';

        data.items.forEach(item => {
            const itemEl = createGalleryItem(item);
            galleryGrid.appendChild(itemEl);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
        loadingEl.style.display = 'none';
        emptyEl.style.display = 'block';
        emptyEl.querySelector('p').textContent = 'Error loading gallery. Please try again later.';
    }
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.onclick = () => openMediaModal(item);

    let thumbnailHtml = '';
    if (item.type === 'video') {
        const videoId = extractYouTubeId(item.url);
        if (videoId) {
            thumbnailHtml = `
                <div style="position: relative;">
                    <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
                         alt="${item.caption || 'Video thumbnail'}" 
                         class="gallery-item-thumbnail"
                         onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                    <div class="gallery-item-video-indicator">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        } else {
            thumbnailHtml = `
                <div style="position: relative; background: #333; height: 240px; display: flex; align-items: center; justify-content: center;">
                    <div class="gallery-item-video-indicator">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        }
    } else {
        // Photo from Google Drive or direct link
        const imageUrl = convertGoogleDriveUrl(item.url);
        thumbnailHtml = `
            <img src="${imageUrl}" 
                 alt="${item.caption || 'Photo'}" 
                 class="gallery-item-thumbnail"
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22240%22><rect fill=%22%23ddd%22 width=%22320%22 height=%22240%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22>Image</text></svg>'">
        `;
    }

    div.innerHTML = `
        ${thumbnailHtml}
        <div class="gallery-item-content">
            <span class="gallery-item-type ${item.type}">${item.type === 'video' ? 'Video' : 'Photo'}</span>
            ${item.caption ? `<p class="gallery-item-caption">${escapeHtml(item.caption)}</p>` : ''}
        </div>
    `;

    return div;
}

function openMediaModal(item) {
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('mediaModalBody');
    const modalCaption = document.getElementById('mediaModalCaption');

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
    const modal = document.getElementById('mediaModal');
    const closeBtn = document.getElementById('mediaModalCloseBtn');
    const overlay = document.getElementById('mediaModalClose');

    closeBtn.onclick = () => closeMediaModal();
    overlay.onclick = () => closeMediaModal();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeMediaModal();
        }
    });
}

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('mediaModalBody');

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

    // If it's already a direct link or another service, return as is
    return url;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}