# Frontend Documentation

This directory contains the frontend code for the ScholarBloom application, built with React.js and Tailwind CSS.

## Directory Structure

```
frontend/
├── public/              # Static files
│   ├── index.html      # Main HTML file
│   └── assets/         # Static assets (images, fonts, etc.)
└── src/                # React source code
    ├── Components/     # Reusable components
    │   ├── common/     # Common UI components
    │   ├── student/    # Student-specific components
    │   └── university/ # University-specific components
    ├── pages/          # Page components
    │   ├── Home.jsx    # Home page
    │   ├── Login.jsx   # Login page
    │   └── Register.jsx # Registration page
    ├── context/        # React context
    │   └── AuthContext.jsx # Authentication context
    ├── utils/          # Utility functions
    │   └── api.js      # API utility functions
    ├── App.jsx         # Main App component
    └── index.js        # Entry point
```

## Key Components

### Common Components
- `Navbar.jsx`: Main navigation bar
- `Footer.jsx`: Site footer
- `Button.jsx`: Reusable button component
- `Card.jsx`: Card component for displaying content

### Student Components
- `StudentDashboard.jsx`: Student dashboard
- `ScholarshipCard.jsx`: Card for displaying scholarships
- `ApplicationForm.jsx`: Form for applying to scholarships
- `Wallet.jsx`: Student wallet component

### University Components
- `UniversityDashboard.jsx`: University dashboard
- `ScholarshipForm.jsx`: Form for creating scholarships
- `JobForm.jsx`: Form for creating job postings
- `ApplicationsList.jsx`: List of applications

## Setup and Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## Testing

Run tests:
```bash
npm test
```

## Contributing

When adding new components:
1. Place them in the appropriate directory under `Components/`
2. Add PropTypes for component props
3. Include JSDoc comments for component documentation
4. Add unit tests for the component 