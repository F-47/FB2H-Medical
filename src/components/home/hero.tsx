import { Link } from "react-router";
import { Button } from "../ui/button";

type Props = {};

function Hero({}: Props) {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-blue-950 dark:via-gray-950 dark:to-blue-900">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
          Find & Book Appointments with{" "}
          <span className="text-primary">Top Doctors</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Connect with qualified healthcare professionals, view detailed
          profiles, and schedule your appointments in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
            asChild
          >
            <Link to="/doctors">Find a Doctor</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
            asChild
          >
            <Link to="/auth/register">Register Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
