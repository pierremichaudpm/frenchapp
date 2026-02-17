import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-light flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center border border-brume shadow-lg">
            <span className="text-6xl block mb-4">😔</span>
            <h1 className="text-xl font-bold text-dark font-serif mb-2">Oups!</h1>
            <p className="text-muted mb-6">
              Quelque chose ne fonctionne pas. Essayez de recharger la page.
            </p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
              className="px-6 py-3 bg-primary text-white rounded-full font-medium active:scale-95 transition-transform"
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
