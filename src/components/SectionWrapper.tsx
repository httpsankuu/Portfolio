interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <div
      className={`w-full flex justify-center ${className}`}
    >
      <div className="max-w-6xl w-full">{children}</div>
    </div>
  );
}
