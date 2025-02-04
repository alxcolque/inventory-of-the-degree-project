import { Button, Input, Textarea } from "@nextui-org/react";

import { useEffect, useState } from "react";

import { useSettingStore } from "../../../stores/settings/settings.store";
import { useAuthStore } from "../../../stores";


export const SettingsPage = () => {
  const token = useAuthStore(state => state.token);
  const [currentLogo, setCurrentLogo] = useState('');
  const settings = useSettingStore(state => state.setting);
  const getSettings = useSettingStore(state => state.getSettings);

  const [image, setImage] = useState<File>();
  const [preImage, setPreImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


  const updateSetting = useSettingStore(state => state.updatedSetting)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
    const preview = URL.createObjectURL(file);
    setPreImage(preview)
    if(preview){
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentLogo(reader.result as string);
        
      }
      reader.readAsDataURL(file);
    }
    //console.log(currentLogo);

  }

  const handleFetchSettings = async () => {
    if (settings.length === 0) {
      await getSettings(1, token!);
    }

  }
  useEffect(() => {

    handleFetchSettings();

  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    

    const logo = image ? currentLogo : settings[0].logo;
    const form = e.target as HTMLFormElement;
    const settingName = form.settingName?.value || "";
    const description = form.description?.value || "";
    const header = form.header?.value || "";
    const contact = form.contacts?.value || "";
    const support = form.support?.value || "";
    const social = form.social?.value || "";
    const footer = form.footer?.value || "";

    await updateSetting(
      1,
      settingName,
      logo,
      description,
      header,
      contact,
      support,
      social,
      footer,
      token!
    );

    setIsLoading(false);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 w-full mx-auto max-w-md">
          {
            settings.map((setting) => (

              <form key={setting.id} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="settingName"
                      className="block text-sm font-medium text-gray-700"

                    >
                      Nombre del sistema:
                    </label>
                    <Input
                      type="text"
                      id="settingName"
                      name="settingName"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue={setting.name}
                    />
                  </div>

                  <div className='flex flex-col md:flex-row gap-2'>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="logo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Logo:
                      </label>
                      <Input type="file" id="logo" className="hidden" onChange={handleImage} name="logo" accept="image/*" />
                      <label
                        htmlFor="logo"
                        className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Seleccionar archivo
                      </label>
                    </div>
                    <div className="mt-1">
                      <img src={preImage ? preImage : setting?.logo ? setting.logo : 'https://via.placeholder.com/200x200'} alt="Imagen del carrusel" className="w-20 h-20 object-cover" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descripción:
                    </label>
                    <Textarea
                      type="text"
                      id="description"
                      name="description"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue={setting.description}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="header"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Encabezado:
                    </label>
                    <Textarea
                      id="header"
                      name="header"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue={setting.header}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contacts"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contactos:
                    </label>
                    <Input
                      type="text"
                      id="contacts"
                      name="contacts"
                      defaultValue={setting.contact}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Soporte:
                    </label>
                    <Input
                      type="text"
                      id="support"
                      name="support"
                      defaultValue={setting.support}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="social"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Social:
                    </label>
                    <Textarea
                      id="social"
                      name="social"
                      defaultValue={setting.social}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="footer"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Footer:
                    </label>
                    <Textarea
                      id="footer"
                      name="footer"
                      defaultValue={setting.footer}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="pt-5">
                    <Button isLoading={isLoading} isDisabled={isLoading} color="primary" type="submit">
                      Actualizar
                    </Button>
                  </div>
                </div>

              </form>
            ))
          }


        </div>

      </div>
    </div>

  );
};
