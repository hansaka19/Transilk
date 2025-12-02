import { Outlet } from "react-router-dom";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";

// File: frontend/src/App.tsx
function App() {
  return (
    <>
      {/* Header Component */}
      <Header />
      {/* Main Content */}
      <main className="">
        <Outlet />
      </main>
      {/* Footer Component */}
      <Footer />
    </>
  );
}

export default App;
