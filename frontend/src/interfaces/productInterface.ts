export interface IProduct {
    _id?:string
    name: string;
    description: string;
    price: number;
    stock: number;
    category?:string,
    size?: string[];
    colour?: string[];
    images: string[];
}

interface color {
    name:string,
    color:string
}

export interface ICart {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    color?:color,
    size?:string,
    image:string,
    userId?:string
}

export interface CartState {
    items: ICart[];
}

export enum Color {
    Muted_Blue_Gradient = "linear-gradient(90deg, rgba(65,98,144,1) 0%, rgba(83,195,194,1) 48%, rgba(106,175,246,1) 100%)",
    Crimson_Red = "linear-gradient(90deg, rgba(207,33,33,1) 0%, rgba(255,144,80,1) 48%, rgba(246,188,106,1) 100%)",
    Tropical = "linear-gradient(90deg, rgba(39,207,33,1) 0%, rgba(75,207,145,1) 48%, rgba(106,236,246,1) 100%)",
}

export interface payload{
    role:string,
    id: string
}

