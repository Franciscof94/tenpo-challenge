import { BiLibrary } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-10 bg-primary-500 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <BiLibrary className="text-3xl text-white" />
          <h1 className="text-2xl font-bold text-white">
            Biblioteca Digital
          </h1>
        </div>

        <Button
          onClick={handleLogout}
          variant="secondary"
          iconLeft={<FiLogOut className="text-lg" />}
          className="font-medium py-2 px-4 rounded-full transition duration-300 md:space-x-2 shadow-sm"
        >
          <span className="hidden md:inline">Cerrar Sesión</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;