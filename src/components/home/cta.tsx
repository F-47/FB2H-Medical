import { Link } from "react-router";
import { Button } from "@/components/ui/button";

type Props = {};

function Cta({}: Props) {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg mb-8 opacity-90 text-balance">
          Join thousands of patients who have already scheduled their
          appointments with MediConnect.
        </p>
        <Link to="/doctors">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Browse Doctors Now
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Cta;
