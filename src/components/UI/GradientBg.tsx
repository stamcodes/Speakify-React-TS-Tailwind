// components/UI/GradientBg.tsx
function GradientBg({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-8"
      style={{
        background: `
          linear-gradient(to bottom, #f6f1e4 30%, #edc0c5 55%, #d5d1e2 100%)
        `,
      }}
    >
      {children}
    </div>
  );
}

export default GradientBg;
