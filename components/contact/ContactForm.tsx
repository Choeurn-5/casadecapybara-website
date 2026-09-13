"use client";

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setSubmitError('Sorry, something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#E8F5E9] p-8 md:p-12 rounded-3xl text-center shadow-sm border border-[#1B5E20]/10">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-[#2E7D32]" />
        </div>
        <h3 className="text-3xl font-bold text-[#1B5E20] mb-4">Message Received!</h3>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Thank you for reaching out to Casa de Capybara. One of our team members will get back to you shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="px-8 py-3 bg-[#1B5E20] text-white font-bold rounded-full hover:bg-[#2E7D32] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
      <div className="mb-10 text-center">
        <h3 className="text-3xl font-bold text-[#1B5E20] mb-3">Send Us a Direct Message</h3>
        <p className="text-gray-600 text-lg">For custom requests, group events, airport transfers, or general inquiries.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name *</label>
            <input 
              type="text" 
              name="name"
              id="name" 
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none"
              placeholder="Your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address *</label>
            <input 
              type="email" 
              name="email"
              id="email" 
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-sm font-bold text-gray-700">WhatsApp Number *</label>
            <input 
              type="tel" 
              name="whatsapp"
              id="whatsapp" 
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none"
              placeholder="+855 12 345 678"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="telegram" className="text-sm font-bold text-gray-700">Telegram Username</label>
            <input 
              type="text" 
              name="telegram"
              id="telegram" 
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none"
              placeholder="@username (Optional)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="enquiryType" className="text-sm font-bold text-gray-700">Type of Enquiry *</label>
            <select 
              name="enquiryType"
              id="enquiryType"
              required
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none text-gray-700"
            >
              <option value="">Please select...</option>
              <option value="Room Booking">Room Booking</option>
              <option value="Capybara Encounter">Capybara Encounter</option>
              <option value="Cafe Reservation">Cafe Reservation</option>
              <option value="Group Visit">Group Visit</option>
              <option value="Airport Transfer">Airport Transfer</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-bold text-gray-700">Preferred Date of Visit</label>
            <input 
              type="date" 
              name="date"
              id="date" 
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none text-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="adults" className="text-sm font-bold text-gray-700">Number of Adults</label>
            <input 
              type="number" 
              name="adults"
              id="adults"
              min="0"
              defaultValue="2"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="children" className="text-sm font-bold text-gray-700">Number of Children</label>
            <input 
              type="number" 
              name="children"
              id="children" 
              min="0"
              defaultValue="0"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="youngestAge" className="text-sm font-bold text-gray-700">Age of Youngest Child</label>
            <input 
              type="number" 
              name="youngestAge"
              id="youngestAge" 
              min="0"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none"
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-gray-700">Your Message *</label>
          <textarea 
            name="message"
            id="message" 
            required
            rows={5}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 transition-all outline-none resize-none"
            placeholder="How can we help you today?"
          ></textarea>
        </div>

        <div className="pt-4">
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {submitError}
            </div>
          )}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-[#E65100] text-white font-bold text-lg rounded-xl hover:bg-[#c94600] transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                Send Message <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-start gap-3 mt-6 bg-[#E8F5E9]/50 p-4 rounded-xl border border-[#1B5E20]/10">
          <AlertCircle className="w-6 h-6 text-[#2E7D32] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We respond to all enquiries within one hour during opening hours (7am–9pm). For fastest response, message us directly on Telegram or WhatsApp.
          </p>
        </div>
      </form>
    </div>
  );
}
