import { create, StateCreator } from "zustand";
import { appDB } from "../../api";

import { IGetUsersResponse, IUserRoleResponse, IUsersResponse } from "../../interface";
import { toast } from "sonner";
import { isAxiosError } from "axios";

interface UserState {
  users: IUsersResponse[];
  roleUsers: IUserRoleResponse[];
}
interface Actions {
  getUsers: (token: string) => Promise<void>;
  getUsersRoles: (id: number,token: string) => Promise<void>;
  createUserRole:(dataUserRole: [],token:string )=> Promise<void>;
  deleteUserRole: (id: string | number, token: string) => Promise<void>;
  updateStatus: (id: string | number, token: string) => Promise<void>;
  
}
const storeApi: StateCreator<UserState & Actions> = (set) => ({
  users: [], 
  roleUsers:[],
  getUsers: async (token) => {
    const {data} = await appDB.get<IGetUsersResponse>('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  console.log(data)
    set(() => ({
      users: data.users
    }))
  },

  createUserRole: async ( dataUserRole,token ) => {
  
    try {
        const response= await appDB.post('/role-user', dataUserRole,{
          headers: {
           Authorization: `Bearer ${token}`
          } 
        })


        toast.success(response.data.message);
       
        
    } catch (error) {
       

        if( isAxiosError(error) ){
            toast.error('Ocurrio un error', {
                description: error.response?.data.message
            })
        }
    }
},


getUsersRoles: async (id,token) => {

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
      console.log(e);
      if (isAxiosError(e)) {
        toast.error('Ocurrió un error al eliminar el usuario', {
          description: e.response?.data.message
        });
      }
    }
  },

  updateStatus: async (id,token) => {
    await appDB.get<IUsersResponse>(`/role-user/status/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
 
  },

});




export const userStore = create<UserState & Actions>()(
  storeApi,
);