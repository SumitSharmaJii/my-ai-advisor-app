# AI Product Recommender - React Native Application

A sophisticated React Native application that leverages Google's Gemini AI to provide intelligent product recommendations based on natural language queries. Users can describe their needs in plain English, and the app will analyze their request against a comprehensive product catalog to deliver personalized recommendations with detailed explanations.
Test : https://snack.expo.dev/@sumitsharmajii/my-ai-advisor-app?platform=web

##  Project Overview

This application demonstrates advanced React Native development practices, AI integration, and modern UI/UX design. It showcases how to build a scalable, maintainable mobile application that effectively bridges user intent with product discovery through artificial intelligence.

### Key Capabilities
- **Natural Language Processing**: Users can input queries like "I need a lightweight laptop for travel with long battery life"
- **AI-Powered Matching**: Google Gemini API analyzes queries against a 50+ product catalog
- **Intelligent Scoring**: Each recommendation includes a match score (1-100) and detailed reasoning
- **Modern UI/UX**: Clean, intuitive interface with smooth interactions and visual feedback
- **Real-time Processing**: Instant recommendations with loading states and error handling

## 🏗️ Architecture Overview

### High-Level Component Structure

```
my-ai-advisor-app/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx       # App header component
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   ├── NoResults.tsx    # No results found component
│   │   ├── ProductCard.tsx  # Product display card
│   │   ├── SearchInput.tsx  # Search input component
│   │   └── index.ts         # Component exports
│   ├── constants/           # App constants and themes
│   │   └── index.ts         # Colors, spacing, fonts, etc.
│   ├── screens/             # Screen components
│   │   ├── ResultsScreen.tsx # Results display screen
│   │   ├── WelcomeScreen.tsx # Welcome/landing screen
│   │   └── index.ts         # Screen exports
│   ├── services/            # API and business logic
│   │   └── aiService.ts     # AI recommendation service
│   ├── types/               # TypeScript type definitions
│   │   ├── productCatalog.ts # Product data and types
│   │   └── index.ts         # Type exports
│   └── utils/               # Utility functions
│       └── index.ts         # Helper functions
├── App.tsx                  # Main application component
├── package.json
└── README.md
```

## 🎯 Features

- 🤖 **AI-Powered Recommendations**: Uses Google Gemini API for intelligent product matching
- 📱 **Modern UI/UX**: Clean, intuitive interface with smooth animations
- 🔍 **Natural Language Search**: Describe what you need in plain English
- 📊 **Match Scoring**: See how well each product matches your needs
- 💰 **Price Indicators**: Budget, mid-range, and premium price tags
- 🔄 **Real-time Updates**: Pull-to-refresh functionality
- 📝 **Detailed Explanations**: Understand why each product was recommended
- 🏗️ **Modular Architecture**: Well-organized, maintainable code structure

## 🧩 Components

### Core Components

#### `ProductCard`
- Displays individual product recommendations
- Shows match score, price, and explanation
- Includes ranking badge and category tags

#### `SearchInput`
- Handles user input for product queries
- Includes clear button and search functionality
- Supports multiline text input

#### `LoadingSpinner`
- Reusable loading indicator
- Customizable messages and sub-messages
- Consistent styling across the app

#### `NoResults`
- Displays when no recommendations are found
- Provides helpful suggestions and retry option

#### `Header`
- App title and subtitle
- Consistent branding across screens

### Screen Components

#### `WelcomeScreen`
- Landing page with app introduction
- Feature highlights
- Example queries for user guidance

#### `ResultsScreen`
- Displays search results
- Handles loading, empty, and error states
- Includes pull-to-refresh functionality

## 🎨 Design System

### Colors
- **Primary**: `#007AFF` (iOS Blue)
- **Success**: `#28a745` (Green)
- **Gray Scale**: 100-900 range for consistent theming
- **Semantic Colors**: Danger, warning, info variants

### Typography
- **Font Sizes**: XS (10px) to XXXXL (28px)
- **Weights**: Regular, medium, semibold, bold
- **Line Heights**: Optimized for readability

### Spacing
- **Consistent Scale**: 4px base unit (XS to XXXL)
- **Component Padding**: Standardized across components
- **Layout Margins**: Consistent spacing system

### Shadows & Borders
- **Elevation**: Subtle shadows for depth
- **Border Radius**: Consistent rounded corners
- **Border Colors**: Gray scale variants

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Google Gemini API Setup

To use the real Google Gemini API (instead of the mock implementation):

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Open `src/services/aiService.ts`
4. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key
```

### 3. Run the Application

#### iOS
```bash
npx react-native run-ios
```

#### Android
```bash
npx react-native run-android
```

## 🏗️ Architecture Benefits

### Modular Design
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be easily reused across the app
- **Maintainability**: Changes to one component don't affect others

### Type Safety
- **TypeScript**: Full type safety throughout the application
- **Interface Definitions**: Clear contracts between components
- **IntelliSense**: Better development experience with autocomplete

### Scalability
- **Folder Structure**: Easy to add new components and features
- **Constants**: Centralized theming and configuration
- **Services**: Business logic separated from UI components

### Testing
- **Component Isolation**: Each component can be tested independently
- **Mock Services**: Easy to mock AI service for testing
- **Type Safety**: Reduces runtime errors

## 🚀 Development Workflow

### Adding New Components
1. Create component in `src/components/`
2. Add to `src/components/index.ts`
3. Import and use in screens

### Adding New Screens
1. Create screen in `src/screens/`
2. Add to `src/screens/index.ts`
3. Import and use in navigation

### Modifying Styles
1. Update constants in `src/constants/index.ts`
2. Components automatically use new values
3. Consistent theming across the app

## 📱 Example Usage

```typescript
// Using components
import { ProductCard, SearchInput } from './src/components';
import { WelcomeScreen } from './src/screens';

// Using types
import { Product, AIRecommendation } from './src/types';

// Using services
import { AIService } from './src/services/aiService';

// Using utilities
import { formatPrice, getPriceTag } from './src/utils';
```

## 🔄 State Management

The app uses React hooks for state management:
- **Local State**: Component-specific state with `useState`
- **Props**: Data flow between parent and child components
- **Context**: Could be added for global state if needed

## 🧪 Testing Strategy

### Component Testing
- Test individual components in isolation
- Mock external dependencies
- Verify UI behavior and interactions

### Integration Testing
- Test component interactions
- Verify data flow between components
- Test complete user workflows

### Service Testing
- Mock API responses
- Test error handling
- Verify business logic

## 🚀 Future Enhancements

- [ ] **Navigation**: Add React Navigation for multiple screens
- [ ] **State Management**: Add Redux or Context API for global state
- [ ] **Caching**: Implement product data caching
- [ ] **Offline Support**: Add offline functionality
- [ ] **Animations**: Add smooth transitions and animations
- [ ] **Accessibility**: Improve accessibility features
- [ ] **Internationalization**: Add multi-language support
- [ ] **Dark Mode**: Implement dark theme support

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.
