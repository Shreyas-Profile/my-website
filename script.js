// Activity posting functionality
let activities = [];
const STORAGE_KEY = 'activities_v1';
let selectedFiles = [];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing blog functionality...');
    
    // File upload handling
    const fileUpload = document.getElementById('fileUpload');
    const filePreview = document.getElementById('filePreview');
    
    console.log('File upload element:', fileUpload);
    console.log('File preview element:', filePreview);
    
    if (fileUpload) {
        fileUpload.addEventListener('change', function(e) {
            console.log('File upload changed:', e.target.files);
            selectedFiles = Array.from(e.target.files);
            displayFilePreview();
        });
    }

function displayFilePreview() {
    filePreview.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-preview-item';
        
        const icon = getFileIcon(file.type);
        fileItem.innerHTML = `
            <i class="${icon}"></i>
            <span>${file.name}</span>
            <span class="remove-file" onclick="removeFile(${index})">×</span>
        `;
        filePreview.appendChild(fileItem);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFilePreview();
}

function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return 'fas fa-image';
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('text/') || fileType.includes('javascript') || fileType.includes('python')) return 'fas fa-file-code';
    return 'fas fa-file';
}

// Persistence helpers
function saveActivities() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch (e) {
        console.error('Failed to save activities:', e);
    }
}

function loadActivities() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Basic validation: ensure array of objects with id/title
            if (Array.isArray(parsed)) {
                activities = parsed;
            }
        } else {
            // Fallback sample content for first-time visitors (not saved until user posts)
            activities = [
                {
                    id: 1,
                    title: "Built my personal website",
                    description: "Created a complete personal website with HTML, CSS, and JavaScript. Added sections for about me, achievements, travel, and a blog for daily activities.",
                    category: "coding",
                    files: [{ name: "website.html", type: "text/html", size: 1024 }],
                    date: "Today",
                    timestamp: new Date()
                },
                {
                    id: 2,
                    title: "Studied Python data structures",
                    description: "Learned about lists, dictionaries, and tuples in Python. Practiced with some coding exercises and built a simple contact management system.",
                    category: "learning",
                    files: [],
                    date: "Yesterday",
                    timestamp: new Date(Date.now() - 86400000)
                },
                {
                    id: 3,
                    title: "Started AI chatbot project",
                    description: "Began working on a simple chatbot using Python and natural language processing. Planning to integrate it with a web interface.",
                    category: "project",
                    files: [
                        { name: "chatbot.py", type: "text/x-python", size: 2048 },
                        { name: "design.png", type: "image/png", size: 5120 }
                    ],
                    date: "2 days ago",
                    timestamp: new Date(Date.now() - 172800000)
                }
            ];
        }
    } catch (e) {
        console.error('Failed to load activities, using defaults:', e);
    }
    displayActivities();
}

    // Activity form submission
    const activityForm = document.getElementById('activityForm');
    console.log('Activity form element:', activityForm);
    
    if (activityForm) {
        activityForm.addEventListener('submit', function(e) {
            console.log('Form submitted!');
            e.preventDefault();
            
            const title = document.getElementById('activityTitle').value;
            const description = document.getElementById('activityDescription').value;
            const category = document.getElementById('activityCategory').value;
            
            console.log('Form data:', { title, description, category });
            
            if (!title || !description) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const activity = {
                id: Date.now(),
                title: title,
                description: description,
                category: category,
                files: selectedFiles.map(file => ({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                    file: file // Store the actual file object for images
                })),
                date: new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                timestamp: new Date()
            };
            
            activities.unshift(activity); // Add to beginning
            displayActivities();
            saveActivities();
            
            // Reset form
            activityForm.reset();
            selectedFiles = [];
            displayFilePreview();
            
            // Show success message
            showNotification('Activity posted successfully!');
        });
    }

function displayActivities() {
    const activitiesList = document.getElementById('activitiesList');
    activitiesList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityElement = createActivityElement(activity);
        activitiesList.appendChild(activityElement);
    });
}

function createActivityElement(activity) {
    const activityDiv = document.createElement('div');
    activityDiv.className = 'activity-post';
    activityDiv.dataset.id = activity.id;
    
    // Separate images from other files
    const imageFiles = activity.files.filter(file => file.type.startsWith('image/'));
    const otherFiles = activity.files.filter(file => !file.type.startsWith('image/'));
    
    // Create image gallery HTML
    const imagesHtml = imageFiles.length > 0 ? `
        <div class="activity-images">
            ${imageFiles.map(file => `
                <div class="image-container">
                    <img src="${file.url || URL.createObjectURL(file)}" alt="${file.name}" class="activity-image" onclick="openImageModal('${file.url || URL.createObjectURL(file)}', '${file.name}')">
                </div>
            `).join('')}
        </div>
    ` : '';
    
    // Create other files HTML
    const filesHtml = otherFiles.length > 0 ? `
        <div class="activity-files">
            ${otherFiles.map(file => `
                <span class="file-attachment">
                    <i class="${getFileIcon(file.type)}"></i>
                    <span>${file.name}</span>
                </span>
            `).join('')}
        </div>
    ` : '';
    
    activityDiv.innerHTML = `
        <div class="activity-header">
            <div class="activity-meta">
                <span class="activity-date">${activity.date}</span>
                <span class="activity-category ${activity.category}">${activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}</span>
            </div>
            <button class="delete-activity" onclick="deleteActivity(this)">×</button>
        </div>
        <h4 class="activity-title">${activity.title}</h4>
        <p class="activity-description">${activity.description}</p>
        ${imagesHtml}
        ${filesHtml}
    `;
    
    return activityDiv;
}

function deleteActivity(button) {
    const activityPost = button.closest('.activity-post');
    const activityId = parseInt(activityPost.dataset.id);
    
    if (confirm('Are you sure you want to delete this activity?')) {
        activities = activities.filter(activity => activity.id !== activityId);
        displayActivities();
        saveActivities();
        showNotification('Activity deleted successfully!');
    }
}

// Image modal functionality
function openImageModal(imageSrc, imageName) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="image-modal-close" onclick="closeImageModal()">&times;</span>
            <img src="${imageSrc}" alt="${imageName}" class="modal-image">
            <p class="modal-image-name">${imageName}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
    }
}

// Make handlers available to inline onclick attributes
window.deleteActivity = deleteActivity;
window.removeFile = removeFile;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

    // Load saved or default activities on page load
    loadActivities();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Real email sending via EmailJS
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        if (!window.emailjs) {
            alert('Email service not initialized. Please check your internet connection.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Replace the placeholders with your EmailJS Service ID and Template ID
        const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
        const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';

        const templateParams = {
            from_name: name,
            reply_to: email,
            message: message
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                alert('Thanks! Your message was sent.');
                this.reset();
            })
            .catch((err) => {
                console.error('Email send failed:', err);
                alert('Sorry, there was an error sending your message. Please try again later.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Animate elements on scroll
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
    const animateElements = document.querySelectorAll('.achievement-card, .travel-card, .standout-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);