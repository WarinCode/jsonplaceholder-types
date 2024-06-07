# @types/jsonplaceholder

ประกาศ types ทั้งหมดของ
[JSONPlaceholder API.](https://jsonplaceholder.typicode.com/)

---

### การติดตั้งและใช้งาน

1. ติดตั้งโปรเจค

```
git clone https://github.com/WarinCode/jsonplaceholder-types.git
```

2. เข้าไปยัง directory โปรเจค

```
cd jsonplaceholder-types
```

3. ดาวโหลด์ library

```
npm install
```

4. ทดสอบการใช้งานและแสดงผลลัพธ์ทางหน้าจอ console

```
npm run test
```

---

### การสร้างตัวแปร

_สามารถเข้าถึง types ทั้งหมดได้ผ่าน ResourceType_

```typescript
import * as ResourceType from "jsonplaceholder";
// หรือดึง type แค่ที่ต้องการบางอันจาก module ได้
import { Todo, Comment, Photo } from "jsonplaceholder";

let todo: ResourceType.Todo = {
  userId: 1,
  id: 4234,
  title: "ส่งการบ้าน",
  completed: false,
};

// หรือ
let todo2: Todo = {
  userId: 2,
  id: 3453,
  title: "ประชุม",
  completed: true,
};

let todos: ResourceType.Todos = [];
todos.push(todo, todo2);
```

---

### การยิง request แต่ละ method

#### 1. สำหรับ method GET

```typescript
import axios, { AxiosResponse, AxiosError, HttpStatusCode } from "axios";
import * as ResourceType from "jsonplaceholder";
const API_URL: string = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async <T extends object | Array<object>>(
  apiUrl: string = API_URL
): Promise<T | null> => {
  try {
    const { data, status } = await axios.get<T>(apiUrl);
    if (status === HttpStatusCode.Ok) {
      return data;
    } else {
      throw new AxiosError("เกิดข้อผิดพลาดขึ้น!", status.toString());
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(`${e.name}: ${e.message}`);
    }
    return null;
  }
};

const posts: NonNullable<ResourceType.Posts> =
  (await fetchPosts<ResourceType.Posts>()) as NonNullable<ResourceType.Posts>;
console.log(posts);
```

#### 2. สำหรับ method POST

```typescript
const createPost = async <T extends object>(
  newPost: Partial<T>,
  apiUrl: string = API_URL
): Promise<void> => {
  try {
    const { status, data } = await axios.post<T, AxiosResponse<T>>(
      apiUrl,
      newPost
    );
    if (status === HttpStatusCode.Created) {
      console.log(data);
    } else {
      throw new AxiosError("เกิดข้อผิดพลาดขึ้น!", status.toString());
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(`${e.name}: ${e.message}`);
    }
  }
};

createPost<ResourceType.Post>({
  userId: 93782,
  id: 1342,
});
```

#### 3. สำหรับ method PUT

```typescript
const updatePost = async <T extends object>(
  id: number,
  newPost: Partial<T>,
  apiUrl: string = API_URL
): Promise<void> => {
  try {
    const { status, data } = await axios.put<T, AxiosResponse<T>>(
      apiUrl.concat(`/${id}`),
      newPost
    );
    if (status === HttpStatusCode.Ok) {
      console.log(data);
    } else {
      throw new AxiosError("เกิดข้อผิดพลาดขึ้น!", status.toString());
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(`${e.name}: ${e.message}`);
    }
  }
};

updatePost<ResourceType.Post>(2, {
  id: 35,
  userId: 3821,
});
```

#### 4. สำหรับ method DELETE

```typescript
const deletePost = async (
  id: number,
  apiUrl: string = API_URL
): Promise<void> => {
  try {
    const { status } = await axios.delete<{}>(apiUrl.concat(`/${id}`));
    if (status === HttpStatusCode.Ok) {
      console.log("ลบข้อมูลสำเร็จ");
    } else {
      throw new AxiosError("เกิดข้อผิดพลาดขึ้น!", status.toString());
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(`${e.name}: ${e.message}`);
    }
  }
};

deletePost(3);
```

### ตัวอย่างการยิง request แบบหลายๆครั้งโดยข้อมูลที่จะ response กลับมาโครงสร้างข้อมูลใน array เหมือนกันทั้งหมด

```typescript
import axios, { AxiosStatic, AxiosResponse } from "axios";
import { Todos, Todo } from "jsonplaceholder";
const { get, all }: AxiosStatic = axios;

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
```

### ตัวอย่างการยิง request แบบหลายๆครั้งโดยข้อมูลที่จะ response กลับมาโครงสร้างข้อมูลใน array แตกต่างกันทั้งหมด

```typescript
import axios, { AxiosStatic, AxiosResponse } from "axios";
import { Posts, Users, Photos, Albums, Photo } from "jsonplaceholder";
const { get }: AxiosStatic = axios;

type PromiseElement<T = any> = Promise<AxiosResponse<T>>;
type Responses = [posts: Posts, users: Users, photos: Photos, albums: Albums];
type Promises = [
  posts: PromiseElement<Posts>,
  users: PromiseElement<Users>,
  photos: PromiseElement<Photos>,
  albums: PromiseElement<Albums>
];

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
```

---

### ข้อดี

_มี autocomplete ขึ้นให้อัติโนมัติไม่ต้องเสียเวลาเขียน type ใน object ให้นานเหมาะกับการทดสอบ API แล้วต้องเอาข้อมูลไปใช้งานต่อ_
