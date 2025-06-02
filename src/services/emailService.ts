
import { supabase } from '@/integrations/supabase/client';

interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  message: string;
  jobTitle?: string;
}

interface PartnerApplicationData {
  company: string;
  partnerType: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}

export const sendJobApplicationEmail = async (data: JobApplicationData): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: result, error } = await supabase.functions.invoke('send-application-email', {
      body: {
        type: 'job',
        data: data
      }
    });

    if (error) {
      console.error('Error sending job application email:', error);
      return { success: false, message: 'Failed to send notification email' };
    }

    return { success: true, message: 'Application submitted and notification sent' };
  } catch (error) {
    console.error('Error in sendJobApplicationEmail:', error);
    return { success: false, message: 'Failed to send notification email' };
  }
};

export const sendPartnerApplicationEmail = async (data: PartnerApplicationData): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: result, error } = await supabase.functions.invoke('send-application-email', {
      body: {
        type: 'partner',
        data: data
      }
    });

    if (error) {
      console.error('Error sending partner application email:', error);
      return { success: false, message: 'Failed to send notification email' };
    }

    return { success: true, message: 'Application submitted and notification sent' };
  } catch (error) {
    console.error('Error in sendPartnerApplicationEmail:', error);
    return { success: false, message: 'Failed to send notification email' };
  }
};
