import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

// Pages
import Home from "@/pages/home.tsx";
import Doctors from "@/pages/doctors.tsx";
import SingleDoctor from "@/pages/singleDoctor.tsx";

// Layouts
import AuthLayout from "@/components/layouts/authLayout";
import MainLayout from "@/components/layouts/homeLayout.tsx";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { Toaster } from "./components/ui/sonner";

// Dashboards
import DoctorProfile from "./pages/profile/doctor";

let router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "doctors", element: <Doctors /> },
      { path: "doctors/:id", element: <SingleDoctor /> },
      // { path: "profile/doctor", element: <DoctorProfile /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "doctors/profile", element: <DoctorProfile /> },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  </StrictMode>
);
