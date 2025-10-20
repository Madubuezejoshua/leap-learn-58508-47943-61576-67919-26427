import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Shield, Settings, Activity, LogOut } from 'lucide-react';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
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
          <h1 className="text-2xl font-bold font-heading">Admin Panel</h1>
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
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">1,248</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold">342</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">API Calls</p>
                <p className="text-2xl font-bold">45.2K</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 shadow-medium">
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', role: 'Student', status: 'Active' },
                { name: 'Jane Smith', role: 'Coordinator', status: 'Active' },
                { name: 'Mike Johnson', role: 'Student', status: 'Inactive' },
                { name: 'Sarah Williams', role: 'Coordinator', status: 'Active' },
                { name: 'Tom Brown', role: 'Admin', status: 'Active' }
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.role} • {user.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-medium">
            <h2 className="text-xl font-bold mb-4">System Logs</h2>
            <div className="space-y-4">
              {[
                'User login successful',
                'New course created',
                'Database backup completed',
                'Security scan finished',
                'API rate limit updated'
              ].map((log, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium">{log}</p>
                  <p className="text-xs text-muted-foreground">{idx * 5} minutes ago</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-6 shadow-medium">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full" size="lg">Create New User</Button>
            <Button className="w-full" size="lg" variant="outline">System Settings</Button>
            <Button className="w-full" size="lg" variant="outline">View Reports</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminPanel;
