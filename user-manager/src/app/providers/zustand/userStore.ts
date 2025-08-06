import { create } from "zustand";
import { User } from "../../../entities/user";

type UserStore = {
  users: User[],
  setUsers: (user: User[]) => void;
  addUserOptimistic: (user: User) => () => void;
  replaceUser: (tempId:number, realUser:User) => void;
  updateUserOptimistic: (updatedUser: User) => () => void;
  deleteUserOptimistic: (id: number) => () => void;
}
const useUserStore = create<UserStore>((set,get) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUserOptimistic: (user: User) => {
    const prevUsers = get().users;
    set({ users: [...prevUsers, user] });
    return () => set({ users: prevUsers });
  },
  replaceUser: (tempId:number, realUser:User) =>
  set((state) => ({
    users: state.users.map((u) => (u.id === tempId ? realUser : u)),
  })),
  updateUserOptimistic: (updatedUser: User) => {
    const prevUsers = get().users;
    set({
      users: prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    });
    return () => set({ users: prevUsers });
  },
  deleteUserOptimistic: (id: number) => {
    const prevUsers = get().users;
    set({ users: prevUsers.filter((u) => u.id !== id) });
    return () => set({ users: prevUsers });
  }
}))

export default useUserStore;