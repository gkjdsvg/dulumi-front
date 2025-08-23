import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SSEComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

     const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8087/login-api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            });
            
            if (!response.ok) {
                throw new Error("Login failed");
            }

            const jwt = await response.text();
            setToken(jwt);
            localStorage.setItem("token", jwt);
            console.log("Login successful:", jwt);

        } catch (error) {
            console.error("Error during login:", error);
        }
    }
}