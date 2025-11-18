// Simple test script to verify API endpoints
// Run with: node test-api.js

const baseURL = 'http://localhost:5000';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

const testPost = {
  title: 'Test Post',
  content: 'This is a test post content.',
  tags: ['test', 'nodejs']
};

async function testAPI() {
  try {
    console.log('🚀 Testing MERN Blog API...\n');

    // Test server health
    console.log('1. Testing server health...');
    const healthResponse = await fetch(`${baseURL}/`);
    const healthData = await healthResponse.json();
    console.log('✅ Server is running:', healthData.message);

    // Test user registration
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ User registered successfully');
      
      const token = registerData.token;
      
      // Test creating a post
      console.log('\n3. Testing post creation...');
      const postResponse = await fetch(`${baseURL}/api/posts`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testPost)
      });
      
      if (postResponse.ok) {
        const postData = await postResponse.json();
        console.log('✅ Post created successfully');
        
        // Test getting all posts
        console.log('\n4. Testing get all posts...');
        const getPostsResponse = await fetch(`${baseURL}/api/posts`);
        const postsData = await getPostsResponse.json();
        console.log('✅ Posts retrieved:', postsData.posts.length, 'posts found');
        
      } else {
        console.log('❌ Failed to create post');
      }
      
    } else {
      const errorData = await registerResponse.json();
      console.log('❌ Registration failed:', errorData.message);
    }

    console.log('\n🎉 API testing completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the server is running: npm run dev');
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This test requires Node.js 18+ or you can install node-fetch');
  console.log('💡 Alternative: Test the API using Postman or curl commands from README.md');
} else {
  testAPI();
}