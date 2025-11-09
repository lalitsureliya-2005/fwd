import { Component } from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                        <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;