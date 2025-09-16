const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper function to make API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('supabase_token') : null;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API call failed');
  }

  return response.json();
}

// Auth API calls
export const authApi = {
  signInWithEmail: (email: string) =>
    apiCall('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  verifyOtp: (email: string, token: string) =>
    apiCall('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ email, token }),
    }),

  signOut: () =>
    apiCall('/auth/signout', {
      method: 'POST',
    }),

  getSession: () =>
    apiCall('/auth/session'),
};
