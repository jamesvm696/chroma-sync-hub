import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  platformName: string;
  platformId: string;
}

export const ApiKeyDialog = ({ isOpen, onClose, platformName, platformId }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter a valid API key to continue.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API validation
    setTimeout(() => {
      // Store the API key (in a real app, this would be securely stored)
      localStorage.setItem(`${platformId}_api_key`, apiKey);
      
      toast({
        title: 'Connection Successful',
        description: `Successfully connected to ${platformName}!`,
      });
      
      setIsLoading(false);
      onClose();
      navigate(`/products/${platformId}`);
    }, 1500);
  };

  const handleClose = () => {
    setApiKey('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">
            Connect to {platformName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your {platformName} API key to access your product listings and manage your inventory.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-sm font-medium text-foreground">
              API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-secondary/50 border-border/50 focus:border-primary"
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            Your API key is encrypted and stored securely. We never share your credentials with third parties.
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-border/50 hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConnect}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};