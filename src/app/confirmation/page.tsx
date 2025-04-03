'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function ConfirmationPage() {
  const { clearCart } = useCartStore();
  
  // Clear the cart when the confirmation page loads
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  // Generate a random order number
  const orderNumber = `TD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <main className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. We&apos;ve received your order and it&apos;s being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left inline-block mx-auto">
            <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                <p className="font-medium">{orderNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Estimated Delivery</h3>
                <p className="font-medium">
                  {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to your email address with all the details of your order.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-md transition-colors font-medium text-center"
            >
              Continue Shopping
            </Link>
            
            <Link
              href="/account/orders"
              className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors font-medium text-center"
            >
              View Order Details
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold mb-4">What happens next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600">
                Our team will verify and prepare your items for shipment
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Packaging & Shipping</h3>
              <p className="text-sm text-gray-600">
                Items are carefully packed and shipped with tracking
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">
                Enjoy your new treasures from Transilk!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
