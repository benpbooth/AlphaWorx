"use client";

import React from 'react';
import { BarChart, LineChart, PieChart, MessageCircle, Activity, AlertTriangle } from 'lucide-react';
import { UserData } from '@/lib/redis';

interface DashboardStats {
  clientId: string;
  totalCalls: number;
  activeCalls: number;
  crisisInterventions: number;
}

interface AnalyticsDashboardProps {
  userData: UserData;
  stats?: DashboardStats;
}

export default function AnalyticsDashboard({ userData, stats }: AnalyticsDashboardProps) {
  const { username, createdAt, analytics } = userData;

  // Mock data for recent calls
  const recentCalls = [
    { id: 1, date: '2025-08-10', duration: '5:32', status: 'Completed', type: 'Inbound' },
    { id: 2, date: '2025-08-09', duration: '2:15', status: 'Missed', type: 'Outbound' },
    { id: 3, date: '2025-08-08', duration: '8:01', status: 'Completed', type: 'Inbound' },
    { id: 4, date: '2025-08-07', duration: '4:45', status: 'Completed', type: 'Outbound' },
    { id: 5, date: '2025-08-06', duration: '1:50', status: 'Completed', type: 'Inbound' },
  ];

  const performanceMetrics = [
    { name: 'Answer Rate', value: '92%' },
    { name: 'Lead Conversion', value: '15%' },
    { name: 'Customer Satisfaction', value: '4.8/5' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Calls This Month</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.callsThisMonth}</p>
            </div>
            <BarChart className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+20.1% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
            </div>
            <LineChart className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+5.3% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Appointments Booked</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.appointmentsBooked}</p>
            </div>
            <PieChart className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+15% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900">{typeof stats?.totalCalls === 'number' ? stats.totalCalls : analytics.totalCalls}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Total calls handled by AI agents</p>
        </div>
      </div>

      {/* Live System Snapshot from API */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Calls</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCalls}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Current active sessions for {stats.clientId}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Crisis Interventions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.crisisInterventions}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Interventions logged in the period</p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Call Activity</h3>
          <div className="space-y-4">
            {recentCalls.map(call => (
              <div key={call.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{call.type} Call - {call.status}</p>
                  <p className="text-xs text-gray-500">{call.date} - {call.duration}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  call.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {call.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {performanceMetrics.map(metric => (
              <div key={metric.name} className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                <span className="text-lg font-bold text-gray-900">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Username</p>
            <p className="font-medium text-gray-900">{username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account Created</p>
            <p className="font-medium text-gray-900">{new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Plan Type</p>
            <p className="font-medium text-gray-900">Enterprise</p>
          </div>
        </div>
      </div>
    </div>
  );
}



