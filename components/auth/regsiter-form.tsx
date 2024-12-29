"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema } from "@/schema";
import Link from "next/link";
import { useState } from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { register } from "@/actions/register";
import GoogleLogin from "./google-button";
import GithubLogin from "./github-button";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    console.log(data);
    register(data).then((res) => {
      if (res.error) {
        setLoading(false);
        // setError(res.error);
        toast.error(res.error, { theme: "colored" });
        // setSuccess("");
        // setTimeout(() => {
        //   setError("");
        // }, 5000);
      }
      if (res.success) {
        setLoading(false);
        // setError("");
        // setSuccess(res.success);
        form.reset();
        // setTimeout(() => {
        //   setSuccess("");
        // }, 5000);
        toast.success(
          res.success +
            ", mail has been sent to you, please activate your email",
          { theme: "colored" }
        );
        // toast.success("Register successfully", { theme: "colored" });
      }
      setLoading(false);
    });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Registration</CardTitle>
        <CardDescription>Create an account?</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe@email.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="product_plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Plan</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose Product Plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Choose Product Plan</SelectLabel>
                              <SelectItem value="est">
                                Eastern Standard Time (EST)
                              </SelectItem>
                              <SelectItem value="cst">
                                Central Standard Time (CST)
                              </SelectItem>
                              <SelectItem value="mst">
                                Mountain Standard Time (MST)
                              </SelectItem>
                              <SelectItem value="pst">
                                Pacific Standard Time (PST)
                              </SelectItem>
                              <SelectItem value="akst">
                                Alaska Standard Time (AKST)
                              </SelectItem>
                              <SelectItem value="hst">
                                Hawaii Standard Time (HST)
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Register"}
              </Button>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </Form>
        {/* <GoogleLogin />
        <GithubLogin /> */}
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
