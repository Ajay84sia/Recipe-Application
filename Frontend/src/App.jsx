import Home from "./Pages/Home";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  return (
    <>
      <Home/>
    </>
  );
}

export default App;
