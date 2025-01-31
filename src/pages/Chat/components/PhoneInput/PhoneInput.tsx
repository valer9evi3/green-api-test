import { memo, useState } from 'react';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher';
import Phone from '@/assets/icons/phone.svg?react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setRecipientPhone } from '@/store/slices/chatSlice';

function PhoneInput() {
  const [phoneInput, setPhoneInput] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
  };

  const handleSetPhone = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setRecipientPhone(phoneInput));
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <div className='flex items-center justify-between mb-8'>
          <Phone className='w-12 h-12 fill-green-600' />
          <LanguageSwitcher />
        </div>
        <form onSubmit={handleSetPhone}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              {t('chat.recipientPhone')}
            </label>
            <input
              type='tel'
              key={'tel'}
              pattern='\d{11}'
              value={phoneInput}
              onChange={handlePhoneInputChange}
              placeholder={t('chat.phonePlaceholder')}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors'
          >
            {t('chat.startChat')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(PhoneInput);
