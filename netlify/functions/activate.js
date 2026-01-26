exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // The "Language Barrier" Fix:
    // We must tell Lemon Squeezy we are sending JSON data.
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json" // <--- This was the fix!
      },
      body: event.body // Pass the JSON straight through
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
