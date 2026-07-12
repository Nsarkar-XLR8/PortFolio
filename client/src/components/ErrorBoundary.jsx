import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-shell grid min-h-[60vh] place-items-center px-4">
          <div className="hero-panel max-w-lg rounded-3xl px-8 py-10 text-center">
            <span className="section-kicker justify-center">System Error</span>
            <h2 className="mt-5 text-2xl font-black text-main">
              Something went wrong
            </h2>
            <p className="lead-copy mt-4 text-sm">
              {this.state.error?.message || "An unexpected error occurred while rendering this section."}
            </p>
            <button
              onClick={this.handleRetry}
              className="btn-primary mt-6 rounded-lg px-6 py-3 font-bold"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
