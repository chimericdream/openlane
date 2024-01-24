import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SelectInput } from './select-input.tsx';
import { TextInput } from './text-input.tsx';

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

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(schema),
    });

    const { context } = state;

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Signup
            </Typography>
            {context.message && <p>{context.message}</p>}
            <Box
                component="form"
                onSubmit={handleSubmit((d) => {
                    const data = { ...d } as Profile;
                    if (data.phoneNumber) {
                        data.phoneNumber =
                            '+' + data.phoneNumber.replace(/\D/g, '');
                    }

                    send({ type: 'trySignup', data });
                })}
                sx={{ mt: 1 }}
            >
                <TextInput
                    control={control}
                    name="email"
                    label="Email Address"
                />
                <TextInput
                    control={control}
                    name="password"
                    label="Password"
                    fieldType="password"
                />
                <TextInput
                    control={control}
                    name="fullName"
                    label="Full Name"
                />
                <TextInput
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                />
                <SelectInput
                    control={control}
                    name="favoriteColor"
                    label="Favorite Color"
                    options={[
                        'blue',
                        'red',
                        'green',
                        'yellow',
                        'purple',
                        'black',
                        'orange',
                    ]}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                >
                    Sign Up
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => send({ type: 'login' })}
                    sx={{ mb: 2 }}
                >
                    Log in instead
                </Button>
            </Box>
        </Box>
    );
};
