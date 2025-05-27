
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Edit, Save, X, Plus, FileText } from 'lucide-react';

interface PageContent {
  id: string;
  page_name: string;
  section_name: string;
  content_type: string;
  content: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const ContentManagement = () => {
  const [content, setContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PageContent>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState({
    page_name: '',
    section_name: '',
    content_type: 'text',
    content: { text: '' },
    is_active: true
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_name', { ascending: true })
        .order('section_name', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch page content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item: PageContent) => {
    setEditingId(item.id);
    setEditForm({
      ...item,
      content: typeof item.content === 'object' ? item.content.text || JSON.stringify(item.content) : item.content
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId || !editForm) return;

    try {
      const contentData = editForm.content_type === 'text' 
        ? { text: editForm.content }
        : editForm.content;

      const { error } = await supabase
        .from('page_content')
        .update({
          page_name: editForm.page_name,
          section_name: editForm.section_name,
          content_type: editForm.content_type,
          content: contentData,
          is_active: editForm.is_active
        })
        .eq('id', editingId);

      if (error) throw error;

      await fetchContent();
      setEditingId(null);
      setEditForm({});
      
      toast({
        title: "Success",
        description: "Content updated successfully"
      });
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
    }
  };

  const addNewContent = async () => {
    try {
      const contentData = newContent.content_type === 'text' 
        ? { text: newContent.content.text }
        : newContent.content;

      const { error } = await supabase
        .from('page_content')
        .insert([{
          page_name: newContent.page_name,
          section_name: newContent.section_name,
          content_type: newContent.content_type,
          content: contentData,
          is_active: newContent.is_active
        }]);

      if (error) throw error;

      await fetchContent();
      setShowAddForm(false);
      setNewContent({
        page_name: '',
        section_name: '',
        content_type: 'text',
        content: { text: '' },
        is_active: true
      });
      
      toast({
        title: "Success",
        description: "Content added successfully"
      });
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('page_content')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await fetchContent();
      
      toast({
        title: "Success",
        description: "Content status updated"
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update content status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-lg">Loading content...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Content Management
          </div>
          <Button onClick={() => setShowAddForm(true)} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </CardTitle>
        <CardDescription>
          Manage dynamic content for all pages
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Add New Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Page Name</label>
                <Input
                  value={newContent.page_name}
                  onChange={(e) => setNewContent({...newContent, page_name: e.target.value})}
                  placeholder="e.g., home, about, contact"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Section Name</label>
                <Input
                  value={newContent.section_name}
                  onChange={(e) => setNewContent({...newContent, section_name: e.target.value})}
                  placeholder="e.g., hero_title, page_description"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Content Type</label>
              <Select 
                value={newContent.content_type} 
                onValueChange={(value) => setNewContent({...newContent, content_type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea
                value={newContent.content.text || ''}
                onChange={(e) => setNewContent({...newContent, content: { text: e.target.value }})}
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewContent}>Add Content</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        value={editForm.page_name || ''}
                        onChange={(e) => setEditForm({...editForm, page_name: e.target.value})}
                      />
                    ) : (
                      <span className="font-medium">{item.page_name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        value={editForm.section_name || ''}
                        onChange={(e) => setEditForm({...editForm, section_name: e.target.value})}
                      />
                    ) : (
                      item.section_name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Select 
                        value={editForm.content_type} 
                        onValueChange={(value) => setEditForm({...editForm, content_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="outline">{item.content_type}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Textarea
                        value={editForm.content || ''}
                        onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                        rows={2}
                      />
                    ) : (
                      <div className="max-w-xs truncate" title={typeof item.content === 'object' ? item.content.text : item.content}>
                        {typeof item.content === 'object' ? item.content.text : item.content}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(item.id, item.is_active)}
                    >
                      <Badge className={item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <div className="flex gap-1">
                        <Button size="sm" onClick={saveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentManagement;
