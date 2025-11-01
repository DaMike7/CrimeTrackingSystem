import React from 'react';
import { LocateFixed } from 'lucide-react';

export default function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Top Navigation Skeleton */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-2">
                <LocateFixed className="text-gray-200" size={28} />
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="hidden sm:block w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block w-64 h-10 bg-gray-200 rounded-lg"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block w-64 bg-white shadow-lg">
          <div className="p-6">
            <div className="w-32 h-6 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="w-64 h-8 bg-gray-200 rounded mb-2"></div>
              <div className="w-96 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                  <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Main Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* User Management Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="w-40 h-6 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-6 bg-gray-100 rounded-xl">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crime Reports Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="w-40 h-6 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-6 bg-gray-100 rounded-xl">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Analytics & Recent Reports Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Data Analytics Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="w-40 h-6 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-6 bg-gray-100 rounded-xl">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Skeleton */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-40 h-6 bg-gray-200 rounded"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-24 h-4 bg-gray-200 rounded"></div>
                        <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="w-48 h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Settings Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <div className="w-40 h-6 bg-gray-200 rounded mb-6"></div>
              <div className="flex items-center gap-3 px-6 py-4 bg-gray-100 rounded-xl w-full sm:w-64">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}