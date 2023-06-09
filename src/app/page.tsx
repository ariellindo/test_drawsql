import Header from "@/components/layout/header";
import DrawingBoard from "@/components/ui/drawing-board";
import MainDrawer from "@/components/ui/drawer/main-drawer";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Header title="Test de Koombea" />
      <section className="relative h-[calc(100vh-56px)] w-full">
        <MainDrawer />
        <DrawingBoard />
      </section>
    </main>
  );
}
