// import { getMetadata } from "@/lib/getMetadata";

import ClientCategory from "@/components/ClientCategory";

type Params = {
    params: Promise<{
        categorySlug: string;
    }>;
};

// export async function generateMetadata({ params }: Params) {
//     return await getMetadata({ params });
// }

export default async function CategoryPage({ params }: Params) {
    const { categorySlug } = await params;

    return <ClientCategory categorySlug={categorySlug} />;
}
