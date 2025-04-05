import { create, StateCreator } from "zustand";
import { appDB } from "../../api";

import { IUserRoleResponse, IUsersResponse } from "../../interface";
import { toast } from "sonner";
import { isAxiosError } from "axios";

interface UserState {
  users: IUsersResponse[];
  user: IUsersResponse;
  roleUsers: IUserRoleResponse[];
}
interface Actions {
  getUsers: (token: string) => Promise<void>;
  createUser: (data:  [] | any, token: string) => Promise<void>;
  updateUser: (id: number, data:  [] | any, token: string) => Promise<void>;
  deleteUser: (id: number, token: string) => Promise<void>;
  getUsersRoles: (id: number, token: string) => Promise<void>;
  createUserRole: (dataUserRole: [], token: string) => Promise<void>;
  deleteUserRole: (id: string | number, token: string) => Promise<void>;
  updateStatus: (id: string | number, token: string) => Promise<void>;
  getUser: (id: number, token: string) => Promise<void>;
  updateRole: (id: number, data: { role: string, status: string }, token: string) => Promise<void>;
}
const storeApi: StateCreator<UserState & Actions> = (set, get) => ({
  users: [],
  user: {} as IUsersResponse,
  roleUsers: [],
  getUsers: async (token) => {
    const response = await appDB.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    set(() => ({
      users: response.data
    }))
  },
  getUser: async (id, token) => {
    const response = await appDB.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    set(() => ({
      user: response.data
    }))
  },
  createUser: async (data, token) => {
    try {
      const response = await appDB.post('/users', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      get().getUsers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Error al crear el usuario", {
          description: error.response?.data.message
        });
      }
    }
  },

  updateUser: async (id, data, token) => {
    try {
      const response = await appDB.put(`/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      get().getUsers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Error al actualizar el usuario", {
          description: error.response?.data.message
        });
      }
    }
  },
  deleteUser: async (id, token) => {
    try {
      const response = await appDB.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      get().getUsers(token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Error al eliminar el usuario", {
          description: error.response?.data.message
        });
      }
    }
  },

  createUserRole: async (dataUserRole, token) => {

    try {
      const response = await appDB.post('/role-user', dataUserRole, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })


      toast.success(response.data.message);


    } catch (error) {


      if (isAxiosError(error)) {
        toast.error('Ocurrio un error', {
          description: error.response?.data.message
        })
      }
    }
  },


  getUsersRoles: async (id, token) => {

    const { data } = await appDB.get(`/role-user-list/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    set(() => ({
      roleUsers: data.roleUsers
    }))
  },

  deleteUserRole: async (id, token) => {

    try {
      const data = await appDB.delete(`/role-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(data.data.message);

    }
    catch (e) {
      if (isAxiosError(e)) {
        toast.error('Ocurrió un error al eliminar el usuario', {
          description: e.response?.data.message
        });
      }
    }
  },

  updateStatus: async (id, token) => {
    await appDB.get<IUsersResponse>(`/role-user/status/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  updateRole: async (id, data, token) => {
    try {
      await appDB.put(`/user-update-role/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Rol actualizado correctamente");
      get().getUser(id, token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Error al actualizar el rol del usuario", {
          description: error.response?.data.message
        });
      }
    }
  }
});




export const userStore = create<UserState & Actions>()(
  storeApi,
);