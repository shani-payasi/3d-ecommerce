import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen grid place-items-center px-4 pt-20">
      <div className="w-full max-w-md bg-surface border border-stroke rounded-3xl p-8">
        <div className="flex gap-1 p-1 bg-bg rounded-full mb-6">
          <span className="flex-1 py-2 rounded-full text-sm text-center capitalize bg-text-primary text-bg">
            login
          </span>
          <Link
            to="/register"
            className="flex-1 py-2 rounded-full text-sm text-center capitalize text-muted"
          >
            register
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <div className="flex justify-between text-xs text-muted">
            <Link to="/login" className="hover:text-text-primary">
              Forgot password?
            </Link>
          </div>
          <button className="w-full bg-text-primary text-bg py-3 rounded-full text-sm hover:bg-accent transition-colors">
            Sign In
          </button>
        </form>
        <p className="text-xs text-muted text-center mt-4">
          New here?{" "}
          <Link to="/register" className="text-accent">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
