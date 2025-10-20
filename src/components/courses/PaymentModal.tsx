import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Course } from '@/types';
import { createUniqueEnrollmentCode } from '@/lib/enrollmentUtils';
import { collection, addDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PaymentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (enrollmentCode: string) => void;
}

const PaymentModal = ({ course, isOpen, onClose, onSuccess }: PaymentModalProps) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!course || !user) return null;

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_default';

  const handlePaymentSuccess = async (reference: any) => {
    setIsProcessing(true);
    try {
      // Generate unique enrollment code
      const enrollmentCode = await createUniqueEnrollmentCode();

      // Create enrollment record
      await addDoc(collection(db, 'enrollments'), {
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        courseId: course.id,
        courseName: course.title,
        enrollmentCode,
        paymentStatus: 'completed',
        paymentReference: reference.reference,
        amount: course.price,
        enrolledAt: new Date().toISOString(),
        verifiedAt: null,
        verifiedBy: null,
      });

      // Update course enrollment count
      await updateDoc(doc(db, 'courses', course.id), {
        enrollmentCount: increment(1),
      });

      toast.success('Enrollment successful!');
      onSuccess(enrollmentCode);
      onClose();
    } catch (error) {
      console.error('Error processing enrollment:', error);
      toast.error('Failed to process enrollment. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const componentProps = {
    email: user.email,
    amount: course.price * 100, // Paystack expects amount in kobo
    metadata: {
      courseId: course.id,
      courseName: course.title,
      userId: user.id,
      userName: user.name,
      custom_fields: []
    },
    publicKey,
    text: isProcessing ? 'Processing...' : `Pay ₦${course.price.toLocaleString()}`,
    onSuccess: handlePaymentSuccess,
    onClose: () => {
      if (!isProcessing) {
        toast.info('Payment cancelled');
        onClose();
      }
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            You're about to enroll in {course.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Course</span>
            <span className="font-semibold">{course.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Instructor</span>
            <span className="font-semibold">{course.instructorName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="font-semibold">{course.duration}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-2xl font-bold text-primary">
                ₦{course.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <PaystackButton 
            {...componentProps} 
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-smooth disabled:opacity-50"
            disabled={isProcessing}
          />
          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Paystack
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
