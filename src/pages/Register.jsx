import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen grid place-items-center px-4 pt-20">
      <div className="w-full max-w-md bg-surface border border-stroke rounded-3xl p-8">
        <div className="flex gap-1 p-1 bg-bg rounded-full mb-6">
          <Link
            to="/login"
            className="flex-1 py-2 rounded-full text-sm text-center capitalize text-muted"
          >
            login
          </Link>
          <span className="flex-1 py-2 rounded-full text-sm text-center capitalize bg-text-primary text-bg">
            register
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Full name"
            className="w-full bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent"
          />
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
          <button className="w-full bg-text-primary text-bg py-3 rounded-full text-sm hover:bg-accent transition-colors">
            Create Account
          </button>
        </form>
        <p className="text-xs text-muted text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-accent">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
