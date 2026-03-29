import { Link } from "react-router-dom";
import { Code, Sparkles, Download, ArrowRight } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import logo from "@/assets/sylix-logo.png";

const features = [
  { icon: Code, title: "Open Source", desc: "All scripts are free and open source. Modify and share freely." },
  { icon: Sparkles, title: "Premium Quality", desc: "Carefully crafted Lua scripts with clean, optimized code." },
  { icon: Download, title: "Instant Access", desc: "Browse, copy, and use scripts immediately. No sign-up needed." },
];

const Index = () => (
  <PageWrapper>
    {/* Hero */}
    <section className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <img
        src={logo}
        alt="Sylix Logo"
        className="w-24 h-24 mb-8 animate-float"
        width={512}
        height={512}
      />
      <h1 className="font-display text-5xl md:text-7xl font-black tracking-wider mb-4 glow-text animate-fade-in text-foreground">
        SYLIX
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 opacity-0 animate-fade-in-delay">
        Free & open-source Lua scripts. Built by the community, for the community.
      </p>
      <div className="flex gap-4 opacity-0 animate-fade-in-delay" style={{ animationDelay: "0.4s" }}>
        <Link
          to="/scripts"
          className="btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display text-sm font-semibold tracking-wider transition-all"
        >
          Browse Scripts <ArrowRight size={16} />
        </Link>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 border border-border/50 text-foreground px-6 py-3 rounded-lg font-display text-sm font-semibold tracking-wider hover:bg-secondary/50 transition-all"
        >
          Learn More
        </Link>
      </div>
    </section>

    {/* Features */}
    <section className="container mx-auto px-4 pb-24">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass-card hover-3d p-8 opacity-0 animate-slide-up"
            style={{ animationDelay: `${0.2 + i * 0.15}s`, animationFillMode: "forwards" }}
          >
            <f.icon className="text-primary mb-4" size={32} />
            <h3 className="font-display text-lg font-bold mb-2 text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </PageWrapper>
);

export default Index;
