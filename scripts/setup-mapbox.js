const fs = require('fs');
const path = require('path');

console.log('🗺️  Setting up Mapbox for WanderLust...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
    console.log('✅ .env file found');
    
    // Read existing .env content
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if MAP_TOKEN already exists
    if (envContent.includes('MAP_TOKEN=')) {
        console.log('✅ MAP_TOKEN already configured in .env file');
        console.log('Current MAP_TOKEN line:', envContent.split('\n').find(line => line.startsWith('MAP_TOKEN=')));
    } else {
        console.log('⚠️  MAP_TOKEN not found in .env file');
        console.log('Please add the following line to your .env file:');
        console.log('MAP_TOKEN=your_mapbox_public_token_here');
    }
} else {
    console.log('⚠️  .env file not found');
    console.log('Please create a .env file in the root directory with:');
    console.log('MAP_TOKEN=your_mapbox_public_token_here');
}

console.log('\n📋 To get a Mapbox token:');
console.log('1. Go to https://account.mapbox.com/');
console.log('2. Sign up or log in to your Mapbox account');
console.log('3. Navigate to "Access tokens"');
console.log('4. Create a new token or copy your default public token');
console.log('5. Add it to your .env file as: MAP_TOKEN=your_token_here');

console.log('\n🔧 For now, the map will show a fallback display with location information.');
console.log('Once you add the MAP_TOKEN, the interactive Mapbox map will work properly.');

console.log('\n📍 All listings now have real coordinates:');
console.log('- Malibu: [-118.6919, 34.0259]');
console.log('- New York City: [-74.006, 40.7128]');
console.log('- Florence: [11.2558, 43.7696]');
console.log('- Tokyo: [139.6917, 35.6895]');
console.log('- And many more locations...');

console.log('\n✅ Map setup complete!');
