export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
            <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24"></svg>
        </div>
    );
}
