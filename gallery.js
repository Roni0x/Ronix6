// Массив с путями к изображениям
const images = [
    'https://i.pinimg.com/1200x/f4/2e/78/f42e785a1928007e415c8a63858c5e6b.jpg',
    'https://i.pinimg.com/1200x/31/6a/7a/316a7a4701e039defd6dbd6e5f3f4fdb.jpg',
    'https://i.pinimg.com/736x/4b/60/7d/4b607d659ad5350506537e84efb3cf72.jpg',
    'https://i.pinimg.com/1200x/f4/2e/78/f42e785a1928007e415c8a63858c5e6b.jpg',
    'https://i.pinimg.com/1200x/31/6a/7a/316a7a4701e039defd6dbd6e5f3f4fdb.jpg',
    'https://i.pinimg.com/736x/4b/60/7d/4b607d659ad5350506537e84efb3cf72.jpg',
    'https://i.pinimg.com/1200x/f4/2e/78/f42e785a1928007e415c8a63858c5e6b.jpg',
    'https://i.pinimg.com/1200x/31/6a/7a/316a7a4701e039defd6dbd6e5f3f4fdb.jpg'
];

const gallerySlider = document.getElementById('gallerySlider');
const pagerText = document.getElementById('pagerText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 0; // Текущая страница (начинается с 0)
let slidesPerView = 3;

function getSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function getTotalPages() {
    return Math.ceil(images.length / slidesPerView);
}

function getCurrentSlideIndex() {
    return currentPage * slidesPerView;
}

function initGallery() {
    const oldSlidesPerView = slidesPerView;
    slidesPerView = getSlidesPerView();
    
    
    if (oldSlidesPerView !== slidesPerView || gallerySlider.children.length === 0) {
        gallerySlider.innerHTML = '';
        
        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            const slideContent = document.createElement('div');
            slideContent.className = 'slide-content';
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Изображение ${index + 1}`;
            img.loading = 'lazy';
            
            slideContent.appendChild(img);
            slide.appendChild(slideContent);
            gallerySlider.appendChild(slide);
        });
    }
    
    // Пересчитываем текущую страницу при изменении количества слайдов
    if (oldSlidesPerView !== slidesPerView) {
        const totalPages = getTotalPages();
        // Сохраняем номер страницы, но не выходим за границы
        currentPage = Math.min(currentPage, totalPages - 1);
    }
    
    updateSliderPosition();
}

function updatePagerText() {
    const currentPageNumber = currentPage + 1;
    const totalPages = getTotalPages();
    pagerText.textContent = `${currentPageNumber} / ${totalPages}`;
}

function updateSliderPosition() {
    const slideWidth = 100 / slidesPerView;
    const currentSlideIndex = getCurrentSlideIndex();
    gallerySlider.style.transform = `translateX(-${currentSlideIndex * slideWidth}%)`;
    updatePagerText();
}

function goToPage(pageIndex) {
    const totalPages = getTotalPages();
    currentPage = Math.max(0, Math.min(pageIndex, totalPages - 1));
    updateSliderPosition();
}

function nextSlide() {
    const totalPages = getTotalPages();
    if (currentPage < totalPages - 1) {
        currentPage++;
    } else {
        currentPage = 0; // Возврат к первой странице
    }
    updateSliderPosition();
}

function prevSlide() {
    const totalPages = getTotalPages();
    if (currentPage > 0) {
        currentPage--;
    } else {
        currentPage = totalPages - 1; // Переход к последней странице
    }
    updateSliderPosition();
}

function handleResize() {
    initGallery();
}

// Запуск
document.addEventListener('DOMContentLoaded', function() {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    window.addEventListener('resize', handleResize);
    initGallery();
});