const fs = require('fs');
const path = require('path');

console.log('🎨 Creating WanderLust Favicon...');

// Create a compass favicon matching the second image design
const svgFavicon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <!-- Red circle background -->
  <circle cx="16" cy="16" r="15" fill="#ff0000" stroke="#fff" stroke-width="1"/>
  
  <!-- White compass rose -->
  <!-- Main cross lines -->
  <line x1="16" y1="4" x2="16" y2="28" stroke="#fff" stroke-width="2"/>
  <line x1="4" y1="16" x2="28" y2="16" stroke="#fff" stroke-width="2"/>
  
  <!-- Diagonal lines for compass points -->
  <line x1="8" y1="8" x2="24" y2="24" stroke="#fff" stroke-width="1.5"/>
  <line x1="24" y1="8" x2="8" y2="24" stroke="#fff" stroke-width="1.5"/>
  
  <!-- Center dot -->
  <circle cx="16" cy="16" r="2" fill="#fff"/>
</svg>
`;

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'src', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Save the SVG favicon
const faviconPath = path.join(publicDir, 'favicon.svg');
fs.writeFileSync(faviconPath, svgFavicon);

// Create a simple HTML favicon reference
const faviconHTML = `
<!-- WanderLust Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/favicon.svg">
<meta name="theme-color" content="#ff6b6b">
`;

console.log('✅ Favicon created successfully!');
console.log('📁 Location:', faviconPath);
console.log('');
console.log('🔧 Next steps:');
console.log('1. Add the following HTML to your layout file (usually in src/views/layouts/ or similar):');
console.log('');
console.log(faviconHTML);
console.log('');
console.log('2. The favicon should now appear in your browser tab');
console.log('3. If you want a different design, you can modify the SVG in the script');
