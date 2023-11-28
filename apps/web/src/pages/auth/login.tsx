import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { IApiError, IApiResponse, IUser } from "@codernex/types";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { loginSchema } from "@codernex/schema";
// Zod Schema

export type ILogin = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const isAuthenticated = useAuthUser();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const auth = useMemo(() => isAuthenticated(), [isAuthenticated]);

  useEffect(() => {
    if (auth) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  const form = useForm<ILogin>({
    defaultValues: {
      emailOrUserName: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILogin) => {
    setIsLoading(true);
    api
      .post<
        IApiResponse<{ user: IUser; accessToken: string; refreshToken: string }>
      >("/auth", data)
      .then((response) => {
        if (response.data.data) {
          signIn({
            expiresIn: 60,
            token: response.data.data.accessToken,
            tokenType: "Bearer",
            authState: response.data.data.user,
            refreshToken: response.data.data.refreshToken,
            refreshTokenExpireIn: 60 * 24,
          });

          navigate("/", { replace: true });
        }
      })
      .catch((err: AxiosError<IApiResponse<IApiError>>) => {
        toast.error(err?.response?.data?.error?.message as string);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <Form {...form}>
        <form
          className="w-full md:max-w-[400px] lg:max-w-[400px] space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-center font-semibold text-2xl">Login</h1>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="Email or Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="emailOrUserName"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="password"
            control={form.control}
          />

          <div className="flex items-center justify-between">
            <Button loading={isLoading} type="submit">
              Login
            </Button>
            <Link to={"/signup"} className="underline">
              Don't have an account?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default Login;
