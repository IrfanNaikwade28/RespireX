import { useState } from 'react';

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission based on isLogin state
    };

    const LoginForm = () => (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>
            </div>

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
                className="w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-primary-blue hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
            >
                Sign in
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

    const SignupForm = () => (
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
                className="w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-primary-blue hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
            >
                Create account
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
                {/* Title */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-black">
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {isLogin ? 'Please enter your details' : 'Start your journey with us'}
                    </p>
                </div>

                {/* Render either Login or Signup form based on state */}
                {isLogin ? <LoginForm /> : <SignupForm />}
            </div>
        </div>
    );
}; 