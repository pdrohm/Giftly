# Giftly - Gift Card Wallet

## 🎥 Quick Demo

Watch a quick demo of Giftly: [https://youtube.com/shorts/SzoFKCVmS9I?feature=share](https://youtube.com/shorts/SzoFKCVmS9I?feature=share)

## 📱 App Overview & Screenshots

📄 **Complete App Overview**: [View detailed overview with screenshots](https://drive.google.com/file/d/1ZpuyiFRumahNnvC3QDRXEjyvvMwIdvJt/view?usp=sharing)

This PDF provides a comprehensive overview of Giftly with detailed screenshots showing:
- **Authentication Flow**: Sign in and sign up screens
- **Main Features**: My Cards, Add Card, and Settings screens
- **Card Management**: Adding, viewing, and managing gift cards
- **Theme Support**: Dark and light mode examples
- **User Experience**: Complete user journey through the app

## Overview

Giftly is a React Native app built with TypeScript that allows users to store, view, and manage gift cards offline. The app features a modern, themeable UI with dark/light mode support.

## Architecture

### Project Structure

```
src/
├── features/              # Feature-based modules
│   ├── auth/             # Authentication feature
│   │   ├── hooks/        # Feature-specific hooks
│   │   └── screens/      # Auth screens
│   ├── cards/            # Gift cards feature
│   │   ├── components/   # Card-specific components
│   │   ├── hooks/        # Feature-specific hooks
│   │   └── screens/      # Card screens
│   └── settings/         # Settings feature
│       ├── components/   # Settings components
│       ├── hooks/        # Feature-specific hooks
│       └── screens/      # Settings screens
├── components/           # Shared UI components
│   └── ui/              # Base UI components
├── navigation/           # Navigation configuration
├── services/            # External services & utilities
├── theme/               # Design system & theming
├── hooks/               # Shared custom hooks
├── store/               # Redux store & slices
├── utils/               # Utility functions
└── assets/              # Images, fonts, etc.
```

### Key Technologies

- **React Native** (0.80.2) - Bare React Native, not Expo
- **TypeScript** (5.0.4) - Type safety
- **Redux Toolkit** (2.8.2) - State management
- **Redux Persist** (6.0.0) + AsyncStorage - Offline data persistence
- **React Navigation** (7.x) - Navigation with bottom tabs and stack
- **Firebase Authentication** - Email/password authentication
- **React Hook Form** (7.61.1) + Zod (3.25.76) - Form handling and validation
- **React Native Vector Icons** - Icon system
- **React Native Toast Message** - Toast notifications
- **React Native MMKV** - High-performance storage
- **React Native Barcode Creator** - Barcode generation

### Design System

#### Theme Support
- **Dark/Light Mode**: Dynamic theme switching with persistence
- **Color Schemes**: Theme context with storage persistence

#### Colors
- **Background**: #0D0D0D (dark), #FFFFFF (light)
- **Card**: #1C1C1E (dark), #F8F9FA (light)
- **Text**: #FFFFFF, #A1A1AA (secondary)
- **Primary**: #4F46E5
- **Danger**: #EF4444
- **Border**: #2A2A2A (dark), #E5E5E5 (light)

#### Spacing Scale
- 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64

#### Typography
- System fonts with proper scaling
- Font weights: 400, 500, 600, 700
- Font sizes: 12, 14, 16, 18, 20, 24, 30, 36

#### Shadows & Border Radius
- **Shadows**: sm, base, lg variants with proper elevation
- **Border Radius**: sm (8), base (12), lg (16), xl (20), full (9999)

### State Management

#### Redux Store Structure
```typescript
{
  auth: {
    user: User | null
    loading: boolean
    error: string | null
  },
  cards: {
    cards: GiftCard[]
    loading: boolean
    error: string | null
  }
}
```

#### Persistence Strategy
- **Redux Persist** with AsyncStorage
- **Auth Persistence**: User data persisted across sessions
- **Cards Persistence**: Gift cards stored locally
- **Theme Persistence**: User theme preference saved

#### Async Actions
- **Authentication**: signIn, signUp, signOut with Firebase
- **Error Handling**: Centralized error message formatting
- **Loading States**: Proper loading indicators

### Navigation Architecture

#### Stack Structure
```
RootNavigator
├── Auth (when not authenticated)
│   ├── SignIn
│   └── SignUp
└── Main (when authenticated)
    ├── MainTabNavigator
    │   ├── MyCards (tab)
    │   ├── AddCard (tab)
    │   └── Settings (tab)
    └── CardDetails (stack screen)
```

#### Navigation Features
- **Conditional Rendering**: Based on authentication state
- **Theme Integration**: Dynamic header/tab styling
- **Type Safety**: Full TypeScript navigation types

### Features

#### 1. Authentication
- **Firebase Auth**: Email/password authentication
- **Persistent Sessions**: Automatic login state restoration
- **Error Handling**: User-friendly error messages
- **Loading States**: Proper UX during auth operations

#### 2. My Cards Screen
- **FlatList**: Efficient rendering of gift cards
- **Total Value**: Real-time calculation of card values
- **Empty State**: Helpful empty state handling
- **Card Details**: Tap to view detailed information

#### 3. Add Card Screen
- **Form Validation**: React Hook Form + Zod schemas
- **Real-time Validation**: Instant feedback on input
- **Date Picker**: Native date selection
- **Success Feedback**: Toast notifications

#### 4. Card Details Screen
- **Detailed View**: Complete card information
- **Delete Functionality**: Confirmation dialogs
- **Formatted Display**: Currency and date formatting
- **Barcode Generation**: Visual card representation

#### 5. Settings Screen
- **User Information**: Display user email
- **Theme Toggle**: Dark/light mode switching
- **App Version**: Version information display
- **Sign Out**: Secure logout functionality

### Components Architecture

#### UI Components (`src/components/ui/`)
- **Button**: Primary, secondary, danger variants
- **Input**: With labels, errors, and validation
- **ScreenContainer**: Consistent screen layout
- **Typography**: Text components with proper styling
- **Icon**: Vector icon wrapper
- **DateInput**: Date picker component
- **ThemeToggle**: Theme switching component

#### Feature Components
- **CardItem**: Individual gift card display
- **Barcode**: Barcode generation component

#### Custom Hooks
- **useTheme**: Theme access with color scheme support
- **useAppDispatch**: Typed Redux dispatch
- **useAppSelector**: Typed Redux selectors
- **useToast**: Toast notification hook
- **useUserCards**: Cards management hook
- **Feature-specific hooks**: useMyCardsScreen, useAddCardScreen, etc.

### Services

#### Storage Service
- **MMKV Integration**: High-performance storage
- **AsyncStorage Fallback**: Reliable persistence
- **Type Safety**: Strongly typed storage operations

#### Toast Service
- **Centralized Notifications**: Consistent toast messages
- **Success/Error Handling**: User feedback system

### Testing Strategy

#### Test Structure
```
__tests__/
├── components/           # UI component tests
├── hooks/               # Custom hook tests
├── features/            # Feature-specific tests
│   ├── auth/           # Authentication tests
│   └── cards/          # Cards feature tests
├── store/              # Redux store tests
├── services/           # Service tests
└── theme/              # Theme tests
```

#### Testing Technologies
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Detox**: End-to-end testing
- **Mock Redux**: State management testing

### Performance Optimizations

1. **FlatList Virtualization**: Efficient rendering of large lists
2. **React.memo**: Component memoization for expensive renders
3. **Redux Optimization**: Selective subscriptions and state updates
4. **MMKV Storage**: High-performance local storage
5. **Theme Caching**: Efficient theme switching

### Security Features

1. **Input Validation**: Zod schemas for all forms
2. **Firebase Auth**: Secure authentication system
3. **No Sensitive Data**: No API keys in codebase
4. **Type Safety**: Full TypeScript enforcement

### Offline Support

1. **Redux Persist**: Local data persistence
2. **AsyncStorage**: Reliable offline storage
3. **Offline-First**: Works without internet connection

## Getting Started

### Prerequisites
- Node.js >= 18
- React Native CLI
- iOS Simulator / Android Emulator

### Installation
```bash
# Install dependencies
npm install

# iOS (requires macOS)
npm run ios

# Android
npm run android

# Start Metro bundler
npm start
```

### Testing
```bash
# Unit and component tests
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
npm run test:ci           # Run tests for CI

# End-to-end tests
npm run e2e:build:android # Build Android app for e2e
npm run e2e:test:android  # Run e2e tests on Android
npm run e2e:build:ios     # Build iOS app for e2e
npm run e2e:test:ios      # Run e2e tests on iOS
```

## Architecture Principles

### Clean Architecture
- **Separation of Concerns**: Clear boundaries between layers
- **Single Responsibility**: Each module has one clear purpose
- **Testability**: Easy to test with proper abstractions

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Jest**: Comprehensive testing coverage

### Best Practices
- **Functional Components**: Modern React patterns
- **Custom Hooks**: Reusable logic extraction
- **Context API**: Theme and global state management
- **Accessibility**: WCAG compliance

## Future Enhancements

1. **Cloud Sync**: Firebase Firestore integration
2. **Barcode Scanning**: Add cards by scanning
3. **Notifications**: Expiration reminders
4. **Analytics**: Usage tracking and insights
5. **Backup/Export**: Data export functionality
6. **Multi-language**: Internationalization support
7. **Advanced Theming**: Custom color schemes
8. **Offline Sync**: Conflict resolution for offline changes 