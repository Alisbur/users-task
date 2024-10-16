import { DATA_URL } from "../shared/constants/path";
import { create } from "zustand";

export const useUsersStore = create((set, get) => ({
  users: [],

  uploadUsers: () => {
    fetch(DATA_URL)
      .then((data) => data.json())
      .then((usersList) => {
        set({ users: usersList });
      })
      .catch((err) => console.log("Ошибка загрузки данных", err))
  },

  modifyUserData: (newUserData) => {
    if (newUserData.id) {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === Number(newUserData.id) ? newUserData : u
        ),
      }));
    }
  },

  getUser: (id) => {
    const user = get().users.find((u) => u.id === Number(id));
    return user ? user : null;
  },

  companySort: () => {
    set((state) => ({
      users: [...state.users].sort((a, b) =>
        a.company.name.toUpperCase() < b.company.name.toUpperCase() ? -1 : 1
      ),
    }));
  },

  citySort: () => {
    set((state) => ({
      users: [...state.users].sort((a, b) =>
        a.address.city.toUpperCase() < b.address.city.toUpperCase() ? -1 : 1
      ),
    }));
  },
}));
