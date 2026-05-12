# Receipt Tracker

A desktop application for tracking and managing receipts, built with React, TypeScript, and Electron.

## Features

- 🧾 **Receipt Tracking**: Easily enter date, store, and amount for each receipt
- 💾 **Persistent Storage**: Data is stored in IndexedDB and survives app restarts
- 📊 **Summary Stats**: Total receipt count and amount displayed in real time
- 📤 **Export to Excel**: Download your receipts as a chronologically sorted `.xlsx` file
- 🖥️ **Desktop App**: Packaged with Electron as a Windows installer
- 🎨 **Modern UI**: Clean and minimal design built with Tailwind CSS

## Installation (End User)

1. Go to the [Releases](../../releases) page
2. Download the latest `Receipt.Tracker.Setup.exe`
3. Double-click to install
4. Launch the app

## Developer Setup

### Prerequisites

- Node.js 18+
- npm

### Getting Started

```bash
git clone https://github.com/ilhandag1/receipt-tracker.git
cd receipt-tracker
npm install
```

### Dev Server (Web)

```bash
npm run dev
```

### Dev Server (Electron)

```bash
npm run dev:electron
```

### Build (Web)

```bash
npm run build
```

### Build (Windows Installer)

```bash
npm run build:electron
```

> **Note:** The Windows `.exe` build is handled automatically via GitHub Actions. To release a new version, create a tag and push:
> ```bash
> git tag v1.0.1
> git push origin main --tags
> ```
> Once the Action completes, the `Setup.exe` will appear under Releases.

## Project Structure

```
receipt-tracker/
├── electron/
│   ├── main.ts           # Electron main process
│   ├── preload.ts        # Secure context bridge
│   └── tsconfig.json     # Electron TypeScript config
├── src/
│   ├── components/
│   │   └── receipt/
│   │       ├── ReceiptForm.tsx     # Add receipt form
│   │       ├── ReceiptItem.tsx     # Single receipt row
│   │       ├── ReceiptList.tsx     # Receipt list table
│   │       └── ReceiptStats.tsx    # Statistics component
│   ├── db/
│   │   └── db.ts                   # IndexedDB setup via Dexie
│   ├── pages/
│   │   ├── HomePage.tsx            # Main page
│   │   └── EditPage.tsx            # Edit receipt page
│   ├── store/
│   │   └── receiptStore.ts         # Zustand + Dexie state management
│   ├── types/
│   │   └── receipt.ts              # TypeScript type definitions
│   └── utils/
│       ├── exportXlsx.ts           # Excel export logic
│       ├── formatCurrency.ts       # Currency formatting
│       └── sortReceipts.ts         # Chronological sorting
├── .github/
│   └── workflows/
│       └── build.yml               # Automated Windows build
├── package.json
└── vite.config.ts
```

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript |
| Desktop | Electron |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Database | IndexedDB (Dexie) |
| Export | ExcelJS, File Saver |
| CI/CD | GitHub Actions |

## License

This project is private and proprietary.