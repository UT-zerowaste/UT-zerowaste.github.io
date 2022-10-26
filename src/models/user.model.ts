export class User {
    email: string;
    created_at: Date;
    shows_ranking: boolean;
    finish_count: number;
    successful_completions: number;
    username: string;

    constructor() {
        this.email = "";
        this.created_at = new Date();
        this.shows_ranking = false;
        this.finish_count = 0;
        this.successful_completions = 0;
        this.username = "";
    }
}