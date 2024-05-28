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
*สามารถเข้าถึง types ทั้งหมดได้ผ่าน ResourceType*

```typescript
import * as ResourceType from "jsonplaceholder";
// หรือดึง type แค่ที่ต้องการบางอันจาก module ได้
import { Todo, Comment, Photo } from "jsonplaceholder";

let todo: ResourceType.Todo = {
  userId: 1,
  id: 4234,
  title: "ส่งการบ้าน",
  completed: false
}

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

### การยิง request แต่ละ methods
```typescript
import axios, { AxiosResponse, AxiosError, HttpStatusCode } from "axios";
import * as ResourceType from "jsonplaceholder";
const API_URL: string = "https://jsonplaceholder.typicode.com/posts";

// ตัวอย่างสำหรับการยิง request ใน method GET
const fetchPosts = async <T extends object | Array<object>>(
  apiUrl: string = API_URL
): Promise<T | null> => {
  try {
    const { data, status } = await axios.get<Readonly<T>>(apiUrl);
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
// ทำบางอย่างกับข้อมูลที่ response มา ...

// สำหรับ method POST
const createPost = async <T extends object>(
  newPost: Partial<T>,
  apiUrl: string = API_URL
): Promise<void> => {
  try {
    const { status, data } = await axios.post(apiUrl, newPost);
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

// สำหรับ method PUT
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

// สำหรับ method DELETE
const deletePost = async (
  id: number,
  apiUrl: string = API_URL
): Promise<void> => {
  try {
    const { status } = await axios.delete<{}>(apiUrl.concat(`/${id}`));
    if (status === HttpStatusCode.Ok) {
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

---

### ข้อดี
*มี autocomplete ขึ้นให้อัติโนมัติไม่ต้องเสียเวลาเขียน type ใน object ให้นานเหมาะกับการทดสอบ API แล้วต้องเอาข้อมูลไปใช้งานต่อ*