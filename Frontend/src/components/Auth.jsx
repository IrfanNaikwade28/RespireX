import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Move form components outside of Auth component
const LoginForm = ({ formData, setFormData, handleSubmit, setIsLogin, error, loading }) => (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
        </div>

        {error && (
            <div className="text-red-500 text-sm text-center">
                {error}
            </div>
        )}

        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                </label>
            </div>
            <button type="button" className="text-sm text-primary-blue hover:text-primary-blue/80">
                Forgot password?
            </button>
        </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-primary-blue hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                </>
            ) : (
                'Sign in'
            )}
        </button>

        <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-medium text-primary-blue hover:text-primary-blue/80"
            >
                Sign up
            </button>
        </p>
    </form>
);

const SignupForm = ({ formData, setFormData, handleSubmit, setIsLogin, error, loading }) => (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
            </div>
        </div>

        {error && (
            <div className="text-red-500 text-sm text-center">
                {error}
            </div>
        )}

        <div className="flex items-center">
            <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-primary-blue hover:text-primary-blue/80">
                    Terms and Conditions
                </a>
            </label>
        </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-primary-blue hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                </>
            ) : (
                'Create account'
            )}
        </button>

        <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button 
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-medium text-primary-blue hover:text-primary-blue/80"
            >
                Sign in
            </button>
        </p>
    </form>
);

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);

            if (!isLogin && formData.password !== formData.confirmPassword) {
                setError("Passwords don't match");
                return;
            }
            
            if (isLogin) {
                const response = await fetch('http://127.0.0.1:8000/user/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('auth_token', data.auth_token);
                    navigate('/');
                } else {
                    setError(data.message || 'Login failed');
                }
            } else {
                const response = await fetch('http://127.0.0.1:8000/user/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        name: formData.name,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setIsLogin(true);
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                    setError('Registration successful! Please login.');
                } else {
                    setError(data.message || 'Registration failed');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Auth error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-black">
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {isLogin ? 'Please enter your details' : 'Start your journey with us'}
                    </p>
                </div>

                {isLogin ? (
                    <LoginForm 
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                        setIsLogin={setIsLogin}
                        error={error}
                        loading={loading}
                    />
                ) : (
                    <SignupForm 
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                        setIsLogin={setIsLogin}
                        error={error}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}; 