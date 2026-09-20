"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axios.get("/api/categories");
            return data;
        },
    });
    const pathname = usePathname();

    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu.</div>;

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-md mx-auto px-4 py-6 flex items-center justify-between">
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2"
                        >
                            <UtensilsCrossed className="w-6 h-6 text-orange-500" />
                            {process.env.NEXT_PUBLIC_SITE_TITLE ||
                                "Hakan Şef Restoran"}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
                                "Görsel bir şölene hoş geldiniz"}
                        </p>
                    </div>
                </div>

                <div className="max-w-md mx-auto px-4 pb-4">
                    <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                        {data.map(
                            (item: {
                                id: number;
                                slug: string;
                                title: string;
                            }) => (
                                <Link
                                    key={item.id}
                                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                                        pathname === `/${item.slug}`
                                            ? "bg-orange-500 text-white shadow-md"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                    href={`/${item.slug}`}
                                >
                                    {item.title}
                                </Link>
                            ),
                        )}
                    </div>
                </div>
            </header>

            {/* prettier-ignore */}
            {/* <pre className='whitespace-pre-wrap break-all'>{JSON.stringify(data, null, 2)}</pre> */}
        </>
    );
}
