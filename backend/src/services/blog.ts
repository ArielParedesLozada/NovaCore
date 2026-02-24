import { BlogSchema } from "../infrastructure/validators/blog.ts";
import { BlogModel } from "../model/blog.ts";
import { ImageService } from "./image.ts";

interface BlogCreateData {
    title: string;
    urls: string[];
    description: string;
    authors: string[];
    tags: string[];
}

interface BlogEditData {
    title?: string;
    urls?: string[];
    description?: string;
    authors?: string[];
    tags?: string[];
}
export class BlogService {
    static async getBlogs() {
        return BlogModel.findAll();
    }
    static async getBlog(id: number) {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return blog;
    }
    static async createBlog(data: BlogCreateData & { imageBase64: string }) {
        //const upload = await ImageService.uploadImage(data.imageBase64)
        const validated = BlogSchema.parse({ ...data, image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D" })
        return BlogModel.create({
            description: data.description,
            title: data.title,
            urls: data.urls,
            authors: data.authors,
            tags: data.tags,
            imageDelete: "upload.deleteUrl",
            image: "upload.url",
        });
    }
    static async updateBlog(id: number, newData: BlogEditData & { imageBase64?: string }) {
        const existingBlog = await BlogModel.findById(id);
        if (!existingBlog) {
            throw new Error("Blog not found");
        }
        // let imageUrl = existingBlog.image;
        // let imageDeleteUrl = existingBlog.imageDelete;
        // if (newData.imageBase64) {
        //     const upload = await ImageService.uploadImage(newData.imageBase64);
        //     imageUrl = upload.url;
        //     imageDeleteUrl = upload.deleteUrl;
        //     await ImageService.deleteImage(existingBlog.imageDelete);
        // }
        const validated = BlogSchema.partial().parse({
            ...newData,
            image: "imageUrl",
        });
        const updated = await BlogModel.update(id, {
            ...validated,
            image: "imageUrl",
            imageDelete: "imageDeleteUrl",
        });

        return updated;
    }
    static async deleteBlog(id: number) {
        const existingBlog = await BlogModel.findById(id);
        if (!existingBlog) {
            throw new Error("Blog not found");
        }
        await ImageService.deleteImage(existingBlog.imageDelete);
        const deleted = await BlogModel.delete(id);
        return deleted;
    }
}