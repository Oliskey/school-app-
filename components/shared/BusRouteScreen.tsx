

import React from 'react';
import { HomeIcon, PhoneIcon, BusVehicleIcon } from '../../constants';
import { mockDriver, mockPickupPoints } from '../../data';

const BusRouteScreen: React.FC = () => {

  const DriverInfoCard = () => (
    <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center space-x-4 border border-gray-200/50">
      <img src={mockDriver.avatarUrl} alt={mockDriver.name} className="w-16 h-16 rounded-full object-cover border-4 border-white/50" />
      <div className="flex-grow">
        <p className="font-bold text-lg text-gray-800">{mockDriver.name}</p>
        <p className="text-sm text-gray-600">{mockDriver.phone}</p>
      </div>
      <a 
        href={`tel:${mockDriver.phone}`} 
        className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition-colors"
        aria-label="Call driver"
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-green-50">
      <style>{`
        @keyframes drive-bus {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .bus-animation {
          offset-path: path('M35,40 C100,150 150,-20 250,80 S300,250 250,300 S150,220 50,350');
          animation: drive-bus 25s linear infinite;
        }
      `}</style>
      
      {/* Map Area */}
      <div className="flex-grow relative overflow-hidden">
        {/* Simplified Map Background */}
        <div className="absolute inset-0 bg-green-100 opacity-50">
           <div className="absolute top-1/4 left-0 w-full h-2 bg-green-200/50"></div>
           <div className="absolute top-1/2 left-1/4 w-2 h-full bg-green-200/50"></div>
           <div className="absolute top-2/3 right-0 w-1/2 h-2 bg-green-200/50"></div>
        </div>

        {/* SVG Path for the bus route (invisible, used for animation) */}
        <svg width="0" height="0">
          <path 
            id="bus-route-path" 
            d="M35,40 C100,150 150,-20 250,80 S300,250 250,300 S150,220 50,350" 
            fill="none" 
            stroke="none"
          />
        </svg>

        {/* Visible Route Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 500">
          <path
              d="M35,40 C100,150 150,-20 250,80 S300,250 250,300 S150,220 50,350"
              fill="none"
              stroke="#4a90e2"
              strokeWidth="5"
              strokeDasharray="10 5"
              strokeLinecap="round"
          />
        </svg>

        {/* Pickup Points */}
        {mockPickupPoints.map(point => (
          <div key={point.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ top: point.position.top, left: point.position.left }}>
            <div className={`p-1.5 rounded-full shadow-md flex items-center justify-center ${point.isUserStop ? 'bg-red-500 animate-pulse' : 'bg-white'}`}>
              <HomeIcon className={point.isUserStop ? 'h-5 w-5 text-white' : 'h-5 w-5 text-gray-700'} />
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-800 bg-white/50 px-1 rounded whitespace-nowrap">{point.name}</span>
          </div>
        ))}

        {/* Animated Bus */}
        <div className="absolute bus-animation">
          <BusVehicleIcon className="text-orange-500 -rotate-45" />
        </div>

        {/* Driver Card */}
        <DriverInfoCard />
      </div>
    </div>
  );
};

export default BusRouteScreen;
