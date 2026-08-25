import { useScrollReveal } from "../hooks/useScrollReveal";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionReveal({ children, className = "", id }: Props) {
  const ref = useScrollReveal(0.1);

  return (
    <div ref={ref} id={id} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
