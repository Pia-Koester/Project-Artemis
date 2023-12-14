import "./index.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <h1 className="text-primary text-3xl">Primary Color</h1>
      <h1 className="text-secondary text-3xl">Secondary Color</h1>
      <h1 className="text-accent text-3xl">Accent Color</h1>
      <h1 className="text-neutral text-3xl">Neutral Color</h1>

      <Footer />
    </>
  );
}

export default App;
