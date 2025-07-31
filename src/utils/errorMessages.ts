export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address. Please check your email or create a new account.';
    
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support for assistance.';
    
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    
    case 'auth/invalid-credential':
    case 'auth/invalid-credentials':
      return 'Invalid email or password. Please check your credentials and try again.';
    
    case 'auth/expired-action-code':
      return 'Your sign-in link has expired. Please request a new one.';
    
    case 'auth/invalid-action-code':
      return 'Invalid sign-in link. Please check your email for the correct link.';
    
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password (at least 6 characters).';
    
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled. Please contact support.';
    
    case 'auth/requires-recent-login':
      return 'For security reasons, please sign in again.';
    
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email but different sign-in credentials.';
    
    case 'auth/credential-already-in-use':
      return 'This account is already linked to another sign-in method.';
    
    case 'auth/operation-cancelled':
      return 'Sign-in was cancelled. Please try again.';
    
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked. Please allow popups and try again.';
    
    case 'auth/cancelled-popup-request':
      return 'Sign-in request was cancelled. Please try again.';
    
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    
    case 'auth/invalid-apple-credential':
      return 'Invalid Apple sign-in credentials. Please try again.';
    
    case 'auth/invalid-verification-code':
      return 'Invalid verification code. Please check your code and try again.';
    
    case 'auth/invalid-verification-id':
      return 'Invalid verification ID. Please request a new verification code.';
    
    case 'auth/quota-exceeded':
      return 'Service temporarily unavailable. Please try again later.';
    
    case 'auth/unverified-email':
      return 'Please verify your email address before signing in.';
    
    case 'auth/user-token-expired':
      return 'Your session has expired. Please sign in again.';
    
    case 'auth/web-storage-unsupported':
      return 'Web storage is not supported. Please enable cookies and try again.';
    
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}; 