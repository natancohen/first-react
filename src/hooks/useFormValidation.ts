export const useFormValidation = () => {
  const validationRules = {
    name_of_unity: {
      required: 'יחידת משנה הינה שדה חובה'
    },
    recommendations: {
      maxLength: {
        value: 800,
        message: 'ההמלצות לא יכולות להכיל יותר מ-800 תווים'
      }
    },

    costAmount: {
      pattern: {
        value: /^\d+(\.\d{1,2})?$/,
        message: 'הזן סכום תקין (מספר חיובי עם עד 2 ספרות אחרי הנקודה)'
      },
      min: {
        value: 0,
        message: 'הסכום חייב להיות חיובי'
      }
    },
    
    date: {
      required: 'תאריך הוא שדה חובה',
      validate: (value: string) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        
        if (selectedDate > today) {
          return 'לא ניתן לבחור תאריך עתידי';
        }
        return true;
      }
    },
    unitActivityType: {
      required: 'מאפיין פעילות יחידה הוא שדה חובה'
    },
    activityType: {
      required: 'מאפיין פעילות פרט הוא שדה חובה'
    },
    category: {
      required: 'מאפיין פעילות תחומי הוא שדה חובה'
    },
    text: {
      required: 'תיאור מפורט הוא שדה חובה',
      maxLength: {
        value: 800,
        message: 'התיאור לא יכול להכיל יותר מ-800 תווים'
      },
      minLength: {
        value: 10,
        message: 'התיאור חייב להכיל לפחות 10 תווים'
      } 
    },
    eventSeverity: {
      required: 'יש לבחור חומרת אירוע',
      validate: (value: string) => value !== 'בחר/י' || 'יש לבחור חומרת אירוע תקפה'
    },
    eventOutcome: {
      required: 'יש לבחור תוצאות אירוע',
    },
    categorySubOptions: {
      required: 'גורמים לאירוע הוא שדה חובה'
    },
    subCategoryOptions: {
      required: 'תת-קטגוריה היא שדה חובה'
    },
    damageType: {
      required: 'חומרת נזק לרכוש היא שדה חובה',
      validate: (value: string, formValues: { eventOutcome: string }) => {
        if (formValues.eventOutcome.includes('אין נזק') && value !== 'אין נזק') {
          return 'חייב לבחור "אין נזק" כאשר תוצאות האירוע מציינות אין נזק';
        }
        return true;
      }
    },

    location: {
      required: 'מיקום הוא שדה חובה'
    },
    locationDescription: {
      maxLength: {
        value: 800,
        message: 'תיאור המיקום לא יכול להכיל יותר מ-800 תווים'
      }
    },
    coordinates: {
      latitude: {
        pattern: {
          value: /^-?([1-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/,
          message: 'קו רוחב לא תקין (טווח: -90 עד 90)'
        }
      },
      longitude: {
        pattern: {
          value: /^-?(180(\.0+)?|1[0-7][0-9](\.[0-9]+)?|[1-9]?[0-9](\.[0-9]+)?)$/,
          message: 'קו אורך לא תקין (טווח: -180 עד 180)'
        }
      }
    }
  };

  const getCharCounterClass = (length: number) => {
    if (length > 750) return 'danger';
    if (length > 600) return 'warning';
    return 'normal';
  };

  return {
    validationRules,
    getCharCounterClass
  };
};