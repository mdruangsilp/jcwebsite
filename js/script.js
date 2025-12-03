// Personal Website JavaScript
// Handles dark mode toggle, navigation, and other interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle functionality
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = `
        <span class="material-symbols-outlined sun-icon">light_mode</span>
        <span class="material-symbols-outlined moon-icon" style="display:none;">dark_mode</span>
    `;
    darkModeToggle.setAttribute('id', 'dark-mode-toggle');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.classList.add('btn', 'btn-outline', 'text-sm', 'p-2', 'rounded-full');
    
    // Add toggle button to header
    const header = document.querySelector('header');
    if (header) {
        const navContainer = header.querySelector('.flex-1');
        if (navContainer) {
            navContainer.appendChild(darkModeToggle);
        }
    }
    
    // Check for saved theme preference or respect OS preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled' || 
                      ('matchMedia' in window && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        updateDarkModeIcon(true);
    }
    
    // Toggle dark mode when button is clicked
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        updateDarkModeIcon(isDark);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add fade-in animation to sections when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    document.querySelectorAll('section, .bg-white, .bg-slate-900').forEach(el => {
        observer.observe(el);
    });
    
    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // In a real application, you would send the data to a server here
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.bg-white', '.bg-slate-900');
    cards.forEach(card => {
        card.classList.add('card-hover');
    });
});

// Update the dark mode icon based on current theme
function updateDarkModeIcon(isDark) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    }
}

// Utility function to check if dark mode is enabled
function isDarkModeEnabled() {
    return document.documentElement.classList.contains('dark');
}