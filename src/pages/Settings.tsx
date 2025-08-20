import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Bot, 
  Clock, 
  Target, 
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Save,
  RotateCcw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

export default function Settings() {
  const [settings, setSettings] = useState({
    agent: {
      enabled: true,
      applicationsPerDay: 5,
      workingHours: {
        start: "09:00",
        end: "17:00"
      },
      schedule: "weekdays",
      pauseOnWeekends: true
    },
    targeting: {
      industries: ["Technology", "Fintech", "Healthcare"],
      jobLevels: ["Mid-level", "Senior"],
      remotePreference: "hybrid",
      locationRadius: 50
    },
    notifications: {
      emailEnabled: true,
      pushEnabled: true,
      newJobs: true,
      applications: true,
      interviews: true,
      rejections: false
    },
    privacy: {
      profileVisible: true,
      dataSharing: false,
      analyticsEnabled: true
    },
    appearance: {
      theme: "system",
      compactMode: false
    }
  });

  const handleSave = () => {
    // Save settings logic
    console.log("Settings saved:", settings);
  };

  const handleReset = () => {
    // Reset to defaults
    console.log("Settings reset to defaults");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your AI agent and preferences</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* AI Agent Settings */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Agent Configuration
              </CardTitle>
              <CardDescription>
                Configure how your AI agent searches and applies for jobs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable AI Agent</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow the agent to automatically search and apply
                  </p>
                </div>
                <Switch
                  checked={settings.agent.enabled}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      agent: { ...prev.agent, enabled: checked }
                    }))
                  }
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Applications per day: {settings.agent.applicationsPerDay}</Label>
                <Slider
                  value={[settings.agent.applicationsPerDay]}
                  onValueChange={(value) =>
                    setSettings(prev => ({
                      ...prev,
                      agent: { ...prev.agent, applicationsPerDay: value[0] }
                    }))
                  }
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Recommended: 3-10 applications per day for best results
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={settings.agent.workingHours.start}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        agent: {
                          ...prev.agent,
                          workingHours: { ...prev.agent.workingHours, start: e.target.value }
                        }
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={settings.agent.workingHours.end}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        agent: {
                          ...prev.agent,
                          workingHours: { ...prev.agent.workingHours, end: e.target.value }
                        }
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Schedule</Label>
                <Select
                  value={settings.agent.schedule}
                  onValueChange={(value) =>
                    setSettings(prev => ({
                      ...prev,
                      agent: { ...prev.agent, schedule: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekdays">Weekdays Only</SelectItem>
                    <SelectItem value="custom">Custom Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pause on weekends</Label>
                  <p className="text-sm text-muted-foreground">
                    Pause agent activity during weekends
                  </p>
                </div>
                <Switch
                  checked={settings.agent.pauseOnWeekends}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      agent: { ...prev.agent, pauseOnWeekends: checked }
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Targeting */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Job Targeting
              </CardTitle>
              <CardDescription>
                Define what types of jobs the AI should target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Target Industries</Label>
                <div className="flex flex-wrap gap-2">
                  {settings.targeting.industries.map((industry) => (
                    <Badge key={industry} variant="secondary">
                      {industry}
                      <button
                        onClick={() =>
                          setSettings(prev => ({
                            ...prev,
                            targeting: {
                              ...prev.targeting,
                              industries: prev.targeting.industries.filter(i => i !== industry)
                            }
                          }))
                        }
                        className="ml-2 text-xs hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input placeholder="Add industry..." />
              </div>

              <div className="space-y-3">
                <Label>Job Levels</Label>
                <div className="flex flex-wrap gap-2">
                  {["Entry-level", "Mid-level", "Senior", "Lead", "Executive"].map((level) => (
                    <Badge
                      key={level}
                      variant={settings.targeting.jobLevels.includes(level) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        setSettings(prev => ({
                          ...prev,
                          targeting: {
                            ...prev.targeting,
                            jobLevels: prev.targeting.jobLevels.includes(level)
                              ? prev.targeting.jobLevels.filter(l => l !== level)
                              : [...prev.targeting.jobLevels, level]
                          }
                        }))
                      }
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Remote Work Preference</Label>
                <Select
                  value={settings.targeting.remotePreference}
                  onValueChange={(value) =>
                    setSettings(prev => ({
                      ...prev,
                      targeting: { ...prev.targeting, remotePreference: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote Only</SelectItem>
                    <SelectItem value="hybrid">Hybrid/Flexible</SelectItem>
                    <SelectItem value="onsite">On-site Only</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Location Radius: {settings.targeting.locationRadius} miles</Label>
                <Slider
                  value={[settings.targeting.locationRadius]}
                  onValueChange={(value) =>
                    setSettings(prev => ({
                      ...prev,
                      targeting: { ...prev.targeting, locationRadius: value[0] }
                    }))
                  }
                  max={200}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure when and how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.emailEnabled}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailEnabled: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive browser notifications
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.pushEnabled}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, pushEnabled: checked }
                    }))
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Notification Types</Label>
                
                {[
                  { key: "newJobs", label: "New job matches", description: "When new relevant jobs are found" },
                  { key: "applications", label: "Application updates", description: "When applications are sent or updated" },
                  { key: "interviews", label: "Interview invitations", description: "When interviews are scheduled" },
                  { key: "rejections", label: "Rejection notifications", description: "When applications are rejected" }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{notification.label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications[notification.key as keyof typeof settings.notifications] as boolean}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [notification.key]: checked }
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to recruiters
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, profileVisible: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymized data to improve the service
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.dataSharing}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, dataSharing: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable usage analytics for better insights
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.analyticsEnabled}
                  onCheckedChange={(checked) =>
                    setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, analyticsEnabled: checked }
                    }))
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value) =>
                      setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, theme: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact interface layout
                    </p>
                  </div>
                  <Switch
                    checked={settings.appearance.compactMode}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, compactMode: checked }
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}