import { categoryService } from "@/services/category.service";
import { NextResponse } from "next/server";

// Header - Categories
export async function GET(request: Request) {
    try {
        const data = await categoryService.getAll();

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
