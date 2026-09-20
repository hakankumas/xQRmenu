import { productService } from "@/services/product.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const data = await productService.getFavorites();

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
