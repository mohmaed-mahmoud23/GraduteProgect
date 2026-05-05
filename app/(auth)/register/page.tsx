"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

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
import { RegisterFormValues, registerSchema } from "@/lib/zodAuth";
import { useLoginMutation } from "@/app/redux/slices/ApiSlice";
import { useRouter } from "next/navigation";

// 1️⃣ schema

// 2️⃣ component
export default function RegisterPage() {


  const router =useRouter()
    const [login, { isLoading }] = useLoginMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema), // <--- هنا
    defaultValues: {
      username: "",
email:"",

      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (data: RegisterFormValues) => {
  try {
    const result = await login(data).unwrap();

    // 👇 نحفظ الايميل
    localStorage.setItem("email", data.email);

    toast.success("Check your email for verification code");

    form.reset({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    });

    router.push("/conformpassword");
  } catch (err: any) {
    console.error("Register error:", err);

    const message = err.data?.message || err.message || "Register failed";

    toast.error(message);
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
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
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* confirm password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}