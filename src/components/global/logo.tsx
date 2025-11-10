import { HeartPulse } from "lucide-react";
import { Link } from "react-router";

type Props = {};

function Logo({}: Props) {
  return (
    <Link
      to="/"
      className="flex items-center justify-center gap-2 text-primary font-semibold text-2xl"
    >
      <HeartPulse className="w-7 h-7 text-primary" />
      <span>FB2H</span>
    </Link>
  );
}

export default Logo;
