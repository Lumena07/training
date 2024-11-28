import { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, Users, MessageSquare } from 'lucide-react';

interface VirtualClassroomProps {
  url: string;
}

export function VirtualClassroom({ url: _url }: VirtualClassroomProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div className="space-y-4">
      <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg">
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="bg-gray-800 rounded-lg"></div>
          <div className="bg-gray-800 rounded-lg"></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full ${
              isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3 rounded-full ${
              !isVideoOn ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="flex space-x-4">
          <button className="p-3 rounded-full bg-gray-100 text-gray-600">
            <Users className="h-5 w-5" />
          </button>
          <button className="p-3 rounded-full bg-gray-100 text-gray-600">
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}