import { create, StateCreator } from "zustand"
import { appDB } from "../../api";
import { ILoginResponse, IUser } from "../../interface";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { persist } from "zustand/middleware";
//import { dataLogin } from "../../api/systemdata";

interface AuhtState {
    user: undefined | IUser,
    token: undefined | string,
    authStatus: 'pending' | 'auth' | 'not-auth',
}
interface Actions {
    logout: () => Promise<void>;
    login: (
        email: string,
        password: string
    ) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    hasPermission: (permission: string) => boolean;
    hasRole: (role: string) => boolean;
}

const storeApi: StateCreator<AuhtState & Actions> = (set, get) => ({
    user: undefined,
    token: undefined,
    authStatus: 'pending',
    login: async (email: string, password: string) => {
        try {
            const { data } = await appDB.post<ILoginResponse>('/auth/login', { email, password });
            //parse object to json
            set(() => ({
                user: data.user,
                token: data.token,
                authStatus: 'auth'
            }));
            toast.success(`Bienvenido ${data.user.name}`);
            
        }
        catch (error) {
            set(() => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }));
            if (isAxiosError(error)) {
                toast.error(
                    'Error',
                    {
                        description: error.response?.data.message || 'Error desconocido al iniciar sesión'
                    }
                );
            }
        }
    },
    hasPermission: (permission) => {
        const { user } = useAuthStore.getState();
        return user?.permissions.includes(permission) ?? false;
    },
    hasRole: (role) => {
        const { user } = useAuthStore.getState();
        return user?.roles.includes(role) ?? false;
    },
    checkAuthStatus: async () => {
        const token = get().token;
        if (!token) {
            set(() => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }));

            return;
        }
        try {
            const { data } = await appDB.get<{ user: IUser }>('/auth/checkToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set(() => ({
                user: data.user,
                token: token,
                authStatus: 'auth'
            }));
        } catch (error) {
            set(() => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }));
        }
    },
    logout: async () => {
        const token = get().token;
        /* Si es la autenticacion es UNAUTHENTICATED, SE LIMPIA EL ESTADO */
        if (get().authStatus === 'not-auth') {
            set(() => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }));
            return;
        }
        try {
            /*await appDB.post('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });*/
            console.log(token);
            set(() => ({
                user: undefined,
                token: undefined,
                authStatus: 'not-auth'
            }));
        }
        catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    set(() => ({
                        user: undefined,
                        token: undefined,
                        authStatus: 'not-auth'
                    }));
                }
                toast.error(
                    'Error',
                    {
                        description: error.response?.data.message || 'Error desconocido'
                    }
                );

            }
        }
    }
})

export const useAuthStore = create<AuhtState & Actions>()(
    persist(storeApi, {
        name: 'auth-store'
    })
);