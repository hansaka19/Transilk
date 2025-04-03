'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  // Initialize and hydrate the store client-side
  useEffect(() => {
    const initializeStore = async () => {
      // Hydrate the store
      useCartStore.persist.rehydrate();
      setMounted(true);
    };
    
    initializeStore();
  }, []);

  if (!mounted) {
    // Returns a placeholder with the same structure
    return <>{children}</>;
  }

  return <>{children}</>;
}
