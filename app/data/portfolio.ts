export const portfolioData = {
    githubUsername: "uzairphalgroo",
    personal: {
        name: "Shah Uzair Phalgroo",
        role: "Cybersecurity/Networking | Web Developer/Designing | A.I | Fintech",
        about: "Engineering student and Polymath driven by the convergence of Cybersecurity, Modern Web Development, Artificial Intelligence, and Fintech. I build secure, intelligent systems that solve real-world problems.",
        email: "ushah3887@gmail.com",
    },
    // Manual mapping for projects to add images/colors that GitHub doesn't have
    projectCategories: [
        {
            title: "Cybersecurity & Network",
            description: "Advanced network security assessments, penetration testing, and infrastructure hardening.",
            image: "/projects/network-security.png", // Ensure you have this or a relevant image
            link: "https://github.com/uzairphalgroo/cybersecurity-network",
            color: "from-red-600 to-rose-900"
        },
        {
            title: "Web Development & Design",
            description: "Modern, responsive web applications built with Next.js, React, and Tailwind CSS.",
            image: "/projects/result-management.png",
            link: "https://github.com/uzairphalgroo/web-development",
            color: "from-blue-600 to-cyan-800"
        },
        {
            title: "Artificial Intelligence",
            description: "AI/ML models, RAG applications, and intelligent automation systems.",
            image: "/projects/ai-rag.png",
            link: "https://github.com/uzairphalgroo/ai",
            color: "from-purple-600 to-indigo-900"
        },
        {
            title: "Finance & Fintech",
            description: "Financial analysis tools, algorithmic trading scripts, and banking solutions.",
            image: "/projects/finance.png", // Need to ensure this exists or use fallback
            link: "https://github.com/uzairphalgroo/finance",
            color: "from-emerald-600 to-green-900"
        }
    ],
    certifications: [
        {
            title: "McKinsey Forward Program",
            issuer: "McKinsey & Company",
            year: "2026",
            link: "https://www.mckinsey.com/capabilities/mckinsey-academy/forward",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/McKinsey_%26_Company_Mark.svg/1200px-McKinsey_%26_Company_Mark.svg.png"
        },
        {
            title: "CompTIA Security+",
            issuer: "CompTIA",
            year: "2024",
            link: "https://www.comptia.org/certifications/security",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/CompTIA_Security%2B_Logo.svg/1200px-CompTIA_Security%2B_Logo.svg.png"
        },
        {
            title: "Certified Ethical Hacker (CEH)",
            issuer: "EC-Council",
            year: "2024",
            link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/EC-Council_logo.png"
        },
        {
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            year: "2025",
            link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
        }
    ]
};
