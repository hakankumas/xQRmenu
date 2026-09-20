"use client";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, MouseEvent as ReactMouseEvent } from "react";

export default function Header() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await axios.get("/api/categories");
            return data;
        },
    });
    const pathname = usePathname();

    // Sürükle-Bırak Carousel State'leri
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);

    const onMouseDown = (e: ReactMouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        setDragDistance(0);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: ReactMouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Kaydırma hızı
        scrollRef.current.scrollLeft = scrollLeft - walk;
        setDragDistance(Math.abs(walk));
    };

    const handleLinkClick = (e: ReactMouseEvent) => {
        // Eğer kullanıcı kaydırma yaptıysa (10px'den fazla) tıklamayı engelle
        if (dragDistance > 10) {
            e.preventDefault();
        }
    };

    if (isLoading) return <Loading />;
    if (error || !data) return null;

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-10 select-none">
                <div className="max-w-md mx-auto p-4 flex items-center justify-between">
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2"
                        >
                            <UtensilsCrossed className="w-6 h-6 text-orange-500" />
                            {process.env.NEXT_PUBLIC_SITE_TITLE}
                        </Link>
                        <p className="text-xs text-gray-500">
                            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
                        </p>
                    </div>
                </div>

                <div className="max-w-md mx-auto px-4 pb-1 overflow-hidden">
                    <div
                        ref={scrollRef}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        className={`flex space-x-3 overflow-x-auto no-scrollbar pb-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    >
                        {data.map(
                            (item: {
                                id: number;
                                slug: string;
                                title: string;
                            }) => (
                                <Link
                                    key={item.id}
                                    onClick={handleLinkClick}
                                    draggable={false}
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
