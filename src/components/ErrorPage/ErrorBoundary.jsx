import React from "react"
// put toast 
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      this.logErrorToMyService(error, info.componentStack);
    }

    logErrorToMyService(error, componentStack) {
        console.error("Error occurred:", error);
        console.error("Component stack:", componentStack);
        // Here you would typically log the error to your service
        // For demonstration, we are logging to the console
      }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return this.props.fallback;
      }
  
      return this.props.children;
    }
  }

export default ErrorBoundary;