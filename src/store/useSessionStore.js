import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessionId: null,
  guestToken: null,
  sessionStatus: null,

  //simulasi POST /test/sessions
  _loadDummy: () =>
    set({
      sessionId: "uuid-session-001",
      guestToken: "uuid-guest-token-001",
      sessionStatus: "in_progress",
    }),

  setSessionId: (id) => set({ sessionId: id }),
  setGuestToken: (token) => set({ guestToken: token }),
  setSessionStatus: (status) => set({ sessionStatus: status }),
  clearSession: () =>
    set({ sessionId: null, guestToken: null, sessionStatus: null }),
}));

export default useSessionStore;
