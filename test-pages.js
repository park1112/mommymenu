#!/usr/bin/env node

const http = require('http');

const BASE_URL = 'http://localhost:3006';
const PAGES = [
  '/',
  '/products',
  '/inventory',
  '/shipments', 
  '/settings',
  '/settings/product-config',
  '/docs',
];

async function testPage(path) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + path, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const hasError = data.includes('Error') || data.includes('404') || res.statusCode !== 200;
        const hasContent = data.includes('<!DOCTYPE html>') && data.length > 1000;
        
        if (res.statusCode === 200 && hasContent && !data.includes('404: This page could not be found')) {
          console.log(`✅ ${path} - OK (Status: ${res.statusCode}, Size: ${data.length} bytes)`);
          resolve(true);
        } else {
          console.log(`❌ ${path} - Failed (Status: ${res.statusCode}, Has404: ${data.includes('404')})`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`❌ ${path} - Network Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('=== Testing Pages ===\n');
  
  let allPassed = true;
  for (const page of PAGES) {
    const passed = await testPage(page);
    if (!passed) allPassed = false;
  }
  
  console.log('\n=== Test Summary ===');
  if (allPassed) {
    console.log('✅ All pages are working correctly!');
  } else {
    console.log('⚠️  Some pages have issues. Please check the errors above.');
  }
}

// Run tests
runTests().catch(console.error);