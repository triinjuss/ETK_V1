document.addEventListener('DOMContentLoaded', function() {
    // Auto-resize textareas based on content - but allow manual resize too
    function autoResizeTextarea(textarea) {
        // Only auto-resize if user hasn't manually resized
        if (!textarea.hasAttribute('data-manually-resized')) {
            // Reset height to auto to measure content
            textarea.style.height = 'auto';
            
            // Get the scroll height (total content height)
            const scrollHeight = textarea.scrollHeight;
            
            // Set different minimum heights based on textarea type
            let minHeight = 80; // Default minimum
            if (textarea.classList.contains('task-notes')) {
                minHeight = 80;
            } else if (textarea.classList.contains('modal-textarea')) {
                minHeight = 150;
            } else if (textarea.classList.contains('feedback-textarea')) {
                minHeight = 150;
            } else if (textarea.classList.contains('plan-block')) {
                minHeight = 400;
            } else if (textarea.parentElement?.classList.contains('justification-group')) {
                minHeight = 160;
            } else if (textarea.parentElement?.classList.contains('form-section')) {
                minHeight = 120;
            }
            
            // Set height to either minimum or content height, whichever is larger
            textarea.style.height = Math.max(minHeight, scrollHeight) + 'px';
        }
    }

    // Make autoResizeTextarea available globally
    window.autoResizeTextarea = autoResizeTextarea;

    // Initialize auto-resize for task notes
    const taskNotesTextareas = document.querySelectorAll('.task-notes');
    taskNotesTextareas.forEach(textarea => {
        // Add event listener for input to auto-resize
        textarea.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
        
        // Add event listener for paste
        textarea.addEventListener('paste', function() {
            setTimeout(() => autoResizeTextarea(this), 0);
        });
        
        // Detect manual resize (when user drags the resize handle)
        let isResizing = false;
        textarea.addEventListener('mousedown', function(e) {
            // Check if clicking near the resize handle (bottom right corner)
            const rect = textarea.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x > rect.width - 20 && y > rect.height - 20) {
                isResizing = true;
            }
        });
        
        textarea.addEventListener('mouseup', function() {
            if (isResizing) {
                textarea.setAttribute('data-manually-resized', 'true');
                isResizing = false;
            }
        });
        
        // Initial resize based on existing content
        autoResizeTextarea(textarea);
    });

    // Task checkbox functionality - handle completed tasks
    function initializeTaskCheckboxes() {
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            // Remove any existing event listeners to avoid duplicates
            checkbox.removeEventListener('change', handleCheckboxChange);
            
            // Set initial state based on checkbox status
            toggleTaskCompletion(checkbox, checkbox.checked);
            
            // Add default text for unchecked tasks on page load
            if (!checkbox.checked) {
                const checklistItem = checkbox.closest('.checklist-item');
                if (checklistItem) {
                    const taskNotesTextarea = checklistItem.querySelector('.task-notes');
                    if (taskNotesTextarea && !taskNotesTextarea.value.trim()) {
                        taskNotesTextarea.value = 'Plaan: ';
                        window.autoResizeTextarea(taskNotesTextarea);
                    }
                }
            }
            
            // Add event listener for checkbox changes
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }

    function handleCheckboxChange(event) {
        toggleTaskCompletion(event.target, event.target.checked);
    }

    function toggleTaskCompletion(checkbox, isCompleted) {
        const checklistItem = checkbox.closest('.checklist-item');
        if (checklistItem) {
            const taskNotesTextarea = checklistItem.querySelector('.task-notes');
            
            if (isCompleted) {
                checklistItem.classList.add('completed');
                
                // Add default completion text if textarea is empty or has placeholder text
                if (taskNotesTextarea && (!taskNotesTextarea.value.trim() || taskNotesTextarea.value.includes('Plaan:'))) {
                    const currentDate = new Date().toLocaleDateString('et-EE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    taskNotesTextarea.value = `Tegevus lõpetatud ${currentDate}. `;
                    
                    // Trigger auto-resize
                    window.autoResizeTextarea(taskNotesTextarea);
                }
            } else {
                checklistItem.classList.remove('completed');
                
                // Add planning text for incomplete tasks if textarea is empty or has completion text
                if (taskNotesTextarea && (!taskNotesTextarea.value.trim() || taskNotesTextarea.value.includes('Tegevus lõpetatud'))) {
                    // Check if it's just the default completion text and replace it
                    const currentDate = new Date().toLocaleDateString('et-EE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    const defaultCompletionText = `Tegevus lõpetatud ${currentDate}. `;
                    
                    if (taskNotesTextarea.value.trim() === defaultCompletionText.trim() || !taskNotesTextarea.value.trim()) {
                        taskNotesTextarea.value = 'Plaan: ';
                        
                        // Trigger auto-resize
                        window.autoResizeTextarea(taskNotesTextarea);
                    }
                }
            }
        }
    }

    // Make the function globally available for dynamic content
    window.initializeTaskCheckboxes = initializeTaskCheckboxes;

    // Task suggestions for better user experience
    const taskSuggestions = {
        cv_profiil: [
            "Uuenda CV-d viimase 6 kuu kogemusega",
            "Lisa LinkedIn profiilile uued oskused ja projektid", 
            "Koosta motivatsioonikiri sihtettevõttele",
            "Palun soovituskirju endistelt kolleegidelt"
        ],
        kandideerimine: [
            "Otsi sobivaid ametikohti CV Keskuses ja töötukassa lehelt",
            "Kandideeri vähemalt 3 ametikohale nädalas",
            "Jälgi vastuste saamist ja järelküsi vajadusel",
            "Säilita kandideerimiste ülevaade tabelis"
        ],
        võrgustik: [
            "Võta ühendust 5 endise kolleegiga",
            "Osale valdkonna networking üritustel",
            "Liitu erialasete LinkedIn gruppidega",
            "Järgi huvitavaid ettevõtteid sotsiaalmeedia"
        ],
        õppimine: [
            "Osale veebiseminaril projektijuhtimise teemal",
            "Loe vähemalt 2 erialaartiklit nädalas",
            "Soovita uut oskust või sertifikaati",
            "Uurin tööturul nõutud tehnoloogiaid"
        ],
        ettevalmistus: [
            "Valmista ette vastused tüüpilistele intervjuu küsimustele",
            "Uurin sihtettevõtte tausta ja väärtusi",
            "Ühenda oma kogemust ettevõtte vajadustega",
            "Valmista ette küsimused tööandja kohta"
        ]
    };

    const taskOutcomes = [
        "CV on täielikult ajakohastatud",
        "LinkedIn profiil on 100% täidetud",
        "Kandideerinud vähemalt 3 ametikohale",
        "Saanud 2 positiivset tagasisidet",
        "Loonud 5 uut professionaalset kontakti", 
        "Saanud uue sertifikaadi või tunnistuse",
        "Valmis järgmiseks intervjuuks",
        "Leidnud 3 sihtettevõtet",
        "Parandanud oma võrgustikku 20%",
        "Omandanud 2 uut oskust"
    ];

    // Function to get random task suggestion
    window.getRandomTaskSuggestion = function(category = null) {
        if (category && taskSuggestions[category]) {
            const suggestions = taskSuggestions[category];
            return suggestions[Math.floor(Math.random() * suggestions.length)];
        } else {
            // Get random suggestion from any category
            const allSuggestions = Object.values(taskSuggestions).flat();
            return allSuggestions[Math.floor(Math.random() * allSuggestions.length)];
        }
    };

    // Function to get random task outcome
    window.getRandomTaskOutcome = function() {
        return taskOutcomes[Math.floor(Math.random() * taskOutcomes.length)];
    };

    // Add click handler for task description field to show suggestions
    const taskDescriptionField = document.getElementById('task-description');
    if (taskDescriptionField) {
        taskDescriptionField.addEventListener('focus', function() {
            if (!this.value.trim()) {
                // Optionally populate with a random suggestion
                // this.value = window.getRandomTaskSuggestion();
            }
        });
    }

    // Add click handler for task outcome field to show suggestions  
    const taskOutcomeField = document.getElementById('task-outcome');
    if (taskOutcomeField) {
        taskOutcomeField.addEventListener('focus', function() {
            if (!this.value.trim()) {
                // Optionally populate with a random outcome
                // this.value = window.getRandomTaskOutcome();
            }
        });
    }

    // Initialize task checkboxes
    initializeTaskCheckboxes();

    // Observer to handle dynamically added tasks
    const taskObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Check if the added node contains checkboxes or is a checklist item
                        if (node.classList && node.classList.contains('checklist-item')) {
                            initializeTaskCheckboxes();
                        } else if (node.querySelector && node.querySelector('.checklist input[type="checkbox"]')) {
                            initializeTaskCheckboxes();
                        }
                    }
                });
            }
        });
    });

    // Start observing the checklist container for changes
    const checklistContainer = document.querySelector('.checklist');
    if (checklistContainer) {
        taskObserver.observe(checklistContainer, {
            childList: true,
            subtree: true
        });
    }

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

    window.closeModal = function(modal) {
        if (modal) modal.classList.remove('show');
    };

    // Make closeModal available globally for the handleJobSave function
    window.openModal = openModal;

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

    console.log('Job details save button found:', jobDetailsSaveBtn); // Debug log
    console.log('Job details cancel button found:', jobDetailsCancelBtn); // Debug log

    if (jobDetailsCancelBtn) {
        jobDetailsCancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Get modal element directly
            const jobDetailsModal = document.getElementById('job-details-modal');
            if (jobDetailsModal) {
                closeModal(jobDetailsModal);
            }
        });
    }

    if (jobDetailsSaveBtn) {
        jobDetailsSaveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Save button clicked'); // Debug log
            
            // Get modal element directly
            const jobDetailsModal = document.getElementById('job-details-modal');
            
            // Here you can add form validation and saving logic
            if (jobDetailsModal) {
                closeModal(jobDetailsModal);
            }
            
            // Show success modal with map
            const savedJobTitle = document.getElementById('saved-job-title');
            const jobDetailsTitle = document.getElementById('job-details-title');
            
            if (savedJobTitle && jobDetailsTitle) {
                savedJobTitle.textContent = jobDetailsTitle.textContent;
            }
            
            // Use the new function that initializes the map
            openJobSavedModal();
        });
    }

    // Add Job Application Modal Save Button Event Listener
    const saveJobApplicationBtn = document.getElementById('save-job-application');
    if (saveJobApplicationBtn) {
        saveJobApplicationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveJobApplication();
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

    // Ensure save button functionality is attached after DOM load
    setTimeout(() => {
        const saveBtn = document.getElementById('job-details-save');
        console.log('Delayed save button check:', saveBtn);
        if (saveBtn && !saveBtn.hasAttribute('data-listener-attached')) {
            saveBtn.setAttribute('data-listener-attached', 'true');
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Save button clicked (delayed handler)');
                
                const jobDetailsModal = document.getElementById('job-details-modal');
                if (jobDetailsModal) {
                    closeModal(jobDetailsModal);
                }
                
                const savedJobTitle = document.getElementById('saved-job-title');
                const jobDetailsTitle = document.getElementById('job-details-title');
                
                if (savedJobTitle && jobDetailsTitle) {
                    savedJobTitle.textContent = jobDetailsTitle.textContent;
                }
                
                openJobSavedModal();
            });
        }
    }, 500);
});

// Google Maps initialization
let map;
let marker;

// Global function to handle job save
window.handleJobSave = function() {
    console.log('handleJobSave function called');
    
    // Close the job details modal
    const jobDetailsModal = document.getElementById('job-details-modal');
    if (jobDetailsModal) {
        window.closeModal(jobDetailsModal);
        console.log('Job details modal closed');
    }
    
    // Get job information to update career dashboard
    const jobDetailsTitle = document.getElementById('job-details-title');
    const locationInput = document.getElementById('location-input');
    
    const jobTitle = jobDetailsTitle ? jobDetailsTitle.textContent : 'Projektijuht';
    const location = locationInput ? locationInput.value || 'Keila' : 'Keila';
    
    console.log('Job saved:', jobTitle, 'Location:', location);
    
    // Update career dashboard content with job-specific data
    updateCareerDashboardContent(jobTitle, location);
    
    // Open the career dashboard modal
    const careerDashboardModal = document.getElementById('career-dashboard-modal');
    if (careerDashboardModal) {
        window.openModal(careerDashboardModal);
        console.log('Career dashboard modal opened');
    }
};

// Function to update career dashboard content with job-specific data
function updateCareerDashboardContent(jobTitle, location) {
    const titleElement = document.getElementById('job-overview-title');
    const contentElement = document.getElementById('job-overview-content');
    
    if (titleElement) {
        titleElement.textContent = `${jobTitle} tööturu ülevaade (${location})`;
    }
    
    if (contentElement) {
        // Keep the existing content for now, but this could be dynamic based on job/location
        contentElement.innerHTML = `
            ${location}s ei ole projektijuhtide järele hetkel suurt tööjõupuudust, kuid tööpakkumisi lisandub aeg-ajalt. Tööjõubaromeetri andmetel on konkurents keskmine.
            <br><br>
            Viimaste tööpakkumiste põhjal on reklaamimüügi projektijuhi brutopalk Harjumaal vahemikus <span class="highlight">1550–2100 eurot</span>. Soovitame kaaluda kandideerimist ka seotud valdkondadesse, näiteks <span class="highlight">müügijuhi</span> või <span class="highlight">turundusspetsialisti</span> ametikohale, et suurendada sobivate tööpakkumiste arvu.
        `;
    }
}

function initRealGoogleMap() {
    // This function is for when you have a real Google Maps API key
    // Keila coordinates
    const keilaLocation = { lat: 59.3047, lng: 24.4128 };
    
    // Initialize map
    map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 12,
        center: keilaLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c8d7d4"
                    }
                ]
            }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    });

    // Add custom marker
    marker = new google.maps.Marker({
        position: keilaLocation,
        map: map,
        title: "Keila linn",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#046c63",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff"
        }
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="font-family: Inter, sans-serif; padding: 8px;">
                <h6 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #333;">Keila linn</h6>
                <p style="margin: 0; font-size: 12px; color: #666;">Harju maakond, Eesti</p>
            </div>
        `
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

// Job Listings Modal Functions
function openJobListingsModal() {
    // First close the career dashboard modal if it's open using the proper modal system
    const careerModal = document.getElementById('career-dashboard-modal');
    if (careerModal) {
        window.closeModal(careerModal);
    }
    
    // Then open the job listings modal
    const modal = document.getElementById('jobListingsModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeJobListingsModal() {
    const modal = document.getElementById('jobListingsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside the modal content
document.addEventListener('click', function(event) {
    const modal = document.getElementById('jobListingsModal');
    if (modal && event.target === modal) {
        closeJobListingsModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeJobListingsModal();
        closeJobFeedbackModal();
    }
});

// Job Feedback Modal Functions
function openJobFeedbackModal() {
    const modal = document.getElementById('jobFeedbackModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on the textarea
        const textarea = modal.querySelector('.feedback-textarea');
        if (textarea) {
            setTimeout(() => textarea.focus(), 100);
        }
    }
}

function closeJobFeedbackModal() {
    const modal = document.getElementById('jobFeedbackModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clear the textarea
        const textarea = modal.querySelector('.feedback-textarea');
        if (textarea) {
            textarea.value = '';
        }
    }
}

function submitJobFeedback() {
    const textarea = document.querySelector('#jobFeedbackModal .feedback-textarea');
    const feedback = textarea ? textarea.value.trim() : '';
    
    if (feedback) {
        // Here you would normally send the feedback to your server
        console.log('Job feedback submitted:', feedback);
        
        // Close the modal
        closeJobFeedbackModal();
        
        // Optionally show a success message
        alert('Tagasiside salvestatud. Pakkumine eemaldatud soovitustest.');
    } else {
        alert('Palun sisesta tagasiside.');
    }
}

// Close feedback modal when clicking outside
document.addEventListener('click', function(event) {
    const feedbackModal = document.getElementById('jobFeedbackModal');
    if (feedbackModal && event.target === feedbackModal) {
        closeJobFeedbackModal();
    }
});

// Job Search Notebook Functions
function updateStatusColor(selectElement) {
    // Remove only the status-specific classes, keep status-select class
    selectElement.className = selectElement.className.replace(/status-(vastuse-ootel|vastus-saadud|ei-sobi)/g, '');
    
    // Ensure the base status-select class is present
    if (!selectElement.className.includes('status-select')) {
        selectElement.className += ' status-select';
    }
    
    // Add the new status class based on selected value
    const statusClass = 'status-' + selectElement.value;
    selectElement.className += ' ' + statusClass;
}

// New Notebook Functions
let hasUnsavedChanges = false;

window.addEventListener('beforeunload', (event) => {
    if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = 'Teil on salvestamata muudatusi. Kas olete kindel, et soovite lahkuda?';
    }
});

function updateNotebookStatusColor(selectElement) {
    selectElement.className = 'status-select';
    selectElement.classList.add('status-' + selectElement.value);
}

function storeOriginalStatus(selectElement) {
    selectElement.closest('tr').dataset.originalStatus = selectElement.value;
}

function startNotebookEditing(selectElement) {
    const row = selectElement.closest('tr');
    if (row.classList.contains('is-editing')) return;
    
    hasUnsavedChanges = true;
    row.classList.add('is-editing');
    
    // Update status color
    updateNotebookStatusColor(selectElement);

    const reasonCell = row.querySelector('.reason-cell');
    row.dataset.originalReason = reasonCell.innerHTML; 
    
    const currentText = reasonCell.querySelector('.reason-text').textContent;
    
    // Create container for textarea and buttons
    const editContainer = document.createElement('div');
    editContainer.className = 'edit-container';
    
    const textarea = document.createElement('textarea');
    textarea.className = 'reason-textarea';
    textarea.value = currentText;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'edit-buttons';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-save';
    saveBtn.textContent = 'Salvesta';
    saveBtn.onclick = () => saveNotebookChanges(row);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn-cancel';
    cancelBtn.textContent = 'Loobu';
    cancelBtn.onclick = () => cancelNotebookChanges(row);
    
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);
    
    editContainer.appendChild(textarea);
    editContainer.appendChild(buttonContainer);
    
    reasonCell.innerHTML = '';
    reasonCell.appendChild(editContainer);
    
    textarea.focus();
}

function saveNotebookChanges(row) {
    if (!row.classList.contains('is-editing')) return;

    const reasonCell = row.querySelector('.reason-cell');
    const textarea = reasonCell.querySelector('textarea');
    const newText = textarea.value;

    const newSpan = document.createElement('span');
    newSpan.className = 'reason-text';
    newSpan.textContent = newText;
    
    reasonCell.innerHTML = '';
    reasonCell.appendChild(newSpan);
    
    row.classList.remove('is-editing');
    delete row.dataset.originalReason;
    delete row.dataset.originalStatus;
    
    if (document.querySelectorAll('.is-editing').length === 0) {
        hasUnsavedChanges = false;
    }
}

function cancelNotebookChanges(row) {
    if (!row.classList.contains('is-editing')) return;

    const reasonCell = row.querySelector('.reason-cell');
    reasonCell.innerHTML = row.dataset.originalReason;

    const select = row.querySelector('.status-select');
    select.value = row.dataset.originalStatus;
    updateNotebookStatusColor(select);
    
    row.classList.remove('is-editing');
    delete row.dataset.originalReason;
    delete row.dataset.originalStatus;

    if (document.querySelectorAll('.is-editing').length === 0) {
        hasUnsavedChanges = false;
    }
}

// Status dropdown color functionality removed

function updateAllStatusColors() {
    // Color functionality removed
}

// Hook into the existing startNotebookEditing function
const originalStartNotebookEditing = window.startNotebookEditing;
window.startNotebookEditing = function(element) {
    // Call original function
    if (originalStartNotebookEditing) {
        originalStartNotebookEditing(element);
    }
};

// Use event delegation to handle all status dropdown changes
document.addEventListener('change', function(event) {
    if (event.target.classList.contains('status-select')) {
        // Color functionality removed
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Debug log
    
    // Observer for dynamic content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Color functionality removed
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Job Application Modal Functions
window.openAddJobApplicationModal = function() {
    const modal = document.getElementById('add-job-application-modal');
    if (modal) {
        openModal(modal);
        // Set current date as default
        const dateInput = document.getElementById('app-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }
    }
};

window.saveJobApplication = function() {
    const jobTitle = document.getElementById('app-job-title').value.trim();
    const companyName = document.getElementById('app-company-name').value.trim();
    const date = document.getElementById('app-date').value;
    const status = document.getElementById('app-status').value;
    const contacts = document.getElementById('app-company-contacts').value.trim();
    const reasoning = document.getElementById('app-reasoning').value.trim();
    
    // Validate required fields
    //test-->
    if (!jobTitle || !companyName) {
        alert('Palun täida ametinimetus ja tööandja nimi.');
        return;
    }
    
    // Add new row to the notebook table
    const tableBody = document.querySelector('.notebook-table tbody');
    if (tableBody) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <div class="job-title">
                    <span class="editable-field">${jobTitle}</span>
                </div>
                <div class="company-name">
                    <span class="editable-field">${companyName}</span>
                </div>
            </td>
            <td class="contact-cell">
                <span class="contact-info editable-field">${contacts}</span>
            </td>
            <td>
                <span class="editable-field">${date}</span>
            </td>
            <td>
                <select class="status-dropdown">
                    <option value="Vastuse ootel" ${status === 'Vastuse ootel' ? 'selected' : ''}>Vastuse ootel</option>
                    <option value="Vastus saadud" ${status === 'Vastus saadud' ? 'selected' : ''}>Vastus saadud</option>
                    <option value="Ei sobi" ${status === 'Ei sobi' ? 'selected' : ''}>Ei sobi</option>
                </select>
            </td>
            <td>
                <span class="editable-field">${reasoning}</span>
            </td>
            <td>
                <span class="editable-field"></span>
            </td>
            <td></td>
        `;
        
        // Add the same editing functionality as existing rows
        const editableFields = newRow.querySelectorAll('.editable-field');
        editableFields.forEach(field => {
            field.setAttribute('contenteditable', 'true');
            field.addEventListener('focus', handleEditStart);
            field.addEventListener('blur', handleEditSave);
        });
        
        const statusDropdown = newRow.querySelector('.status-dropdown');
        if (statusDropdown) {
            statusDropdown.addEventListener('change', handleEditSave);
        }
        
        tableBody.appendChild(newRow);
    }
    
    // Clear form and close modal
    document.getElementById('app-job-title').value = '';
    document.getElementById('app-company-name').value = '';
    document.getElementById('app-company-contacts').value = '';
    document.getElementById('app-reasoning').value = '';
    document.getElementById('app-status').value = 'Vastuse ootel';
    
    const modal = document.getElementById('add-job-application-modal');
    if (modal) {
        closeModal(modal);
    }
};

// Job dropdown toggle functionality
function toggleJobDropdown(jobType) {
    const dropdown = document.getElementById(jobType + '-dropdown');
    if (!dropdown) return;
    
    // Find the specific arrow for this job wish item
    const jobWishItem = dropdown.closest('.job-wish-item');
    const arrow = jobWishItem ? jobWishItem.querySelector('.dropdown-arrow') : null;
    
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        if (arrow) arrow.style.transform = 'rotate(180deg)';
        if (jobWishItem) jobWishItem.classList.add('dropdown-open');
        
        // Calculate dynamic height based on dropdown content
        setTimeout(() => {
            const dropdownHeight = dropdown.offsetHeight;
            const dynamicMargin = dropdownHeight + 50; // Add 50px buffer
            if (jobWishItem) jobWishItem.style.marginBottom = dynamicMargin + 'px';
        }, 10);
        
    } else {
        dropdown.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
        if (jobWishItem) {
            jobWishItem.classList.remove('dropdown-open');
            jobWishItem.style.marginBottom = '8px'; // Reset to default
        }
    }
    
    // Close other dropdowns
    const allDropdowns = document.querySelectorAll('.job-dropdown');
    const allJobWishItems = document.querySelectorAll('.job-wish-item');
    
    allDropdowns.forEach((dd) => {
        if (dd !== dropdown) {
            dd.style.display = 'none';
            const parentJobWishItem = dd.closest('.job-wish-item');
            if (parentJobWishItem) {
                const parentArrow = parentJobWishItem.querySelector('.dropdown-arrow');
                if (parentArrow) parentArrow.style.transform = 'rotate(0deg)';
                parentJobWishItem.classList.remove('dropdown-open');
                parentJobWishItem.style.marginBottom = '8px'; // Reset to default
            }
        }
    });
}

// Self-Assessment History function
function openSelfAssessmentHistory() {
    // Create modal for self-assessment history
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show'; // Add 'show' class
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Enesehinnangu ajalugu</h2>
                <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="assessment-history">
                    <div class="history-item">
                        <div class="history-date">15.08.2025</div>
                        <div class="history-content">
                            <h4>Töövõime hindamine</h4>
                            <p><strong>Tulemus:</strong> Osalise töövõimega</p>
                            <p><strong>Soovitused:</strong> Sobivad lühemad tööpäevad ja paindlik tööaeg</p>
                            <div class="history-actions">
                                <button class="btn-outline">Vaata detaile</button>
                                <button class="btn-outline">Laadi alla PDF</button>
                            </div>
                        </div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">02.07.2025</div>
                        <div class="history-content">
                            <h4>Karjäärihuvi test</h4>
                            <p><strong>Tulemus:</strong> Sobivad valdkonnad: IT, analüütika, projektijuhtimine</p>
                            <p><strong>Soovitused:</strong> Täiendõpe andmeanalüüsis ja projektijuhtimises</p>
                            <div class="history-actions">
                                <button class="btn-outline">Vaata detaile</button>
                                <button class="btn-outline">Laadi alla PDF</button>
                            </div>
                        </div>
                    </div>
                    <div class="history-item">
                        <div class="history-date">20.05.2025</div>
                        <div class="history-content">
                            <h4>Oskuste hindamine</h4>
                            <p><strong>Tulemus:</strong> Kõrge tase: Excel, kommunikatsioon. Keskmine: projektijuhtimine</p>
                            <p><strong>Soovitused:</strong> Projektijuhtimise koolitus</p>
                            <div class="history-actions">
                                <button class="btn-outline">Vaata detaile</button>
                                <button class="btn-outline">Laadi alla PDF</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Employment Office Notifications function
function openEmploymentOfficeNotifications() {
    // Create modal for notifications
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show'; // Add 'show' class
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; position: relative;">
            <button class="modal-close-x" onclick="this.closest('.modal-overlay').remove()">×</button>
            <div class="modal-header">
                <h2>Teated töötukassalt</h2>
            </div>
            <div class="modal-body">
                <!-- Minu teated section -->
                <div class="notifications-section">
                    <div class="section-header">
                        <h3>Minu teated</h3>
                        <button class="btn btn-primary btn-small">Saada uus teade</button>
                    </div>
                    
                    <table class="notifications-table">
                        <thead>
                            <tr>
                                <th>Saadetud</th>
                                <th>Saatja</th>
                                <th>Teema</th>
                                <th>Vastus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>08.09.2025 15:16</td>
                                <td>Mari Maasikas</td>
                                <td><a href="#" class="notification-link">Koolitus</a></td>
                                <td>08.09.2025 15:17</td>
                            </tr>
                            <tr>
                                <td>08.09.2025 15:17</td>
                                <td>Kaisa Karu</td>
                                <td><a href="#" class="notification-link">E-päevik</a></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Teated section -->
                <div class="notifications-section">
                    <h3>Teated</h3>
                    
                    <div class="notification-card">
                        <h4><a href="#" class="notification-title-link">Töövõimetoetuse taotlus (TVT20000000)</a></h4>
                        <p class="notification-date">Taotlus esitatud: 29.08.2025</p>
                        <p class="notification-status">Otsus: <span class="status-pending">Puudustega. Puuduste likvideerimise tähtaeg on 09.09.2025.</span></p>
                    </div>
                    
                    <div class="notification-card">
                        <h4><a href="#" class="notification-title-link">Töövõimetoetuse taotlus (TVT000000)</a></h4>
                        <p class="notification-date">Taotlus esitatud: 21.04.2025</p>
                        <p class="notification-status">Otsus: Menetluse lõpetamine (29.08.2025, nr TVT25/00000)</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
// Documents Modal function
function openDocumentsModal() {
    // Create modal for submitted documents
    const modal = document.createElement('div');
    modal.className = 'modal-overlay show';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Edastatud dokumendid</h2>
                <button class="close-modal" onclick="this.closest('.modal-overlay').remove()"></button>
            </div>
            <div class="modal-body">
                <div class="documents-list">
                    <div class="document-item">
                        <div class="document-info">
                            <div class="document-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 6.75H9m-1.5-1.5v3m0 0h3m0 0v1.5a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-9A1.5 1.5 0 016 7.5h3v1.5z" />
                                </svg>
                            </div>
                            <div class="document-details">
                                <h4>CV_Kaisa_Karu_2025.pdf</h4>
                                <p>Edastatud: 05.09.2025 | Staatus: <span class="status-received">Vastu v�etud</span></p>
                                <p>N�ustaja: Kadri J�gi</p>
                            </div>
                        </div>
                        <div class="document-actions">
                            <button class="btn-outline">Vaata</button>
                            <button class="btn-outline">Laadi alla</button>
                        </div>
                    </div>
                    
                    <div class="document-item">
                        <div class="document-info">
                            <div class="document-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 6.75H9m-1.5-1.5v3m0 0h3m0 0v1.5a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-9A1.5 1.5 0 016 7.5h3v1.5z" />
                                </svg>
                            </div>
                            <div class="document-details">
                                <h4>Motivatsioonikiri_IT_projektijuht.pdf</h4>
                                <p>Edastatud: 03.09.2025 | Staatus: <span class="status-pending">Ootel</span></p>
                                <p>N�ustaja: Kadri J�gi</p>
                            </div>
                        </div>
                        <div class="document-actions">
                            <button class="btn-outline">Vaata</button>
                            <button class="btn-outline">Laadi alla</button>
                        </div>
                    </div>
                    
                    <div class="document-item">
                        <div class="document-info">
                            <div class="document-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 6.75H9m-1.5-1.5v3m0 0h3m0 0v1.5a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-9A1.5 1.5 0 016 7.5h3v1.5z" />
                                </svg>
                            </div>
                            <div class="document-details">
                                <h4>T��kogemuse_t�end_2020-2024.pdf</h4>
                                <p>Edastatud: 28.08.2025 | Staatus: <span class="status-received">Vastu v�etud</span></p>
                                <p>N�ustaja: Kadri J�gi</p>
                            </div>
                        </div>
                        <div class="document-actions">
                            <button class="btn-outline">Vaata</button>
                            <button class="btn-outline">Laadi alla</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
