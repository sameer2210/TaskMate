import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const SigninHandler = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password
    });

    if (result.error) {
      console.error("Signin failed:", result.error);
    } else {
      console.log("Signin successful:", result);
      router.replace("/profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-4xl">Login</h1>
      <form onSubmit={SigninHandler} className="space-y-8 mt-6 p-4 shadow-xl">
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
