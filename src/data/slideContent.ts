export interface SlideContent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  sections?: {
    title: string;
    content: string | string[];
  }[];
  customFields?: Record<string, any>;
}

export const defaultSlideContent: Record<string, SlideContent> = {
  title: {
    id: 'title',
    title: 'Roots Community Health - Black Breastfeeding Week',
    subtitle: 'HEALING OUR COMMUNITY FROM WITHIN',
    description: 'Uplifting those impacted by systemic inequities and poverty through comprehensive medical and behavioral health care, health navigation, workforce enterprises, housing, outreach, and advocacy.',
    buttonText: 'Learn About Our Services',
    customFields: {
      eventDate: 'August 25-31, 2025'
    }
  },
  overview: {
    id: 'overview',
    title: 'BLACK BREASTFEEDING WEEK',
    description: 'A comprehensive week of events, education, and community support celebrating and promoting breastfeeding in the Black community',
    customFields: {
      eventDetails: 'Event Week: August 25-31, 2025 | Location: Community & Virtual Events'
    }
  },
  challenges: {
    id: 'challenges',
    title: 'WHY THIS MATTERS',
    description: 'Addressing critical challenges in our community',
    sections: [
      {
        title: 'Health Disparities',
        content: 'Black mothers face significantly higher rates of maternal mortality and lower breastfeeding initiation rates due to systemic barriers.'
      },
      {
        title: 'Lack of Support',
        content: 'Limited access to lactation consultants and culturally competent healthcare providers creates additional obstacles.'
      },
      {
        title: 'Cultural Barriers',
        content: 'Historical trauma and cultural misconceptions need to be addressed through community education and support.'
      }
    ]
  },
  'product-glimpse': {
    id: 'product-glimpse',
    title: 'MONDAY KICK-OFF',
    subtitle: 'Virtual Welcome & Discussion',
    description: 'Join us for an inspiring start to Black Breastfeeding Week with community leaders and healthcare professionals.',
    sections: [
      {
        title: 'Event Details',
        content: ['Monday, August 25, 2025', '6:00 PM - 7:30 PM', 'Virtual Event via Zoom']
      }
    ]
  },
  'market-overview': {
    id: 'market-overview',
    title: 'COMMUNITY VOICES',
    subtitle: 'Panel Discussion with Local Mothers',
    description: 'Hear powerful stories and experiences from mothers in our community.',
    sections: [
      {
        title: 'Featured Speakers',
        content: ['Local mothers sharing their journeys', 'Community advocates', 'Healthcare professionals']
      }
    ]
  },
  'proof-demand': {
    id: 'proof-demand',
    title: 'WELLNESS FAIR',
    subtitle: 'Friday Celebration and Resources',
    description: 'Join us for a community celebration with resources, activities, and support for families.',
    sections: [
      {
        title: 'Event Highlights',
        content: ['Resource booths', 'Health screenings', 'Family activities', 'Community networking']
      }
    ]
  },
  'sales-strategy': {
    id: 'sales-strategy',
    title: 'WORKOUT SESSION',
    subtitle: 'Fitness and Wellness Activities',
    description: 'Stay active and healthy with community fitness activities designed for all levels.',
    sections: [
      {
        title: 'Activities Include',
        content: ['Prenatal yoga', 'Postnatal fitness', 'Family-friendly exercises', 'Wellness tips']
      }
    ]
  },
  'customer-persona': {
    id: 'customer-persona',
    title: 'SMOOTHIE DEMO',
    subtitle: 'Led by our very own Jocelyn',
    description: 'Learn to make nutritious smoothies that support breastfeeding and overall health.',
    sections: [
      {
        title: 'What You\'ll Learn',
        content: ['Nutrient-rich ingredients', 'Lactation-supporting recipes', 'Healthy meal planning', 'Budget-friendly options']
      }
    ]
  },
  'value-propositions': {
    id: 'value-propositions',
    title: 'RESOURCES & SUPPORT',
    subtitle: 'Available Community Services',
    description: 'Comprehensive support services available to families in our community.',
    sections: [
      {
        title: 'Available Services',
        content: ['Lactation consultation', 'Mental health support', 'Nutrition counseling', 'Peer support groups']
      },
      {
        title: 'How to Access',
        content: ['Call our main number', 'Visit our website', 'Walk-in appointments available', 'Insurance accepted']
      }
    ]
  },
  'team-leadership': {
    id: 'team-leadership',
    title: 'COMMUNITY PARTNERS',
    subtitle: 'Organizations Supporting the Week',
    description: 'Meet the incredible organizations and leaders making this week possible.',
    sections: [
      {
        title: 'Partner Organizations',
        content: ['Local healthcare providers', 'Community advocacy groups', 'Educational institutions', 'Government agencies']
      }
    ]
  },
  roadmap: {
    id: 'roadmap',
    title: 'HOW TO PARTICIPATE',
    subtitle: 'RSVP and Join the Movement',
    description: 'Multiple ways to get involved and support Black Breastfeeding Week in our community.',
    sections: [
      {
        title: 'Ways to Participate',
        content: ['Attend virtual events', 'Join in-person activities', 'Share on social media', 'Volunteer opportunities']
      },
      {
        title: 'Registration',
        content: ['Online RSVP required', 'Free for all events', 'Childcare available', 'Materials provided']
      }
    ]
  },
  ask: {
    id: 'ask',
    title: 'REGISTER TODAY',
    subtitle: 'Don\'t Miss These Important Events',
    description: 'Secure your spot for all Black Breastfeeding Week events and activities.',
    buttonText: 'Register Now',
    sections: [
      {
        title: 'Registration Benefits',
        content: ['Event reminders', 'Resource packets', 'Priority seating', 'Follow-up support']
      }
    ]
  },
  contact: {
    id: 'contact',
    title: 'CONNECT WITH US',
    subtitle: 'Roots Community Health',
    description: 'Get in touch with our team for more information about our services and programs.',
    sections: [
      {
        title: 'Contact Information',
        content: ['Phone: (555) 123-4567', 'Email: info@rootscommunityhealth.org', 'Address: 123 Community Ave', 'Hours: Mon-Fri 8AM-6PM']
      }
    ]
  }
};