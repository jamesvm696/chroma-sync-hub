import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PlatformCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  onClick: () => void;
}

export const PlatformCard = ({ name, icon, color, description, onClick }: PlatformCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 flex flex-col items-center text-center space-y-4">
        {/* Platform Icon */}
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110",
          color
        )}>
          {icon}
        </div>

        {/* Platform Name */}
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Connect Button */}
        <Button 
          onClick={onClick}
          className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          variant="secondary"
        >
          Connect Platform
        </Button>
      </div>
    </Card>
  );
};