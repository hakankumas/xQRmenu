import { prisma } from "@/lib/prisma";

export const categoryService = {
    // Header - Categories
    async getAll() {
        return await prisma.categories.findMany({
            where: {
                active: true,
                products: {
                    some: {},
                },
            },
            orderBy: {
                sort: "asc",
            },
        });
    },
};
