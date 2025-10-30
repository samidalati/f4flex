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

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Staggered animation for portfolio, services, and partners items
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item, .service-card, .partner-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 150); // 150ms delay between each item
            });
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Animate portfolio and services with stagger
    const portfolioSection = document.querySelector('.portfolio');
    const servicesSection = document.querySelector('.services');
    const partnersSection = document.querySelector('.partners');
    
    if (portfolioSection) staggerObserver.observe(portfolioSection);
    if (servicesSection) staggerObserver.observe(servicesSection);
    if (partnersSection) staggerObserver.observe(partnersSection);
    
    // Animate other elements
    const otherElements = document.querySelectorAll('.contact-item');
    otherElements.forEach(el => {
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        // Skip if element is in runaway interaction state to avoid transform conflicts
        if (element.classList.contains('runaway-active')) return;
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form submission - Web3Forms handles this automatically
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Let Web3Forms handle the submission
        // Just show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Reset button after 5 seconds (in case of redirect)
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 5000);
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
            title: 'Video Shoot',
            description: `The Challenge

NARS is one of the most recognized makeup brands in the Middle East. The brand faced a unique challenge: the need to produce localized content that resonates with regional audiences, while adhering to extremely strict global guidelines that allow no creative deviation.

Every market's content had to maintain global consistency in tone, look, and quality. Despite this, the Middle Eastern market required a more relatable and diverse approach to connect with its multicultural audience.

The Solution

We accepted the challenge of creating regional content that fully met NARS Global's standards without compromising quality or brand integrity. The content remained subject to global approval and could be rejected if it did not meet their expectations.

To ensure authenticity and relevance, we collaborated with @Hindash, one of the most prominent beauty influencers and makeup artists in the Middle East. The campaign focused on three key skin tones—light, medium, and dark—to highlight the 33 foundation shades offered by NARS, celebrating the region's rich diversity, especially in Dubai.

We mirrored the global visual style closely, using the same music and lighting approach. The creative focused on application techniques, shade selection, product benefits, and makeup results. Smooth transitions and elegant motion reinforced the brand's premium aesthetic, while Hindash served as the face of the campaign to anchor local credibility.

The Execution

Despite a limited budget, the campaign was entirely produced by our in-house team. The project was led and directed by myself as Senior Art Director, from concept development and storyboard creation to on-set direction and post-production supervision.

The team included:
• An Account Manager managing NARS' coordination and approvals
• A Social Media Strategist overseeing content adaptation
• An in-house Videographer and Editor handling production and editing
• An in-house Photographer capturing stills for cross-platform use

The final assets aligned perfectly with NARS' global quality benchmarks while authentically representing the Middle Eastern audience, achieving the delicate balance between local relevance and global consistency.`,
            client: 'NARS',
            clientLogo: 'assets/partners/Partenrs_0011_NARS.webp',
            behanceUrl: 'https://www.behance.net/gallery/116455095/NARS-Video-shoot',
            images: [
                'assets/NARS-Video-Shoot/3i6KmsZkJ5V_576.webm',
                'assets/NARS-Video-Shoot/PqiYLDuIdE6_576.webm'
            ]
        },
        'wella-social-content': {
            title: 'Social Media Content',
            description: `The Challenge

The Wella Arabia Instagram page lacked localized content, as the global team did not provide regional assets despite launching products exclusively for the Middle East. Our objective was to produce fresh, engaging visuals tailored to the regional market while staying within a limited budget.

The Solution

We produced a diverse set of 40 images in a single session for both local and global social media channels. With a modest budget, we managed every stage of production, from creative direction and styling to photography and prop sourcing. We hired a professional photographer and used team members as models to achieve authentic, relatable results.

Color By You | Crazy Temporary and Permanent Hair Color

We created styled product content that highlighted the brand's bold color range, mixing possibilities, and temporary top coats. The visuals also included detailed pack shots to showcase the complete color collection.

Wella Permanent Hair Color and Results (Koleston and Soft Color)

To keep the content natural and accessible, we invited team members to model for the shoot. They arrived with their hair styled naturally, helping us create organic, realistic visuals that featured Wella's most loved products while staying true to the brand's identity.`,
            client: 'Wella',
            clientLogo: 'assets/partners/Partenrs_0006_Wella.webp',
            behanceUrl: 'https://www.behance.net/gallery/168175917/Wella-Social-media-content',
            images: [
                'assets/Wella-Social-Media-Content/wella_social_media_content_hero.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_1.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_2.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_3.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_4.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_5.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_6.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_7.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_8.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_9.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_10.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_11.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_12.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_13.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_14.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_15.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_16.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_17.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_18.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_19.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_20.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_21.webp',
                'assets/Wella-Social-Media-Content/wella_social_media_content_22.webp'
            ]
        },
        'durex-thrill-firsts': {
            title: 'The Thrill of Firsts',
            description: `The Challenge

Durex South America wanted to create a campaign that spoke directly to a younger audience aged 18 to 25. After several unsuccessful attempts, the project was reassigned to a younger team at Havas Middle East, better suited to understand this generation's mindset, culture, and desires. The project was led by myself as Art Director and my partner Yasmina as Copywriter.

Our challenge was to create a concept that connected authentically with youth who are constantly exposed to sexuality through media, music, and social platforms, while staying true to Durex's role as a brand that promotes safe and responsible exploration.

The Idea

We developed the concept "The Thrill of Firsts" inspired by the excitement and uniqueness of every first experience. The idea encouraged young people to embrace new adventures while reminding them that the only thing to think about before their next first is protection.

Our message was clear: Durex supports and empowers this unstoppable generation by being there for them, not to restrict them. Every first time can be thrilling, as long as it begins safely.

The creative platform built on the question "What's your #NextFirst?", opening endless possibilities for self-expression, curiosity, and discovery.

The Manifesto

We produced a manifesto film that spoke directly from the point of view of this generation. The tone was natural, relatable, and empowering, reflecting Durex's supportive role. The film closed with our call to action:
"Dare. Discover. Explore. But first, Durex."

Because of budget limitations, we combined stock footage with scenes we shot during a one-day production to create a raw, authentic energy. Multiple voiceovers, both male and female with diverse accents, made the content inclusive and genuine.

Quickies

To expand the campaign, we created short videos called "Quickies." Each one depicted a different first-time scenario, showing the thrill of new experiences while reinforcing the message of protection.
Examples included:
• First time in the shower
• First time in the car
• First time in the library (a more conservative version for selective markets)

We cast three real couples based on chemistry, authenticity, and natural connection. The goal was to capture moments that felt daring, sexy, yet genuine.

We also produced rough mockups ourselves, shooting scenes on mobile phones and editing them with movie and music-video clips to visualize the tone and direction for the client.

All final videos used exclusive music inspired by Massive Attack, composed specifically to evoke excitement and sensuality. Each video ended with the animated Durex logo appearing on the condom pack, visually linking the brand to protection and empowerment.

The Execution

The videos were distributed across social media, inviting the audience to share their own ideas for new "firsts" using the hashtag #NextFirst. The campaign positioned Durex as an ally in sexual confidence and safety, normalizing the idea of both men and women carrying condoms as part of their daily essentials.

Visuals

We designed simple but provocative visuals that focused on the product, paired with textures and backdrops hinting at potential first-time scenarios. These assets were used in-store and on social media as teasers with the question:
"What's your #NextFirst?"
All visuals directed users to the campaign website.

Website

We created an interactive landing page for both desktop and mobile, combining education and playfulness. The site featured:
• The main manifesto video
• An interactive section where users could share and like ideas for new firsts
• A collaboration with a popular influencer discussing sexual wellness, confidence, and the importance of being prepared

The result was a digital experience that inspired curiosity, encouraged conversation, and reinforced Durex's message of safety, confidence, and empowerment.`,
            client: 'Durex',
            clientLogo: 'assets/partners/Partenrs_0000_Bourjois.webp', // Using Bourjois as placeholder since Durex isn't in partners
            behanceUrl: 'https://www.behance.net/gallery/115659431/Durex-The-Thrill-Of-Firsts',
            images: [
                'assets/Durex-Thrill-Firsts/40b9e4115659431.60551bb285bc9.webp',
                'assets/Durex-Thrill-Firsts/4c2f6d115659431.60551bb2852e3.webp',
                'assets/Durex-Thrill-Firsts/8207b6115659431.605281b40c3dd.webp',
                'assets/Durex-Thrill-Firsts/a21730115659431.605281b409b63.webp',
                'assets/Durex-Thrill-Firsts/a4d0ed115659431.60551bb286bac.webp',
                'assets/Durex-Thrill-Firsts/e9ccd8115659431.605281b40a17d.webp',
                'assets/Durex-Thrill-Firsts/eedf25115659431.60551bb2863cd.webp',
                'assets/Durex-Thrill-Firsts/TaKtkTR6kqt_poster.webp',
                'assets/Durex-Thrill-Firsts/5F8vxEkua3j_576.webm',
                'assets/Durex-Thrill-Firsts/6DDV9Tcu-Dr_360.webm',
                'assets/Durex-Thrill-Firsts/DIi8stpFywg_576.webm',
                'assets/Durex-Thrill-Firsts/HJZDzgbt-n__360.webm',
                'assets/Durex-Thrill-Firsts/KZtgQUZhUjS_576.webm',
                'assets/Durex-Thrill-Firsts/S4Tq62fWguA_576.webm',
                'assets/Durex-Thrill-Firsts/TaKtkTR6kqt_576.webm',
                'assets/Durex-Thrill-Firsts/output.webm'
            ]
        },
        'rimmel-wonderlux': {
            title: 'WonderLux Mascara',
            description: `The Challenge

The Rimmel Wonder'Lux Mascara launched alongside six Wonder Proof Liners, yet the global campaign lacked content tailored to regional audiences. Working closely with the Google team, we discovered new audience segments beyond traditional beauty enthusiasts. One of the most promising was video gamers, which inspired us to create a unique concept relevant to this community.


The Idea

We developed an original campaign concept, independent from the global direction, to test YouTube learnings specific to our regional audience. Our chosen ambassador, Fatma Almomen, a well-known influencer in the Middle East, embodied a modern superhero inspired by strong female characters from video games and films.

Out of the six liner shades, we designed three signature makeup looks, each representing a unique "superpower" rooted in Rimmel's message of women empowerment.
The powers were named:
• Say No
• Live The Moment
• Be Heard

The set design mirrored the mascara's pink metallic packaging, with subtle makeup that emphasized the lashes and eyes. Fatma was directed to express confidence and strength while maintaining the elegance of the modern Arabic woman.


The Execution

We launched the campaign with a hero video showcasing the mascara and its key benefits, followed by a reveal of the six liners under the tagline "Choose Your Power." The main video was supported by six-second cut-downs, each dedicated to one superpower and look.

In the second phase, we released content featuring both the mascara and liners together, highlighting all six powers. We optimized assets for different social platforms, adapting the creative into GIFs, stills, stories, videos, and photos to maximize reach and engagement.`,
            client: 'Rimmel',
            clientLogo: 'assets/partners/Partenrs_0004_Rimmel.webp',
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
            title: 'Take Me to Paris',
            description: `The Challenge

Bourjois launched three new eyeshadow palettes, each inspired by an iconic Paris location: L'Opéra, La Seine, and Rue de Café. The brand's global guidelines emphasized capturing the authentic Parisian atmosphere through outdoor shoots in the city. However, filming in Paris was not possible due to budget limitations.

The Solution

Our big idea was to connect each palette to its Parisian inspiration through a campaign titled "Take Me to Paris." Every look transports the viewer to a different place in Paris, allowing them to experience the city's charm and joyful spirit without ever leaving home.

To bring this concept to life, we reimagined Paris in a playful and metaphorical way. Our regional Bourjois ambassador, Noha Nabil, created three makeup looks—each one taking her to a different Parisian scene while she remained in her own space.

Each video begins with Noha in her cozy room, flipping through a French magazine. She spots a location that inspires her, and the products appear around her as if by magic, helping her create her new look in a joyful and whimsical way. Once her makeup is complete, a quick transition transforms her surroundings into Paris, complete with a matching outfit and setting. The scene captures the brand's joyful and chic attitude, closing with Noha embodying the true "Joyfully Parisian" spirit.

The Execution

The long-format videos featured detailed tutorials of Noha using each palette, supported by complementary products available in stores. From these, we created a range of shorter cuts and resized assets optimized for different social media platforms.

The content followed best practices and platform-specific trends discussed in our ongoing workshops with social media partners. The result was a series of visually engaging videos that brought Paris to life and showcased Bourjois' products through an imaginative, relatable story.`,
            client: 'Bourjois',
            clientLogo: 'assets/partners/Partenrs_0000_Bourjois.webp',
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
            title: 'Your Loved Ones',
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
            client: 'Bourjois',
            clientLogo: 'assets/partners/Partenrs_0000_Bourjois.webp',
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
        
        // Clear any existing interval first
        stopAutoplay();
        
        // Get current media type and set appropriate duration
        const currentMedia = currentProjectImages[currentImageIndex];
        const isVideo = currentMedia.endsWith('.webm') || currentMedia.endsWith('.mp4');
        const duration = isVideo ? 4000 : 2000; // 4 seconds for videos, 2 seconds for images
        
        autoplayInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
            changeToImage(currentImageIndex);
        }, duration);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Video event handlers for smart autoplay
    function handleVideoPlay() {
        // Pause autoplay when user clicks play
        stopAutoplay();
    }
    
    function handleVideoEnd() {
        // Resume autoplay when video ends
        setTimeout(() => {
            startAutoplay();
        }, 500); // Small delay to ensure smooth transition
    }
    
    function changeToImage(index) {
        const mainImg = document.getElementById('lightbox-main-img');
        const thumbnails = document.querySelectorAll('.lightbox-thumbnail');
        const currentMedia = currentProjectImages[index];
        
        if (currentMedia.endsWith('.webm') || currentMedia.endsWith('.mp4')) {
            // Handle video
            if (mainImg._currentVideo) {
                mainImg._currentVideo.src = currentMedia;
            } else {
                // Create video element if it doesn't exist
                const video = document.createElement('video');
                video.src = currentMedia;
                video.controls = true;
                video.autoplay = false;
                video.style.width = '100%';
                video.style.height = 'auto';
                video.style.maxHeight = '70vh';
                video.style.objectFit = 'contain';
                
                mainImg.style.display = 'none';
                mainImg.parentNode.appendChild(video);
                mainImg._currentVideo = video;
            }
            
            // Add video event listeners for smart autoplay
            const video = mainImg._currentVideo;
            if (video) {
                // Remove existing listeners to avoid duplicates
                video.removeEventListener('play', handleVideoPlay);
                video.removeEventListener('ended', handleVideoEnd);
                
                // Add new listeners
                video.addEventListener('play', handleVideoPlay);
                video.addEventListener('ended', handleVideoEnd);
                
                // Clean up any play button overlays from the video element
                const parent = video.parentNode;
                const playButtons = parent.querySelectorAll('div[style*="position: absolute"]');
                playButtons.forEach(btn => {
                    if (btn.innerHTML.includes('▶')) {
                        btn.remove();
                    }
                });
            }
            
            // Remove any play button overlays from main area
            const existingPlayButtons = mainImg.parentNode.querySelectorAll('div[style*="position: absolute"]');
            existingPlayButtons.forEach(btn => {
                if (btn.innerHTML.includes('▶') || btn.innerHTML.includes('play')) {
                    btn.remove();
                }
            });
        } else {
            // Handle image
            if (mainImg._currentVideo) {
                mainImg._currentVideo.remove();
                mainImg._currentVideo = null;
            }
            
            mainImg.style.display = 'block';
            mainImg.src = currentMedia;
            mainImg.alt = `${document.getElementById('lightbox-title').textContent} - Media ${index + 1}`;
        }
        
        // Update active thumbnail
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    // Open lightbox function
    function openLightbox(project) {
        // Stop any existing autoplay
        stopAutoplay();
        
        // Clean up any existing play button overlays
        const mainImg = document.getElementById('lightbox-main-img');
        const existingPlayButtons = mainImg.parentNode.querySelectorAll('div[style*="position: absolute"]');
        existingPlayButtons.forEach(btn => {
            if (btn.innerHTML.includes('▶') || btn.innerHTML.includes('play')) {
                btn.remove();
            }
        });
        
        // Set current project images and reset index
        currentProjectImages = project.images;
        currentImageIndex = 0;
        // Populate lightbox content
        document.getElementById('lightbox-title').textContent = project.title;
        document.getElementById('lightbox-description').textContent = project.description;
        
        // Display client logo instead of text
        const clientLogoContainer = document.getElementById('lightbox-client-logo');
        if (project.clientLogo) {
            clientLogoContainer.innerHTML = `<img src="${project.clientLogo}" alt="${project.client}" />`;
        } else {
            clientLogoContainer.innerHTML = `<span>${project.client}</span>`;
        }
        
        document.getElementById('lightbox-behance-link').href = project.behanceUrl;
        
        // Set main image/video
        const firstMedia = project.images[0];
        
        if (firstMedia.endsWith('.webm') || firstMedia.endsWith('.mp4')) {
            // Create video element
            const video = document.createElement('video');
            video.src = firstMedia;
            video.controls = true;
            video.autoplay = false;
            video.style.width = '100%';
            video.style.height = 'auto';
            video.style.maxHeight = '70vh';
            video.style.objectFit = 'contain';
            
            // Clear and add video
            mainImg.style.display = 'none';
            mainImg.parentNode.appendChild(video);
            
            // Store reference for later updates
            mainImg._currentVideo = video;
            
            // Add video event listeners for smart autoplay
            video.addEventListener('play', handleVideoPlay);
            video.addEventListener('ended', handleVideoEnd);
            
            // Remove any play button overlays from main area
            const existingPlayButtons = mainImg.parentNode.querySelectorAll('div[style*="position: absolute"]');
            existingPlayButtons.forEach(btn => {
                if (btn.innerHTML.includes('▶') || btn.innerHTML.includes('play')) {
                    btn.remove();
                }
            });
        } else {
            // Hide any existing video
            if (mainImg._currentVideo) {
                mainImg._currentVideo.remove();
                mainImg._currentVideo = null;
            }
            
            // Show image
            mainImg.style.display = 'block';
            mainImg.src = firstMedia;
            mainImg.alt = project.title;
        }
        
        // Create thumbnails (only if 2 or more items)
        const thumbnailsContainer = document.getElementById('lightbox-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        if (project.images.length >= 2) {
            project.images.forEach((mediaSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'lightbox-thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            if (mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.mp4')) {
                // Create video thumbnail using static image
                const img = document.createElement('img');
                // Use thumbnail image for videos
                const thumbSrc = mediaSrc.replace('.webm', '_thumb.webp').replace('.mp4', '_thumb.webp');
                img.src = thumbSrc;
                img.alt = `${project.title} - Video ${index + 1}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                
                thumbnail.appendChild(img);
            } else {
                // Create image thumbnail
                const img = document.createElement('img');
                img.src = mediaSrc;
                img.alt = `${project.title} - Media ${index + 1}`;
                thumbnail.appendChild(img);
            }
            
            thumbnailsContainer.appendChild(thumbnail);
            
            // Add click event to thumbnail
            thumbnail.addEventListener('click', () => {
                // Stop autoplay when user manually selects an image
                stopAutoplay();
                currentImageIndex = index;
                changeToImage(index);
                // Restart autoplay after user interaction
                setTimeout(startAutoplay, 2000);
            });
        });
        }
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Additional cleanup for any stray play buttons
        setTimeout(() => {
            // Clean up main display area
            const mainDisplayArea = document.querySelector('.lightbox-main-image');
            if (mainDisplayArea) {
                const playButtons = mainDisplayArea.querySelectorAll('div[style*="position: absolute"]');
                playButtons.forEach(btn => {
                    if (btn.innerHTML.includes('▶')) {
                        btn.remove();
                    }
                });
            }
            
            // Clean up any video elements in main display
            const mainVideos = document.querySelectorAll('.lightbox-main-image video');
            mainVideos.forEach(video => {
                const parent = video.parentNode;
                const playButtons = parent.querySelectorAll('div[style*="position: absolute"]');
                playButtons.forEach(btn => {
                    if (btn.innerHTML.includes('▶')) {
                        btn.remove();
                    }
                });
            });
        }, 100);
        
        // Start autoplay
        startAutoplay();
        
        // Set up mutation observer to catch any new play buttons
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.tagName === 'DIV') {
                        if (node.innerHTML.includes('▶') && node.style.position === 'absolute') {
                            // Check if it's in the main display area
                            const mainDisplayArea = document.querySelector('.lightbox-main-image');
                            if (mainDisplayArea && mainDisplayArea.contains(node)) {
                                node.remove();
                            }
                        }
                    }
                });
            });
        });
        
        // Start observing the main display area
        const mainDisplayArea = document.querySelector('.lightbox-main-image');
        if (mainDisplayArea) {
            observer.observe(mainDisplayArea, { childList: true, subtree: true });
        }
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

// Run-away interaction for hero circles
document.addEventListener('DOMContentLoaded', () => {
    const heroGraphic = document.querySelector('.hero-graphic');
    if (!heroGraphic) return;

    const circles = Array.from(heroGraphic.querySelectorAll('.floating-element'));
    if (!circles.length) return;

    const INFLUENCE_RADIUS = 200; // px
    const MAX_OFFSET = 120; // px

    function handleMouseMove(e) {
        const graphicRect = heroGraphic.getBoundingClientRect();

        circles.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = cx - e.clientX;
            const dy = cy - e.clientY;
            const dist = Math.hypot(dx, dy) || 0.0001;

            if (dist < INFLUENCE_RADIUS) {
                el.classList.add('runaway-active');
                // Normalize direction away from pointer
                const ux = dx / dist;
                const uy = dy / dist;
                const strength = (1 - dist / INFLUENCE_RADIUS);
                const move = Math.min(MAX_OFFSET, MAX_OFFSET * strength);
                let tx = ux * move;
                let ty = uy * move;

                // Optional: clamp so circle visual stays roughly within hero graphic bounds
                const maxX = graphicRect.width / 2 + MAX_OFFSET;
                const maxY = graphicRect.height / 2 + MAX_OFFSET;
                tx = Math.max(-maxX, Math.min(maxX, tx));
                ty = Math.max(-maxY, Math.min(maxY, ty));

                el.style.transform = `translate(${tx}px, ${ty}px)`;
            } else {
                // Restore when far enough
                if (el.classList.contains('runaway-active')) {
                    el.classList.remove('runaway-active');
                    el.style.transform = '';
                }
            }
        });
    }

    function handleMouseLeave() {
        circles.forEach((el) => {
            el.classList.remove('runaway-active');
            el.style.transform = '';
        });
    }

    heroGraphic.addEventListener('mousemove', handleMouseMove);
    heroGraphic.addEventListener('mouseleave', handleMouseLeave);
});
