import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";

// Pages
import Home from "@/pages/home.tsx";
import Doctors from "@/pages/doctors.tsx";
import SingleDoctor from "@/pages/singleDoctor.tsx";
import Login from "@/pages/auth/login/login.tsx";
import RegisterDoctor from "@/pages/auth/register/doctor.tsx";
import RegisterPatient from "@/pages/auth/register/patient.tsx";

// Layouts
import AuthLayout from "@/components/layouts/authLayout";
import MainLayout from "@/components/layouts/homeLayout.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "doctors", element: <Doctors /> },
      { path: "doctors/:id", element: <SingleDoctor /> },
      // { path: "profile/patient", element: <PatientProfile /> },
      // { path: "profile/doctor", element: <DoctorProfile /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register/doctor", element: <RegisterDoctor /> },
      { path: "register/patient", element: <RegisterPatient /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
