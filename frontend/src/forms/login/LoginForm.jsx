import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import PasswordInput from "@/components/ui/password-input";
import AppLogo from "@/components/AppLogo";
import { useTheme } from "@/context/ThemeStore";
// import { useIsLoggedInRequest } from "@/api/AuthApi";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Redirect from "@/pages/redirect/Redirect";
// import { toast } from "sonner";

export const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

export default function LoginForm({ onSave, isLoading, imgIllustrationSrc, loginHeader }) {
  const { theme } = useTheme();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const {
  //   isSignedIn,
  //   isLoading: isAuthLoading,
  //   isError: isAuthError,
  // } = useIsLoggedInRequest();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     navigate("/", { replace: true });
  //     toast("You are already signed in", { icon: "🚨" });
  //   }

  //   if (isAuthError) {
  //     toast("Login to your account", { icon: "🚨" });
  //   }
  // }, [isSignedIn, isAuthError, navigate]);

  // if (isAuthLoading) {
  //   return <Redirect />;
  // }

  return (
    <div className={`flex flex-col md:flex-row h-screen items-center justify-center transition-colors duration-300 ${theme === "light" ? "bg-gray-50" : "bg-neutral-950"
      }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden opacity-10">
        <div className={`absolute rounded-full w-64 h-64 -top-32 -left-32 ${theme === "light" ? "bg-blue-200" : "bg-blue-900"
          }`}></div>
        <div className={`absolute rounded-full w-96 h-96 -bottom-48 -right-48 ${theme === "light" ? "bg-blue-100" : "bg-blue-800"
          }`}></div>
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 md:left-8"
      >
        <AppLogo className="h-8 w-auto" />
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-1/2 px-6 md:px-12 lg:px-24 flex justify-center"
      >
        <Card className={`w-full max-w-md border-0 shadow-lg ${theme === "light"
          ? "bg-white"
          : "bg-neutral-900/90 backdrop-blur-sm"
          }`}>
          <CardHeader className="pb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <h1 className={`text-3xl font-bold flex items-center gap-2 ${theme === "light" ? "text-gray-900" : "text-white"
                }`}>
                {loginHeader || "Welcome Back"}
              </h1>
              <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}>
                Enter your credentials to access your account
              </p>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={
                        form.formState.errors.email
                          ? "text-red-500"
                          : theme === "light"
                            ? "text-gray-700"
                            : "text-gray-300"
                      }>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className={`relative rounded-md transition-all ${form.formState.errors.email
                          ? "ring-1 ring-red-500"
                          : "focus-within:ring-2 focus-within:ring-blue-500"
                          } ${theme === "light"
                            ? "bg-white border border-gray-200"
                            : "bg-neutral-800 border border-neutral-700"
                          }`}>
                          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${theme === "light" ? "text-gray-400" : "text-gray-500"
                            }`}>
                            <Mail className="h-5 w-5" />
                          </div>
                          <Input
                            className={`block w-full pl-10 pr-3 py-3 border-0 bg-transparent ${theme === "light"
                              ? "placeholder-gray-400 text-gray-900"
                              : "placeholder-gray-500 text-white"
                              } focus:ring-0 focus:outline-none`}
                            placeholder="name@example.com"
                            type="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {/* Password Input - Redesigned */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={
                        form.formState.errors.password
                          ? "text-red-500"
                          : theme === "light"
                            ? "text-gray-700"
                            : "text-gray-300"
                      }>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className={`relative rounded-md transition-all ${form.formState.errors.password
                          ? "ring-1 ring-red-500"
                          : "focus-within:ring-2 focus-within:ring-blue-500"
                          } ${theme === "light"
                            ? "bg-white border border-gray-200"
                            : "bg-neutral-800 border border-neutral-700"
                          }`}>
                          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${theme === "light" ? "text-gray-400" : "text-gray-500"
                            }`}>
                            <Lock className="h-5 w-5" />
                          </div>
                          <PasswordInput
                            className={`block w-full pl-10 pr-3 py-3 border-0 bg-transparent ${theme === "light"
                              ? "placeholder-gray-400 text-gray-900"
                              : "placeholder-gray-500 text-white"
                              } focus:ring-0 focus:outline-none`}
                            placeholder="••••••••"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    className={`text-sm ${theme === "light"
                      ? "text-blue-600 hover:text-blue-700"
                      : "text-blue-400 hover:text-blue-300"
                      }`}
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className={`w-full py-6 rounded-lg text-base font-medium ${isLoading ? "opacity-90" : ""
                    } ${theme === "light"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-700 hover:bg-blue-600"
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}>
              Don't have an account?{" "}
              <button
                type="button"
                className={`font-medium ${theme === "light"
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-blue-400 hover:text-blue-300"
                  }`}
              >
                Sign up
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden md:flex w-1/2 h-full items-center justify-center p-12"
      >
        <div className={`rounded-3xl overflow-hidden shadow-2xl w-full h-full flex items-center justify-center ${theme === "light" ? "bg-gray-100" : "bg-neutral-800"
          }`}>
          <img
            className="w-full h-full object-contain p-12"
            src={imgIllustrationSrc || "/images/auth-illustration.svg"}
            alt="Login Illustration"
            draggable="false"
          />
        </div>
      </motion.div>
    </div>
  );
};
