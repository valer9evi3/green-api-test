import React, { useState } from 'react';
import LogIn from '../assets/icons/login.svg?react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Login: React.FC = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ idInstance, apiTokenInstance }));
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <div className='flex items-center justify-between mb-8'>
          <LogIn className='w-12 h-12 fill-green-600' />
          <LanguageSwitcher />
        </div>
        <h2 className='text-2xl font-bold text-center mb-6'>
          {t('login.title')}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              {t('login.login')}
            </label>
            <input
              type='text'
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder={t('login.idInstance')}
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              {t('login.password')}
            </label>
            <input
              type='password'
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder={t('login.apiTokenInstance')}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors'
          >
            {t('login.loginButton')}
          </button>
        </form>
      </div>
    </div>
  );
};
