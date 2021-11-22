import { NewsComment } from "./news-comment.model";

export class New {

    id: string = '';
    message: string= '';
    imageURL: string = '';
    ownerId: string = '';
    
    comment: Array<NewsComment> = [];

}