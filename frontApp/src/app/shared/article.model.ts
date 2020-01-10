export class Article {
    id: number;
    title: string;
    body: string;
    categories: string[];

    constructor(t:string,b:string) {
        this.title=t;
        this.body=b;
    }
}