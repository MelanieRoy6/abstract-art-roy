export interface Client {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    createdAt?: string;
}

export interface Artwork {
    id?: number;
    title: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category?: string;
    featured?: boolean;
    sold?: boolean;
    createdAt?: string;
}
