import { useMachine } from '@xstate/react';
import {
    createContext,
    useContext,
    type PropsWithChildren as PWC,
} from 'react';
import { profileMachine } from '../profile-machine.ts';

interface ProfileCtx {
    state: ReturnType<typeof useMachine<typeof profileMachine>>[0];
    send: ReturnType<typeof useMachine<typeof profileMachine>>[1];
}

const ProfileContext = createContext<ProfileCtx | null>(null);

export const ProfileProvider = ({ children }: PWC) => {
    const [state, send] = useMachine(profileMachine);

    return (
        <ProfileContext.Provider value={{ state, send }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = (): ProfileCtx => {
    const context = useContext(ProfileContext);

    if (context === null) {
        throw new Error(
            'useProfileContext must be used within a ProfileProvider'
        );
    }

    return context;
};
