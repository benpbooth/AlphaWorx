"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const endpoint = isCreatingAccount ? '/api/auth/create' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setTimeout(() => {
          router.push(`/dashboard/${username}`);
        }, 1500);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-purple-100 rounded-full opacity-15 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-64 h-64 bg-indigo-100 rounded-full opacity-25 blur-2xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-300 rounded-full opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(90deg, #3b82f6 1px, transparent 1px),
                               linear-gradient(180deg, #3b82f6 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px', '0px 0px']
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <h1 className="text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                A3<span style={{ color: '#ff8a65' }}> Solutions</span>
              </h1>
              <p className="text-sm text-gray-500 font-medium">Analytics</p>
            </motion.div>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Form toggle tabs */}
            <div className="flex bg-gray-50/50">
              <button
                type="button"
                onClick={() => setIsCreatingAccount(false)}
                className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-300 relative ${
                  !isCreatingAccount 
                    ? 'text-blue-600 bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Sign In
                {!isCreatingAccount && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingAccount(true)}
                className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-300 relative ${
                  isCreatingAccount 
                    ? 'text-blue-600 bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Create Account
                {isCreatingAccount && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  />
                )}
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.form
                  key={isCreatingAccount ? 'create' : 'login'}
                  initial={{ opacity: 0, x: isCreatingAccount ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isCreatingAccount ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Username field */}
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'username' ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        onFocus={() => setFocusedInput('username')}
                        onBlur={() => setFocusedInput(null)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error/Success messages */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-red-700" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-green-700" style={{ fontFamily: 'Inter, sans-serif' }}>{success}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>
                          {isCreatingAccount ? 'Creating Account...' : 'Signing In...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          {isCreatingAccount ? 'Create Account' : 'Sign In'}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              Need help? Contact us at{' '}
                              <a href="mailto:info@alphaworxsystems.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                  info@alphaworxsystems.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}