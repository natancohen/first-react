import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { FormData } from '../../types/FormTypes';
import { categorySubOptions } from '../../data/options';
import styles from './FormBase.module.css';

interface MiddleColumnProps {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  validationRules: any;
  eventSeverityOptions: string[];
  eventOutcomeOptions: string[];
  damageSeverityOptions: string[];
  eventOutcome: string;
  setShowCasualtiesModal: (show: boolean) => void;
  fieldsLength: number;
  getCharCounterClass: (length: number) => string;
}

export default function MiddleColumn({
  register,
  watch,
  setValue,
  errors,
  validationRules,
  eventSeverityOptions,
  eventOutcomeOptions,
  damageSeverityOptions,
  eventOutcome,
  setShowCasualtiesModal,
  fieldsLength,
  getCharCounterClass
}: MiddleColumnProps) {
  const selectedCategory = watch('category');
  const selectedSubCategory = watch('categorySubOptions');
  const recommendationsValue = watch('recommendations') || '';
  const recommendationsLength = recommendationsValue.length;

  const handleCategoryChange = (category: string) => {
    setValue('category', category);
    setValue('categorySubOptions', '');
    setValue('subCategoryOptions', '');
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setValue('categorySubOptions', subCategory);
    setValue('subCategoryOptions', '');
  };

  const getSubCategories = () => {
    if (selectedCategory && categorySubOptions[selectedCategory as keyof typeof categorySubOptions]) {
      return categorySubOptions[selectedCategory as keyof typeof categorySubOptions].subCategories;
    }
    return [];
  };

  const getSubCategoryOptions = () => {
    if (selectedCategory && selectedSubCategory && categorySubOptions[selectedCategory as keyof typeof categorySubOptions]) {
      const categoryData = categorySubOptions[selectedCategory as keyof typeof categorySubOptions];
      return categoryData.subCategoryOptions[selectedSubCategory as keyof typeof categoryData.subCategoryOptions] || [];
    }
    return [];
  };

  const filteredDamageSeverityOptions = eventOutcome.includes('אין נזק') 
    ? ['אין נזק']
    : damageSeverityOptions;

  return (
    <aside className={`${styles.column} ${styles.middleColumn}`} data-label="פרטי האירוע">
      {/* גורמים לאירוע */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>גורמים לאירוע *</label>
        <select 
          className={styles.select}
          {...register('categorySubOptions', validationRules.categorySubOptions)}
          onChange={(e) => handleSubCategoryChange(e.target.value)}
        >
          <option value="">בחר גורמים לאירוע</option>
          {getSubCategories().map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.categorySubOptions && <span className={styles.error}>{errors.categorySubOptions.message}</span>}
      </div>

      {/* תת-קטגוריה */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>תת-קטגוריה *</label>
        <select 
          className={styles.select}
          {...register('subCategoryOptions', validationRules.subCategoryOptions)}
        >
          <option value="">בחר תת-קטגוריה</option>
          {getSubCategoryOptions().map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.subCategoryOptions && <span className={styles.error}>{errors.subCategoryOptions.message}</span>}
      </div>

      {/* חומרת אירוע */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>חומרת אירוע *</label>
        <select 
          className={styles.select}
          {...register('eventSeverity', validationRules.eventSeverity)}
        >
          {eventSeverityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.eventSeverity && <span className={styles.error}>{errors.eventSeverity.message}</span>}
      </div>

      {/* תוצאות אירוע */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>תוצאות אירוע *</label>
        <select 
          className={styles.select}
          {...register('eventOutcome', validationRules.eventOutcome)}
        >
          <option value="">בחר תוצאות אירוע</option>
          {eventOutcomeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.eventOutcome && <span className={styles.error}>{errors.eventOutcome.message}</span>}
      </div>

      {/* חומרת נזק לרכוש */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>חומרת נזק לרכוש *</label>
        <select 
          className={styles.select}
          {...register('damageType', validationRules.damageType)}
        >
          <option value="">בחר חומרת נזק</option>
          {filteredDamageSeverityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.damageType && <span className={styles.error}>{errors.damageType.message}</span>}
      </div>

      {/* המלצות ראשוניות */}
      <div className={styles.fieldBox} style={{ minHeight: '120px' }}>
        <label className={styles.label}>המלצות ראשוניות</label>
        <textarea
          className={styles.textarea}
          style={{ minHeight: '80px', maxHeight: '150px' }}
          placeholder="המלצות ראשוניות לטיפול באירוע..."
          {...register('recommendations', validationRules.recommendations)}
        />
        <div className={`${styles.charCounter} ${styles[getCharCounterClass(recommendationsLength)]}`}>
          {recommendationsLength}/800
        </div>
        {errors.recommendations && <span className={styles.error}>{errors.recommendations.message}</span>}
      </div>

      {/* נפגעים */}
      <div className={styles.fieldBox}>
        <label className={styles.label}>נפגעים ({fieldsLength})</label>
        <button
          type="button"
          className={styles.input}
          style={{ 
            backgroundColor: eventOutcome && eventOutcome.includes('יש נפגעים') ? '#28a745' : '#ccc',
            color: 'white',
            cursor: eventOutcome && eventOutcome.includes('יש נפגעים') ? 'pointer' : 'not-allowed',
            textAlign: 'center',
            border: 'none',
            padding: '0.5rem'
          }}
          onClick={() => setShowCasualtiesModal(true)}
          disabled={!eventOutcome || !eventOutcome.includes('יש נפגעים')}
        >
          ➕ נהל נפגעים
        </button>
        <p style={{ fontSize: '0.7rem', color: '#666', margin: '0.3rem 0 0 0' }}>
          זמין רק כאשר תוצאות האירוע כוללות נפגעים
        </p>
      </div>
    </aside>
  );
}