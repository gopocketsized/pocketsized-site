import { Users, Code2, Handshake, Layers, ShieldCheck, MessageCircleHeart } from 'lucide-react';

const services = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "Customer Success Strategy",
    category: "CX",
    desc: "Build a scalable customer success foundation through lifecycle planning, onboarding strategies, customer journey mapping, health scoring, and long-term retention planning."
  },
  {
    icon: <MessageCircleHeart className="w-5 h-5" />,
    title: "Customer Experience & Growth",
    category: "CX",
    desc: "Strengthen customer relationships with product adoption strategies, launch planning, engagement initiatives and expansion opportunities that increase retention and growth."
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Operations & Enablement",
    category: "CX",
    desc: "Create repeatable systems with CRM implementation support, playbooks, meeting frameworks, onboarding materials, QBR decks, and standardized documentation that empowers your team."
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Strategic Partnership",
    category: "BIZ",
    desc: "Collaborate through brainstorming sessions, cross-functional planning, alignment workshops, and customer-focused strategy to turn ideas into actionable, sustainable solutions."
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Frontend Development",
    category: "DEV",
    desc: "Build modular, accessible, and high-performance user interfaces using modern JavaScript frameworks, responsive styling systems, and scalable component architectures."
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "QA Engineering",
    category: "DEV",
    desc: "Execute end-to-end browser automation, structured bug tracking, and automated CI/CD pipeline tests across your existing testing stack and support tools."
  }
];

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-[#b0c7cc]/40">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-black mb-3">We bridge the gap between doing it yourself <br className="hidden sm:inline" /> and hiring a full-time team.</h2>
        <p className="text-[#455157] max-w-xl mx-auto text-sm sm:text-base">
          We believe every vision deserves thoughtful, strategic support. Our collaborative partnership is designed to help you move ideas forward through critical thinking, constructive planning, and hands-on execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="group p-6 rounded-2xl bg-white border border-[#b0c7cc]/50 hover:border-[#267EC5] transition-colors duration-200 ease-out flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#b0c7cc]/20 group-hover:bg-[#267EC5] text-[#455157] group-hover:text-white flex items-center justify-center transition-colors duration-200 ease-out">
                  {service.icon}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border bg-[#b0c7cc]/20 text-[#455157] border-[#b0c7cc]/40">
                  {service.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{service.title}</h3>
              <p className="text-sm text-[#455157] leading-relaxed">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}