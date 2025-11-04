'use strict'

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle), .dropdown-item');
    const navbarCollapse = document.getElementById('navbarNav');
    
    if (navbarCollapse) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

    const excludeClass = 'no-lazy'; 
    const lazyImages = document.querySelectorAll(`img:not(.${excludeClass})`);
    lazyImages.forEach(image => {
      image.setAttribute('loading', 'lazy');
    });

    const imageModals = document.querySelectorAll('.modal');
    imageModals.forEach(imageModal => {
        imageModal.addEventListener('show.bs.modal', event => {
            const opener = event.relatedTarget;
            const productId = opener.getAttribute('data-product-id');
            const modalImage = imageModal.querySelector('#modalImage');

            let imageTitle = '';
            let imageDescription = '';
            let hiResSrc = opener.getAttribute('data-bs-image-src');

            if (productId) {
                const product = productData.find(p => p.id === productId);
                if (product) {
                    imageTitle = product.title; 
                    imageDescription = product.description;
                    hiResSrc = product.imageSrc; 
                }
            } else {
                imageTitle = opener.getAttribute('data-bs-title') || 'Nos Créations';
                imageDescription = opener.getAttribute('data-bs-description') || '';
            }

            const modalTitle = imageModal.querySelector('#imageModalLabel');
            if (modalTitle) modalTitle.textContent = imageTitle;

            const modalDescription = imageModal.querySelector('#modalDescription');
            if (modalDescription) modalDescription.textContent = imageDescription;

            if (modalImage) {
                modalImage.style.opacity = '0';
                modalImage.src = '';

                const hiResLoader = new Image();
                hiResLoader.src = hiResSrc; 

                hiResLoader.onload = () => {
                    
                    modalImage.src = hiResLoader.src; 
                    modalImage.offsetHeight; 
                    modalImage.style.opacity = '1'; 
                };

                hiResLoader.onerror = () => {
                    console.error("Failed to load high resolution image:", hiResSrc);
                };
            }
        });
    });

    if (typeof productData !== 'undefined') {
        productData.forEach(product => {
            const imageElement = document.querySelector(`img[data-product-id="${product.id}"]`);
            if (imageElement) {
                imageElement.src = product.thumbSrc;
                imageElement.alt = product.title;
                const card = imageElement.closest('.card');
                const titleElement = card ? card.querySelector('.card-body .card-text') : null;
                const priceElement = card ? card.querySelector('.product-price') : null;
                if (titleElement) titleElement.textContent = product.title;
                if (priceElement) priceElement.textContent = product.price;
            }
        });
    }

    var audio = new Audio("./assets/sounds/bird.mp3");
    document.querySelector('#logo').addEventListener('mouseenter', () => audio.play());

    let backToTopBtn = document.getElementById("backToTopBtn");
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };
    window.topFunction = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});
