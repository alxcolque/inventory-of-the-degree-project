import { useAuthStore } from "../../stores";

interface PermissionGuardProps {
    permission: string;
    children: React.ReactNode;
  }
  
  const PermissionGuard: React.FC<PermissionGuardProps> = ({ permission, children }) => {
    const { hasPermission } = useAuthStore();
  
    if (!hasPermission(permission)) {
      return null; // No renderiza si no tiene el permiso
    }
    return <>{children}</>;
  };
  export default PermissionGuard;
  /* 
  Ejemplo
    <PermissionGuard permission="create-post">
        <button className="btn btn-primary">Crear Publicación</button>
      </PermissionGuard>
  */