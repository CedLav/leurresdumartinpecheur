        const imageModal = document.getElementById('imageModal');
        imageModal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const opener = event.relatedTarget;
            // Extract info from data-bs-image-src attribute
            const imageSrc = opener.getAttribute('data-bs-image-src');
            // Update the modal's content.
            const modalImage = imageModal.querySelector('#modalImage');
            modalImage.src = imageSrc;
        });

        /**
         * Scrolls the page smoothly to a specified section.
         * @param {string} sectionId The ID of the section to scroll to.
         */
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                // Adjust scroll position to account for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: sectionTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        }

        /* Play bird sound when mouse enters logo */
        var audio = new Audio("./assets/sounds/bird.mp3");

        document.querySelector('#logo').addEventListener('mouseenter', function (e) {
            audio.play();
        });

        // Get the back-to-top button
        let backToTopBtn = document.getElementById("backToTopBtn");

        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        }

        // When the user clicks on the button, scroll to the top of the document
        function topFunction() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Make topFunction globally accessible
        window.topFunction = topFunction;

        // Ensure smooth scrolling for navbar links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                scrollToSection(sectionId);
            });
        });
