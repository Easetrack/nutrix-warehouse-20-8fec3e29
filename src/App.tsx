
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SidebarNav from "./components/SidebarNav";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectWarehouse from "./pages/SelectWarehouse";
import Dashboard from "./pages/Dashboard";
import StockUpdate from "./pages/StockUpdate";
import ShipmentPlan from "./pages/ShipmentPlan";
import PickOrders from "./pages/PickOrders";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// New pages
import Receiving from "./pages/Receiving";
import RequestPicking from "./pages/RequestPicking";
import PackingPTW from "./pages/PackingPTW";

// Settings subpages
import ProductSettings from "./pages/settings/Product";
import LocationSettings from "./pages/settings/Location";
import DepartmentSettings from "./pages/settings/Department";
import CustomerSettings from "./pages/settings/Customer";
import VendorSettings from "./pages/settings/Vendor";
import TransactionModelSettings from "./pages/settings/TransactionModel";
import LotModelSettings from "./pages/settings/LotModel";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const selectedWarehouse = localStorage.getItem('selectedWarehouse');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!selectedWarehouse) {
    return <Navigate to="/select-warehouse" replace />;
  }
  
  return (
    <SidebarNav>
      {children}
    </SidebarNav>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/select-warehouse" element={<SelectWarehouse />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/stock" element={
              <ProtectedRoute>
                <StockUpdate />
              </ProtectedRoute>
            } />
            <Route path="/shipment" element={
              <ProtectedRoute>
                <ShipmentPlan />
              </ProtectedRoute>
            } />
            <Route path="/pick-orders" element={
              <ProtectedRoute>
                <PickOrders />
              </ProtectedRoute>
            } />
            
            {/* New Routes */}
            <Route path="/receiving" element={
              <ProtectedRoute>
                <Receiving />
              </ProtectedRoute>
            } />
            <Route path="/request-picking" element={
              <ProtectedRoute>
                <RequestPicking />
              </ProtectedRoute>
            } />
            <Route path="/packing-ptw" element={
              <ProtectedRoute>
                <PackingPTW />
              </ProtectedRoute>
            } />
            
            {/* Settings Routes */}
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/settings/product" element={
              <ProtectedRoute>
                <ProductSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/location" element={
              <ProtectedRoute>
                <LocationSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/department" element={
              <ProtectedRoute>
                <DepartmentSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/customer" element={
              <ProtectedRoute>
                <CustomerSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/vendor" element={
              <ProtectedRoute>
                <VendorSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/transaction-model" element={
              <ProtectedRoute>
                <TransactionModelSettings />
              </ProtectedRoute>
            } />
            <Route path="/settings/lot-model" element={
              <ProtectedRoute>
                <LotModelSettings />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
