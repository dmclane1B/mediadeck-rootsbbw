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
    title: 'BLACK BREASTFEEDING WEEK 2025',
    subtitle: 'Celebrating and Supporting Breastfeeding in Our Community',
    description: 'Join Roots Community Health for a week of education, empowerment, and celebration as we support Black mothers and families in their breastfeeding journeys.',
    buttonText: 'Join Our Community',
    customFields: {
      eventDate: 'August 25-31, 2025',
      location: 'Community Centers & Virtual Events',
      testimonial: {
        quote: 'This event gave me the support and confidence I needed as a new mother. The community came together beautifully to celebrate and educate.',
        author: 'Maria Johnson',
        role: 'Community Member & New Mother'
      }
    }
  },
  overview: {
    id: 'overview',
    title: 'BLACK BREASTFEEDING WEEK EVENT OVERVIEW',
    subtitle: 'A Vibrant Celebration of Community Support and Education',
    description: 'Join us for a transformative week of events designed to celebrate, educate, and empower Black mothers and families in their breastfeeding journeys. Our community comes together to share stories, learn from experts, and build lasting connections.',
    sections: [
      {
        title: 'Event Highlights',
        content: [
          'Over 50 community members participating',
          '5 days of comprehensive programming',
          'Expert-led educational sessions',
          'Community testimonials and story sharing',
          'Free resources and support materials',
          'Virtual and in-person participation options'
        ]
      },
      {
        title: 'Community Partners',
        content: [
          'Local healthcare providers and lactation consultants',
          'Community advocacy organizations',
          'Educational institutions and parent groups',
          'Local businesses supporting families'
        ]
      }
    ],
    customFields: {
      category: 'EVENT OVERVIEW',
      eventDetails: 'August 25-31, 2025 | Community Centers & Virtual Platforms',
      testimonial: {
        quote: 'Seeing our community come together to support each other was incredibly moving. The knowledge shared and connections made will impact families for years to come.',
        author: 'Dr. Sarah Williams',
        role: 'Community Health Director'
      }
    }
  },
  challenges: {
    id: 'challenges',
    title: 'ADDRESSING HEALTH DISPARITIES IN OUR COMMUNITY',
    subtitle: 'Understanding the Challenges and Creating Solutions',
    description: 'Through education, support, and community engagement, we work together to address the systemic barriers that impact Black mothers and families in their breastfeeding journeys.',
    sections: [
      {
        title: 'Community Impact Statistics',
        content: [
          'Black mothers have lower breastfeeding initiation rates compared to other groups',
          'Limited access to culturally competent lactation support',
          'Higher rates of maternal mortality requiring comprehensive care',
          'Need for community-based education and peer support networks'
        ]
      },
      {
        title: 'Our Community Response',
        content: [
          'Free lactation consultations with certified specialists',
          'Peer support groups led by community members',
          'Educational workshops in multiple languages',
          'Partnership with local healthcare providers',
          'Advocacy for systemic healthcare improvements'
        ]
      },
      {
        title: 'Success Stories',
        content: [
          'Increased breastfeeding duration among program participants',
          'Growing network of peer support leaders',
          'Improved access to lactation resources',
          'Stronger community connections and support systems'
        ]
      }
    ],
    customFields: {
      category: 'COMMUNITY IMPACT',
      testimonial: {
        quote: 'The support I received from this program changed everything. Not only did I successfully breastfeed my baby, but I found a community of mothers who understood my journey.',
        author: 'Keisha Thompson',
        role: 'Program Participant & Peer Support Leader'
      }
    }
  },
  'monday-kickoff': {
    id: 'monday-kickoff',
    title: '04 EVENTS',
    subtitle: 'Monday Kick-Off',
    description: 'Join us for an inspiring start to Black Breastfeeding Week with community leaders and healthcare professionals.',
    sections: [
      {
        title: 'Event Details',
        content: ['Monday, August 25, 2025', '6:00 PM - 7:30 PM', 'Virtual Event via Zoom', 'Welcome discussion and overview']
      }
    ],
    customFields: {
      category: 'EVENTS'
    }
  },
  'expert-panel': {
    id: 'expert-panel',
    title: '05 EVENTS',
    subtitle: 'Expert Panel',
    description: 'Learn from board-certified lactation consultants and healthcare professionals about best practices and evidence-based support.',
    sections: [
      {
        title: 'Featured Experts',
        content: ['Board-certified lactation consultant', 'Pediatric specialists', 'Community health advocates', 'Q&A session included']
      },
      {
        title: 'Event Details',
        content: ['Tuesday, August 26, 2025', '7:00 PM - 8:30 PM', 'Virtual Event via Zoom']
      }
    ],
    customFields: {
      category: 'EVENTS'
    }
  },
  'community-voices': {
    id: 'community-voices',
    title: '06 EVENTS',
    subtitle: 'Community Voices',
    description: 'Hear powerful stories and experiences from mothers in our community who have navigated their breastfeeding journeys.',
    sections: [
      {
        title: 'Featured Speakers',
        content: ['Local mothers sharing their journeys', 'Community advocates', 'Peer support leaders', 'Interactive discussion']
      },
      {
        title: 'Event Details',
        content: ['Wednesday, August 27, 2025', '6:30 PM - 8:00 PM', 'Community Center & Virtual Option']
      }
    ],
    customFields: {
      category: 'EVENTS'
    }
  },
  'nutrition-education': {
    id: 'nutrition-education',
    title: '07 NUTRITION',
    subtitle: 'Nutrition Education',
    description: 'Essential nutrition guidance and lactation support for healthy breastfeeding journey and optimal mother-baby wellness.',
    sections: [
      {
        title: 'Nutrition Services',
        content: ['Lactation consultant appointments', 'Breastfeeding nutrition workshops', 'Healthy meal planning for nursing mothers', 'Nutritional supplements guidance']
      },
      {
        title: 'Support Available',
        content: ['One-on-one nutrition counseling', 'Group breastfeeding support sessions', 'Educational materials and resources', 'Follow-up care and monitoring']
      }
    ],
    customFields: {
      category: 'NUTRITION'
    }
  },
  'workout-session': {
    id: 'workout-session',
    title: '08 ACTIVITIES',
    subtitle: 'Workout Session',
    description: 'Stay active and healthy with community fitness activities designed for all levels, including prenatal and postnatal options.',
    sections: [
      {
        title: 'Activities Include',
        content: ['Prenatal yoga and stretching', 'Postnatal fitness routines', 'Family-friendly exercises', 'Wellness tips and guidance']
      },
      {
        title: 'Event Details',
        content: ['Friday, August 29, 2025', '9:00 AM - 10:30 AM', 'Community Center Gym']
      }
    ],
    customFields: {
      category: 'ACTIVITIES'
    }
  },
  'smoothie-demo': {
    id: 'smoothie-demo',
    title: '09 ACTIVITIES',
    subtitle: 'Smoothie Demo',
    description: 'Learn to make nutritious smoothies that support breastfeeding and overall health, led by our very own nutrition expert Jocelyn.',
    sections: [
      {
        title: 'What You\'ll Learn',
        content: ['Nutrient-rich ingredients for lactation support', 'Lactation-supporting recipes and combinations', 'Healthy meal planning strategies', 'Budget-friendly nutritious options']
      },
      {
        title: 'Event Details',
        content: ['Friday, August 29, 2025', '11:00 AM - 12:30 PM', 'Community Center Kitchen']
      }
    ],
    customFields: {
      category: 'ACTIVITIES'
    }
  },
  'resources-support': {
    id: 'resources-support',
    title: '10 SUPPORT',
    subtitle: 'Resources & Support',
    description: 'Comprehensive support services available to families in our community throughout the year.',
    sections: [
      {
        title: 'Available Services',
        content: ['Lactation consultation and support', 'Mental health counseling', 'Nutrition counseling and planning', 'Peer support groups and networks']
      },
      {
        title: 'How to Access',
        content: ['Call our main number for appointments', 'Visit our website for resources', 'Walk-in appointments available', 'Most insurance plans accepted']
      }
    ],
    customFields: {
      category: 'SUPPORT'
    }
  },
  'community-partners': {
    id: 'community-partners',
    title: '11 PARTNERS',
    subtitle: 'Community Partners',
    description: 'Meet the incredible organizations and leaders making Black Breastfeeding Week possible in our community.',
    sections: [
      {
        title: 'Partner Organizations',
        content: ['Local healthcare providers and clinics', 'Community advocacy groups', 'Educational institutions and schools', 'Government agencies and departments']
      },
      {
        title: 'Leadership Team',
        content: ['Community health coordinators', 'Volunteer coordinators', 'Event planning committee', 'Medical advisory board']
      }
    ],
    customFields: {
      category: 'PARTNERS'
    }
  },
  roadmap: {
    id: 'roadmap',
    title: '12 ACTION',
    subtitle: 'How to Participate',
    description: 'Multiple ways to get involved and support Black Breastfeeding Week in our community.',
    sections: [
      {
        title: 'Ways to Participate',
        content: ['Attend virtual events and workshops', 'Join in-person activities and celebrations', 'Share on social media with #BlackBreastfeedingWeek', 'Volunteer at events and activities']
      },
      {
        title: 'Getting Started',
        content: ['Register online for all events', 'Follow us on social media', 'Sign up for volunteer opportunities', 'Spread the word in your network']
      }
    ],
    customFields: {
      category: 'ACTION'
    }
  },
  ask: {
    id: 'ask',
    title: '13 RSVP',
    subtitle: 'Register Today',
    description: 'Secure your spot for all Black Breastfeeding Week events and activities. Registration is free and required for all events.',
    buttonText: 'Register Now',
    sections: [
      {
        title: 'Registration Benefits',
        content: ['Email reminders for all events', 'Resource packets and materials', 'Priority seating at in-person events', 'Follow-up support and resources']
      },
      {
        title: 'How to Register',
        content: ['Online registration available 24/7', 'Call our office during business hours', 'Register at any partner location', 'Group registration available']
      }
    ],
    customFields: {
      category: 'RSVP'
    }
  },
  contact: {
    id: 'contact',
    title: '14 CONNECT',
    subtitle: 'Contact Us',
    description: 'Get in touch with our team for more information about our services, programs, and Black Breastfeeding Week events.',
    sections: [
      {
        title: 'Contact Information',
        content: ['Phone: (555) 123-4567', 'Email: info@rootscommunityhealth.org', 'Address: 123 Community Avenue', 'Hours: Monday-Friday 8AM-6PM']
      },
      {
        title: 'Follow Us',
        content: ['Facebook: @RootsCommunityHealth', 'Instagram: @rootscommhealth', 'Website: www.rootscommunityhealth.org', 'Newsletter signup available']
      }
    ],
    customFields: {
      category: 'CONNECT'
    }
  },
  resourcesSupport: {
    id: 'resources-support',
    title: '10 RESOURCES & SUPPORT',
    subtitle: 'Comprehensive Community Care',
    description: 'Access to essential resources and support services for breastfeeding mothers and families in our community.',
    buttonText: 'Get Support',
    sections: [
      {
        title: 'Lactation Support Services',
        content: ['Free lactation consultations with certified specialists', 'Breastfeeding support groups and peer connections', 'Pump rental and equipment assistance', 'Educational materials in multiple languages', '24/7 helpline for urgent breastfeeding questions']
      },
      {
        title: 'Family Wellness Resources',
        content: ['Mental health counseling for new mothers', 'Nutritional guidance and meal planning', 'Childcare assistance during appointments', 'Postpartum care coordination', 'Connection to community support networks']
      },
      {
        title: 'Community Partnerships',
        content: ['Healthcare provider referrals', 'WIC program coordination', 'Insurance navigation support', 'Transportation assistance', 'Cultural competency and language support']
      }
    ],
    customFields: {
      category: 'SUPPORT'
    }
  }
};