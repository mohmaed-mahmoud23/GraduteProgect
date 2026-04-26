"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrderSchema, createOrderSchemaValues } from "@/lib/zodAuth";
import { Button } from "@/components/ui/button";
import { useCreateOrderMutation } from "@/app/redux/slices/ApiSlice";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateOrder() {
  const form = useForm<createOrderSchemaValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      address: "",
      payment: "Card",
      phone: "",
    },
  });

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const onSubmit = async (data: createOrderSchemaValues) => {
    try {
      const res = await createOrder(data).unwrap();
      console.log(res.data);
      toast.success("Order created successfully 🎉");
      form.reset();
    }catch (err: any) {
  const errorMessage =
    err?.data?.message || err?.data?.error || "Something went wrong ❌";

  toast.error(errorMessage);
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <div className="w-full max-w-xl bg-background rounded-2xl shadow-xl p-6 space-y-6 border">
        {/* 🔥 Header */}
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Create Order</h2>
          <p className="text-sm text-muted-foreground">
            Fill your details to complete your order
          </p>
        </div>

        {/* 🔥 Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your address"
                        className="pl-10 h-12 rounded-xl"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your phone"
                        className="pl-10 h-12 rounded-xl"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment */}
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground z-10" />
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="pl-10 h-12 rounded-xl">
                          <SelectValue placeholder="Choose payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-lg"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
