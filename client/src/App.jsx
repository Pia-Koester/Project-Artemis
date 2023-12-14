import "./index.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <h1 className="text-primary text-3xl pl-10 py-2">Primary Color</h1>
      <h1 className="text-secondary text-3xl pl-10 py-2">Secondary Color</h1>
      <h1 className="text-accent text-3xl pl-10 py-2">Accent Color</h1>
      <h1 className="text-neutral text-3xl pl-10 py-2">Neutral Color</h1>

      <Footer />
    </>
  );
}

export default App;
