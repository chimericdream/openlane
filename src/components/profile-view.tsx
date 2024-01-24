import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { EditProfileForm } from './edit-profile-form.tsx';

import { useProfileContext } from './profile-context.tsx';

const getFormattedNumber = (phoneNumber: string | null) => {
    if (!phoneNumber?.trim()) {
        return 'Not specified';
    }

    const d = phoneNumber!.replace(/\D/g, '').split('');
    return `+${d[0]} (${d[1]}${d[2]}${d[3]}) ${d[4]}${d[5]}${d[6]}-${d[7]}${d[8]}${d[9]}${d[10]}`;
};

export const ProfileView = () => {
    const [editing, setEditing] = useState(false);
    const [willDelete, setWillDelete] = useState(false);

    const { state, send } = useProfileContext();

    const { context } = state;

    if (editing) {
        return <EditProfileForm cancel={() => setEditing(false)} />;
    }

    return (
        <Card sx={{ mt: 8 }}>
            <CardContent>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ color: context.profile!.favoriteColor }}
                >
                    {context.profile!.fullName} Profile
                </Typography>
                <Box>
                    <Typography variant="h6">Email</Typography>
                    <Typography>{context.profile!.email}</Typography>
                    <Typography variant="h6">Full Name</Typography>
                    <Typography>{context.profile!.fullName}</Typography>
                    <Typography variant="h6">Phone Number</Typography>
                    <Typography>
                        {getFormattedNumber(context.profile!.phoneNumber)}
                    </Typography>
                    <Typography variant="h6">Favorite Color</Typography>
                    <Typography>{context.profile!.favoriteColor}</Typography>
                </Box>
            </CardContent>
            <CardActions
                disableSpacing
                sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
                <Button
                    fullWidth
                    color="info"
                    variant="contained"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </Button>
                <Button
                    fullWidth
                    color="warning"
                    variant="contained"
                    onClick={() => send({ type: 'logout' })}
                >
                    Log out
                </Button>
                <Divider flexItem />
                {!willDelete && (
                    <Button
                        fullWidth
                        color="error"
                        variant="contained"
                        onClick={() => setWillDelete(true)}
                    >
                        Delete
                    </Button>
                )}
                {willDelete && (
                    <>
                        <Typography>
                            Are you sure? This cannot be undone.
                        </Typography>
                        <ButtonGroup fullWidth variant="contained">
                            <Button
                                color="error"
                                onClick={() => send({ type: 'deleteProfile' })}
                            >
                                Yes. Nuke it.
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => setWillDelete(false)}
                            >
                                Never mind.
                            </Button>
                        </ButtonGroup>
                    </>
                )}
            </CardActions>
        </Card>
    );
};
