import { Button, Input } from "@nextui-org/react"
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../stores";


export const Login = () => {

  const login = useAuthStore(state => state.login);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.target as HTMLFormElement;
    if (email.value.trim() === '' || password.value.trim() === '') {
      //TODO:: toaster
      setIsLoading(false);
      toast.error('Correo y contraseña son requeridos');
      return;
    }
    // TODO: Login logic
    await login(email.value, password.value);
    setIsLoading(false);
  }
  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>Inicio de sesión</div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className='flex flex-col gap-4 mb-4'>
          <Input
            name="email"
            isRequired
            variant='bordered'
            label='Email'
            type='email'
          />
          <Input
            name="password"
            isRequired
            variant='bordered'
            label='Password'
            type='password'
          />
        </div>

        <Button
          isLoading={isLoading}
          type="submit"
          fullWidth
          variant='flat'
          color='primary'>
          Ingresar
        </Button>
      </form>
    </>
  )
}
