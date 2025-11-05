import Navbar from "./components/Navbar";
import Cesur from "./pages/Cesur";
import Footer from "./layout/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Cesur />
      </main>
      <Footer />
    </>
  );
}
