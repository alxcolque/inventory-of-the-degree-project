import { useSettingStore } from "../stores";

import { useEffect } from "react";

export const TermsPage = () => {
  const company = useSettingStore(state => state.systemData);
  const getSystemData = useSettingStore(state => state.getSystemData);
  useEffect(() => {
    getSystemData();
  }, []);
  if (!company) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Términos y condiciones</h1>
      <div className="mt-4">Terminos y condiciones</div>
    </div>
  );
}