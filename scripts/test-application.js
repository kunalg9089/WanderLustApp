const http = require('http');

console.log('🧪 Testing WanderLust Application...');
console.log('==================================');

// Test if the application is responding
const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET',
    timeout: 5000
};

const req = http.request(options, (res) => {
    console.log(`✅ Application is running! Status: ${res.statusCode}`);
    console.log(`🌐 URL: http://localhost:8080`);
    console.log('');
    console.log('🎉 Your WanderLust application is working!');
    console.log('');
    console.log('📧 Email Configuration Status:');
    console.log('   - Sender: kunalgaikwad5533@gmail.com');
    console.log('   - Password: kunalgaikwad9089 (needs real App Password)');
    console.log('');
    console.log('🔧 To fix email functionality:');
    console.log('   1. Go to https://myaccount.google.com/');
    console.log('   2. Security → 2-Step Verification → App passwords');
    console.log('   3. Generate new app password for "Mail"');
    console.log('   4. Copy the 16-character password');
    console.log('   5. Run: node scripts/update-smtp-password.js');
    console.log('');
    console.log('🚀 You can now test the application at: http://localhost:8080');
});

req.on('error', (error) => {
    console.log('❌ Application is not responding');
    console.log('Error:', error.message);
    console.log('');
    console.log('🔧 Try starting the application with: npm start');
});

req.on('timeout', () => {
    console.log('⏰ Request timed out - application might be starting');
    console.log('🔧 Check if the application is running on port 8080');
});

req.end();

