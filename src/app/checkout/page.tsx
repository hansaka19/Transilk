'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, initializeStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isClient, setIsClient] = useState(false);
  
  // Initialize the cart store on client-side
  useEffect(() => {
    initializeStore();
    setIsClient(true);
  }, []);
  
  // If not yet rendered on client, show loading state
  if (!isClient) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  // Form steps
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  return (
    <main className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-3">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>
        
        {/* Checkout Progress */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200"></div>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gold-primary" 
              style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}>
            </div>
            
            {/* Step 1: Information */}
            <div className={`relative z-10 flex flex-col items-center ${
              step >= 1 ? 'text-gold-primary' : 'text-gray-400'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                step >= 1 ? 'bg-gold-primary' : 'bg-gray-300'
              }`}>
                <span className="text-sm font-bold">1</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">Information</span>
            </div>
            
            {/* Step 2: Payment */}
            <div className={`relative z-10 flex flex-col items-center ${
              step >= 2 ? 'text-gold-primary' : 'text-gray-400'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                step >= 2 ? 'bg-gold-primary' : 'bg-gray-300'
              }`}>
                <span className="text-sm font-bold">2</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">Payment</span>
            </div>
            
            {/* Step 3: Review */}
            <div className={`relative z-10 flex flex-col items-center ${
              step >= 3 ? 'text-gold-primary' : 'text-gray-400'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                step >= 3 ? 'bg-gold-primary' : 'bg-gray-300'
              }`}>
                <span className="text-sm font-bold">3</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">Review & Confirm</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {step === 1 && <CustomerInfoForm onNext={nextStep} />}
              {step === 2 && <PaymentForm 
                paymentMethod={paymentMethod} 
                setPaymentMethod={setPaymentMethod} 
                onNext={nextStep} 
                onBack={prevStep} 
              />}
              {step === 3 && <ReviewForm onBack={prevStep} />}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}

const CustomerInfoForm = ({ onNext }: { onNext: () => void }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Contact & Shipping Information</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
            required
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="LK">Sri Lanka</option>
                  {/* Additional countries would go here */}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Link
            href="/cart"
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to cart
          </Link>
          
          <button
            type="submit"
            className="px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-md transition-colors font-medium"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

const PaymentForm = ({ 
  paymentMethod, 
  setPaymentMethod, 
  onNext, 
  onBack 
}: { 
  paymentMethod: string; 
  setPaymentMethod: (method: string) => void; 
  onNext: () => void; 
  onBack: () => void;
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Payment Method</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg border-gray-300 cursor-pointer hover:border-gold-primary transition-colors">
              <input
                type="radio"
                id="credit-card"
                name="payment-method"
                value="credit-card"
                checked={paymentMethod === 'credit-card'}
                onChange={() => setPaymentMethod('credit-card')}
                className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300"
              />
              <label htmlFor="credit-card" className="flex items-center cursor-pointer">
                <span className="text-gray-700 font-medium mr-3">Credit Card</span>
                <div className="flex space-x-2">
                  <div className="h-8 w-12 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-[10px] text-gray-600">VISA</span>
                  </div>
                  <div className="h-8 w-12 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-[10px] text-gray-600">MC</span>
                  </div>
                  <div className="h-8 w-12 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-[10px] text-gray-600">AMEX</span>
                  </div>
                </div>
              </label>
            </div>
            
            {paymentMethod === 'credit-card' && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Security Code
                      </label>
                      <input
                        type="text"
                        id="securityCode"
                        placeholder="CVC"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg border-gray-300 cursor-pointer hover:border-gold-primary transition-colors">
              <input
                type="radio"
                id="paypal"
                name="payment-method"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300"
              />
              <label htmlFor="paypal" className="flex items-center cursor-pointer">
                <span className="text-gray-700 font-medium mr-3">PayPal</span>
                <div className="h-8 w-16 rounded bg-gray-100 flex items-center justify-center">
                  <span className="text-[10px] text-gray-600">PAYPAL</span>
                </div>
              </label>
            </div>
            
            {paymentMethod === 'paypal' && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">
                  After clicking &quot;Complete Order&quot;, you will be redirected to PayPal to complete your purchase securely.
                </p>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg border-gray-300 cursor-pointer hover:border-gold-primary transition-colors">
              <input
                type="radio"
                id="bank-transfer"
                name="payment-method"
                value="bank-transfer"
                checked={paymentMethod === 'bank-transfer'}
                onChange={() => setPaymentMethod('bank-transfer')}
                className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300"
              />
              <label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                <span className="text-gray-700 font-medium">Wire Transfer</span>
              </label>
            </div>
            
            {paymentMethod === 'bank-transfer' && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-4">
                  After placing your order, we will send you our bank details via email. Your order will be processed once payment is received.
                </p>
                <p className="text-xs text-gray-500">
                  Note: Wire transfers typically take 2-3 business days to process.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Information
          </button>
          
          <button
            type="submit"
            className="px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-md transition-colors font-medium"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewForm = ({ onBack }: { onBack: () => void }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Contact Information</h3>
          <p className="text-gray-600">john.doe@example.com</p>
          <p className="text-gray-600">+1 (555) 123-4567</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
          <p className="text-gray-600">
            John Doe<br />
            123 Main Street<br />
            Anytown, CA 12345<br />
            United States
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Payment Method</h3>
          <div className="flex items-center">
            <span className="text-gray-600">Visa ending in 4242</span>
            <span className="ml-auto text-green-600 text-sm font-medium">Secure</span>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the <Link href="/terms" className="text-gold-primary hover:text-gold-dark">Terms of Service</Link> and <Link href="/privacy" className="text-gold-primary hover:text-gold-dark">Privacy Policy</Link>. I confirm that all items in my order are accurate.
            </span>
          </label>
        </div>
        
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Payment
          </button>
          
          <button
            type="button"
            onClick={() => window.location.href = '/confirmation'}
            className="px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-md transition-colors font-medium"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = () => {
  const { cartItems, getCartTotal } = useCartStore();
  
  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = 25.00;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
      
      <div className="mb-6 max-h-[300px] overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="w-16 h-16 bg-gray-100 rounded-md relative overflow-hidden flex-shrink-0">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
              <span className="absolute top-0 right-0 bg-gray-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl-md">
                {item.quantity}
              </span>
            </div>
            
            <div className="ml-4 flex-grow">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.category}</p>
            </div>
            
            <div className="text-right font-medium">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Tax (estimated)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-xl text-gold-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <span className="text-xs text-gray-500 mr-2">Secure Checkout:</span>
          <div className="flex space-x-2">
            <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-[8px] text-gray-600">VISA</span>
            </div>
            <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-[8px] text-gray-600">MC</span>
            </div>
            <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-[8px] text-gray-600">AMEX</span>
            </div>
            <div className="h-6 w-10 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-[8px] text-gray-600">PAYPAL</span>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mb-4">
          All transactions are secure and encrypted. Your personal information is never shared with third parties.
        </p>
        
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 text-green-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Your information is protected by 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
};
