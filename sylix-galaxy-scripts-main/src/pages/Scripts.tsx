import { Copy, Check, Search, ExternalLink, Lock } from "lucide-react";
import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";

const DiscordIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const YouTubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const taskLinks = [
  { label: "Subscribe on YouTube", url: "https://youtube.com/@YourChannel", Icon: YouTubeIcon, color: "text-red-500" },
  { label: "Join Discord Server", url: "https://discord.gg/YourServer", Icon: DiscordIcon, color: "text-indigo-400" },
];

const scripts = [
  {
    name: "the strongest battleground",
    desc: "functions: auto farm, auto block, script tech, fix lag, more...",
    code: `-- Sylix Auto Farm v1.0\nlocal player = game.Players.LocalPlayer\nlocal character = player.Character\n\nwhile true do\n  -- farming logic\n  task.wait(0.5)\nend`,
    tags: ["update: 00/00/0000", "status: working"],
  },
  {
    name: "murder mystery 2",
    desc: "functions: aimbot, noclip, esp, teleport, auto farm coins, more...",
    code: `-- Sylix ESP v2.1\nlocal ESP = {}\nESP.Enabled = true\nESP.Color = Color3.fromRGB(130, 100, 255)\n\nfunction ESP:Create(player)\n  -- render overlay\nend`,
    tags: ["update: 00/00/0000", "status: working"],
  },
];

const ScriptCard = ({ script }: { script: typeof scripts[0] }) => {
  const [copied, setCopied] = useState(false);
  const [completedLinks, setCompletedLinks] = useState<Set<number>>(new Set());
  const [countdowns, setCountdowns] = useState<Record<number, number>>({});

  const allCompleted = completedLinks.size >= taskLinks.length;

  const handleLinkClick = (index: number) => {
    if (completedLinks.has(index) || countdowns[index] !== undefined) return;
    window.open(taskLinks[index].url, "_blank");
    setCountdowns((prev) => ({ ...prev, [index]: 30 }));

    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const remaining = (prev[index] ?? 1) - 1;
        if (remaining <= 0) {
          clearInterval(interval);
          setCompletedLinks((p) => new Set(p).add(index));
          const { [index]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [index]: remaining };
      });
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card hover-3d p-6 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-base font-bold text-foreground">{script.name}</h3>
        <div className="flex gap-1">
          {script.tags.map((t) => (
            <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4 flex-1">{script.desc}</p>

      {/* Task Links */}
      {!allCompleted && (
        <div className="mb-4 space-y-2">
          <p className="text-xs text-muted-foreground font-display tracking-wider text-center mb-2">
            Complete all steps to unlock script
          </p>
          {taskLinks.map((link, i) => {
            const isWaiting = countdowns[i] !== undefined;
            const isDone = completedLinks.has(i);
            return (
              <button
                key={i}
                onClick={() => handleLinkClick(i)}
                disabled={isDone || isWaiting}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  isDone
                    ? "bg-primary/10 border-primary/30 text-primary cursor-default"
                    : isWaiting
                    ? "bg-accent/30 border-border/30 text-muted-foreground cursor-wait"
                    : "bg-accent/50 border-border/30 text-foreground hover:bg-accent hover:border-primary/20"
                }`}
              >
                <link.Icon className={`w-5 h-5 ${link.color}`} />
                <span className="flex-1 text-left">
                  {isWaiting ? `${link.label} — wait ${countdowns[i]}s` : link.label}
                </span>
                {isDone ? (
                  <Check size={14} className="text-primary" />
                ) : isWaiting ? (
                  <div className="h-4 w-4 border-2 border-muted-foreground/40 border-t-primary rounded-full animate-spin" />
                ) : (
                  <ExternalLink size={14} className="text-muted-foreground" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Code Block */}
      <div className={`bg-background/80 rounded-lg p-4 mb-4 overflow-x-auto border border-border/30 relative ${!allCompleted ? "overflow-hidden" : ""}`}>
        <pre className={`text-xs font-mono whitespace-pre ${allCompleted ? "text-foreground/80" : "text-foreground/20 blur-sm select-none"}`}>
          {script.code}
        </pre>
        {!allCompleted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock size={20} className="text-muted-foreground" />
          </div>
        )}
      </div>

      <button
        onClick={handleCopy}
        disabled={!allCompleted}
        className="btn-glow inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-display font-semibold tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied!" : allCompleted ? "Copy Script" : "Complete Steps First"}
      </button>
    </div>
  );
};

const Scripts = () => {
  const [search, setSearch] = useState("");

  const filtered = scripts.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageWrapper>
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-wider mb-4 glow-text animate-fade-in text-foreground">
            Scripts
          </h1>
          <p className="text-muted-foreground text-lg opacity-0 animate-fade-in-delay">
            Free, open-source Lua scripts ready to use.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 opacity-0 animate-fade-in-delay" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          <div className="glass-card flex items-center gap-3 px-4 py-3">
            <Search size={18} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search scripts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filtered.map((s, i) => (
            <div
              key={s.name}
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <ScriptCard script={s} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-16 text-muted-foreground font-display tracking-wider">
              No scripts found.
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Scripts;
