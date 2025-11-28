# Real Estate Search - Frontend Take-Home Assignment

Welcome! In this assignment, you'll build a property search interface for a real estate platform.

## Time Consideration

**Maximum Time: 4-6 hours**

We value your time! If this assignment takes you more than 6 hours, please submit whatever you have at that point. Focus on quality over quantity - we'd rather see a few features done well than everything done poorly.

Be sure to include a README explaining what you prioritized and what you'd improve with more time.

## Design Reference

Access the Figma design here: [INSERT YOUR FIGMA LINK]

You'll need to sign in to Figma to view the design details (colors, spacing, fonts). Your implementation should match the design as closely as possible. If you choose to deviate from the design, please explain your reasoning in your README.

**Note:** The design shows the desktop layout. You'll need to create a reasonable mobile layout yourself.

## What We're Providing

1. **Property Data**: A JSON file (`properties.json`) with 40 property listings
2. **Project Structure**: Feel free to use any framework (React, Vue, Svelte, etc.) or start from scratch
3. **Libraries**: You may use any libraries you prefer. We won't penalize you for using component libraries or UI frameworks

## Getting Started

1. Fork this repository
2. Set up your project in the `client` directory
3. The property data is located at `data/properties.json`
4. Install dependencies and start coding!

## Tasks Overview

Complete these tasks in order. If you can't finish everything, that's okay - we prioritize quality over completeness.

### Must Complete (Core Requirements)

1. **Property Grid**
   - Display properties in a responsive grid layout
   - Each card should show: image, title, location, price, and favorite button
   - Match the design as closely as possible

2. **Type of Place Filter**
   - Implement checkbox filtering for property types
   - "All" checkbox should deselect other options when checked
   - Checking any specific type should uncheck "All"
   - Filter the property grid based on selections

3. **Features Filter**
   - Implement multi-select checkboxes for property features
   - Properties should match if they have ALL selected features

4. **Responsive Layout**
   - Make the layout work on mobile devices (320px+)
   - Consider a drawer/modal for filters on mobile

### Should Complete (Expected for Strong Candidates)

5. **Price Range Slider**
   - Implement a dual-handle range slider
   - Sync slider with the $100 and $10000 input fields
   - You may use a library (e.g., rc-slider, react-range) or build it yourself
   - Filter properties within the selected price range

6. **Size Filter**
   - Implement Min and Max square footage inputs
   - Validate that Min doesn't exceed Max
   - Filter properties within the size range

7. **Empty States**
   - Show a message when no properties match the filters
   - Consider adding a "Clear Filters" button

8. **Favorite Toggle**
   - Heart icon should toggle between filled/unfilled state
   - State should persist during the session (doesn't need to persist after refresh)

### Bonus (Nice to Have)

9. **Smooth Animations**
   - Animate filter panel open/close on mobile
   - Fade in/out properties when filters change
   - Smooth transitions on hover states

10. **Advanced State Management**
    - Persist filter state in URL query parameters
    - Allow sharing filtered results via URL

11. **Loading States**
    - Simulate async filtering with a brief loading state
    - Show skeleton screens while "loading"

12. **Accessibility**
    - Keyboard navigation for filters
    - Proper ARIA labels
    - Focus management

## Property Data Structure

Each property in `properties.json` has the following structure:

```json
{
  "id": "prop_001",
  "title": "Modern Downtown Loft",
  "type": "Apartment",
  "price": 3500,
  "size": 1200,
  "location": "San Francisco",
  "image": "https://example.com/image.jpg",
  "features": ["Ac & Heating", "Dishwasher", "Pool"]
}
```

### Available Property Types:
- Building
- Apartment
- Office
- Shop
- House

### Available Features:
- Ac & Heating
- Dishwasher
- Balcony
- Fitness Center
- Clubhouse
- Spa
- Pool
- Valet Parking

## Technical Requirements

- Use modern JavaScript (ES6+)
- Write clean, maintainable code
- Use semantic HTML
- Ensure responsive design
- Handle edge cases gracefully

## Evaluation Criteria

We'll evaluate your submission based on:

1. **Code Quality** (30%)
   - Clean, readable, well-organized code
   - Appropriate component structure
   - Proper separation of concerns
   - Good naming conventions

2. **Functionality** (25%)
   - Do the filters work correctly?
   - Is the filtering logic sound?
   - Are edge cases handled?

3. **Design Implementation** (20%)
   - How closely does it match the Figma design?
   - Attention to detail (spacing, colors, typography)
   - Responsive behavior

4. **User Experience** (15%)
   - Intuitive interactions
   - Smooth transitions
   - Loading and empty states
   - Error handling

5. **State Management** (10%)
   - Appropriate choice of state management approach
   - Efficient re-renders
   - Clean data flow

## Submission Guidelines

**Please do not submit a pull request to this repository.**

1. Complete your work in your forked repository
2. Include a README.md that explains:
   - How to install and run your project
   - What you prioritized and why
   - What you would improve/do differently with more time
   - Any assumptions you made
   - Libraries you chose and why
3. Ensure your code runs based on the instructions in your README
4. Share the URL to your GitHub repository with us

## Questions?

If you have any questions or need clarification, please reach out to [INSERT CONTACT EMAIL]. We're happy to help!

Good luck, and we look forward to seeing your work! 🏡
