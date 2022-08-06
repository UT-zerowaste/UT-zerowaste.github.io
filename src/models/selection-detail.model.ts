export class DetailSelection {
    id: number;
    parentId: number;
    name: string;
    points: number;
    //TODO: Need to add an image blob if we save it in the db or image url if we save it here
    constructor() {
        this.id = 0;
        this.parentId = 0;
        this.name = "";
        this.points = 0;
    }
}