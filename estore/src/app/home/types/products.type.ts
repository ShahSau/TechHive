export interface Comment {
    commenter: string;
    comment: string;
    rating:number;
}

export interface Product {
    id: number;
    product_name: string;
    product_img: string;
    price: number;
    ratings: number;
    product_description: string;
    category_id: number;
    totalRatings: number;
    numberOfVaotes: number;
    commentsList: Comment[];
}