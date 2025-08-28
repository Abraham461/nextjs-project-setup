'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { faqData } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function SupportPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', message: string}>>([]);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    const newHistory = [...chatHistory, { type: 'user' as const, message: chatMessage }];
    
    // Simple bot responses
    let botResponse = "Thank you for your message. Our customer service team will get back to you shortly.";
    
    const lowerMessage = chatMessage.toLowerCase();
    if (lowerMessage.includes('claim')) {
      botResponse = "For claim-related inquiries, you can check your claim status in the Claims section of your dashboard or call our claims hotline at 1-800-CLAIMS.";
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('premium')) {
      botResponse = "For payment assistance, visit the Payment section in your dashboard or contact our billing department at 1-800-BILLING.";
    } else if (lowerMessage.includes('policy')) {
      botResponse = "Policy information can be found in your Dashboard. For policy changes, please contact your agent or call 1-800-POLICY.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      botResponse = `Hello ${user?.name || 'there'}! How can I help you today? You can ask about claims, payments, policies, or general questions.`;
    }

    setChatHistory([...newHistory, { type: 'bot', message: botResponse }]);
    setChatMessage('');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitSuccess(true);
    setContactForm({ subject: '', message: '', priority: 'medium' });
    setIsSubmitting(false);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Support</h1>
              <p className="text-gray-600">Get help and find answers to your questions</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information & Quick Actions */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Customer Service</h4>
                      <p className="text-sm text-gray-600">1-800-SECURE (1-800-732-8731)</p>
                      <p className="text-sm text-gray-600">Mon-Fri: 8AM-8PM EST</p>
                      <p className="text-sm text-gray-600">Sat: 9AM-5PM EST</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">Claims Hotline</h4>
                      <p className="text-sm text-gray-600">1-800-CLAIMS (1-800-252-4671)</p>
                      <p className="text-sm text-gray-600">24/7 Emergency Claims</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Support</h4>
                      <p className="text-sm text-gray-600">support@secureinsure.com</p>
                      <p className="text-sm text-gray-600">Response within 24 hours</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">Billing Department</h4>
                      <p className="text-sm text-gray-600">1-800-BILLING (1-800-245-5464)</p>
                      <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Office Locations</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <strong>Headquarters:</strong><br />
                      123 Insurance Plaza, Suite 100<br />
                      New York, NY 10001
                    </div>
                    <div>
                      <strong>Regional Office:</strong><br />
                      456 Main Street, Floor 5<br />
                      Chicago, IL 60601
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and helpful links
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/claims">
                    <Button variant="outline" className="w-full justify-start">
                      File a New Claim
                    </Button>
                  </Link>
                  <Link href="/payment">
                    <Button variant="outline" className="w-full justify-start">
                      Make a Payment
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full justify-start">
                      View Policy Details
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start" onClick={() => window.open('mailto:support@secureinsure.com')}>
                    Email Customer Service
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a detailed message
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {submitSuccess && (
                  <Alert className="mb-4 border-green-200 bg-green-50">
                    <AlertDescription className="text-green-800">
                      Your message has been sent successfully! We'll get back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      name="priority"
                      value={contactForm.priority}
                      onChange={handleContactChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Please provide detailed information about your inquiry..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ and Chat */}
          <div className="space-y-6">
            {/* Simple Chat */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help Chat</CardTitle>
                <CardDescription>
                  Get instant answers to common questions
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Chat History */}
                  <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-3">
                    {chatHistory.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <p>Hello! I'm here to help you with quick questions.</p>
                        <p className="text-sm">Try asking about claims, payments, or policies.</p>
                      </div>
                    ) : (
                      chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            chat.type === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-gray-800 border'
                          }`}>
                            {chat.message}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Chat Input */}
                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your question here..."
                      className="flex-1"
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to the most common questions
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
