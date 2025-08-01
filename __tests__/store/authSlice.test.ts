import authReducer, { 
  setUser, 
  clearError
} from '../../src/store/slices/authSlice';

describe('Auth Slice', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user = { 
      uid: '1', 
      email: 'test@example.com',
      displayName: 'Test User'
    };
    const action = setUser(user);
    const newState = authReducer(initialState, action);

    expect(newState.user).toEqual(user);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error',
    };
    const action = clearError();
    const newState = authReducer(stateWithError, action);

    expect(newState.error).toBe(null);
  });
}); 