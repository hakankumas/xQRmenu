import { NextResponse } from "next/server";
import { productService } from "@/services/product.service";

type Params = {
    params: Promise<{
        categorySlug: string;
    }>;
};

// Category Page - Products
export async function GET(request: Request, { params }: Params) {
    try {
        const { categorySlug } = await params;

        const data = await productService.getAll(categorySlug);

        if (!data) {
            return NextResponse.json(
                {
                    message: "Veri bulunamadı.",
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json(data, {
            status: 200,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Sunucu hatası algılandı.",
            },
            {
                status: 500,
            },
        );
    }
}
