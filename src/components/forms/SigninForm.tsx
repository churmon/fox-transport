"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInAccount } from "@/lib/appwrite/api";
import Image from "next/image";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useRouter();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isPending:isLoading } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Login failed. Please try again." });
      
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (session) {
      form.reset();

      navigate.push("/");
    } else {
      toast({ title: "Login failed. Please try again.", });
      
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="flex w-full h-screen ">
        <div className="w-full md:w-1/2 h-full grid grid-cols-1 content-center mx-3">
          <div className="">
          <h2 className="text-center">
            Log in to your account
          </h2>
          <p className="text-light-3 text-center small-medium md:base-regular mt-2">
            Welcome back! Please enter your details.
          </p>
          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
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
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              {isLoading || isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Log in"
              )}
              {/* Log in */}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="text-primary-500 text-small-semibold ml-1">
                Sign up
              </Link>
            </p>
          </form>
          </div>
        </div>

        <div className="hidden md:w-1/2 md:block h-full">
            <Image src='/images/image1.jpg' alt="" width={1000} height={1000} className="w-full h-full object-cover" />
        </div>
      </div>
    </Form>
  );
};

export default SigninForm;
