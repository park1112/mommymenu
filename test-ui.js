const puppeteer = require('puppeteer');

async function testProductPage() {
  let browser;
  try {
    console.log('Starting browser test...');
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set up console logging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Browser Console Error:', msg.text());
      }
    });
    
    page.on('pageerror', error => {
      console.log('Page Error:', error.message);
    });
    
    // Navigate to products page
    console.log('Navigating to products page...');
    await page.goto('http://localhost:3006/products', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for content to load
    await page.waitForTimeout(3000);
    
    // Check page title
    const title = await page.title();
    console.log('Page Title:', title);
    
    // Check for loading spinner
    const hasLoadingSpinner = await page.$('.animate-pulse') !== null;
    console.log('Has Loading Spinner:', hasLoadingSpinner);
    
    // Check for main content
    const hasContent = await page.evaluate(() => {
      const body = document.body.innerText;
      return body.includes('제품 관리') || body.includes('Product');
    });
    console.log('Has Product Content:', hasContent);
    
    // Take screenshot
    await page.screenshot({ path: 'products-page.png', fullPage: true });
    console.log('Screenshot saved as products-page.png');
    
    // Get page HTML
    const html = await page.content();
    if (html.includes('404')) {
      console.log('⚠️  Page contains 404 error');
    }
    
    // Check for React errors
    const reactErrors = await page.evaluate(() => {
      return window.__NEXT_DATA__ ? window.__NEXT_DATA__.err : null;
    });
    if (reactErrors) {
      console.log('React Errors:', reactErrors);
    }
    
  } catch (error) {
    console.error('Test Error:', error.message);
  } finally {
    if (browser) await browser.close();
  }
}

testProductPage();