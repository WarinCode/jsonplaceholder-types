import axios, { AxiosResponse, AxiosError, HttpStatusCode } from "axios";
import * as ResourceType from "jsonplaceholder";
const API_URL = "https://jsonplaceholder.typicode.com/posts";

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
