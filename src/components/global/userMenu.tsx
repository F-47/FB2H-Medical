import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

function UserMenu() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });

  const handleClick = () => {
    switch (user?.role) {
      case "doctor":
        navigate("/doctor/profile");
        break;
      case "patient":
        navigate("/patient/appointments");
        break;
    }
  };

  return isLoading || !user ? (
    <div className="animate-pulse flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-50" />
    </div>
  ) : (
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
