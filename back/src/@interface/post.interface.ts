export  interface  Published {
    id:number
    content:string
    createdAt:string
    author:string,
    isCreator:boolean
    countComments:number
}
// Define a interface para o autor de um post
export interface Author {
    id: number; // Identificador único do autor
    name: string; // Nome do autor
  }
  
  // Define a interface para um post
  export interface PostField {
    id: number; // Identificador único do post
    content: string; // Conteúdo do post
    createdAt: Date; // Data de criação do post
    countComments: number; // Contagem de comentários no post
    author: Author; // Informações sobre o autor do post
  }
  