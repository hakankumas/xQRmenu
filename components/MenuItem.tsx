import {
    X,
    Flame,
    ChefHat,
    Megaphone,
    Pizza,
    RotateCwFadingClock,
    PartyPopper,
    ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function MenuItem({
    selectedItem,
    setSelectedItem,
}: {
    selectedItem: any;
    setSelectedItem: (item: any) => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]">
                <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full backdrop-blur-md shadow-sm transition-transform active:scale-95"
                >
                    <X className="w-5 h-5 text-gray-700 hover:text-gray-900 hover:cursor-pointer transition-all duration-300" />
                </button>

                <div className="relative h-64 w-full bg-gray-200 shrink-0">
                    {selectedItem.img && (
                        <Image
                            src={`/galeri/${selectedItem.img}`}
                            alt={selectedItem.title}
                            fill
                            className="object-cover"
                            loading="eager"
                        />
                    )}

                    {(() => {
                        switch (selectedItem.productType) {
                            case 1:
                                return (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                                        <span className="text-xs font-semibold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                                            Favori Ürün
                                        </span>
                                    </div>
                                );
                            case 2:
                                return (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
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
                </div>

                <div className="flex flex-col gap-2 p-5 overflow-y-auto">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {selectedItem.title}
                        </div>

                        <p className="text-sm text-gray-600 font-medium">
                            {selectedItem.description}
                        </p>
                    </div>

                    {selectedItem.discountedPrice ? (
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-orange-500 whitespace-nowrap">
                                {selectedItem.discountedPrice} TL
                            </p>

                            <span className="text-gray-500 line-through text-sm font-thin">
                                {selectedItem.price} TL
                            </span>
                        </div>
                    ) : (
                        <p className="text-2xl font-bold text-orange-500 whitespace-nowrap">
                            {selectedItem.price} TL
                        </p>
                    )}

                    {selectedItem.preparedTime && (
                        <div>
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-900 tracking-wider">
                                <RotateCwFadingClock className="w-3.5 h-3.5 text-black" />
                                <span>Hazırlık Süresi:</span>
                                <p className="text-gray-600 text-sm font-normal tracking-normal">
                                    {selectedItem.preparedTime} Dakika
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="w-full flex flex-col gap-2">
                        {selectedItem.privateNote && (
                            <details className="group rounded-lg border border-gray-200 bg-white p-4">
                                <summary className="flex cursor-pointer items-center justify-between font-bold text-sm text-gray-900 list-none">
                                    <div className="flex items-center gap-1 text-sm font-bold text-gray-900 tracking-wider">
                                        <ChefHat className="w-3.5 h-3.5 text-red-600" />
                                        <span className="bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                                            Şef'in Özel Notu:
                                        </span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                </summary>
                                <p className="text-gray-600 text-sm mt-2">
                                    {selectedItem.privateNote}
                                </p>
                            </details>
                        )}

                        {selectedItem.content && (
                            <details className="group rounded-lg border border-gray-200 bg-white p-4">
                                <summary className="flex cursor-pointer items-center justify-between font-bold text-sm text-gray-900 list-none">
                                    <div className="flex items-center gap-1 text-sm font-bold text-gray-900 tracking-wider">
                                        <Megaphone className="w-3.5 h-3.5 text-black" />
                                        <span>Açıklama:</span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                </summary>

                                <p className="text-gray-600 text-sm text-justify mt-2">
                                    {selectedItem.content}
                                </p>
                            </details>
                        )}

                        {selectedItem.privateNote && (
                            <details className="group rounded-lg border border-gray-200 bg-white p-4">
                                <summary className="flex cursor-pointer items-center justify-between font-bold text-sm text-gray-900 list-none">
                                    <div className="flex items-center gap-1 text-sm font-bold text-gray-900 tracking-wider">
                                        <Pizza className="w-3.5 h-3.5 text-black" />
                                        <span>Porsiyonlar:</span>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                </summary>
                                <div className="text-gray-600 text-sm mt-2">
                                    {selectedItem.portions.map(
                                        (portion: {
                                            id: string;
                                            portion?: string;
                                            grammage?: string;
                                            price: number;
                                            discountedPrice?: number;
                                        }) => (
                                            <div key={portion.id}>
                                                <div className="flex gap-1">
                                                    <span>
                                                        {portion.portion &&
                                                            `${portion.portion} - `}
                                                    </span>

                                                    <span>
                                                        {portion.grammage &&
                                                            `${portion.grammage} - `}
                                                    </span>

                                                    {portion.discountedPrice ? (
                                                        <div className="flex gap-1">
                                                            <span className="text-gray-500 line-through text-sm font-thin">
                                                                {portion.price}{" "}
                                                                TL
                                                            </span>
                                                            <span className="text-orange-500 font-bold">
                                                                {
                                                                    portion.discountedPrice
                                                                }{" "}
                                                                TL
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-orange-500 font-bold">
                                                            {portion.price &&
                                                                `${portion.price} TL`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </details>
                        )}
                    </div>

                    <button
                        onClick={() => setSelectedItem(null)}
                        className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:cursor-pointer"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
