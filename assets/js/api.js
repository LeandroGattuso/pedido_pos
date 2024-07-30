
const apiUrl = 'http://server1.myasp1234.tech:5701/v1/';

//LG: funcion para el login
async function authenticate(app, config, username, password) {
  const endpoint = 'auth';
  const authData = {
    app,
    config,
    username,
    password
  };

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    });

    if (!response.ok) {
      throw new Error('Error de conexión login API');
    }

    const responseData = await response.json();

    return responseData; 
  } catch (error) {
    console.error('Error en login API:', error);
  }
}

//LG: metodos get, put, post, delete *************************************************************
async function getData(endpoint, token) {
  try {
    const response = await fetch(`${apiUrl}class/${endpoint}?limit=500`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error('Error de conexión get API');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error api:', error);
  }
}

async function postData(endpoint, data) {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Error de conexión post API');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error api:', error);
  }
}

async function putData(endpoint, data) {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Error de conexión put API');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error api:', error);
  }
}

async function deleteData(endpoint) {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Error de conexión delete API');
    }
    return true;
  } catch (error) {
    console.error('Error api:', error);
  }
}
