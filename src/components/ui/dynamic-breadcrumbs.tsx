import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbItem, Breadcrumbs} from '@nextui-org/react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

export const DynamicBreadcrumbs = () => {
  const location = useLocation();

  // Dividir la ruta actual en fragmentos
  const pathnames = location.pathname.split('/').filter(x => x);

  // Capitalizar el nombre del breadcrumb
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const breadcrumbs: BreadcrumbItem[] = pathnames.map((value, index) => {
    const pathTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      name: capitalize(value),
      path: pathTo,
    };
  });

  

  return (
    <Breadcrumbs>
      {/* Renderizar Home si no estamos en la raíz */}
      {pathnames.length > 0 && (
        <BreadcrumbItem>
          <Link to="/">Inicio</Link>
        </BreadcrumbItem>
      )}
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <BreadcrumbItem key={breadcrumb.path}>
            {isLast ? (
              <p>{breadcrumb.name}</p> // Texto plano si es el último breadcrumb
            ) : (
              <Link to={breadcrumb.path}>{breadcrumb.name}</Link> // Enlace navegable si no es el último
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

