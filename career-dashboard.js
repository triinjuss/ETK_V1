// Career Dashboard JavaScript
// This file contains interactive functionality for the career dashboard

document.addEventListener('DOMContentLoaded', function() {
    console.log('Career Dashboard loaded successfully');
    
    // Initialize dashboard with job-specific data
    initializeDashboard();
    initializeActionButtons();
    initializeAdviceInteractions();
    initializeMapFeatures();
});

/**
 * Initialize dashboard with job-specific information
 */
function initializeDashboard() {
    // Get URL parameters to customize content based on saved job
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('job') || 'Projektijuht';
    const location = urlParams.get('location') || 'Keila';
    
    console.log('Initializing dashboard for:', jobTitle, 'in', location);
    
    // Update job overview title
    const overviewTitle = document.getElementById('job-overview-title');
    if (overviewTitle) {
        overviewTitle.textContent = `${jobTitle} turuülevaade (${location})`;
    }
    
    // Update job overview content based on job type
    updateJobOverviewContent(jobTitle, location);
    
    // Update related job tags
    updateRelatedJobTags(jobTitle);
}

/**
 * Update job overview content based on job type
 */
function updateJobOverviewContent(jobTitle, location) {
    const contentElement = document.getElementById('job-overview-content');
    if (!contentElement) return;
    
    // Job-specific content templates
    const jobContent = {
        'IT projektijuht': {
            description: `${location} on kasvav tehnoloogiapiirkond. IT projektijuhtide järele on stabiilne nõudlus ning tööpakkumisi lisandub regulaarselt.`,
            salary: '2800-4200 eurot',
            relatedJobs: ['Scrum Master', 'Tootejuht', 'Tehnilise juhi']
        },
        'Reklaamimudija projektijuht': {
            description: `${location}s ei ole projektijuhtide järele hetkel suurt tööjõupuudust, kuid tööpakkumisi lisandub aeg-ajalt.`,
            salary: '1550-2100 eurot',
            relatedJobs: ['müügijuhi', 'turundusspetsialisti']
        },
        'Vanemanalüütik': {
            description: `${location} piirkonnas on analüütikute järele kasvav nõudlus, eriti finants- ja tehnoloogiasektoris.`,
            salary: '2200-3500 eurot',
            relatedJobs: ['andmeanalüütiku', 'ärianalüütiku']
        }
    };
    
    const content = jobContent[jobTitle] || jobContent['Reklaamimudija projektijuht'];
    
    contentElement.innerHTML = `
        ${content.description} Tööjõubaromeetri andmetel on konkurents keskmine.
        <br><br>
        Viimaste tööpakkumiste põhjal on ${jobTitle.toLowerCase()} brutopalk Harjumaal vahemikus <span class="highlight">${content.salary}</span>.
        Soovitame kaaluda kandideerimist ka seotud valdkondadesse, näiteks <span class="highlight">${content.relatedJobs.join('</span> või <span class="highlight">')}</span> ametikohale, et suurendada sobivate tööpakkumiste arvu.
    `;
}

/**
 * Update related job tags based on main job
 */
function updateRelatedJobTags(jobTitle) {
    const tagsContainer = document.querySelector('.tags-list');
    if (!tagsContainer) return;
    
    const relatedJobsMap = {
        'IT projektijuht': ['Scrum Master', 'Tootejuht', 'DevOps insener', 'IT-konsultant', 'Tehnilise juhi', 'Agile coach'],
        'Reklaamimudija projektijuht': ['Tootejuht', 'Ärianalüütik', 'Turundusjuht', 'IT-konsultant', 'Kampaaniajuht', 'Müügijuht'],
        'Vanemanalüütik': ['Ärianalüütik', 'Andmeanalüütik', 'IT-konsultant', 'Müügijuht', 'Finantsanalüütik', 'Tootejuht']
    };
    
    const relatedJobs = relatedJobsMap[jobTitle] || relatedJobsMap['Reklaamimudija projektijuht'];
    
    tagsContainer.innerHTML = relatedJobs.map(job => 
        `<span class="tag">${job}</span>`
    ).join('');
    
    // Re-initialize tag interactions
    initializeTagInteractions();
}

/**
 * Initialize action button interactions
 */
function initializeActionButtons() {
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Action button clicked:', this.textContent);
            
            // Add your action button functionality here
            // For example, opening modals, navigating to other pages, etc.
            
            // Example: Show alert for now
            alert(`${this.textContent} functionality would be implemented here`);
        });
    });
}

/**
 * Initialize advice item interactions
 */
function initializeAdviceInteractions() {
    const adviceItems = document.querySelectorAll('.advice-item');
    
    adviceItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Advice item clicked:', this.querySelector('strong').textContent);
            
            // Add functionality for advice item clicks
            // For example, expanding details, showing more information, etc.
        });
        
        // Add hover effects or other interactive features
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8fafc';
            this.style.cursor = 'pointer';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

/**
 * Initialize map-related features
 */
function initializeMapFeatures() {
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        // Add map interaction features
        mapContainer.addEventListener('click', function() {
            console.log('Map clicked');
            
            // Example: Open map in full screen or new tab
            // window.open('https://www.openstreetmap.org/...', '_blank');
        });
    }
}

/**
 * Utility function to show notifications
 */
function showNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // You can implement a proper notification system here
    // For now, just use console logging
}

/**
 * Function to update dashboard data
 */
function updateDashboardData(data) {
    console.log('Updating dashboard with new data:', data);
    
    // Implementation for updating dashboard content dynamically
    // This could be used for real-time updates or when switching between different job positions
}

/**
 * Function to handle tag clicks
 */
function handleTagClick(tagElement) {
    const tagText = tagElement.textContent;
    console.log('Tag clicked:', tagText);
    
    // Add functionality for tag interactions
    // For example, filtering content, searching for related jobs, etc.
    showNotification(`Otsime "${tagText}" ametikohti...`, 'info');
}

/**
 * Initialize tag interactions
 */
function initializeTagInteractions() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        // Remove existing listeners by cloning
        const newTag = tag.cloneNode(true);
        tag.parentNode.replaceChild(newTag, tag);
        
        newTag.addEventListener('click', function() {
            handleTagClick(this);
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Make tags interactive
        newTag.style.cursor = 'pointer';
        newTag.style.transition = 'transform 0.15s ease, background-color 0.2s ease';
        
        newTag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e0f2f1';
        });
        
        newTag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f0f7f7';
        });
    });
}

// Add event listeners for tags when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTagInteractions();
});