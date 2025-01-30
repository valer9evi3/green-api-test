import axios from 'axios';

export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  phone: string,
  message: string
) => {
  try {
    const response = await axios.post(
      `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      {
        chatId: `${phone}@c.us`,
        message,
      }
    );
    return response.data;
  } catch (error) {
    // Convert error to a plain object with only necessary information
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Error sending message: ${errorMessage}`);
  }
};

export const receiveMessage = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    // Create a timeout promise that rejects after 10 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000);
    });

    // Create the actual request promise
    const requestPromise = axios.get(
      `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );

    // Race between the timeout and the request
    const response = await Promise.race([requestPromise, timeoutPromise]);

    if (response.data) {
      // Delete the received notification
      await axios.delete(
        `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`
      );

      return response.data;
    }
    return null;
  } catch (error) {
    // Convert error to a plain object with only necessary information
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Error receiving message: ${errorMessage}`);
  }
};
