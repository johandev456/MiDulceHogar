import { create } from 'zustand'
import apiRequest from './apiRequest'


export const useNotificationStore = create((set) => ({
number: 0,
fetch: async () => {
try {
const res = await apiRequest("/users/notification");
set({ number: res.data });
} catch (error) {
set({ number: 0 });
throw error;
}
},
decrease: () => {
set((prev) => ({ number: prev.number -1 }) );
},
reset: () => {
set({ number: 0 });
},
}))