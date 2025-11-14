'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { StatCard } from '@/components/dashboard/stat-card';
import { ArrowLeft, Search, Users, Shield, Ban, Edit, Trash2, Mail } from 'lucide-react';
import { format } from 'date-fns';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'business_owner' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  createdAt: Date;
  lastActive: Date;
  businessesCount: number;
  reviewsCount: number;
}

export function UsersManagementContent() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('recent');

  // Mock users data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastActive: new Date('2024-01-15T14:30:00'),
      businessesCount: 0,
      reviewsCount: 5,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@sunrisecafe.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'business_owner',
      status: 'active',
      createdAt: new Date('2024-01-10'),
      lastActive: new Date('2024-01-15T12:00:00'),
      businessesCount: 1,
      reviewsCount: 12,
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'user',
      status: 'suspended',
      createdAt: new Date('2024-01-05'),
      lastActive: new Date('2024-01-10T09:15:00'),
      businessesCount: 0,
      reviewsCount: 3,
    },
    {
      id: '4',
      name: 'Admin User',
      email: 'admin@midtownbook.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2023-12-01'),
      lastActive: new Date('2024-01-15T15:00:00'),
      businessesCount: 0,
      reviewsCount: 0,
    },
  ];

  const stats = {
    totalUsers: 1247,
    activeUsers: 1189,
    businessOwners: 342,
    suspended: 58,
  };

  const filterUsers = (users: User[]) => {
    let filtered = [...users];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'active') {
        filtered = filtered.filter((u) => u.status === 'active');
      } else if (activeTab === 'business_owners') {
        filtered = filtered.filter((u) => u.role === 'business_owner');
      } else if (activeTab === 'suspended') {
        filtered = filtered.filter((u) => u.status === 'suspended' || u.status === 'banned');
      }
    }

    // Sort users
    if (sortBy === 'recent') {
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'activity') {
      filtered.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime());
    }

    return filtered;
  };

  const filteredUsers = filterUsers(mockUsers);

  const handleSuspend = async (userId: string) => {
    // TODO: Implement Supabase user suspension
    console.log('Suspend user:', userId);
  };

  const handleDelete = async (userId: string) => {
    // TODO: Implement Supabase user deletion
    console.log('Delete user:', userId);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'business_owner':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'suspended':
        return 'warning';
      case 'banned':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
            User Management
          </h1>
          <p className="text-body-md text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon={Users} variant="default" />
          <StatCard title="Active Users" value={stats.activeUsers.toLocaleString()} icon={Users} variant="success" />
          <StatCard title="Business Owners" value={stats.businessOwners} icon={Shield} variant="primary" />
          <StatCard title="Suspended" value={stats.suspended} icon={Ban} variant="warning" />
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="activity">Last Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line">
            <TabsTrigger value="all">All Users ({mockUsers.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({mockUsers.filter((u) => u.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="business_owners">Business Owners ({mockUsers.filter((u) => u.role === 'business_owner').length})</TabsTrigger>
            <TabsTrigger value="suspended">Suspended ({mockUsers.filter((u) => u.status !== 'active').length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-heading-sm font-serif text-neutral-600">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-body-md">{user.name}</h3>
                            <p className="text-body-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={getRoleBadgeVariant(user.role) as any}>
                              {user.role.replace('_', ' ')}
                            </Badge>
                            <Badge variant={getStatusBadgeVariant(user.status) as any}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Joined</p>
                            <p className="text-body-sm">{format(user.createdAt, 'MMM d, yyyy')}</p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Last Active</p>
                            <p className="text-body-sm">{format(user.lastActive, 'MMM d, yyyy')}</p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Businesses</p>
                            <p className="text-body-sm">{user.businessesCount}</p>
                          </div>
                          <div>
                            <p className="text-label-xs text-muted-foreground mb-1">Reviews</p>
                            <p className="text-body-sm">{user.reviewsCount}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          {user.status === 'active' ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Suspend User?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will suspend the user's account. They won't be able to access the platform until reinstated.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleSuspend(user.id)}>
                                    Suspend
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Button variant="outline" size="sm">
                              Reinstate
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the user's account and all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
