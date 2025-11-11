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

  if (isLoading || !user) return null;

  const handleClick = () => {
    switch (user.role) {
      case "doctor":
        navigate("/profile/doctor");
        break;
      case "patient":
        navigate("/profile/patient");
        break;
      case "admin":
        navigate("/profile/admin");
        break;
    }
  };

  const initials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();

  return (
    <button onClick={handleClick} className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.first_name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span>{initials || "?"}</span>
    </button>
  );
}

export default UserMenu;
