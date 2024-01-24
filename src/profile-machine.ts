import { assign, setup } from 'xstate';

import type { Profile } from './types.ts';

export const profileMachine = setup({
    types: {
        context: {} as {
            message: string | null;
            profile: Profile | null;
            users: Record<string, Profile>;
        },
        events: {} as
            | {
                  type: 'loadData';
                  data: Record<string, Profile>;
              }
            | {
                  type: 'login';
              }
            | {
                  type: 'signup';
              }
            | {
                  type: 'tryLogin';
                  data: { email: string; password: string };
              }
            | {
                  type: 'trySignup';
                  data: Profile;
              }
            | {
                  type: 'updateProfile';
                  data: Profile;
              }
            | {
                  type: 'logout';
              }
            | {
                  type: 'deleteProfile';
              },
    },
}).createMachine({
    id: 'profile',
    initial: 'init',
    context: {
        message: null,
        profile: null,
        users: {},
    },
    states: {
        init: {
            always: {
                actions: assign({
                    users: () => {
                        const loadedUsers = localStorage.getItem('users');

                        if (!loadedUsers) {
                            return {};
                        }

                        return JSON.parse(loadedUsers) as Record<
                            string,
                            Profile
                        >;
                    },
                }),
                target: 'ready',
            },
        },
        ready: {
            entry: assign({
                profile: null,
            }),
            on: {
                tryLogin: [
                    {
                        actions: assign({
                            profile: ({ context, event }) => {
                                const { email } = event.data;

                                return context.users[email];
                            },
                            message: null,
                        }),
                        guard: ({ context, event }) => {
                            const { email, password } = event.data;
                            const user = context.users[email];

                            return user?.password === password;
                        },
                        target: 'loggedIn',
                    },
                    {
                        actions: assign({
                            message: 'Invalid email or password.',
                        }),
                        guard: ({ context, event }) => {
                            const { email, password } = event.data;
                            const user = context.users[email];

                            return user?.password !== password;
                        },
                    },
                ],
                signup: {
                    actions: assign({
                        message: null,
                    }),
                    target: 'signup',
                },
            },
        },
        signup: {
            on: {
                login: {
                    actions: assign({
                        message: null,
                    }),
                    target: 'ready',
                },
                trySignup: [
                    {
                        actions: assign({
                            profile: ({ event }) => event.data,
                            users: ({ context, event }) => {
                                const { email } = event.data;

                                const users = {
                                    ...context.users,
                                    [email]: event.data,
                                };

                                localStorage.setItem(
                                    'users',
                                    JSON.stringify(users)
                                );

                                return users;
                            },
                            message: null,
                        }),
                        guard: ({ context, event }) => {
                            const { email } = event.data;

                            return typeof context.users[email] === 'undefined';
                        },
                        target: 'loggedIn',
                    },
                    {
                        actions: assign({
                            message: 'User already exists.',
                        }),
                        guard: ({ context, event }) => {
                            const { email } = event.data;

                            return typeof context.users[email] !== 'undefined';
                        },
                    },
                ],
            },
        },
        loggedIn: {
            after: {
                60000: {
                    target: 'ready',
                    actions: assign({
                        message: 'Session expired.',
                    }),
                },
            },
            on: {
                updateProfile: {
                    actions: assign({
                        message: 'Profile updated.',
                        profile: ({ event }) => event.data,
                        users: ({ context, event }) => {
                            const { email } = event.data;

                            const users = {
                                ...context.users,
                                [email]: event.data,
                            };

                            localStorage.setItem(
                                'users',
                                JSON.stringify(users)
                            );

                            return users;
                        },
                    }),
                },
                deleteProfile: {
                    actions: assign({
                        users: ({ context }) => {
                            const { profile } = context;

                            if (profile) {
                                const { email } = profile;
                                const users = { ...context.users };

                                delete users[email];

                                localStorage.setItem(
                                    'users',
                                    JSON.stringify(users)
                                );

                                return users;
                            }

                            return context.users;
                        },
                    }),
                    target: 'ready',
                },
                logout: {
                    actions: assign({
                        message: null,
                        profile: null,
                    }),
                    target: 'ready',
                },
            },
        },
    },
});
