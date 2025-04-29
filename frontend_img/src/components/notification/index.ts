import { toast, TypeOptions } from 'react-toastify';

export const useNotification = () => {
  function notify(message: string, level: TypeOptions = 'default') {
    toast(message, { type: level });
  }

  return {
    notify
  };
};
