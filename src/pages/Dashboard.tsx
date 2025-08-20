import { motion } from "framer-motion";
import { 
  Search, 
  Send, 
  Calendar, 
  TrendingUp, 
  Play, 
  Bot,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

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

export default function Dashboard() {
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentLogs, setAgentLogs] = useState([
    { id: 1, message: "Agent initialized", status: "success", time: "09:00 AM" },
    { id: 2, message: "Searching for jobs...", status: "pending", time: "09:01 AM" },
    { id: 3, message: "Found 12 matching positions", status: "success", time: "09:02 AM" },
  ]);

  const startAgent = () => {
    setIsAgentRunning(true);
    // Simulate agent activity
    setTimeout(() => {
      setAgentLogs(prev => [...prev, 
        { id: prev.length + 1, message: "Agent started successfully", status: "success", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      ]);
    }, 1000);
  };

  const stopAgent = () => {
    setIsAgentRunning(false);
    setAgentLogs(prev => [...prev, 
      { id: prev.length + 1, message: "Agent stopped", status: "info", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your AI agent's job search progress</p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            className={`font-semibold px-6 ${
              isAgentRunning 
                ? "bg-destructive hover:bg-destructive/90" 
                : "bg-gradient-hero hover:opacity-90"
            }`}
            onClick={isAgentRunning ? stopAgent : startAgent}
          >
            {isAgentRunning ? (
              <>
                <XCircle className="w-5 h-5 mr-2" />
                Stop Agent
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Agent
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs Found</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">127</div>
              <p className="text-xs text-muted-foreground">
                +12 from yesterday
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">43</div>
              <p className="text-xs text-muted-foreground">
                +8 from yesterday
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">5</div>
              <p className="text-xs text-muted-foreground">
                2 scheduled this week
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">34%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Agent Status & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Agent Status
              </CardTitle>
              <CardDescription>
                Current activity and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  isAgentRunning 
                    ? "bg-success-light text-success-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isAgentRunning ? "bg-success animate-pulse" : "bg-muted-foreground"
                  }`} />
                  {isAgentRunning ? "Active" : "Inactive"}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Daily Progress</span>
                  <span>8/10 applications</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Weekly Goal</span>
                  <span>43/50 applications</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Activity Log
              </CardTitle>
              <CardDescription>
                Recent agent activities and status updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {agentLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      log.status === "success" ? "bg-success" :
                      log.status === "pending" ? "bg-warning animate-pulse" :
                      log.status === "error" ? "bg-destructive" : "bg-primary"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}