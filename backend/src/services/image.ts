import { env } from "../config/env.ts";

export class ImageService {
    static async uploadImage(imageURL: string) {
        try {
            const response = await fetch(`${env.API_IMAGE_URL}?key=${env.API_IMAGE_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    image: imageURL,
                }).toString(),
            }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();

            return {
                url: data.data.url,
                deleteUrl: data.data.delete_url,
            };
        } catch (error) {
            throw new Error("Image upload failed");
        }
    }
    static async deleteImage(deleteUrl: string) {
        try {
            const response = await fetch(deleteUrl);

            if (!response.ok) {
                throw new Error("Failed to delete image");
            }

            return true;
        } catch (error) {
            throw new Error("Image deletion failed");
        }
    }
}