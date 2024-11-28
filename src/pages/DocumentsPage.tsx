//import React from 'react';
import { FileText, Download, Clock, CheckCircle2 } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  status: 'pending' | 'approved' | 'expired';
  size: string;
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Flight Operations Manual',
    category: 'Operations',
    lastUpdated: '2024-03-15',
    status: 'approved',
    size: '2.4 MB'
  },
  {
    id: '2',
    title: 'Emergency Procedures Handbook',
    category: 'Safety',
    lastUpdated: '2024-03-10',
    status: 'approved',
    size: '1.8 MB'
  },
  {
    id: '3',
    title: 'Training Records Template',
    category: 'Training',
    lastUpdated: '2024-03-01',
    status: 'pending',
    size: '500 KB'
  }
];

export function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">Training Documents</h2>
        <p className="mt-2 text-sm text-gray-500">
          Access and manage your training documentation and certificates
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6">
          <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Document
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Last Updated
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Size
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="font-medium text-gray-900">{doc.title}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {doc.category}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {doc.lastUpdated}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : doc.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {doc.size}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Download className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}