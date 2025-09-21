# ETK_V1 - Estonian Employment Services Interface

## Project Overview

This is a comprehensive web application for the Estonian Unemployment Insurance Fund (ETK) providing job seekers with career planning tools, job matching, and employment services. The interface is entirely in Estonian and serves as a personalized dashboard for unemployed individuals.

## Architecture & Key Components

### Core Application Structure
- **index.html** - Main dashboard with user profile, job recommendations, career planning tools
- **minuCV.html** - CV builder and management interface  
- **Individual job pages** (1ITprojektijuht.html, 2CloudPoint.html, etc.) - Dedicated application pages for specific positions
- **styles.css** - Single comprehensive stylesheet (7400+ lines)
- **script.js** - Main JavaScript functionality (1900+ lines)

### Key Features
1. **AI-Powered Recommendations** - Multiple "AI" buttons trigger contextual modals with personalized suggestions
2. **Job Matching System** - Dynamic job cards with compatibility percentages
3. **Career Planning** - SMART goal setting, task management, self-assessment tools
4. **Skills Management** - Interactive skill bars, competency tracking
5. **Application Tracking** - Comprehensive notebook for job applications
6. **Modal-Heavy Interface** - Extensive use of overlays for detailed interactions

## CSS Architecture & Design System

### Color Scheme (Estonian Government Branding)
```css
--primary-color: #046C63;     /* Primary teal/green */
--accent-color: #f7923a;      /* Orange accents */
--secondary-color: #f8f9fa;   /* Light backgrounds */
--text-color: #293439;        /* Dark gray text */
```

### Component Patterns
- **Cards**: `.card` - Primary content containers with consistent padding/shadows
- **Buttons**: `.btn` with variants (`.btn-primary`, `.btn-secondary`, `.btn-outline`)
- **Modals**: `.modal-overlay` + `.modal-content` - Complex layered interfaces
- **Form Elements**: Consistent styling for inputs, textareas, selects
- **Status Indicators**: Color-coded tags and progress bars

### Layout System
- **CSS Grid/Flexbox** - No external CSS frameworks
- **Responsive Design** - Mobile-first approach with media queries
- **Card-based Layout** - Dashboard uses card grid system
- **Sidebar Layout** - Two-column structure on main page

## JavaScript Architecture

### Key Patterns
1. **Modal Management** - Centralized modal open/close functions with overlay handling
2. **Dynamic Content** - JavaScript-populated job data and recommendations  
3. **Form Auto-resize** - Automatic textarea resizing based on content
4. **Task Management** - Checkbox state management with completion tracking
5. **Status Updates** - Dynamic styling updates for application statuses

### Event Handling
- Heavy use of event delegation for dynamic content
- Custom checkbox and form interactions
- Modal trigger system with data attributes

### Data Management
- Job data stored in JavaScript objects
- No external API calls - all data is static/demo
- Local state management for form interactions

## Estonian Language Considerations

### UI Text Patterns
- **Buttons**: "Kandideeri" (Apply), "Jätan meelde" (Save), "Ei sobi" (Doesn't fit)
- **Status**: "Vastuse ootel" (Awaiting response), "Vastus saadud" (Response received)
- **Sections**: "Minu plaan" (My plan), "Töösoovid" (Job wishes), "Oskused" (Skills)

### Content Structure
- Formal tone throughout
- Government service language conventions
- Detailed explanatory text for complex features

## File Naming Conventions

### HTML Files
- **index.html** - Main entry point
- **Numbered prefixes** (1ITprojektijuht.html, 2CloudPoint.html) - Job-specific pages
- **Feature names** (minuCV.html, teenused.html) - Functional pages
- **Estonian names** throughout

### Asset Organization
- **Flat file structure** - All files in root directory
- **Descriptive names** - Clear purpose indication
- **Image files** - Mix of PNG and JPG, Estonian naming

## Development Workflow

### Key Files to Understand First
1. **index.html** - Review the complete user journey and modal structure
2. **styles.css** - Understand the CSS custom properties and component system
3. **script.js** - Learn the modal management and event handling patterns

### Adding New Features
1. **Follow modal pattern** - Use existing `.modal-overlay` + `.modal-content` structure
2. **Maintain Estonian UI** - All user-facing text in Estonian
3. **Use existing color variables** - Leverage the design system
4. **Test responsive behavior** - Ensure mobile compatibility

### Debugging Common Issues
- **Modal conflicts** - Check z-index and overlay management
- **Styling inconsistencies** - Verify CSS custom property usage
- **Form behavior** - Test auto-resize and validation logic
- **Estonian characters** - Ensure proper UTF-8 encoding

## Integration Points

### Government Services Context
- Designed for Estonian Unemployment Insurance Fund workflow
- Integrates with job board systems (conceptually)
- Supports case worker interactions via the interface
- Compliance with Estonian digital government standards

### External Dependencies
- **Google Fonts** - Inter font family
- **No JavaScript frameworks** - Vanilla JS implementation
- **No CSS frameworks** - Custom design system

## Best Practices for This Codebase

1. **Maintain Estonian language** throughout user interface
2. **Follow established modal patterns** for new features
3. **Use CSS custom properties** for consistent theming
4. **Test thoroughly on mobile** due to complex modal interactions
5. **Preserve government service tone** in content and interactions
6. **Keep accessibility in mind** - form labels, modal focus management
7. **Follow existing naming conventions** for files and CSS classes

## Testing Considerations

- **Cross-browser compatibility** - Government service requirements
- **Mobile responsiveness** - Complex modal system needs thorough testing
- **Form validation** - Critical for employment service workflows
- **Estonian text rendering** - Special characters and long words
- **Print styles** - Government services often require printable formats