export class SelectionOption {
    id: number;
    name: string;
    //TODO: Need to add an image blob if we save it in the db or image url if we save it here
    constructor() {
        this.id = 0;
        this.name = "";
    }
}