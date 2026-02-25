# Personal Academic Website

A modern, professional academic website with a clean design and easy-to-update structure.

## Structure

- `index.html` - Main HTML structure
- `cv.html` - Curriculum Vitae page
- `data.json` - All content data including publications (easy to update)
- `assets/css/main.css` - Modern CSS styling with dark/light theme support
- `assets/js/main.js` - JavaScript for dynamic content loading

## How to Update Content

### Easy Updates via `data.json`

Most content can be updated by editing `data.json`:

1. **Personal Information**: Update name, title, photo, location, social links
2. **About**: Update bio paragraphs
3. **Experience**: Update work experience in the `experience` array
4. **Research Interests**: Update research areas in the `research` array
5. **Publications**: Add/remove publications in the `publications` array
6. **Contact**: Update contact intro text

### Example: Adding a Publication

```json
{
  "id": "pub-example",
  "year": "2025",
  "venue": "Conference Name 2025",
  "title": "Paper Title",
  "url": "https://paper-url.com",
  "authors": "Author 1, Author 2, <strong>Wang Bin</strong>, Author 3",
  "tags": ["foundation-models"],
  "tagLabels": ["Foundation Models"],
  "links": [
    { "type": "github", "url": "https://github.com/...", "label": "Code" },
    { "type": "project", "url": "https://project-page.com", "label": "Project" }
  ]
}
```

### Example: Adding an Experience

```json
{
  "date": "2024 — Present",
  "role": "Research Scientist",
  "organization": "Organization Name"
}
```

## Customization

### Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
    --bg-primary: #0a0a0f;
    --accent-primary: #6366f1;
    --accent-secondary: #8b5cf6;
    /* ... */
}
```

### Fonts

The site uses:
- **Inter** for body text (modern, clean)
- **JetBrains Mono** for monospace elements

Fonts are loaded from Google Fonts CDN. Change fonts in `index.html` by updating the Google Fonts link and in `assets/css/main.css` by updating the `--font-primary` and `--font-mono` variables.

## Features

- Responsive design (mobile-friendly)
- Dark/Light mode with smooth transitions
- Smooth scrolling navigation
- Dynamic content loading from JSON
- Modern, professional design
- Animated background effects
- Publication filtering by research area
- Semantic HTML structure
- Fast loading (no frameworks, vanilla JS)

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## License

Personal website - feel free to use as a template for your own academic site!
