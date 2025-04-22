
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote 
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "The AI itinerary planner saved me so much time! It created the perfect customized trip to Kerala that matched all my preferences. Highly recommended!"
  },
  {
    id: 2,
    name: "Rajiv Mehta",
    location: "Delhi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "TravelZenith made planning our family trip to Ooty and Kodaikanal completely stress-free. The recommendations were spot on and the booking process was seamless."
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "As a solo traveler, safety is my priority. The detailed information and community insights helped me plan an amazing trip to Ladakh with complete peace of mind."
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="travel-section bg-travel-lightBlue">
      <div className="travel-container">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Read about the experiences of travelers who have used our platform to plan their dream trips
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-md p-8 md:p-10">
            <Quote className="absolute top-6 left-6 h-10 w-10 text-travel-blue opacity-20" />
            
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                "{testimonials[activeIndex].text}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonials[activeIndex].name}</h4>
                  <p className="text-gray-500">{testimonials[activeIndex].location}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? "bg-travel-blue" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
