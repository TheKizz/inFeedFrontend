import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import {
  IUseAuthMethodReturn,
  IUseAuthState,
  useAuthState
} from "@/contexts/auth.context";
import { UserModel } from "@/api/user-access/entities/user.entity";
import { renderResponseToast } from "@/lib/utils";
import { toast } from "sonner";
import { Typography } from "./Typography";
import { Book, Home, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

const UserOptionsDropdownMenu = () => {
  const { state, logout }: IUseAuthState = useAuthState();
  const user: UserModel | undefined = state.user;
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = async () => {
    if (!user) return;
    console.log({ user });
    toast.loading("Cerrando sesión...");
    const response: IUseAuthMethodReturn = await logout(user?.email);
    renderResponseToast(response, {
      onFinish: () => {
        navigate("/auth");
      }
    });
  };

  const getUserAcronym = () => {
    if (!user) return;
    const splicedUsername: string[] = user?.username?.split(/[_-\s]/);
    if (splicedUsername?.length > 1) {
      return splicedUsername[0]
        ?.charAt(0)
        ?.concat(splicedUsername[1]?.charAt(0))
        ?.toUpperCase();
    }
    return splicedUsername[0]?.charAt(0)?.toUpperCase();
  };

  const renderUserAuthOptions = () => {
    return (
      <>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border bg-black">
            <span className="flex h-full w-full items-center justify-center">
              <Typography type="body" variant="small" className="text-white">
                {getUserAcronym()}
              </Typography>
            </span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to={"/profile"}>Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Ajustes</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to={"/profile/surveys"}>Trivias</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </>
    );
  };
  const renderUnAuthOptions = () => {
    return (
      <Button variant={"ghost"} onClick={handleLogin}>
        Iniciar sesión
      </Button>
    );
  };
  return (
    <DropdownMenu>
      {user ? renderUserAuthOptions() : renderUnAuthOptions()}
    </DropdownMenu>
  );
};

export const Header = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu
      className={`container flex-none h-28 min-w-fit max-w-full bg-white border border-black border-dashed rounded-md justify-between gap-2 shadow-lg ${className}`}
    >
      <NavigationMenuList>
        <NavLink to="/">
          <Typography type="title" variant="h1" className="hover:animate-pulse">
            inFeed
          </Typography>
        </NavLink>
      </NavigationMenuList>
      <NavigationMenuList className="gap-6">
        <HeaderNavLink
          to="/"
          name="Inicio"
          icon={<Home className="m-auto size-5" />}
        />
        <NavigationMenuItem>
          <HeaderNavLink
            to="/surveys"
            name="Encuestas"
            icon={<Book className="m-auto size-5" />}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <HeaderNavLink
            to="/ranking"
            name="Populares"
            icon={<TrendingUp className="m-auto size-5" />}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <UserOptionsDropdownMenu />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface HeaderNavLinkProps {
  to: string;
  icon: ReactNode;
  name: string;
}

const HeaderNavLink = (props: HeaderNavLinkProps) => {
  const { to, icon, name } = props;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "font-bold" : "")}
    >
      <span className="flex gap-2 hover:animate-pulse">
        {icon}
        <Typography type="body" variant="lead">
          {name}
        </Typography>
      </span>
    </NavLink>
  );
};
