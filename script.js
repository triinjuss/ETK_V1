document.addEventListener('DOMContentLoaded', function() {
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
