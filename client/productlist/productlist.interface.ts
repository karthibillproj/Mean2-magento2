export interface ProductListInterface{
    id: number;
    name: string;
    image: string;
    url: string;
    short_description: string;
    price: number;
    review: number;
}

export interface filterPreselect{
    brand:Object[],
    category: Object[],
    price: Object
}
