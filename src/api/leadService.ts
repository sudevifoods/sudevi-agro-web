
import { supabase } from '@/integrations/supabase/client';

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const submitLead = async (leadData: LeadData): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from('leads')
      .insert([leadData]);

    if (error) {
      console.error('Error submitting lead:', error);
      return { success: false, message: 'Failed to submit lead. Please try again later.' };
    }

    return { success: true, message: 'Lead submitted successfully' };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, message: 'Failed to submit lead. Please try again later.' };
  }
};
