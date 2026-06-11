import { useState, useEffect } from "react";
import data from "../../data/Data.json";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
}

function TestimonialCard() {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    const testimonials: Testimonial[] = data.testimonials;
    const random =
      testimonials[Math.floor(Math.random() * testimonials.length)];
    setTestimonial(random);
  }, []);

  if (!testimonial) return null;

  return (
    <div className="bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6 max-w-md shadow-sm">
      <p className="text-lg font-bold text-heading leading-snug mb-4">
        {testimonial.quote}
      </p>
      <p className="text-sm text-grey">
        {testimonial.name}, {testimonial.title}
      </p>
    </div>
  );
}

export default TestimonialCard;
