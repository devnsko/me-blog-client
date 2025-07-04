"use client";
import { SignUpSchema, signUpSchema } from "@/libs/schemas/authSchemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";

export default function SignupPage() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        setError,
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: ''
        }
    });

    const onSubmit = async (data: SignUpSchema) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        const response = await fetch(`/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            }),
            credentials: 'include'
        });
        console.log('body:', data);
        console.log('Response:', await response.json());

        if (!response.ok) {
            console.error('Error during signup:', response.status, response.statusText);
            const errorData = await response.json();
            setError("email", { type: "manual", message: errorData.message });
            Object.entries(errorData.errors).forEach(([field, messages]) => {
                if (Array.isArray(messages) && messages.length > 0) {
                    setError(field as keyof SignUpSchema, { type: "server", message: messages.join(", ") });
                }
            });
            return;
        }
    };

    return (
        <div>
            <main>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    {(["username", "email"] as (keyof SignUpSchema)[]).map((id) => (
                    <div key={id}>
                    <label htmlFor={id} className="block text-sm text-foreground mb-1">{id}</label>
                    <input
                        id={id}
                        placeholder={id}
                        {...register(id)}
                        className={`w-full px-4 py-2 rounded-md bg-background border ${errors[id] ? 'border-red-500' : 'border-white/20'} text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition`}
                    />
                    <AnimatePresence>
                        {errors[id] && (
                        <motion.p
                            className="text-sm text-red-500 mt-1"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                        >
                            {errors[id]?.message}
                        </motion.p>
                        )}
                    </AnimatePresence>
                    </div>
                    ))}
                    <div>
        <label htmlFor="password" className="block text-sm text-foreground mb-1">Hasło</label>
        <div className="relative">
          <input
            type="password"
            id="password"
            placeholder="Hasło"
            {...register("password")}
            className={`w-full px-4 py-2 rounded-md bg-background border ${errors.password ? 'border-red-500' : 'border-white/20'} text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition`}
          />
        </div>
        <AnimatePresence>
          {errors.password && (
            <motion.p
              className="text-sm text-red-500 mt-1"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {errors.password?.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Repeat password field with eye */}
      <div>
        <label htmlFor="repeatPassword" className="block text-sm text-foreground mb-1">Powtórz hasło</label>
        <div className="relative">
          <input
            type="password"
            id="repeatPassword"
            placeholder="Powtórz hasło"
            {...register("repeatPassword")}
            className={`w-full px-4 py-2 rounded-md bg-background border ${errors.repeatPassword ? 'border-red-500' : 'border-white/20'} text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition`}
          />
        </div>
        <AnimatePresence>
          {errors.repeatPassword && (
            <motion.p
              className="text-sm text-red-500 mt-1"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {errors.repeatPassword?.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
        {/* Submit Button */}
      <button
      disabled={isSubmitting}
      type="submit"
      className={`${
        isSubmitting ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white`}
    >
      {isSubmitting ? "Loading..." : "Register"}
    </button>
        <AnimatePresence>
            {errors.root?.serverError && (
            <motion.p
                className="text-sm text-red-500 text-center"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
            >
                {errors.root.serverError.message}
            </motion.p>
        )}
      </AnimatePresence>
                </form>
            </main>
        </div>
    )
}