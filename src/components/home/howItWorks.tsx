type Props = {};

function HowItWorks({}: Props) {
  return (
    <section
      id="how-it-works"
      className="relative pt-32 pb-20 px-4 bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950 dark:via-gray-950 dark:to-blue-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Browse Doctors",
              description:
                "Search and filter doctors by specialization, location, and availability",
            },
            {
              step: "2",
              title: "View Profiles",
              description:
                "Check qualifications, experience, and patient reviews",
            },
            {
              step: "3",
              title: "Book Appointment",
              description:
                "Select your preferred date and time to book an appointment",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
