import React from 'react';
import { useToast } from './Toast';

/**
 * Centralized error boundary to catch render errors and show friendly messages.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error?.message || 'Unexpected error' };
  }

  componentDidCatch(error) {
    // Log minimal info; avoid sensitive data
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('App error boundary:', error?.message);
    }
  }

  render() {
    if (this.state.hasError) {
      return <FriendlyError message={this.state.errorMsg} />;
    }
    return this.props.children;
  }
}

function FriendlyError({ message }) {
  const { show } = useToast();
  React.useEffect(() => {
    show({ type: 'error', text: 'Something went wrong. Please try again.' });
  }, [show]);

  return (
    <div className="main">
      <section className="card">
        <div className="card-body">
          <h2>We hit a snag</h2>
          <p className="text-muted">An error occurred while rendering the page.</p>
          <details style={{whiteSpace:'pre-wrap'}} className="text-muted">
            {message}
          </details>
          <button className="btn btn-primary" onClick={()=> window.location.reload()}>Reload</button>
        </div>
      </section>
    </div>
  );
}
