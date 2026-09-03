import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Surface to the console in development; in production the build's
    // source map + any host-level error reporter (Sentry, Vercel, etc.)
    // should pick this up. We deliberately do not call window.location.reload()
    // here — if the render path is broken, reload just reproduces the bug.
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  private handleReset = () => {
    // Try to recover by clearing local state and re-rendering. If the
    // underlying problem is in a parent provider, the user can still fall
    // back to a full reload.
    this.setState({ hasError: false, error: null });
  };

  private handleCopyError = async () => {
    const { error } = this.state;
    if (!error) return;
    const payload = `${error.name}: ${error.message}\n\n${error.stack ?? "(no stack)"}`;
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // Clipboard API may be blocked; fall back to a textarea selection.
      const ta = document.createElement("textarea");
      ta.value = payload;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } finally { document.body.removeChild(ta); }
    }
  };

  private handleReload = () => {
    // Last-resort full reload. Used only when "Try Again" can't recover.
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex items-center justify-center bg-bg text-text px-6"
        >
          <div className="max-w-md text-center">
            <p className="text-5xl mb-4" aria-hidden="true">⚠️</p>
            <h1 className="text-xl font-bold text-text mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-text-muted mb-6">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-light transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleCopyError}
                className="px-6 py-3 bg-bg-card border border-border text-text rounded-full font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
              >
                Copy Error
              </button>
              <button
                onClick={this.handleReload}
                className="px-6 py-3 text-text-muted text-sm hover:text-text transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
