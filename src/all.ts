import axios, { AxiosStatic, AxiosResponse } from "axios";
import { Todos, Todo } from "jsonplaceholder";
const { get, all }: AxiosStatic = axios;

/* ตัวอย่างการยิง request แบบหลายๆครั้งโดยข้อมูลที่จะ response กลับมาโครงสร้างข้อมูลใน array เหมือนกันทั้งหมด */
type PromiseElement<T = any> = Promise<AxiosResponse<T>>;
type Promises<T = any> = Array<PromiseElement<T>>;
type Response<T = any> = AxiosResponse<T>;

const urls: string[] = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
];

const promiseArray: Promises<Todo> = urls.map(
  (url: string): PromiseElement<Todo> => get<Todo>(url)
);
const responses: Array<Response<Todo>> = await all<Response<Todo>>(
  promiseArray
);
const todos: Todos = responses.map(({ data }: Response<Todo>): Todo => data);
console.table(todos);
