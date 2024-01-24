import { useState } from 'react';
import { EditProfileForm } from './edit-profile-form.tsx';

import { useProfileContext } from './profile-context.tsx';

export const ProfileView = () => {
    const [editing, setEditing] = useState(false);

    const { state, send } = useProfileContext();

    const { context } = state;

    if (editing) {
        return <EditProfileForm cancel={() => setEditing(false)} />;
    }

    return (
        <>
            <h1 style={{ color: context.profile!.favoriteColor }}>
                {context.profile!.fullName} Profile
            </h1>
            <div>
                Current context:
                <pre>
                    <code>{JSON.stringify(state.context, null, 2)}</code>
                </pre>
            </div>
            <button onClick={() => send({ type: 'deleteProfile' })}>
                Delete
            </button>
            <br />
            <button onClick={() => send({ type: 'logout' })}>Logout</button>
            <br />
            <button onClick={() => setEditing(true)}>Edit</button>
        </>
    );
};
