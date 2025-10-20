import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Calendar, LogOut, Clock, Video, MapPin } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Course, Enrollment, ScheduledClass } from '@/types';
import ScheduleClassDialog from '@/components/classes/ScheduleClassDialog';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      navigate('/login');
      return;
    }
    fetchTeacherData();
  }, [user, navigate]);

  const fetchTeacherData = async () => {
    if (!user) return;
    
    try {
      // Fetch teacher's courses
      const coursesQuery = query(
        collection(db, 'courses'),
        where('instructorId', '==', user.id)
      );
      const coursesSnapshot = await getDocs(coursesQuery);
      const coursesData = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(coursesData);

      // Fetch enrollments for teacher's courses
      const courseIds = coursesData.map(c => c.id);
      if (courseIds.length > 0) {
        const enrollmentsQuery = query(
          collection(db, 'enrollments'),
          where('courseId', 'in', courseIds)
        );
        const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
        const enrollmentsData = enrollmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Enrollment[];
        setEnrollments(enrollmentsData);
      }

      // Fetch scheduled classes
      const classesQuery = query(
        collection(db, 'scheduled_classes'),
        where('teacherId', '==', user.id),
        orderBy('startTime', 'desc')
      );
      const classesSnapshot = await getDocs(classesQuery);
      const classesData = classesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ScheduledClass[];
      setScheduledClasses(classesData);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalStudents = enrollments.length;
  const upcomingClasses = scheduledClasses.filter(c => 
    c.status === 'scheduled' && new Date(c.startTime) > new Date()
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-heading">Teacher Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">My Courses</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingClasses}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Courses you're teaching</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : courses.length === 0 ? (
                  <p className="text-muted-foreground">No courses assigned yet.</p>
                ) : (
                  <div className="space-y-4">
                    {courses.map(course => (
                      <div key={course.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {enrollments.filter(e => e.courseId === course.id).length} students enrolled
                          </p>
                        </div>
                        <ScheduleClassDialog 
                          course={course}
                          teacherId={user?.id || ''}
                          teacherName={user?.name || ''}
                          onClassScheduled={fetchTeacherData}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>Students enrolled in your courses</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : enrollments.length === 0 ? (
                  <p className="text-muted-foreground">No students enrolled yet.</p>
                ) : (
                  <div className="space-y-4">
                    {enrollments.map(enrollment => (
                      <div key={enrollment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h3 className="font-semibold">{enrollment.studentName}</h3>
                          <p className="text-sm text-muted-foreground">{enrollment.studentEmail}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Course: {enrollment.courseName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono text-primary">{enrollment.enrollmentCode}</p>
                          <p className="text-xs text-muted-foreground">Enrollment Code</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Classes</CardTitle>
                <CardDescription>Your upcoming and past classes</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : scheduledClasses.length === 0 ? (
                  <p className="text-muted-foreground">No classes scheduled yet.</p>
                ) : (
                  <div className="space-y-4">
                    {scheduledClasses.map(classItem => (
                      <div key={classItem.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{classItem.title}</h3>
                            <p className="text-sm text-muted-foreground">{classItem.courseName}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(classItem.startTime).toLocaleString()}
                              </div>
                              {classItem.classType === 'online' ? (
                                <div className="flex items-center gap-1">
                                  <Video className="w-4 h-4" />
                                  Online
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  Physical
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{classItem.enrolledStudents.length} students</p>
                            <p className="text-xs text-muted-foreground">Enrolled</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;
