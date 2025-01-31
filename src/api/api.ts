import axios from 'axios';
import { AxiosResponse } from 'axios';
import { APIResponse } from '../types';

export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  phone: string,
  message: string
) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }${idInstance}/SendMessage/${apiTokenInstance}`,
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
    // Create a timeout promise that rejects after DELAY_TIME milliseconds
    const timeoutPromise = new Promise<AxiosResponse<APIResponse>>(
      (_, reject) => {
        setTimeout(
          () => reject(new Error('Request timeout')),
          +import.meta.env.VITE_DELAY_TIME
        );
      }
    );

    // Create the actual request promise
    const requestPromise = axios.get<APIResponse>(
      `${
        import.meta.env.VITE_API_URL
      }${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );

    // Race between the timeout and the request
    const response = await Promise.race([requestPromise, timeoutPromise]);

    if (response.data) {
      // Delete the received notification
      await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }${idInstance}/DeleteNotification/${apiTokenInstance}/${
          response.data.receiptId
        }`
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
