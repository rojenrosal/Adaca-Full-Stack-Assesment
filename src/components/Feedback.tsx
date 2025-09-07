import { Loader2, AlertCircle } from "lucide-react";

export const Loading = () => (
  <div className="flex items-center justify-center py-6 text-sky-600">
    <Loader2 className="h-6 w-6 animate-spin mr-2" />
    <span className="text-sm font-medium">Loading...</span>
  </div>
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center py-6 text-red-600">
    <AlertCircle className="h-5 w-5 mr-2" />
    <span className="text-sm font-medium">{message}</span>
  </div>
);
