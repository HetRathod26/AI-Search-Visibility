# AI Search Visibility Checker - Frontend

A modern, responsive web application to measure and analyze brand visibility on AI search engines like ChatGPT, Claude, and Perplexity.

## Features

- 🎯 **Hero Landing Page** - Beautiful, conversion-optimized homepage with form input
- ⚡ **Real-time Analysis** - Live progress tracking with step-by-step updates
- 📊 **Comprehensive Reports** - Detailed insights with charts and visualizations
- 🔒 **Preview & Unlock** - Free preview with paid full report unlock
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎨 **Modern UI** - Built with Tailwind CSS and Framer Motion

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualizations
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── HomePage.jsx       # Landing page with form
│   ├── AnalysisPage.jsx   # Loading/analysis progress
│   └── ReportPage.jsx     # Report preview & full view
├── App.jsx                # Main app with routing
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Pages Overview

### 1. Home Page (`/`)
- Hero section with value proposition
- Company information input form
- Feature highlights
- How it works section
- Call-to-action

### 2. Analysis Page (`/analysis/:jobId`)
- Real-time progress tracking
- Step-by-step analysis visualization
- Estimated completion time
- Professional loading experience

### 3. Report Page (`/report/:reportId`)
- Overall visibility score
- Sentiment analysis
- Information depth metrics
- Query performance
- AI knowledge assessment
- Category rankings
- Competitor analysis
- Actionable recommendations
- Payment unlock modal (demo)

## Demo Data

Currently uses mock data for demonstration. Backend integration ready - just connect API endpoints.

## Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Report sharing functionality
- [ ] PDF export
- [ ] Email notifications

## License

Proprietary - All rights reserved
