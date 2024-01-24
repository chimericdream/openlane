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
    fullName: z.string().min(3),
    phoneNumber: z
        .string()
        .refine((value) => {
            const val = value.replace(/\D/g, '');
            return val.length === 11;
        })
        .optional(),
    favoriteColor: z.enum([
        'blue',
        'red',
        'green',
        'yellow',
        'purple',
        'black',
        'orange',
    ]),
});

export const SignupForm = () => {
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
            <h1>Signup</h1>
            {context.message && <p>{context.message}</p>}
            <form
                onSubmit={handleSubmit((d) => {
                    const data = { ...d } as Profile;
                    if (data.phoneNumber) {
                        data.phoneNumber =
                            '+' + data.phoneNumber.replace(/\D/g, '');
                    }

                    send({ type: 'trySignup', data });
                })}
            >
                <label htmlFor="email">Email</label>
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
                <label htmlFor="fullName">Full Name</label>
                <input type="text" {...register('fullName')} />
                <br />
                {errors.fullName?.message && (
                    <p>{String(errors.fullName?.message)}</p>
                )}
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" {...register('phoneNumber')} />
                <br />
                {errors.phoneNumber?.message && (
                    <p>{String(errors.phoneNumber?.message)}</p>
                )}
                <label htmlFor="favoriteColor">Favorite Color</label>
                <select {...register('favoriteColor')}>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                    <option value="black">Black</option>
                    <option value="orange">Orange</option>
                </select>
                <br />
                <button type="submit">Signup</button>
            </form>
            <button onClick={() => send({ type: 'login' })}>
                Log in instead
            </button>
        </>
    );
};
