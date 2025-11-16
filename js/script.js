// ============================================
// Utility Functions
// ============================================

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = 'index.html#contact';
    }
}

// ============================================
// Contact Form Handler
// ============================================

function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Form verilerini al
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validate
    if (!data.name || !data.email || !data.message) {
        showFormStatus('Lütfen tüm alanları doldurun', 'error', formStatus);
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormStatus('Lütfen geçerli bir e-posta adresi girin', 'error', formStatus);
        return;
    }
    
    // Disable button
    submitButton.disabled = true;
    submitButton.textContent = 'Gönderiliyor...';
    
    // Simulate sending (in real app, this would be an API call)
    setTimeout(() => {
        // Success
        showFormStatus('Mesajınız başarıyla gönderildi! En kısa zamanda size dönüş yapacağım.', 'success', formStatus);
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Mesaj Gönder';
        
        // Clear status after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 5000);
    }, 1500);
}

function showFormStatus(message, type, element) {
    element.textContent = message;
    element.className = `form-status show ${type}`;
}

// ============================================
// File Upload Handler
// ============================================

function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    
    const filesList = [];
    for (let file of files) {
        filesList.push({
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
            uploadDate: new Date().toLocaleDateString('tr-TR')
        });
    }
    
    // Display files (in real app, upload to server)
    displayUploadedFiles(filesList);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function displayUploadedFiles(files) {
    const filesList = document.querySelector('.files-list');
    if (!filesList) return;
    
    let html = '';
    files.forEach((file, index) => {
        html += `
            <div class="file-item" style="padding: 1rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${file.name}</strong>
                    <p style="font-size: 0.85rem; color: #64748b; margin: 0.25rem 0;">
                        ${file.size} • ${file.uploadDate}
                    </p>
                </div>
                <button onclick="deleteFile(${index})" style="background: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
                    Sil
                </button>
            </div>
        `;
    });
    
    filesList.innerHTML = html || '<p class="empty-state">Henüz dosya yüklenmemiş</p>';
}

function deleteFile(index) {
    if (confirm('Dosyayı silmek istediğinize emin misiniz?')) {
        // Remove file (in real app, delete from server)
        const fileItems = document.querySelectorAll('.file-item');
        if (fileItems[index]) {
            fileItems[index].remove();
        }
    }
}

// ============================================
// Navigation Active Link
// ============================================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = 
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === 'yz-calismalari.html' && href === 'yz-calismalari.html') ||
            (currentPage === 'dosya-depolama.html' && href === 'dosya-depolama.html') ||
            (currentPage === '' && href === 'index.html');
        
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// Intersection Observer for Animations
// ============================================

function initIntersectionObserver() {
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
    
    // Observe cards and sections
    document.querySelectorAll('.expertise-card, .project-card, .category-card, .work-area-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ============================================
// Mobile Menu Toggle (if needed)
// ============================================

function initMobileMenu() {
    // Check if we need mobile menu
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    // Add mobile menu functionality if needed
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        }
    });
}

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation link
    updateActiveNavLink();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize intersection observer
    initIntersectionObserver();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Set up file input handler if exists
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // Set up upload area drag and drop
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#7c3aed';
            uploadArea.style.background = 'rgba(124, 58, 237, 0.1)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#2563eb';
            uploadArea.style.background = 'rgba(37, 99, 235, 0.05)';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#2563eb';
            uploadArea.style.background = 'rgba(37, 99, 235, 0.05)';
            
            const files = e.dataTransfer.files;
            if (fileInput) {
                fileInput.files = files;
                handleFileUpload({ target: { files: files } });
            }
        });
    }
    
    // Log initialization
    console.log('✓ Website initialized successfully');
});

// ============================================
// Utility: Print Page
// ============================================

function printPage() {
    window.print();
}

// ============================================
// Utility: Share Page
// ============================================

function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('Bu tarayıcı paylaşım özelliğini desteklemiyor.');
    }
}

// ============================================
// Utility: Copy to Clipboard
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Kopyalandı!');
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}
