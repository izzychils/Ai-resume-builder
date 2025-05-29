import { create } from "zustand"
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../Auth/firebase"

export const useAuthStore = create((set, get) => ({
  firebase_user: null,
  loading: true,
  error: null,
  
  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null })
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      // Don't set user here - let onAuthStateChanged handle it
      set({ loading: false })
      return result.user
    } catch (error) {
      set({ error: error.message, loading: false })
      return null
    }
  },
  
  logout: async () => {
    try {
      set({ loading: true })
      await signOut(auth)
      // Don't set user to null here - let onAuthStateChanged handle it
      set({ loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  setUser: (firebase_user) => set({ firebase_user, loading: false }),
  
  isVerified: () => {
    const user = get().firebase_user
    return user ? user.emailVerified : false
  },

  // Initialize auth state listener
  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user) // Debug log
      set({ 
        firebase_user: user, 
        loading: false,
        error: null 
      })
    })
    return unsubscribe
  }
}))

// Initialize the auth listener when the store is created
let unsubscribe = null
if (typeof window !== 'undefined') {
  // Only run in browser environment
  const store = useAuthStore.getState()
  unsubscribe = store.initializeAuth()
}

// Clean up listener when needed (optional)
export const cleanupAuthListener = () => {
  if (unsubscribe) {
    unsubscribe()
  }
}