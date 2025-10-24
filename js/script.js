// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll indicator functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Add click event to scroll to next section
        scrollIndicator.addEventListener('click', () => {
            const heroSection = document.querySelector('#home');
            const aboutSection = document.querySelector('#about');
            
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when user scrolls down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        });
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials every 5 seconds
if (testimonials.length > 1) {
    setInterval(nextTestimonial, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .blog-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});

        // Portfolio Lightbox Functionality
        document.addEventListener('DOMContentLoaded', () => {
            const lightbox = document.getElementById('portfolio-lightbox');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxContent = document.querySelector('.lightbox-content');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            // Autoplay variables
            let autoplayInterval = null;
            let currentImageIndex = 0;
            let currentProjectImages = [];
    
    // Project data with images and details
    const projectData = {
        'nars-video-shoot': {
            title: 'NARS Video Shoot',
            description: 'Professional beauty brand video production for NARS cosmetics. Created compelling video content showcasing the brand\'s foundation range with diverse skin tones, featuring popular Middle Eastern beauty influencer @Hindash.',
            type: 'Video Production',
            client: 'NARS',
            category: 'Video',
            behanceUrl: 'https://www.behance.net/gallery/116455095/NARS-Video-shoot',
            images: [
                'assets/nars-video-shoot.webp'
            ]
        },
        'wella-social-content': {
            title: 'Wella Social Media Content',
            description: 'Creative social media campaigns for Wella beauty brand featuring engaging visual content and strategic brand messaging. Developed comprehensive social media strategy with stunning visuals that resonate with target audiences.',
            type: 'Social Media',
            client: 'Wella',
            category: 'Social Media',
            behanceUrl: 'https://www.behance.net/gallery/168175917/Wella-Social-media-content',
            images: [
                'assets/Wella-Social-Media-Content/wella_social_media_content_hero.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_1.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_2.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_3.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_4.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_5.webp'
            ]
        },
        'durex-thrill-firsts': {
            title: 'Durex: The Thrill of Firsts',
            description: 'Bold and innovative campaign design for Durex featuring creative visual storytelling. Developed compelling campaign materials that push boundaries while maintaining brand integrity and messaging.',
            type: 'Campaign Design',
            client: 'Durex',
            category: 'Campaigns',
            behanceUrl: 'https://www.behance.net/gallery/115659431/Durex-The-Thrill-Of-Firsts',
            images: [
                'assets/durex-thrill-firsts.webp'
            ]
        },
        'rimmel-wonderlux': {
            title: 'Rimmel WonderLux Mascara',
            description: 'Beauty product campaign and visual design for Rimmel\'s WonderLux Mascara featuring stunning beauty photography. Created compelling visual content that highlights the product\'s benefits and appeal.',
            type: 'Beauty Campaign',
            client: 'Rimmel',
            category: 'Beauty',
            behanceUrl: 'https://www.behance.net/gallery/91949647/Rimmel-WonderLux-Mascara',
            images: [
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_hero.webp',
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_1.webp',
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_2.webp',
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_3.webp',
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_4.webp',
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_5.webp',
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_6.webp',
                'assets/Rimmel-WonderLux-Mascara/rimmel_wonderlux_mascara_7.webp'
            ]
        },
        'bourjois-take-me-paris': {
            title: 'Bourjois: Take Me to Paris',
            description: 'Romantic beauty campaign with Parisian flair showcasing Bourjois cosmetics in the City of Light. Created enchanting visual content that captures the essence of Paris and the brand\'s romantic appeal.',
            type: 'Beauty Campaign',
            client: 'Bourjois',
            category: 'Beauty',
            behanceUrl: 'https://www.behance.net/gallery/91951183/Bourjois-Take-Me-to-Paris',
            images: [
                'assets/Bourjois-Take-Me-to-Paris/bourjois-hero.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-1.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-2.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-3.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-4.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-5.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-6.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-7.webp',
                'assets/Bourjois-Take-Me-to-Paris/bourjois-8.webp'
            ]
        },
        'bourjois-loved-ones': {
            title: 'Bourjois: Your Loved Ones',
            description: `The Challenge

To fill a gap in our media plan and promote our core products in Face, Eyes, and Lips, we needed a social campaign featuring three popular influencers from the region. At the same time, the brand was introducing new visual guidelines. Our goal was to create a campaign that smoothly bridged the old and new aesthetics while reflecting the brand's joyful identity, Joyfully Parisian.

The main challenge was working with a very limited budget while driving sales without launching a new product, only new shades of existing ones.

The Idea

To maximize reach and engagement, we partnered with three leading influencers, each representing one of our hero products:
• Healthy Mix Foundation for Face
• Twist Up The Volume Mascara for Eyes
• Rouge Edition Velvet for Lips

Each influencer wore a bright color inspired by her featured product and was filmed against a complementary background to emphasize the campaign's central themes of joy and color.

We titled the campaign "The Loved Ones", symbolizing both the products people love and the influencers who bring them to life. The influencers were encouraged to act naturally to connect with their audiences and express the playful, Parisian spirit of the brand.

From the footage, we produced a range of short-form content for different social platforms. Each asset highlighted attitude, makeup results, product benefits, and application tips. The campaign successfully drove engagement and guided viewers to our online store for an easy shopping experience.`,
            type: 'Influencer Campaign',
            client: 'Bourjois',
            category: 'Beauty',
            behanceUrl: 'https://www.behance.net/gallery/91952259/Bourjois-Your-Loved-Ones',
            images: [
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_hero.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_1.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_2.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_3.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_4.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_5.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_6.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_7.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_8.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_9.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_10.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_11.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_12.webp',
                'assets/Bourjois-Your-Loved-Ones/bourjois_your_loved_ones_13.webp'
            ]
        }
    };
    
    // Add click event to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            const title = item.querySelector('h3').textContent;
            
            // Find project data based on title
            let projectKey = null;
            for (const [key, data] of Object.entries(projectData)) {
                if (data.title === title) {
                    projectKey = key;
                    break;
                }
            }
            
            if (projectKey && projectData[projectKey]) {
                openLightbox(projectData[projectKey]);
            }
        });
    });
    
    // Autoplay functions
    function startAutoplay() {
        if (currentProjectImages.length <= 1) return; // Don't autoplay if only one image
        
        autoplayInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
            changeToImage(currentImageIndex);
        }, 5000); // 5 seconds
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    function changeToImage(index) {
        const mainImg = document.getElementById('lightbox-main-img');
        const thumbnails = document.querySelectorAll('.lightbox-thumbnail');
        
        // Update main image
        mainImg.src = currentProjectImages[index];
        mainImg.alt = `${document.getElementById('lightbox-title').textContent} - Image ${index + 1}`;
        
        // Update active thumbnail
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    // Open lightbox function
    function openLightbox(project) {
        // Stop any existing autoplay
        stopAutoplay();
        
        // Set current project images and reset index
        currentProjectImages = project.images;
        currentImageIndex = 0;
        // Populate lightbox content
        document.getElementById('lightbox-title').textContent = project.title;
        document.getElementById('lightbox-description').textContent = project.description;
        document.getElementById('lightbox-type').textContent = project.type;
        document.getElementById('lightbox-client').textContent = project.client;
        document.getElementById('lightbox-category').textContent = project.category;
        document.getElementById('lightbox-behance-link').href = project.behanceUrl;
        
        // Set main image
        const mainImg = document.getElementById('lightbox-main-img');
        mainImg.src = project.images[0];
        mainImg.alt = project.title;
        
        // Create thumbnails
        const thumbnailsContainer = document.getElementById('lightbox-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        project.images.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'lightbox-thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${project.title} - Image ${index + 1}`;
            
            thumbnail.appendChild(img);
            thumbnailsContainer.appendChild(thumbnail);
            
            // Add click event to thumbnail
            thumbnail.addEventListener('click', () => {
                // Stop autoplay when user manually selects an image
                stopAutoplay();
                currentImageIndex = index;
                changeToImage(index);
                // Restart autoplay after user interaction
                setTimeout(startAutoplay, 1000);
            });
        });
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start autoplay
        startAutoplay();
    }
    
    // Close lightbox function
    function closeLightbox() {
        // Stop autoplay when closing
        stopAutoplay();
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close button event
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);
