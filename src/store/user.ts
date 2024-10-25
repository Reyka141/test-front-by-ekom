import { create } from 'zustand';

export type User = { username: string };

export type UserState = {
  user: User;
  updateUser: (newUser: User) => void;
};

export const userStore = create<UserState>((set) => ({
  user: {
    username: 'Аноним'
  },
  updateUser: (newUser) =>
    set((state) => ({
      user: { ...state.user, ...newUser }
    }))
}));
