export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { event, data } = req.body;

  console.log("🔔 Incoming Vapi event:", event, data);

  // Example: Check hotel room availability
  if (event === "conversation.message" && data.message.includes("room")) {
    const available = Math.random() > 0.5; // simulate availability check
    const reply = available
      ? "Yes, a room is available for your dates."
      : "Sorry, no rooms are available. Would you like to check other dates or hotels?";

    return res.status(200).json({ reply });
  }

  res.status(200).json({ success: true });
}

