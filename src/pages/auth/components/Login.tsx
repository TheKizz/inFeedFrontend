import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";
import { IUseAuthMethodReturn, useAuthState } from "@/contexts/auth.context";
import { renderResponseToast } from "@/lib/utils";
import { toast } from "sonner";

export const Login = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onSubmit"
  });
  const { login } = useAuthState();

  const handleSubmit = async () => {
    toast.loading("Iniciando sesión...");
    const response: IUseAuthMethodReturn = await login(form.getValues());
    renderResponseToast(response);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuenta</CardTitle>
        <CardDescription>
          Inicia sesión con tu cuenta para acceder a la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ejemplo@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Confirmar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
