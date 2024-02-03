export interface Avatar {
    url: string;
    public_id: string;
}

export interface Author {
    _id: string;
    name: string;
    about: string;
    avatar: Avatar | null;
}
