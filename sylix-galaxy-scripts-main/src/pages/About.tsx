import { Shield, Users, Heart, Zap } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";

const values = [
  { icon: Shield, title: "Open Source", desc: "Every script is open and transparent. No hidden code, no backdoors." },
  { icon: Users, title: "Community Driven", desc: "Built by passionate developers who believe in sharing knowledge." },
  { icon: Heart, title: "Always Free", desc: "Sylix scripts will always be free. No paywalls, no premium tiers." },
  { icon: Zap, title: "Quality First", desc: "Every script is reviewed for performance, safety, and reliability." },
];

const About = () => (
  <PageWrapper>
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-black tracking-wider mb-6 glow-text animate-fade-in text-foreground">
          About Sylix
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed opacity-0 animate-fade-in-delay">
          Sylix is a community-driven platform dedicated to providing high-quality, free Lua scripts.
          We believe powerful tools should be accessible to everyone — no exceptions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {values.map((v, i) => (
          <div
            key={v.title}
            className="glass-card hover-3d p-8 opacity-0 animate-slide-up"
            style={{ animationDelay: `${0.2 + i * 0.15}s`, animationFillMode: "forwards" }}
          >
            <v.icon className="text-accent mb-4" size={28} />
            <h3 className="font-display text-base font-bold mb-2 text-foreground">{v.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card max-w-3xl mx-auto mt-16 p-10 text-center neon-border opacity-0 animate-fade-in-delay" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
        <h2 className="font-display text-xl font-bold mb-4 text-foreground">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          To build the largest collection of free, open-source Lua scripts — empowering
          developers and creators worldwide with tools that are secure, performant, and community-vetted.
        </p>
      </div>
    </section>
  </PageWrapper>
);

export default About;
