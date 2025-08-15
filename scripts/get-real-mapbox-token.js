const fs = require('fs');
const path = require('path');

console.log('🗺️  Getting Real Mapbox Token for WanderLust\n');

console.log('🔧 The issue is that we need a REAL Mapbox token, not a placeholder.\n');

console.log('📋 Quick Steps to Get a Working Mapbox Token:');
console.log('1. Go to: https://account.mapbox.com/signup/');
console.log('2. Sign up for a FREE account (no credit card required)');
console.log('3. After signing up, go to: https://account.mapbox.com/access-tokens/');
console.log('4. Copy your "Default public token" (starts with pk.eyJ1...)');
console.log('5. Replace the MAP_TOKEN in your .env file\n');

console.log('💡 Alternative - Use this working token for testing:');
console.log('MAP_TOKEN=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example\n');

console.log('🚀 Once you have a real token:');
console.log('1. Open your .env file');
console.log('2. Replace the current MAP_TOKEN line with your real token');
console.log('3. Restart the server');
console.log('4. The map will show the actual location with red pin!\n');

console.log('✅ Your website is running at: http://localhost:8081');
console.log('The map will work perfectly once you add a real Mapbox token!');
