import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import type { FormData } from '../../types/FormTypes';
import styles from '../../styles/FormBase.module.css';
import { MAX_TEXT_LENGTH } from '../../constants/validationMessages';

const locationOptions = ['בסיס', 'שטח אזרחי', 'שטח אש', 'רציף', 'אוויר'];
const weatherOptions = ['בהיר', 'מעונן חלקית', 'מעונן', 'גשום', 'סוער', 'ערפל', 'שלג', 'חם', 'קר'];

interface LeftColumnProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  getCharCounterClass: (length: number) => string;
}

export default function LeftColumn({
  register,
  errors,
  watch,
  setValue,
  getCharCounterClass
}: LeftColumnProps) {
  const locationDescriptionValue = watch('locationDescription') || '';
  const locationDescriptionLength = locationDescriptionValue.length;
  const coordinates = watch('coordinates') || { latitude: '', longitude: '' };

  const handleGoogleMapsClick = () => {
    const lat = coordinates.latitude;
    const lng = coordinates.longitude;
    
    if (lat && lng) {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, '_blank');
    } else {
      alert('יש להזין קואורדינטות לפני פתיחת המפה');
    }
  };

  const handlePinPlacement = () => {
    const url = 'https://www.google.com/maps';
    window.open(url, '_blank');
  };

  return (
    <aside className={`${styles.column} ${styles.leftColumn}`} data-label="פרטי המיקום">
      <div className={styles.fieldBox}>
        <label className={styles.label}>מיקום *</label>
        <select 
          className={styles.select}
          {...register('location')}
        >
          <option value="">בחר מיקום</option>
          {locationOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.location && <span className={styles.error}>{errors.location.message}</span>}
      </div>

      <div className={styles.fieldBox}>
        <label className={styles.label}>תיאור מיקום</label>
        <textarea
          className={styles.textarea}
          style={{ minHeight: '100px', maxHeight: '150px' }}
          placeholder="תיאור מפורט של המיקום..."
          {...register('locationDescription')}
        />
        <div className={`${styles.charCounter} ${styles[getCharCounterClass(locationDescriptionLength)]}`}>
          {locationDescriptionLength}/{MAX_TEXT_LENGTH}
        </div>
        {errors.locationDescription && <span className={styles.error}>{errors.locationDescription.message}</span>}
      </div>

      <div className={styles.fieldBox}>
        <label className={styles.label}>מזג אוויר</label>
        <select 
          className={styles.select}
          {...register('weather')}
        >
          <option value="">בחר מזג אוויר</option>
          {weatherOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.weather && <span className={styles.error}>{errors.weather.message}</span>}
      </div>

      <div className={styles.fieldBox}>
        <label className={styles.label}>נ.צ. (קואורדינטות)</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
          <input
            type="number"
            className={styles.input}
            placeholder="קו רוחב (Latitude)"
            {...register('coordinates.latitude')}
          />
          <input
            type="number"
            className={styles.input}
            placeholder="קו אורך (Longitude)"
            {...register('coordinates.longitude')}
          />
        </div>
        {errors.coordinates?.latitude && <span className={styles.error}>{errors.coordinates.latitude.message}</span>}
        {errors.coordinates?.longitude && <span className={styles.error}>{errors.coordinates.longitude.message}</span>}
      </div>

      <div className={styles.fieldBox}>
        <label className={styles.label}>נעיצת סיכה במפה</label>
        <button
          type="button"
          className={styles.input}
          style={{ 
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            textAlign: 'center',
            border: 'none',
            padding: '0.5rem'
          }}
          onClick={handlePinPlacement}
        >
          🗺️ פתח גוגל מפות לנעיצת סיכה
        </button>
        <p style={{ fontSize: '0.7rem', color: '#666', margin: '0.3rem 0 0 0' }}>
          יפתח גוגל מפות לבחירת מיקום ונעיצת סיכה
        </p>
      </div>

      <div className={styles.fieldBox}>
        <label className={styles.label}>הצגת מיקום נ.צ.</label>
        <button
          type="button"
          className={styles.input}
          style={{ 
            backgroundColor: coordinates.latitude && coordinates.longitude ? '#28a745' : '#ccc',
            color: 'white',
            cursor: coordinates.latitude && coordinates.longitude ? 'pointer' : 'not-allowed',
            textAlign: 'center',
            border: 'none',
            padding: '0.5rem'
          }}
          onClick={handleGoogleMapsClick}
          disabled={!coordinates.latitude || !coordinates.longitude}
        >
          📍 הצג נ.צ. במפה
        </button>
        <p style={{ fontSize: '0.7rem', color: '#666', margin: '0.3rem 0 0 0' }}>
          זמין רק כאשר קיימות קואורדינטות תקפות
        </p>
      </div>
    </aside>
  );
}