import { User } from "./user.model";

export class NewsComment {

    id: string = '';
    newsId: string= '';
    message: string = '';
    user: User = new User();
    // userId: string = '';
}