export class User {
    email: string;
    created_at: Date;
    shows_ranking: boolean;
    finish_count: number;

    constructor() {
        this.email = "";
        this.created_at = new Date();
        this.shows_ranking = false;
        this.finish_count = 0;
    }
}