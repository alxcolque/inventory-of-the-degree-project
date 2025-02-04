import { create, StateCreator } from "zustand";
import { appDB } from "../../api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { IListSettings } from "../../interface/settings/list-response";
//import { ISettingsResponse, ISystemDataResponse } from "../../interface";
import { ISettingsResponse } from "../../interface";
import { IUpdateSettingResponse } from "../../interface/settings/update-settings-response";
import { company } from "../../api/systemdata";

interface SettingState {
  setting: IListSettings[];
  systemData: {};
}
interface Actions {
  getSystemData: () => Promise<void>;
  getSettings: (id: number, token: string) => Promise<void>;
  updatedSetting: (
    id: number,
    name: string,
    logo: string,
    description: string,
    header: string,
    contact: string,
    support: string,
    social: string,
    footer: string,
    token: string
  ) => Promise<void>;
}

const storeApi: StateCreator<SettingState & Actions> = (set, get) => ({
  setting: [],
  systemData: {},
  getSystemData: async () => {
    try {
      //const {data} = await appDB.get<ISystemDataResponse>('/system-data');
      const data = company;
      //console.log(data);
      set(() => ({
        systemData: data
      }));
      //console.log(get().systemData);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },

  getSettings: async (id, token) => {
    try {
      const { data } = await appDB.get<ISettingsResponse>(`/settings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (typeof data.setting === 'object' && data.setting !== null) {
        const settingsArray = Array.of(data.setting);

        set(() => ({
          setting: settingsArray,
        }));

        //console.log(settingsArray);
      } else {
        // ... manejo de errores ...
      }
    } catch (error) {
      // ... manejo de errores ...
    }
  },


  updatedSetting: async (
    id,
    name,
    logo,
    description,
    header,
    contact,
    support,
    social,
    footer,
    token
  ) => {
    const getSettings = get().getSettings;
    try {
      const { data } = await appDB.put<IUpdateSettingResponse>(`/settings/${id}`, {
        id,
        name,
        logo,
        description,
        header,
        contact,
        support,
        social,
        footer,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(data.message);
      await getSettings(id, token);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Ocurrio un error", {
          description: error.response?.data.message,
        });
      }
    }
  },
});

export const useSettingStore = create<SettingState & Actions>()(storeApi);
