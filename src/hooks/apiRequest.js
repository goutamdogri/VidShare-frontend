async function apiRequest(url, method, header, body) {
  const aditionalInfo = {
    credentials: "include",
    method: "GET",
  };

  if (method) {
    aditionalInfo.method = method.toUpperCase();
  }

  if (header) {
    aditionalInfo.headers = header;
  }

  if (body) {
    aditionalInfo.body = body;
  }
// https://vidshareforbackend.goutamdogri.com
// http://localhost:8000
  try {
    const res = await fetch(`https://vidshareforbackend.goutamdogri.com/api/v1${url}`, aditionalInfo);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: error.message };
  }
}

export default apiRequest;
