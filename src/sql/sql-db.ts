// Table
type User = {
    id: number; // Primary Key (PK), auto increment - database task
    firstName: string;
    lastName: string;
    passportNumber: string;
};

// Table
type Wallet = {
    id: string; // Primary Key (PK), UUID - app level
    title: string;
    currency: 'USD' | 'BTC' | 'BYN';
    ownerId: number; // Foreign Key (FK) referencing User
};

// Table
type Profile = {
    hobby: string;
    education: string;
    userId: number; // Foreign Key (FK) referencing User
};

// Table
type WalletsSharings = {
    id: string; // Primary Key (PK), UUID - app level
    walletId: string; // Foreign Key (FK) referencing Wallet
    userId: number; // Foreign Key (FK) referencing User
    addedDate: Date;
    status: 'Paused' | 'Active' | 'Delete';
};

// Table
type WalletsSharingsLimits = {
    limitPerDay: number;
    limitPerWeek: number;
    limitPerMonth: number;
};
