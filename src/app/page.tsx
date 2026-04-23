import { Footbar } from "@/components/footbar";
import { Navbar } from "@/components/navbar";
import BlobCursor from "@/components/BlobCursor";

export default function HomePage() {
    return (
        // The background color MUST be here, on the root.
        <div className="bg-background min-h-screen">
            <BlobCursor>
                <Navbar />
                {/* Note: No 'bg-background' here, keep it transparent to see the blob */}
                <main className="flex flex-1 items-center justify-center min-h-[70vh]">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                        Hello World!
                    </h1>
                </main>
                <Footbar />
            </BlobCursor>
        </div>
    );
}
