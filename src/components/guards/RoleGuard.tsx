import { useAuthStore } from "../../stores";

interface RoleGuardProps {
    roles: string[];
    children: React.ReactNode;
  }
  
  const RoleGuard: React.FC<RoleGuardProps> = ({ roles, children }) => {
    const { hasRole } = useAuthStore();
  
    if (!roles.some((role) => hasRole(role))) {
      return null;
    }
  
    return <>{children}</>;
  };
  
  export default RoleGuard;

  //ejemplo
  /* 
  <RoleGuard roles={['admin', 'owner']}>
        <p>Este contenido solo lo ven los administradores y propietarios.</p>
        Aquí podrías poner una lista de usuarios, opciones para crear o modificar
        </RoleGuard>
  */