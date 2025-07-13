import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Button from "@/components/ui/Button";

const register = () => {
  // const router = useRouter();
  // const {status} = useSession();

  // useEffect(() => {

  // },[])

  const SignupHandler = async () => {
    const newUser = {
      name: "",
      email: "",
      password: ""
    };
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        console.log("success");
        router.push("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl">Register</h1>
      <form className="space-y-8 mt-6 p-4 shadow-xl" onSubmit={SignupHandler}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="border rounded p-1"
            type="text"
            id="name"
            name="name"
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
            required
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default register;
