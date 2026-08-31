import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error("3D render error:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="text-muted text-sm p-4">Something went wrong.</div>
        )
      );
    }
    return this.props.children;
  }
}
