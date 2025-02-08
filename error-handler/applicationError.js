export default class ApplicationError extends Error{
    constructor(message)
    {
        super(message);
        this.code = this.code;
    }
}