# Aegis Vision - AI Manufacturing Platform

A modern, AI-powered manufacturing quality control and inspection platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Real-time Dashboard** - Monitor manufacturing metrics, quality scores, and system health
- **Camera Management** - Configure and monitor camera networks for inspection
- **AI-Powered Inspection** - Set up automated quality control inspections with ROI areas
- **Data Annotation** - Annotate images for training custom AI models
- **Model Training** - Train and manage AI models for defect detection
- **Alert System** - Real-time alerts and notifications for quality issues
- **Responsive Design** - Mobile-first design with accessibility features

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aegis-vision
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LiveTile/       # Real-time metric tiles
│   ├── AlertDrawer/    # Alert management drawer
│   ├── ROIOverlay/     # Region of Interest overlay
│   ├── ThresholdSlider/ # Threshold configuration slider
│   ├── RuleBuilder/    # Rule builder interface
│   └── Layout/         # Layout components (Sidebar, Topbar, etc.)
├── screens/            # Main application screens
│   ├── Dashboard.tsx   # Main dashboard
│   ├── CameraSetup.tsx # Camera management
│   ├── Inspection.tsx  # Inspection interface
│   ├── Annotation.tsx  # Data annotation
│   └── ModelTraining.tsx # AI model training
├── lib/                # Utilities and configuration
│   ├── tokens.ts       # Design system tokens
│   ├── utils.ts        # Utility functions
│   └── api.ts          # API client and endpoints
├── types/              # TypeScript type definitions
│   └── types.ts        # Shared types
├── mock/               # Mock data for development
│   └── mockData.ts     # Static data for screens
└── styles/             # Global styles
    ├── global.css      # Global CSS with Tailwind
    └── tailwind.config.ts # Tailwind configuration
```

## Design System

The project uses a comprehensive design system with:

- **Colors**: Primary, secondary, status colors optimized for manufacturing
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components with TypeScript
- **Accessibility**: WCAG 2.1 AA compliant design

## Manufacturing-Specific Features

### ROI (Region of Interest) Management
- Visual overlay system for defining inspection areas
- Support for different ROI types (defect, quality, measurement, inspection)
- Interactive controls for managing ROI areas

### Real-time Monitoring
- Live tiles showing key manufacturing metrics
- WebSocket support for real-time updates
- Alert system with severity levels and acknowledgment

### AI Model Integration
- Model training interface with progress tracking
- Support for different model types (classification, detection, segmentation)
- Configuration management for training parameters

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.
