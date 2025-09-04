import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { FormData } from '../../types/FormTypes';
import { categorySubOptions } from '../../data/options';
import styles from './FormBase.module.css';
import { useRef } from 'react';

interface RightColumnProps {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  validationRules: any;
  getCharCounterClass: (length: number) => string;
  textLength: number;
  unitOptions: string[];
  unitActivityOptions: string[];
  activityOptions: string[];
  categoryOptions: string[];
}

export default function RightColumn({
  register,
  watch,
  setValue,
  errors,
  validationRules,
  getCharCounterClass,
  textLength,
  unitOptions,
  unitActivityOptions,
  activityOptions,
  categoryOptions
}: RightColumnProps) {
  const selectedCategory = watch('category');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (category: string) => {
    setValue('category', category);
    setValue('categorySubOptions', '');
    setValue('subCategoryOptions', '');
  };

  const preventKeyboardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault(); // מונע הקלדה ידנית
  };

  return (
    <aside className={`${styles.column} ${styles.rightColumn}`} data-label="פרטים אישיים">
      {/*    יחידת משנה */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>יחידת משנה *</label>
        <select 
          className={styles.select}
          {...register('name_of_unity', validationRules.name_of_unity)}
        >
          <option value="">בחר יחידת משנה</option>
          {unitOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.name_of_unity && <span className={styles.error}>{errors.name_of_unity.message}</span>}
      </div>

      {/* תאריך */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>תאריך *</label>
        <input
          type="date"
          className={`${styles.input} ${styles.dateInput}`}
          ref={dateInputRef}
          onKeyDown={preventKeyboardInput} // מונע הקלדה ידנית
          {...register('date', validationRules.date)}
        />
        {errors.date && <span className={styles.error}>{errors.date.message}</span>}
      </div>

      {/* מאפיין פעילות יחידה */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>מאפיין פעילות יחידה *</label>
        <select 
          className={styles.select}
          {...register('unitActivityType', validationRules.unitActivityType)}
        >
          <option value="">בחר מאפיין פעילות יחידה</option>
          {unitActivityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.unitActivityType && <span className={styles.error}>{errors.unitActivityType.message}</span>}
      </div>

      {/* מאפיין פעילות פרט */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>מאפיין פעילות פרט *</label>
        <select 
          className={styles.select}
          {...register('activityType', validationRules.activityType)}
        >
          <option value="">בחר מאפיין פעילות פרט</option>
          {activityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.activityType && <span className={styles.error}>{errors.activityType.message}</span>}
      </div>

      {/* מאפיין פעילות תחומי */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>מאפיין פעילות תחומי *</label>
        <select 
          className={styles.select}
          {...register('category', validationRules.category)}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">בחר מאפיין פעילות תחומי</option>
          {categoryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.category && <span className={styles.error}>{errors.category.message}</span>}
      </div>

      {/* תיאור מפורט */}
      <div className={styles.fieldBox} style={{ minHeight: '120px' }}>
        <label className={styles.label}>תיאור מפורט *</label>
        <textarea
          className={styles.textarea}
          style={{ minHeight: '175px', maxHeight: '150px' }}
          placeholder="תיאור מפורט של האירוע..."
          {...register('text', validationRules.text)}
        />
        <div className={`${styles.charCounter} ${styles[getCharCounterClass(textLength)]}`}>
          {textLength}/800
        </div>
        {errors.text && <span className={styles.error}>{errors.text.message}</span>}
      </div>
    </aside>
  );
}