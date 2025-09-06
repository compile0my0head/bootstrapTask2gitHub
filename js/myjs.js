/* ====== galleryData: put full-size image paths here (4 per category) ======
   Example: 'images/design-1.jpg' – these should match the thumbnails you used above.
*/
const galleryData = {
    design: [
        { src: 'https://i.postimg.cc/Vsn7qrH3/design-1.png', caption: 'Design — Project 1' },
        { src: 'https://i.postimg.cc/yYTv5qKj/design-2.png', caption: 'Design — Project 2' },
        { src: 'https://i.postimg.cc/CxF6Lh79/design-3.png', caption: 'Design — Project 3' },
        { src: 'https://i.postimg.cc/TPK0ppDN/design-5.png', caption: 'Design — Project 4' }
    ],
    exterior: [
        { src: 'images/exterior-1.jpg', caption: 'Exterior — Project 1' },
        { src: 'https://i.postimg.cc/cJzDmQWN/design-4.png', caption: 'Exterior — Project 2' },
        { src: 'https://i.postimg.cc/NfPrLbkY/exterior3.png', caption: 'Exterior — Project 3' },
        { src: 'https://i.postimg.cc/j5KDB1t6/exterior4.png', caption: 'Exterior — Project 4' }
    ],
    interior: [
        { src: 'images/interior-1.jpg', caption: 'Interior — Project 1' },
        { src: 'images/interior-2.jpg', caption: 'Interior — Project 2' },
        { src: 'images/interior-3.jpg', caption: 'Interior — Project 3' },
        { src: 'images/interior-4.jpg', caption: 'Interior — Project 4' }
    ],
    shopdrawing: [
        { src: 'images/shopdrawing-1.jpg', caption: 'Shopdrawing — Project 1' },
        { src: 'images/shopdrawing-2.jpg', caption: 'Shopdrawing — Project 2' },
        { src: 'images/shopdrawing-3.jpg', caption: 'Shopdrawing — Project 3' },
        { src: 'images/shopdrawing-4.jpg', caption: 'Shopdrawing — Project 4' }
    ]
};

/* DOM refs */
const modalEl = document.getElementById('portfolioModal');
const carouselInner = document.getElementById('portfolioCarouselInner');
const carouselEl = document.getElementById('portfolioCarousel');
const counterEl = document.getElementById('portfolioModalCounter');

let bsCarousel = null;
function ensureCarousel() {
    bsCarousel = bootstrap.Carousel.getInstance(carouselEl) || new bootstrap.Carousel(carouselEl, { interval: false, ride: false });
}

function openCategoryGallery(category, startIndex = 0) {
    const items = galleryData[category] || [];
    if (!items.length) return;

    // clear previous slides
    carouselInner.innerHTML = '';

    // build slides
    items.forEach((it, i) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-item' + (i === startIndex ? ' active' : '');
        slide.innerHTML = `
          <img src="${it.src}" alt="${it.caption}" loading="lazy" class="d-block w-100">
          <div class="carousel-caption d-none d-md-block"><h6>${it.caption}</h6></div>
        `;
        carouselInner.appendChild(slide);
    });

    counterEl.textContent = (startIndex + 1) + ' / ' + items.length;

    ensureCarousel();
    const bsModal = new bootstrap.Modal(modalEl, { backdrop: true });
    bsModal.show();

    const onShown = () => {
        ensureCarousel();
        bsCarousel.to(startIndex);
        modalEl.removeEventListener('shown.bs.modal', onShown);
    };
    modalEl.addEventListener('shown.bs.modal', onShown);

    carouselEl.removeEventListener('slid.bs.carousel', updateCounterHandler);
    carouselEl.addEventListener('slid.bs.carousel', updateCounterHandler);
}

function updateCounterHandler(e) {
    const items = (carouselInner ? carouselInner.children.length : 0);
    counterEl.textContent = (e.to + 1) + ' / ' + items;
}

// click handler for thumbnails (works in tab panes)
document.addEventListener('click', function (e) {
    const thumb = e.target.closest('.portfolio-thumb');
    if (!thumb) return;
    const cat = thumb.dataset.cat;
    const idx = Number(thumb.dataset.index || 0);
    openCategoryGallery(cat, idx);
});

// keyboard: Enter on focused thumb
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    const active = document.activeElement;
    if (active && active.classList.contains('portfolio-thumb')) {
        const cat = active.dataset.cat;
        const idx = Number(active.dataset.index || 0);
        openCategoryGallery(cat, idx);
    }
});

  const videoCarousel = document.getElementById('videoCarousel');

  videoCarousel.addEventListener('slide.bs.carousel', function (event) {
    // find all videos in the carousel and pause them
    const videos = videoCarousel.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0; // optional: reset to beginning
    });
  });