#!/usr/bin/env node

const http = require('http');

const BASE_URL = 'http://localhost:3006';
const PAGES = [
  { path: '/', expectedContent: ['Dashboard', '농산물', '재고'] },
  { path: '/products', expectedContent: ['제품 관리', '제품 등록', 'SKU'] },
  { path: '/inventory', expectedContent: ['재고 관리', '재고 현황'] },
  { path: '/shipments', expectedContent: ['출고 관리', '배송'] },
  { path: '/settings', expectedContent: ['설정', '제품 설정'] },
  { path: '/settings/product-config', expectedContent: ['제품 설정 관리', '카테고리', '무게'] },
  { path: '/docs', expectedContent: ['문서', '사용 설명서'] },
];

async function testPage(pageInfo) {
  const { path, expectedContent } = pageInfo;
  
  return new Promise((resolve) => {
    http.get(BASE_URL + path, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const hasExpectedContent = expectedContent.some(content => data.includes(content));
        // Ignore Next.js embedded 404 templates in script tags
        const has404Error = data.includes('404: This page could not be found') && 
                           !data.includes('제품 관리') && 
                           !data.includes('재고 관리') &&
                           !data.includes('Dashboard');
        const hasLoadingOnly = data.includes('animate-pulse') && !hasExpectedContent;
        
        if (res.statusCode === 200 && hasExpectedContent && !hasLoadingOnly) {
          console.log(`✅ ${path} - OK (Found: ${expectedContent.filter(c => data.includes(c)).join(', ')})`);
          resolve(true);
        } else {
          console.log(`❌ ${path} - Failed`);
          if (has404Error) console.log(`   - Contains 404 error`);
          if (hasLoadingOnly) console.log(`   - Shows only loading spinner`);
          if (!hasExpectedContent) console.log(`   - Missing expected content: ${expectedContent.join(', ')}`);
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
  console.log('=== Testing All Pages ===\n');
  
  let passedCount = 0;
  for (const page of PAGES) {
    const passed = await testPage(page);
    if (passed) passedCount++;
  }
  
  console.log('\n=== Test Summary ===');
  console.log(`Passed: ${passedCount}/${PAGES.length}`);
  
  if (passedCount === PAGES.length) {
    console.log('✅ All pages are working correctly!');
    process.exit(0);
  } else {
    console.log('⚠️  Some pages have issues. Please check the errors above.');
    process.exit(1);
  }
}

// Run tests
runTests().catch(console.error);