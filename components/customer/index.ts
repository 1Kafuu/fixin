// components/customer/index.ts
// Snackbar
export { Snackbar, SnackbarProvider, useSnackbar } from "./SnackbarNotification";

// Status
export { StatusBadge, RatingBadge } from "./StatusBadge";
export type { StatusType } from "./StatusBadge";

// Form Components
export { FormInput } from "./FormInput";
export { FormTextarea } from "./FormTextarea";
export { FormSelect } from "./FormSelect";
export { DateTimePicker } from "./DateTimePicker";
export { LocationPicker } from "./LocationPicker";
export { ImageUpload } from "./ImageUpload";
export { OrderSummary } from "./OrderSummary";
export { PaymentCountdown } from "./PaymentCountdown";

// Technician
export { TechnicianCard } from "./TechnicianCard";
export type { Technician } from "./TechnicianCard";

// Chat
export { ChatRoom } from "./ChatRoom";
export { ChatMessage } from "./ChatMessage";

// Schedule
export { ScheduleRecommendation } from "./ScheduleRecommendation";
export type { TimeSlot } from "./ScheduleRecommendation";

// Booking
export { BookingForm } from "./BookingForm";
export type { BookingFormData, BookingType } from "./BookingForm";

// Order
export { OrderDetail } from "./OrderDetail";
export { OrderCard } from "./OrderCard";

// Community
export { ContentFilterDisplay, filterContent } from "./ContentFilter";
export type { ContentFilterResult } from "./ContentFilter";
export { PostEditor } from "./PostEditor";
export type { PostData } from "./PostEditor";
