import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { FooterLayout } from "../layouts";


/* const fieldsData: ISuperSimpleFieldResponse[] = [
  {
    id: 1,
    name: 'Cancha Culking',
    category: 'Futbol 5',
    slug: 'cancha-culking',
    description: 'Cancha de futbol 5 en Oruro',
    location: 'Oruro',
    address: 'Dirección de la cancha',
    status: 'Activo',
    score: 4.9,
    image: '/campo1.jpg',
  },
  {
    id: 2,
    name: 'Walli vinto',
    category: 'Wali',
    slug: 'walli-vinto',
    description: 'Cancha de Wali en Cochabamba',
    location: 'Cochabamba',
    address: 'Dirección de la cancha',
    status: 'Activo',
    score: 4.3,
    image: '/campo2.jpg',
  },
  {
    id: 3,
    name: 'Cancha Culking 34',
    category: 'Futbol 5',
    slug: 'cancha-culking-34',
    description: 'Cancha de futbol 5 en Oruro',
    location: 'Oruro',
    address: 'Dirección de la cancha',
    status: 'Activo',
    score: 4.9,
    image: '/campo1.jpg',
  },
  {
    id: 4,
    name: 'Walli vinto 4',
    category: 'Wali',
    slug: 'walli-vinto-4',
    description: 'Cancha de Wali en Cochabamba',
    location: 'Cochabamba',
    address: 'Dirección de la cancha',
    status: 'Activo',
    score: 4.3,
    image: '/campo2.jpg',
  },
]; */
export const Welcome = () => {
  

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  /* antes de cargar los carruseles, se ve el efecto de skeleton */
  
  if(isLoading){
    return (
      <div className="my-0 px-4 md:px-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <Skeleton className="w-full h-[300px]" />
      </div>
    )
  }
  

  return (
    <div className="my-0 px-4 md:px-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Noticias</h2>
      <FooterLayout />
    </div>
  )
}
export const UserPage = () => {
  return (
    <>
      <div>User page </div>
    </>
  )
}
export const WorkerPage = () => {
  return (
    <>
      <div>Worker page</div>
    </>
  )
}
export const OwnerPage = () => {
  return (
    <>
      <div>Owner Page</div>
    </>
  )
}
export const AdminPage = () => {
  return (
    <>
      <div>Admin page</div>
    </>
  )
}
