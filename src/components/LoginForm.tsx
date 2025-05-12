'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement login logic
    console.log('Login attempt with:', { email, password });
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <h2>Welcome to Novas</h2>
        <h4>Sign in to your account</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div>
            <input id="remember-me" name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <div>
            <Link href="/forgot-password">Forgot your password?</Link>
          </div>
        </div>

        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : null}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}