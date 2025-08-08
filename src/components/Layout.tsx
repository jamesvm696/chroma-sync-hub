import { ReactNode } from 'react';
import grapheneBg from '@/assets/graphene-bg.jpg';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div 
      className="min-h-screen bg-background bg-gradient-mesh relative"
      style={{
        backgroundImage: `url(${grapheneBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/30 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Commerce Hub
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};