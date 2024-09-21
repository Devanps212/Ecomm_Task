export interface IImage {
    public_id: string;
    url: string;
}

export interface IProduct {
    _id?:string
    name: string;
    description: string;
    price: number;
    stock: number;
    size: string[];
    colour: string[];
    images: IImage[];
}
