import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

function UserMenu() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });

  if (isLoading || !user) return <Loader2 className="animate-spin w-4 h-4" />;

  const handleClick = () => {
    switch (user.role) {
      case "doctor":
        navigate("/doctor/profile");
        break;
      case "patient":
        navigate("/patient/profile");
        break;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 cursor-pointer"
    >
      <Avatar>
        <AvatarImage src={user.image} alt={user.first_name} />
        <AvatarFallback>
          {`${user.first_name?.[0] || ""}${
            user.last_name?.[0] || ""
          }`.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </button>
  );
}

export default UserMenu;
