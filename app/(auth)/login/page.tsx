/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { toast } from "sonner";
import { LoginSchema, LoginSchemaSchemaValues } from "@/lib/zodAuth";
import { useSinginMutation } from "@/app/redux/slices/ApiSlice";

import { ActiveEmailResponse } from "@/app/interfaces";
import cookieService from "@/lib/cookieService";
import { useRouter } from "next/navigation";

export default function Login() {
  const [login] = useSinginMutation();
  const router = useRouter();
  const form = useForm<LoginSchemaSchemaValues>({
    resolver: zodResolver(LoginSchema), // <--- هنا
    defaultValues: {
      email: "",

      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaSchemaValues) => {
    try {
      const result = await login(data).unwrap();

      // Based on ActiveEmailResponse interface, it's result.data.credential.access_token
      // However, if unwrap returns the whole object, this is correct. 
      // I am adding a check to be sure we don't store "undefined".
      const accessToken = result?.data?.credential?.access_token || (result as any)?.credential?.access_token;

      if (!accessToken) {
        console.error("Token not found in response:", result);
        toast.error("Login failed: Invalid server response");
        return;
      }

      console.log("Logged in with token:", accessToken);
      cookieService.set("token", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
      });

      const decoded: any = jwtDecode(accessToken);

      console.log(decoded);

      const role = decoded.role;

      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

      toast.success("Login success");
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.data?.message || err.message || "Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your information to create account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
