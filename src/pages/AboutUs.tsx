import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, Award, Users, Heart, Compass, Clock, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="py-8 px-4">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-travel-blue mb-6">
          About TravelZenith
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Crafting unforgettable travel experiences in India through 
          technology and personalized service since 2023.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <a href="/contact">Contact Us</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/destinations">Explore Destinations</a>
          </Button>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-travel-blue mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            TravelZenith was born from a simple yet powerful idea: to make travel within India 
            more accessible, personalized, and memorable for everyone. Founded by a team of 
            passionate travelers and technology enthusiasts, we set out to create an AI-powered 
            platform that truly understands the diversity and richness of Indian destinations.
          </p>
          <p className="text-gray-700 mb-4">
            Our journey began in 2023, when a group of friends realized that most travel 
            platforms were not capturing the authentic essence of Indian travel experiences. 
            We combined our expertise in technology, tourism, and local knowledge to build 
            TravelZenith – a platform that uses artificial intelligence to craft journeys 
            that resonate with your personal preferences while showcasing the true spirit of India.
          </p>
          <p className="text-gray-700">
            Today, we're proud to serve thousands of travelers, helping them discover hidden 
            gems across India and create memories that last a lifetime.
          </p>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Team collaborating" 
            className="rounded-lg shadow-xl w-full h-auto"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
            <p className="text-travel-blue font-bold">Founded in 2023</p>
            <p className="text-gray-600">Chennai, India</p>
          </div>
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="bg-gray-50 rounded-xl p-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-travel-blue mb-4">Our Mission & Values</h2>
          <p className="text-gray-700">
            We're driven by a passion to transform how people experience India through 
            thoughtfully crafted journeys powered by technology and local expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Heart className="h-6 w-6 text-travel-blue" />
                </div>
                <h3 className="font-bold text-xl mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  We showcase the true essence of each destination, moving beyond tourist clichés 
                  to offer authentic, meaningful experiences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Compass className="h-6 w-6 text-travel-blue" />
                </div>
                <h3 className="font-bold text-xl mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We constantly explore new technologies and approaches to enhance the 
                  travel planning experience and deliver unique itineraries.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Globe className="h-6 w-6 text-travel-blue" />
                </div>
                <h3 className="font-bold text-xl mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We promote responsible tourism that respects local communities, preserves 
                  cultural heritage, and protects natural environments.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-travel-blue mb-4">Meet Our Team</h2>
          <p className="text-gray-700">
            A diverse group of travel enthusiasts, tech innovators, and local experts 
            working together to redefine travel in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Suriya Ram",
              role: "Founder & CEO",
              bio: "Former tech executive with a passion for hiking the Western Ghats.",
              avatar: "https://randomuser.me/api/portraits/men/34.jpg"
            },
            {
              name: "Keerthy Suresh",
              role: "Chief Experience Officer",
              bio: "Travel blogger turned entrepreneur with 10+ years in the tourism industry.",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
              name: "Vinodhan M",
              role: "Lead AI Developer",
              bio: "AI specialist with a mission to make travel planning smarter and more intuitive.",
              avatar: "https://randomuser.me/api/portraits/men/68.jpg"
            },
            {
              name: "Ganesh Kumar",
              role: "Head of Partnerships",
              bio: "Building relationships with the best local experiences across India.",
              avatar: "https://randomuser.me/api/portraits/men/65.jpg"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl mb-1">{member.name}</h3>
              <p className="text-travel-blue font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-travel-blue text-white rounded-xl p-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose TravelZenith</h2>
          <p className="opacity-90">
            We combine technology with human expertise to create travel experiences 
            that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Award,
              title: "AI-Powered Personalization",
              description: "Our advanced algorithms learn your preferences to create truly personalized itineraries."
            },
            {
              icon: Users,
              title: "Local Expertise",
              description: "Our team includes locals from every region who share insider knowledge and hidden gems."
            },
            {
              icon: Clock,
              title: "Time-Saving Planning",
              description: "Create comprehensive itineraries in minutes instead of hours of research."
            },
            {
              icon: Heart,
              title: "Customer Satisfaction",
              description: "95% of our travelers rate their experience as excellent or very good."
            }
          ].map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <feature.icon className="h-8 w-8 text-travel-orange" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-travel-blue mb-6">Get In Touch</h2>
        <p className="text-gray-700 mb-8">
          Have questions or want to learn more about our services? We'd love to hear from you!
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-travel-blue" />
            </div>
            <div className="text-left">
              <p className="font-medium">Visit Us</p>
              <p className="text-gray-600">004, Velayutham Road</p>
              <p className="text-gray-600">Sivakasi, Tamil Nadu 626123</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Mail className="h-6 w-6 text-travel-blue" />
            </div>
            <div className="text-left">
              <p className="font-medium">Email Us</p>
              <p className="text-gray-600">info@travelzenith.com</p>
              <p className="text-gray-600">support@travelzenith.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-travel-blue" />
            </div>
            <div className="text-left">
              <p className="font-medium">Call Us</p>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-gray-600">Mon-Sat, 9am-6pm IST</p>
            </div>
          </div>
        </div>
        
        <Button asChild size="lg">
          <a href="/contact">Contact Us</a>
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;