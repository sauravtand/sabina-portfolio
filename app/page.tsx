"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, ExternalLink, GraduationCap, Mail, MapPin, Menu, Moon, Phone, Sun, User, X } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const sectionRefs = {
    hero: useRef<null>(null),
    about: useRef<null>(null),
    experience: useRef<null>(null),
    education: useRef<null>(null),
    skills: useRef<null>(null),
    contact: useRef<null>(null),
  };
  

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Handle intersection observer for sections
  useEffect(() => {
    setMounted(true)

    const observers:any = []
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "-20% 0px -20% 0px",
    }

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (!ref.current) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        })
      }, observerOptions)

      observer.observe(ref.current)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer:any) => observer.disconnect())
    }
  }, [])

  // Scroll to section
  const scrollToSection = (sectionId:any) => {
    setMobileMenuOpen(false)
    const section = sectionRefs[sectionId].current
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.h1
            className="text-xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sabina Maharjan
          </motion.h1>

          <nav className="hidden md:flex space-x-6">
            {Object.keys(sectionRefs).map(
              (section, index) =>
                section !== "hero" && (
                  <motion.a
                    key={section}
                    href={`#${section}`}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === section ? "text-rose-500" : "hover:text-rose-500"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section)
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.a>
                ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.div className="md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
              {Object.keys(sectionRefs).map(
                (section) =>
                  section !== "hero" && (
                    <a
                      key={section}
                      href={`#${section}`}
                      className={`text-sm font-medium py-2 ${
                        activeSection === section ? "text-rose-500" : "hover:text-rose-500"
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(section)
                      }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  ),
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section ref={sectionRefs.hero} className="py-16 md:py-24 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sabina Maharjan</h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">Office Admin</h2>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg mb-6">
              Dedicated and detail-oriented Administrative Assistant with over 3 years of experience in providing
              exceptional organizational and administrative support to diverse teams and leadership. Proficient in
              managing schedules, coordinating meetings, and maintaining accurate records while streamlining office
              operations through effective communication and multitasking skills.
            </p>

            <motion.div
              className="flex flex-wrap gap-3 mb-6 justify-center"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                "Administrative Support",
                "HR Administration",
                "Office Management",
                "Communication",
                "Problem Solving",
              ].map((skill) => (
                <motion.div key={skill} variants={itemFade}>
                  <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="https://www.linkedin.com/in/sabina-maharjan-602b20239/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-rose-600 hover:bg-rose-700"
                              >
                  Contact Me
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center gap-2 mb-8"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <User className="h-6 w-6 text-rose-500" />
            <h2 className="text-3xl font-bold">About Me</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <motion.p
                className="text-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                Adept at handling multiple responsibilities in fast-paced environments, with a strong ability to adapt
                to new tools and processes. Committed to fostering efficiency and a professional atmosphere, ensuring
                seamless operations and positive team dynamics.
              </motion.p>

              <motion.p
                className="text-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2 }}
              >
                Seeking to leverage expertise in a dynamic office environment to contribute to organizational success.
                My approach combines attention to detail with efficiency, ensuring that both organizational goals and
                team needs are met.
              </motion.p>
{/* 
              <motion.div
                className="mt-8 grid md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div className="space-y-4" variants={itemFade}>
                  <h3 className="text-xl font-semibold">Personal Details</h3>
                  <div className="space-y-3">
                    {[
                      { icon: <MapPin className="h-5 w-5 text-rose-500" />, text: "Sanepa, Lalitpur, Nepal" },
                      { icon: <Mail className="h-5 w-5 text-rose-500" />, text: "maharjansabina909@gmail.com" },
                      { icon: <Phone className="h-5 w-5 text-rose-500" />, text: "+977 9808715629" },
                      {
                        icon: <ExternalLink className="h-5 w-5 text-rose-500" />,
                        text: "LinkedIn Profile",
                        link: "https://www.linkedin.com/in/sabina-maharjan-602b20239/",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {item.icon}
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-600 hover:underline"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="space-y-4" variants={itemFade}>
                  <h3 className="text-xl font-semibold">Professional Details</h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    {[
                      { label: "Name:", value: "Sabina Maharjan" },
                      { label: "Role:", value: "Office Admin" },
                      { label: "Experience:", value: "3+ Years" },
                      { label: "Current Company:", value: "Aayulogic Pvt Ltd" },
                      { label: "Location:", value: "Chakupat, Lalitpur" },
                      { label: "Education:", value: "Bachelor's of Business Studies" },
                      { label: "Languages:", value: "Nepali, English, Hindi" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className={index % 2 === 0 ? "text-muted-foreground" : ""}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * index }}
                      >
                        {item.label === "Languages:" ? item.label : item.value}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={sectionRefs.experience} className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center gap-2 mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Briefcase className="h-6 w-6 text-rose-500" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </motion.div>

          <div className="relative border-l-2 border-rose-200 dark:border-rose-900 pl-8 ml-4 space-y-12 max-w-3xl mx-auto">
            {[
              {
                title: "Office Admin",
                period: "Dec 2024 - Present",
                company: "Aayulogic Pvt Ltd, Chakupat, Lalitpur",
                duties: [
                  "Providing comprehensive administrative support to ensure efficient office operations",
                  "Managing office communications including phone calls, emails, and visitor reception",
                  "Coordinating meetings, appointments, and maintaining executive calendars",
                  "Handling document management, filing systems, and record keeping",
                  "Supporting HR functions and administrative processes",
                  "Assisting with office logistics, supplies, and equipment maintenance",
                  "Facilitating internal and external communication between teams and departments",
                ],
              },
              {
                title: "Admin Assistant",
                period: "Oct 2021 - Dec 2024",
                company: "Luniva Tech Pvt. Ltd., Kupondole",
                duties: [
                  "Provided administrative/HR support to ensure efficient operation of the office",
                  "Answered phone calls, scheduled meetings and supported visitors",
                  "Carried out administrative duties such as filing, typing, copying, binding, scanning etc.",
                  "Assisted with day-to-day operations of the HR functions and duties",
                  "Maintained records of employees (hard and soft copies)",
                  "Provided clerical and administrative support to executives",
                  "Dealt with employee requests regarding human resources issues, rules, and regulations",
                  "Coordinated communication with candidates and scheduled interviews",
                  "Assisted with the recruitment process by identifying candidates, performing reference checks, and issuing employment contracts",
                ],
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                <motion.div
                  className="absolute -left-[41px] top-0 h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/30 border-4 border-white dark:border-slate-950 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + 0.2 * index }}
                >
                  <motion.div
                    className="h-3 w-3 rounded-full bg-rose-500"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + 0.2 * index }}
                  />
                </motion.div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <Badge variant="outline" className="font-normal">
                      {job.period}
                    </Badge>
                  </div>
                  <h4 className="text-lg text-rose-600 dark:text-rose-400 mb-4">{job.company}</h4>
                  <motion.ul
                    className="list-disc list-outside ml-5 space-y-2"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {job.duties.map((duty, dutyIndex) => (
                      <motion.li key={dutyIndex} variants={itemFade} transition={{ delay: 0.1 * dutyIndex }}>
                        {duty}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" ref={sectionRefs.education} className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center gap-2 mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <GraduationCap className="h-6 w-6 text-rose-500" />
            <h2 className="text-3xl font-bold">Education</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Bachelors of Business Studies</CardTitle>
                        <CardDescription>Padma Kanya Multiple Campus, Kathmandu</CardDescription>
                      </div>
                      <Badge variant="outline">Jul 2019 - Dec 2024</Badge>
                    </div>
                  </CardHeader>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <CardContent>
                    <h4 className="font-medium mb-3">Relevant Modules:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <motion.ul
                        className="list-disc list-inside space-y-1"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {[
                          "Manage own performance in a business environment",
                          "Work responsibilities",
                          "Events, meetings and activities",
                          "Support sustainability in a business environment",
                        ].map((module, index) => (
                          <motion.li key={index} variants={itemFade} transition={{ delay: 0.1 * index }}>
                            {module}
                          </motion.li>
                        ))}
                      </motion.ul>
                      <motion.ul
                        className="list-disc list-inside space-y-1"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {[
                          "Manage information and data",
                          "Leadership and management",
                          "Handling problems and operational issues",
                        ].map((module, index) => (
                          <motion.li key={index} variants={itemFade} transition={{ delay: 0.1 * index }}>
                            {module}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Skills & Expertise
          </motion.h2>

          <Tabs defaultValue="professional-skills" className="w-full max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="professional-skills">Professional Skills</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="professional-skills" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Communication", desc: "Written and verbal communication skills", value: 95 },
                  { title: "Problem Solving", desc: "Analytical thinking and solutions", value: 90 },
                  { title: "Client Handling", desc: "Customer service and relationship management", value: 85 },
                  { title: "Office Management", desc: "Organizing and maintaining office operations", value: 95 },
                  { title: "Microsoft Office 360", desc: "Word, Excel, PowerPoint, Outlook", value: 90 },
                  { title: "Administrative Support", desc: "Filing, documentation, and record keeping", value: 95 },
                  { title: "HR Administration", desc: "Employee records and recruitment support", value: 85 },
                  { title: "Meeting Coordination", desc: "Scheduling and organizing meetings", value: 90 },
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{skill.title}</CardTitle>
                        <CardDescription>{skill.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + 0.1 * index, ease: "easeOut" }}
                          className="h-2 bg-rose-500 rounded-full"
                          style={{ width: `${skill.value}%` }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="languages" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Nepali", desc: "Native proficiency", value: 100 },
                  { title: "English", desc: "Professional working proficiency", value: 85 },
                  { title: "Hindi", desc: "Professional working proficiency", value: 80 },
                  { title: "Newari", desc: "Professional working proficiency", value: 80 },
                ].map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{lang.title}</CardTitle>
                        <CardDescription>{lang.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + 0.1 * index, ease: "easeOut" }}
                          className="h-2 bg-rose-500 rounded-full"
                          style={{ width: `${lang.value}%` }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={sectionRefs.contact} className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Get In Touch
          </motion.h2>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Feel free to reach out for opportunities or inquiries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: <Mail className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
                      label: "Email",
                      value: "maharjansabina909@gmail.com",
                    },
                    {
                      icon: <Phone className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
                      label: "Phone",
                      value: "+977 9808715629",
                    },
                    {
                      icon: <MapPin className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
                      label: "Location",
                      value: "Sanepa, Lalitpur, Nepal",
                    },
                    {
                      icon: <ExternalLink className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
                      label: "LinkedIn",
                      value: "Sabina Maharjan",
                      link: "https://www.linkedin.com/in/sabina-maharjan-602b20239/",
                    },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                        {contact.icon}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{contact.label}</div>
                        {contact.link ? (
                          <a
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-rose-500"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <div>{contact.value}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <a
                      href="https://www.linkedin.com/in/sabina-maharjan-602b20239/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="w-full bg-rose-600 hover:bg-rose-700"
                                         >
                        Connect with Me
                      </Button>
                    </a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-50 dark:bg-slate-950 border-t">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            © {new Date().getFullYear()} Sabina Maharjan. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
