import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import FormPage from "./pages/FormPage";
import NotFoundPage from "./pages/NotFoundPage";
import PriorProjectsPage from "./pages/PriorProjectsPage";
import NavBar from "./components/NavBar";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Navigate to="/form/1" />} />
        <Route exact path="/form/:page" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route exact path="/projects" element={<PriorProjectsPage />} />
        <Route exact path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}
