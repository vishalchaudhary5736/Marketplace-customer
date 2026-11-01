import z from "zod";

export const updateSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().optional(),
  dob: z.union([
    z.literal(""),
    z.iso
      .date("Enter a valid date")
      .refine(
        (v) => new Date(v) <= new Date(),
        "Date of birth can't be in the future",
      )
      .refine((v) => {
        const d = new Date(v);
        const limit = new Date();
        limit.setFullYear(limit.getFullYear() - 13);
        return d <= limit;
      }, `You must be at least 13 years old`)
      .refine((v) => new Date(v).getFullYear() >= 1990, "Enter a valid date"),
  ]),
  gender: z.string().trim().min(2, "Gender is required"),
  avatarUrl: z.string().trim(),
});

export type updateProfileFormValues = z.infer<typeof updateSchema>;
