import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Download,
  Building,
  MapPin,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    appliedDate: "2024-01-15",
    status: "interview",
    statusText: "Interview Scheduled",
    coverLetter: "Generated AI cover letter focusing on React expertise...",
    resume: "Customized resume highlighting frontend skills...",
    notes: "Interview scheduled for January 20th at 2 PM PT"
  },
  {
    id: 2,
    jobTitle: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $140k",
    appliedDate: "2024-01-14",
    status: "review",
    statusText: "Under Review",
    coverLetter: "AI-generated cover letter emphasizing full-stack experience...",
    resume: "Tailored resume for startup environment...",
    notes: "Application submitted through company website"
  },
  {
    id: 3,
    jobTitle: "React Developer",
    company: "WebSolutions Ltd",
    location: "New York, NY",
    salary: "$90k - $120k",
    appliedDate: "2024-01-13",
    status: "applied",
    statusText: "Application Sent",
    coverLetter: "Personalized cover letter for React position...",
    resume: "React-focused resume customization...",
    notes: "Applied via LinkedIn"
  },
  {
    id: 4,
    jobTitle: "Software Engineer",
    company: "BigTech Co",
    location: "Seattle, WA",
    salary: "$130k - $170k",
    appliedDate: "2024-01-10",
    status: "rejected",
    statusText: "Not Selected",
    coverLetter: "AI cover letter for software engineering role...",
    resume: "Backend-focused resume version...",
    notes: "Received rejection email on January 18th"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "applied":
      return <Clock className="w-4 h-4" />;
    case "review":
      return <AlertCircle className="w-4 h-4" />;
    case "interview":
      return <CheckCircle className="w-4 h-4" />;
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "status-applied";
    case "review":
      return "status-review";
    case "interview":
      return "status-interview";
    case "rejected":
      return "status-rejected";
    default:
      return "status-applied";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Applications() {
  const [applications] = useState(mockApplications);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredApplications = selectedStatus === "all" 
    ? applications 
    : applications.filter(app => app.status === selectedStatus);

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === "applied").length,
    review: applications.filter(app => app.status === "review").length,
    interview: applications.filter(app => app.status === "interview").length,
    rejected: applications.filter(app => app.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Application Manager</h1>
        <p className="text-muted-foreground">Track your applications and their progress</p>
      </div>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <motion.div variants={itemVariants}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
              <p className="text-xs text-muted-foreground">Applied</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">{stats.review}</div>
              <p className="text-xs text-muted-foreground">Under Review</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">{stats.interview}</div>
              <p className="text-xs text-muted-foreground">Interviews</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Filter Tabs */}
      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="applied">Applied ({stats.applied})</TabsTrigger>
          <TabsTrigger value="review">Review ({stats.review})</TabsTrigger>
          <TabsTrigger value="interview">Interview ({stats.interview})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="mt-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredApplications.map((application) => (
              <motion.div key={application.id} variants={itemVariants}>
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{application.jobTitle}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {application.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {application.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {application.salary}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`status-badge ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.statusText}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{application.jobTitle}</DialogTitle>
                              <DialogDescription>
                                Application details for {application.company}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Cover Letter</h4>
                                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                                  {application.coverLetter}
                                </p>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Resume</h4>
                                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                                  {application.resume}
                                </p>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Notes</h4>
                                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                                  {application.notes}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}