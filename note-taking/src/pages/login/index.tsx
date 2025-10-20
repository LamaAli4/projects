import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/schemas/login-schema";
import ThemeToggle from "@/components/theme-toggle"; // ✅ استدعاء التوجل الجاهز

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof LoginFormData, value: string) => {
    const result = loginSchema
      .pick({ [field]: true })
      .safeParse({ [field]: value });
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        if (field) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const validUsername = "Lama1234";
    const validPassword = "lama123";

    if (username !== validUsername || password !== validPassword) {
      setErrors({ password: "Invalid username or password" });
      setLoading(false);
      return;
    }

    setTimeout(() => {
      login(username, password);
      navigate("/notes");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-background dark:to-card px-4">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-xl border border-border p-8 backdrop-blur-sm">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <h1 className="text-4xl font-bold text-center mb-3 text-primary tracking-tight">
          Welcome Back
        </h1>
        <p className="text-center text-muted-foreground mb-8 text-sm">
          Sign in to continue managing your{" "}
          <span className="font-semibold text-primary">Notes</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className={`border ${
                errors.username ? "border-destructive" : "border-input"
              } bg-background rounded-lg px-4 py-2.5 w-full text-sm
              focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateField("username", e.target.value);
              }}
              disabled={loading}
            />
            {errors.username && (
              <p className="text-destructive text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`border ${
                  errors.password ? "border-destructive" : "border-input"
                } bg-background rounded-lg px-4 py-2.5 w-full text-sm
                focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all pr-10`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateField("password", e.target.value);
                }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary transition cursor-pointer"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg 
            hover:bg-primary/90 transition text-sm font-semibold shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-primary">Notes</span>. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
