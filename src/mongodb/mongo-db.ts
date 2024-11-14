// Collection
type UserMongo = {
    id: number; // auto increment - database task
    firstName: string;
    lastName: string;
    passportNumber: string;
    profile: {
        hobby: string;
        education: string;
    }; // 1..1
    sharedWalletsIds: { title: string; id: string; currency: string }[]; // 0..*
};

// Collection
type WalletMongo = {
    id: string; // Primary Key, UUID - app level
    title: string;
    currency: 'USD' | 'BTC' | 'BYN';
    ownerId: number;
    sharedWithUsers: { fullName: string; userId: number }[]; // 0..*
};
