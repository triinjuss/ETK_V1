document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('mobile-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mainNav.contains(event.target)) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('mobile-open');
            }
        });

        // Close menu when clicking on a nav item
        const navItems = mainNav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('mobile-open');
            });
        });
    }

    // Modal openers
    const openSmartModalBtn = document.getElementById('open-smart-modal');
    const openSmartModalTrigger = document.getElementById('open-smart-modal-trigger');
    const quickAddTaskBtn = document.getElementById('quick-add-task-btn');
    const openAiModalBtn = document.getElementById('open-ai-modal');
    const openAiServicesModalBtn = document.getElementById('open-ai-services-modal');
    const openAiWishAnalysisModalBtn = document.getElementById('open-ai-wish-analysis-modal');
    const openAiProfileAnalysisModalBtn = document.getElementById('open-ai-profile-analysis-modal');
    const openSelfAssessmentAiModalBtn = document.getElementById('open-self-assessment-ai-modal');
    const openStrengthsAiModalBtn = document.getElementById('open-strengths-ai-modal');
    const aiFormulateGoalBtn = document.getElementById('ai-formulate-goal-btn');
    const openAiActivitySuggestionBtn = document.getElementById('open-ai-activity-suggestion-modal');
    const openSkillsTestsModalBtn = document.getElementById('open-skills-tests-modal');
    const addWishBtn = document.querySelector('.add-wish-btn');

    // Modals
    const smartModal = document.getElementById('smart-goal-modal');
    const aiFormulatedGoalModal = document.getElementById('ai-formulated-goal-modal');
    const taskModal = document.getElementById('add-task-modal');
    const aiModal = document.getElementById('ai-activity-modal');
    const aiServicesModal = document.getElementById('ai-services-modal');
    const aiWishAnalysisModal = document.getElementById('ai-wish-analysis-modal');
    const aiProfileAnalysisModal = document.getElementById('ai-profile-analysis-modal');
    const selfAssessmentAiModal = document.getElementById('self-assessment-ai-modal');
    const aiSuggestionsModal = document.getElementById('ai-suggestions-modal');
    const aiActivitySuggestionModal = document.getElementById('ai-activity-suggestion-modal');
    const skillsTestsModal = document.getElementById('skills-tests-modal');
    const addJobWishModal = document.getElementById('add-job-wish-modal');
    const jobDetailsModal = document.getElementById('job-details-modal');
    
    // Inputs & Displays
    const quickTaskInput = document.getElementById('quick-task-input');
    const taskDescriptionInput = document.getElementById('task-description');
    const originalTextDisplay = document.getElementById('original-text-display');
    const aiVersionDisplay = document.getElementById('ai-version-display');

    // All close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    const cancelButtons = document.querySelectorAll('.btn-secondary[data-modal-id]');

    function openModal(modal) {
        if (modal) modal.classList.add('show');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('show');
    }

    // Simple function to open job details modal
    window.openJobDetailsModal = function(jobTitle) {
        const jobDetailsTitle = document.getElementById('job-details-title');
        const jobDetailsModal = document.getElementById('job-details-modal');
        
        if (jobDetailsTitle && jobTitle) {
            jobDetailsTitle.textContent = jobTitle;
        }
        if (jobDetailsModal) {
            openModal(jobDetailsModal);
        }
        return false;
    };

    // Function to handle "Edasi" button in add job wish modal
    window.handleAddJobWishEdasi = function() {
        const jobTitleInput = document.getElementById('job-title');
        const addJobWishModal = document.getElementById('add-job-wish-modal');
        
        if (jobTitleInput && jobTitleInput.value.trim()) {
            const selectedJobTitle = jobTitleInput.value.trim();
            // Close the add job wish modal
            if (addJobWishModal) {
                closeModal(addJobWishModal);
            }
            // Open the job details modal with the selected job
            openJobDetailsModal(selectedJobTitle);
        } else {
            alert('Palun sisestage töösoov enne edasi liikumist.');
        }
        return false;
    };

    if (openSkillsTestsModalBtn) {
        openSkillsTestsModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(skillsTestsModal);
        });
    }

    const openSmartModal = (e) => {
        e.preventDefault();
        openModal(smartModal);
    };

    if (openSmartModalBtn) openSmartModalBtn.addEventListener('click', openSmartModal);
    if (openSmartModalTrigger) openSmartModalTrigger.addEventListener('click', openSmartModal);

    if (aiFormulateGoalBtn) {
        aiFormulateGoalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(smartModal);
            openModal(aiFormulatedGoalModal);
        });
    }
    
    if (openAiActivitySuggestionBtn) {
        openAiActivitySuggestionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aiActivitySuggestionModal);
        });
    }

    if (quickAddTaskBtn) {
        quickAddTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (quickTaskInput.value) {
                taskDescriptionInput.value = quickTaskInput.value;
            }
            openModal(taskModal);
        });
    }

    if (addWishBtn) {
        addWishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(addJobWishModal);
        });
    }

    // Job Details Modal functionality
    const jobDetailsCancelBtn = document.getElementById('job-details-cancel');
    const jobDetailsSaveBtn = document.getElementById('job-details-save');

    if (jobDetailsCancelBtn) {
        jobDetailsCancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(jobDetailsModal);
        });
    }

    if (jobDetailsSaveBtn) {
        jobDetailsSaveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you can add form validation and saving logic
            closeModal(jobDetailsModal);
        });
    }

    // Job title autocomplete functionality
    const jobTitleInput = document.getElementById('job-title');
    const jobTitleDropdown = document.getElementById('job-title-dropdown');
    const similarJobsContainer = document.getElementById('similar-jobs-container');
    const similarJobsTags = document.getElementById('similar-jobs-tags');
    const addMoreJobsBtn = document.getElementById('add-more-jobs');
    
    // Sample job titles for autocomplete
    const jobTitles = [
        'projektijuht',
        'IT projektijuht',
        'projekteerija',
        'ehituse projektijuht',
        'reklaami projektijuht',
        'projektijuht (ehitus)',
        'projektijuht (IT)',
        'vanem projektijuht',
        'projektijuhi assistent',
        'projektijuhtimise spetsialist',
        'projekti koordinaator',
        'projektijuhtimise nõustaja',
        'projektijuhtimise juht',
        'projektijuhtimise analüütik',
        'projektijuhtimise direktor'
    ];

    // Similar jobs mapping
    const similarJobsMap = {
        'projektijuht': ['muu projektijuht', 'äriteeinduse juht', 'ehituse projektijuht'],
        'IT projektijuht': ['muu projektijuht', 'tehniline projektijuht', 'tarkvara projektijuht'],
        'projekteerija': ['tehniline projekteerija', 'arhitekt projekteerija', 'ehitusprojekteerija'],
        'ehituse projektijuht': ['ehitise projektijuht', 'ehitusjuht', 'objektijuht'],
        'reklaami projektijuht': ['turunduse projektijuht', 'kampaania juht', 'kommunikatsioonijuht'],
        'projektijuht (ehitus)': ['ehituse projektijuht', 'ehitusjuht', 'objektijuht'],
        'projektijuht (IT)': ['IT projektijuht', 'tarkvara projektijuht', 'tehniline projektijuht'],
        'vanem projektijuht': ['projektijuht', 'juhtiv projektijuht', 'projektide juht'],
        'projektijuhi assistent': ['projektijuht', 'projekti koordinaator', 'projektijuhtimise spetsialist'],
        'projektijuhtimise spetsialist': ['projektijuht', 'projekti koordinaator', 'projektijuhi assistent'],
        'projekti koordinaator': ['projektijuht', 'projektijuhtimise spetsialist', 'projektijuhi assistent'],
        'projektijuhtimise nõustaja': ['projektijuht', 'projektijuhtimise konsultant', 'projektijuhtimise ekspert'],
        'projektijuhtimise juht': ['vanem projektijuht', 'projektijuht', 'projektide direktor'],
        'projektijuhtimise analüütik': ['projektijuht', 'ärianalüütik', 'projektijuhtimise spetsialist'],
        'projektijuhtimise direktor': ['projektijuhtimise juht', 'vanem projektijuht', 'projektide direktor']
    };

    let selectedJobs = [];

    let selectedIndex = -1;

    function filterJobTitles(query) {
        if (!query.trim()) return [];
        return jobTitles.filter(title => 
            title.toLowerCase().includes(query.toLowerCase())
        ); // Show all matching suggestions
    }

    function showDropdown(suggestions) {
        if (suggestions.length === 0) {
            hideDropdown();
            return;
        }

        jobTitleDropdown.innerHTML = '';
        suggestions.forEach((title, index) => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = title;
            item.addEventListener('click', () => {
                selectJobTitle(title);
            });
            jobTitleDropdown.appendChild(item);
        });

        jobTitleDropdown.classList.add('show');
        selectedIndex = -1;
        
        // Adjust modal position to accommodate dropdown
        adjustModalForDropdown(true);
    }

    function hideDropdown() {
        jobTitleDropdown.classList.remove('show');
        selectedIndex = -1;
        
        // Reset modal position when dropdown is hidden
        adjustModalForDropdown(false);
    }

    function selectJobTitle(title) {
        jobTitleInput.value = title;
        hideDropdown();
        jobTitleInput.focus();
        
        // Show similar jobs if available
        showSimilarJobs(title);
    }

    function showSimilarJobs(selectedJob) {
        const similarJobs = similarJobsMap[selectedJob];
        if (similarJobs && similarJobs.length > 0) {
            // Only include the similar jobs, NOT the selected job itself
            selectedJobs = [...similarJobs];
            
            // Render the tags
            renderJobTags();
            
            // Show the container
            similarJobsContainer.style.display = 'block';
        } else {
            similarJobsContainer.style.display = 'none';
        }
    }

    function renderJobTags() {
        similarJobsTags.innerHTML = '';
        selectedJobs.forEach((job, index) => {
            const tag = document.createElement('div');
            tag.className = 'job-tag';
            tag.innerHTML = `
                <span>${job}</span>
                <button type="button" class="remove-tag" data-job="${job}" data-index="${index}">×</button>
            `;
            similarJobsTags.appendChild(tag);
        });
    }

    function removeJobTag(jobToRemove) {
        selectedJobs = selectedJobs.filter(job => job !== jobToRemove);
        renderJobTags();
        
        // Hide container if no jobs left
        if (selectedJobs.length === 0) {
            similarJobsContainer.style.display = 'none';
        }
    }

    function highlightItem(index) {
        const items = jobTitleDropdown.querySelectorAll('.autocomplete-item');
        items.forEach((item, i) => {
            item.classList.toggle('highlighted', i === index);
        });
    }

    function adjustModalForDropdown(isVisible) {
        const modal = document.getElementById('add-job-wish-modal');
        const modalContent = modal?.querySelector('.modal-content');
        
        if (modalContent) {
            if (isVisible) {
                // Show 5 suggestions max before scrolling
                const maxVisibleSuggestions = 5;
                const suggestionHeight = 45; // approximate height per suggestion
                const baseModalHeight = 400; // base modal height
                const dropdownHeight = maxVisibleSuggestions * suggestionHeight;
                const totalHeight = baseModalHeight + dropdownHeight;
                
                // Add class and set dynamic height for 5 suggestions
                modalContent.classList.add('dropdown-open');
                modalContent.style.minHeight = `${Math.min(totalHeight, window.innerHeight * 0.9)}px`;
                modalContent.style.transform = 'translateY(-15%)';
            } else {
                // Remove class and reset height
                modalContent.classList.remove('dropdown-open');
                modalContent.style.minHeight = '';
                modalContent.style.transform = '';
            }
        }
    }

    if (jobTitleInput && jobTitleDropdown) {
        jobTitleInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const suggestions = filterJobTitles(query);
            showDropdown(suggestions);
        });

        jobTitleInput.addEventListener('keydown', (e) => {
            const items = jobTitleDropdown.querySelectorAll('.autocomplete-item');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                highlightItem(selectedIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                highlightItem(selectedIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    selectJobTitle(items[selectedIndex].textContent);
                }
            } else if (e.key === 'Escape') {
                hideDropdown();
            }
        });

        jobTitleInput.addEventListener('blur', (e) => {
            // Delay hiding to allow click on dropdown items
            setTimeout(() => {
                hideDropdown();
            }, 200);
        });

        jobTitleInput.addEventListener('focus', (e) => {
            if (e.target.value.trim()) {
                const suggestions = filterJobTitles(e.target.value);
                showDropdown(suggestions);
            }
        });
    }

    // Event listeners for similar jobs functionality
    if (similarJobsTags) {
        similarJobsTags.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-tag')) {
                const jobToRemove = e.target.getAttribute('data-job');
                removeJobTag(jobToRemove);
            }
        });
    }

    if (addMoreJobsBtn) {
        addMoreJobsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear the input and show dropdown for adding more jobs
            jobTitleInput.value = '';
            jobTitleInput.focus();
            // Show all available jobs as suggestions
            const allSuggestions = jobTitles.filter(job => !selectedJobs.includes(job));
            showDropdown(allSuggestions);
        });
    }

    // Estonian cities/locations autocomplete functionality
    const workplaceLocationInput = document.getElementById('workplace-location');
    const workplaceLocationDropdown = document.getElementById('workplace-location-dropdown');
    
    // Estonian cities and regions
    const estonianLocations = [
        'Tallinn',
        'Tartu',
        'Narva',
        'Pärnu',
        'Kohtla-Järve',
        'Viljandi',
        'Rakvere',
        'Maardu',
        'Kuressaare',
        'Sillamäe',
        'Võru',
        'Jõhvi',
        'Haapsalu',
        'Keila',
        'Paide',
        'Elva',
        'Tapa',
        'Valga',
        'Põlva',
        'Jõgeva',
        'Rapla',
        'Kella linn',
        'Harju maakond',
        'Tartu maakond',
        'Ida-Viru maakond',
        'Pärnu maakond',
        'Lääne-Viru maakond',
        'Viljandi maakond',
        'Rapla maakond',
        'Võru maakond',
        'Saare maakond',
        'Jõgeva maakond',
        'Järva maakond',
        'Valga maakond',
        'Põlva maakond',
        'Lääne maakond',
        'Hiiu maakond'
    ];

    let selectedLocationIndex = -1;

    function filterLocations(query) {
        if (!query.trim()) return [];
        return estonianLocations.filter(location => 
            location.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10); // Show max 10 suggestions
    }

    function showLocationDropdown(suggestions) {
        if (suggestions.length === 0) {
            hideLocationDropdown();
            return;
        }

        workplaceLocationDropdown.innerHTML = '';
        suggestions.forEach((location, index) => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = location;
            item.addEventListener('click', () => {
                selectLocation(location);
            });
            workplaceLocationDropdown.appendChild(item);
        });

        workplaceLocationDropdown.classList.add('show');
        selectedLocationIndex = -1;
    }

    function hideLocationDropdown() {
        workplaceLocationDropdown.classList.remove('show');
        selectedLocationIndex = -1;
    }

    function selectLocation(location) {
        workplaceLocationInput.value = location;
        hideLocationDropdown();
    }

    if (workplaceLocationInput && workplaceLocationDropdown) {
        workplaceLocationInput.addEventListener('keydown', (e) => {
            const items = workplaceLocationDropdown.querySelectorAll('.autocomplete-item');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedLocationIndex = Math.min(selectedLocationIndex + 1, items.length - 1);
                updateLocationSelection(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedLocationIndex = Math.max(selectedLocationIndex - 1, -1);
                updateLocationSelection(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedLocationIndex >= 0 && items[selectedLocationIndex]) {
                    selectLocation(items[selectedLocationIndex].textContent);
                } else {
                    // Show all suggestions when Enter is pressed
                    const query = workplaceLocationInput.value;
                    const suggestions = filterLocations(query);
                    showLocationDropdown(suggestions);
                }
            } else if (e.key === 'Escape') {
                hideLocationDropdown();
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!workplaceLocationInput.contains(e.target) && !workplaceLocationDropdown.contains(e.target)) {
                hideLocationDropdown();
            }
        });
    }

    function updateLocationSelection(items) {
        items.forEach((item, index) => {
            if (index === selectedLocationIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    if (openAiModalBtn) {
        openAiModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aiModal);
        });
    }
    
    if (openAiServicesModalBtn) {
        openAiServicesModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aiServicesModal);
        });
    }

    if (openAiWishAnalysisModalBtn) {
        openAiWishAnalysisModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aiWishAnalysisModal);
        });
    }

    if (openAiProfileAnalysisModalBtn) {
        openAiProfileAnalysisModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aiProfileAnalysisModal);
        });
    }

    if (openSelfAssessmentAiModalBtn) {
        openSelfAssessmentAiModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(selfAssessmentAiModal);
        });
    }
    
    if (openStrengthsAiModalBtn) {
        openStrengthsAiModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Text for the left column is the content of the main textarea
            const skillsTextarea = document.getElementById('skills-and-expectations-textarea');
            if (skillsTextarea && originalTextDisplay) {
                originalTextDisplay.innerHTML = skillsTextarea.value.replace(/\n/g, '<br>');
            }
            
            // The AI-improved version for the right column
            const aiVersionText = `<h5>Professionaalne kokkuvõte</h5>
<p>7-aastase kogemusega tulemusele orienteeritud IT-projektijuht, kellel on laialdane kogemus tarkvaraarendusprojektide edukal elluviimisel. Tõestatud oskused meeskonna juhtimises, agiilsete metoodikate rakendamises ja sidusrühmade vahelise kommunikatsiooni tagamises. Otsin väljakutset innovaatilises ja arengut toetavas ettevõttes, eelistades hübriidtöö vormi.</p>

<h5>Põhioskused</h5>
<ul>
    <li><b>Juhtimisoskused:</b> Meeskonna juhtimine, motiveerimine, arendamine</li>
    <li><b>Projektijuhtimine:</b> <span class="keyword-highlight">Eelarvestamine</span>, <span class="keyword-highlight">Riskijuhtimine</span>, aruandlus</li>
    <li><b>Metoodikad:</b> Agile, Scrum, Kanban</li>
    <li><b>Tööriistad:</b> JIRA, Confluence, Trello, Asana, MS Project</li>
    <li><b>Tehnilised oskused:</b> SQL (algteadmised)</li>
</ul>

<h5>Eesmärgid ja ootused</h5>
<ul>
    <li>Rakendada ja arendada oma juhtimisoskusi rahvusvahelistes projektides.</li>
    <li>Panustada ettevõtte kasvu läbi efektiivse projektide teostuse.</li>
    <li>Karjääriarengu võimalus ja konkurentsivõimeline palk (3200-4000€).</li>
</ul>`;

            if (aiVersionDisplay) {
                aiVersionDisplay.innerHTML = aiVersionText;
            }

            openModal(aiSuggestionsModal);
        });
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalToClose = button.closest('.modal-overlay');
            closeModal(modalToClose);
        });
    });
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-id');
            const modalToClose = document.getElementById(modalId);
             closeModal(modalToClose);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal(event.target);
        }
    });
    
    // --- Interactive Skills Sliders ---
    const skillItems = document.querySelectorAll('.skills-card-v2 .skill-item');

    const updateSkillDisplay = (skillItem) => {
        const slider = skillItem.querySelector('.skill-slider');
        const bar = skillItem.querySelector('.skill-level-bar');
        const label = skillItem.querySelector('.skill-level-label');
        const value = parseInt(slider.value, 10);

        // Update bar width
        bar.style.width = value + '%';

        // Update label and colors
        let levelClass = '';
        let levelText = '';

        if (value <= 33) {
            levelClass = 'develop';
            levelText = 'Arendamist vajav';
        } else if (value <= 66) {
            levelClass = 'medium';
            levelText = 'Keskmine';
        } else if (value <= 85) {
            levelClass = 'strong';
            levelText = 'Tugev';
        } else {
            levelClass = 'strong';
            levelText = 'Väga tugev';
        }
        
        bar.className = 'skill-level-bar ' + levelClass;
        label.className = 'skill-level-label ' + levelClass;
        label.textContent = levelText;
    };
    
    skillItems.forEach(item => {
        const slider = item.querySelector('.skill-slider');
        
        // Initial setup
        updateSkillDisplay(item);

        // Add event listener
        slider.addEventListener('input', () => {
            updateSkillDisplay(item);
        });
    });
});