import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, Calendar, BarChart3, LogOut } from 'lucide-react';

const CoordinatorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'coordinator') {
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
          <h1 className="text-2xl font-bold font-heading">Coordinator Dashboard</h1>
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
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">248</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled Events</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-bold mb-4">Course Management</h2>
            <div className="space-y-4">
              {['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Mobile Development'].map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">{course}</h3>
                    <p className="text-sm text-muted-foreground">{30 + idx * 5} students enrolled</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {[
                'New student enrollment in Web Dev',
                'Assignment graded for Data Science',
                'Course material updated',
                'Student feedback received',
                'New instructor joined'
              ].map((activity, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium">{activity}</p>
                  <p className="text-xs text-muted-foreground">{idx + 1} hours ago</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CoordinatorDashboard;
