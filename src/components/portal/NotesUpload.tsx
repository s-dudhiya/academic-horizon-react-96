import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Upload, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Image, 
  File,
  Calendar,
  User,
  Tag,
  Eye,
  Star,
  MoreVertical,
  Paperclip
} from 'lucide-react';

interface Document {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'ppt' | 'image' | 'other';
  category: string;
  subject: string;
  uploadedBy: string;
  uploadDate: string;
  version: string;
  size: string;
  downloads: number;
  rating: number;
  tags: string[];
}

interface NotesUploadProps {
  userRole?: 'student' | 'faculty';
  documents?: Document[];
}

export function NotesUpload({
  userRole = 'student',
  documents = [
    {
      id: '1',
      title: 'Data Structures - Trees and Graphs',
      description: 'Comprehensive notes covering binary trees, AVL trees, and graph algorithms',
      type: 'pdf',
      category: 'lecture-notes',
      subject: 'Data Structures',
      uploadedBy: 'Dr. Sarah Wilson',
      uploadDate: '2024-01-15',
      version: 'v2.1',
      size: '2.3 MB',
      downloads: 156,
      rating: 4.8,
      tags: ['trees', 'graphs', 'algorithms']
    },
    {
      id: '2',
      title: 'Web Development Assignment 3',
      description: 'React component lifecycle and state management exercises',
      type: 'doc',
      category: 'assignment',
      subject: 'Web Development',
      uploadedBy: 'Prof. Michael Chen',
      uploadDate: '2024-01-14',
      version: 'v1.0',
      size: '856 KB',
      downloads: 89,
      rating: 4.5,
      tags: ['react', 'javascript', 'frontend']
    },
    {
      id: '3',
      title: 'Database Normalization Examples',
      description: 'Practical examples of 1NF, 2NF, and 3NF with step-by-step explanations',
      type: 'pdf',
      category: 'study-material',
      subject: 'Database Systems',
      uploadedBy: 'Alice Johnson',
      uploadDate: '2024-01-13',
      version: 'v1.2',
      size: '1.7 MB',
      downloads: 203,
      rating: 4.9,
      tags: ['normalization', 'database', 'sql']
    },
    {
      id: '4',
      title: 'Machine Learning Project Guidelines',
      description: 'Complete project requirements and evaluation criteria for final project',
      type: 'doc',
      category: 'project',
      subject: 'Machine Learning',
      uploadedBy: 'Dr. Emily Davis',
      uploadDate: '2024-01-12',
      version: 'v1.0',
      size: '1.2 MB',
      downloads: 134,
      rating: 4.7,
      tags: ['project', 'ml', 'guidelines']
    }
  ]
}: NotesUploadProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    subject: '',
    tags: ''
  });

  const filteredDocuments = documents.filter(doc => {
    const searchMatch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const categoryMatch = selectedCategory === 'all' || doc.category === selectedCategory;
    const subjectMatch = selectedSubject === 'all' || doc.subject === selectedSubject;
    return searchMatch && categoryMatch && subjectMatch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'ppt':
        return <FileText className="h-5 w-5 text-orange-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lecture-notes':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assignment':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'study-material':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'project':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? 'text-warning fill-warning'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadForm({
        title: '',
        description: '',
        category: '',
        subject: '',
        tags: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Notes & Documents Hub
              </CardTitle>
              {userRole === 'faculty' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Upload New Document</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="Document title..."
                          value={uploadForm.title}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of the document..."
                          value={uploadForm.description}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={uploadForm.category} onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lecture-notes">Lecture Notes</SelectItem>
                              <SelectItem value="assignment">Assignment</SelectItem>
                              <SelectItem value="study-material">Study Material</SelectItem>
                              <SelectItem value="project">Project</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Subject</Label>
                          <Select value={uploadForm.subject} onValueChange={(value) => setUploadForm(prev => ({ ...prev, subject: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Data Structures">Data Structures</SelectItem>
                              <SelectItem value="Web Development">Web Development</SelectItem>
                              <SelectItem value="Database Systems">Database Systems</SelectItem>
                              <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          placeholder="e.g., algorithms, trees, sorting"
                          value={uploadForm.tags}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                        />
                      </div>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports PDF, DOC, PPT, and image files up to 10MB
                        </p>
                        <Button variant="outline" className="mt-4">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? 'Uploading...' : 'Upload Document'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents, tags, or content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="lecture-notes">Lecture Notes</SelectItem>
                      <SelectItem value="assignment">Assignments</SelectItem>
                      <SelectItem value="study-material">Study Materials</SelectItem>
                      <SelectItem value="project">Projects</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="Data Structures">Data Structures</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Database Systems">Database Systems</SelectItem>
                      <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Documents Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1">{doc.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={`text-xs ${getCategoryColor(doc.category)}`}>
                              {doc.category.replace('-', ' ')}
                            </Badge>
                            <span className="text-xs text-muted-foreground">v{doc.version}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {doc.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {doc.uploadedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {doc.uploadDate}
                          </span>
                        </div>
                        <span>{doc.size}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <StarRating rating={doc.rating} />
                          <span className="text-xs text-muted-foreground">
                            {doc.rating.toFixed(1)} ({doc.downloads} downloads)
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Library Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Documents</span>
                  <span className="text-sm font-medium">{documents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <span className="text-sm font-medium">12 new</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Most Downloaded</span>
                  <span className="text-sm font-medium">203 times</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg Rating</span>
                  <span className="text-sm font-medium">4.7/5</span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['algorithms', 'database', 'react', 'javascript', 'ml', 'sql', 'trees', 'graphs'].map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2">
                    {getFileIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium line-clamp-1">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}