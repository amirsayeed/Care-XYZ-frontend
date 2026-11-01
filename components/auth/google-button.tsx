export function GoogleButton({ next }: { next: string }) {
    return (
      <a
        href={`/api/auth/google?next=${encodeURIComponent(next)}`}
        className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
      >
        Continue with Google
      </a>
    );
  }
  
  export function AuthDivider() {
    return (
      <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        or
        <span className="h-px flex-1 bg-gray-200" />
      </div>
    );
  }