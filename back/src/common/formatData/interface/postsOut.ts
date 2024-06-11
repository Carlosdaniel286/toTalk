export interface PostsOut{
        id: number;
        content: string;
        createdAt: Date;
        author: {
            name: string;
            id:number
        };
    }