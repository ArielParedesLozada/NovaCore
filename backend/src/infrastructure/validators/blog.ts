import { z } from "zod";

export const BlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    urls: z
        .array(
            z.url("Invalid URL").max(100)
        )
        .min(1, "At least one URL is required"),
    description: z.string().min(1, "Description is required"),
    authors: z
        .array(
            z.string().min(1, "Author name cannot be empty").max(255)
        )
        .min(1, "At least one author is required"),
    tags: z
        .array(
            z.string().min(1).max(255)
        )
        .optional(),

    image: z
        .url("Image must be a valid URL")
        .max(255)
});