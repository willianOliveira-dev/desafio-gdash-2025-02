export interface NavUserProps {
    user: {
        username: string;
        email: string;
        avatar: string;
        logout: () => Promise<void>;
    };
}
