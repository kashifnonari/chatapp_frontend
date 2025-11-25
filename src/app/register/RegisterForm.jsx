"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// ⭐ Add Metadata for Page Title
export const metadata = {
    title: "Create Account | MyApp",
};

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

    const password = watch("password");

    async function onSubmit(data) {
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/register/`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            setMessage({ type: "success", text: "Registration Successful" });
            console.log("Success:", response.data);
            reset();

            setTimeout(() => {
                router.push("/login");
            }, 1500);

        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
                setMessage({ type: "error", text: "Server Error" });
            } else {
                console.error("Network Error:", error.message);
                setMessage({ type: "error", text: "Network error. Please try again." });
            }
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage({ type: "", text: "" });
            }, 1500);
        }
    }

    return (
        <div className="h-screen w-full bg-[#EEF2FF] p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[400px] p-6 px-8 rounded-xl mx-auto bg-white shadow-xl"
            >
                <h1 className="text-center text-[34px] font-bold text-blue-600">
                    Create Account
                </h1>
                <p className="text-center my-2 text-gray-500 text-sm">
                    Join us today and get started
                </p>

                {message.text && (
                    <p
                        className={`w-full text-center text-lg rounded-lg py-3 px-4 border 
                        ${message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                        `}
                    >
                        {message.text}
                    </p>
                )}

                <section className="flex flex-col gap-4 my-5">
                    {/* Name */}
                    <section>
                        <input
                            type="text"
                            className={`border w-full rounded-lg py-3 px-4 focus:outline-none
                            ${errors.name ? "border-red-500 focus:border-red-500 border-2" : "border-gray-300 focus:border-blue-500 border-2"}
                            `}
                            {...register("name", {
                                required: "Username is required",
                                minLength: { value: 3, message: "Minimum 3 characters" },
                                maxLength: { value: 30, message: "Maximum 30 characters" }
                            })}
                            placeholder="Enter your full name"
                            disabled={loading}
                        />
                        {errors.name && <p className="text-sm text-red-600 mt-2 ml-2">{errors.name.message}</p>}
                    </section>

                    {/* Phone */}
                    <section>
                        <input
                            type="tel"
                            className={`border w-full rounded-lg py-3 px-4 focus:outline-none
                            ${errors.phone ? "border-red-500 focus:border-red-500 border-2" : "border-gray-300 focus:border-blue-500 border-2"}
                            `}
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^(\+92[0-9]{10}|03[0-9]{9})$/,
                                    message: "Invalid Pakistani phone number format"
                                }
                            })}
                            placeholder="+92 XXX XXXXXXX or 03XX XXXXXXX"
                            disabled={loading}
                        />
                        {errors.phone && <p className="text-sm text-red-600 mt-2 ml-2">{errors.phone.message}</p>}
                    </section>

                    {/* Password */}
                    <section>
                        <input
                            type="password"
                            className={`border w-full rounded-lg py-3 px-4 focus:outline-none
                            ${errors.password ? "border-red-500 focus:border-red-500 border-2" : "border-gray-300 focus:border-blue-500 border-2"}
                            `}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 4, message: "Minimum 4 characters / numbers." },
                                maxLength: { value: 12, message: "Maximum 12 characters / numbers" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: "Password must contain uppercase, lowercase and number"
                                }
                            })}
                            placeholder="Create a strong password"
                            disabled={loading}
                        />
                        {errors.password && <p className="text-sm text-red-600 mt-2 ml-2">{errors.password.message}</p>}
                    </section>

                    {/* Confirm Password */}
                    <section>
                        <input
                            type="password"
                            className={`border w-full rounded-lg py-3 px-4 focus:outline-none
                            ${errors.confirmPassword ? "border-red-500 focus:border-red-500 border-2" : "border-gray-300 focus:border-blue-500 border-2"}
                            `}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === password || "Passwords do not match"
                            })}
                            placeholder="Confirm your password"
                            disabled={loading}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-600 mt-2 ml-2">{errors.confirmPassword.message}</p>
                        )}
                    </section>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`cursor-pointer border w-full rounded-lg py-2 px-4 border-blue-600 border-2 font-semibold transition
                        ${loading ? "bg-blue-400 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}
                        `}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    <p className="text-sm text-end flex gap-2 justify-end">
                        Already have an account?
                        <Link href="/login" className="text-blue-600 hover:border-b">Login</Link>
                    </p>
                </section>
            </form>
        </div>
    );
}
