export const userService = {
  getTransactions,
  Signup,
  getProfile,
  stripeCheckout,
};

async function getTransactions() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    "https://run.mocky.io/v3/5ca728be-3589-469a-814a-d8471cd699fa",
    requestOptions
  );

  return await handleResponse(response);
}

async function Signup() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    } /* Give the required headers here */,
  };

  const response = await fetch(
    "https://nkalari-back-week-1-rel-mixxoh.herokuapp.com/api/users/signup",
    requestOptions
  );

  return await handleResponse(response);
}

async function getProfile() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    } /* Give the required headers here */,
  };

  const response = await fetch(
    "https://run.mocky.io/v3/73121e85-83ef-4518-9e28-8fad20fa3a84",
    requestOptions
  );

  return await handleResponse(response);
}

async function stripeCheckout(price_id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT",
      "Access-Control-Allow-Headers": "Content-Type",
      authorization: localStorage.getItem("nkalari"),
    } /* Give the required headers here */,
  };

  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/api/transactions/create-stripe-api?price_id=` +
      price_id,
    requestOptions
  );

  return await handleResponse(response);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        //   logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
