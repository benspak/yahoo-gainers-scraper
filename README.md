# 📈 Yahoo Finance Gainers Scraper - Chrome Extension

A Chrome extension that scrapes top stock gainers from Yahoo Finance and exports the data as JSON. Built with a beautiful Spotify-inspired dark mode UI.

## 🚀 Features

- ✅ Scrape top gainers from Yahoo Finance with one click
- ✅ Export data to JSON format
- ✅ Beautiful Spotify dark mode UI (no pink colors!)
- ✅ Real-time data extraction
- ✅ Comprehensive stock data including:
  - Symbol & Company Name
  - Price (display & raw values)
  - Change & Change %
  - Volume & Average Volume (3M)
  - Market Cap
  - P/E Ratio (TTM)
  - 52 Week Change %
  - 52 Week Range

## 📦 Installation

### Load Unpacked Extension (Development)

1. **Download or clone this repository**
   ```bash
   git clone <your-repo-url>
   cd yahoo-gainers-scraper
   ```

2. **Create Extension Icons**

   Before loading the extension, you need to create icon files. You can:

   - **Option A:** Use any icon generator or create your own PNG icons:
     - Create `icons/icon16.png` (16x16px)
     - Create `icons/icon32.png` (32x32px)
     - Create `icons/icon48.png` (48x48px)
     - Create `icons/icon128.png` (128x128px)

   - **Option B:** Use a temporary placeholder (quick start):
     ```bash
     # macOS/Linux - Create a simple colored square as placeholder
     # You can use any image editor or online tool
     ```

3. **Load the Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `yahoo-gainers-scraper` directory
   - The extension should now appear in your extensions list

4. **Pin the Extension**
   - Click the puzzle icon in Chrome toolbar
   - Find "Yahoo Finance Gainers Scraper"
   - Click the pin icon to keep it visible

## 🎯 Usage

1. **Navigate to Yahoo Finance Gainers Page**
   - Open [https://finance.yahoo.com/markets/stocks/gainers/](https://finance.yahoo.com/markets/stocks/gainers/)

2. **Open the Extension**
   - Click the extension icon in your Chrome toolbar
   - The popup will appear with a clean, Spotify-themed interface

3. **Scrape Data**
   - Click the "🔍 Scrape Gainers" button
   - Wait for the extension to extract data (usually 1-2 seconds)
   - You'll see a success message with the number of stocks scraped

4. **Download JSON**
   - Click the "💾 Download JSON" button
   - The JSON file will be saved to your Downloads folder
   - Filename format: `yahoo-gainers-YYYY-MM-DD.json`

## 📄 JSON Output Format

```json
{
  "timestamp": "2025-10-12T10:30:00.000Z",
  "source": "Yahoo Finance - Top Gainers",
  "url": "https://finance.yahoo.com/markets/stocks/gainers/",
  "totalStocks": 20,
  "stocks": [
    {
      "symbol": "PTGX",
      "name": "Protagonist Therapeutics, Inc.",
      "price": {
        "display": "87.00",
        "raw": 87
      },
      "change": {
        "display": "+19.96",
        "raw": 19.96
      },
      "changePercent": {
        "display": "+29.77%",
        "raw": 29.773268
      },
      "volume": {
        "display": "7.065M",
        "raw": "7.065M"
      },
      "avgVolume3M": {
        "display": "947,760",
        "raw": "947,760"
      },
      "marketCap": {
        "display": "5.412B",
        "raw": "5.412B"
      },
      "peRatio": "119.18",
      "fiftyTwoWeekChange": {
        "display": "+87.70%",
        "raw": 87.70226
      },
      "fiftyTwoWeekRange": "33.3193.25"
    }
    // ... more stocks
  ]
}
```

## 🎨 Design

The extension follows a **Spotify dark mode** aesthetic:
- Dark backgrounds (#121212, #181818, #282828)
- Green accents (#1db954, #1ed760)
- Clean, modern typography
- Smooth animations and transitions
- No pink colors (as requested!)

## 🛠️ Technical Details

### Built With
- **Manifest V3** - Latest Chrome Extension standard
- **Vanilla JavaScript** - No dependencies
- **Modern CSS** - Spotify-inspired design system

### Permissions
- `activeTab` - Access current tab to scrape data
- `scripting` - Execute content scripts for data extraction
- `host_permissions` - Access to finance.yahoo.com

### Files Structure
```
yahoo-gainers-scraper/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.css             # Spotify-themed styles
├── popup.js              # Main logic and scraping
├── icons/                # Extension icons (16, 32, 48, 128)
└── README.md            # This file
```

## 🐛 Troubleshooting

### "Please navigate to Yahoo Finance Gainers page first"
- Make sure you're on `https://finance.yahoo.com/markets/stocks/gainers/`
- Refresh the page and try again

### "Table not found" or "No stock data found"
- Yahoo Finance may have updated their HTML structure
- Check browser console for errors
- Try refreshing the Yahoo Finance page

### Extension doesn't appear
- Make sure you've created icon files in the `icons/` folder
- Check `chrome://extensions/` for any error messages
- Try reloading the extension

### Data looks incomplete
- Yahoo Finance uses dynamic content loading
- Wait a few seconds for the page to fully load before scraping
- Try scrolling down the page to ensure all data is loaded

## 🚀 Future Enhancements

Potential features to add:
- [ ] Automatic refresh/monitoring
- [ ] CSV export option
- [ ] Historical data tracking
- [ ] Custom filtering (by market cap, change %, etc.)
- [ ] Integration with trading platforms
- [ ] Notification alerts for specific stocks
- [ ] Chart visualization in popup

## 📝 Notes

- This extension only scrapes publicly available data from Yahoo Finance
- Data is extracted client-side, no external servers involved
- Extension follows Chrome Web Store policies
- Use responsibly and respect Yahoo Finance's terms of service

## 💼 Production Ready

This extension is production-ready and includes:
- ✅ Error handling
- ✅ User feedback (loading, success, error states)
- ✅ Clean, maintainable code
- ✅ Modern ES6+ JavaScript
- ✅ Responsive design
- ✅ Accessibility considerations

## 📄 License

MIT License - Feel free to use and modify for your needs.

---

**Made for founders and investors who need quick access to market data.** 🚀
