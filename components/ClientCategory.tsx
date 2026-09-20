"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { ChefHat, ChevronsDown, Flame, PartyPopper } from "lucide-react";
import MenuItem from "./MenuItem";
import Loading from "@/app/loading";

type Props = {
    categorySlug: string;
};
type Products = {
    id: string;
    title: string;
    description: string;
    privateNote?: string;
    price: number;
    discountedPrice?: number;
    img: string;
    productType?: number;
};
export default function ClientCategory({ categorySlug }: Props) {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["category", categorySlug],
        queryFn: async () => {
            const { data } = await axios.get<Products[]>(
                `/api/categories/${categorySlug}`,
            );
            return data;
        },
        staleTime: Infinity,
    });

    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (isLoading) return <Loading />;
    if (error || !products) return null;
    return (
        <main className="min-w-sm lg:max-w-md mx-auto py-7 space-y-7">
            {products.map((item) => (
                <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-transform active:scale-[0.98] cursor-pointer"
                >
                    <div className="relative h-48 w-full bg-gray-200">
                        {item.img && (
                            <Image
                                src={`/galeri/${item.img}`}
                                alt={item.title}
                                fill
                                className="object-cover"
                                loading="eager"
                            />
                        )}

                        {(() => {
                            switch (item.productType) {
                                case 1:
                                    return (
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                                            <span className="text-xs font-semibold bg-linear-to-r from-orange-500 to-amber-700 bg-clip-text text-transparent">
                                                Favori Ürün
                                            </span>
                                        </div>
                                    );
                                case 2:
                                    return (
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                            <PartyPopper className="w-3.5 h-3.5 text-rose-500" />
                                            <span className="text-xs font-semibold bg-linear-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                                                Yeni Ürün
                                            </span>
                                        </div>
                                    );
                                default:
                                    return "";
                            }
                        })()}

                        {item.privateNote ? (
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                <ChefHat className="w-3.5 h-3.5 text-red-500" />
                                <span className="text-xs font-semibold bg-linear-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                                    Şef'in Özel Notu
                                </span>
                            </div>
                        ) : (
                            item.discountedPrice && (
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <ChevronsDown className="w-3.5 h-3.5 text-green-500" />
                                    <span className="text-xs font-semibold bg-linear-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                                        İndirimli Ürün
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    <div className="p-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <h3 className="text-gray-900 leading-tight">
                                {item.title}
                            </h3>

                            {item.discountedPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-gray-500 line-through text-xs font-thin">
                                        {String(item.price)} TL
                                    </span>

                                    <span className="text-orange-500 whitespace-nowrap">
                                        {String(item.discountedPrice)} TL
                                    </span>
                                </div>
                            ) : (
                                <span className="text-orange-500 whitespace-nowrap">
                                    {String(item.price)} TL
                                </span>
                            )}
                        </div>
                        {item.description && (
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>
            ))}
            {selectedItem && (
                <MenuItem
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
            )}
        </main>
    );
}
