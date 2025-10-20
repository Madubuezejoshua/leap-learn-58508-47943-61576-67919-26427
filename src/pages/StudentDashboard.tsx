import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Clock, Award, TrendingUp, LogOut } from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-heading">Student Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours Learned</p>
                <p className="text-2xl font-bold">145</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 shadow-medium">
            <h2 className="text-xl font-bold mb-4">My Courses</h2>
            <div className="space-y-4">
              {['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing'].map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">{course}</h3>
                    <p className="text-sm text-muted-foreground">Progress: {60 + idx * 10}%</p>
                  </div>
                  <Button size="sm">Continue</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {['Assignment 1', 'Project Submission', 'Quiz 3'].map((item, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm">{item}</h3>
                  <p className="text-xs text-muted-foreground">Due in {idx + 2} days</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
