# Gift Card Wallet - Architecture Documentation

## Overview

This is a React Native app built with TypeScript that allows users to store, view, and manage gift cards offline. The app features a dark-themed, modern UI.

## Architecture

### Project Structure

```
src/
├── app/                    # App-level components & providers
├── features/              # Feature-based modules
│   ├── auth/             # Authentication feature
│   ├── cards/            # Gift cards feature
│   └── settings/         # Settings feature
├── components/           # Shared UI components
├── navigation/           # Navigation configuration
├── services/            # API & external services
├── theme/               # Design system & theming
├── hooks/               # Custom hooks
├── store/               # Redux store & slices
├── utils/               # Utility functions
└── assets/              # Images, fonts, etc.
```

### Key Technologies

- **React Native** (bare, not Expo)
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Redux Persist** + AsyncStorage for offline storage
- **React Navigation** (bottom tabs and stack)
- **Firebase Authentication** (email/password)
- **React Hook Form** + Zod for forms
- **FlatList** for performant lists

### Design System

#### Colors
- **Background**: #0D0D0D (dark), #FFFFFF (light)
- **Card**: #1C1C1E (dark), #F8F9FA (light)
- **Text**: #FFFFFF, #A1A1AA (secondary)
- **Primary**: #4F46E5
- **Danger**: #EF4444

#### Spacing Scale
- 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64

#### Typography
- System fonts with proper scaling
- Font weights: 400, 500, 600, 700
- Font sizes: 12, 14, 16, 18, 20, 24, 30, 36

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

#### Persistence
- Redux Persist with AsyncStorage
- Whitelist: ['auth', 'cards']
- Automatic rehydration on app start

### Navigation

#### Stack Structure
```
RootNavigator
├── Auth (when not authenticated)
└── Main (when authenticated)
    ├── MainTabNavigator
    │   ├── MyCards
    │   ├── AddCard
    │   └── Settings
    └── CardDetails (stack screen)
```

### Features

#### 1. My Cards Screen
- FlatList of gift cards
- Total value calculation
- Empty state handling
- Tap to view details

#### 2. Add Card Screen
- Form with validation (React Hook Form + Zod)
- Fields: Brand, Amount, Expiration Date
- Real-time validation
- Success feedback

#### 3. Card Details Screen
- Detailed card information
- Delete functionality with confirmation
- Formatted currency and dates

#### 4. Settings Screen
- User email display
- App version
- Sign out functionality

### Components

#### UI Components
- **Button**: Primary, secondary, danger variants
- **Input**: With labels, errors, and validation
- **ScreenContainer**: Consistent screen layout

#### Custom Hooks
- **useTheme**: Theme access with color scheme support
- **useAppDispatch**: Typed Redux dispatch
- **useAppSelector**: Typed Redux selectors
- Feature-specific hooks (useMyCardsScreen, useAddCardScreen, etc.)

### Testing

#### Setup
- Jest for unit tests
- React Testing Library for component tests
- Mock Redux and navigation

#### Test Structure
```
__tests__/
├── components/
├── hooks/
├── store/
└── screens/
```

### Performance Optimizations

1. **FlatList Virtualization**: Efficient rendering of large lists
2. **Memoization**: React.memo for expensive components
3. **Redux Optimization**: Selective subscriptions
4. **Image Optimization**: Proper sizing and caching
5. **Bundle Splitting**: Code splitting for better load times

### Security

1. **Input Validation**: Zod schemas for all forms
2. **Firebase Auth**: Secure authentication
3. **No Sensitive Data**: No API keys in code
4. **Error Boundaries**: Proper error handling

### Offline Support

1. **Redux Persist**: Local data storage
2. **AsyncStorage**: Reliable persistence
3. **Offline-First**: Works without internet
4. **Data Sync**: Sync when online (could be a future feature)

## Getting Started

1. Install dependencies: `npm install`
2. Setup Firebase configuration
3. Run iOS: `npm run ios`
4. Run Android: `npm run android`
5. Run tests: `npm test`

## Testing

The project includes comprehensive testing with Jest for unit tests and Detox for end-to-end testing.

### Unit and Component Tests
```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
npm run test:ci           # Run tests for CI
```

### End-to-End Tests
```bash
npm run e2e:build:android # Build Android app for e2e testing
npm run e2e:test:android  # Run e2e tests on Android
npm run e2e:build:ios     # Build iOS app for e2e testing
npm run e2e:test:ios      # Run e2e tests on iOS
```

For detailed testing information, see [TESTING.md](./TESTING.md).

## Future Enhancements

1. **Cloud Sync**: Firebase Firestore integration
2. **Barcode Scanning**: Add cards by scanning
3. **Notifications**: Expiration reminders
4. **Analytics**: Usage tracking
5. **Backup**: Export/import functionality 