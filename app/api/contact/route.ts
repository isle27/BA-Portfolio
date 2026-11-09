import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  topic: z.string().trim().min(1, "Choose a topic.").max(80),
  message: z.string().trim().min(20, "Add a little more detail (at least 20 characters).").max(3000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  const result = inquirySchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please check the form fields.", fieldErrors: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return NextResponse.json(
      { error: "Inquiry storage is not configured. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const sql = neon(connectionString);
    await sql`INSERT INTO contact_inquiries (name, email, topic, message)
      VALUES (${result.data.name}, ${result.data.email}, ${result.data.topic}, ${result.data.message})`;
  } catch (error) {
    console.error("Could not save contact inquiry:", error);
    return NextResponse.json(
      { error: "Your message could not be saved right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
