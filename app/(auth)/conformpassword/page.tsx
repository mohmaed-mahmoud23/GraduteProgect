/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useActiveemailMutation } from "@/app/redux/slices/ApiSlice";
import { ActiveEmailSchema, ActiveEmailSchemaValues } from "@/lib/zodAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Link from "next/link";
import ResendPassword from "../resneoassword/page";

export default function VerifyRequestForm() {
  const router = useRouter();

  // 👇 جلب الايميل من localStorage أو أي مصدر مضمون
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : "";
  if (!email) {
    console.warn("No email found! Please send the user email first.");
  }

  const [activeEmail, { isLoading }] = useActiveemailMutation();

  const form = useForm<ActiveEmailSchemaValues>({
    resolver: zodResolver(ActiveEmailSchema),
    defaultValues: {
      email: email || "",
      code: "",
    },
  });

  const { handleSubmit, control, watch } = form;

  const codeValue = watch("code");
  const codeStr = Array.isArray(codeValue) ? codeValue.join("") : codeValue;
  const isCompleted = codeStr.length === 6;

  const onSubmit = async (data: ActiveEmailSchemaValues) => {
    const payload = { ...data, email: email || data.email };     
    console.log("Submitting payload:", payload);

    try {
      await activeEmail(payload).unwrap();
      toast.success("Verification successful!");
      router.push("/login");
    } catch (err: any) {
      console.error("Error submitting OTP:", err);
      const message = err.data?.message || err.message || "Verification failed";
      toast.error(message);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Please Check Your Email</CardTitle>
        <CardDescription className="text-center text-lg">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4"
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <InputOTP
                value={field.value}
                onChange={field.onChange}
                maxLength={6}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <Button
            type="submit"
            className="w-full flex justify-center items-center gap-2"
            disabled={!isCompleted || isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
                Loading...
              </>
            ) : (
              <>Verify Account</>
            )}
          </Button>
        </form>

        <Link href={"/resneoassword"} className="text-base">resend-confirm-email?</Link>
      </CardContent>
    </Card>
  );
}
