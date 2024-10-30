  'use client'

  import React, { useState, useEffect, FormEvent, useRef } from 'react'
  import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
  import { ArrowRight, Code, Home,User, Wrench, Briefcase, Users, Mail,Award, Sparkles, ChevronRight, X, Zap, Globe, ExternalLink, ShoppingCart, DollarSign, PenTool,FileText,Smartphone, BarChart3,Shield, Search, Palette, Share2 } from 'lucide-react'
  import { useTypewriter, Cursor } from 'react-simple-typewriter'

  // Define the Service type
  interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
    process: string[];
  }

  export default function Component() {
    const [currentSection, setCurrentSection] = useState('home')
    const { scrollYProgress } = useScroll()
    const [contactStep, setContactStep] = useState(0)
    const [contactInfo, setContactInfo] = useState({ name: '', email: '', subject: '' })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<Service | null>(null)

    const sections = [
      { id: "home", icon: <Home /> },
      { id: "about", icon: <User /> },
      { id: "services", icon: <Wrench /> },
      { id: "projects", icon: <Briefcase /> },
      { id: "team", icon: <Users /> }, // Using Users for the team section
      { id: "contact", icon: <Mail /> },
    ];

    useEffect(() => {
      const handleScroll = () => {
        const sectionElements = sections
          .map((section) => document.getElementById(section.id))
          .filter((el): el is HTMLElement => el !== null);

        const current = sectionElements.find((sectionEl) => {
          const { top } = sectionEl.getBoundingClientRect();
          return top >= 0 && top <= window.innerHeight / 2;
        });

        setCurrentSection(current?.id || "home");
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    
    const [text] = useTypewriter({
      words: ['Hello!', 'Welcome to Devinity Softwares', 'How can we help you today?'],
      loop: 1,
    })
    

    const services: Service[] = [
      {
        icon: <Code className="w-12 h-12 text-blue-500" />,
        title: "Web Development",
        description: "Creating responsive and dynamic web applications that captivate and engage users.",
        process: [
          "Requirements gathering and analysis",
          "UI/UX design and prototyping",
          "Frontend and backend development",
          "Testing and quality assurance",
          "Deployment and maintenance"
        ]
      },
      {
        icon: <Users className="w-12 h-12 text-green-500" />,
        title: "UI/UX Design",
        description: "Crafting intuitive and visually stunning user experiences that leave a lasting impression.",
        process: [
          "User research and persona creation",
          "Information architecture",
          "Wireframing and prototyping",
          "Visual design and branding",
          "Usability testing and iteration"
        ]
      },
      {
        icon: <Briefcase className="w-12 h-12 text-purple-500" />,
        title: "Mobile App Development",
        description: "Building powerful and feature-rich mobile applications for iOS and Android platforms.",
        process: [
          "Platform-specific design",
          "Native or cross-platform development",
          "API integration",
          "Performance optimization",
          "App store submission and marketing"
        ]
      },
      {
        icon: <Search className="w-12 h-12 text-yellow-500" />,
        title: "SEO Optimization",
        description: "Boosting your online presence and improving search engine rankings for increased visibility.",
        process: [
          "Keyword research and analysis",
          "On-page optimization",
          "Content strategy development",
          "Link building and outreach",
          "Performance tracking and reporting"
        ]
      },
      {
        icon: <Palette className="w-12 h-12 text-pink-500" />,
        title: "Graphic Design",
        description: "Creating eye-catching visuals that communicate your brand's message effectively.",
        process: [
          "Brand identity development",
          "Logo design and brand guidelines",
          "Marketing collateral creation",
          "Illustration and infographics",
          "Print and digital asset design"
        ]
      },
      {
        icon: <Share2 className="w-12 h-12 text-red-500" />,
        title: "Social Media Management",
        description: "Developing and executing social media strategies to grow your online community and engagement.",
        process: [
          "Social media audit and strategy development",
          "Content calendar creation",
          "Community management and engagement",
          "Paid social advertising",
          "Analytics and reporting"
        ]
      }
    ]

    const openModal = (service: Service) => {
      setSelectedService(service)
      setIsModalOpen(true)
    }

    const closeModal = () => {
      setIsModalOpen(false)
      setSelectedService(null)
    }

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calculate the new section based on scroll position
        const newSectionIndex = Math.floor(scrollPosition / windowHeight);

        // Prevent out-of-bounds access
        if (newSectionIndex >= 0 && newSectionIndex < sections.length) {
          setCurrentSection(sections[newSectionIndex].id);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [linePosition, setLinePosition] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

    // Handle section click
    const handleSectionClick = (sectionId: string) => {
      setCurrentSection(sectionId);
      const sectionElement = document.getElementById(sectionId);
      
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });

        // Calculate new line position
        const iconElement = document.getElementById(`${sectionId}-icon`);
        if (iconElement) {
          const { left, width } = iconElement.getBoundingClientRect();
          setLinePosition({ left, width });
        }
      }
    };

    useEffect(() => {
      const initialIcon = document.getElementById("home-icon");
      if (initialIcon) {
        const { left, width } = initialIcon.getBoundingClientRect();
        setLinePosition({ left, width });
      }
    }, []);

    const letterVariants = {
      hover: {
        y: -10,
        transition: { type: 'spring', stiffness: 300, damping: 10 }
      }
    }

    const handleContactSubmit = (e: FormEvent) => {
      e.preventDefault();

      if (contactStep < 2) {
        setContactStep(contactStep + 1);
      } else {
        console.log('Form submitted:', contactInfo);
        // Here you would typically send the data to your backend
      }
    }
    
    interface Project {
      id: number
      title: string
      category: string
      image: string
      link: string
      content: string
      icon: React.ReactNode
    }
    
    const projectsData: Project[] = [
      {
          id: 1,
          title: "Electronics E-commerce Website",
          category: "Web Development",
          image: "images/1.png",
          link: "https://iqbalandsons.pk",
          content: "A fully responsive e-commerce platform for electronics, featuring a seamless shopping experience, payment integration, and advanced search filters.",
          icon: <Globe className="h-6 w-6" />
      },
      {
          id: 2,
          title: "Food Donation App",
          category: "Web Development",
          image: "/images/2.png",
          link: "https://example.com/food-donation",
          content: "A user-friendly app that connects donors and NGOs for food distribution, providing tracking, notifications, and donation history.",
          icon: <Smartphone className="h-6 w-6" />
      },     {
          id: 3,
          title: "Admin Dashboard",
          category: "Web Development",
          image: "/images/7.png",
          link: "https://example.com/admin-dashboard",
          content: "A real-time analytics dashboard displaying key performance indicators and trends for finance management.",
          icon: <BarChart3 className="h-6 w-6" />
      },
      {
          id: 4,
          title: "ChadGPT with Gemini",
          category: "Web Development",
          image: "/images/6.png",
          link: "https://example.com/social-app",
          content: "An AI-powered social media platform emphasizing user privacy and interaction, with language processing and predictive text features.",
          icon: <Globe className="h-6 w-6" />
      },
      {
          id: 5,
          title: "GYM PULSE Social Media Management",
          category: "SEO & Marketing",
          image: "/images/5.png",
          link: "https://example.com/gym-pulse",
          content: "A comprehensive digital marketing tool with content scheduling, performance analytics, and audience engagement tracking.",
          icon: <Code className="h-6 w-6" />
      },
      {
          id: 6,
          title: "E-BOOK Management System",
          category: "UI/UX",
          image: "/images/3.png",
          link: "https://example.com/ebook-system",
          content: "An intuitive UI/UX design for a digital library system, streamlining e-book access and reader engagement.",
          icon: <Palette className="h-6 w-6" />
      },
      {
          id: 7,
          title: "SEO Strategy & Implementation for E-commerce",
          category: "SEO",
          image: "/images/7-seo-ecommerce.jpg",
          link: "https://example.com/seo-strategy",
          content: "Crafted a data-driven SEO plan, boosting visibility and organic traffic through keyword optimization, backlinking, and on-page SEO.",
          icon: <Search className="h-6 w-6" />
      },
      {
          id: 8,
          title: "Mediatyze",
          category: "UI/UX",
          image: "/images/4.png",
          link: "https://mediatyze.com",
          content: "A stylish portfolio site showcasing services, case studies, and success stories of Mediatyze Marketing Agency.",
          icon: <Briefcase className="h-6 w-6" />
      },
      {
          id: 9,
          title: "Crypto Coin Website",
          category: "Web Development",
          image: "/images/9-crypto-website.jpg",
          link: "https://example.com/crypto-coin",
          content: "An informative and sleek website presenting a new cryptocurrency, with interactive charts and investor information.",
          icon: <DollarSign className="h-6 w-6" />
      },
      {
          id: 10,
          title: "Content Writing for Tech Blog",
          category: "Content Writing",
          image: "images/10-tech-blog-writing.jpg",
          link: "https://example.com/tech-blog",
          content: "Created high-quality, SEO-optimized articles covering the latest tech trends and developments for an established tech blog.",
          icon: <PenTool className="h-6 w-6" />
      },
      {
          id: 11,
          title: "Draft White Paper Research on Blockchain Coin",
          category: "Research",
          image: "/images/11-white-paper.jpg",
          link: "https://example.com/white-paper",
          content: "Developed a comprehensive white paper draft covering technical details, market positioning, and potential use cases of a new blockchain coin.",
          icon: <FileText className="h-6 w-6" />
      },
      {
          id: 12,
          title: "Indigo Shopify Store UI/UX",
          category: "UI/UX",
          image: "/images/12-indigo-shopify.jpg",
          link: "https://example.com/indigo-shopify",
          content: "A modern, clean UI design for a Shopify store aimed at enhancing user engagement and product discovery.",
          icon: <ShoppingCart className="h-6 w-6" />
      }
  ];
  
    const categories = ["All", "Web Development", "UI/UX", "Social Media", "Content Writing", "SEO"]
    
      const [selectedCategory, setSelectedCategory] = useState("All")
    
      const filteredProjects = selectedCategory === "All"
        ? projectsData
        : projectsData.filter((project) => project.category === selectedCategory)
    

        const features = [
          { icon: <Code className="w-8 h-8" />, title: "Expert Developers", description: "Our team consists of highly skilled developers with years of experience." },
          { icon: <Users className="w-8 h-8" />, title: "Client-Centric Approach", description: "We prioritize our clients' needs and deliver tailored solutions." },
          { icon: <Zap className="w-8 h-8" />, title: "Cutting-Edge Technology", description: "We stay updated with the latest tech trends to provide innovative solutions." },
          { icon: <Globe className="w-8 h-8" />, title: "Global Reach", description: "Our services extend worldwide, catering to diverse markets and cultures." },
          { icon: <Award className="w-8 h-8" />, title: "Award-Winning Projects", description: "Our work has been recognized and awarded in the industry." },
          { icon: <Sparkles className="w-8 h-8" />, title: "Creative Solutions", description: "We bring creativity and innovation to every project we undertake." },
        ]
        



    const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const text = 'DEVINITY'
    const dotSize = 10
    const dotSpacing = 30
    const textSize = Math.min(canvas.width / 2, 340)

    ctx.font = `bold ${textSize}px Arial`
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const dots: { x: number; y: number; alpha: number }[] = []

    for (let y = 0; y < canvas.height; y += dotSpacing) {
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        const i = (y * canvas.width + x) * 4
        if (imageData.data[i] > 128) {
          dots.push({ x, y, alpha: 0 })
        }
      }
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      dots.forEach((dot, index) => {
        const flickerSpeed = 0.05
        dot.alpha = Math.sin(frame * flickerSpeed + index) * 0.5 + 0.5
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    // Create bubbles for random motion
    const bubbleContainer = document.querySelector(".mobile-bubbles");

    if (bubbleContainer) {
      for (let i = 0; i < 15; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        if (i % 2 === 0) bubble.classList.add("light");
        // Position bubbles randomly
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.top = `${Math.random() * 100}vh`;
        bubbleContainer.appendChild(bubble);
      }
    }
  }, []);

    return (
      <div className="bg-black-800 text-white min-h-screen font-sans">
        {/* Navigation */}
        <nav className="fixed top-8 left-0 right-0 z-50">
        <div className="relative flex items-center justify-center space-x-8 py-4">
          {/* Animated Progress Line */}
          <motion.div
            className="absolute bg-blue-500 h-0.5"
            initial={{ width: 0, left: linePosition.left }}
            animate={{
              width: linePosition.width,
              left: linePosition.left
            }}
            transition={{ duration: 0.5 }}
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          />

          <ul className="flex space-x-8">
            {sections.map((section) => (
              <li key={section.id} className="relative flex flex-col items-center">
                {/* Icon Indicator */}
                <motion.div
                  id={`${section.id}-icon`} // Unique ID for each icon
                  initial={{ scale: 0 }}
                  animate={{ scale: currentSection === section.id ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl ${
                    currentSection === section.id ? "text-blue-500" : "text-gray-400"
                  } cursor-pointer`}
                  onClick={() => handleSectionClick(section.id)} // Click handler
                >
                  {section.icon}
                </motion.div>

                {/* Section Link */}
                <motion.a
                  href={`#${section.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`capitalize text-sm mt-2 ${
                    currentSection === section.id ? "text-blue-500 font-semibold" : "text-gray-400"
                  } hover:text-blue-500 transition-colors`}
                  onClick={() => handleSectionClick(section.id)} // Click handler
                >
                  {section.id}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

        {/* Hero Section */}
        <section className='main ' id="home">

        <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div className="mobile-bubbles">

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 background"
        />

      </div>
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              {['Devinity', 'Softwares'].map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4"
                  style={{ perspective: '1000px' }}
                >
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block cursor-pointer"
                      variants={letterVariants}
                      whileHover="hover"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h1>
            
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <p className="text-3xl mb-4">
                Development Towards <span className="bg-blue-600 px-2 py-1 rounded">Infinity</span>.
              </p>
            
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a
                href="#projects"
                className="bg-white text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-gray-200 inline-flex items-center"
              >
                View Our Work
                <ArrowRight className="ml-2" size={20} />
              </a>
            </motion.div>
          </div>
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(circle at center, #333 0%, #000 100%)",
              opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0]),
            }}
          />
          </div>
          </section>

        {/* About Us Section */}
        <section id="about" className="min-h-screen py-20 bg-black-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">About Us</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Devinity Softwares is a cutting-edge technology company specializing in creating innovative software solutions. 
            With a team of passionate developers and designers, we strive to deliver excellence in every project we undertake.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-solid border-2 border-gray-400 rounded-lg p-6 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 text-blue-500">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black-400 border-solid border-2 border-gray-400 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(service)}
              >            
                  <div className="flex items-center justify-center mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 text-center">{service.title}</h3>  
                  <p className="text-gray-400 text-center">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Projects Section */}
        <section className="min-h-screen py-20 px-4 md:px-0 bg-black-800" id='projects'>
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-12 text-center text-white"
        >
          Our Projects
        </motion.h2>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  index === 0 || index === 3 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="relative h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 flex flex-col justify-end transition-all duration-300 hover:from-black/90">
                      <div className="flex items-center mb-2">
                        {project.icon}
                        <span className="ml-2 px-2 py-1 bg-gray-700 text-xs font-semibold text-white rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-2 md:line-clamp-3">{project.content}</p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300 group"
                        aria-label="View Project"
                      >
                        <ExternalLink className="h-5 w-5 text-white transform group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
        {/* Team Section */}
        <section id="team" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4 md:px-0">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-12 text-center"
            >
              Our Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamMember name="Alice Johnson" role="Lead Developer" image="/placeholder.svg?height=200&width=200" />
              <TeamMember name="Bob Smith" role="UI/UX Designer" image="/placeholder.svg?height=200&width=200" />
              <TeamMember name="Carol Williams" role="Project Manager" image="/placeholder.svg?height=200&width=200" />
              <TeamMember name="David Brown" role="Mobile Developer" image="/placeholder.svg?height=200&width=200" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4 md:px-0 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-8"
            >
              Get In Touch
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl mb-12 text-gray-400 font-mono"
            >
              {text}
              <Cursor cursorStyle='_' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form onSubmit={handleContactSubmit} className="max-w-md mx-auto">
                {contactStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <label className="block text-left text-gray-400 mb-2">What's your name?</label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </motion.div>
                )}
                {contactStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <label className="block text-left text-gray-400 mb-2">What's your email?</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </motion.div>
                )}
                {contactStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <label className="block text-left text-gray-400 mb-2">What's your project about?</label>
                    <textarea
                      value={contactInfo.subject}
                      onChange={(e) => setContactInfo({ ...contactInfo, subject: e.target.value })}
                      className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    ></textarea>
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-white text-black font-bold py-2 px-4 rounded transition-colors duration-300 hover:bg-gray-200"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                  type="submit"
                >
                  {contactStep < 2 ? 'Next' : 'Submit'}
                </motion.button>
              </form>
            </motion.div>
          </div>
          </section>
          {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center justify-center mb-6">{selectedService.icon}</div>
              <h3 className="text-3xl font-bold mb-4 text-center">{selectedService.title}</h3>
              <p className="text-gray-400 mb-6 text-center">{selectedService.description}</p>
              <h4 className="text-xl font-semibold mb-4">Our Process:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {selectedService.process.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 py-8">
          <div className="container mx-auto px-4 md:px-0 text-center text-gray-400">
            <p>&copy; 2023 Devinity Softwares. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="text-white mb-4">{icon}</div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </motion.div>
    )
  }

  function ProjectCard({ title, description, image }: { title: string; description: string; image: string }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </motion.div>
    )
  }

  function TeamMember({ name, role, image }: { name: string; role: string; image: string }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-400">{role}</p>
      </motion.div>
    )
  }

  function ContactFormField({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-sm font-medium text-gray-400 mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            rows={4}
          ></textarea>
        ) : (
          <input
            type={type}
            className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
        )}
      </motion.div>
    )
  }

  function SkillCard({ icon, skill }: { icon: React.ReactNode; skill: string }) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-800 p-4 rounded-lg text-center"
      >
        <div className="text-blue-400 mb-2">{icon}</div>
        <p className="text-sm font-semibold">{skill}</p>
      </motion.div>
    )
  }