import { NewsComment } from "./news-comment.model";
import { User } from "./user.model";

export class News {

    id: string = '';
    message: string= '';
    imageURL: string = '';
    // user_id: string = '';
    user: User = new User();    
    comments: Array<NewsComment> = [];
    likes: Array<User> = [];

}