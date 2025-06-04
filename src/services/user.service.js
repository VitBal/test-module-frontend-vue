import { api } from "../api";

export const UserService = {
  resource: "users",

  edit(id) {
    return api.get(`${this.resource}/${id}/edit`);
  },

  update(id, data) {
    return api.patch(`${this.resource}/${id}`, data);
  },
};
