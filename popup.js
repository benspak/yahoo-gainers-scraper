let scrapedData = null;

// DOM elements
const scrapeBtn = document.getElementById('scrapeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const status = document.getElementById('status');
const statusText = document.getElementById('statusText');
const result = document.getElementById('result');
const resultText = document.getElementById('resultText');
const error = document.getElementById('error');
const errorText = document.getElementById('errorText');

// Hide all status elements
function hideAllStatus() {
  status.classList.add('hidden');
  result.classList.add('hidden');
  error.classList.add('hidden');
  downloadBtn.classList.add('hidden');
}

// Show loading state
function showLoading(message = 'Scraping data...') {
  hideAllStatus();
  statusText.textContent = message;
  status.classList.remove('hidden');
  scrapeBtn.disabled = true;
}

// Show success state
function showSuccess(message, data) {
  hideAllStatus();
  resultText.textContent = message;
  result.classList.remove('hidden');
  downloadBtn.classList.remove('hidden');
  scrapeBtn.disabled = false;
  scrapedData = data;
}

// Show error state
function showError(message) {
  hideAllStatus();
  errorText.textContent = message;
  error.classList.remove('hidden');
  scrapeBtn.disabled = false;
}

// Scrape button click handler
scrapeBtn.addEventListener('click', async () => {
  try {
    showLoading('Scraping data from Yahoo Finance...');

    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Check if we're on Yahoo Finance
    if (!tab.url.includes('finance.yahoo.com')) {
      showError('Please navigate to Yahoo Finance Gainers page first.');
      return;
    }

    // Execute the content script to scrape data
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeYahooGainers,
    });

    if (!results || !results[0]) {
      showError('Failed to scrape data. Please try again.');
      return;
    }

    const data = results[0].result;

    if (data.error) {
      showError(data.error);
      return;
    }

    if (!data.stocks || data.stocks.length === 0) {
      showError('No data found. Make sure you\'re on the gainers page.');
      return;
    }

    showSuccess(
      `Successfully scraped ${data.stocks.length} stocks!`,
      data
    );

  } catch (err) {
    console.error('Scraping error:', err);
    showError(`Error: ${err.message}`);
  }
});

// Download button click handler
downloadBtn.addEventListener('click', () => {
  if (!scrapedData) {
    showError('No data to download. Please scrape first.');
    return;
  }

  try {
    // Create JSON blob
    const jsonString = JSON.stringify(scrapedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `yahoo-gainers-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Update status
    showSuccess(`Downloaded ${scrapedData.stocks.length} stocks as JSON!`, scrapedData);
  } catch (err) {
    console.error('Download error:', err);
    showError(`Download failed: ${err.message}`);
  }
});

// Content script function that will be injected into the page
function scrapeYahooGainers() {
  try {
    const stocks = [];
    
    // Find the table with the specific class
    const table = document.querySelector('table.yf-1bwepqw');
    
    if (!table) {
      return { error: 'Table not found. Make sure you\'re on the Yahoo Finance Gainers page.' };
    }

    // Get all rows from tbody
    const rows = table.querySelectorAll('tbody tr.row');

    if (rows.length === 0) {
      return { error: 'No stock data found in the table.' };
    }

    rows.forEach((row) => {
      try {
        // Helper function to safely get text content
        const getText = (selector) => {
          const element = row.querySelector(selector);
          return element ? element.textContent.trim() : '--';
        };

        // Helper function to parse numeric values
        const parseNumeric = (value) => {
          if (!value || value === '--') return null;
          // Remove commas, dollar signs, and other formatting
          return value.replace(/[$,]/g, '');
        };

        // Extract data from each cell
        const symbol = getText('td[data-testid-cell="ticker"] .symbol');
        const name = getText('td[data-testid-cell="companyshortname.raw"] .companyName');
        const price = getText('td[data-testid-cell="intradayprice"] fin-streamer[data-field="regularMarketPrice"]');
        const change = getText('td[data-testid-cell="intradaypricechange"] fin-streamer[data-field="regularMarketChange"]');
        const changePercent = getText('td[data-testid-cell="percentchange"] fin-streamer[data-field="regularMarketChangePercent"]');
        const volume = getText('td[data-testid-cell="dayvolume"] fin-streamer[data-field="regularMarketVolume"]');
        const avgVolume = getText('td[data-testid-cell="avgdailyvol3m"]');
        const marketCap = getText('td[data-testid-cell="intradaymarketcap"] fin-streamer[data-field="marketCap"]');
        const peRatio = getText('td[data-testid-cell="peratio.lasttwelvemonths"]');
        const fiftyTwoWeekChange = getText('td[data-testid-cell="fiftytwowkpercentchange"] fin-streamer[data-field="fiftyTwoWeekChangePercent"]');
        const fiftyTwoWeekRange = getText('td[data-testid-cell="fiftyTwoWeekRange"] .labels');

        // Get raw numeric values from data attributes if available
        const priceRaw = row.querySelector('td[data-testid-cell="intradayprice"] fin-streamer[data-field="regularMarketPrice"]')?.getAttribute('data-value');
        const changeRaw = row.querySelector('td[data-testid-cell="intradaypricechange"] fin-streamer[data-field="regularMarketChange"]')?.getAttribute('data-value');
        const changePercentRaw = row.querySelector('td[data-testid-cell="percentchange"] fin-streamer[data-field="regularMarketChangePercent"]')?.getAttribute('data-value');

        const stock = {
          symbol: symbol || 'N/A',
          name: name || 'N/A',
          price: {
            display: price,
            raw: priceRaw ? parseFloat(priceRaw) : parseNumeric(price)
          },
          change: {
            display: change,
            raw: changeRaw ? parseFloat(changeRaw) : parseNumeric(change)
          },
          changePercent: {
            display: changePercent,
            raw: changePercentRaw ? parseFloat(changePercentRaw) : parseNumeric(changePercent.replace(/[()%]/g, ''))
          },
          volume: {
            display: volume,
            raw: volume
          },
          avgVolume3M: {
            display: avgVolume,
            raw: avgVolume
          },
          marketCap: {
            display: marketCap,
            raw: marketCap
          },
          peRatio: peRatio,
          fiftyTwoWeekChange: {
            display: fiftyTwoWeekChange,
            raw: parseNumeric(fiftyTwoWeekChange.replace(/[()%]/g, ''))
          },
          fiftyTwoWeekRange: fiftyTwoWeekRange
        };

        stocks.push(stock);
      } catch (err) {
        console.error('Error parsing row:', err);
      }
    });

    return {
      timestamp: new Date().toISOString(),
      source: 'Yahoo Finance - Top Gainers',
      url: window.location.href,
      totalStocks: stocks.length,
      stocks: stocks
    };

  } catch (err) {
    return { error: `Scraping error: ${err.message}` };
  }
}

