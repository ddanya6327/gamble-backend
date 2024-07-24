async function fetchAPI(url, method, data = null) {
  let resource = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  if (data) {
    resource = { ...resource, body: JSON.stringify(data) };
  }
  const response = await fetch(`/api/${url}`, resource);

  return {
    ok: response.ok,
    status: response.status,
    data: await response.json(),
  };
}
