export interface Blog {
    id: number;
    authors: string[];
    createdAt: Date | string;
    updatedAt: Date | string;
    title: string;
    urls: string[];
    description: string;
    tags: string[];
    image: string;
    imageDelete: string;
}
