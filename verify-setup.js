#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if everything is configured correctly
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const checks = [];
let passed = 0;
let failed = 0;

function check(name, condition, successMsg, failMsg, fix = '') {
  checks.push({ name, condition, successMsg, failMsg, fix });
}

console.log('\n🔍 Verifying Portfolio Setup...\n');

// Check 1: Node modules
check(
  'Frontend Dependencies',
  existsSync('node_modules'),
  '✅ Frontend dependencies installed',
  '❌ Frontend dependencies missing',
  'Run: npm install'
);

// Check 2: Backend node modules
check(
  'Backend Dependencies',
  existsSync('server/node_modules'),
  '✅ Backend dependencies installed',
  '❌ Backend dependencies missing',
  'Run: cd server && npm install'
);

// Check 3: Frontend .env
check(
  'Frontend Environment',
  existsSync('.env'),
  '✅ Frontend .env file exists',
  '❌ Frontend .env file missing',
  'Create .env file with: VITE_API_URL=http://localhost:5000/api'
);

// Check 4: Backend .env
check(
  'Backend Environment',
  existsSync('server/.env'),
  '✅ Backend .env file exists',
  '❌ Backend .env file missing',
  'Copy server/.env.example to server/.env'
);

// Check 5: MongoDB URI configured
if (existsSync('server/.env')) {
  const envContent = readFileSync('server/.env', 'utf-8');
  const hasMongoURI = envContent.includes('MONGODB_URI=');
  const isConfigured = hasMongoURI && !envContent.includes('MONGODB_URI=mongodb://localhost:27017/portfolio');
  
  check(
    'MongoDB Configuration',
    isConfigured,
    '✅ MongoDB URI configured (Atlas or custom)',
    '⚠️  Using default local MongoDB URI',
    'Update MONGODB_URI in server/.env with your MongoDB Atlas connection string'
  );
}

// Check 6: Server files
check(
  'Backend Server',
  existsSync('server/server.js'),
  '✅ Backend server file exists',
  '❌ Backend server file missing'
);

// Check 7: Models
check(
  'Database Models',
  existsSync('server/models/User.js'),
  '✅ Database models exist',
  '❌ Database models missing'
);

// Check 8: Controllers
check(
  'API Controllers',
  existsSync('server/controllers/authController.js'),
  '✅ API controllers exist',
  '❌ API controllers missing'
);

// Check 9: Frontend pages
check(
  'Frontend Pages',
  existsSync('src/pages/HomePage.tsx'),
  '✅ Frontend pages exist',
  '❌ Frontend pages missing'
);

// Check 10: Auth context
check(
  'Authentication Context',
  existsSync('src/context/AuthContext.tsx'),
  '✅ Authentication context exists',
  '❌ Authentication context missing'
);

// Run all checks
console.log('Running checks...\n');

checks.forEach(({ name, condition, successMsg, failMsg, fix }) => {
  if (condition) {
    console.log(successMsg);
    passed++;
  } else {
    console.log(failMsg);
    if (fix) {
      console.log(`   Fix: ${fix}`);
    }
    failed++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('✅ All checks passed! Your setup looks good.\n');
  console.log('📋 Next Steps:');
  console.log('   1. Make sure MongoDB is running (local or Atlas)');
  console.log('   2. Seed the database: cd server && npm run seed');
  console.log('   3. Start backend: cd server && npm run dev');
  console.log('   4. Start frontend: npm run dev');
  console.log('   5. Login at http://localhost:3000/login');
  console.log('      Email: admin@portfolio.com');
  console.log('      Password: admin123\n');
} else {
  console.log('⚠️  Some checks failed. Please fix the issues above.\n');
  console.log('📚 Documentation:');
  console.log('   - START_HERE.md - Quick start guide');
  console.log('   - setup-mongodb-atlas.md - MongoDB Atlas setup');
  console.log('   - COMPLETE_SETUP.md - Detailed setup guide\n');
}

console.log('='.repeat(60) + '\n');
