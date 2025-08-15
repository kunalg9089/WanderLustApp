#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗺️  Adding Mapbox token to .env file...');

try {
    const envPath = path.join(__dirname, '..', '.env');
    
    // Read current .env content
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Add Mapbox token if it doesn't exist
    if (!envContent.includes('MAP_TOKEN=')) {
        envContent += '\n# Mapbox Configuration (Required for maps and geocoding)\n';
        envContent += '# Get your access token from: https://account.mapbox.com/access-tokens/\n';
        envContent += 'MAP_TOKEN=pk.eyJ1Ijoia3VuYWxnYWlrd2FkNTUzMyIsImEiOiJjbHZ6Z2Z6Z2Z6Z2Z6In0.example\n';
    }
    
    // Write back to .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ Mapbox token added to .env file!');
    console.log('\n📋 Next steps:');
    console.log('1. Get your Mapbox access token from: https://account.mapbox.com/access-tokens/');
    console.log('2. Replace the example token with your actual token');
    console.log('3. Restart your server: npm run dev');
    
} catch (error) {
    console.error('❌ Error adding Mapbox token:', error);
}
