export function Spinner({ label = "Loading" }: { label?: string }) {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        <span className="text-sm font-medium text-gray-500">{label}...</span>
      </div>
    );
  }