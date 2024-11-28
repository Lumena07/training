import { useState } from 'react';
import { Calendar, Clock, Users, Video } from 'lucide-react';

interface ScheduledSession {
  id: string;
  title: string;
  type: 'virtual' | 'practical';
  instructor: string;
  date: string;
  time: string;
  duration: number;
}

const mockSessions: ScheduledSession[] = [
  {
    id: '1',
    title: 'Emergency Procedures Training',
    type: 'virtual',
    instructor: 'Capt. Sarah Johnson',
    date: '2024-03-20',
    time: '09:00',
    duration: 120,
  },
  {
    id: '2',
    title: 'Practical Flight Training',
    type: 'practical',
    instructor: 'Capt. Michael Chen',
    date: '2024-03-22',
    time: '14:00',
    duration: 180,
  },
];

export function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">Training Schedule</h2>
        <p className="mt-2 text-sm text-gray-500">
          View and manage your upcoming training sessions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Upcoming Sessions</h3>
              <div className="space-y-6">
                {mockSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {session.type === 'virtual' ? (
                        <Video className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Users className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium">{session.title}</h4>
                      <p className="text-sm text-gray-500">
                        Instructor: {session.instructor}
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.time}
                        </div>
                        <div className="text-sm text-gray-500">
                          {session.duration} minutes
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Schedule New Session</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Type
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Virtual Class</option>
                <option>Practical Training</option>
                <option>Assessment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Schedule Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}