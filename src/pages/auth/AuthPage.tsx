import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Navigate } from "react-router-dom";
import { useAuthState } from "@/contexts/auth.context";
import { Background } from "@/components/custom/Background";

export const AuthPage = () => {
  const {
    state: { user }
  } = useAuthState();

  return (
    <>
      {user ? (
        <Navigate to="/" replace={true} />
      ) : (
        <>
          <Background />
          <div className="flex items-center justify-center min-h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Login />
              </TabsContent>
              <TabsContent value="register">
                <Register />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </>
  );
};
