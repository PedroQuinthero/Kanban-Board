import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    // Make a POST request to the login route with the user credentials
    const respone = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (!respone.ok) {
      throw new Error('Login failed');
    }
    const data = await respone.json();
    
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    return Promise.reject('Login failed. Please try again.');
  }
}



export { login };