
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchApi } from '../lib/api';
import { t } from '../lib/translations';

interface Location {
  id: string;
  name: string;
  isDefault: boolean | null;
}

interface User {
  name: string;
  id: string;
}

interface AppContextType {
  user: User | null;
  locations: Location[];
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const locationId = localStorage.getItem('locationId');
    
    if (token && userStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);
        setIsAuthenticated(true);
        fetchLocations();
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      const locationId = localStorage.getItem('locationId');
      const location = locations.find(loc => loc.id === locationId) || 
                       locations.find(loc => loc.isDefault) || 
                       locations[0];
      
      if (location) {
        setSelectedLocation(location);
        localStorage.setItem('locationId', location.id);
      }
      setLoading(false);
    }
  }, [locations]);

  const fetchLocations = async () => {
    try {
      const locationsData = await fetchApi('/Auth/GetLocation/all');
      if (Array.isArray(locationsData)) {
        setLocations(locationsData);
      } else {
        console.error('Invalid locations data format:', locationsData);
        setLocations([]);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetchApi('/Auth', {
        method: 'POST',
        body: {
          username,
          password,
          grantType: 'password',
          audience: 'string',
          serialNo: 'string',
          refreshToken: 'string'
        }
      });
      
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      
      // Extract user data from JWT token or fetch separately
      // For demo, we'll create a simple user object
      const user = { name: username, id: '1' };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      
      // Fetch locations after successful login
      await fetchLocations();
      
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('locationId');
    setUser(null);
    setIsAuthenticated(false);
    setLocations([]);
    setSelectedLocation(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        locations,
        selectedLocation,
        setSelectedLocation,
        isAuthenticated,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
