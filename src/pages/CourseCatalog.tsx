import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Course } from '@/types';
import CourseCard from '@/components/courses/CourseCard';
import PaymentModal from '@/components/courses/PaymentModal';
import EnrollmentSuccess from '@/components/courses/EnrollmentSuccess';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LogOut, Search } from 'lucide-react';

const CourseCatalog = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [enrollmentCode, setEnrollmentCode] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCourses();
  }, [user, navigate]);

  const fetchCourses = async () => {
    const q = query(collection(db, 'courses'), where('isActive', '==', true));
    const snapshot = await getDocs(q);
    const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
    setCourses(coursesData);
    setFilteredCourses(coursesData);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleEnroll = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = (code: string) => {
    setEnrollmentCode(code);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Course Catalog</h1>
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate(user?.role === 'student' ? '/student-dashboard' : '/teacher-dashboard')} variant="outline" size="sm">
              Dashboard
            </Button>
            <Button onClick={() => { logout(); navigate('/'); }} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              showEnrollButton={user?.role === 'student'}
            />
          ))}
        </div>
      </main>

      <PaymentModal
        course={selectedCourse}
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />

      <EnrollmentSuccess
        enrollmentCode={enrollmentCode}
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate('/student-dashboard');
        }}
      />
    </div>
  );
};

export default CourseCatalog;
