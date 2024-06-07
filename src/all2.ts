import axios, { AxiosStatic, AxiosResponse } from "axios";
import { Posts, Users, Photos, Albums, Photo } from "jsonplaceholder";
const { get }: AxiosStatic = axios;

/* ตัวอย่างการยิง request แบบหลายๆครั้งโดยข้อมูลที่จะ response กลับมาโครงสร้างข้อมูลใน array แตกต่างกันทั้งหมด */
type PromiseElement<T = any> = Promise<AxiosResponse<T>>;
type Responses = [posts: Posts, users: Users, photos: Photos, albums: Albums];
type Promises = [ posts: PromiseElement<Posts>, users: PromiseElement<Users>, photos: PromiseElement<Photos>, albums: PromiseElement<Albums>];
const tuple: Promises = [
  get<Posts>("https://jsonplaceholder.typicode.com/posts"),
  get<Users>("https://jsonplaceholder.typicode.com/users"),
  get<Photos>("https://jsonplaceholder.typicode.com/photos"),
  get<Albums>("https://jsonplaceholder.typicode.com/albums"),
];
const responses: Responses = [[], [], [], []];
let index: number = 0;

for await (const { data } of tuple) {
  responses[index] = data;
  ++index;
}

const [posts, users, photos, albums]: Responses = responses;
console.table(
  photos
    .slice(0, 50)
    .map(({ id, title, thumbnailUrl }: Photo): Partial<Photo> => {
      return { id, title, thumbnailUrl };
    })
);
