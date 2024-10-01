export class NotFoundException extends Error {
    constructor() {
        super("Item Not Found");
    }
}
