import React, { useEffect, useMemo, useState } from "react";
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
import { IApiError, IApiResponse, IUser } from "@codernex/types";
import { useAuthUser, useSignIn } from "react-auth-kit";
import api from "../../api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createUserSchema } from "@codernex/schema";

// Zod Schema

export type ISignUp = z.infer<typeof createUserSchema>;

const SignUp: React.FC = () => {
  // Using Necessary Hooks
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useAuthUser();
  const auth = useMemo(() => isAuthenticated(), [isAuthenticated]);

  // Checking if user is authenticated
  useEffect(() => {
    if (auth) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  // React Hook Form
  const form = useForm<ISignUp>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
    resolver: zodResolver(createUserSchema),
  });

  // Submitting Data To The api and logging in to the application

  const onSubmit = (data: ISignUp) => {
    setIsLoading(true);
    api
      .post<
        IApiResponse<{ user: IUser; accessToken: string; refreshToken: string }>
      >("/users", data)
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
          <h1 className="text-center font-semibold text-2xl">Sign Up</h1>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="name"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="email"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="username"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passowrd</FormLabel>
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
              Sign Up
            </Button>
            <Link to={"/login"} className="underline">
              Already have an account?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SignUp;
