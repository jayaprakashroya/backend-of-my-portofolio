// test-contact.js
// Run: node test-contact.js

const axios = require('axios');

async function testContactEndpoint() {
  try {
    const response = await axios.post('http://localhost:5000/api/contact', {
      fullname: 'Test User',
      email: 'test@example.com',
      message: 'Hello, this is a test!'
    });
    console.log('Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Error request:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testContactEndpoint();
