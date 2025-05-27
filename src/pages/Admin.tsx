import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LeadsManagement from '@/components/Admin/LeadsManagement';
import ProductsManagement from '@/components/Admin/ProductsManagement';
import ContentManagement from '@/components/Admin/ContentManagement';
import JobOpeningsManagement from '@/components/Admin/JobOpeningsManagement';
import SEOManagement from '@/components/Admin/SEOManagement';
import GoogleMerchantCenter from '@/components/Admin/GoogleMerchantCenter';

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  console.log('Admin page - user:', user?.email, 'isAdmin:', isAdmin, 'loading:', loading);

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user, redirecting to auth');
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Access Denied - Sudevi Agro Foods</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You don't have admin access. Please contact the administrator to request access.
              </AlertDescription>
            </Alert>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-xl font-semibold mb-4">Access Denied</h1>
              <p className="text-gray-600 mb-4">
                Logged in as: {user.email}
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  Return to Home
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Sudevi Agro Foods</title>
        <meta name="description" content="Admin dashboard for managing Sudevi Agro Foods" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="leads" className="space-y-6">
            <TabsList className="bg-white">
              <TabsTrigger value="leads">Leads Management</TabsTrigger>
              <TabsTrigger value="products">Products Management</TabsTrigger>
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="jobs">Job Openings</TabsTrigger>
              <TabsTrigger value="seo">SEO Optimization</TabsTrigger>
              <TabsTrigger value="gmc">Google Merchant</TabsTrigger>
            </TabsList>

            <TabsContent value="leads">
              <LeadsManagement />
            </TabsContent>

            <TabsContent value="products">
              <ProductsManagement />
            </TabsContent>

            <TabsContent value="content">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="jobs">
              <JobOpeningsManagement />
            </TabsContent>

            <TabsContent value="seo">
              <SEOManagement />
            </TabsContent>

            <TabsContent value="gmc">
              <GoogleMerchantCenter />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;
