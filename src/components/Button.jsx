import { Link } from "react-router-dom";
import { cn } from "../utils/helpers";

const variants = {
  primary: "bg-text-primary text-bg hover:bg-accent",
  outline: "border border-stroke text-text-primary hover:border-accent",
  accent: "bg-accent text-bg hover:bg-[#6f93b8]",
  ghost: "text-muted hover:text-text-primary",
};

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105";
  const cls = cn(base, variants[variant], className);

  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  return (
    <button type={type || "button"} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
