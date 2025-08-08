import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MoreVertical, 
  Package, 
  TrendingUp, 
  DollarSign,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock product data
const generateMockProducts = (platform: string) => {
  const baseProducts = [
    { name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, stock: 45, sku: 'WBH-001' },
    { name: 'Organic Cotton T-Shirt', category: 'Clothing', price: 24.99, stock: 128, sku: 'OCT-002' },
    { name: 'Stainless Steel Water Bottle', category: 'Home & Garden', price: 19.99, stock: 67, sku: 'SWB-003' },
    { name: 'Yoga Mat Premium', category: 'Sports', price: 49.99, stock: 23, sku: 'YMP-004' },
    { name: 'Coffee Grinder Electric', category: 'Kitchen', price: 89.99, stock: 15, sku: 'CGE-005' },
    { name: 'LED Desk Lamp', category: 'Office', price: 34.99, stock: 89, sku: 'LDL-006' },
  ];

  return baseProducts.map((product, index) => ({
    ...product,
    id: `${platform}-${index}`,
    status: Math.random() > 0.8 ? 'out-of-stock' : Math.random() > 0.6 ? 'low-stock' : 'in-stock',
    lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));
};

export const ProductListings = () => {
  const { platformId } = useParams<{ platformId: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const platformNames: Record<string, string> = {
    amazon: 'Amazon',
    shopify: 'Shopify',
    ebay: 'eBay',
    etsy: 'Etsy',
    facebook: 'Facebook Shop',
    google: 'Google Shopping'
  };

  useEffect(() => {
    // Check if API key exists
    const apiKey = localStorage.getItem(`${platformId}_api_key`);
    if (!apiKey) {
      navigate('/');
      return;
    }

    // Simulate API loading
    setTimeout(() => {
      setProducts(generateMockProducts(platformId || ''));
      setLoading(false);
    }, 1000);
  }, [platformId, navigate]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'low-stock': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'out-of-stock': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockItems = products.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length;

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="border-border/50 hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {platformNames[platformId || '']} Products
            </h1>
            <p className="text-muted-foreground">
              Manage your {platformNames[platformId || '']} inventory and listings
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <p className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Alert</p>
              <p className="text-2xl font-bold text-foreground">{lowStockItems}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="text-2xl font-bold text-foreground">{products.filter(p => p.status === 'in-stock').length}</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products by name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
          />
        </div>
        <Button variant="outline" className="border-border/50 hover:bg-secondary">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover border-border/50">
                  <DropdownMenuItem>Edit Product</DropdownMenuItem>
                  <DropdownMenuItem>View Analytics</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">SKU:</span>
                <span className="text-sm font-mono text-foreground">{product.sku}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="text-lg font-bold text-primary">${product.price}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Stock:</span>
                <span className="text-sm font-semibold text-foreground">{product.stock} units</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(product.status)}>
                  {product.status.replace('-', ' ')}
                </Badge>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground">Updated: {product.lastUpdated}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms.' : 'Start by adding your first product.'}
          </p>
        </div>
      )}
    </div>
  );
};