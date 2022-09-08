export class DetailSelection {
    child_id: number;
    parent_id: number;
    name: string;
    details: string;
    bin_type: string

    //TODO: Need to add an image blob if we save it in the db or image url if we save it here
    constructor() {
        this.child_id = 0;
        this.parent_id = 0;
        this.name = "";
        this.details = "";
        this.bin_type = "";
    }
}