/**
 * Backend Structure Test Script
 * This tests that all files exist and are properly structured
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing BestLife Backend Structure...\n');

let passed = 0;
let failed = 0;

// Test function
function testFileExists(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`);
    passed++;
    return true;
  } else {
    console.log(`❌ ${description} - File not found: ${filePath}`);
    failed++;
    return false;
  }
}

function testRequire(filePath, description) {
  try {
    require(filePath);
    console.log(`✅ ${description}`);
    passed++;
    return true;
  } catch (error) {
    console.log(`❌ ${description} - ${error.message}`);
    failed++;
    return false;
  }
}

console.log('📁 Testing File Structure:\n');

// Config files
testFileExists('config/db.js', 'Database config exists');
testFileExists('config/email.js', 'Email config exists');

// Models
testFileExists('models/User.js', 'User model exists');
testFileExists('models/Product.js', 'Product model exists');
testFileExists('models/Order.js', 'Order model exists');

// Middleware
testFileExists('middleware/auth.js', 'Auth middleware exists');
testFileExists('middleware/admin.js', 'Admin middleware exists');

// Controllers
testFileExists('controllers/authController.js', 'Auth controller exists');
testFileExists('controllers/productController.js', 'Product controller exists');
testFileExists('controllers/orderController.js', 'Order controller exists');
testFileExists('controllers/userController.js', 'User controller exists');
testFileExists('controllers/adminController.js', 'Admin controller exists');
testFileExists('controllers/contactController.js', 'Contact controller exists');

// Routes
testFileExists('routes/authRoutes.js', 'Auth routes exist');
testFileExists('routes/productRoutes.js', 'Product routes exist');
testFileExists('routes/orderRoutes.js', 'Order routes exist');
testFileExists('routes/userRoutes.js', 'User routes exist');
testFileExists('routes/adminRoutes.js', 'Admin routes exist');
testFileExists('routes/contactRoutes.js', 'Contact routes exist');

// Main files
testFileExists('server.js', 'Server file exists');
testFileExists('seed.js', 'Seed file exists');
testFileExists('package.json', 'Package.json exists');

console.log('\n🔍 Testing Code Syntax:\n');

// Test if files can be required (syntax check)
testRequire('./config/db.js', 'Database config is valid');
testRequire('./config/email.js', 'Email config is valid');
testRequire('./models/User.js', 'User model is valid');
testRequire('./models/Product.js', 'Product model is valid');
testRequire('./models/Order.js', 'Order model is valid');
testRequire('./middleware/auth.js', 'Auth middleware is valid');
testRequire('./middleware/admin.js', 'Admin middleware is valid');

console.log('\n📦 Testing Package.json:\n');

try {
  const pkg = require('./package.json');
  const requiredDeps = [
    'express',
    'mongoose',
    'dotenv',
    'cors',
    'bcryptjs',
    'jsonwebtoken',
    'nodemailer',
    'multer'
  ];

  requiredDeps.forEach(dep => {
    if (pkg.dependencies && pkg.dependencies[dep]) {
      console.log(`✅ Dependency installed: ${dep}`);
      passed++;
    } else {
      console.log(`❌ Missing dependency: ${dep}`);
      failed++;
    }
  });

  if (pkg.scripts && pkg.scripts.start) {
    console.log('✅ Start script configured');
    passed++;
  } else {
    console.log('❌ Start script missing');
    failed++;
  }

  if (pkg.scripts && pkg.scripts.dev) {
    console.log('✅ Dev script configured');
    passed++;
  } else {
    console.log('❌ Dev script missing');
    failed++;
  }

} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  failed++;
}

console.log('\n🔐 Testing Environment Setup:\n');

if (fs.existsSync('.env')) {
  console.log('✅ .env file exists');
  passed++;
  
  try {
    require('dotenv').config();
    const requiredEnvVars = [
      'PORT',
      'MONGO_URI',
      'JWT_SECRET'
    ];

    requiredEnvVars.forEach(envVar => {
      if (process.env[envVar]) {
        console.log(`✅ ${envVar} is set`);
        passed++;
      } else {
        console.log(`⚠️  ${envVar} is not set (required)`);
        failed++;
      }
    });
  } catch (error) {
    console.log('❌ Error loading .env:', error.message);
    failed++;
  }
} else {
  console.log('⚠️  .env file not found - You need to create it!');
  console.log('   See README.md for .env template');
  failed++;
}

console.log('\n' + '='.repeat(50));
console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All tests passed! Your backend structure is perfect!');
  console.log('\n📝 Next Steps:');
  console.log('1. Make sure MongoDB is running (local or Atlas)');
  console.log('2. Create .env file if not exists');
  console.log('3. Run: npm run seed (to populate database)');
  console.log('4. Run: npm run dev (to start server)');
} else {
  console.log('⚠️  Some tests failed. Please fix the issues above.');
}

console.log('\n' + '='.repeat(50) + '\n');
