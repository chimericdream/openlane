import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Profile } from '../types.ts';

import { useProfileContext } from './profile-context.tsx';

const schema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(10)
        .max(32)
        .regex(/[^a-zA-Z0-9]/)
        .regex(/[0-9].*[0-9]/)
        .regex(/[A-Z].*[A-Z]/),
});

export const LoginForm = () => {
    const { state, send } = useProfileContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { context } = state;

    return (
        <>
            <h1>Login</h1>
            {context.message && <p>{context.message}</p>}
            <form
                onSubmit={handleSubmit((d) => {
                    const data = { ...d } as Profile;
                    if (data.phoneNumber) {
                        data.phoneNumber =
                            '+' + data.phoneNumber.replace(/\D/g, '');
                    }

                    send({ type: 'tryLogin', data });
                })}
            >
                <label htmlFor="email">Email address</label>
                <input type="email" {...register('email')} />
                <br />
                {errors.email?.message && (
                    <p>{String(errors.email?.message)}</p>
                )}
                <label htmlFor="password">Password</label>
                <input type="password" {...register('password')} />
                <br />
                {errors.password?.message && (
                    <p>{String(errors.password?.message)}</p>
                )}
                <button type="submit">Login</button>
            </form>
            <button onClick={() => send({ type: 'signup' })}>
                Sign up instead
            </button>
        </>
    );
};
