import { X, Flame, ChefHat, Megaphone, Pizza } from "lucide-react";
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
                    <X className="w-5 h-5 text-gray-700 hover:cursor-pointer" />
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
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-semibold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                            Sevilen Ürün
                        </span>
                    </div>
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

                    <p className="text-2xl font-bold text-orange-500 whitespace-nowrap">
                        {selectedItem.price} TL
                    </p>

                    {selectedItem.privateNote && (
                        <div>
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-900 tracking-wider">
                                <ChefHat className="w-3.5 h-3.5 text-black" />
                                <span>Şef'in Özel Notu</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                {selectedItem.privateNote}
                            </p>
                        </div>
                    )}

                    {selectedItem.content && (
                        <div>
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-900 tracking-wider">
                                <Megaphone className="w-3.5 h-3.5 text-black" />
                                <span>Açıklama</span>
                            </div>
                            <p className="text-gray-600 text-sm text-justify">
                                {selectedItem.content}
                            </p>
                        </div>
                    )}

                    {selectedItem.portions.length > 0 && (
                        <div>
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-900 tracking-wider">
                                <Pizza className="w-3.5 h-3.5 text-black" />
                                <span>Porsiyonlar</span>
                            </div>
                            <div className="text-gray-600 text-sm">
                                {selectedItem.portions.map((portion: any) => (
                                    <div key={portion.id}>
                                        <div>
                                            <span>
                                                {portion.portion
                                                    ? `${portion.portion} - `
                                                    : ""}
                                            </span>
                                            <span>
                                                {portion.grammage
                                                    ? `${portion.grammage} - `
                                                    : ""}
                                            </span>
                                            <span className="text-orange-500 font-bold">
                                                {portion.price &&
                                                    `${portion.price} TL`}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setSelectedItem(null)}
                        className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors hover:cursor-pointer"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
