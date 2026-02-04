import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Sparkles,
    Code2,
    Zap,
    Terminal,
    FileCode,
    Layers,
    CheckCircle2,
    ChevronRight,
    Github,
    Twitter,
    Linkedin,
    Menu,
    X,
    Play,
    Download,
    Clock,
    Users,
    Star,
    TrendingUp,
    Shield,
    Cpu,
    Box,
    LogOut
} from 'lucide-react';
import { useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import { projectService } from './services/projects';

// Types
interface NavItem {
    label: string;
    href: string;
}

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface Step {
    number: string;
    title: string;
    description: string;
}

interface PricingTier {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
}

interface Testimonial {
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
}

interface FAQ {
    question: string;
    answer: string;
}

// Navbar Component
const Navbar: React.FC<{ onAuthClick: () => void }> = ({ onAuthClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems: NavItem[] = [
        { label: 'Manifesto', href: '#manifesto' },
        { label: 'Careers', href: '#careers' },
        { label: 'Discover', href: '#discover' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">VibeCober</span>
                        <span className="text-sm text-gray-400 hidden sm:inline">· Local AI</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="hidden sm:block text-gray-300 text-sm">Hi, {user?.name}</span>
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onAuthClick}
                                    className="hidden sm:block px-4 py-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={onAuthClick}
                                    className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4"
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="block py-2 text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

// Hero Section
const HeroSection: React.FC<{ onAuthRequired: () => void }> = ({ onAuthRequired }) => {
    const [idea, setIdea] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const fullPlaceholder = 'Make me a SaaS app with authentication and payments...';
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullPlaceholder.length) {
                setPlaceholder(fullPlaceholder.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!idea.trim()) return;

        if (!isAuthenticated) {
            onAuthRequired();
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const result = await projectService.generateProject(idea);
            setSuccess(true);
            setIdea('');
            // Show success message
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || 'Failed to generate project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">Local AI · Zero API Cost</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
                >
                    VibeCober
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-12"
                >
                    Turn ideas into real, runnable code.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto"
                >
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                            🎉 Project generation started! Check your projects.
                        </div>
                    )}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center">
                            <textarea
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                                placeholder={placeholder}
                                disabled={loading}
                                className="flex-1 bg-transparent text-white placeholder-gray-500 px-6 py-4 text-lg focus:outline-none resize-none min-h-[120px] disabled:opacity-50"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={!idea.trim() || loading}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl p-4 transition-all mr-2 group"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                )}
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4">
                        {loading ? 'Generating your project...' : isAuthenticated ? 'Press Enter to generate' : 'Login required to generate projects'}
                    </p>
                </motion.form>
            </div>
        </section>
    );
};

// How It Works Section
const HowItWorksSection: React.FC = () => {
    const steps: Step[] = [
        {
            number: '01',
            title: 'Analyze',
            description: 'AI understands your idea and plans the architecture',
        },
        {
            number: '02',
            title: 'Generate',
            description: 'Creates production-ready code with best practices',
        },
        {
            number: '03',
            title: 'Run',
            description: 'Get a fully functional, runnable project instantly',
        },
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">How it works</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Simple, honest, and powerful. Three steps to your next project.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">
                                <div className="text-6xl font-bold text-indigo-500/20 mb-4">{step.number}</div>
                                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Features Section
const FeaturesSection: React.FC = () => {
    const features: Feature[] = [
        {
            icon: <Code2 className="w-8 h-8" />,
            title: 'Production-first output',
            description: 'Clean, maintainable code following industry best practices',
        },
        {
            icon: <FileCode className="w-8 h-8" />,
            title: 'Real files, not snippets',
            description: 'Complete project structure with all necessary files',
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: 'Local AI, zero API cost',
            description: 'Runs on your machine with Ollama/Mistral',
        },
        {
            icon: <Terminal className="w-8 h-8" />,
            title: 'CLI + Web support',
            description: 'Use it from terminal or browser, your choice',
        },
    ];

    return (
        <section className="py-32 bg-gradient-to-b from-slate-950 to-slate-900 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Why developers like it
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Built by developers, for developers. No fluff, just results.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">
                                <div className="text-indigo-400 mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Pricing Section
const PricingSection: React.FC = () => {
    const tiers: PricingTier[] = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for trying out VibeCober',
            features: [
                '5 projects per month',
                'Basic templates',
                'Community support',
                'Local AI processing',
            ],
        },
        {
            name: 'Pro',
            price: '$29',
            period: 'per month',
            description: 'For serious developers',
            features: [
                'Unlimited projects',
                'Premium templates',
                'Priority support',
                'Advanced AI models',
                'Custom configurations',
                'Team collaboration',
            ],
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'contact us',
            description: 'For teams and organizations',
            features: [
                'Everything in Pro',
                'Dedicated support',
                'Custom integrations',
                'SLA guarantee',
                'On-premise deployment',
                'Training & onboarding',
            ],
        },
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Simple pricing</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Start free, scale as you grow. No hidden fees.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group ${tier.highlighted ? 'md:-mt-4' : ''}`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div
                                className={`relative bg-slate-900/50 backdrop-blur-sm border rounded-2xl p-8 h-full ${tier.highlighted
                                    ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/20'
                                    : 'border-white/5 hover:border-indigo-500/30'
                                    } transition-all`}
                            >
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="mb-4">
                                    <span className="text-5xl font-bold text-white">{tier.price}</span>
                                    <span className="text-gray-400 ml-2">/ {tier.period}</span>
                                </div>
                                <p className="text-gray-400 mb-8">{tier.description}</p>
                                <button
                                    className={`w-full py-3 rounded-xl font-medium transition-all mb-8 ${tier.highlighted
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                        }`}
                                >
                                    Get Started
                                </button>
                                <ul className="space-y-4">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Testimonials Section
const TestimonialsSection: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            name: 'Sarah Chen',
            role: 'Indie Hacker',
            company: 'BuildFast',
            content: 'VibeCober helped me ship 3 SaaS products in a month. The code quality is impressive.',
            avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
            name: 'Marcus Rodriguez',
            role: 'CTO',
            company: 'TechStart',
            content: 'Finally, an AI tool that generates production-ready code. Our team loves it.',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
            name: 'Emily Watson',
            role: 'Full Stack Developer',
            company: 'Freelance',
            content: 'The local AI approach means no API costs. Perfect for rapid prototyping.',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
    ];

    return (
        <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Trusted by developers
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        See what developers are saying about VibeCober
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-400 text-sm">
                                            {testimonial.role} at {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic">"{testimonial.content}"</p>
                                <div className="flex mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// FAQ Section
const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQ[] = [
        {
            question: 'How does VibeCober work?',
            answer: 'VibeCober uses local AI models (Ollama/Mistral) to analyze your idea, plan the architecture, and generate production-ready code. Everything runs on your machine.',
        },
        {
            question: 'Do I need an API key?',
            answer: 'No! VibeCober runs entirely locally using Ollama or Mistral. Zero API costs, complete privacy.',
        },
        {
            question: 'What kind of projects can I build?',
            answer: 'Full-stack web apps, SaaS products, APIs, landing pages, and more. VibeCober supports modern frameworks like React, Next.js, Node.js, and Python.',
        },
        {
            question: 'Is the generated code production-ready?',
            answer: 'Yes! VibeCober follows best practices and generates clean, maintainable code with proper structure, error handling, and documentation.',
        },
        {
            question: 'Can I customize the generated code?',
            answer: 'Absolutely. The code is yours to modify and extend. VibeCober generates real files, not locked snippets.',
        },
        {
            question: 'What support is available?',
            answer: 'Free users get community support. Pro users get priority email support. Enterprise users get dedicated support with SLA.',
        },
    ];

    return (
        <section className="py-32 bg-slate-950 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Frequently asked questions
                    </h2>
                    <p className="text-xl text-gray-400">Everything you need to know</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                            >
                                <span className="text-lg font-semibold text-white">{faq.question}</span>
                                <ChevronRight
                                    className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? 'rotate-90' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-6 text-gray-400">{faq.answer}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Contact Section
const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <section className="py-32 bg-gradient-to-b from-slate-950 to-slate-900 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Get in touch</h2>
                    <p className="text-xl text-gray-400">
                        Have questions? We'd love to hear from you.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-300 mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Message</label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={6}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 rounded-xl transition-all"
                    >
                        Send Message
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

// Footer
const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">VibeCober</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Turn ideas into real, runnable code with local AI.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 VibeCober. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Main Landing Page Component
const VibeCober: React.FC = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
            <HeroSection onAuthRequired={() => setIsAuthModalOpen(true)} />
            <HowItWorksSection />
            <FeaturesSection />
            <PricingSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
            <Footer />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};

export default VibeCober;
