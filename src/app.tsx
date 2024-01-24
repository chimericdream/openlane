import { LoginForm } from './components/login-form.tsx';
import { useProfileContext } from './components/profile-context.tsx';
import { ProfileView } from './components/profile-view.tsx';
import { SignupForm } from './components/signup-form.tsx';

export const App = () => {
    const { state } = useProfileContext();

    switch (state.value) {
        case 'init':
            return null;
        case 'ready':
            return <LoginForm />;
        case 'signup':
            return <SignupForm />;
        case 'loggedIn':
            return <ProfileView />;
        default:
            return (
                <>
                    <h1>Inconceivable!</h1>
                    <p>It shouldn't be possible to get here...</p>
                    <img src="/img/inconceivable.gif" alt="Inconceivable!" />
                </>
            );
    }
};
