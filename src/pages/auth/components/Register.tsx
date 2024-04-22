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
import { RegisterUserSchema } from "../schemas/register-user.schema";
import { useAuthState } from "@/contexts/auth.context";
import { toast } from "sonner";
import { RegisterUserDto } from "@/api/user-access/dto/register-user.dto";
import { renderResponseToast } from "@/lib/utils";

export const Register = () => {
  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    mode: "onSubmit"
  });
  const { register } = useAuthState();

  const validateRegistrationRules = (): boolean => {
    let successfulValidation = true;
    const { password, passwordConfirmation } = form.getValues();
    if (password !== passwordConfirmation) {
      form.setError("passwordConfirmation", {
        type: "validate",
        message: "Las contraseñas no coinciden"
      });
      successfulValidation = false;
    }
    return successfulValidation;
  };

  const onSubmit = async () => {
    if (!validateRegistrationRules()) return;
    toast.loading("Registrando cuenta...");
    const response = await register(new RegisterUserDto(form.getValues()));
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Nombre de usuario
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Usuario123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Confirmación de la contraseña
                  </FormLabel>
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
