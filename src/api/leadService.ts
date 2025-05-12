
import axios from 'axios';

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// API endpoint to send lead data to server
export const submitLead = async (leadData: LeadData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post('/api/leads', leadData);
    return { success: true, message: 'Lead submitted successfully' };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, message: 'Failed to submit lead. Please try again later.' };
  }
};
