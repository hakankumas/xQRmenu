import { prisma } from "@/lib/prisma";

export const productService = {
    // Category Page
    async getAll(slug: string) {
        return await prisma.products.findMany({
            where: {
                category: {
                    slug,
                },
            },
        });
    },

    // Favorite Products
    async getFavorites() {
        return await prisma.products.findMany({
            where: {
                favorite: true,
            },
        });
    },
};
