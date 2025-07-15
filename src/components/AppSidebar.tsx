import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MessageSquare, 
  BarChart3,
  FileText,
  Star,
  ClipboardCheck,
  LogOut,
  Home,
  BookOpen,
  GraduationCap,
  DollarSign,
  MapPin
} from 'lucide-react';

interface AppSidebarProps {
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

const modules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview and statistics',
    icon: Home
  },
  {
    id: 'attendance',
    title: 'Attendance',
    description: 'Track your attendance',
    icon: Users
  },
  {
    id: 'courses',
    title: 'Course Management',
    description: 'Manage your courses',
    icon: GraduationCap
  },
  {
    id: 'exams',
    title: 'Exam Portal',
    description: 'Online examinations',
    icon: ClipboardCheck
  },
  {
    id: 'chat',
    title: 'Messages',
    description: 'Chat with faculty',
    icon: MessageSquare
  },
  {
    id: 'library',
    title: 'Library',
    description: 'Access library resources',
    icon: BookOpen
  },
  {
    id: 'results',
    title: 'Results',
    description: 'View academic results',
    icon: BarChart3
  },
  {
    id: 'fees',
    title: 'Financial Services',
    description: 'Fee payment and services',
    icon: DollarSign
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description: 'Course feedback system',
    icon: Star
  },
  {
    id: 'notes',
    title: 'Notes',
    description: 'Upload and manage notes',
    icon: FileText
  },
  {
    id: 'campus',
    title: 'Campus Services',
    description: 'Campus facilities and services',
    icon: MapPin
  }
];

export function AppSidebar({ activeModule, onModuleChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-sidebar-primary">EduNexus</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Academic Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                
                return (
                  <SidebarMenuItem key={module.id}>
                    <SidebarMenuButton
                      onClick={() => onModuleChange(module.id)}
                      isActive={isActive}
                      className="group relative"
                      tooltip={module.title}
                    >
                      <Icon className="h-5 w-5" />
                      {!isCollapsed && <span>{module.title}</span>}
                      {isActive && !isCollapsed && (
                        <div className="absolute right-2 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/auth" className="text-destructive hover:text-destructive">
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span>Logout</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}