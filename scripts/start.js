#!/usr/bin/env node

/**
 * 🚀 WanderLust Application Startup Script
 * 
 * This script provides a professional way to start the application
 * with proper environment checking and graceful error handling.
 */

const { spawn } = require('child_process');
const path = require('path');

// ANSI color codes for beautiful console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

const logo = `
${colors.cyan}${colors.bright}
  ██╗    ██╗ █████╗ ███╗   ██╗██████╗ ███████╗██████╗ ██╗     ██╗   ██╗███████╗████████╗
  ██║    ██║██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗██║     ██║   ██║██╔════╝╚══██╔══╝
  ██║ █╗ ██║███████║██╔██╗ ██║██║  ██║█████╗  ██████╔╝██║     ██║   ██║███████╗   ██║   
  ██║███╗██║██╔══██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗██║     ██║   ██║╚════██║   ██║   
  ╚███╔███╔╝██║  ██║██║ ╚████║██████╔╝███████╗██║  ██║███████╗╚██████╔╝███████║   ██║   
   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝   ╚═╝   
${colors.reset}
`;

console.log(logo);
console.log(`${colors.green}${colors.bright}🌟 Travel & Adventure Platform - MVC Architecture${colors.reset}`);
console.log(`${colors.yellow}📁 Starting application with industry-standard folder structure...${colors.reset}\n`);

// Check if .env file exists
const fs = require('fs');
const envPath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envPath)) {
    console.log(`${colors.red}❌ Error: .env file not found!${colors.reset}`);
    console.log(`${colors.yellow}💡 Please create a .env file with the required environment variables.${colors.reset}`);
    console.log(`${colors.cyan}📖 See PAYMENT_SETUP.md for setup instructions.${colors.reset}\n`);
    process.exit(1);
}

// Start the application
console.log(`${colors.blue}🚀 Launching WanderLust...${colors.reset}`);
console.log(`${colors.magenta}📡 Server will be available at: http://localhost:8080${colors.reset}\n`);

const appPath = path.join(__dirname, '..', 'app.js');
const child = spawn('node', [appPath], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
});

child.on('error', (error) => {
    console.log(`${colors.red}❌ Failed to start application: ${error.message}${colors.reset}`);
    process.exit(1);
});

child.on('exit', (code) => {
    if (code !== 0) {
        console.log(`${colors.red}❌ Application exited with code ${code}${colors.reset}`);
        process.exit(code);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log(`\n${colors.yellow}🛑 Shutting down WanderLust gracefully...${colors.reset}`);
    child.kill('SIGINT');
});

process.on('SIGTERM', () => {
    console.log(`\n${colors.yellow}🛑 Received SIGTERM, shutting down...${colors.reset}`);
    child.kill('SIGTERM');
});
