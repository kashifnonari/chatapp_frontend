import Image from "next/image";
import Register from "./register/RegisterForm";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className="min-h-screen min-w-full bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >
      {/* Hero Section */}
      <section
        className="w-full flex flex-col justify-center items-center text-center py-20 px-6"
      >
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm">
          Welcome to ChatApp
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Connect instantly with friends and family. Secure, fast, and simple messaging — all in one place.
        </p>
        <section className="mt-8 flex gap-4">
          <Link
            href="/register"
            className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            href="/login"
          >
            Login
          </Link>
        </section>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white shadow-inner">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Why Choose ChatApp?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">🔒 Secure</h3>
            <p className="text-gray-600">
              End-to-end encryption keeps your conversations private and safe.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">⚡ Fast</h3>
            <p className="text-gray-600">
              Lightning-fast messaging with real-time delivery and notifications.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">💬 Simple</h3>
            <p className="text-gray-600">
              Clean and intuitive interface designed for effortless communication.
            </p>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">
          Ready to start chatting?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands of users already enjoying seamless conversations.
        </p>
        <Link
          href="/register"
          className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500">
        © {new Date().getFullYear()} ChatApp By Kashif. All rights reserved.
      </footer>

    </section>
  );
}
