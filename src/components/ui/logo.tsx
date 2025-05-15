
import Link from 'next/link';
import { Flame } from 'lucide-react'; // Playful icon for the logo

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <Flame className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
      <span className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors">
        Vibe<span className="text-primary group-hover:text-accent transition-colors">Vault</span>
      </span>
    </Link>
  );
};

export default Logo;
