import Link from "next/link";
import { portfolioData } from "../data/portfolio";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 px-6 relative z-30">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-row items-center md:items-start gap-4">
                    <Logo className="w-12 h-12" />
                    <div className="text-left">
                        <h3 className="text-xl font-bold text-white mb-0.5 leading-tight">Shah Uzair Phalgroo</h3>
                        <p className="text-gray-400 text-xs">
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    <a
                        href="https://www.linkedin.com/in/shahuzairphalgroo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
                    >
                        LinkedIn
                    </a>
                    <Link
                        href="/about"
                        className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
                    >
                        About Me
                    </Link>
                    <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
                    >
                        Email
                    </a>
                    <a
                        href="/resume.pdf"
                        download
                        className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </footer>
    );
}
