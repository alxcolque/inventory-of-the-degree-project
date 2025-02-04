import { useSettingStore } from "../stores";
import { useEffect } from "react";

export const PrivacyPage = () => {
  const company = useSettingStore(state => state.systemData);
  const getSystemData = useSettingStore(state => state.getSystemData);
  useEffect(() => {
    getSystemData();
  }, []);
  if (!company) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Política de privacidad</h1>
      <div className="mt-4">Política de privacidad</div>
    </div>
  );
}

