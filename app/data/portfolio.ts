export const portfolioData = {
    githubUsername: "uzairphalgroo",
    personal: {
        name: "Shah Uzair Phalgroo",
        role: "Cybersecurity/Networking | Web Developer/Designing | A.I | Fintech",
        about: "Engineering student with experience in Network Engineering, Network Administration, Cybersecurity, and Web Development.",
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
            title: "mckinsey",
            issuer: "mckinsey",
            year: "2026",
            link: "https://www.credly.com", // Example link
            logo: "https://github.com/uzairphalgroo/Certifications/blob/330398aa793f92023e80cf5192acba57bc7431ec/public/images/mckinsey"
        },
        {
            title: "CompTIA Security+",
            issuer: "CompTIA",
            year: "2024",
            link: "#",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/CompTIA_Security%2B_Logo.svg/1200px-CompTIA_Security%2B_Logo.svg.png"
        },
        {
            title: "Certified Ethical Hacker (CEH)",
            issuer: "EC-Council",
            year: "2024",
            link: "#",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/EC-Council_logo.jpg"
        },
        {
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            year: "2025",
            link: "#",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
        }
    ]
};
