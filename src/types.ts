export interface Profile {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    favoriteColor:
        | 'blue'
        | 'red'
        | 'green'
        | 'yellow'
        | 'purple'
        | 'black'
        | 'orange';
}
