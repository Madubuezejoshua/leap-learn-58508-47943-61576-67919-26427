import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'coordinator'>('student');
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(email, password, name, role);
    
    if (success) {
      toast({
        title: "Account created",
        description: "Welcome to SkillSpark!",
      });
      
      if (role === 'student') navigate('/student-dashboard');
      else navigate('/coordinator-dashboard');
    } else {
      toast({
        title: "Signup failed",
        description: "Email already exists",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - 60% - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[60%] bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-primary" />
            <span className="text-5xl font-bold font-heading">SkillSpark</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Join SkillSpark Today!</h2>
          <p className="text-xl text-muted-foreground">
            Start your learning journey with our comprehensive courses and expert instructors.
          </p>
        </div>
      </div>

      {/* Right Column - 40% - Full width on mobile */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-3xl font-bold font-heading">SkillSpark</span>
          </div>

          <Card className="p-8 shadow-strong">
            <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
            
            <Tabs defaultValue="student" onValueChange={(v) => setRole(v as any)} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="coordinator">Coordinator</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign Up
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>

            <div className="mt-6 pt-6 border-t border-border">
              <Link to="/admin-login">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                  Admin Access
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
