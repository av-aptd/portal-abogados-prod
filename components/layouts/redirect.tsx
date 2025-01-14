import Footer from "./components/footer";
import Header from "./components/header";

export default function RedirectLayout({ children }: any) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-20">{children}</main>
    </div>
  );
}
