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

  const email = String(body.email || "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
      { status: 400 },
    );
  }

  const accessKey = getAccessKey();
  if (!accessKey) {
    return NextResponse.json(
      {
        error: `Newsletter is not configured yet. Email us at ${CONTACT_INFO.email}.`,
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
        subject: `Newsletter subscribe: ${email}`,
        from_name: "The Upward Scale Journal",
        email,
        message: `New journal newsletter subscription from ${email}`,
        form_type: "newsletter",
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok || result.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      {
        error:
          result.message || "Could not complete subscription. Try again.",
      },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to reach the mail provider. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
