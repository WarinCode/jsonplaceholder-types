declare module "jsonplaceholder" {
  export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  export type Comment = Pick<Post, "id" | "body"> & {
    postId: number;
    name: string;
    email: string;
  };
  export type Album = Omit<Post, "body">;
  export type Photo = Omit<Album, "userId"> & {
    albumId: number;
    url: string;
    thumbnailUrl: string;
  };
  export type Todo = Omit<Post, "body"> & {
    completed: boolean;
  };
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }
  export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  export interface Geo {
    lat: string;
    lng: string;
  }
  export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  export type Posts = Post[];
  export type Comments = Comment[];
  export type Albums = Album[];
  export type Photos = Photo[];
  export type Todos = Todo[];
  export type Users = User[];
}
