// NOTE: if this is a hook can not call this from a function that is based on button onclick or onsubmit or other event or other normal function directly. we can use usestate to store user event and based on that custom event handler function can be called but it make unnecessary rendering because some api request not change visual or any other continuous connection rather only add or remove data from database. i can always call this function from useEffect wherever useEffect is needed.

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

  let data;
  try {
    const res = await fetch(`/api/v1${url}`, aditionalInfo);
    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  return data;
}

export default apiRequest;
