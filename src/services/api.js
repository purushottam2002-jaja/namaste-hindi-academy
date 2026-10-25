// Dynamic API Client for Namaste Hindi Academy
// Communicates with Node.js Express backend (http://localhost:5000/api)
// Designed for seamless transition to MongoDB / PostgreSQL

const API_BASE = '/api';

export const api = {
  // 1. System & Stats
  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API Client] Falling back to local stats:', err.message);
      return {
        yearsExperience: 20,
        studentsTrained: 1450,
        countriesReached: 42,
        fluencySuccessRate: "98%",
        averageRating: 4.95,
        liveTimezones: ["US Eastern", "US Pacific", "UK GMT", "Central Europe", "Australia AEDT", "India IST"]
      };
    }
  },

  // 2. Courses
  async getCourses(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.deliveryMode && params.deliveryMode !== 'all') {
        query.append('deliveryMode', params.deliveryMode);
      }
      if (params.search) {
        query.append('search', params.search);
      }
      const url = `${API_BASE}/courses${query.toString() ? `?${query.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch courses');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API Client] Falling back to local courses:', err.message);
      return [];
    }
  },

  async getCourseById(id) {
    try {
      const res = await fetch(`${API_BASE}/courses/${id}`);
      if (!res.ok) throw new Error('Course not found');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API Client] Error fetching course by id:', err.message);
      return null;
    }
  },

  // 3. Testimonials & Student Reviews
  async getTestimonials() {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API Client] Falling back to default testimonials:', err.message);
      return [];
    }
  },

  async submitTestimonial(data) {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to submit review');
    return json;
  },

  // 4. Audio Phrasebook
  async getPhrases(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.category && params.category !== 'all') {
        query.append('category', params.category);
      }
      if (params.search) {
        query.append('search', params.search);
      }
      const url = `${API_BASE}/phrases${query.toString() ? `?${query.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch phrases');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API Client] Falling back to local phrases:', err.message);
      return [];
    }
  },

  // 5. Frequently Asked Questions
  async getFaqs(category = 'all') {
    try {
      const url = `${API_BASE}/faqs${category !== 'all' ? `?category=${category}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch faqs');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API Client] Falling back to default FAQs:', err.message);
      return [];
    }
  },

  // 6. Demo Class Booking
  async bookDemoClass(bookingData) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Booking failed');
    return json;
  },

  // 7. General Inquiry
  async submitInquiry(inquiryData) {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Inquiry submission failed');
    return json;
  },

  // 8. Newsletter / PDF Cheatsheet Download
  async subscribeNewsletter(email) {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Subscription failed');
    return json;
  }
};
