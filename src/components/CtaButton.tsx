export function CtaButton({ children }: { children: string }) {
  return (
    <button type="button" className="cta">
      {children}
    </button>
  );
}
