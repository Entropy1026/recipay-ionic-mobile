import { Ingredient } from './ingredient';
import { Comment } from './comment';

export interface Subcategory {
    id: number;
    name: string;
    image: string;
    ingredients: Ingredient;
    text_instruction: string;
    video: string;
    price: number;
    sold: number;
    type: string;
    favorite: boolean;
    pax: number;
    rate: string;
    comment: Comment;
}