// import * as z from "zod"

// export const eventFormSchema = z.object({
//   title: z.string().min(3, 'Title must be at least 3 characters'),
//   description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
//   location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
//   imageUrl: z.string(),
//   startDateTime: z.date(),
//   endDateTime: z.date(),
//   categoryId: z.string(),
//   price: z.string(),
//   isFree: z.boolean(),
//   url: z.string().url()
// })

import * as z from "zod";

// Ticket Schema
const ticketSchema = z.object({
  type: z.string().nonempty("Ticket type is required"),
  price: z
    .string()
    .nonempty("Price is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Price must be a non-negative number",
    }),
  availability: z
    .string()
    .nonempty("Availability is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Availability must be a non-negative number",
    }),
});

// Event Form Schema
export const eventFormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  categoryId: z.string().nonempty("Category is required"),
  description: z.string().nonempty("Description is required"),
  imageUrl: z.string().nonempty("Image is required"),
  location: z.string().nonempty("Location is required"),
  startDateTime: z.date({
    required_error: "Start date and time are required",
  }),
  endDateTime: z.date({
    required_error: "End date and time are required",
  }),
  tickets: z
    .array(ticketSchema)
    .min(1, "At least one ticket type is required"),
});