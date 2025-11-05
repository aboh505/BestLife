/**
 * API Integration Test Script
 * Tests all backend endpoints to ensure they work correctly
 */

const API_BASE = 'http://localhost:5000';

let authToken = '';
let adminToken = '';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function test(name, testFn) {
  try {
    await testFn();
    log(`✅ ${name}`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${name}: ${error.message}`, colors.red);
    return false;
  }
}

async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  const data = await response.json();
  if (!response.ok && !data.success) {
    throw new Error(data.message || `HTTP ${response.status}`);
  }
  return data;
}

async function runTests() {
  log('\n🧪 Starting BestLife API Tests...\n', colors.cyan);
  
  let passed = 0;
  let failed = 0;

  // ========== HEALTH CHECK ==========
  log('📡 Testing Server Health...', colors.blue);
  
  if (await test('Server is running', async () => {
    const data = await apiCall('/');
    if (!data.success) throw new Error('Server not responding correctly');
  })) passed++; else failed++;

  // ========== AUTHENTICATION TESTS ==========
  log('\n🔐 Testing Authentication...', colors.blue);
  
  // Test Registration
  const testUser = {
    nom: 'Test',
    prenom: 'User',
    email: `test${Date.now()}@example.com`,
    motDePasse: 'test123456'
  };

  if (await test('User Registration', async () => {
    const data = await apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(testUser)
    });
    if (!data.token) throw new Error('No token returned');
    authToken = data.token;
  })) passed++; else failed++;

  // Test Login with Client
  if (await test('Client Login', async () => {
    const data = await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'client@bestlife.com',
        motDePasse: 'client123'
      })
    });
    if (!data.token) throw new Error('No token returned');
    authToken = data.token;
  })) passed++; else failed++;

  // Test Login with Admin
  if (await test('Admin Login', async () => {
    const data = await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@bestlife.com',
        motDePasse: 'admin123'
      })
    });
    if (!data.token) throw new Error('No token returned');
    adminToken = data.token;
  })) passed++; else failed++;

  // Test Get Current User
  if (await test('Get Current User', async () => {
    const data = await apiCall('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (!data.data) throw new Error('No user data returned');
  })) passed++; else failed++;

  // ========== PRODUCTS TESTS ==========
  log('\n📦 Testing Products...', colors.blue);
  
  let productId;

  if (await test('Get All Products', async () => {
    const data = await apiCall('/api/products');
    if (!data.data || data.data.length === 0) throw new Error('No products found');
    productId = data.data[0]._id;
  })) passed++; else failed++;

  if (await test('Get Single Product', async () => {
    const data = await apiCall(`/api/products/${productId}`);
    if (!data.data) throw new Error('Product not found');
  })) passed++; else failed++;

  if (await test('Get Product Brands', async () => {
    const data = await apiCall('/api/products/brands/list');
    if (!data.data) throw new Error('No brands found');
  })) passed++; else failed++;

  // ========== ORDERS TESTS ==========
  log('\n🛒 Testing Orders...', colors.blue);
  
  let orderId;

  if (await test('Create Order', async () => {
    const data = await apiCall('/api/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        articles: [
          {
            produit: productId,
            nom: 'Test Product',
            prix: 100,
            quantite: 2
          }
        ],
        total: 200,
        adresseLivraison: {
          rue: '123 Test Street',
          ville: 'Douala',
          pays: 'Cameroun',
          codePostal: '00000'
        }
      })
    });
    if (!data.data || !data.data._id) throw new Error('Order not created');
    orderId = data.data._id;
  })) passed++; else failed++;

  if (await test('Get My Orders', async () => {
    const data = await apiCall('/api/orders/myorders', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (!data.data) throw new Error('No orders found');
  })) passed++; else failed++;

  if (await test('Get Single Order', async () => {
    if (!orderId) throw new Error('No orderId from previous test');
    const data = await apiCall(`/api/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (!data.data) throw new Error('Order not found');
  })) passed++; else failed++;

  // ========== ADMIN TESTS ==========
  log('\n👑 Testing Admin Endpoints...', colors.blue);
  
  if (await test('Get All Orders (Admin)', async () => {
    const data = await apiCall('/api/orders', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    if (!data.data) throw new Error('No orders found');
  })) passed++; else failed++;

  if (await test('Update Order Status (Admin)', async () => {
    if (!orderId) throw new Error('No orderId from previous test');
    const data = await apiCall(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        statut: 'expédiée'
      })
    });
    if (!data.data) throw new Error('Order status not updated');
  })) passed++; else failed++;

  if (await test('Get Dashboard Stats (Admin)', async () => {
    const data = await apiCall('/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    if (!data.data) throw new Error('No dashboard data');
  })) passed++; else failed++;

  if (await test('Get All Users (Admin)', async () => {
    const data = await apiCall('/api/users', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    if (!data.data) throw new Error('No users found');
  })) passed++; else failed++;

  // ========== CONTACT TESTS ==========
  log('\n📧 Testing Contact...', colors.blue);
  
  if (await test('Send Contact Message', async () => {
    const data = await apiCall('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        nom: 'Test User',
        email: 'test@example.com',
        sujet: 'Test Message',
        message: 'This is a test message'
      })
    });
    if (!data.success) throw new Error('Contact message failed');
  })) passed++; else failed++;

  // ========== RESULTS ==========
  log('\n' + '='.repeat(50), colors.cyan);
  log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`, colors.cyan);
  
  if (failed === 0) {
    log('🎉 All tests passed! Your backend is working perfectly!\n', colors.green);
  } else {
    log(`⚠️  ${failed} test(s) failed. Please check the errors above.\n`, colors.yellow);
  }
  
  log('='.repeat(50) + '\n', colors.cyan);
}

// Run tests
runTests().catch(error => {
  log(`\n❌ Test suite failed: ${error.message}\n`, colors.red);
  process.exit(1);
});
