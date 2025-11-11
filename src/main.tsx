import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Doctors from "@/pages/doctors.tsx";
import Home from "@/pages/home.tsx";
import SingleDoctor from "@/pages/singleDoctor.tsx";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

// Layouts
import AuthLayout from "@/components/layouts/authLayout";
import DoctorLayout from "@/components/layouts/doctorLayout";
import MainLayout from "@/components/layouts/homeLayout.tsx";

// Dashboards
import DoctorProfile from "@/pages/profile/doctor";
import AppointmentsViewer from "@/pages/profile/doctor/appointments-viewer";
import AvailabilityScheduler from "@/pages/profile/doctor/availability-scheduler";
import Settings from "@/pages/profile/doctor/settings";
import PatientLayout from "@/components/layouts/patientLayout";
import PatientAppointments from "@/pages/profile/patient/appointments";
import PatientSettings from "@/pages/profile/patient/settings";
import ProtectedRoute from "./components/layouts/protectedRoute";

let router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "doctors", element: <Doctors /> },
      { path: "doctors/:id", element: <SingleDoctor /> },
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

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/doctor",
        element: <DoctorLayout />,
        children: [
          { path: "profile", element: <DoctorProfile /> },
          { path: "settings", element: <Settings /> },
          { path: "availability", element: <AvailabilityScheduler /> },
          { path: "appointments", element: <AppointmentsViewer /> },
        ],
      },
      {
        path: "/patient",
        element: <PatientLayout />,
        children: [
          { path: "appointments", element: <PatientAppointments /> },
          { path: "settings", element: <PatientSettings /> },
        ],
      },
    ],
  },
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
