import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Profile } from '../types.ts';

import { useProfileContext } from './profile-context.tsx';
import { TextInput } from './text-input.tsx';

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
                Sign in
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

                    send({ type: 'tryLogin', data });
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                >
                    Sign In
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => send({ type: 'signup' })}
                    sx={{ mb: 2 }}
                >
                    Sign up instead
                </Button>
            </Box>
        </Box>
    );
};
