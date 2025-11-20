"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const router = useRouter();

    async function onSubmit(data) {
        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/login/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            // ✅ Handle success
            setMessage({ type: "success", text: "Login Successful" });
            console.log("Success:", response.data);

            reset();

            // ✅ Redirect immediately after success (no delay needed)
            router.push("/hero");

        } catch (error) {
            // ✅ Handle errors properly
            if (error.response) {
                console.error("Server Error:", error.response.data);
                setMessage({ type: "error", text: error.response.data.error || "Invalid credentials" });
            } else {
                console.error("Network Error:", error.message);
                setMessage({ type: "error", text: "Network error. Please try again." });
            }
        } finally {
            setLoading(false);

            // ✅ Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ type: "", text: "" });
            }, 3000);
        }
    }

    return (
        <div className="h-screen w-full bg-[#EEF2FF] p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-[400px] p-6 px-8 rounded-xl mx-auto bg-white shadow-xl"
            >
                <h1 className="text-center text-[34px] font-bold text-blue-600">
                    Login
                </h1>
                <p className="text-center my-2 text-gray-500 text-sm">
                    Welcome back! Please sign in
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
                                minLength: { value: 4, message: "Minimum 4 characters" },
                                maxLength: { value: 12, message: "Maximum 12 characters" }
                            })}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                        {errors.password && <p className="text-sm text-red-600 mt-2 ml-2">{errors.password.message}</p>}
                    </section>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`cursor-pointer border w-full rounded-lg py-2 px-4 border-blue-600 border-2 font-semibold transition
                        ${loading ? "bg-blue-400 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}
                        `}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm text-end flex gap-2 justify-end">
                        Don’t have an account?
                        <Link href="/register" className="text-blue-600 hover:border-b">Register</Link>
                    </p>
                </section>
            </form>
        </div>
    );
}
