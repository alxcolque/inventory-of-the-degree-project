import { Button, Input, Link } from '@nextui-org/react'

export const Register = () => {
    return (
        <>
            <div className='flex flex-col w-1/2 gap-4 mb-4'>
                <Input
                    variant='bordered'
                    label='Name'
                />
                <Input
                    variant='bordered'
                    label='Email'
                    type='email'
                />
                <Input
                    variant='bordered'
                    label='Password'
                    type='password'
                />
                <Input
                    variant='bordered'
                    label='Confirm password'
                    type='password'
                />
            </div>

            <Button
                variant='flat'
                color='primary'>
                Register
            </Button>

            <div className='font-light text-slate-400 mt-4 text-sm'>
                Already have an account ?{" "}
                <Link href='/login' className='font-bold'>
                    Login here
                </Link>
            </div>
        </>
    )
}
