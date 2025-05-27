
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Edit, Save, X, Plus, Briefcase, Trash2 } from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const JobOpeningsManagement = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<JobOpening>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [''],
    is_active: true
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job openings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (job: JobOpening) => {
    setEditingId(job.id);
    setEditForm({
      ...job,
      requirements: [...job.requirements]
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId || !editForm) return;

    try {
      const { error } = await supabase
        .from('job_openings')
        .update({
          title: editForm.title,
          department: editForm.department,
          location: editForm.location,
          type: editForm.type,
          description: editForm.description,
          requirements: editForm.requirements?.filter(req => req.trim() !== ''),
          is_active: editForm.is_active
        })
        .eq('id', editingId);

      if (error) throw error;

      await fetchJobs();
      setEditingId(null);
      setEditForm({});
      
      toast({
        title: "Success",
        description: "Job opening updated successfully"
      });
    } catch (error) {
      console.error('Error updating job:', error);
      toast({
        title: "Error",
        description: "Failed to update job opening",
        variant: "destructive"
      });
    }
  };

  const addNewJob = async () => {
    try {
      const { error } = await supabase
        .from('job_openings')
        .insert([{
          title: newJob.title,
          department: newJob.department,
          location: newJob.location,
          type: newJob.type,
          description: newJob.description,
          requirements: newJob.requirements.filter(req => req.trim() !== ''),
          is_active: newJob.is_active
        }]);

      if (error) throw error;

      await fetchJobs();
      setShowAddForm(false);
      setNewJob({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: [''],
        is_active: true
      });
      
      toast({
        title: "Success",
        description: "Job opening added successfully"
      });
    } catch (error) {
      console.error('Error adding job:', error);
      toast({
        title: "Error",
        description: "Failed to add job opening",
        variant: "destructive"
      });
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job opening?')) return;

    try {
      const { error } = await supabase
        .from('job_openings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchJobs();
      
      toast({
        title: "Success",
        description: "Job opening deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job opening",
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('job_openings')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await fetchJobs();
      
      toast({
        title: "Success",
        description: "Job status updated"
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-lg">Loading job openings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Job Openings Management
          </div>
          <Button onClick={() => setShowAddForm(true)} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Job Opening
          </Button>
        </CardTitle>
        <CardDescription>
          Manage job openings and career opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Add New Job Opening</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <Input
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <Input
                  value={newJob.department}
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <Input
                  value={newJob.type}
                  onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Requirements</label>
              {newJob.requirements.map((req, index) => (
                <Input
                  key={index}
                  value={req}
                  onChange={(e) => {
                    const newReqs = [...newJob.requirements];
                    newReqs[index] = e.target.value;
                    setNewJob({...newJob, requirements: newReqs});
                  }}
                  className="mb-2"
                  placeholder={`Requirement ${index + 1}`}
                />
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setNewJob({...newJob, requirements: [...newJob.requirements, '']})}
              >
                Add Requirement
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewJob}>Add Job Opening</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    {editingId === job.id ? (
                      <Input
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      />
                    ) : (
                      <span className="font-medium">{job.title}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === job.id ? (
                      <Input
                        value={editForm.department || ''}
                        onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                      />
                    ) : (
                      job.department
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === job.id ? (
                      <Input
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      />
                    ) : (
                      job.location
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === job.id ? (
                      <Input
                        value={editForm.type || ''}
                        onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                      />
                    ) : (
                      <Badge variant="outline">{job.type}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(job.id, job.is_active)}
                    >
                      <Badge className={job.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {job.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    {editingId === job.id ? (
                      <div className="flex gap-1">
                        <Button size="sm" onClick={saveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => startEdit(job)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteJob(job.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default JobOpeningsManagement;
