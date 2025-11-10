import React from "react";

import { CalendarDays, Users, Stethoscope, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {};

// Small presentational components
function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          {/* <Badge className="px-2 py-1 rounded-full bg-blue-50 text-blue-700">
            Trusted · Verified · Secure
          </Badge> */}

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Care when you need it. Doctors you can trust.
          </h1>

          <p className="text-lg text-slate-600 max-w-xl">
            Search, compare and book appointments with certified doctors across
            specialties. Manage bookings, view records and message your care
            team — all in one secure platform designed for patients and clinics.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <Button asChild>
              <a href="/doctors" className="inline-flex items-center gap-2">
                <Users size={16} /> Find a Doctor
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a href="/signup" className="inline-flex items-center gap-2">
                <Heart size={16} /> I'm a Patient
              </a>
            </Button>

            <Button variant="ghost" asChild>
              <a href="/doctors/signup">I'm a Doctor</a>
            </Button>
          </div>

          {/* subtle appointment search inside hero */}
          <Card className="mt-6 shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CalendarDays /> Quick appointment search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input placeholder="What specialty or doctor? (e.g. cardiology)" />
                <Input placeholder="City or ZIP" />
                <Button className="w-full inline-flex items-center justify-center gap-2">
                  <Search size={16} /> Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: illustration / stats */}
        <div className="flex flex-col gap-6 items-center md:items-end">
          <img
            src="/illustrations/doctor-hero.svg"
            alt="Doctor illustration"
            className="w-full max-w-sm"
          />

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <div className="text-2xl font-bold">24k+</div>
              <div className="text-sm text-slate-500">Patients helped</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <div className="text-2xl font-bold">1.2k+</div>
              <div className="text-sm text-slate-500">Verified doctors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: <Stethoscope />,
      title: "Verified Doctors",
      body: "Profiles, reviews and verified credentials.",
    },
    {
      icon: <CalendarDays />,
      title: "Easy Scheduling",
      body: "Book in seconds and receive reminders.",
    },
    {
      icon: <Heart />,
      title: "Secure Records",
      body: "Encrypted medical history and prescriptions.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <Card key={it.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">{it.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="text-sm text-slate-600">{it.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

const CATEGORIES = [
  { name: "Cardiology", count: 34 },
  { name: "Dermatology", count: 22 },
  { name: "Pediatrics", count: 19 },
  { name: "Orthopedics", count: 15 },
  { name: "Psychiatry", count: 12 },
  { name: "General Practice", count: 40 },
];

function Categories() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Browse by specialty</h2>
          <a href="/doctors" className="text-sm text-blue-600">
            See all specialties →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Card key={c.name} className="p-4 flex flex-col items-start gap-2">
              <div className="flex items-center justify-between w-full">
                <div className="font-medium">{c.name}</div>
                {/* <Badge>{c.count}</Badge> */}
              </div>
              <div className="text-xs text-slate-500">
                Top doctors & clinics
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const TOP_DOCTORS = [
  {
    name: "Dr. Aisha El-Sayed",
    specialty: "Cardiologist",
    rating: 4.8,
    location: "Cairo",
  },
  {
    name: "Dr. Omar Khaled",
    specialty: "Dermatologist",
    rating: 4.7,
    location: "Alexandria",
  },
  {
    name: "Dr. Sara Nabil",
    specialty: "Pediatrics",
    rating: 4.9,
    location: "Giza",
  },
];

function TopDoctors() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top rated doctors</h2>
          <a href="/doctors?sort=rating" className="text-sm text-blue-600">
            View all →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_DOCTORS.map((d) => (
            <Card key={d.name} className="p-6">
              <div className="flex items-center gap-4">
                <img
                  src="/avatars/doctor-placeholder.jpg"
                  alt={d.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-sm text-slate-500">
                        {d.specialty} • {d.location}
                      </div>
                    </div>
                    <div className="text-sm font-medium">{d.rating}★</div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button size="sm" asChild>
                      <a href={`/doctor/${encodeURIComponent(d.name)}`}>
                        View Profile
                      </a>
                    </Button>

                    <Button variant="outline" size="sm" asChild>
                      <a href={`/book?doctor=${encodeURIComponent(d.name)}`}>
                        Book
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Search doctors",
      body: "Find doctors by specialty, location and ratings.",
    },
    {
      title: "Book an appointment",
      body: "Select a time, confirm and receive reminders.",
    },
    {
      title: "Visit or consult online",
      body: "In-person visits or secure telemedicine.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Card key={s.title} className="p-6">
              <div className="text-3xl mb-3 font-bold text-blue-600">
                {i + 1}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{s.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    {
      by: "Mohamed R.",
      body: "Smooth booking experience and a very caring doctor.",
    },
    {
      by: "Laila S.",
      body: "Quick teleconsultation, saved me a trip to the clinic.",
    },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">What patients say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.map((tt, idx) => (
            <Card key={idx} className="p-6">
              <p className="text-slate-700">“{tt.body}”</p>
              <div className="mt-4 text-sm font-medium">— {tt.by}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFooter() {
  return (
    <footer className="py-12 bg-gradient-to-r from-blue-600 to-sky-500 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-2xl font-bold">
            Ready to book your appointment?
          </div>
          <div className="text-sm opacity-90">
            Secure, fast and trusted by thousands of patients.
          </div>
        </div>

        <div className="flex gap-3">
          <Button asChild>
            <a href="/register">Get Started</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/contact">Contact Sales</a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default function Home({}: Props) {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <Hero />
      <Features />
      <Categories />
      <TopDoctors />
      <HowItWorks />
      <Testimonials />
      <CTAFooter />
    </main>
  );
}
