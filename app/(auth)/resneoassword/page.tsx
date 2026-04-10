/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useResendConfirmEmailMutation } from "@/app/redux/slices/ApiSlice";
import { useRouter } from "next/navigation";
import { z } from "zod";

const resendSchema = z.object({
  email: z.string().email("Invalid email"),
});

type ResendValues = z.infer<typeof resendSchema>;

export default function ResendPassword() {

  const router = useRouter();

  const [resendEmail, { isLoading }] = useResendConfirmEmailMutation();

  const form = useForm<ResendValues>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ResendValues) => {
    try {

      const res = await resendEmail(values).unwrap();

      toast.success(res.message || "Email sent successfully");

      router.push("/conformpassword");

    } catch (err: any) {

      console.error(err);

      toast.error(err?.data?.message || "Something went wrong");

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Resend Confirmation Email</CardTitle>
          <CardDescription>
            Enter your email to resend the confirmation link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Resend Email"}
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
