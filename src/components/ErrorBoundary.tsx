import React, { Component, ReactNode } from 'react';
import ErrorComponent from './ErrorComponent';

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its children,
 * logs them, and displays a fallback UI.
 *
 * @component
 * @example
 * <ErrorBoundary fallback={<p>Something went wrong.</p>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    // Update state to display fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error details
    console.log(
      'Error caught in ErrorBoundary:',
      JSON.stringify(error),
      JSON.stringify(errorInfo),
    );
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <ErrorComponent />;
    }

    // Render children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
