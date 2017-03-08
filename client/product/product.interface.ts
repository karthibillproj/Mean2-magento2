export interface Rating {
    ratingvalue: string; // required with minimum 5 chracters
    nickname: string; 
    summary: string; 
    review: string; 
}

export class Productdetail{
    name: string;
    price: string;
    sku: string;
    image: string;
    description: string;
}

export class Ratingmodel {
    constructor(
    ratingvalue: string,
    productId : string,
    customerId : string,
    nickName: string,
    title: string, 
    detail: string, 
    ){}
}

export class Inventory {
    constructor(
   public quantity: number, 
    ){}
}