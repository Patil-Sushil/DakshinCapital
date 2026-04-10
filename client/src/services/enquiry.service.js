// Enquiry Service - Handle enquiry submissions with EmailJS
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import emailjs from '@emailjs/browser';

/**
 * Submit enquiry to Firestore and send email notification via EmailJS
 */
export const submitEnquiry = async (enquiryData) => {
  try {
    // Prepare enquiry data
    const enquiry = {
      name: enquiryData.name.trim(),
      email: enquiryData.email.trim().toLowerCase(),
      phone: enquiryData.phone.trim(),
      loanType: enquiryData.loanType || null,
      loanAmount: enquiryData.loanAmount ? Number(enquiryData.loanAmount) : null,
      message: enquiryData.message.trim(),
      status: 'new',
      isRead: false,
      adminNotes: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'enquiries'), enquiry);
    console.log('Enquiry saved to Firestore with ID:', docRef.id);

    // Send confirmation email to user via EmailJS
    try {
      const emailParams = {
        to_name: enquiryData.name,
        to_email: enquiryData.email,
        from_name: 'Dakshin Capital',
        loan_type: enquiryData.loanType || 'General Enquiry',
        loan_amount: enquiryData.loanAmount
          ? `₹${Number(enquiryData.loanAmount).toLocaleString('en-IN')}`
          : 'N/A',
        message: enquiryData.message,
        phone: enquiryData.phone,
        reply_to: 'shreyasmalangave056@gmail.com',
      };

      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Only send email if EmailJS is properly configured
      if (
        serviceId &&
        templateId &&
        publicKey &&
        serviceId !== 'your_service_id' &&
        templateId !== 'your_template_id' &&
        publicKey !== 'your_public_key'
      ) {
        await emailjs.send(serviceId, templateId, emailParams, publicKey);
        console.log('✅ Confirmation email sent successfully via EmailJS');
      } else {
        console.log('ℹ️ EmailJS not configured. Skipping email notification.');
        console.log('📝 To enable emails, follow the setup guide in EMAILJS_SETUP.md');
      }
    } catch (emailError) {
      console.error('⚠️ Email notification failed:', emailError.message || emailError);
      console.log('💡 Enquiry was saved successfully. Email feature is optional.');
      // Don't throw error - enquiry is already saved
    }

    return {
      success: true,
      enquiryId: docRef.id,
      message: 'Enquiry submitted successfully',
    };
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw new Error('Failed to submit enquiry. Please try again.');
  }
};

/**
 * Get all enquiries (Admin only)
 */
export const getAllEnquiries = async () => {
  try {
    // This will be implemented with Firebase queries in Phase 7
    return [];
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
};

/**
 * Update enquiry status (Admin only)
 */
export const updateEnquiryStatus = async (enquiryId, status) => {
  try {
    // This will be implemented with Firebase in Phase 7
    return { success: true };
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    throw error;
  }
};

/**
 * Delete enquiry (Admin only)
 */
export const deleteEnquiry = async (enquiryId) => {
  try {
    // This will be implemented with Firebase in Phase 7
    return { success: true };
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    throw error;
  }
};

export default {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
