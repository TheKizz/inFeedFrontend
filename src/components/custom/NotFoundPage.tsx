import { Typography } from "./Typography";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Props {}

export const NotFoundPage = (props: Props) => {
  const navigate: NavigateFunction = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-10">
      <div className="flex max-w-screen-md shadow-lg bg-white border border-black border-dashed rounded-lg p-10 gap-10 animate-jiggle">
        <span className="hidden md:flex w-96 justify-center items-center">
          <Typography type="title" variant="h2" className="text-9xl">
            404
          </Typography>
        </span>
        <div className="flex flex-col gap-4">
          <Typography type="title" variant="h1">
            No Encontrado
          </Typography>
          <Separator />
          <span>
            <Typography type="body" variant="p">
              La pagina que estas buscando no existe, por favor verifique la URL
              e intente de nuevo.
            </Typography>
          </span>
          <Button size={"lg"} onClick={goHome}>
            <ArrowLeft className="mr-2" /> Volver
          </Button>
        </div>
      </div>
    </div>
  );
};
