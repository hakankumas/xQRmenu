import { prisma } from "@/lib/prisma";

export const productService = {
    // Favorite Products
    async getFavorites() {
        return await prisma.products.findMany({
            where: {
                productType: 1,
            },
            include: {
                portions: true,
            },
            orderBy: {
                favoriteSort: "asc",
            },
        });
    },

    // Category Page
    async getAll(slug: string) {
        return await prisma.products.findMany({
            where: {
                category: {
                    slug,
                },
            },
            include: {
                portions: true,
            },
            orderBy: {
                categorySort: "asc",
            },
        });
    },
};
