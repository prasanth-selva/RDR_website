import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <ScrollytellingCanvas />
      {/* We can add standard footer or additional non-scroll-linked content below here if needed */}
      <footer className="py-24 text-center border-t border-white/10 bg-[#050505]">
        <p className="text-white/60 tracking-wider text-sm uppercase">
          &copy; {new Date().getFullYear()} Lumina. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
