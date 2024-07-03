export interface PostsOut{
        id: number;
        content: string;
        createdAt: Date;
        countComments:number;
        author: {
            name: string;
            id:number
        };
    }