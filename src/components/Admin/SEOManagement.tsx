
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Search, Edit, Save, X, Plus, RefreshCw } from 'lucide-react';

interface SEOData {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical_url?: string;
  robots: string;
  is_active: boolean;
  created_at: string;
}

const SEOManagement = () => {
  const [seoData, setSeoData] = useState<SEOData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    page_path: '',
    title: '',
    description: '',
    keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    canonical_url: '',
    robots: 'index, follow',
    is_active: true
  });

  useEffect(() => {
    fetchSEOData();
  }, []);

  const fetchSEOData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('page_path');

      if (error) throw error;
      setSeoData(data || []);
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch SEO data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSEOData();
    setRefreshing(false);
    toast({
      title: "Success",
      description: "SEO data refreshed successfully"
    });
  };

  const handleEdit = (seo: SEOData) => {
    setEditingId(seo.id);
    setFormData({
      page_path: seo.page_path,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      og_title: seo.og_title || '',
      og_description: seo.og_description || '',
      og_image: seo.og_image || '',
      canonical_url: seo.canonical_url || '',
      robots: seo.robots,
      is_active: seo.is_active
    });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('seo_settings')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        toast({
          title: "Success",
          description: "SEO settings updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('seo_settings')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "SEO settings created successfully"
        });
      }

      setEditingId(null);
      setShowForm(false);
      setFormData({
        page_path: '',
        title: '',
        description: '',
        keywords: '',
        og_title: '',
        og_description: '',
        og_image: '',
        canonical_url: '',
        robots: 'index, follow',
        is_active: true
      });
      await fetchSEOData();
    } catch (error) {
      console.error('Error saving SEO data:', error);
      toast({
        title: "Error",
        description: "Failed to save SEO settings",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      page_path: '',
      title: '',
      description: '',
      keywords: '',
      og_title: '',
      og_description: '',
      og_image: '',
      canonical_url: '',
      robots: 'index, follow',
      is_active: true
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-lg">Loading SEO data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                SEO Management
              </CardTitle>
              <CardDescription>
                Manage SEO settings for all pages and optimize search engine visibility
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-sudevi-red hover:bg-sudevi-darkRed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add SEO Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {(showForm || editingId) && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">
                {editingId ? 'Edit SEO Settings' : 'Add New SEO Settings'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Page Path</label>
                  <Input
                    value={formData.page_path}
                    onChange={(e) => setFormData({ ...formData, page_path: e.target.value })}
                    placeholder="/about, /products, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Page title for search engines"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Meta Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description for search engine results"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Keywords</label>
                  <Input
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Robots</label>
                  <Input
                    value={formData.robots}
                    onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                    placeholder="index, follow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">OG Title</label>
                  <Input
                    value={formData.og_title}
                    onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                    placeholder="Title for social media sharing"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">OG Image URL</label>
                  <Input
                    value={formData.og_image}
                    onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-sudevi-red hover:bg-sudevi-darkRed">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          )}

          {seoData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No SEO settings found. Click "Add SEO Settings" to create your first configuration.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page Path</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seoData.map((seo) => (
                    <TableRow key={seo.id}>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {seo.page_path}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{seo.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{seo.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            seo.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {seo.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(seo)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOManagement;
