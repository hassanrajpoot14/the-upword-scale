import { NextResponse } from "next/server";
import { CONTACT_INFO } from "../../../src/data/contactInfo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getAccessKey() {
  return (
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    ""
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || body.details || "").trim();
  const service = body.service ? String(body.service).trim() : "";
  const budget = body.budget ? String(body.budget).trim() : "";
  const projectType = body.project_type
    ? String(body.project_type).trim()
    : "";
  const subject =
    String(body.subject || "").trim() ||
    `Website inquiry from ${name || "visitor"}`;

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Please provide your name." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please add a few more details (10+ characters)." },
      { status: 400 },
    );
  }

  const accessKey = getAccessKey();
  if (!accessKey) {
    return NextResponse.json(
      {
        error: `Form is not configured yet. Please email us at ${CONTACT_INFO.email}.`,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "The Upward Scale Website",
        name,
        email,
        ...(service ? { service } : {}),
        ...(budget ? { budget } : {}),
        ...(projectType ? { project_type: projectType } : {}),
        message,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok || result.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      {
        error:
          result.message ||
          "An error occurred while submitting your request.",
      },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to connect to the mail provider. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
