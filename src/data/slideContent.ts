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
    title: '02 SCHEDULE',
    subtitle: 'Week Overview',
    description: 'A comprehensive week of events, education, and community support celebrating and promoting breastfeeding in the Black community',
    sections: [
      {
        title: 'Event Schedule',
        content: ['Monday: Virtual Welcome & Discussion', 'Tuesday: Expert Panel with Board-Certified Lactation Consultant', 'Wednesday: Community Voices Panel', 'Thursday: Wellness Fair', 'Friday: Workout Session & Smoothie Demo']
      }
    ],
    customFields: {
      category: 'SCHEDULE',
      eventDetails: 'Event Week: August 25-31, 2025 | Location: Community & Virtual Events'
    }
  },
  challenges: {
    id: 'challenges',
    title: '03 IMPACT',
    subtitle: 'Why This Matters',
    description: 'Addressing critical challenges in our community and the importance of Black Breastfeeding Week',
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
    ],
    customFields: {
      category: 'IMPACT'
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