import { create } from 'zustand'

export const userStore = create((set) => ({
  user: {
    username: 'Аноним'
  },
  updateUser: (newUser: any) => set((state: any) => ({
    user: { ...state.user, ...newUser }
  }))
}))