import { useState } from 'react';
import { PlatformCard } from '@/components/PlatformCard';
import { ApiKeyDialog } from '@/components/ApiKeyDialog';
import { 
  ShoppingBag, 
  Store, 
  Gavel, 
  Heart, 
  Facebook, 
  Search,
  Package,
  TrendingUp
} from 'lucide-react';

const platforms = [
  {
    id: 'amazon',
    name: 'Amazon',
    icon: <Package className="w-8 h-8 text-white" />,
    color: 'bg-platform-amazon',
    description: 'Connect to Amazon Seller Central and manage your marketplace listings'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: <ShoppingBag className="w-8 h-8 text-white" />,
    color: 'bg-platform-shopify',
    description: 'Sync with your Shopify store and manage all products in one place'
  },
  {
    id: 'ebay',
    name: 'eBay',
    icon: <Gavel className="w-8 h-8 text-white" />,
    color: 'bg-platform-ebay',
    description: 'Manage your eBay auctions and Buy It Now listings seamlessly'
  },
  {
    id: 'etsy',
    name: 'Etsy',
    icon: <Heart className="w-8 h-8 text-white" />,
    color: 'bg-platform-etsy',
    description: 'Connect your Etsy shop and manage handmade product listings'
  },
  {
    id: 'facebook',
    name: 'Facebook Shop',
    icon: <Facebook className="w-8 h-8 text-white" />,
    color: 'bg-platform-facebook',
    description: 'Sync with Facebook Marketplace and Instagram Shopping'
  },
  {
    id: 'google',
    name: 'Google Shopping',
    icon: <Search className="w-8 h-8 text-white" />,
    color: 'bg-platform-google',
    description: 'Manage Google Shopping campaigns and product feeds'
  }
];

export const PlatformSelection = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handlePlatformClick = (platform: { id: string; name: string }) => {
    setSelectedPlatform(platform);
  };

  const handleDialogClose = () => {
    setSelectedPlatform(null);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Connect Your Platforms
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Centralize your e-commerce operations by connecting all your selling platforms. 
          Manage inventory, sync listings, and track performance from one unified dashboard.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-card rounded-lg p-6 border border-border/50 text-center">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">15+</div>
          <div className="text-sm text-muted-foreground">Supported Platforms</div>
        </div>
        <div className="bg-gradient-card rounded-lg p-6 border border-border/50 text-center">
          <Store className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">Real-time</div>
          <div className="text-sm text-muted-foreground">Inventory Sync</div>
        </div>
        <div className="bg-gradient-card rounded-lg p-6 border border-border/50 text-center">
          <Package className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">Unlimited</div>
          <div className="text-sm text-muted-foreground">Product Listings</div>
        </div>
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <PlatformCard
            key={platform.id}
            name={platform.name}
            icon={platform.icon}
            color={platform.color}
            description={platform.description}
            onClick={() => handlePlatformClick({ id: platform.id, name: platform.name })}
          />
        ))}
      </div>

      {/* API Key Dialog */}
      {selectedPlatform && (
        <ApiKeyDialog
          isOpen={!!selectedPlatform}
          onClose={handleDialogClose}
          platformName={selectedPlatform.name}
          platformId={selectedPlatform.id}
        />
      )}
    </div>
  );
};