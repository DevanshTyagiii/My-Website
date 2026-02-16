import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ChevronRight, User, Bot, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

// Types
type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
    isLeadForm?: boolean;
};


// Knowledge Base & Responses
const KNOWLEDGE_BASE = {
    services: "We offer custom website development, business websites, landing pages, e-commerce solutions, portfolio websites, and performance optimization/redesign services.",
    process: "Our process includes: 1. Discovery & Discussion, 2. Design & Prototype, 3. Development, 4. Revisions, 5. Testing, and 6. Deployment.",
    timeline: "Standard websites typically take 5–10 days. Advanced or custom projects may take 2–4 weeks depending on complexity.",
    pricing: "Pricing depends on the scope, features, and integrations required. I'd be happy to arrange a personalized quote for you!",
    support: "We provide 1 month of free technical support after deployment, which includes bug fixes. We also offer optional monthly maintenance plans.",
    maintenance: "Our maintenance services cover content updates, security patches, backup management, speed optimization, and feature additions.",
    contact: "You can reach us via our contact form or WhatsApp. Would you like me to take down your details so our team can contact you?",
    technical: "We build with SEO-friendly structures, mobile responsiveness, fast loading optimization, and can integrate tools like WhatsApp, Analytics, and custom forms.",
    techStack: "We use the latest modern tech stack including React, Next.js, TypeScript, Tailwind CSS, and Node.js to ensure your website is fast, secure, and scalable.",
    seo: "All our websites are built with SEO best practices in mind, including semantic HTML, meta tags, fast load times, and mobile optimization to help you rank higher.",
    hosting: "We can assist you with choosing the right hosting provider and setting up your domain. We recommend reliable providers like Vercel, Netlify, or AWS.",
    usp: "We combine premium luxury design with cutting-edge technology. We don't just build websites; we build digital experiences that convert visitors into clients.",
    portfolio: "You can view our latest work in the 'Work' section of this website. We have experience across various industries including e-commerce, corporate, and creative portfolios.",
    fallback: "I'm not 100% sure about that specific detail. However, I can tell you about our Services, Pricing, Process, or Tech Stack. Or would you like to start a custom quote?",
};

const INITIAL_MESSAGE: Message = {
    id: "init-1",
    text: "Welcome to Devansh Digital Studio 👋 Looking to build a powerful website for your business?",
    sender: "bot",
    timestamp: new Date(),
};

const QUICK_REPLIES = [
    "Services",
    "Pricing",
    "Process",
    "Tech Stack",
    "Get a Quote",
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-greeting
    useEffect(() => {
        const timer = setTimeout(() => {
            if (messages.length === 0) {
                setMessages([INITIAL_MESSAGE]);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [messages.length]);

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const scrollToContactForm = () => {
        setIsOpen(false);
        window.location.href = "/contact";
    };

    const addBotMessage = (text: string, hasLink?: boolean) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text,
                sender: "bot",
                timestamp: new Date(),
                isLeadForm: hasLink,
            }]);
            setIsTyping(false);
        }, 800 + Math.random() * 400);
    };

    const handleSendMessage = (text: string = inputValue) => {
        if (!text.trim()) return;

        // Add User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: "user",
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Keyword Matching
        const lowerText = text.toLowerCase();

        // Intent Recognition
        const intents: { keywords: string[]; response: string; hasLink?: boolean }[] = [
            { keywords: ["quote", "consultation", "hire", "interested", "start project"], response: "We'd love to help! Click below to fill out our quick contact form and we'll get back to you with a personalized plan.", hasLink: true },
            { keywords: ["yes", "sure", "okay", "ok", "yeah", "yep", "yup", "ya", "yea", "absolutely", "definitely", "of course", "let's go", "go ahead", "please", "do it", "sounds good", "i want", "i need", "i'm interested", "let's do it", "count me in"], response: "Great! Click below to reach our Get in Touch form — our team will connect with you shortly.", hasLink: true },
            { keywords: ["service", "offer", "do you do", "build", "what can you"], response: KNOWLEDGE_BASE.services + "\n\nWould you like a custom quote for any of these?" },
            { keywords: ["process", "steps", "how it works", "how do you"], response: KNOWLEDGE_BASE.process },
            { keywords: ["time", "long", "duration", "days", "weeks", "deadline"], response: KNOWLEDGE_BASE.timeline },
            { keywords: ["price", "cost", "rates", "budget", "money", "charge", "fee", "how much", "affordable", "expensive", "cheap"], response: KNOWLEDGE_BASE.pricing + "\n\nShall I redirect you to our contact form?", hasLink: true },
            { keywords: ["support", "warranty", "after launch", "post launch", "bug"], response: KNOWLEDGE_BASE.support },
            { keywords: ["maintain", "update", "security", "backup", "patch"], response: KNOWLEDGE_BASE.maintenance },
            { keywords: ["tech", "react", "node", "next", "stack", "language", "code", "framework", "wordpress", "html", "javascript", "typescript"], response: KNOWLEDGE_BASE.techStack },
            { keywords: ["seo", "rank", "google", "search engine", "keyword", "traffic", "visibility"], response: KNOWLEDGE_BASE.seo },
            { keywords: ["host", "server", "domain", "deploy", "live", "publish", "launch", "ssl", "https"], response: KNOWLEDGE_BASE.hosting },
            { keywords: ["why", "usp", "special", "better", "choose", "different", "unique", "advantage"], response: KNOWLEDGE_BASE.usp },
            { keywords: ["work", "portfolio", "example", "case study", "previous", "sample", "demo", "show"], response: KNOWLEDGE_BASE.portfolio },
            { keywords: ["mobile", "responsive", "phone", "tablet", "device", "screen", "adaptive"], response: KNOWLEDGE_BASE.technical },
            { keywords: ["contact", "email", "whatsapp", "call", "reach", "connect", "talk", "form", "touch"], response: "You can reach us directly through our Get in Touch form below!", hasLink: true },
            { keywords: ["ecommerce", "e-commerce", "shop", "store", "product", "sell", "payment", "cart"], response: "We build complete e-commerce solutions with product management, payment gateway integration, and inventory systems. Want us to create one for you?", hasLink: true },
            { keywords: ["landing", "page", "single page", "one page"], response: "We design high-converting landing pages optimized for lead generation and brand awareness. Interested in getting one built?" },
            { keywords: ["redesign", "revamp", "improve", "upgrade", "redo", "makeover"], response: "We specialize in website redesigns that boost performance and modernize your brand's digital presence. Would you like to discuss yours?" },
            { keywords: ["payment", "pay", "method", "upi", "card", "gpay", "paytm"], response: "We accept various payment methods. Payment terms are discussed during consultation. Would you like to get in touch with our team?", hasLink: true },
            { keywords: ["guarantee", "refund", "revision", "change"], response: "We offer revision rounds during the development process and 1 month of free post-launch support to ensure you're 100% satisfied." },
            { keywords: ["hello", "hi", "hey", "greeting", "good morning", "good evening", "good afternoon"], response: "Hello! 👋 How can I assist you today? Feel free to ask about our services, pricing, or tech stack." },
            { keywords: ["thank", "thanks", "appreciate", "great", "awesome", "perfect", "nice", "cool", "good"], response: "You're welcome! 😊 Is there anything else I can help you with?" },
            { keywords: ["bye", "goodbye", "see you", "later", "done"], response: "Thanks for chatting! Feel free to reach out anytime. Have a great day! 🙌" },
            { keywords: ["no", "nope", "nah", "not now", "not interested", "no thanks", "no thank", "maybe later", "not yet", "don't want", "pass", "skip", "never mind", "nevermind"], response: "No worries at all! If you ever change your mind, we're just a click away. Feel free to reach out anytime.", hasLink: true },
        ];

        let responseText = KNOWLEDGE_BASE.fallback;
        let hasLink = false;

        for (const intent of intents) {
            if (intent.keywords.some(k => lowerText.includes(k))) {
                responseText = intent.response;
                hasLink = intent.hasLink || false;
                break;
            }
        }

        addBotMessage(responseText, hasLink);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") handleSendMessage();
    };

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[550px] max-h-[70vh] bg-card border border-gold/30 rounded-2xl shadow-2xl overflow-hidden z-[9999] flex flex-col glow-gold"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-4 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                                    <Bot className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">Studio Assistant</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white/70 hover:text-white hover:bg-white/10">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4 bg-neutral-950/50">
                            <div className="flex flex-col gap-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex w-fit max-w-[85%] break-words flex-col gap-1 px-4 py-3 text-sm rounded-2xl shadow-sm",
                                            msg.sender === "user"
                                                ? "self-end bg-gold text-neutral-900 rounded-br-none font-medium ml-auto"
                                                : "self-start bg-neutral-800 text-white rounded-bl-none border border-white/5"
                                        )}
                                    >
                                        {msg.text}
                                        {msg.isLeadForm && (
                                            <div className="mt-2 flex gap-2 w-full">
                                                <button
                                                    onClick={scrollToContactForm}
                                                    className="flex-1 px-3 py-2 rounded-xl bg-gold text-neutral-900 font-semibold text-xs hover:bg-gold-light transition-colors duration-200 flex items-center justify-center gap-1.5"
                                                >
                                                    📩 Contact Form
                                                </button>
                                                <button
                                                    onClick={() => window.open('https://wa.me/918506000070', '_blank')}
                                                    className="flex-1 px-3 py-2 rounded-xl bg-green-600 text-white font-semibold text-xs hover:bg-green-500 transition-colors duration-200 flex items-center justify-center gap-1.5"
                                                >
                                                    💬 WhatsApp Us
                                                </button>
                                            </div>
                                        )}
                                        <span className={cn("text-[10px] opacity-50", msg.sender === "user" ? "text-neutral-900" : "text-gray-400")}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="self-start bg-neutral-800 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" />
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>

                        {/* Quick Replies */}
                        {(
                            <div className="px-4 py-2 bg-neutral-900 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
                                {QUICK_REPLIES.map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => handleSendMessage(reply)}
                                        className="whitespace-nowrap px-3 py-1.5 rounded-full bg-neutral-800 border border-white/10 text-xs text-gold hover:bg-gold hover:text-neutral-900 transition-colors duration-200"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 bg-neutral-900 border-t border-white/10">
                            <div className="flex gap-2">
                                <Input
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything..."
                                    className="bg-neutral-800 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-gold/50 focus-visible:border-gold/50"
                                    disabled={isTyping}
                                />
                                <Button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputValue.trim() || isTyping}
                                    size="icon"
                                    className="bg-gold hover:bg-gold-light text-neutral-900"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    onClick={toggleChat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gold text-neutral-900 shadow-lg glow-gold z-[9999] flex items-center justify-center cursor-pointer group"
                >
                    <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
                    <MessageSquare className="w-7 h-7 fill-neutral-900/20" />
                </motion.button>
            )}
        </>
    );
};

export default Chatbot;
