import { Card } from "../ui/card";

type Props = {};

function Testimonials({}: Props) {
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

export default Testimonials;
