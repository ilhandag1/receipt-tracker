# Receipt Tracker

A modern web application for tracking and managing receipts built with React, TypeScript, and Vite. This app allows you to store, organize, and export your receipts with ease.

## Features

- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💾 **Local Storage**: Uses IndexedDB for persistent data storage (via Dexie)
- 📊 **Statistics**: View spending statistics and trends
- 📤 **Export to Excel**: Export your receipts to Excel format
- 🎨 **Modern UI**: Built with Tailwind CSS and Lucide React icons
- ⚡ **Fast**: Powered by Vite for lightning-fast development and builds

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: IndexedDB (via Dexie)
- **Icons**: Lucide React
- **Export**: ExcelJS, File Saver

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ilhandag1/receipt-tracker.git
   cd receipt-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

- **Add Receipt**: Click the "Add Receipt" button to create a new receipt entry
- **Edit Receipt**: Click on any receipt item to edit its details
- **Delete Receipt**: Use the delete button on receipt items
- **View Statistics**: Check the stats section for spending insights
- **Export Data**: Use the export button to download receipts as Excel file

## Project Structure

```
src/
├── components/
│   ├── receipt/
│   │   ├── ReceiptForm.tsx     # Form for adding/editing receipts
│   │   ├── ReceiptItem.tsx     # Individual receipt display
│   │   ├── ReceiptList.tsx     # List of all receipts
│   │   └── ReceiptStats.tsx    # Statistics component
│   └── ui/                     # UI components
├── db/
│   └── db.ts                   # IndexedDB setup with Dexie
├── hooks/                      # Custom React hooks
├── pages/
│   ├── HomePage.tsx            # Main page
│   └── EditPage.tsx            # Edit receipt page
├── store/
│   └── receiptStore.ts         # Zustand state management
├── types/
│   └── receipt.ts              # TypeScript type definitions
└── utils/
    ├── exportXlsx.ts           # Excel export functionality
    ├── formatCurrency.ts       # Currency formatting
    └── sortReceipts.ts         # Receipt sorting utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
