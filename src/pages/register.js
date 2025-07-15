import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();
  const { status } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const SignupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Registration successful:", result);
        router.push("/login");
      } else {
        console.error("Registration failed:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-4xl">Register</h1>
      <form className="space-y-8 mt-6 p-4 shadow-xl" onSubmit={SignupHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="border rounded p-1"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="border rounded p-1"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="border rounded p-1"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
